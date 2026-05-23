/**
 * Fix HomePage relations on Hygraph CMS
 * Deletes the malformed fields and recreates them correctly.
 */

const { Client, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

const client = new Client({
  authToken,
  endpoint,
  name: "fix-homepage-relations",
});

async function run() {
  console.log("🚀 Starting relation fix for HomePage model...");

  // Phase 1: Delete all malformed fields
  console.log("🗑️ Deleting malformed fields from HomePage...");
  const fieldsToDelete = [
    "heroImageLeft",
    "homePageLeft",
    "heroImageRight",
    "homePageRight",
    "aboutImage",
    "homePageAbout",
    "galleryImages",
    "homePagesGallery",
  ];

  for (const field of fieldsToDelete) {
    try {
      client.deleteField({
        parentApiId: "HomePage",
        apiId: field,
      });
      console.log(`- Scheduled deletion for field: ${field}`);
    } catch (e) {
      console.warn(`- Could not schedule deletion for ${field}:`, e.message);
    }
  }

  console.log("✨ Executing field deletion on Hygraph...");
  await client.run(true);
  console.log("✅ Deletion completed successfully.");

  // Clear the client queue for the next phase
  const client2 = new Client({
    authToken,
    endpoint,
    name: "recreate-homepage-relations",
  });

  // Phase 2: Recreate fields correctly
  console.log("📝 Re-creating fields with correct Asset relations...");

  // 1. Hero Image Left
  client2.createRelationalField({
    parentApiId: "HomePage",
    apiId: "heroImageLeft",
    displayName: "Hero Image Left",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageLeft",
      displayName: "Home Page Left",
    },
  });

  // 2. Hero Image Right
  client2.createRelationalField({
    parentApiId: "HomePage",
    apiId: "heroImageRight",
    displayName: "Hero Image Right",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageRight",
      displayName: "Home Page Right",
    },
  });

  // 3. About Image
  client2.createRelationalField({
    parentApiId: "HomePage",
    apiId: "aboutImage",
    displayName: "About Image",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageAbout",
      displayName: "Home Page About",
    },
  });

  // 4. Gallery Images (List of Assets)
  client2.createRelationalField({
    parentApiId: "HomePage",
    apiId: "galleryImages",
    displayName: "Gallery Images",
    type: RelationalFieldType.Asset,
    isList: true,
    isRequired: false,
    reverseField: {
      apiId: "homePagesGallery",
      displayName: "Home Pages Gallery",
    },
  });

  console.log("✨ Executing correct field creation on Hygraph...");
  const result = await client2.run(true);
  console.log("✅ Relation fields successfully fixed and recreated!");
  console.log("Result summary:", JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error("❌ Error running script:", err);
});
