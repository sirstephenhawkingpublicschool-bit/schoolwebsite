import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ImageIcon } from 'lucide-react';
import GalleryLightbox from '@/components/GalleryLightbox';
import styles from './GalleryAlbum.module.css';
import { galleryCategories } from '@/data/gallery';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_GALLERY_ALBUM_BY_SLUG, GET_GALLERY_ALBUMS } from '@/lib/queries';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  try {
    const data = await hygraphFetch<{ galleryAlbum: any }>({
      query: GET_GALLERY_ALBUM_BY_SLUG,
      variables: { slug },
      revalidate: 3600,
    });
    if (data && data.galleryAlbum) {
      return { title: `${data.galleryAlbum.albumTitle} | Gallery` };
    }
  } catch (error) {}

  const category = galleryCategories.find(c => c.id === slug);
  if (!category) return { title: 'Not Found' };
  
  return {
    title: `${category.title} | Gallery`,
  };
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { slug } = await params;
  
  let albumTitle = '';
  let albumDate = '';
  let photos: string[] = [];
  let found = false;

  try {
    const data = await hygraphFetch<{ galleryAlbum: any }>({
      query: GET_GALLERY_ALBUM_BY_SLUG,
      variables: { slug },
      revalidate: 3600,
    });
    
    if (data && data.galleryAlbum) {
      albumTitle = data.galleryAlbum.albumTitle;
      albumDate = data.galleryAlbum.date || '';
      photos = data.galleryAlbum.images ? data.galleryAlbum.images.map((img: any) => img.url) : [];
      found = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch Gallery Album failed, falling back to mock data:", error);
  }

  if (!found) {
    const category = galleryCategories.find(c => c.id === slug);
    if (!category) {
      notFound();
    }
    albumTitle = category.title;
    albumDate = category.date;
    photos = category.photos;
  }

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <Link href="/gallery" className={styles.backLink}>
          <ArrowLeft size={20} /> Back to Categories
        </Link>
        <h1 className={styles.pageTitle}>{albumTitle}</h1>
        <div className={styles.meta}>
          <span className={styles.metaItem}><Calendar size={18} /> {albumDate}</span>
          <span className={styles.metaItem}><ImageIcon size={18} /> {photos.length} Photos</span>
        </div>
      </section>

      <div className={styles.container}>
        <GalleryLightbox photos={photos} title={albumTitle} />
      </div>
    </main>
  );
}

// Ensure static generation for all known slugs
export async function generateStaticParams() {
  try {
    const data = await hygraphFetch<{ galleryAlbums: any[] }>({
      query: GET_GALLERY_ALBUMS,
    });
    if (data && data.galleryAlbums) {
      return data.galleryAlbums.map((album) => ({
        slug: album.slug,
      }));
    }
  } catch (error) {}

  return galleryCategories.map((category) => ({
    slug: category.id,
  }));
}
