import Link from 'next/link';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './MessageSection.module.css';
import { schoolDetails } from '../data/content';

export default function MessageSection() {
  const { principal, director } = schoolDetails.messages;
  
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
                  <Image src="/principal-image.png" alt={principal.name} fill className={styles.image} />
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
                  <Image src="/director-image.jpg" alt={director.name} fill className={styles.image} />
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
