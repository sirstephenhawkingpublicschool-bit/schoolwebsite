import Link from 'next/link';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './MessageSection.module.css';
import { schoolDetails } from '../data/content';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_SCHOOL_MESSAGES } from '@/lib/queries';

interface HygraphMessage {
  id: string;
  authorName: string;
  designation: string;
  messageText: string;
  authorImage?: { url: string };
}

export default async function MessageSection() {
  const mockMessages = schoolDetails.messages;
  let principal = {
    name: mockMessages.principal.name,
    title: mockMessages.principal.title,
    message: mockMessages.principal.message,
    imageUrl: '/principal-image.png'
  };
  let director = {
    name: mockMessages.director.name,
    title: mockMessages.director.title,
    message: mockMessages.director.message,
    imageUrl: '/director-image.jpg'
  };

  try {
    const data = await hygraphFetch<{ messages: HygraphMessage[] }>({
      query: GET_SCHOOL_MESSAGES,
      revalidate: 3600,
    });
    
    if (data && data.messages && data.messages.length >= 2) {
      principal = {
        name: data.messages[0].authorName,
        title: data.messages[0].designation,
        message: data.messages[0].messageText,
        imageUrl: data.messages[0].authorImage?.url || '/placeholder-avatar.png'
      };
      director = {
        name: data.messages[1].authorName,
        title: data.messages[1].designation,
        message: data.messages[1].messageText,
        imageUrl: data.messages[1].authorImage?.url || '/placeholder-avatar.png'
      };
    }
  } catch (error) {
    console.warn("Hygraph Fetch Messages failed, falling back to mock data:", error);
  }

  // Helper to truncate message text
  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  return (
    <section className={styles.section}>
      {/* Decorative filler elements */}
      <div className={styles.blobRight}></div>
      <div className={styles.circleOutline}></div>
      <div className={styles.dotPattern}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Leadership</span>
          <h2 className={styles.title}>Messages from our Leadership</h2>
        </div>
        
        <div className={styles.grid}>
          {/* Principal Card */}
          <div className={styles.card}>
            <div className={styles.quoteIcon}>
              <Quote size={24} />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.messageText}>
                "{truncate(principal.message, 160)}"
              </p>
              <div className={styles.authorProfile}>
                <div className={styles.authorImage}>
                  <Image src={principal.imageUrl} alt={principal.name} fill sizes="(max-width: 768px) 100vw, 33vw" priority={true} className={styles.image} />
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{principal.name}</h3>
                  <span className={styles.authorTitle}>{principal.title}</span>
                </div>
              </div>
              <Link href="/message" className={styles.readMoreBtn}>
                View Full Message &rarr;
              </Link>
            </div>
          </div>

          {/* Director Card */}
          <div className={styles.card}>
            <div className={styles.quoteIcon}>
              <Quote size={24} />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.messageText}>
                "{truncate(director.message, 160)}"
              </p>
              <div className={styles.authorProfile}>
                <div className={styles.authorImage}>
                  <Image src={director.imageUrl} alt={director.name} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} />
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{director.name}</h3>
                  <span className={styles.authorTitle}>{director.title}</span>
                </div>
              </div>
              <Link href="/message" className={styles.readMoreBtn}>
                View Full Message &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
