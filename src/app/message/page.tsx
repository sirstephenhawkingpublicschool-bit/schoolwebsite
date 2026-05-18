import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './MessagePage.module.css';
import { schoolDetails } from '@/data/content';

export const metadata = {
  title: `Leadership Messages | ${schoolDetails.name}`,
  description: 'Read the visionary messages from our Principal and Director.',
};

export default function MessagePage() {
  const { messages } = schoolDetails;
  
  // We use the same images as the homepage section
  const images = [
    '/principal-image.png',
    '/director-image.jpg'
  ];

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
        {[messages.principal, messages.director].map((msg, index) => {
          const isReverse = index % 2 !== 0;
          
          return (
            <div key={index} className={`${styles.messageBlock} ${isReverse ? styles.reverse : ''}`}>
              
              {/* Image Column */}
              <div className={styles.imageCol}>
                <div className={styles.imageDeco}></div>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={images[index] || '/placeholder-avatar.png'} 
                    alt={msg.name} 
                    fill 
                    className={styles.image}
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className={styles.textCol}>
                <Quote size={80} className={styles.quoteIcon} />
                <div className={styles.content}>
                  {msg.message.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} style={{ marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{msg.name}</h3>
                  <div className={styles.authorDesignation}>{msg.title}</div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </main>
  );
}
