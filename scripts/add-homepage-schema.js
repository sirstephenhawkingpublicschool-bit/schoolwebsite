/**
 * HomePage CMS Schema Migrator Script
 * Uses @hygraph/management-sdk Client to define the HomePage model and fields.
 */

const { Client, SimpleFieldType, RelationalFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("❌ Error: HYGRAPH_MANAGEMENT_TOKEN or HYGRAPH_ENDPOINT is not defined in .env.local");
  process.exit(1);
}

console.log("🚀 Initializing Hygraph CMS HomePage Schema Migration...");
console.log(`Endpoint: ${endpoint}`);

const client = new Client({
  authToken,
  endpoint,
  name: "add-homepage-schema",
});

// ==========================================
// CREATE MODEL: HomePage
// ==========================================
console.log("📝 Defining model: HomePage...");
client.createModel({
  apiId: "HomePage",
  apiIdPlural: "HomePages",
  displayName: "Home Page",
  description: "Content fields for the Home Page of the school website",
});

// 1. Hero Title
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "heroTitle",
  displayName: "Hero Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 2. Hero Description
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "heroDescription",
  displayName: "Hero Description",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 3. About Title
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "aboutTitle",
  displayName: "About Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 4. About Text
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "aboutText",
  displayName: "About Text",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 5. Years of Excellence
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "yearsOfExcellence",
  displayName: "Years of Excellence Badge",
  type: SimpleFieldType.Int,
  isRequired: true,
});

// 6. CTA Title
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "ctaTitle",
  displayName: "CTA Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 7. CTA Description
client.createSimpleField({
  parentApiId: "HomePage",
  apiId: "ctaDescription",
  displayName: "CTA Description",
  type: SimpleFieldType.String,
  isRequired: true,
});

// 8. Hero Image Left (Relational Asset)
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

// 9. Hero Image Right (Relational Asset)
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

// 10. About Image (Relational Asset)
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

// ==========================================
// EXECUTE MIGRATION
// ==========================================
console.log("✨ Committing and executing schema migration on Hygraph CMS...");

client.run(true)
  .then((result) => {
    console.log("✅ HomePage Schema successfully bootstrapped on Hygraph CMS!");
    console.log("Result summary:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  });
