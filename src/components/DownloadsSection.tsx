import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import styles from './DownloadsSection.module.css';

const documents = [
  { id: 1, title: 'Mandatory Public Disclosure', size: '2.4 MB' },
  { id: 2, title: 'CBSE Affiliation Certificate', size: '1.1 MB' },
  { id: 3, title: 'Society Registration Certificate', size: '850 KB' },
  { id: 4, title: 'Building Safety Certificate', size: '1.5 MB' },
  { id: 5, title: 'Fire Safety Certificate', size: '920 KB' },
  { id: 6, title: 'Fee Structure 2026-27', size: '450 KB' }
];

export default function DownloadsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.circleDeco}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Official Documents</span>
          <h2 className={styles.title}>Disclosures & Downloads</h2>
          <p className={styles.description}>
            Access important school policies, certificates, and mandatory public disclosures here.
          </p>
        </div>

        <div className={styles.grid}>
          {documents.map((doc) => (
            <div key={doc.id} className={styles.card}>
              <div className={styles.cardIcon}>
                <FileText size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{doc.title}</h3>
                <span className={styles.fileSize}>PDF • {doc.size}</span>
              </div>
              <Link href="/disclosures" className={styles.downloadBtn} aria-label={`Download ${doc.title}`}>
                <Download size={20} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <Link href="/disclosures" className={styles.viewAllBtn}>
            View All Documents
          </Link>
        </div>
      </div>
    </section>
  );
}
