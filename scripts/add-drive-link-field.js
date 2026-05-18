/**
 * School CMS Migration: Add Drive Link support
 * Modifies the Disclosure model to make pdfFile optional,
 * and adds a driveLink field for pasting external document links (e.g. Google Drive).
 */

const { Client, SimpleFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Drive Link Schema Migration...");

const client = new Client({
  authToken,
  endpoint,
  name: "add-drive-link-support",
});

// 1. Update pdfFile to be optional
console.log("🔄 Updating 'pdfFile' field on 'Disclosure' to be optional...");
client.updateRelationalField({
  parentApiId: "Disclosure",
  apiId: "pdfFile",
  isRequired: false,
});

// 2. Create driveLink string field
console.log("➕ Creating 'driveLink' simple field on 'Disclosure'...");
client.createSimpleField({
  parentApiId: "Disclosure",
  apiId: "driveLink",
  displayName: "Google Drive / External Link",
  type: SimpleFieldType.String,
  description: "Optional Google Drive or other external link to the document (use if you don't upload a PDF)",
  isRequired: false,
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ Schema successfully updated! Drive links are now supported!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
