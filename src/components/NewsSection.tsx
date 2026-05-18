import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import styles from './NewsSection.module.css';
import { newsItems } from '@/data/news';

export default function NewsSection() {
  const latestNews = newsItems.slice(0, 3);
  return (
    <section className={styles.section}>
      {/* Decorative fillers */}
      <div className={styles.triangleDeco}>
        <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5 L35 30 L5 30 Z" stroke="var(--color-primary)" strokeWidth="3" fill="none"/>
        </svg>
      </div>
      <div className={styles.blobLeft}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Stay Updated</span>
          <h2 className={styles.title}>Latest News & Announcements</h2>
        </div>

        <div className={styles.grid}>
          {latestNews.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.category}>{item.category}</span>
                <div className={styles.dateInfo}>
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <Link href="/news" className={styles.readMore}>
                Read More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <Link href="/news" className={styles.viewAllBtn}>
            View All Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
