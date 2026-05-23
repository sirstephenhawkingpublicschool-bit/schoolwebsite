import Image from 'next/image';
import Link from 'next/link';
import { Check, GraduationCap } from 'lucide-react';
import styles from './Hero.module.css';
import { schoolDetails } from '../data/content';

interface HeroProps {
  title?: string;
  description?: string;
  imageLeft?: string;
  imageRight?: string;
}

export default function Hero({ title, description, imageLeft, imageRight }: HeroProps) {
  const defaultTitle = "Empowering Young Minds For A Brighter Tomorrow";
  const displayTitle = title || defaultTitle;

  const renderTitle = (text: string) => {
    const highlightWord = "Young Minds";
    if (text.includes(highlightWord)) {
      const parts = text.split(highlightWord);
      return (
        <>
          {parts[0]}
          <span className={styles.highlight}>{highlightWord}</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section className={styles.hero}>
      {/* Decorative wavy lines */}
      <div className={styles.wavyLine1}>
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 7.5 0, 15 10 T 30 10 T 45 10 T 60 10" stroke="var(--color-secondary-container)" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <div className={styles.wavyLine2}>
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 7.5 0, 15 10 T 30 10 T 45 10 T 60 10" stroke="#ffffff" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* Additional Decorative Elements */}
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      <div className={styles.triangle1}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5 L35 30 L5 30 Z" stroke="var(--color-secondary-container)" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <div className={styles.triangle2}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5 L25 25 L5 25 Z" stroke="#ffffff" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {renderTitle(displayTitle)}
          </h1>
          
          <p className={styles.description}>
            {description || "Welcome to Sir Stephen Hawking Public School, where we foster a culture of academic excellence and strong moral values. We are committed to providing a safe, caring, and inspiring learning environment for students from Classes 1 to 8."}
          </p>
          
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Explore Campus</button>
            <Link href="/fee-structure" className={styles.secondaryBtn}>Fee Structure & Booklist</Link>
          </div>
        </div>
        
        <div className={styles.visual}>
          {/* Animated School Element */}
          <div className={styles.floatingElement}>
            <GraduationCap size={32} />
          </div>
          
          <div className={styles.imageGrid}>
            <div className={styles.imageBoxLeft}>
              <Image src={imageLeft || "/student_boy.png"} alt="Student learning" fill className={styles.imageObj} />
            </div>
            <div className={styles.imageBoxRight}>
              <Image src={imageRight || "/student_girl.png"} alt="Student reading" fill className={styles.imageObj} />
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.checkIcon}><Check size={14} /></span>
              <span>100% Passing Rate</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.checkIcon}><Check size={14} /></span>
              <span>Experienced Faculty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

