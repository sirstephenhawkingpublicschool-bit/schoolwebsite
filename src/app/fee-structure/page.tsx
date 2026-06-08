import { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import styles from './FeeStructurePage.module.css';
import { hygraphFetch } from '@/lib/hygraph';
import { GET_FEE_STRUCTURE, GET_DISCLOSURES } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Fee Structure | Sir Stephen Hawking Public School',
  description: 'View the fee structure for Sir Stephen Hawking Public School.',
};

interface HygraphFeeItem {
  id: string;
  serialNo: number;
  className: string;
  monthlyFee: string;
}

const fallbackFeeData = [
  { no: '1.', class: 'NURSERY', fee: '1300/-', rowClass: styles.row1 },
  { no: '2.', class: 'L.K.G', fee: '1300/-', rowClass: styles.row2 },
  { no: '3.', class: 'U.K.G', fee: '1300/-', rowClass: styles.row3 },
  { no: '4.', class: '1ST', fee: '1450/-', rowClass: styles.row4 },
  { no: '5.', class: '2ND', fee: '1500/-', rowClass: styles.row5 },
  { no: '6.', class: '3RD', fee: '1550/-', rowClass: styles.row6 },
  { no: '7.', class: '4TH', fee: '1600/-', rowClass: styles.row7 },
  { no: '8.', class: '5TH', fee: '1650/-', rowClass: styles.row8 },
  { no: '9.', class: '6TH', fee: '1700/-', rowClass: styles.row9 },
  { no: '10.', class: '7TH', fee: '1750/-', rowClass: styles.row10 },
  { no: '11.', class: '8TH', fee: '1800/-', rowClass: styles.row11 },
];

export default async function FeeStructurePage() {
  let feeData = fallbackFeeData;
  let booklistUrl = "/Book-List.pdf";

  try {
    const [feeRes, disclosureRes] = await Promise.all([
      hygraphFetch<{ feeStructures: HygraphFeeItem[] }>({
        query: GET_FEE_STRUCTURE,
        revalidate: 0,
      }),
      hygraphFetch<{ disclosures: Array<{ title: string; driveLink?: string; pdfFile?: { url: string } }> }>({
        query: GET_DISCLOSURES,
        revalidate: 0,
      }).catch((e) => {
        console.warn("Hygraph Fetch Booklist Disclosure failed quietly:", e);
        return { disclosures: [] };
      })
    ]);

    if (feeRes && feeRes.feeStructures && feeRes.feeStructures.length > 0) {
      feeData = feeRes.feeStructures.map((item, idx) => ({
        no: `${item.serialNo || idx + 1}.`,
        class: item.className,
        fee: item.monthlyFee,
        rowClass: styles[`row${(idx % 11) + 1}`] || '',
      }));
    }

    if (disclosureRes && disclosureRes.disclosures) {
      const booklistDoc = disclosureRes.disclosures.find(
        (doc) => doc.title.toLowerCase().includes("booklist")
      );
      if (booklistDoc && (booklistDoc.driveLink || booklistDoc.pdfFile?.url)) {
        booklistUrl = booklistDoc.driveLink || booklistDoc.pdfFile?.url || booklistUrl;
      }
    }
  } catch (error) {
    console.warn("Hygraph Fetch Fee Structure failed, falling back to mock data:", error);
  }

  return (
    <main className={styles.container}>
      <div className={styles.documentContainer}>
        <div className={styles.schoolName}>
          SIR STEPHEN HAWKING PUBLIC SCHOOL BAGJALA (GAULAPAR)
        </div>
        
        <div className={styles.titleContainer}>
          <div className={styles.title}>FEE'S STRUCTURE</div>
          <div className={styles.session}>SESSION 2026-27</div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.rowHeader}>
                <th>S.NO.</th>
                <th>CLASS</th>
                <th>MONTHLY FEE' IN Rs</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((row) => (
                <tr key={row.no} className={row.rowClass}>
                  <td>{row.no}</td>
                  <td>{row.class}</td>
                  <td>{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.booklistSection}>
        <h2 className={styles.booklistTitle}>Looking for the Booklist?</h2>
        <p className={styles.booklistText}>
          Download the complete booklist for all classes for the current academic session.
        </p>
        <a 
          href={booklistUrl} 
          target="_blank"
          rel="noopener noreferrer" 
          download
          className={styles.booklistBtn}
        >
          <Download size={20} style={{ marginRight: '8px' }} />
          Download Booklist (PDF)
        </a>
      </div>
    </main>
  );
}

