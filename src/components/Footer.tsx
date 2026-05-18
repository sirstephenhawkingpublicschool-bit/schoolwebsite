import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';
import { schoolDetails } from '../data/content';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand & About */}
          <div className={styles.brandCol}>
            <h2 className={styles.brandTitle}>{schoolDetails.name}</h2>
            <p className={styles.desc}>
              Where learning meets values, discipline, and overall development. We are committed to providing world-class education and nurturing future leaders.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.links}>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/gallery" className={styles.link}>School Gallery</Link></li>
              <li><Link href="/news" className={styles.link}>News & Updates</Link></li>
              <li><Link href="/message" className={styles.link}>Messages</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className={styles.colTitle}>Resources</h3>
            <ul className={styles.links}>
              <li><Link href="/admissions" className={styles.link}>Admission Open</Link></li>
              <li><Link href="/tc-verify" className={styles.link}>TC Verify</Link></li>
              <li><Link href="/disclosures" className={styles.link}>Disclosures / PDF</Link></li>
              <li><Link href="/fee-structure" className={styles.link}>Fee Structure & Booklist</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className={styles.colTitle}>Contact</h3>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>Bagjala, Gaulapaar, Haldwani</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <span>+91 97200 77248</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <span>info@sirstephenhawking.edu.in</span>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} {schoolDetails.name}. All Rights Reserved.
          </div>
          <div className={styles.developer}>
            Developed By <a href="https://www.preettech.com" target="_blank" rel="noopener noreferrer">Preet Tech</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
