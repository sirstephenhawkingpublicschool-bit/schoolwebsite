import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!sheetId || !clientEmail || !privateKey) {
      console.warn("⚠️ Warning: Google Sheets credentials are not fully configured in environment variables.");
      return NextResponse.json(
        {
          status: "error",
          message: "Database integration is not fully configured. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    // Initialize the Google Auth Client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        // Ensure private key newlines are parsed correctly
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format the date/time
    const timestamp = new Date().toISOString();

    let sheetName = "";
    let rowData: any[] = [];

    // Determine target sheet and row structure based on form type
    if (data.formType === "admission") {
      sheetName = "Admissions";
      rowData = [
        timestamp,
        data.studentName || "",
        data.dob || "",
        data.class || "",
        data.previousSchool || "",
        data.parentName || "",
        data.phone || "",
        data.email || "",
        data.message || "",
      ];
    } else if (data.formType === "contact") {
      sheetName = "Contact";
      rowData = [
        timestamp,
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.phone || "",
        data.subject || "",
        data.message || "",
      ];
    } else {
      throw new Error("Unknown form type provided.");
    }

    // Append the data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1`, // Start at A1, API will find the next empty row
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Google Sheets API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal server error during form submission.",
      },
      { status: 500 }
    );
  }
}
