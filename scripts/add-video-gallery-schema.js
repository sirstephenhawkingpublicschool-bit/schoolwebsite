const { Client, SimpleFieldType } = require("@hygraph/management-sdk");
require("dotenv").config({ path: ".env.local" });

const authToken = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!authToken || !endpoint) {
  console.error("Missing credentials in .env.local");
  process.exit(1);
}

const client = new Client({
  authToken,
  endpoint,
  name: `add-video-gallery-schema-${Date.now()}`,
});

console.log("Adding VideoGallery model...");

client.createModel({
  apiId: "VideoGallery",
  apiIdPlural: "VideoGalleries",
  displayName: "Video Gallery",
  description: "A collection of videos from YouTube/Vimeo to be displayed on the video gallery page.",
});

client.createSimpleField({
  parentApiId: "VideoGallery",
  apiId: "title",
  displayName: "Title",
  type: SimpleFieldType.String,
  isRequired: true,
});

client.createSimpleField({
  parentApiId: "VideoGallery",
  apiId: "videoUrl",
  displayName: "Video URL",
  type: SimpleFieldType.String,
  isRequired: true,
  description: "The URL of the YouTube or Vimeo video (e.g., https://www.youtube.com/watch?v=...)",
});

client.createSimpleField({
  parentApiId: "VideoGallery",
  apiId: "date",
  displayName: "Date",
  type: SimpleFieldType.Date,
  isRequired: false,
});

client.run(true)
  .then((result) => {
    console.log("✅ VideoGallery schema successfully created!");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  });
