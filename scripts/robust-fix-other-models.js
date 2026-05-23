/**
 * Robustly fix relation fields on other models using isolated delete transactions.
 */

const { Client, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

const parentFieldsToDelete = [
  { model: "NewsItem", field: "image" },
  { model: "Message", field: "authorImage" },
  { model: "Disclosure", field: "pdfFile" },
  { model: "GalleryAlbum", field: "coverImage" },
  { model: "GalleryAlbum", field: "images" },
];

async function deleteFieldSafely(model, field) {
  const deleteClient = new Client({
    authToken,
    endpoint,
    name: `delete-${model}-${field}-${Date.now()}`,
  });

  try {
    deleteClient.deleteField({ parentApiId: model, apiId: field });
    const res = await deleteClient.run(true);
    console.log(`- Deletion of ${model}.${field}: ${res.status}`);
  } catch (e) {
    console.log(`- Deletion of ${model}.${field} skipped or failed (likely already deleted): ${e.message}`);
  }
}

async function run() {
  console.log("🚀 Starting isolated deletions of malformed relation fields...");

  for (const item of parentFieldsToDelete) {
    await deleteFieldSafely(item.model, item.field);
    // Brief sleep to avoid rate limits or locks
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("⏳ Waiting for database synchronization...");
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Phase 2: Create all fields correctly
  const createClient = new Client({
    authToken,
    endpoint,
    name: "recreate-other-fields-" + Date.now(),
  });

  console.log("📝 Defining correct relation fields with modelApiId: Asset...");

  // 1. NewsItem -> Featured Image
  createClient.createRelationalField({
    parentApiId: "NewsItem",
    apiId: "image",
    displayName: "Featured Image",
    type: RelationalFieldType.Asset,
    isRequired: true,
    reverseField: {
      apiId: "newsItem",
      modelApiId: "Asset",
      displayName: "News Item",
    },
  });

  // 2. Message -> Author Image
  createClient.createRelationalField({
    parentApiId: "Message",
    apiId: "authorImage",
    displayName: "Author Image",
    type: RelationalFieldType.Asset,
    isRequired: true,
    reverseField: {
      apiId: "message",
      modelApiId: "Asset",
      displayName: "Message",
    },
  });

  // 3. Disclosure -> PDF File
  createClient.createRelationalField({
    parentApiId: "Disclosure",
    apiId: "pdfFile",
    displayName: "PDF File",
    type: RelationalFieldType.Asset,
    isRequired: true,
    reverseField: {
      apiId: "disclosure",
      modelApiId: "Asset",
      displayName: "Disclosure",
    },
  });

  // 4. GalleryAlbum -> Cover Image
  createClient.createRelationalField({
    parentApiId: "GalleryAlbum",
    apiId: "coverImage",
    displayName: "Cover Image",
    type: RelationalFieldType.Asset,
    isRequired: true,
    reverseField: {
      apiId: "galleryAlbumCover",
      modelApiId: "Asset",
      displayName: "Gallery Album Cover",
    },
  });

  // 5. GalleryAlbum -> Album Images
  createClient.createRelationalField({
    parentApiId: "GalleryAlbum",
    apiId: "images",
    displayName: "Album Images",
    type: RelationalFieldType.Asset,
    isList: true,
    isRequired: true,
    reverseField: {
      apiId: "galleryAlbumImages",
      modelApiId: "Asset",
      displayName: "Gallery Album Images",
    },
  });

  console.log("✨ Submitting creations to Hygraph...");
  const createRes = await createClient.run(true);
  console.log("✅ All relation fields successfully recreated with correct Asset schema!");
  console.log("Result summary:", JSON.stringify(createRes, null, 2));
}

run().catch((err) => {
  console.error("❌ Error running script:", err);
});
