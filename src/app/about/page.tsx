import Image from 'next/image';
import { Eye, Target, Compass, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import styles from './AboutPage.module.css';
import { schoolDetails } from '@/data/content';
import CtaSection from '@/components/CtaSection';

export const metadata = {
  title: `About Us | ${schoolDetails.name}`,
  description: 'Learn about our history, vision, mission, and commitment to excellence.',
};

export default function AboutPage() {
  const { about, vision, mission, aim, whyChooseUs, commitmentToParents } = schoolDetails;

  return (
    <main className={styles.page}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerPattern}></div>
        <h1 className={styles.pageTitle}>About Us</h1>
        <p className={styles.pageSubtitle}>
          Discover who we are and what drives our passion for education.
        </p>
      </section>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.blobLeft}></div>
        <div className={styles.patternDotsRight}></div>
        
        <div className={styles.introTextCol}>
          <span className={styles.introSubtitle}>Our Story</span>
          <h2 className={styles.introTitle}>Welcome to {schoolDetails.name}</h2>
          <div className={styles.introText}>
            {about.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={styles.introImageCol}>
          <div className={styles.introImageWrapper}>
            <Image 
              src="/hero-indian-students.png" 
              alt="School Campus" 
              fill 
              className={styles.introImage}
            />
          </div>
        </div>
      </section>

      {/* Core Values (Vision, Mission, Aim) */}
      <section className={styles.coreValuesSection}>
        <div className={styles.decoCircle}></div>
        <div className={styles.patternDotsLeft}></div>
        
        <div className={styles.coreValuesGrid}>
          {/* Vision */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><Eye size={28} /></div>
            <h3 className={styles.valueTitle}>Our Vision</h3>
            <p className={styles.valueText}>{vision}</p>
          </div>

          {/* Mission */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><Target size={28} /></div>
            <h3 className={styles.valueTitle}>Our Mission</h3>
            <ul className={styles.missionList}>
              {mission.map((item, index) => (
                <li key={index} className={styles.missionItem}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Aim */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><Compass size={28} /></div>
            <h3 className={styles.valueTitle}>Our Aim</h3>
            <p className={styles.valueText}>{aim}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Commitment */}
      <section className={styles.featuresSection}>
        <div className={styles.blobRight}></div>
        
        {/* Why Choose Us */}
        <div className={styles.featureBlock}>
          <h3 className={styles.featureTitle}>
            <ShieldCheck size={32} />
            Why Choose Us?
          </h3>
          <ul className={styles.featureList}>
            {whyChooseUs.map((point, index) => (
              <li key={index} className={styles.featureItem}>
                <CheckCircle2 size={24} className={styles.checkIcon} />
                <span className={styles.featureText}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commitment To Parents */}
        <div className={styles.featureBlock}>
          <h3 className={styles.featureTitle}>
            <HeartHandshake size={32} />
            Our Commitment
          </h3>
          <p className={styles.commitmentIntro}>{commitmentToParents.intro}</p>
          <ul className={styles.featureList}>
            {commitmentToParents.points.map((point, index) => (
              <li key={index} className={styles.featureItem}>
                <CheckCircle2 size={24} className={styles.checkIcon} />
                <span className={styles.featureText}>{point}</span>
              </li>
            ))}
          </ul>
          <p className={styles.commitmentOutro}>{commitmentToParents.conclusion}</p>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
