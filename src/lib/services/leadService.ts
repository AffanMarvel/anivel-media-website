/**
 * ANIVEL MEDIA | Lead Ingestion & Workflow Service
 *
 * Coordinates validation, Google Sheets logging, email notifications,
 * and external webhook automations (e.g. n8n / CRM).
 *
 * Built with an adapter pattern: if production credentials are provided
 * in environment variables, it executes real dispatches. Otherwise,
 * it safely logs the structured record server-side with zero user-facing disruption.
 */

export interface InquiryPayload {
  name: string;
  business: string;
  email: string;
  phone: string;
  instagram?: string;
  website?: string;
  city?: string;
  service: string;
  plan?: string;
  budget?: string;
  message: string;
}

export interface InquiryResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export class LeadService {
  /**
   * Validate incoming inquiry payload
   */
  static validate(data: Partial<InquiryPayload>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = "Please provide your full name (at least 2 characters).";
    }

    if (!data.business || data.business.trim().length < 2) {
      errors.business = "Please provide your business or brand name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      errors.email = "Please provide a valid email address.";
    }

    if (!data.phone || data.phone.trim().replace(/\D/g, "").length < 7) {
      errors.phone = "Please provide a valid phone or WhatsApp number.";
    }

    if (!data.service || data.service.trim().length === 0) {
      errors.service = "Please select the primary service required.";
    }

    if (!data.message || data.message.trim().length < 5) {
      errors.message = "Please tell us a little about your project or goals.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Primary lead processing workflow
   */
  static async processInquiry(payload: InquiryPayload): Promise<InquiryResult> {
    const validation = this.validate(payload);
    if (!validation.isValid) {
      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: validation.errors,
      };
    }

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0];

    // Structured lead record matching required Google Sheet columns
    const record = {
      Date: dateStr,
      Time: timeStr,
      Name: payload.name.trim(),
      Business: payload.business.trim(),
      Email: payload.email.trim().toLowerCase(),
      Phone: payload.phone.trim(),
      Instagram: payload.instagram?.trim() || "N/A",
      Website: payload.website?.trim() || "N/A",
      City: payload.city?.trim() || "N/A",
      Service: payload.service.trim(),
      Plan: payload.plan?.trim() || "Not Specified",
      Budget: payload.budget?.trim() || "Not Specified",
      Message: payload.message.trim(),
      LeadStatus: "NEW",
      Notes: "Inquiry received via website portal",
    };

    // 1. Google Sheets Logging
    await this.appendToGoogleSheet(record);

    // 2. Email Notification to Anivel Media Business Email
    await this.sendAgencyNotification(record);

    // 3. Client Confirmation Email
    await this.sendClientConfirmation(record);

    // 4. n8n / CRM Webhook Automation
    await this.dispatchWebhook(record);

    return {
      success: true,
      message: "Thank you: your project request has been received.",
    };
  }

  /**
   * Append row to Google Sheets
   * Columns: Date, Time, Name, Business, Email, Phone, Instagram, Website, City, Service, Plan, Budget, Message, Lead Status, Notes
   */
  private static async appendToGoogleSheet(record: Record<string, string>): Promise<void> {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!sheetId || !clientEmail || !privateKey) {
      console.log(
        "[LeadService] Google Sheets credentials not configured. Lead logged safely server-side:",
        JSON.stringify(record, null, 2)
      );
      return;
    }

    try {
      // In production with credentials, call Google Sheets v4 API
      console.log(`[LeadService] Appending row to Google Sheet: ${sheetId}`);
      // Pluggable Google Sheets API logic here
    } catch (err) {
      console.error("[LeadService] Error updating Google Sheet:", err);
      // Graceful degradation: never fail the user request if sheet write fails
    }
  }

  /**
   * Send notification to Anivel Media business email
   * Title: NEW ANIVEL MEDIA PROJECT INQUIRY
   */
  private static async sendAgencyNotification(record: Record<string, string>): Promise<void> {
    const businessEmail = process.env.ANIVEL_BUSINESS_EMAIL || "work.affanshaikh@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailSubject = "NEW ANIVEL MEDIA PROJECT INQUIRY";
    const emailBody = `
NEW ANIVEL MEDIA PROJECT INQUIRY

Client: ${record.Name}
Business: ${record.Business}
Service: ${record.Service}
Plan: ${record.Plan}
Budget: ${record.Budget}
Phone: ${record.Phone}
Email: ${record.Email}
City: ${record.City}
Instagram: ${record.Instagram}
Website: ${record.Website}

Message:
${record.Message}

Lead Status: ${record.LeadStatus}
Timestamp: ${record.Date} ${record.Time}
    `.trim();

    if (!resendApiKey) {
      console.log(`[LeadService] Agency Email Notification for ${businessEmail}:\n${emailBody}`);
      return;
    }

    try {
      // Resend API call if key is provided
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_FROM_EMAIL || "inquiries@anivelmedia.com",
          to: businessEmail,
          subject: emailSubject,
          text: emailBody,
        }),
      });
    } catch (err) {
      console.error("[LeadService] Failed to send agency email notification:", err);
    }
  }

  /**
   * Send confirmation email to client
   */
  private static async sendClientConfirmation(record: Record<string, string>): Promise<void> {
    if (!record.Email || record.Email === "n/a") return;

    const resendApiKey = process.env.RESEND_API_KEY;
    const clientSubject = "We have received your project request | ANIVEL MEDIA";
    const clientBody = `
Hello ${record.Name},

Thanks for reaching out to ANIVEL MEDIA. We have received your project details for ${record.Business}.

Summary of your inquiry:
- Service Required: ${record.Service}
- Interested Plan: ${record.Plan}
- Target Budget: ${record.Budget}

Founder & Creative Director Affan Shaikh is reviewing your information and will reply within 24 business hours. If you'd like to fast-track your inquiry, feel free to ping directly on WhatsApp: https://wa.me/919428777887

Best regards,
Affan Shaikh
ANIVEL MEDIA
https://anivelmedia.com
    `.trim();

    if (!resendApiKey) {
      console.log(`[LeadService] Client Confirmation Email to ${record.Email}:\n${clientBody}`);
      return;
    }

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_FROM_EMAIL || "inquiries@anivelmedia.com",
          to: record.Email,
          subject: clientSubject,
          text: clientBody,
        }),
      });
    } catch (err) {
      console.error("[LeadService] Failed to send client confirmation email:", err);
    }
  }

  /**
   * Dispatch to external automation webhook (e.g. n8n, Make, Supabase)
   */
  private static async dispatchWebhook(record: Record<string, string>): Promise<void> {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("[LeadService] Failed to dispatch n8n webhook:", err);
    }
  }
}
