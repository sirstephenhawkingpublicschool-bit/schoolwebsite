"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './GalleryLightbox.module.css';

interface GalleryLightboxProps {
  photos: string[];
  title: string;
}

export default function GalleryLightbox({ photos, title }: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className={styles.grid}>
        {photos.map((photoUrl, index) => (
          <div key={index} className={styles.photoWrapper} onClick={() => openLightbox(index)}>
            <Image 
              src={photoUrl} 
              alt={`${title} photo ${index + 1}`} 
              fill 
              className={styles.photo}
            />
            <ZoomIn size={48} className={styles.zoomIcon} />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={photos[currentIndex]}
              alt={`${title} photo ${currentIndex + 1}`}
              fill
              className={styles.lightboxImage}
            />
            <div className={styles.counter}>
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
