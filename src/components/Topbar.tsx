import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import styles from './Topbar.module.css';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.info}>
        <div className={styles.item}>
          <Phone size={16} /> +91 97200 77248
        </div>
        <div className={styles.item}>
          <Mail size={16} /> info@sirstephenhawking.edu.in
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.followText}>Follow us on:</span>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}><FiFacebook size={18} /></a>
        <a href="https://www.instagram.com/s.s.h.p.school?igsh=NDh5Nmpjcmtwang2" target="_blank" rel="noreferrer" className={styles.socialLink}><FiInstagram size={18} /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink}><FiYoutube size={18} /></a>
      </div>
    </div>
  );
}
