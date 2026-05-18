/**
 * School CMS Migration: Create Transfer Certificate Model
 * Creates a complete 'TransferCertificate' model in Hygraph so that parents
 * can verify issued student TCs online dynamically!
 */

const { Client, SimpleFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Transfer Certificate Schema Migration...");

const client = new Client({
  authToken,
  endpoint,
  name: "create-tc-verification-model",
});

// 1. Create Model: TransferCertificate
console.log("📝 Defining model: TransferCertificate...");
client.createModel({
  apiId: "TransferCertificate",
  apiIdPlural: "TransferCertificates",
  displayName: "Transfer Certificate",
  description: "Official student transfer certificates for verification",
});

// 2. Create simple fields
client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "tcNumber",
  displayName: "TC Number",
  type: SimpleFieldType.String,
  isRequired: true,
  isUnique: true,
  description: "Official certificate number (e.g., TC-2026-001)"
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "studentName",
  displayName: "Student Name",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "dob",
  displayName: "Date of Birth (DOB)",
  type: SimpleFieldType.Date,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "admissionNo",
  displayName: "Admission No",
  type: SimpleFieldType.String,
  isRequired: true,
  description: "Student admission register number"
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "fatherName",
  displayName: "Father's Name",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "motherName",
  displayName: "Mother's Name",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "issueDate",
  displayName: "Issue Date",
  type: SimpleFieldType.Date,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "TransferCertificate",
  apiId: "documentUrl",
  displayName: "Document Link (Google Drive / PDF)",
  type: SimpleFieldType.String,
  isRequired: true,
  description: "Paste Google Drive or external view link to the TC"
});

console.log("✨ Committing changes to Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ TransferCertificate model successfully created in Hygraph!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Schema update failed:", err);
  });
