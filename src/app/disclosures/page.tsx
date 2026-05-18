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
  category?: string;
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

  // Group live disclosures by category (exactly matching the A, B, C layout!)
  const categoriesMap: { [key: string]: HygraphDisclosure[] } = {
    "A. General Information": [],
    "B. Documents and Information": [],
    "C. Result and Academics": []
  };

  if (useLive) {
    liveDisclosures.forEach((doc) => {
      let rawCat = doc.category || "";
      let cat = "A. General Information";
      
      if (rawCat === "GENERAL_INFORMATION" || rawCat.toLowerCase().includes("general")) {
        cat = "A. General Information";
      } else if (rawCat === "DOCUMENTS_AND_INFORMATION" || rawCat.toLowerCase().includes("documents")) {
        cat = "B. Documents and Information";
      } else if (rawCat === "RESULT_AND_ACADEMICS" || rawCat.toLowerCase().includes("result") || rawCat.toLowerCase().includes("academic")) {
        cat = "C. Result and Academics";
      }

      categoriesMap[cat].push(doc);
    });
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
          Object.entries(categoriesMap)
            .filter(([_, docs]) => docs.length > 0)
            .map(([catTitle, docs], idx) => (
              <div key={idx} className={styles.categoryBlock}>
                <h2 className={styles.categoryTitle}>{catTitle}</h2>
                <div className={styles.grid}>
                  {docs.map((doc) => {
                    const docUrl = doc.driveLink || "#";
                    const docLabel = "Google Drive Link";
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
            ))
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

