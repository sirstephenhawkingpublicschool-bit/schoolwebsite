/**
 * Hygraph CMS Schema Bootstrapper Script
 * Uses @hygraph/management-sdk Client to automatically define models and fields
 * for Sir Stephen Hawking Public School.
 */

const { Client, SimpleFieldType, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT; // Content API endpoint from which SDK infers project/environment

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  console.log("Please define them in your .env.local file like so:");
  console.log("HYGRAPH_MANAGEMENT_TOKEN=\"your-management-token\"");
  console.log("HYGRAPH_ENDPOINT=\"your-content-api-endpoint\"");
  process.exit(1);
}

console.log("🚀 Initializing Hygraph CMS Migration...");
console.log(`Endpoint: ${endpoint}`);

const client = new Client({
  authToken,
  endpoint,
  name: "bootstrap-school-schema",
});

// ==========================================
// 1. CREATE MODEL: FeeStructure
// ==========================================
console.log("📝 Defining model: FeeStructure...");
client.createModel({
  apiId: "FeeStructure",
  apiIdPlural: "FeeStructures",
  displayName: "Fee Structure",
  description: "Monthly fee structure per class",
});

client.createSimpleField({
  parentApiId: "FeeStructure",
  apiId: "serialNo",
  displayName: "Serial No",
  type: SimpleFieldType.Int,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "FeeStructure",
  apiId: "className",
  displayName: "Class Name",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "FeeStructure",
  apiId: "monthlyFee",
  displayName: "Monthly Fee",
  type: SimpleFieldType.String,
  isRequired: true,
});

// ==========================================
// 2. CREATE MODEL: NewsItem
// ==========================================
console.log("📝 Defining model: NewsItem...");
client.createModel({
  apiId: "NewsItem",
  apiIdPlural: "NewsItems",
  displayName: "News Item",
  description: "School news, updates, and announcements",
});

client.createSimpleField({
  parentApiId: "NewsItem",
  apiId: "title",
  displayName: "Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "NewsItem",
  apiId: "slug",
  displayName: "Slug",
  type: SimpleFieldType.String,
  isRequired: true,
  isUnique: true,
});

client.createSimpleField({
  parentApiId: "NewsItem",
  apiId: "content",
  displayName: "Content",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "NewsItem",
  apiId: "date",
  displayName: "Date",
  type: SimpleFieldType.Date,
  isRequired: true,
});

client.createRelationalField({
  parentApiId: "NewsItem",
  apiId: "image",
  displayName: "Featured Image",
  type: RelationalFieldType.Asset,
  isRequired: true,
  reverseField: {
    apiId: "newsItem",
    modelApiId: "NewsItem",
    displayName: "News Item",
  },
});

// ==========================================
// 3. CREATE MODEL: Message
// ==========================================
console.log("📝 Defining model: Message...");
client.createModel({
  apiId: "Message",
  apiIdPlural: "Messages",
  displayName: "School Message",
  description: "Official messages (e.g. Director's message, Principal's message)",
});

client.createSimpleField({
  parentApiId: "Message",
  apiId: "authorName",
  displayName: "Author Name",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "Message",
  apiId: "designation",
  displayName: "Designation",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "Message",
  apiId: "messageText",
  displayName: "Message Text",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createRelationalField({
  parentApiId: "Message",
  apiId: "authorImage",
  displayName: "Author Image",
  type: RelationalFieldType.Asset,
  isRequired: true,
  reverseField: {
    apiId: "message",
    modelApiId: "Message",
    displayName: "Message",
  },
});

// ==========================================
// 4. CREATE MODEL: Disclosure
// ==========================================
console.log("📝 Defining model: Disclosure...");
client.createModel({
  apiId: "Disclosure",
  apiIdPlural: "Disclosures",
  displayName: "Disclosure Document",
  description: "CBSE mandatory public disclosure documents (PDFs)",
});

client.createSimpleField({
  parentApiId: "Disclosure",
  apiId: "title",
  displayName: "Document Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createRelationalField({
  parentApiId: "Disclosure",
  apiId: "pdfFile",
  displayName: "PDF File",
  type: RelationalFieldType.Asset,
  isRequired: true,
  reverseField: {
    apiId: "disclosure",
    modelApiId: "Disclosure",
    displayName: "Disclosure",
  },
});

// ==========================================
// 5. CREATE MODEL: GalleryAlbum
// ==========================================
console.log("📝 Defining model: GalleryAlbum...");
client.createModel({
  apiId: "GalleryAlbum",
  apiIdPlural: "GalleryAlbums",
  displayName: "Gallery Album",
  description: "Photo gallery albums",
});

client.createSimpleField({
  parentApiId: "GalleryAlbum",
  apiId: "albumTitle",
  displayName: "Album Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "GalleryAlbum",
  apiId: "slug",
  displayName: "Slug",
  type: SimpleFieldType.String,
  isRequired: true,
  isUnique: true,
});

client.createSimpleField({
  parentApiId: "GalleryAlbum",
  apiId: "date",
  displayName: "Date",
  type: SimpleFieldType.Date,
  isRequired: true,
});

client.createRelationalField({
  parentApiId: "GalleryAlbum",
  apiId: "coverImage",
  displayName: "Cover Image",
  type: RelationalFieldType.Asset,
  isRequired: true,
  reverseField: {
    apiId: "galleryAlbumCover",
    modelApiId: "GalleryAlbum",
    displayName: "Gallery Album Cover",
  },
});

client.createRelationalField({
  parentApiId: "GalleryAlbum",
  apiId: "images",
  displayName: "Album Images",
  type: RelationalFieldType.Asset,
  isList: true,
  isRequired: true,
  reverseField: {
    apiId: "galleryAlbumImages",
    modelApiId: "GalleryAlbum",
    displayName: "Gallery Album Images",
  },
});

// ==========================================
// EXECUTE MIGRATION
// ==========================================
console.log("✨ Committing and executing schema migration on Hygraph CMS...");

client.run(true)
  .then((result) => {
    console.log("✅ Schema successfully bootstrapped on Hygraph CMS!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  });
