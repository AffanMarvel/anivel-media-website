import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface OnboardingBriefPayload {
  fullName: string;
  brandName: string;
  phone: string;
  email: string;
  websiteOrHandle?: string;
  city?: string;
  selectedPlan: string;
  planCategory?: string;
  planPrice?: string;
  primaryGoal?: string;
  timeline?: string;
  assetDriveUrl?: string;
  projectNotes?: string;
  termsAccepted: boolean;
  privacyAccepted?: boolean;
  termsVersion?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OnboardingBriefPayload;

    // Strict Validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!body.brandName || body.brandName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your brand or business name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    if (!body.phone || body.phone.trim().replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid WhatsApp / contact phone number." },
        { status: 400 }
      );
    }

    if (!body.selectedPlan) {
      return NextResponse.json(
        { success: false, message: "Please select an official plan or service." },
        { status: 400 }
      );
    }

    // Generate unique reference ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `ANV-${new Date().getFullYear()}-${randomHex}`;

    const now = new Date();
    const formattedTimestamp = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const dateStr = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    const timeStr = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });

    // Capture client IP for legal audit log if present
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "Unknown";

    // Structured lead record for Google Sheets & Email Notifications (DPDP v2.0 compliant)
    const record = {
      referenceId,
      timestamp: formattedTimestamp,
      date: dateStr,
      time: timeStr,
      fullName: body.fullName.trim(),
      brandName: body.brandName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim().toLowerCase(),
      instagramOrWebsite: body.websiteOrHandle?.trim() || "N/A",
      city: body.city?.trim() || "N/A",
      selectedPlan: body.selectedPlan,
      planCategory: body.planCategory || "Custom",
      planPrice: body.planPrice || "Quote",
      primaryGoal: body.primaryGoal || "Not Specified",
      timeline: body.timeline || "Immediate",
      assetDriveUrl: body.assetDriveUrl?.trim() || "None",
      projectNotes: body.projectNotes?.trim() || "None",
      termsAccepted: body.termsAccepted ? "YES" : "NO",
      privacyAccepted: body.privacyAccepted !== false ? "YES" : "NO",
      termsVersion: body.termsVersion || "v2.0",
      consentTimestamp: formattedTimestamp,
      clientIp,
      status: "NEW",
    };

    console.log("[Onboarding API] New Lead Received:", JSON.stringify(record, null, 2));

    // Send to Google Sheet Webhook (with production fallback if env var is missing in deployment)
    const GOOGLE_SHEET_FALLBACK_URL =
      "https://script.google.com/macros/s/AKfycbxhLaJ2i9PBiGzOMshLhIom__o8nlKQUQx29iPERM3fUxeHKpcnkflLNuNw7N61vF4Svg/exec";
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || GOOGLE_SHEET_FALLBACK_URL;

    if (googleSheetWebhookUrl) {
      try {
        console.log("[Onboarding API] Forwarding lead to Google Sheets webhook:", googleSheetWebhookUrl);
        const sheetRes = await fetch(googleSheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
          redirect: "follow",
        });
        const sheetResText = await sheetRes.text();
        console.log("[Onboarding API] Google Sheet response:", sheetRes.status, sheetResText);
      } catch (sheetErr) {
        console.error("[Onboarding API] Google Sheets webhook error (gracefully handled):", sheetErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Your onboarding brief has been successfully received by Anivel Media.",
        data: record,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Onboarding API] Handler error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while submitting your brief. Please reach out via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
