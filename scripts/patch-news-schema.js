const { Client, SimpleFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("Missing credentials");
  process.exit(1);
}

const client = new Client({
  authToken,
  endpoint,
  name: `patch-news-schema-${Date.now()}`,
});

console.log("Adding description and category to NewsItem...");

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

client.run(true)
  .then((result) => {
    console.log("✅ Schema successfully patched!");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  });
