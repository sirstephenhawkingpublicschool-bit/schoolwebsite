/**
 * Test Asset Relation Field Creation
 */

const { Client, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

const client = new Client({
  authToken,
  endpoint,
  name: "test-asset-relation-" + Date.now(),
});

console.log("📝 Running test relation creation with modelApiId: Asset...");

client.createRelationalField({
  parentApiId: "HomePage",
  apiId: "heroImageLeft",
  displayName: "Hero Image Left",
  type: RelationalFieldType.Asset,
  isRequired: false,
  reverseField: {
    apiId: "homePageLeft",
    modelApiId: "Asset", // Testing "Asset" as modelApiId
    displayName: "Home Page Left",
  },
});

client.run(true)
  .then((result) => {
    console.log("✅ Success! Hygraph accepted modelApiId: Asset");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Failed with modelApiId: Asset. Error:", err.message);
  });
