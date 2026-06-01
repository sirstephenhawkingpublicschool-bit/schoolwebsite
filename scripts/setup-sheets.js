const { google } = require("googleapis");
require("dotenv").config({ path: ".env.local" });

const sheetId = process.env.GOOGLE_SHEET_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY;

if (!sheetId || !clientEmail || !privateKey) {
  console.error("Missing Google Sheets credentials in .env.local");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function setupSheets() {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const existingSheets = spreadsheet.data.sheets.map(s => s.properties.title);
    
    // Check if Admissions sheet exists
    if (!existingSheets.includes("Admissions")) {
      console.log("Renaming first sheet to 'Admissions'...");
      const firstSheetId = spreadsheet.data.sheets[0].properties.sheetId;
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId: firstSheetId,
                  title: "Admissions"
                },
                fields: "title"
              }
            }
          ]
        }
      });
    }

    // To be safe, re-fetch sheets
    const updatedSpreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });
    const updatedSheetTitles = updatedSpreadsheet.data.sheets.map(s => s.properties.title);

    if (!updatedSheetTitles.includes("Contact")) {
      console.log("Creating 'Contact' sheet...");
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Contact"
                }
              }
            }
          ]
        }
      });
    }

    const finalSpreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });
    const admissionsSheetId = finalSpreadsheet.data.sheets.find(s => s.properties.title === "Admissions").properties.sheetId;
    const contactSheetId = finalSpreadsheet.data.sheets.find(s => s.properties.title === "Contact").properties.sheetId;

    // Check Admissions headers
    const admissionsData = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Admissions!A1:A1",
    });
    
    if (!admissionsData.data.values || admissionsData.data.values[0][0] !== "Timestamp") {
      console.log("Inserting header row for Admissions...");
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              insertDimension: {
                range: {
                  sheetId: admissionsSheetId,
                  dimension: "ROWS",
                  startIndex: 0,
                  endIndex: 1
                },
                inheritFromBefore: false
              }
            }
          ]
        }
      });
    }

    // Check Contact headers
    const contactData = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Contact!A1:A1",
    });
    
    if (!contactData.data.values || contactData.data.values[0][0] !== "Timestamp") {
      console.log("Inserting header row for Contact...");
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              insertDimension: {
                range: {
                  sheetId: contactSheetId,
                  dimension: "ROWS",
                  startIndex: 0,
                  endIndex: 1
                },
                inheritFromBefore: false
              }
            }
          ]
        }
      });
    }

    // Update Headers for Admissions
    console.log("Adding headers to 'Admissions'...");
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Admissions!A1:I1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          ["Timestamp", "Student Name", "Date of Birth", "Class", "Previous School", "Parent Name", "Phone", "Email", "Message"]
        ]
      }
    });

    // Update Headers for Contact
    console.log("Adding headers to 'Contact'...");
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Contact!A1:G1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Subject", "Message"]
        ]
      }
    });
    
    // Make headers bold
    console.log("Formatting headers...");
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: admissionsSheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  textFormat: { bold: true },
                  backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 }
                }
              },
              fields: "userEnteredFormat(textFormat,backgroundColor)"
            }
          },
          {
            repeatCell: {
              range: {
                sheetId: contactSheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  textFormat: { bold: true },
                  backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 }
                }
              },
              fields: "userEnteredFormat(textFormat,backgroundColor)"
            }
          }
        ]
      }
    });

    console.log("✅ Setup complete! Headers have been added and formatted.");
  } catch (error) {
    console.error("Error setting up sheets:", error);
  }
}

setupSheets();
