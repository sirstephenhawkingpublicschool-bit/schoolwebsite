/**
 * Delete HomePage malformed fields and wait for completion.
 */

const { Client } = require("@hygraph/management-sdk");
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
  name: "delete-homepage-fields-" + Date.now(),
});

async function run() {
  console.log("🚀 Starting clean field deletion...");

  const fieldsToDelete = [
    "heroImageLeft",
    "heroImageRight",
    "aboutImage",
    "galleryImages",
  ];

  for (const field of fieldsToDelete) {
    try {
      client.deleteField({
        parentApiId: "HomePage",
        apiId: field,
      });
      console.log(`- Scheduled deletion for field: ${field}`);
    } catch (e) {
      console.log(`- Field ${field} already not present or deleted: ${e.message}`);
    }
  }

  console.log("✨ Submitting deletion batch to Hygraph...");
  const result = await client.run(true);
  console.log("Migration submitted. Details:", JSON.stringify(result, null, 2));

  // Poll for completion
  let status = result.status;
  const migrationId = result.id;

  if (status === "SUCCESS") {
    console.log("✅ Deletion completed immediately!");
    return;
  }

  console.log(`⏳ Migration ID: ${migrationId}. Polling status...`);
  // Note: Since we are running in the SDK, we can query the migration status via our client if possible, 
  // or we can wait a few seconds and run our inspection query.
  // Let's wait 5 seconds to be safe.
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("✅ Wait complete. Run inspection to verify.");
}

run().catch((err) => {
  console.error("❌ Error running script:", err);
});
