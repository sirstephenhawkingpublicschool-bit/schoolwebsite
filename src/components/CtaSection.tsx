import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      {/* Decorative background overlay */}
      <div className={styles.patternOverlay}></div>
      <div className={styles.circleDeco1}></div>
      <div className={styles.circleDeco2}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to give your child the best start?</h2>
          <p className={styles.description}>
            Join Sir Stephen Hawking Public School and become part of a community dedicated to academic excellence, discipline, and strong moral values.
          </p>
          <div className={styles.actions}>
            <Link href="/admissions" className={styles.primaryBtn}>
              Apply Now
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              <PhoneCall size={18} />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
