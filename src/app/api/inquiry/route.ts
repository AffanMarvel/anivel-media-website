import { NextRequest, NextResponse } from "next/server";
import { LeadService, InquiryPayload } from "@/lib/services/leadService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InquiryPayload;

    const result = await LeadService.processInquiry(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          errors: result.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Inquiry API] Internal handler error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
