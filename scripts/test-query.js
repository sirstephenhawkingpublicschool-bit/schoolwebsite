require("dotenv").config({ path: ".env.local" });

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_READ_ONLY_TOKEN = process.env.HYGRAPH_READ_ONLY_TOKEN;

const queries = {
  GET_FEE_STRUCTURE: `
    query GetFeeStructure {
      feeStructures(orderBy: serialNo_ASC) {
        id
        serialNo
        className
        monthlyFee
      }
    }
  `,
  GET_ALL_NEWS: `
    query GetAllNews {
      newsItems(orderBy: date_DESC) {
        id
        title
        slug
        content
        date
        image {
          url
          width
          height
        }
      }
    }
  `,
  GET_SCHOOL_MESSAGES: `
    query GetSchoolMessages {
      messages {
        id
        authorName
        designation
        messageText
        authorImage {
          url
        }
      }
    }
  `,
  GET_DISCLOSURES: `
    query GetDisclosures {
      disclosures(orderBy: title_ASC) {
        id
        title
        pdfFile {
          url
        }
      }
    }
  `,
  GET_GALLERY_ALBUMS: `
    query GetGalleryAlbums {
      galleryAlbums(orderBy: date_DESC) {
        id
        albumTitle
        slug
        date
        coverImage {
          url
        }
      }
    }
  `
};

async function testQuery(name, query) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (HYGRAPH_READ_ONLY_TOKEN) {
    headers["Authorization"] = `Bearer ${HYGRAPH_READ_ONLY_TOKEN}`;
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  const res = await response.json();
  if (res.errors) {
    console.log(`❌ ${name} failed:`, JSON.stringify(res.errors, null, 2));
  } else {
    console.log(`✅ ${name} succeeded!`);
  }
}

async function run() {
  for (const [name, query] of Object.entries(queries)) {
    await testQuery(name, query);
  }
}

run();
