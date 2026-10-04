import fs from "fs";
import path from "path";
import { ReviewItem, ReviewSubmissionPayload } from "@/lib/types/review";

const DATA_DIR = path.join(process.cwd(), "data");
const APPROVED_FILE = path.join(DATA_DIR, "reviews.json");
const PENDING_FILE = path.join(DATA_DIR, "pending_reviews.json");

// In-memory fallback stores (useful if serverless filesystem is read-only)
let memoryPending: ReviewItem[] = [];
let memoryApproved: ReviewItem[] = [];
let isInitialized = false;

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

function initMemory() {
  if (isInitialized) return;
  try {
    ensureDir();
    if (fs.existsSync(APPROVED_FILE)) {
      const raw = fs.readFileSync(APPROVED_FILE, "utf-8").trim();
      if (raw) memoryApproved = JSON.parse(raw);
    }
    if (fs.existsSync(PENDING_FILE)) {
      const raw = fs.readFileSync(PENDING_FILE, "utf-8").trim();
      if (raw) memoryPending = JSON.parse(raw);
    }
  } catch (err) {
    console.error("[ReviewService] Memory init error:", err);
  }
  isInitialized = true;
}

function readJSON(filePath: string, fallbackMemory: ReviewItem[]): ReviewItem[] {
  initMemory();
  try {
    ensureDir();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8").trim();
      if (raw) return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[ReviewService] Read error, using memory fallback:", err);
  }
  return fallbackMemory;
}

function writeJSON(filePath: string, data: ReviewItem[], isApproved: boolean): void {
  initMemory();
  if (isApproved) {
    memoryApproved = [...data];
  } else {
    memoryPending = [...data];
  }
  try {
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[ReviewService] Write skipped (expected in read-only serverless):", err);
  }
}

export class ReviewService {
  /** All reviews currently approved and shown on website */
  static getApprovedReviews(): ReviewItem[] {
    return readJSON(APPROVED_FILE, memoryApproved);
  }

  /** All reviews waiting for owner approval */
  static getPendingReviews(): ReviewItem[] {
    return readJSON(PENDING_FILE, memoryPending);
  }

  /** Customer submits a new review → goes into pending queue */
  static async submitReview(
    payload: ReviewSubmissionPayload
  ): Promise<{ success: boolean; review: ReviewItem }> {
    initMemory();

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

    const existing = readJSON(PENDING_FILE, memoryPending);
    // Avoid duplicates
    const filtered = existing.filter((r) => r.id !== newReview.id);
    filtered.unshift(newReview);
    writeJSON(PENDING_FILE, filtered, false);

    console.log("[ReviewService] New review saved to pending:", newReview.id, "-", newReview.name);

    // Alert via Google Sheet webhook so owner sees it immediately
    const WEBHOOK_URL =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbxhLaJ2i9PBiGzOMshLhIom__o8nlKQUQx29iPERM3fUxeHKpcnkflLNuNw7N61vF4Svg/exec";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newReview.name,
          brandName: `${newReview.brandOrRole} [★ ${newReview.rating}/5 REVIEW]`,
          email: "review@anivelmedia.com",
          phone: "Review Submission",
          selectedPlan: `CLIENT REVIEW — ${newReview.rating} STARS`,
          projectNotes: `"${newReview.review}"\n\nSTATUS: PENDING APPROVAL\nID: ${newReview.id}`,
          termsAccepted: "YES",
          status: "REVIEW_SUBMITTED",
        }),
        redirect: "follow",
      });
    } catch (err) {
      console.error("[ReviewService] Webhook alert failed (non-critical):", err);
    }

    return { success: true, review: newReview };
  }

  /** Directly create and publish a review from Admin panel */
  static createApprovedReview(payload: ReviewSubmissionPayload): { success: boolean; review: ReviewItem } {
    initMemory();

    const newReview: ReviewItem = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: payload.name.trim(),
      brandOrRole: payload.brandOrRole?.trim() || "Verified Client",
      rating: Math.max(1, Math.min(5, Math.round(payload.rating || 5))),
      review: payload.review.trim(),
      image: payload.image || undefined,
      status: "approved",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    };

    const approved = readJSON(APPROVED_FILE, memoryApproved);
    approved.unshift(newReview);
    writeJSON(APPROVED_FILE, approved, true);

    return { success: true, review: newReview };
  }

  /** Owner approves a review — moves it from pending → approved */
  static approveReview(reviewId: string, fallbackReview?: ReviewItem): { success: boolean; review?: ReviewItem } {
    initMemory();

    const pending = readJSON(PENDING_FILE, memoryPending);
    const approved = readJSON(APPROVED_FILE, memoryApproved);

    let target: ReviewItem | undefined;
    const idx = pending.findIndex((r) => r.id === reviewId);

    if (idx !== -1) {
      target = {
        ...pending[idx],
        status: "approved",
        approvedAt: new Date().toISOString(),
      };
      pending.splice(idx, 1);
      writeJSON(PENDING_FILE, pending, false);
    } else if (fallbackReview) {
      target = {
        ...fallbackReview,
        status: "approved",
        approvedAt: new Date().toISOString(),
      };
    }

    if (!target) {
      console.warn("[ReviewService] Review not found to approve:", reviewId);
      return { success: false };
    }

    const filteredApproved = approved.filter((r) => r.id !== target!.id);
    filteredApproved.unshift(target);
    writeJSON(APPROVED_FILE, filteredApproved, true);

    console.log("[ReviewService] Review approved:", reviewId);
    return { success: true, review: target };
  }

  /** Owner deletes or rejects a review from either list */
  static rejectReview(reviewId: string): { success: boolean } {
    initMemory();

    const pending = readJSON(PENDING_FILE, memoryPending);
    const approved = readJSON(APPROVED_FILE, memoryApproved);

    writeJSON(PENDING_FILE, pending.filter((r) => r.id !== reviewId), false);
    writeJSON(APPROVED_FILE, approved.filter((r) => r.id !== reviewId), true);

    console.log("[ReviewService] Review deleted:", reviewId);
    return { success: true };
  }
}
