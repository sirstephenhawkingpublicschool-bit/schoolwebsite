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
  name: `bootstrap-school-schema-${Date.now()}`,
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
  apiId: "description",
  displayName: "Description",
  type: SimpleFieldType.String,
  isRequired: false,
});

client.createSimpleField({
  parentApiId: "NewsItem",
  apiId: "category",
  displayName: "Category",
  type: SimpleFieldType.String,
  isRequired: false,
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

client.createSimpleField({
  parentApiId: "Disclosure",
  apiId: "driveLink",
  displayName: "Google Drive Link",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "Disclosure",
  apiId: "category",
  displayName: "Category",
  type: SimpleFieldType.String,
  isRequired: true,
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
// 6. CREATE MODEL: HomePage
// ==========================================
console.log("📝 Defining model: HomePage...");
client.createModel({
  apiId: "HomePage",
  apiIdPlural: "HomePages",
  displayName: "Home Page",
  description: "Content for the school homepage",
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "heroTitle",
  displayName: "Hero Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "heroDescription",
  displayName: "Hero Description",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "aboutTitle",
  displayName: "About Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "aboutText",
  displayName: "About Text",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "yearsOfExcellence",
  displayName: "Years of Excellence",
  type: SimpleFieldType.Int,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "ctaTitle",
  displayName: "CTA Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "ctaDescription",
  displayName: "CTA Description",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "galleryTitle",
  displayName: "Gallery Title",
  type: SimpleFieldType.String,
  isRequired: false,
});

client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "gallerySubtitle",
  displayName: "Gallery Subtitle",
  type: SimpleFieldType.String,
  isRequired: false,
});

client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "galleryImages",
  displayName: "Gallery Images",
  type: RelationalFieldType.Asset,
  isList: true,
  isRequired: false,
  reverseField: {
    apiId: "homePageGallery",
    modelApiId: "HomePage",
    displayName: "Home Page Gallery",
  },
});

client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "heroImageLeft",
  displayName: "Hero Image Left",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageHeroLeft",
    modelApiId: "HomePage",
    displayName: "Home Page Hero Left",
  },
});

client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "heroImageRight",
  displayName: "Hero Image Right",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageHeroRight",
    modelApiId: "HomePage",
    displayName: "Home Page Hero Right",
  },
});

client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "aboutImage",
  displayName: "About Image",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageAboutImage",
    modelApiId: "HomePage",
    displayName: "Home Page About Image",
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
