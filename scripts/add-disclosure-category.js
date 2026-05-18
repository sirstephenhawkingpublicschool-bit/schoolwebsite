/**
 * School CMS Migration: Add Category field to Disclosure model
 * Adds a 'category' simple field to allow organizing live disclosures into
 * A, B, and C categories exactly like the static design!
 */

const { Client, SimpleFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Category Field Migration for Disclosure...");

const client = new Client({
  authToken,
  endpoint,
  name: "add-disclosure-category-field",
});

// Create category simple field on Disclosure
console.log("➕ Creating 'category' simple field on 'Disclosure'...");
client.createSimpleField({
  parentApiId: "Disclosure",
  apiId: "category",
  displayName: "Category",
  type: SimpleFieldType.String,
  description: "Category of the document (use exactly: 'A. General Information', 'B. Documents and Information', or 'C. Result and Academics')",
  isRequired: false,
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ Category field successfully added to Disclosure model!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
