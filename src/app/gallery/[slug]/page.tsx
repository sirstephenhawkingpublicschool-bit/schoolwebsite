import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ImageIcon, ZoomIn } from 'lucide-react';
import styles from './GalleryAlbum.module.css';
import { galleryCategories } from '@/data/gallery';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = galleryCategories.find(c => c.id === slug);
  if (!category) return { title: 'Not Found' };
  
  return {
    title: `${category.title} | Gallery`,
  };
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { slug } = await params;
  const category = galleryCategories.find(c => c.id === slug);
  
  if (!category) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <Link href="/gallery" className={styles.backLink}>
          <ArrowLeft size={20} /> Back to Categories
        </Link>
        <h1 className={styles.pageTitle}>{category.title}</h1>
        <div className={styles.meta}>
          <span className={styles.metaItem}><Calendar size={18} /> {category.date}</span>
          <span className={styles.metaItem}><ImageIcon size={18} /> {category.photos.length} Photos</span>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.grid}>
          {category.photos.map((photoUrl, index) => (
            <div key={index} className={styles.photoWrapper}>
              <Image 
                src={photoUrl} 
                alt={`${category.title} photo ${index + 1}`} 
                fill 
                className={styles.photo}
              />
              <ZoomIn size={48} className={styles.zoomIcon} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// Ensure static generation for all known slugs
export function generateStaticParams() {
  return galleryCategories.map((category) => ({
    slug: category.id,
  }));
}
