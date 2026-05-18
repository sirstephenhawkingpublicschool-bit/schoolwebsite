import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import styles from './GallerySection.module.css';

export default function GallerySection() {
  const images = [
    '/hero-indian-students.png',
    '/culture_bg.png',
    '/classroom_bg.png',
    '/sports_bg.png',
    '/hero-students.png'
  ];

  return (
    <section className={styles.section}>
      <div className={styles.blobRight}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Memories</span>
          <h2 className={styles.title}>School Gallery</h2>
        </div>

        <div className={styles.galleryGrid}>
          {/* Main Large Image */}
          <div className={`${styles.galleryItem} ${styles.mainItem}`}>
            <Image src={images[0]} alt="Gallery Image 1" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          
          {/* 4 Smaller Images */}
          <div className={styles.galleryItem}>
            <Image src={images[1]} alt="Gallery Image 2" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={images[2]} alt="Gallery Image 3" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={images[3]} alt="Gallery Image 4" fill className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.galleryItem}>
            <Image src={images[4]} alt="Gallery Image 5" fill className={styles.image} />
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
