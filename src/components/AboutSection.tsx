import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Award } from 'lucide-react';
import styles from './AboutSection.module.css';
import { schoolDetails } from '../data/content';

interface AboutSectionProps {
  title?: string;
  description?: string;
  yearsOfExcellence?: number;
  image?: string;
}

export default function AboutSection({ title, description, yearsOfExcellence, image }: AboutSectionProps) {
  const displayTitle = title || "A Journey of Excellence & Values";
  const displayDescription = description || schoolDetails.about;
  const displayYears = yearsOfExcellence || 15;
  const displayImage = image || "/hero-indian-students.png";

  return (
    <section className={styles.section}>
      {/* Decorative filler elements */}
      <div className={styles.patternDots}></div>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.squareLine}></div>
      
      <div className={styles.container}>
        <div className={styles.visualColumn}>
          <div className={styles.imageWrapper}>
            <Image 
              src={displayImage} 
              alt="Students at Sir Stephen Hawking Public School" 
              fill 
              className={styles.image} 
            />
          </div>
          
          <div className={styles.experienceBadge}>
            <div className={styles.badgeIcon}>
              <Award size={20} />
            </div>
            <div className={styles.badgeText}>
              <strong>{displayYears}+ Years</strong>
              <span>of Excellence</span>
            </div>
          </div>
          
          <div className={styles.floatingIcon}>
            <BookOpen size={24} />
          </div>
        </div>
        
        <div className={styles.content}>
          <span className={styles.subtitle}>About Us</span>
          <h2 className={styles.title}>{displayTitle}</h2>
          <p className={styles.description}>
            {displayDescription}
          </p>
          <Link href="/about" className={styles.primaryBtn}>
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
}

