import styles from './NewsPage.module.css';
import { newsItems } from '@/data/news';
import NewsClient from './NewsClient';

export const metadata = {
  title: 'News & Updates | Sir Stephen Hawking Public School',
  description: 'Stay updated with the latest news, events, and announcements.',
};

export default function NewsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>News & Updates</h1>
        <p className={styles.pageSubtitle}>
          Stay informed about the latest events, achievements, and important announcements from our school.
        </p>
      </section>

      <NewsClient newsItems={newsItems} />
    </main>
  );
}
