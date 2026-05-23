/**
 * Recreate HomePage relations on Hygraph CMS with modelApiId specified.
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
  name: "recreate-homepage-relations",
});

console.log("📝 Re-creating fields with correct Asset relations...");

// 1. Hero Image Left
client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "heroImageLeft",
  displayName: "Hero Image Left",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageLeft",
    modelApiId: "HomePage",
    displayName: "Home Page Left",
  },
});

// 2. Hero Image Right
client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "heroImageRight",
  displayName: "Hero Image Right",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageRight",
    modelApiId: "HomePage",
    displayName: "Home Page Right",
  },
});

// 3. About Image
client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "aboutImage",
  displayName: "About Image",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageAbout",
    modelApiId: "HomePage",
    displayName: "Home Page About",
  },
});

// 4. Gallery Images (List of Assets)
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

console.log("✨ Executing correct field creation on Hygraph...");
client.run(true)
  .then((result) => {
    console.log("✅ Relation fields successfully recreated!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running script:", err);
  });
