/**
 * HomePage CMS Schema Update Script
 * Uses @hygraph/management-sdk to add Gallery fields to the HomePage model.
 */

const { Client, SimpleFieldType, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Hygraph CMS HomePage Gallery Schema Migration...");
console.log(`Endpoint: ${endpoint}`);

const client = new Client({
  authToken,
  endpoint,
  name: "add-homepage-gallery-fields",
});

// ==========================================
// UPDATE MODEL: HomePage (Add gallery fields)
// ==========================================
console.log("📝 Adding Gallery fields to model: HomePage...");

// 1. Gallery Title
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "galleryTitle",
  displayName: "Gallery Title",
  type: SimpleFieldType.String,
  isRequired: false,
});

// 2. Gallery Subtitle
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "gallerySubtitle",
  displayName: "Gallery Subtitle",
  type: SimpleFieldType.String,
  isRequired: false,
});

// 3. Gallery Images (Relational Asset List)
client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "galleryImages",
  displayName: "Gallery Images",
  type: RelationalFieldType.Asset,
  isList: true,
  isRequired: false,
  reverseField: {
    apiId: "homePagesGallery",
    modelApiId: "HomePage",
    displayName: "Home Pages Gallery",
  },
});

// ==========================================
// EXECUTE MIGRATION
// ==========================================
console.log("✨ Committing and executing schema migration on Hygraph CMS...");

client.run(true)
  .then((result) => {
    console.log("✅ HomePage Gallery fields successfully added on Hygraph CMS!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  });
