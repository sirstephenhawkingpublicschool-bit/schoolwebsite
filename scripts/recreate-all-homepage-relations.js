/**
 * Recreate all HomePage relations with correct modelApiId: Asset
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
  console.log("🚀 Starting clean field recreation script...");

  // Phase 1: Delete the test field
  const deleteClient = new Client({
    authToken,
    endpoint,
    name: "delete-test-field-" + Date.now(),
  });

  console.log("🗑️ Deleting test field heroImageLeft...");
  try {
    deleteClient.deleteField({
      parentApiId: "HomePage",
      apiId: "heroImageLeft",
    });
  } catch (e) {
    console.log("- Test field not present:", e.message);
  }

  console.log("✨ Submitting deletion to Hygraph...");
  await deleteClient.run(true);
  console.log("✅ Deletion completed successfully.");

  // Wait 2 seconds for database processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Phase 2: Create all fields correctly
  const createClient = new Client({
    authToken,
    endpoint,
    name: "recreate-all-fields-" + Date.now(),
  });

  console.log("📝 Defining fields with modelApiId: Asset...");

  // 1. Hero Image Left
  createClient.createRelationalField({
    parentApiId: "HomePage",
    apiId: "heroImageLeft",
    displayName: "Hero Image Left",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageLeft",
      modelApiId: "Asset",
      displayName: "Home Page Left",
    },
  });

  // 2. Hero Image Right
  createClient.createRelationalField({
    parentApiId: "HomePage",
    apiId: "heroImageRight",
    displayName: "Hero Image Right",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageRight",
      modelApiId: "Asset",
      displayName: "Home Page Right",
    },
  });

  // 3. About Image
  createClient.createRelationalField({
    parentApiId: "HomePage",
    apiId: "aboutImage",
    displayName: "About Image",
    type: RelationalFieldType.Asset,
    isRequired: false,
    reverseField: {
      apiId: "homePageAbout",
      modelApiId: "Asset",
      displayName: "Home Page About",
    },
  });

  // 4. Gallery Images (List of Assets)
  createClient.createRelationalField({
    parentApiId: "HomePage",
    apiId: "galleryImages",
    displayName: "Gallery Images",
    type: RelationalFieldType.Asset,
    isList: true,
    isRequired: false,
    reverseField: {
      apiId: "homePagesGallery",
      modelApiId: "Asset",
      displayName: "Home Pages Gallery",
    },
  });

  console.log("✨ Submitting field recreation to Hygraph...");
  const result = await createClient.run(true);
  console.log("✅ All relation fields successfully recreated with correct Asset schema!");
  console.log("Result summary:", JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error("❌ Error running script:", err);
});
