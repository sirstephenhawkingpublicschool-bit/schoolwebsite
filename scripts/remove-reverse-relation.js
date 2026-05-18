/**
 * School CMS Migration: Remove Reverse relation on Asset model
 * Completely removes the orphaned 'disclosure' reverse relational field from the system Asset model.
 */

const { Client } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Reverse Relational Deletion Migration...");

const client = new Client({
  authToken,
  endpoint,
  name: "remove-reverse-disclosure-relation",
});

// Delete the reverse field 'disclosure' from the 'Asset' model
console.log("🗑️ Deleting 'disclosure' reverse relation from 'Asset' system model...");
client.deleteField({
  parentApiId: "Asset",
  apiId: "disclosure",
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ Custom relation 'disclosure' successfully removed from Asset model!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
