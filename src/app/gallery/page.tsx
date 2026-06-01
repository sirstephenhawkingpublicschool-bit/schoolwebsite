import { galleryCategories as mockCategories } from '@/data/gallery';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_GALLERY_ALBUMS } from '@/lib/queries';
import GalleryClient, { GalleryCategory } from './GalleryClient';

export const metadata = {
  title: 'Photo Gallery | Sir Stephen Hawking Public School',
  description: 'Explore the vibrant life, events, and infrastructure at our school.',
};

export default async function GalleryIndexPage() {
  let categories: GalleryCategory[] = [];
  let useLive = false;

  try {
    const data = await hygraphFetch<{ galleryAlbums: any[] }>({
      query: GET_GALLERY_ALBUMS,
      revalidate: 3600,
    });
    
    if (data && data.galleryAlbums && data.galleryAlbums.length > 0) {
      categories = data.galleryAlbums.map((album) => ({
        id: album.slug,
        title: album.albumTitle,
        date: album.date,
        coverImage: album.coverImage?.url || '/placeholder-avatar.png',
        photos: album.images || []
      }));
      useLive = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch Gallery Albums failed, falling back to mock data:", error);
  }

  if (!useLive) {
    categories = mockCategories.map(c => ({
      id: c.id,
      title: c.title,
      date: c.date,
      coverImage: c.coverImage,
      photos: c.photos.map(url => ({ id: url, url }))
    }));
  }

  return <GalleryClient initialCategories={categories} />;
}
