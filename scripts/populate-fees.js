/**
 * School Fee Structure CMS Populator Script
 * Automatically populates all CBSE classes (Nursery to 8th) into your Hygraph CMS.
 */

require("dotenv").config({ path: ".env.local" });

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_MANAGEMENT_TOKEN = process.env.HYGRAPH_MANAGEMENT_TOKEN;

const feeEntries = [
  { serialNo: 1, className: "NURSERY", monthlyFee: "1300/-" },
  { serialNo: 2, className: "L.K.G", monthlyFee: "1300/-" },
  { serialNo: 3, className: "U.K.G", monthlyFee: "1300/-" },
  { serialNo: 4, className: "1ST", monthlyFee: "1450/-" },
  { serialNo: 5, className: "2ND", monthlyFee: "1500/-" },
  { serialNo: 6, className: "3RD", monthlyFee: "1550/-" },
  { serialNo: 7, className: "4TH", monthlyFee: "1600/-" },
  { serialNo: 8, className: "5TH", monthlyFee: "1650/-" },
  { serialNo: 9, className: "6TH", monthlyFee: "1700/-" },
  { serialNo: 10, className: "7TH", monthlyFee: "1750/-" },
  { serialNo: 11, className: "8TH", monthlyFee: "1800/-" },
];

async function runPopulator() {
  if (!HYGRAPH_ENDPOINT || !HYGRAPH_MANAGEMENT_TOKEN) {
    console.error("❌ Error: HYGRAPH_ENDPOINT or HYGRAPH_MANAGEMENT_TOKEN is missing in .env.local");
    process.exit(1);
  }

  console.log("🚀 Starting School Fee Structure CMS Populator...");

  // 1. Build a single batch mutation to create all 11 fee entries!
  let mutationFields = "";
  feeEntries.forEach((entry, index) => {
    mutationFields += `
      create_${index}: createFeeStructure(data: {
        serialNo: ${entry.serialNo},
        className: "${entry.className}",
        monthlyFee: "${entry.monthlyFee}"
      }) {
        id
      }
    `;
  });

  const createMutation = `
    mutation PopulateFees {
      ${mutationFields}
    }
  `;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${HYGRAPH_MANAGEMENT_TOKEN}`
  };

  try {
    console.log("📥 Creating fee structure entries in Hygraph (Drafts)...");
    const createRes = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: createMutation }),
    });

    const createJson = await createRes.json();

    if (createJson.errors) {
      const isPermissionErr = createJson.errors.some(e => e.message.includes("permission") || e.extensions?.code === "403");
      if (isPermissionErr) {
        console.error("\n❌ Error: Your Permanent Auth Token does not have 'Create' permission for the Content API.");
        console.log("👉 HOW TO FIX:");
        console.log("1. Go to Hygraph -> Project Settings -> API Access -> Permanent Auth Tokens (click your token).");
        console.log("2. Scroll to the 'Content API' section of that token.");
        console.log("3. Click '+ Add Permission'.");
        console.log("4. Set 'Action' to include 'CREATE' and 'PUBLISH' (or check 'All Actions') and click Save.");
        console.log("5. Re-run this script!");
        process.exit(1);
      }
      throw new Error(JSON.stringify(createJson.errors, null, 2));
    }

    console.log("✅ Successfully created all 11 fee structure entries!");

    // 2. Publish all created drafts instantly!
    console.log("📣 Publishing entries to live site...");
    const publishMutation = `
      mutation PublishAllFees {
        publishManyFeeStructures(to: [PUBLISHED]) {
          count
        }
      }
    `;

    const publishRes = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: publishMutation }),
    });

    const publishJson = await publishRes.json();
    if (publishJson.errors) {
      throw new Error(JSON.stringify(publishJson.errors, null, 2));
    }

    console.log(`\n🎉 Success! Successfully published ${publishJson.data.publishManyFeeStructures.count} fee structure entries to your live website!`);

  } catch (error) {
    console.error("❌ Population failed:", error.message);
  }
}

runPopulator();
