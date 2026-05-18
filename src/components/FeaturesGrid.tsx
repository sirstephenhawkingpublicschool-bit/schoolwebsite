import Link from 'next/link';
import { GraduationCap, Image as ImageIcon, Users, FileText } from 'lucide-react';
import styles from './FeaturesGrid.module.css';

const features = [
  { title: "Admissions", desc: "Information on admission process and criteria.", link: "/admissions", icon: <GraduationCap size={40} strokeWidth={1.5} /> },
  { title: "Gallery", desc: "Explore our campus, events, and memories.", link: "/gallery", icon: <ImageIcon size={40} strokeWidth={1.5} /> },
  { title: "Our Teachers", desc: "Meet our dedicated and experienced faculty.", link: "/teachers", icon: <Users size={40} strokeWidth={1.5} /> },
  { title: "Results & PDFs", desc: "Download exam results, syllabus, and forms.", link: "/results", icon: <FileText size={40} strokeWidth={1.5} /> },
];

export default function FeaturesGrid() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Explore Our School</h2>
      <div className={styles.grid}>
        {features.map((feat, idx) => (
          <Link href={feat.link} key={idx} className={styles.card}>
            <span className={styles.icon}>{feat.icon}</span>
            <h3 className={styles.cardTitle}>{feat.title}</h3>
            <p className={styles.cardDesc}>{feat.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
