import { FileText, Download } from 'lucide-react';
import styles from './DisclosuresPage.module.css';
import { disclosureCategories } from '@/data/disclosures';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_DISCLOSURES } from '@/lib/queries';

export const metadata = {
  title: 'Public Disclosures | Sir Stephen Hawking Public School',
  description: 'Mandatory public disclosures and important school documents.',
};

interface HygraphDisclosure {
  id: string;
  title: string;
  driveLink?: string;
  pdfFile?: {
    url: string;
  };
}

export default async function DisclosuresPage() {
  let liveDisclosures: HygraphDisclosure[] = [];
  let useLive = false;

  try {
    const data = await hygraphFetch<{ disclosures: HygraphDisclosure[] }>({
      query: GET_DISCLOSURES,
      revalidate: 0, // Disable cache for dev/immediate testing, lets them see changes instantly!
    });
    
    if (data && data.disclosures && data.disclosures.length > 0) {
      liveDisclosures = data.disclosures;
      useLive = true;
    }
  } catch (error) {
    console.warn("Hygraph Fetch Disclosures failed, falling back to mock data:", error);
  }

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Mandatory Public Disclosures</h1>
        <p className={styles.pageSubtitle}>
          Access our official affiliation documents, certificates, and academic reports as mandated by educational boards.
        </p>
      </section>

      <div className={styles.container}>
        {useLive ? (
          <div className={styles.categoryBlock}>
            <h2 className={styles.categoryTitle}>CBSE Mandated Documents</h2>
            <div className={styles.grid}>
              {liveDisclosures.map((doc) => {
                const docUrl = doc.driveLink || doc.pdfFile?.url || "#";
                const docLabel = doc.driveLink ? "Google Drive Link" : "PDF Document";
                return (
                  <a 
                    href={docUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={doc.id} 
                    className={styles.docCard}
                  >
                    <div className={styles.iconWrapper}>
                      <FileText size={24} />
                    </div>
                    <div className={styles.docInfo}>
                      <h3 className={styles.docName}>{doc.title}</h3>
                      <span className={styles.docSize}>{docLabel} • Live from CMS</span>
                    </div>
                    <Download size={20} className={styles.downloadIcon} />
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          disclosureCategories.map((category, index) => (
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
          ))
        )}
      </div>
    </main>
  );
}

