/**
 * School CMS Migration: Convert Category to Dropdown (Enumeration)
 * Deletes the old simple 'category' text field,
 * creates a formal 'DisclosureCategory' enumeration on Hygraph,
 * and recreates the 'category' field as a dropdown (enumerable field).
 */

const { Client } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Dropdown Enumeration Migration...");

const client = new Client({
  authToken,
  endpoint,
  name: "convert-category-to-dropdown",
});

// 1. Delete the old text-based category field
console.log("🗑️ Deleting old simple category field...");
client.deleteField({
  parentApiId: "Disclosure",
  apiId: "category",
});

// 2. Create the DisclosureCategory enumeration
console.log("📁 Creating 'DisclosureCategory' enumeration dropdown list...");
client.createEnumeration({
  apiId: "DisclosureCategory",
  displayName: "Disclosure Category",
  values: [
    { apiId: "GENERAL_INFORMATION", displayName: "A. General Information" },
    { apiId: "DOCUMENTS_AND_INFORMATION", displayName: "B. Documents and Information" },
    { apiId: "RESULT_AND_ACADEMICS", displayName: "C. Result and Academics" }
  ],
});

// 3. Create the enumerable field referencing the new dropdown list
console.log("➕ Creating enumerable field 'category' on 'Disclosure' model...");
client.createEnumerableField({
  parentApiId: "Disclosure",
  apiId: "category",
  displayName: "Category",
  enumerationApiId: "DisclosureCategory",
  isRequired: false,
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ Category successfully converted to a dropdown!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
