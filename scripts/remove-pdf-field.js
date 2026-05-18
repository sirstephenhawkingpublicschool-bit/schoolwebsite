/**
 * School CMS Migration: Remove PDF Upload field
 * Deletes the pdfFile field from the Disclosure model,
 * leaving only the driveLink field for Google Drive URLs.
 */

const { Client } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing PDF Field Deletion Migration...");

const client = new Client({
  authToken,
  endpoint,
  name: "remove-pdf-field-support",
});

// 1. Delete the pdfFile field
console.log("🗑️ Deleting 'pdfFile' field from 'Disclosure' model...");
client.deleteField({
  parentApiId: "Disclosure",
  apiId: "pdfFile",
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ pdfFile field successfully deleted from Hygraph!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
