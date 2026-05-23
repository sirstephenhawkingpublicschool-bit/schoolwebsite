import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("⚠️ Warning: GOOGLE_SHEET_WEBHOOK_URL is not defined in environment variables.");
      return NextResponse.json(
        {
          status: "error",
          message: "Database integration is not fully configured. Please configure the GOOGLE_SHEET_WEBHOOK_URL environment variable.",
        },
        { status: 500 }
      );
    }

    // Forward the POST request to Google Apps Script Web App
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resText = await response.text();
    let resJson;

    try {
      resJson = JSON.parse(resText);
    } catch (e) {
      // Sometimes Apps Script returns plain text or redirects
      console.log("Apps Script response text:", resText);
      resJson = { status: "success" }; // If it didn't throw an error, we treat it as success
    }

    if (resJson.status === "error") {
      throw new Error(resJson.message || "Failed saving to Google Sheets.");
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Form submit proxy error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal server error during form submission.",
      },
      { status: 500 }
    );
  }
}
