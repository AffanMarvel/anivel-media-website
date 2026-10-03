import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "@/lib/services/reviewService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = ReviewService.getApprovedReviews();
    const count = reviews.length;
    const averageRating =
      count > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1) : "0.0";

    return NextResponse.json(
      {
        success: true,
        reviews,
        count,
        averageRating,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Reviews API] GET error:", error);
    return NextResponse.json(
      { success: false, reviews: [], count: 0, averageRating: "0.0" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, message: "Please provide a star rating between 1 and 5." },
        { status: 400 }
      );
    }

    if (!body.review || body.review.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: "Please share a brief description of your experience." },
        { status: 400 }
      );
    }

    const result = await ReviewService.submitReview({
      name: body.name,
      brandOrRole: body.brandOrRole,
      rating: Number(body.rating),
      review: body.review,
      image: body.image,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your review has been submitted to Anivel Media. It will be published once approved by our team.",
        review: result.review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Reviews API] POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while submitting your review. Please try again.",
      },
      { status: 500 }
    );
  }
}
