import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "@/lib/services/reviewService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminPasscode = process.env.ADMIN_PASSCODE || "anivel2026";

    if (!body.passcode || body.passcode !== adminPasscode) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator passcode." },
        { status: 401 }
      );
    }

    const action = body.action;

    if (action === "list") {
      return NextResponse.json({
        success: true,
        pending: ReviewService.getPendingReviews(),
        approved: ReviewService.getApprovedReviews(),
      });
    }

    if (action === "approve") {
      if (!body.reviewId) {
        return NextResponse.json({ success: false, message: "Missing reviewId." }, { status: 400 });
      }
      const res = ReviewService.approveReview(body.reviewId);
      return NextResponse.json({
        success: res.success,
        message: res.success ? "Review approved and published to website!" : "Review not found.",
        pending: ReviewService.getPendingReviews(),
        approved: ReviewService.getApprovedReviews(),
      });
    }

    if (action === "reject" || action === "delete") {
      if (!body.reviewId) {
        return NextResponse.json({ success: false, message: "Missing reviewId." }, { status: 400 });
      }
      ReviewService.rejectReview(body.reviewId);
      return NextResponse.json({
        success: true,
        message: "Review removed.",
        pending: ReviewService.getPendingReviews(),
        approved: ReviewService.getApprovedReviews(),
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action requested." }, { status: 400 });
  } catch (error) {
    console.error("[Reviews Moderate API] Error:", error);
    return NextResponse.json({ success: false, message: "Server error during moderation." }, { status: 500 });
  }
}
