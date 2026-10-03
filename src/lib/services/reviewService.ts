import fs from "fs";
import path from "path";
import { ReviewItem, ReviewSubmissionPayload } from "@/lib/types/review";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const APPROVED_REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const PENDING_REVIEWS_FILE = path.join(DATA_DIR, "pending_reviews.json");

// In-memory runtime fallback cache for read-only serverless platforms (e.g. Vercel)
let inMemoryApproved: ReviewItem[] = [];
let inMemoryPending: ReviewItem[] = [];
let isMemoryInitialized = false;

function initializeMemoryStore() {
  if (isMemoryInitialized) return;
  try {
    if (fs.existsSync(APPROVED_REVIEWS_FILE)) {
      const data = fs.readFileSync(APPROVED_REVIEWS_FILE, "utf-8");
      inMemoryApproved = JSON.parse(data || "[]");
    }
    if (fs.existsSync(PENDING_REVIEWS_FILE)) {
      const data = fs.readFileSync(PENDING_REVIEWS_FILE, "utf-8");
      inMemoryPending = JSON.parse(data || "[]");
    }
  } catch (err) {
    console.error("[ReviewService] Memory init error:", err);
  }
  isMemoryInitialized = true;
}

export class ReviewService {
  /**
   * Get all approved reviews that should appear on the public website.
   */
  static getApprovedReviews(): ReviewItem[] {
    initializeMemoryStore();
    try {
      if (fs.existsSync(APPROVED_REVIEWS_FILE)) {
        const raw = fs.readFileSync(APPROVED_REVIEWS_FILE, "utf-8");
        return JSON.parse(raw || "[]");
      }
    } catch {
      // Fallback to in-memory store
    }
    return inMemoryApproved.filter((r) => r.status === "approved");
  }

  /**
   * Get all pending reviews for admin approval.
   */
  static getPendingReviews(): ReviewItem[] {
    initializeMemoryStore();
    try {
      if (fs.existsSync(PENDING_REVIEWS_FILE)) {
        const raw = fs.readFileSync(PENDING_REVIEWS_FILE, "utf-8");
        return JSON.parse(raw || "[]");
      }
    } catch {
      // Fallback
    }
    return inMemoryPending.filter((r) => r.status === "pending");
  }

  /**
   * Submit a new client review (starts in 'pending' status).
   */
  static async submitReview(payload: ReviewSubmissionPayload): Promise<{ success: boolean; review: ReviewItem }> {
    initializeMemoryStore();

    const newReview: ReviewItem = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: payload.name.trim(),
      brandOrRole: payload.brandOrRole?.trim() || "Verified Client",
      rating: Math.max(1, Math.min(5, Math.round(payload.rating || 5))),
      review: payload.review.trim(),
      image: payload.image || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // 1. Add to pending list
    inMemoryPending.unshift(newReview);
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(PENDING_REVIEWS_FILE, JSON.stringify(inMemoryPending, null, 2), "utf-8");
    } catch (err) {
      console.warn("[ReviewService] File write skipped (expected on read-only serverless environment):", err);
    }

    // 2. Dispatch real-time alert to Google Apps Script Webhook so Affan gets alerted immediately
    const GOOGLE_SHEET_FALLBACK_URL =
      "https://script.google.com/macros/s/AKfycbxhLaJ2i9PBiGzOMshLhIom__o8nlKQUQx29iPERM3fUxeHKpcnkflLNuNw7N61vF4Svg/exec";
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || GOOGLE_SHEET_FALLBACK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: newReview.name,
            brandName: `${newReview.brandOrRole} [★ ${newReview.rating}/5 Review]`,
            email: "review@anivelmedia.com",
            phone: "Review Submission",
            selectedPlan: `CLIENT REVIEW (${newReview.rating} STARS)`,
            projectNotes: `REVIEW TEXT:\n"${newReview.review}"\n\nSTATUS: PENDING OWNER APPROVAL\nID: ${newReview.id}`,
            termsAccepted: "YES",
            status: "REVIEW_SUBMITTED",
          }),
          redirect: "follow",
        });
      } catch (webhookErr) {
        console.error("[ReviewService] Failed to notify Google Sheet webhook:", webhookErr);
      }
    }

    return { success: true, review: newReview };
  }

  /**
   * Approve a pending review so it is published to the website.
   */
  static approveReview(reviewId: string): { success: boolean; review?: ReviewItem } {
    initializeMemoryStore();

    // Check in pending
    const index = inMemoryPending.findIndex((r) => r.id === reviewId);
    let targetReview: ReviewItem | undefined;

    if (index !== -1) {
      targetReview = { ...inMemoryPending[index], status: "approved", approvedAt: new Date().toISOString() };
      inMemoryPending.splice(index, 1);
    } else {
      // Check in approved
      targetReview = inMemoryApproved.find((r) => r.id === reviewId);
      if (targetReview) {
        targetReview.status = "approved";
      }
    }

    if (!targetReview) {
      return { success: false };
    }

    // Add or update in approved list
    const existingApprovedIdx = inMemoryApproved.findIndex((r) => r.id === reviewId);
    if (existingApprovedIdx !== -1) {
      inMemoryApproved[existingApprovedIdx] = targetReview;
    } else {
      inMemoryApproved.unshift(targetReview);
    }

    // Persist to filesystem if available
    try {
      fs.writeFileSync(APPROVED_REVIEWS_FILE, JSON.stringify(inMemoryApproved, null, 2), "utf-8");
      fs.writeFileSync(PENDING_REVIEWS_FILE, JSON.stringify(inMemoryPending, null, 2), "utf-8");
    } catch (err) {
      console.warn("[ReviewService] File write skipped in serverless environment:", err);
    }

    return { success: true, review: targetReview };
  }

  /**
   * Reject or delete a review.
   */
  static rejectReview(reviewId: string): { success: boolean } {
    initializeMemoryStore();

    inMemoryPending = inMemoryPending.filter((r) => r.id !== reviewId);
    inMemoryApproved = inMemoryApproved.filter((r) => r.id !== reviewId);

    try {
      fs.writeFileSync(APPROVED_REVIEWS_FILE, JSON.stringify(inMemoryApproved, null, 2), "utf-8");
      fs.writeFileSync(PENDING_REVIEWS_FILE, JSON.stringify(inMemoryPending, null, 2), "utf-8");
    } catch (err) {
      console.warn("[ReviewService] File write skipped in serverless environment:", err);
    }

    return { success: true };
  }
}
