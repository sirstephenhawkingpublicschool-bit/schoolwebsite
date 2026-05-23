import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import styles from './GallerySection.module.css';

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images?: string[];
}

export default function GallerySection({ title, subtitle, images }: GallerySectionProps) {
  const displayTitle = title || "School Gallery";
  const displaySubtitle = subtitle || "Our Memories";

  const defaultImages = [
    '/hero-indian-students.png',
    '/culture_bg.png',
    '/classroom_bg.png',
    '/sports_bg.png',
    '/hero-students.png'
  ];

  // Merge dynamic images with default images if not enough images are provided
  const displayImages = [...defaultImages];
  if (images && images.length > 0) {
    for (let i = 0; i < Math.min(images.length, 5); i++) {
      displayImages[i] = images[i];
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.blobRight}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{displaySubtitle}</span>
          <h2 className={styles.title}>{displayTitle}</h2>
        </div>

        <div className={styles.galleryGrid}>
          {/* Main Large Image */}
          <div className={`${styles.galleryItem} ${styles.mainItem}`}>
            <Image src={displayImages[0]} alt="Gallery Image 1" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          
          {/* 4 Smaller Images */}
          <div className={styles.galleryItem}>
            <Image src={displayImages[1]} alt="Gallery Image 2" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={displayImages[2]} alt="Gallery Image 3" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={displayImages[3]} alt="Gallery Image 4" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={displayImages[4]} alt="Gallery Image 5" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <Link href="/gallery" className={styles.viewGalleryBtn}>
            <ImageIcon size={18} />
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

