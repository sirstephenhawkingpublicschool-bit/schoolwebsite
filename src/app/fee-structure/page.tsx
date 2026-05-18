import { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import styles from './FeeStructurePage.module.css';

export const metadata: Metadata = {
  title: 'Fee Structure | Sir Stephen Hawking Public School',
  description: 'View the fee structure for Sir Stephen Hawking Public School.',
};

const feeData = [
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

export default function FeeStructurePage() {
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
        <Link href="#" className={styles.booklistBtn}>
          <Download size={20} style={{ marginRight: '8px' }} />
          Download Booklist (PDF)
        </Link>
      </div>
    </main>
  );
}
