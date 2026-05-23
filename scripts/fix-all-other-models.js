/**
 * Fix relation fields on all other Hygraph CMS models (NewsItem, Message, Disclosure, GalleryAlbum)
 */

const { Client, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

async function run() {
  console.log("🚀 Starting relation fix for NewsItem, Message, Disclosure, and GalleryAlbum models...");

  // Phase 1: Deletion client
  const deleteClient = new Client({
    authToken,
    endpoint,
    name: "delete-other-malformed-fields-" + Date.now(),
  });

  // 1. NewsItem fields
  deleteClient.deleteField({ parentApiId: "NewsItem", apiId: "image" });
  try { deleteClient.deleteField({ parentApiId: "NewsItem", apiId: "newsItem" }); } catch (e) {}

  // 2. Message fields
  deleteClient.deleteField({ parentApiId: "Message", apiId: "authorImage" });
  try { deleteClient.deleteField({ parentApiId: "Message", apiId: "message" }); } catch (e) {}

  // 3. Disclosure fields
  deleteClient.deleteField({ parentApiId: "Disclosure", apiId: "pdfFile" });
  try { deleteClient.deleteField({ parentApiId: "Disclosure", apiId: "disclosure" }); } catch (e) {}

  // 4. GalleryAlbum fields
  deleteClient.deleteField({ parentApiId: "GalleryAlbum", apiId: "coverImage" });
  deleteClient.deleteField({ parentApiId: "GalleryAlbum", apiId: "images" });
  try { deleteClient.deleteField({ parentApiId: "GalleryAlbum", apiId: "galleryAlbumCover" }); } catch (e) {}
  try { deleteClient.deleteField({ parentApiId: "GalleryAlbum", apiId: "galleryAlbumImages" }); } catch (e) {}

  console.log("✨ Submitting field deletions to Hygraph...");
  const deleteRes = await deleteClient.run(true);
  console.log("✅ Deletions completed. Response status:", deleteRes.status);

  // Wait 3 seconds for database sync
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Phase 2: Creation client
  const createClient = new Client({
    authToken,
    endpoint,
    name: "recreate-other-correct-fields-" + Date.now(),
  });

  console.log("📝 Defining corrected relation fields with modelApiId: Asset...");

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

  console.log("✨ Submitting correct field creations to Hygraph...");
  const createRes = await createClient.run(true);
  console.log("✅ All relation fields successfully recreated with correct Asset schema!");
  console.log("Result summary:", JSON.stringify(createRes, null, 2));
}

run().catch((err) => {
  console.error("❌ Error running script:", err);
});
