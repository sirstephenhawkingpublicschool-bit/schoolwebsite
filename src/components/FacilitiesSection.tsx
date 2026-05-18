import { ShieldCheck, Bus, Users, Star, BookOpen, Trophy, Palette } from 'lucide-react';
import Image from 'next/image';
import styles from './FacilitiesSection.module.css';

export default function FacilitiesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.patternDots}></div>
      <div className={styles.blobCenter}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.subtitle}>Our Campus</span>
            <h2 className={styles.title}>World-Class Infrastructure</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.description}>
              Our school provides a comfortable and student-friendly environment for learning and development. The campus is designed to support both academic and extracurricular growth.
            </p>
          </div>
        </div>

        <div className={styles.bentoGrid}>
          {/* Large Image Card 1 */}
          <div className={`${styles.bentoCard} ${styles.largeCard}`}>
            <Image src="/classroom_bg.png" alt="Classrooms" fill className={styles.bgImage} />
            <div className={styles.overlay}></div>
            <div className={styles.cardContent}>
              <div className={styles.iconBox}><BookOpen size={24} /></div>
              <h3>Spacious & Well-Ventilated Classrooms</h3>
              <p>Modern learning spaces designed for maximum focus and comfort.</p>
            </div>
          </div>

          {/* Small Icon Card 1 */}
          <div className={`${styles.bentoCard} ${styles.smallCard}`}>
            <div className={styles.cardContentDark}>
              <div className={styles.iconBoxDark}><ShieldCheck size={28} /></div>
              <h3>Safe & Secure</h3>
              <p>24/7 security and a completely safe campus environment.</p>
            </div>
          </div>

          {/* Large Image Card 2 */}
          <div className={`${styles.bentoCard} ${styles.tallCard}`}>
            <Image src="/sports_bg.png" alt="Playground" fill className={styles.bgImage} />
            <div className={styles.overlay}></div>
            <div className={styles.cardContent}>
              <div className={styles.iconBox}><Trophy size={24} /></div>
              <h3>Large Sports Playground</h3>
              <p>Expansive grounds for sports, physical activities, and athletics.</p>
            </div>
          </div>

          {/* Small Icon Card 2 */}
          <div className={`${styles.bentoCard} ${styles.smallCard}`}>
            <div className={styles.cardContentLight}>
              <div className={styles.iconBoxLight}><Bus size={28} /></div>
              <h3>Transport Facility</h3>
              <p>Safe and reliable school transport network across the city.</p>
            </div>
          </div>

          {/* Small Icon Card 3 */}
          <div className={`${styles.bentoCard} ${styles.smallCard}`}>
            <div className={styles.cardContentLight}>
              <div className={styles.iconBoxLight}><Users size={28} /></div>
              <h3>Expert Teachers</h3>
              <p>Experienced and caring faculty dedicated to student success.</p>
            </div>
          </div>

          {/* Small Icon Card 4 */}
          <div className={`${styles.bentoCard} ${styles.smallCard}`}>
            <div className={styles.cardContentDark}>
              <div className={styles.iconBoxDark}><Star size={28} /></div>
              <h3>Holistic Development</h3>
              <p>Strong focus on discipline and personality development.</p>
            </div>
          </div>

          {/* Large Image Card 3 */}
          <div className={`${styles.bentoCard} ${styles.wideCard}`}>
            <Image src="/culture_bg.png" alt="Cultural Activities" fill className={styles.bgImage} />
            <div className={styles.overlay}></div>
            <div className={styles.cardContent}>
              <div className={styles.iconBox}><Palette size={24} /></div>
              <h3>Cultural & Educational Activities</h3>
              <p>Vibrant programs to encourage creativity, arts, and self-expression.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
