"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles, MessageCircle, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const AVAILABLE_SERVICES = [
  "Social Media Management",
  "Reel Creation & Scripting",
  "Meta Ads & Acquisition",
  "Commercial Shoots & Events",
  "Website Development",
  "Branding & Visual Identity",
  "Full Growth Retainer",
];

const BUDGET_RANGES = [
  "Under ₹50,000 / month",
  "₹50,000 - ₹1,50,000 / month",
  "₹1,50,000 - ₹3,50,000 / month",
  "₹3,50,000+ / Enterprise",
  "Project-Based (One-Time)",
  "International Client ($ USD)",
];

const TIMELINE_OPTIONS = [
  "ASAP (Within 7-10 days)",
  "Next 2-4 weeks",
  "Planning for next quarter",
  "Flexible / Exploring",
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService && !selectedServices.includes(initialService)) {
      setSelectedServices([initialService]);
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#CB2957", "#FFFFFF", "#DDDDDD"],
        });
      } catch {
        // Fallback gracefully
      }
    }, 900);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const resetForm = () => {
    setStep(1);
    setSelectedServices([]);
    setBudget("");
    setTimeline("");
    setFormData({ name: "", brandName: "", email: "", phone: "", notes: "" });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.08 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[16px] border border-white/10 bg-[#0A0A0E] shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
          >
          {/* Subtle crimson ambient glow in modal */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full bg-crimson/25 blur-3xl" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-crimson animate-pulse" />
              <h3 id="inquiry-modal-title" className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Start a Project &bull; Partnership Inquiry
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-[8px] p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="h-1 w-full bg-zinc-900">
              <motion.div
                className="h-full bg-crimson"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[12px] bg-crimson/20 border border-crimson/40 text-crimson">
                  <CheckCircle2 className="h-8 w-8 text-crimson" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-semibold text-white">
                    Brief Received by ANIVEL MEDIA
                  </h4>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name || "partner"}</span>. Our core team will review your project requirements and reach out within 24 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/919428777887?text=Hello%20Affan,%20I%20just%20submitted%20a%20project%20brief%20on%20Anivel%20Media."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-5 py-2.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-600/30"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    Fast-Track via WhatsApp (+91 94287 77887)
                  </a>
                  <button
                    onClick={resetForm}
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step 1: Services Selection */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-crimson uppercase tracking-wider">Step 01 / 03</span>
                      <h4 className="mt-1 text-2xl font-display font-medium text-white">
                        Which capabilities does your brand need?
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Select one or more services to help us formulate the right team and scope.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {AVAILABLE_SERVICES.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                              isSelected
                                ? "border-crimson bg-crimson/15 text-white shadow-crimson-glow"
                                : "border-white/10 bg-surface/50 text-zinc-300 hover:border-white/25 hover:bg-surface-elevated"
                            }`}
                          >
                            <span>{service}</span>
                            <span
                              className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isSelected
                                  ? "border-crimson bg-crimson text-white"
                                  : "border-zinc-600"
                              }`}
                            >
                              {isSelected ? "✓" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        disabled={selectedServices.length === 0}
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 rounded-xl bg-crimson px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-crimson-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-crimson-glow"
                      >
                        Next: Budget & Timeline
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget & Timeline */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-crimson uppercase tracking-wider">Step 02 / 03</span>
                      <h4 className="mt-1 text-2xl font-display font-medium text-white">
                        Estimated Investment & Timeline
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Ensures we propose strategies calibrated for maximum impact within your parameters.
                      </p>
                    </div>

                    {/* Budget Selection */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-mono uppercase text-zinc-300">
                        Monthly or Project Budget Range:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {BUDGET_RANGES.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                              budget === b
                                ? "border-crimson bg-crimson/15 text-white"
                                : "border-white/10 bg-surface/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Selection */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-mono uppercase text-zinc-300">
                        Target Launch / Execution Timeline:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMELINE_OPTIONS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                              timeline === t
                                ? "border-crimson bg-crimson/15 text-white"
                                : "border-white/10 bg-surface/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={!budget || !timeline}
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 rounded-xl bg-crimson px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-crimson-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-crimson-glow"
                      >
                        Next: Contact Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact & Vision */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-crimson uppercase tracking-wider">Step 03 / 03</span>
                      <h4 className="mt-1 text-2xl font-display font-medium text-white">
                        Tell us about your brand
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Where should we send the proposal and preliminary strategic roadmap?
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400">Your Name *</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400">Brand / Company *</label>
                          <input
                            type="text"
                            required
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleInputChange}
                            placeholder="e.g. Aurelia Lifestyle"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400">Work Email *</label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="rahul@company.com"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400">WhatsApp / Phone *</label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-zinc-400">
                          Project Goals / Current Challenges (Optional)
                        </label>
                        <textarea
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your objectives, key links, or current challenges..."
                          className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson resize-none"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                          className="inline-flex items-center gap-2 rounded-xl bg-crimson px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-crimson-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-crimson-glow"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Transmitting Brief...
                            </>
                          ) : (
                            <>
                              Submit Project Brief
                              <Send className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
