import Link from 'next/link';
import { Bell } from 'lucide-react';
import styles from './NoticeBoard.module.css';
import { schoolDetails } from '../data/content';

const recentNotices = [
  { date: "May 15, 2026", text: "Admissions for academic session 2026-27 are now open for classes 1 to 8." },
  { date: "May 10, 2026", text: "Final result declarations for the current term." },
  { date: "May 05, 2026", text: "Summer camp registration forms are available in the office." },
];

export default function NoticeBoard() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Welcome to Our School</h2>
        <p className={styles.desc}>
          {schoolDetails.about}
        </p>
        <Link href="/about" className={styles.btn}>Read More About Us</Link>
      </div>
      
      <div className={styles.board}>
        <h3 className={styles.boardTitle}><Bell size={24} /> Latest Notices</h3>
        <div className={styles.noticeList}>
          {recentNotices.map((notice, i) => (
            <div key={i} className={styles.noticeItem}>
              <div className={styles.noticeDate}>{notice.date}</div>
              <div className={styles.noticeText}>{notice.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
