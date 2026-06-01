import styles from './NewsPage.module.css';
import { newsItems as mockNewsItems } from '@/data/news';
import NewsClient from './NewsClient';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_ALL_NEWS } from '@/lib/queries';

export const metadata = {
  title: 'News & Updates | Sir Stephen Hawking Public School',
  description: 'Stay updated with the latest news, events, and announcements.',
};

export default async function NewsPage() {
  let newsItems: any[] = [];
  let useLive = false;

  try {
    const data = await hygraphFetch<{ newsItems: any[] }>({
      query: GET_ALL_NEWS,
      revalidate: 3600,
    });
    
    if (data && data.newsItems && data.newsItems.length > 0) {
      newsItems = data.newsItems.map((item: any) => {
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
          content: item.content
        };
      });
      useLive = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch News failed, falling back to mock data:", error);
  }

  if (!useLive) {
    newsItems = mockNewsItems;
  }

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
