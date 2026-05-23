/**
 * School HomePage CMS Populator Script
 * Automatically inserts and publishes default homepage content into Hygraph CMS.
 */

require("dotenv").config({ path: ".env.local" });

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_MANAGEMENT_TOKEN = process.env.HYGRAPH_MANAGEMENT_TOKEN;

async function runPopulator() {
  if (!HYGRAPH_ENDPOINT || !HYGRAPH_MANAGEMENT_TOKEN) {
    console.error("❌ Error: HYGRAPH_ENDPOINT or HYGRAPH_MANAGEMENT_TOKEN is missing in .env.local");
    process.exit(1);
  }

  console.log("🚀 Starting School HomePage CMS Populator...");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${HYGRAPH_MANAGEMENT_TOKEN}`
  };

  const heroTitle = "Empowering Young Minds For A Brighter Tomorrow";
  const heroDescription = "Welcome to Sir Stephen Hawking Public School, where we foster a culture of academic excellence and strong moral values. We are committed to providing a safe, caring, and inspiring learning environment for students from Classes 1 to 8.";
  const aboutTitle = "A Journey of Excellence & Values";
  const aboutText = "Sir Stephen Hawking Public School is a place where learning meets values, discipline, and overall development. Our school is committed to providing quality education to students from Classes 1 to 8 in a safe, caring, and inspiring environment. We believe that every child is unique and has the potential to achieve success in life. Our aim is not only to focus on academic excellence but also to help students become confident, responsible, and kind individuals. With dedicated teachers, supportive staff, and a positive atmosphere, we encourage students to explore their talents, improve their skills, and prepare themselves for a bright future.";
  const yearsOfExcellence = 15;
  const ctaTitle = "Ready to give your child the best start?";
  const ctaDescription = "Join Sir Stephen Hawking Public School and become part of a community dedicated to academic excellence, discipline, and strong moral values.";

  const createMutation = `
    mutation CreateHomePage {
      createHomePage(data: {
        heroTitle: ${JSON.stringify(heroTitle)},
        heroDescription: ${JSON.stringify(heroDescription)},
        aboutTitle: ${JSON.stringify(aboutTitle)},
        aboutText: ${JSON.stringify(aboutText)},
        yearsOfExcellence: ${yearsOfExcellence},
        ctaTitle: ${JSON.stringify(ctaTitle)},
        ctaDescription: ${JSON.stringify(ctaDescription)}
      }) {
        id
      }
    }
  `;

  try {
    console.log("📥 Creating HomePage entry...");
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: createMutation }),
    });

    const resJson = await response.json();

    if (resJson.errors) {
      console.error("❌ Failed to create HomePage entry:", JSON.stringify(resJson.errors, null, 2));
      process.exit(1);
    }

    const homePageId = resJson.data.createHomePage.id;
    console.log(`✅ Created HomePage entry with ID: ${homePageId}`);

    // Publish the newly created homepage draft!
    console.log("📣 Publishing HomePage entry to live site...");
    const publishMutation = `
      mutation PublishHomePage {
        publishHomePage(where: { id: "${homePageId}" }, to: [PUBLISHED]) {
          id
          stage
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

    console.log(`\n🎉 Success! Successfully populated and published the HomePage entry to your live website!`);

  } catch (error) {
    console.error("❌ Population failed:", error.message);
  }
}

runPopulator();
