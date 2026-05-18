/**
 * GraphQL queries for Sir Stephen Hawking Public School Hygraph CMS integration.
 */

// 1. QUERY FOR FEE STRUCTURE
export const GET_FEE_STRUCTURE = `
  query GetFeeStructure {
    feeStructures(orderBy: serialNo_ASC) {
      id
      serialNo
      className
      monthlyFee
    }
  }
`;

// 2. QUERY FOR NEWS & UPDATES (Notices)
export const GET_ALL_NEWS = `
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
`;

export const GET_NEWS_BY_SLUG = `
  query GetNewsBySlug($slug: String!) {
    newsItem(where: { slug: $slug }) {
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
`;

// 3. QUERY FOR MESSAGES (Director/Principal Message)
export const GET_SCHOOL_MESSAGES = `
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
`;

export const GET_DISCLOSURES = `
  query GetDisclosures {
    disclosures(orderBy: title_ASC) {
      id
      title
      driveLink
      pdfFile {
        url
      }
    }
  }
`;

// 5. QUERY FOR GALLERY ALBUMS
export const GET_GALLERY_ALBUMS = `
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
`;

export const GET_GALLERY_ALBUM_BY_SLUG = `
  query GetGalleryAlbumBySlug($slug: String!) {
    galleryAlbum(where: { slug: $slug }) {
      id
      albumTitle
      slug
      coverImage {
        url
      }
      images {
        id
        url
      }
    }
  }
`;
