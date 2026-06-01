import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import styles from './NewsSection.module.css';
import { newsItems as mockNewsItems } from '@/data/news';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_ALL_NEWS } from '@/lib/queries';

export default async function NewsSection() {
  let latestNews: any[] = [];
  let useLive = false;

  try {
    const data = await hygraphFetch<{ newsItems: any[] }>({
      query: GET_ALL_NEWS,
      revalidate: 3600,
    });
    
    if (data && data.newsItems && data.newsItems.length > 0) {
      latestNews = data.newsItems.slice(0, 3).map((item: any) => {
        const d = new Date(item.date);
        const formattedDate = !isNaN(d.getTime()) 
          ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : item.date;
          
        return {
          id: item.id,
          date: formattedDate,
          category: item.category || 'General',
          title: item.title,
          description: item.description || (item.content ? item.content.substring(0, 100) + '...' : ''),
        };
      });
      useLive = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch News failed, falling back to mock data:", error);
  }

  if (!useLive) {
    latestNews = mockNewsItems.slice(0, 3);
  }

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
