import { FileText, Download } from 'lucide-react';
import styles from './DisclosuresPage.module.css';
import { disclosureCategories } from '@/data/disclosures';

export const metadata = {
  title: 'Public Disclosures | Sir Stephen Hawking Public School',
  description: 'Mandatory public disclosures and important school documents.',
};

export default function DisclosuresPage() {
  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Mandatory Public Disclosures</h1>
        <p className={styles.pageSubtitle}>
          Access our official affiliation documents, certificates, and academic reports as mandated by educational boards.
        </p>
      </section>

      <div className={styles.container}>
        {disclosureCategories.map((category, index) => (
          <div key={index} className={styles.categoryBlock}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <div className={styles.grid}>
              {category.documents.map((doc) => (
                <a href="#" key={doc.id} className={styles.docCard}>
                  <div className={styles.iconWrapper}>
                    <FileText size={24} />
                  </div>
                  <div className={styles.docInfo}>
                    <h3 className={styles.docName}>{doc.name}</h3>
                    <span className={styles.docSize}>PDF Document • {doc.size}</span>
                  </div>
                  <Download size={20} className={styles.downloadIcon} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
