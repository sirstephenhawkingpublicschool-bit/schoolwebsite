/**
 * Inspect Hygraph HomePage Schema
 */
const fetch = require("node-fetch");
require("dotenv").config({ path: ".env.local" });

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_MANAGEMENT_TOKEN;

if (!endpoint) {
  console.error("❌ Error: HYGRAPH_ENDPOINT is not defined");
  process.exit(1);
}

const query = `
  query {
    __type(name: "HomePage") {
      name
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
`;

console.log("🔍 Fetching HomePage schema details...");

fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({ query }),
})
  .then((res) => res.json())
  .then((json) => {
    if (json.errors) {
      console.error("❌ GraphQL Errors:", JSON.stringify(json.errors, null, 2));
    } else {
      console.log("✅ HomePage Type Fields:");
      console.log(JSON.stringify(json.data.__type, null, 2));
    }
  })
  .catch((err) => {
    console.error("❌ Fetch Error:", err);
  });
