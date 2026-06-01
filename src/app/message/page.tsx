import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './MessagePage.module.css';
import { schoolDetails } from '@/data/content';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_SCHOOL_MESSAGES } from '@/lib/queries';

interface HygraphMessage {
  id: string;
  authorName: string;
  designation: string;
  messageText: string;
  authorImage?: { url: string };
}

export const metadata = {
  title: `Leadership Messages | ${schoolDetails.name}`,
  description: 'Read the visionary messages from our Principal and Director.',
};

export default async function MessagePage() {
  const mockMessages = schoolDetails.messages;
  
  let messages: HygraphMessage[] = [];
  let useLive = false;

  try {
    const data = await hygraphFetch<{ messages: HygraphMessage[] }>({
      query: GET_SCHOOL_MESSAGES,
      revalidate: 3600,
    });
    
    if (data && data.messages && data.messages.length > 0) {
      messages = data.messages;
      useLive = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch Messages failed, falling back to mock data:", error);
  }

  // Fallback to static mock data if Hygraph fetch fails or returns empty
  if (!useLive) {
    messages = [
      {
        id: 'mock-1',
        authorName: mockMessages.principal.name,
        designation: mockMessages.principal.title,
        messageText: mockMessages.principal.message,
        authorImage: { url: '/principal-image.png' }
      },
      {
        id: 'mock-2',
        authorName: mockMessages.director.name,
        designation: mockMessages.director.title,
        messageText: mockMessages.director.message,
        authorImage: { url: '/director-image.jpg' }
      }
    ];
  }

  return (
    <main className={styles.page}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerPattern}></div>
        <h1 className={styles.pageTitle}>Leadership Messages</h1>
        <p className={styles.pageSubtitle}>
          Guiding principles and vision from the core of our institution.
        </p>
      </section>

      {/* Messages Container */}
      <div className={styles.container}>
        {messages.map((msg, index) => {
          const isReverse = index % 2 !== 0;
          
          return (
            <div key={msg.id} className={`${styles.messageBlock} ${isReverse ? styles.reverse : ''}`}>
              
              {/* Image Column */}
              <div className={styles.imageCol}>
                <div className={styles.imageDeco}></div>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={msg.authorImage?.url || '/placeholder-avatar.png'} 
                    alt={msg.authorName} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className={styles.image}
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className={styles.textCol}>
                <Quote size={80} className={styles.quoteIcon} />
                <div className={styles.content}>
                  {msg.messageText.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} style={{ marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{msg.authorName}</h3>
                  <div className={styles.authorDesignation}>{msg.designation}</div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </main>
  );
}
