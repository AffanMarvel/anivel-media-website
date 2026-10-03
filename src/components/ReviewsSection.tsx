"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquarePlus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Upload,
  X,
  AlertCircle,
  Clock,
  Sparkles,
  Quote,
  Eye,
  Check,
  Trash2,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ReviewItem } from "@/lib/types/review";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Fetch reviews on mount
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        // Also check if there are client-side approved reviews in localStorage (useful for instant preview)
        let localApproved: ReviewItem[] = [];
        try {
          const cached = localStorage.getItem("anivel_approved_reviews");
          if (cached) localApproved = JSON.parse(cached);
        } catch {}

        // Merge unique by ID
        const combined = [...data.reviews];
        localApproved.forEach((lr) => {
          if (!combined.some((c) => c.id === lr.id)) {
            combined.unshift(lr);
          }
        });
        setReviews(combined);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
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
    <section id="reviews" className="relative py-24 sm:py-32 bg-black text-[#EEEEEE] overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-crimson/[0.04] blur-[180px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              Real endorsements and verified feedback from brand owners, founders, and creators who produce with Anivel Media.
            </p>
          </div>

          {/* Rating Summary Scorecard & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
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
                  {averageRating} <span className="text-xs font-mono text-zinc-400 font-normal">/ 5.0</span>
                </span>
                <span className="font-mono text-[11px] text-zinc-400 block">
                  {totalReviews} Reviews
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all active:scale-[0.98]"
              >
                <MessageSquarePlus className="h-4 w-4" />
                <span>Write a Review</span>
              </button>

              {/* Owner Moderation Trigger */}
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

        {/* Content Area */}
        <div className="pt-12">
          {loading ? (
            <div className="py-20 text-center font-mono text-xs text-zinc-500 animate-pulse">
              Loading verified reviews...
            </div>
          ) : totalReviews === 0 ? (
            /* Explicit 0 Reviews State (Requested) */
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0F0B10] to-[#08080C] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden space-y-6">
              <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-crimson/10 blur-3xl" />
              
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
                  Have we produced your brand reels, scripted your concepts, or executed your commercial shoot? Share your feedback to be featured on our official showcase.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-crimson px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Submit Your Experience &rarr;</span>
                </button>
              </div>

              <p className="font-mono text-[10px] text-zinc-500">
                Submissions are reviewed and approved by founder Affan Shaikh before going live.
              </p>
            </div>
          ) : (
            /* Approved Reviews Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 flex flex-col justify-between space-y-4 hover:border-crimson/40 transition-all group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Stars & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-crimson">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? "fill-crimson text-crimson" : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed italic">
                      &quot;{item.review}&quot;
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    {item.image ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-crimson/40 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson/20 border border-crimson/40 text-rose-200 font-display font-bold text-xs uppercase shrink-0">
                        {item.name.slice(0, 2)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-display text-xs font-bold text-white uppercase truncate">
                        {item.name}
                      </h4>
                      {item.brandOrRole && (
                        <p className="font-mono text-[10px] text-zinc-400 truncate">
                          {item.brandOrRole}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <WriteReviewModal
            onClose={() => setIsWriteModalOpen(false)}
            onSuccess={() => {
              setIsWriteModalOpen(false);
              fetchReviews();
            }}
          />
        )}
      </AnimatePresence>

      {/* Admin Moderation Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <AdminModerationModal
            onClose={() => setIsAdminModalOpen(false)}
            onReviewsUpdated={() => {
              fetchReviews();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ==============================================================================
// 1. WRITE REVIEW MODAL COMPONENT
// ==============================================================================
interface WriteReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function WriteReviewModal({ onClose, onSuccess }: WriteReviewModalProps) {
  const [name, setName] = useState("");
  const [brandOrRole, setBrandOrRole] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image file must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setErrorMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!review.trim() || review.trim().length < 5) {
      setErrorMessage("Please write a short description of your experience.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          brandOrRole: brandOrRole.trim() || undefined,
          rating,
          review: review.trim(),
          image: imagePreview || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit review.");
      }

      setSuccessSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#CB2957", "#FFFFFF"],
        });
      } catch {}
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting review.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: "1 - Unsatisfactory",
    2: "2 - Needs Improvement",
    3: "3 - Satisfactory",
    4: "4 - Very Good",
    5: "5 - Exceptional / Highly Recommended",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl rounded-[24px] border border-white/10 bg-[#0A070B] p-6 sm:p-8 shadow-2xl text-left overflow-hidden my-8"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-crimson/20 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {successSubmitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson/20 border border-crimson text-crimson">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-widest">
                ✓ Review Submitted Successfully
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                THANK YOU, {name.split(" ")[0].toUpperCase()}!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-sm mx-auto leading-relaxed">
                Your review has been forwarded to Anivel Media. For quality assurance, reviews are approved by founder Affan Shaikh before going live on the website.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onSuccess}
                className="w-full rounded-xl bg-crimson px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                Share Your Experience
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                WRITE A <span className="text-crimson">REVIEW.</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Tell the community about the quality of content, speed of delivery, or creative execution.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Star Rating Selector */}
            <div className="space-y-1.5 pt-1">
              <label className="font-mono text-xs text-zinc-300 block">
                Your Overall Rating *
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-zinc-600 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            active ? "fill-crimson text-crimson" : "text-zinc-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="font-mono text-xs text-rose-300 pl-2">
                  {ratingDescriptions[hoverRating || rating]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-zinc-300 block">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson outline-none"
                />
              </div>

              {/* Brand or Role */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-zinc-300 block">Brand / Company / Role</label>
                <input
                  type="text"
                  value={brandOrRole}
                  onChange={(e) => setBrandOrRole(e.target.value)}
                  placeholder="e.g. Founder, Shish Jewels"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson outline-none"
                />
              </div>
            </div>

            {/* Photo / Avatar Upload */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-zinc-300 block">
                Profile Photo or Brand Logo (Optional)
              </label>
              <div className="flex items-center gap-3">
                {imagePreview ? (
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border border-crimson/50 shrink-0">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview("")}
                      className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-500 shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                )}

                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Upload className="h-3.5 w-3.5 text-crimson" />
                    <span>{imagePreview ? "Change Photo" : "Upload Photo (PNG/JPG)"}</span>
                  </button>
                  <p className="font-mono text-[10px] text-zinc-500 pt-1">
                    Adds trust and verification to your public review. Max 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Review Description */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-zinc-300 block">
                Your Review Description *
              </label>
              <textarea
                required
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share specific details about how Anivel Media helped your brand — the reel views, production quality, speed, or communication..."
                className="w-full rounded-xl border border-white/10 bg-black/60 p-3.5 text-xs text-white placeholder-zinc-600 focus:border-crimson outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs text-zinc-400 hover:text-white px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-crimson px-7 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all disabled:opacity-50"
              >
                <span>{submitting ? "Submitting..." : "Submit Review for Approval &rarr;"}</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ==============================================================================
// 2. ADMIN MODERATION MODAL (OWNER APPROVAL)
// ==============================================================================
interface AdminModerationModalProps {
  onClose: () => void;
  onReviewsUpdated: () => void;
}

function AdminModerationModal({ onClose, onReviewsUpdated }: AdminModerationModalProps) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pending, setPending] = useState<ReviewItem[]>([]);
  const [approved, setApproved] = useState<ReviewItem[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, action: "list" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid administrator passcode.");
      }
      setPending(data.pending || []);
      setApproved(data.approved || []);
      setIsUnlocked(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error.";
      setErrorMsg(msg);
    }
  };

  const handleApprove = async (reviewId: string) => {
    setActionLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, action: "approve", reviewId }),
      });
      const data = await res.json();
      if (data.success) {
        setPending(data.pending || []);
        setApproved(data.approved || []);
        setSuccessMsg("Review approved and published to website!");

        // Also cache locally for instant presentation
        try {
          localStorage.setItem("anivel_approved_reviews", JSON.stringify(data.approved || []));
        } catch {}

        onReviewsUpdated();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      setErrorMsg("Failed to approve review.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm("Are you sure you want to remove this review?")) return;
    setActionLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, action: "reject", reviewId }),
      });
      const data = await res.json();
      if (data.success) {
        setPending(data.pending || []);
        setApproved(data.approved || []);
        try {
          localStorage.setItem("anivel_approved_reviews", JSON.stringify(data.approved || []));
        } catch {}
        onReviewsUpdated();
      }
    } catch {
      setErrorMsg("Failed to remove review.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-[24px] border border-white/10 bg-[#0B080D] p-6 sm:p-8 shadow-2xl text-left overflow-hidden my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-5 max-w-md mx-auto py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson/20 border border-crimson text-crimson">
              <Lock className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-crimson font-bold block">
                Owner Portal
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                REVIEW APPROVAL ACCESS
              </h3>
              <p className="text-xs text-zinc-400">
                Enter your administrative PIN to review and approve customer submissions.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin PIN"
                className="w-full text-center tracking-widest rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-crimson outline-none font-mono"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-crimson py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
              >
                Unlock Moderation Portal &rarr;
              </button>
            </div>
            <p className="font-mono text-[10px] text-zinc-500">
              Default authorization code: <code className="text-zinc-400">anivel2026</code>
            </p>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-crimson font-bold block tracking-wider">
                  Admin Moderation Mode Active
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white">
                  REVIEW MODERATION
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("pending")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase font-bold transition-all ${
                    activeTab === "pending"
                      ? "bg-crimson text-white shadow-crimson-glow"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  Pending ({pending.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("approved")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase font-bold transition-all ${
                    activeTab === "approved"
                      ? "bg-emerald-600 text-white"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  Live ({approved.length})
                </button>
              </div>
            </div>

            {successMsg && (
              <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs">
                {successMsg}
              </div>
            )}

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto space-y-4 pr-1">
              {activeTab === "pending" ? (
                pending.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-zinc-500">
                    ✓ No pending reviews waiting for approval.
                  </div>
                ) : (
                  pending.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-white/10 bg-black/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-crimson/40 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson/20 text-rose-200 font-display font-bold text-xs uppercase">
                              {item.name.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-display font-bold text-white text-sm uppercase">
                              {item.name}
                            </h4>
                            <span className="font-mono text-[10px] text-zinc-400 block">
                              {item.brandOrRole || "Client"}
                            </span>
                            <div className="flex items-center gap-0.5 text-crimson pt-0.5">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} className="h-3.5 w-3.5 fill-crimson" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={actionLoading}
                            onClick={() => handleApprove(item.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 font-mono text-[11px] uppercase font-bold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Approve &amp; Publish</span>
                          </button>
                          <button
                            type="button"
                            disabled={actionLoading}
                            onClick={() => handleReject(item.id)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-rose-400 hover:bg-rose-950/40 transition-all"
                            title="Reject"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans italic border-t border-white/5 pt-2">
                        &quot;{item.review}&quot;
                      </p>
                    </div>
                  ))
                )
              ) : approved.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-zinc-500">
                  Currently 0 live reviews on the website.
                </div>
              ) : (
                approved.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-0.5 text-crimson shrink-0">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-crimson" />
                        ))}
                      </div>
                      <div className="min-w-0">
                        <span className="font-display font-bold text-white text-xs uppercase block truncate">
                          {item.name} {item.brandOrRole ? `(${item.brandOrRole})` : ""}
                        </span>
                        <p className="text-[11px] text-zinc-400 truncate italic">
                          &quot;{item.review}&quot;
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleReject(item.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors shrink-0"
                      title="Unpublish"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
