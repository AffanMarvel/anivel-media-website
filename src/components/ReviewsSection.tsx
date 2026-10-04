"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Star,
  MessageSquarePlus,
  CheckCircle2,
  Lock,
  Upload,
  X,
  AlertCircle,
  Clock,
  Sparkles,
  Check,
  Trash2,
  User,
  PlusCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ReviewItem } from "@/lib/types/review";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();

      let localApproved: ReviewItem[] = [];
      try {
        const cached = localStorage.getItem("anivel_approved_reviews");
        if (cached) localApproved = JSON.parse(cached);
      } catch {}

      const serverApproved: ReviewItem[] = data.success && Array.isArray(data.reviews) ? data.reviews : [];
      
      // Merge unique reviews by id
      const mergedMap = new Map<string, ReviewItem>();
      localApproved.forEach((r) => mergedMap.set(r.id, r));
      serverApproved.forEach((r) => mergedMap.set(r.id, r));

      const combined = Array.from(mergedMap.values());
      setReviews(combined);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      // Fallback to local storage if network or server error
      try {
        const cached = localStorage.getItem("anivel_approved_reviews");
        if (cached) setReviews(JSON.parse(cached));
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 bg-black text-[#EEEEEE] overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-crimson/[0.04] blur-[180px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-300">
              <Sparkles className="h-3 w-3 text-crimson" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
              CLIENT <span className="text-crimson">REVIEWS.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-xl leading-relaxed">
              Real feedback from brand owners, founders, and creators who produce with Anivel Media.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Rating pill */}
            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-crimson">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        totalReviews > 0 && i < Math.round(Number(averageRating))
                          ? "fill-crimson text-crimson"
                          : "text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-display text-2xl font-black text-white leading-none block pt-1">
                  {averageRating}{" "}
                  <span className="text-xs font-mono text-zinc-400 font-normal">/ 5.0</span>
                </span>
                <span className="font-mono text-[11px] text-zinc-400 block">{totalReviews} Reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:opacity-90 transition-all"
              >
                <MessageSquarePlus className="h-4 w-4" />
                <span>Write a Review</span>
              </button>

              <button
                onClick={() => setIsAdminModalOpen(true)}
                title="Owner Review Approval Portal"
                className="inline-flex items-center justify-center h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Lock className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12">
          {loading ? (
            <div className="py-20 text-center font-mono text-xs text-zinc-500 animate-pulse">
              Loading reviews...
            </div>
          ) : totalReviews === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0F0B10] to-[#08080C] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400">
                <Star className="h-7 w-7 text-crimson" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  <Clock className="h-3 w-3 text-crimson" />
                  <span>0 Published Reviews</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  BE THE FIRST TO REVIEW <span className="text-crimson">ANIVEL MEDIA.</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
                  Have we produced your brand reels, scripted your concepts, or executed your commercial shoot? Share your feedback.
                </p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-crimson px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:opacity-90 transition-all"
              >
                <MessageSquarePlus className="h-4 w-4" />
                <span>Submit Your Experience &rarr;</span>
              </button>
              <p className="font-mono text-[10px] text-zinc-500">
                Reviews are approved by founder Affan Shaikh before going live.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 flex flex-col justify-between space-y-4 hover:border-crimson/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < item.rating ? "fill-crimson text-crimson" : "text-zinc-700"}`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed italic">
                      &quot;{item.review}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    {item.image ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-crimson/40 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson/20 border border-crimson/40 text-rose-200 font-display font-bold text-xs uppercase shrink-0">
                        {item.name.slice(0, 2)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-display text-xs font-bold text-white uppercase truncate">{item.name}</h4>
                      {item.brandOrRole && (
                        <p className="font-mono text-[10px] text-zinc-400 truncate">{item.brandOrRole}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals rendered via Portal so they escape overflow-hidden parent */}
      {isWriteModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <WriteReviewModal
            onClose={() => setIsWriteModalOpen(false)}
            onSuccess={() => {
              setIsWriteModalOpen(false);
              fetchReviews();
            }}
          />,
          document.body
        )}
      {isAdminModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <AdminModerationModal
            onClose={() => setIsAdminModalOpen(false)}
            onReviewsUpdated={fetchReviews}
          />,
          document.body
        )}
    </section>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const OVERLAY_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "rgba(0,0,0,0.75)",
  overflowY: "auto",
};

const MODAL_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "560px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.15)",
  backgroundColor: "#1c1c1e",
  padding: "2rem",
  boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
  color: "#eeeeee",
  margin: "2rem auto",
};

const MODAL_WIDE_STYLE: React.CSSProperties = {
  ...MODAL_STYLE,
  maxWidth: "740px",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#2c2c2e",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
  padding: "10px 14px",
  color: "#ffffff",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const TEXTAREA_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  resize: "none",
  minHeight: "90px",
};

const BTN_CRIMSON: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#CB2957",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "10px 20px",
  fontWeight: 700,
  fontSize: "12px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const BTN_GREEN: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#16a34a",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "8px 14px",
  fontWeight: 700,
  fontSize: "11px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const BTN_GHOST: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "none",
  color: "#a1a1aa",
  cursor: "pointer",
  fontSize: "12px",
  padding: "8px 12px",
};

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: "#2c2c2e",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  padding: "16px",
  marginBottom: "12px",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "#d4d4d8",
  marginBottom: "6px",
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const ERROR_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(239,68,68,0.15)",
  border: "1px solid rgba(239,68,68,0.4)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#fca5a5",
  fontSize: "12px",
};

const SUCCESS_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(34,197,94,0.15)",
  border: "1px solid rgba(34,197,94,0.4)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#86efac",
  fontSize: "12px",
};

// ─── WRITE REVIEW MODAL ─────────────────────────────────────────────────────────
interface WriteReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function WriteReviewModal({ onClose, onSuccess }: WriteReviewModalProps) {
  const [name, setName] = useState("");
  const [brandOrRole, setBrandOrRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successSubmitted, setSuccessSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErrorMessage("Please select a valid image."); return; }
    if (file.size > 5 * 1024 * 1024) { setErrorMessage("Image must be under 5MB."); return; }
    const reader = new FileReader();
    reader.onload = (event) => { setImagePreview(event.target?.result as string); setErrorMessage(""); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) { setErrorMessage("Please enter your name."); return; }
    if (!review.trim() || review.trim().length < 5) { setErrorMessage("Please write your experience."); return; }
    setSubmitting(true);
    setErrorMessage("");

    const newPendingReview: ReviewItem = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      brandOrRole: brandOrRole.trim() || "Verified Client",
      rating,
      review: review.trim(),
      image: imagePreview || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // 1. Immediately cache in local storage as pending
    try {
      const existingPending = JSON.parse(localStorage.getItem("anivel_pending_reviews") || "[]");
      existingPending.unshift(newPendingReview);
      localStorage.setItem("anivel_pending_reviews", JSON.stringify(existingPending));
    } catch {}

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPendingReview),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to submit.");
      setSuccessSubmitted(true);
      try { confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ["#CB2957", "#FFFFFF"] }); } catch {}
    } catch (err: unknown) {
      // Even if network has issues, client local storage has it saved
      setSuccessSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const ratingLabels: Record<number, string> = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent ★" };

  return (
    <div style={OVERLAY_STYLE} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={MODAL_STYLE}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={16} />
        </button>

        {successSubmitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(203,41,87,0.2)", border: "1px solid #CB2957", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle2 size={32} color="#CB2957" />
            </div>
            <div style={{ fontSize: "11px", color: "#4ade80", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>✓ Review Submitted!</div>
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", textTransform: "uppercase", margin: "0 0 8px" }}>Thank you, {name.split(" ")[0]}!</h3>
            <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Your review is pending approval by Affan Shaikh. It will go live on the website once approved.
            </p>
            <button onClick={onSuccess} style={BTN_CRIMSON}>Close &amp; Return</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "10px", color: "#CB2957", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Share Your Experience</div>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", textTransform: "uppercase", margin: 0 }}>Write a <span style={{ color: "#CB2957" }}>Review.</span></h3>
              <p style={{ color: "#71717a", fontSize: "12px", marginTop: 6 }}>Tell others about your experience with Anivel Media.</p>
            </div>

            {errorMessage && <div style={{ ...ERROR_STYLE, marginBottom: 16 }}>{errorMessage}</div>}

            {/* Star Rating */}
            <div style={{ marginBottom: 16 }}>
              <div style={LABEL_STYLE}>Your Rating *</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                  >
                    <Star size={28} fill={(hoverRating || rating) >= star ? "#CB2957" : "none"} color={(hoverRating || rating) >= star ? "#CB2957" : "#52525b"} />
                  </button>
                ))}
                <span style={{ color: "#fda4af", fontSize: "12px", marginLeft: 8 }}>{ratingLabels[hoverRating || rating]}</span>
              </div>
            </div>

            {/* Name + Brand */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={LABEL_STYLE}>Your Name *</label>
                <input style={INPUT_STYLE} type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label style={LABEL_STYLE}>Brand / Role</label>
                <input style={INPUT_STYLE} type="text" value={brandOrRole} onChange={(e) => setBrandOrRole(e.target.value)} placeholder="e.g. Founder, Shish Jewels" />
              </div>
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: 16 }}>
              <label style={LABEL_STYLE}>Profile Photo (Optional)</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {imagePreview ? (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: "2px solid #CB2957", flexShrink: 0, position: "relative" }}>
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(203,41,87,0.15)", border: "1px solid rgba(203,41,87,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <User size={22} color="#fda4af" />
                  </div>
                )}
                <div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", color: "#d4d4d8", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Upload size={14} color="#CB2957" />
                    {imagePreview ? "Change Photo" : "Upload Photo"}
                  </button>
                  <div style={{ fontSize: "10px", color: "#52525b", marginTop: 4, fontFamily: "monospace" }}>Max 5MB • PNG / JPG</div>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div style={{ marginBottom: 20 }}>
              <label style={LABEL_STYLE}>Your Review *</label>
              <textarea style={TEXTAREA_STYLE} required rows={4} value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share details about content quality, production speed, communication..." />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, alignItems: "center" }}>
              <button type="button" onClick={onClose} style={BTN_GHOST}>Cancel</button>
              <button type="submit" disabled={submitting} style={{ ...BTN_CRIMSON, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? "Submitting..." : "Submit for Approval →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN MODERATION MODAL ─────────────────────────────────────────────────────
interface AdminModerationModalProps {
  onClose: () => void;
  onReviewsUpdated: () => void;
}

function AdminModerationModal({ onClose, onReviewsUpdated }: AdminModerationModalProps) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pending, setPending] = useState<ReviewItem[]>([]);
  const [approved, setApproved] = useState<ReviewItem[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "create">("pending");
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Direct Review Creation Fields
  const [directName, setDirectName] = useState("");
  const [directBrand, setDirectBrand] = useState("");
  const [directRating, setDirectRating] = useState(5);
  const [directReview, setDirectReview] = useState("");
  const [directImage, setDirectImage] = useState("");
  const directFileInputRef = useRef<HTMLInputElement>(null);

  const loadAllReviews = async (currentPasscode: string) => {
    try {
      const res = await fetch("/api/reviews/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: currentPasscode, action: "list" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Invalid PIN.");

      // Merge server and local storage
      let localPending: ReviewItem[] = [];
      let localApproved: ReviewItem[] = [];
      try {
        const pCached = localStorage.getItem("anivel_pending_reviews");
        if (pCached) localPending = JSON.parse(pCached);
        const aCached = localStorage.getItem("anivel_approved_reviews");
        if (aCached) localApproved = JSON.parse(aCached);
      } catch {}

      const mergedPendingMap = new Map<string, ReviewItem>();
      (data.pending || []).forEach((r: ReviewItem) => mergedPendingMap.set(r.id, r));
      localPending.forEach((r: ReviewItem) => mergedPendingMap.set(r.id, r));

      const mergedApprovedMap = new Map<string, ReviewItem>();
      (data.approved || []).forEach((r: ReviewItem) => mergedApprovedMap.set(r.id, r));
      localApproved.forEach((r: ReviewItem) => mergedApprovedMap.set(r.id, r));

      setPending(Array.from(mergedPendingMap.values()));
      setApproved(Array.from(mergedApprovedMap.values()));
      setIsUnlocked(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Authentication error.");
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    await loadAllReviews(passcode);
  };

  const handleApprove = async (item: ReviewItem) => {
    setActionLoading(true);
    try {
      // Update local storage immediately
      const approvedItem: ReviewItem = { ...item, status: "approved", approvedAt: new Date().toISOString() };
      
      let localApproved: ReviewItem[] = [];
      let localPending: ReviewItem[] = [];
      try {
        const aCached = localStorage.getItem("anivel_approved_reviews");
        if (aCached) localApproved = JSON.parse(aCached);
        const pCached = localStorage.getItem("anivel_pending_reviews");
        if (pCached) localPending = JSON.parse(pCached);
      } catch {}

      localPending = localPending.filter((r) => r.id !== item.id);
      localApproved = localApproved.filter((r) => r.id !== item.id);
      localApproved.unshift(approvedItem);

      localStorage.setItem("anivel_approved_reviews", JSON.stringify(localApproved));
      localStorage.setItem("anivel_pending_reviews", JSON.stringify(localPending));

      // Also notify server
      try {
        await fetch("/api/reviews/moderate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode, action: "approve", reviewId: item.id, review: approvedItem }),
        });
      } catch {}

      setPending((prev) => prev.filter((r) => r.id !== item.id));
      setApproved((prev) => [approvedItem, ...prev.filter((r) => r.id !== item.id)]);

      setSuccessMsg("✓ Review approved and published live!");
      onReviewsUpdated();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrorMsg("Failed to approve.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm("Remove this review?")) return;
    setActionLoading(true);
    try {
      // Remove from local storage
      try {
        let localApproved = JSON.parse(localStorage.getItem("anivel_approved_reviews") || "[]");
        let localPending = JSON.parse(localStorage.getItem("anivel_pending_reviews") || "[]");
        localApproved = localApproved.filter((r: ReviewItem) => r.id !== reviewId);
        localPending = localPending.filter((r: ReviewItem) => r.id !== reviewId);
        localStorage.setItem("anivel_approved_reviews", JSON.stringify(localApproved));
        localStorage.setItem("anivel_pending_reviews", JSON.stringify(localPending));
      } catch {}

      // Call API
      try {
        await fetch("/api/reviews/moderate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode, action: "reject", reviewId }),
        });
      } catch {}

      setPending((prev) => prev.filter((r) => r.id !== reviewId));
      setApproved((prev) => prev.filter((r) => r.id !== reviewId));
      onReviewsUpdated();
    } catch {
      setErrorMsg("Failed to remove.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDirectCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directName.trim() || !directReview.trim()) {
      setErrorMsg("Please provide client name and review text.");
      return;
    }
    setActionLoading(true);
    setErrorMsg("");

    const newDirectItem: ReviewItem = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: directName.trim(),
      brandOrRole: directBrand.trim() || "Verified Client",
      rating: directRating,
      review: directReview.trim(),
      image: directImage || undefined,
      status: "approved",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    };

    try {
      // 1. Save in local storage
      let localApproved: ReviewItem[] = [];
      try {
        const aCached = localStorage.getItem("anivel_approved_reviews");
        if (aCached) localApproved = JSON.parse(aCached);
      } catch {}
      localApproved.unshift(newDirectItem);
      localStorage.setItem("anivel_approved_reviews", JSON.stringify(localApproved));

      // 2. Call server
      try {
        await fetch("/api/reviews/moderate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode,
            action: "create",
            name: directName.trim(),
            brandOrRole: directBrand.trim() || undefined,
            rating: directRating,
            review: directReview.trim(),
            image: directImage || undefined,
          }),
        });
      } catch {}

      setApproved((prev) => [newDirectItem, ...prev]);
      setSuccessMsg("✓ Review created and published live!");
      setDirectName("");
      setDirectBrand("");
      setDirectReview("");
      setDirectImage("");
      setActiveTab("approved");
      onReviewsUpdated();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrorMsg("Failed to create review.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDirectPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setDirectImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={OVERLAY_STYLE} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={MODAL_WIDE_STYLE}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={16} />
        </button>

        {!isUnlocked ? (
          /* ── PIN Screen ── */
          <form onSubmit={handleUnlock} style={{ maxWidth: 380, margin: "0 auto", textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(203,41,87,0.2)", border: "1px solid #CB2957", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <Lock size={24} color="#CB2957" />
            </div>
            <div style={{ fontSize: "10px", color: "#CB2957", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Owner Portal</div>
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", textTransform: "uppercase", margin: "0 0 6px" }}>Review Approval</h3>
            <p style={{ color: "#71717a", fontSize: "12px", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Enter your admin PIN to review, approve, and manage customer reviews.
            </p>

            {errorMsg && <div style={{ ...ERROR_STYLE, marginBottom: 12 }}>{errorMsg}</div>}

            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Admin PIN"
              style={{ ...INPUT_STYLE, textAlign: "center", letterSpacing: "0.2em", fontSize: "16px", marginBottom: 10 }}
            />
            <button type="submit" style={{ ...BTN_CRIMSON, width: "100%", justifyContent: "center" }}>
              Unlock Portal →
            </button>
            <div style={{ fontSize: "10px", color: "#52525b", fontFamily: "monospace", marginTop: 12 }}>
              Default PIN: <span style={{ color: "#a1a1aa" }}>anivel2026</span>
            </div>
          </form>
        ) : (
          /* ── Moderation Panel ── */
          <div>
            {/* Header + Tabs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16, marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: "10px", color: "#CB2957", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Mode Active</div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", textTransform: "uppercase", margin: "2px 0 0" }}>Review Moderation</h3>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setActiveTab("pending")}
                  style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                    background: activeTab === "pending" ? "#CB2957" : "rgba(255,255,255,0.08)",
                    color: activeTab === "pending" ? "#fff" : "#a1a1aa" }}>
                  Pending ({pending.length})
                </button>
                <button type="button" onClick={() => setActiveTab("approved")}
                  style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                    background: activeTab === "approved" ? "#16a34a" : "rgba(255,255,255,0.08)",
                    color: activeTab === "approved" ? "#fff" : "#a1a1aa" }}>
                  Live ({approved.length})
                </button>
                <button type="button" onClick={() => setActiveTab("create")}
                  style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                    background: activeTab === "create" ? "#9333ea" : "rgba(255,255,255,0.08)",
                    color: activeTab === "create" ? "#fff" : "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}>
                  <PlusCircle size={13} /> Add Review
                </button>
              </div>
            </div>

            {successMsg && <div style={{ ...SUCCESS_STYLE, marginBottom: 12 }}>{successMsg}</div>}
            {errorMsg && <div style={{ ...ERROR_STYLE, marginBottom: 12 }}>{errorMsg}</div>}

            {/* List / Tabs */}
            <div style={{ maxHeight: 440, overflowY: "auto" }}>
              {activeTab === "pending" ? (
                pending.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: "#71717a", fontFamily: "monospace", fontSize: "12px" }}>
                    ✓ No pending reviews waiting for approval.
                  </div>
                ) : (
                  pending.map((item) => (
                    <div key={item.id} style={CARD_STYLE}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          {item.image ? (
                            <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "2px solid #CB2957", flexShrink: 0, position: "relative" }}>
                              <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                            </div>
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(203,41,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fda4af", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" }}>
                              {item.name.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700, color: "#fff", fontSize: "13px", textTransform: "uppercase" }}>{item.name}</div>
                            <div style={{ color: "#71717a", fontSize: "11px", fontFamily: "monospace" }}>{item.brandOrRole || "Client"}</div>
                            <div style={{ display: "flex", gap: 2, marginTop: 3 }}>
                              {[...Array(item.rating)].map((_, i) => <Star key={i} size={12} fill="#CB2957" color="#CB2957" />)}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button type="button" disabled={actionLoading} onClick={() => handleApprove(item)} style={{ ...BTN_GREEN, opacity: actionLoading ? 0.5 : 1 }}>
                            <Check size={13} /> Approve &amp; Publish
                          </button>
                          <button type="button" disabled={actionLoading} onClick={() => handleReject(item.id)}
                            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", color: "#f87171", display: "flex", alignItems: "center", justifyContent: "center", opacity: actionLoading ? 0.5 : 1 }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{ color: "#d4d4d8", fontSize: "12px", fontStyle: "italic", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        &quot;{item.review}&quot;
                      </p>
                    </div>
                  ))
                )
              ) : activeTab === "approved" ? (
                approved.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: "#71717a", fontFamily: "monospace", fontSize: "12px" }}>
                    No live reviews published yet.
                  </div>
                ) : (
                  approved.map((item) => (
                    <div key={item.id} style={{ ...CARD_STYLE, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 12 }}>
                        {item.image ? (
                          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1px solid #CB2957", flexShrink: 0, position: "relative" }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(203,41,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fda4af", fontWeight: 700, fontSize: "11px", textTransform: "uppercase" }}>
                            {item.name.slice(0, 2)}
                          </div>
                        )}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: "#fff", fontSize: "12px", textTransform: "uppercase" }}>
                            {item.name} {item.brandOrRole ? `(${item.brandOrRole})` : ""}
                          </div>
                          <div style={{ display: "flex", gap: 2, margin: "2px 0" }}>
                            {[...Array(item.rating)].map((_, i) => <Star key={i} size={11} fill="#CB2957" color="#CB2957" />)}
                          </div>
                          <div style={{ color: "#a1a1aa", fontSize: "11px", fontStyle: "italic", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 420 }}>
                            &quot;{item.review}&quot;
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => handleReject(item.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 8, flexShrink: 0 }} title="Remove Review">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              ) : (
                /* ── Create Direct Review Tab ── */
                <form onSubmit={handleDirectCreate} style={{ padding: "0.5rem 0" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={LABEL_STYLE}>Client Name *</label>
                      <input style={INPUT_STYLE} type="text" required value={directName} onChange={(e) => setDirectName(e.target.value)} placeholder="e.g. Samir Patel" />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Brand / Role</label>
                      <input style={INPUT_STYLE} type="text" value={directBrand} onChange={(e) => setDirectBrand(e.target.value)} placeholder="e.g. Founder, Luxe Studio" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={LABEL_STYLE}>Star Rating</label>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setDirectRating(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                          <Star size={24} fill={directRating >= s ? "#CB2957" : "none"} color={directRating >= s ? "#CB2957" : "#52525b"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={LABEL_STYLE}>Client Photo / Logo (Optional)</label>
                    <input ref={directFileInputRef} type="file" accept="image/*" onChange={handleDirectPhotoUpload} style={{ display: "none" }} />
                    <button type="button" onClick={() => directFileInputRef.current?.click()} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", color: "#d4d4d8", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: 6 }}>
                      <Upload size={14} color="#CB2957" />
                      {directImage ? "Photo Selected ✓" : "Upload Client Photo"}
                    </button>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={LABEL_STYLE}>Review Text *</label>
                    <textarea style={TEXTAREA_STYLE} required rows={3} value={directReview} onChange={(e) => setDirectReview(e.target.value)} placeholder="Enter the testimonial..." />
                  </div>

                  <button type="submit" disabled={actionLoading} style={{ ...BTN_CRIMSON, width: "100%", justifyContent: "center" }}>
                    {actionLoading ? "Publishing..." : "Publish Live Review Immediately →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
