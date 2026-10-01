/**
 * ==============================================================================
 * ANIVEL MEDIA — Google Sheets Ingestion & Instant Email Alert v3.0
 * ==============================================================================
 * Features:
 * 1. Writes directly into the FIRST/ACTIVE tab of your Google Sheet.
 * 2. Automatically creates bold branded headers on Row 1.
 * 3. Sends an instant HTML email alert to: work.affanshaikh@gmail.com
 *    and your Google account with a 1-click WhatsApp button to contact the lead.
 * 4. Includes a built-in test function (testSendLead) to verify permissions & delivery.
 */

// Your verified email where all lead alerts are delivered:
const OWNER_EMAIL = "work.affanshaikh@gmail.com";

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Always target the first sheet (or active sheet) so you see leads immediately on tab 1
    const sheet = ss.getSheets()[0];
    
    // 1. Format timestamp in Indian Standard Time (IST)
    const formattedTimestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");

    // 2. Automatically create bold colored headers on Row 1 if empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp (IST)",
        "Reference ID",
        "Client Name",
        "Brand / Business",
        "Phone / WhatsApp",
        "Email",
        "City",
        "Selected Plan",
        "Plan Price",
        "Primary Goal",
        "Timeline",
        "Instagram / Website",
        "Asset Drive URL",
        "Project Notes",
        "Terms Accepted",
        "Status"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#CB2957")
        .setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // 3. Append the client submission to Google Sheet
    sheet.appendRow([
      formattedTimestamp,
      data.referenceId || "N/A",
      data.fullName || "N/A",
      data.brandName || "N/A",
      data.phone || "N/A",
      data.email || "N/A",
      data.city || "N/A",
      data.selectedPlan || "N/A",
      data.planPrice || "N/A",
      data.primaryGoal || "N/A",
      data.timeline || "N/A",
      data.instagramOrWebsite || "N/A",
      data.assetDriveUrl || "None",
      data.projectNotes || "None",
      data.termsAccepted || "YES",
      "NEW LEAD"
    ]);

    // 4. Send Instant Email Alert to Owner
    sendEmailAlert(data, formattedTimestamp);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Lead recorded in Google Sheet and email alerts sent."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailAlert(data, timestamp) {
  // Deliver alert to work.affanshaikh@gmail.com and the Google Sheet owner
  const currentGoogleUser = Session.getEffectiveUser().getEmail();
  const recipientList = [OWNER_EMAIL];
  if (currentGoogleUser && currentGoogleUser !== OWNER_EMAIL) {
    recipientList.push(currentGoogleUser);
  }
  const toEmails = recipientList.join(",");

  const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");
  const whatsappUrl = "https://wa.me/" + cleanPhone;

  const subject = "🎬 NEW LEAD: " + (data.brandName || "New Client") + " — " + (data.selectedPlan || "Plan") + " [" + (data.referenceId || "") + "]";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0B0B10; color: #EEEEEE; padding: 28px; border-radius: 12px; border: 1px solid #CB2957;">
      <div style="text-align: center; border-bottom: 1px solid #2A2A38; padding-bottom: 18px; margin-bottom: 22px;">
        <h2 style="color: #CB2957; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px;">ANIVEL MEDIA &bull; NEW ONBOARDING INTAKE</h2>
        <p style="color: #A0A0B0; font-size: 13px; margin-top: 6px;">Submitted on ${timestamp} (IST)</p>
      </div>

      <div style="background: #13131B; padding: 18px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #232332;">
        <h3 style="color: #CB2957; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Client & Contact Details</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Reference ID:</strong> <span style="color: #CB2957; font-weight: bold;">${data.referenceId || "N/A"}</span></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Client Name:</strong> ${data.fullName || "N/A"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Brand / Business:</strong> <span style="color: #FFFFFF; font-weight: bold;">${data.brandName || "N/A"}</span></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> <a href="${whatsappUrl}" style="color: #25D366; text-decoration: none; font-weight: bold;">${data.phone || "N/A"} (Open WhatsApp)</a></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #CB2957; text-decoration: none;">${data.email || "N/A"}</a></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>City:</strong> ${data.city || "N/A"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Instagram / Website:</strong> ${data.instagramOrWebsite || "N/A"}</p>
      </div>

      <div style="background: #13131B; padding: 18px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #232332;">
        <h3 style="color: #CB2957; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Selected Plan & Scope</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Plan:</strong> <span style="color: #FFFFFF; font-weight: bold;">${data.selectedPlan || "N/A"}</span> (${data.planPrice || "Custom"})</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Primary Goal:</strong> ${data.primaryGoal || "N/A"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Kickoff Timeline:</strong> ${data.timeline || "N/A"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Asset Drive URL:</strong> ${data.assetDriveUrl && data.assetDriveUrl !== "None" ? `<a href="${data.assetDriveUrl}" style="color: #CB2957;">${data.assetDriveUrl}</a>` : "None Provided"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Project Notes:</strong> ${data.projectNotes || "None"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Terms Accepted:</strong> ${data.termsAccepted || "YES"} (v2.0)</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${whatsappUrl}" style="background: #25D366; color: #FFFFFF; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
          💬 Reply to Client on WhatsApp &rarr;
        </a>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: toEmails,
    subject: subject,
    htmlBody: htmlBody
  });
}

function doGet(e) {
  return ContentService.createTextOutput("Anivel Media Google Sheets & Email Webhook is ACTIVE.");
}

/**
 * Run this function directly inside the Apps Script editor to:
 * 1. Grant authorization permissions for MailApp & SpreadsheetApp
 * 2. Verify that a row appears in your Google Sheet immediately
 * 3. Verify that an email arrives in work.affanshaikh@gmail.com
 */
function testSendLead() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        referenceId: "ANV-2026-TEST",
        timestamp: "01/10/2026, 07:00:00 PM",
        fullName: "Affan Shaikh Live Test",
        brandName: "Anivel Media Production",
        phone: "+91 94287 77887",
        email: "work.affanshaikh@gmail.com",
        city: "Navsari",
        selectedPlan: "Brand Growth Plan 02",
        planPrice: "₹10,000 / mo",
        primaryGoal: "Viral Organic Reach & Follower Growth",
        timeline: "Immediate (Within 7-10 Days)",
        instagramOrWebsite: "@anivelmedia",
        assetDriveUrl: "https://drive.google.com/test",
        projectNotes: "Live end-to-end verification test",
        termsAccepted: "YES"
      })
    }
  };

  const output = doPost(fakeEvent);
  Logger.log("Test Result: " + output.getContent());
}
