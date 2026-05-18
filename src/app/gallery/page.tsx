"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon, Calendar, Search } from 'lucide-react';
import styles from './GalleryIndex.module.css';
import { galleryCategories } from '@/data/gallery';

export default function GalleryIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter logic
  const filteredCategories = galleryCategories.filter(category => {
    return category.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort logic
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'newest' || sortBy === 'oldest') {
      const timeA = new Date(a.date).getTime() || 0;
      const timeB = new Date(b.date).getTime() || 0;
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    }
    if (sortBy === 'az') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Photo Gallery</h1>
        <p className={styles.pageSubtitle}>
          Explore the vibrant life, events, and infrastructure at our school.
        </p>
      </section>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search albums..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
            aria-label="Sort albums"
          >
            <option value="newest">Sort By: Newest First</option>
            <option value="oldest">Sort By: Oldest First</option>
            <option value="az">Sort By: Title A-Z</option>
            <option value="za">Sort By: Title Z-A</option>
          </select>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {sortedCategories.length > 0 ? (
            sortedCategories.map((category) => (
              <Link href={`/gallery/${category.id}`} key={category.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={category.coverImage} 
                    alt={category.title} 
                    fill 
                    className={styles.image}
                  />
                  <div className={styles.overlay}></div>
                  <div className={styles.content}>
                    <h2 className={styles.title}>{category.title}</h2>
                    <div className={styles.meta}>
                      <span style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                        <Calendar size={16} /> {category.date}
                      </span>
                      <span className={styles.photoCount}>
                        <ImageIcon size={16} /> {category.photos.length} Photos
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>
              No albums found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
