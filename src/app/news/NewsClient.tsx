'use client';

import React, { useState, useMemo } from 'react';
import styles from './NewsPage.module.css';

type NewsItem = {
  id: number;
  date: string;
  category: string;
  title: string;
  description: string;
  content: string;
};

export default function NewsClient({ newsItems }: { newsItems: NewsItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

  const categories = ['All', ...Array.from(new Set(newsItems.map(item => item.category)))];

  const filteredNews = useMemo(() => {
    return newsItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [newsItems, searchQuery, categoryFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search news by title or description..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(3); }}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterBox}>
          <select 
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setVisibleCount(3); }}
            className={styles.filterSelect}
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.newsList}>
        {visibleNews.length > 0 ? visibleNews.map((item) => {
          const [month, dayStr, year] = item.date.replace(',', '').split(' ');
          
          return (
            <article key={item.id} className={styles.newsCard}>
              <div className={styles.dateCol}>
                <span className={styles.dateMonth}>{month}</span>
                <span className={styles.dateDay}>{dayStr}</span>
                <span className={styles.dateYear}>{year}</span>
              </div>
              <div className={styles.contentCol}>
                <span className={styles.category}>{item.category}</span>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.content}>
                  {item.content}
                </div>
              </div>
            </article>
          );
        }) : (
          <div className={styles.noResults}>
            No news found matching your criteria.
          </div>
        )}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load More News
          </button>
        </div>
      )}
    </div>
  );
}
