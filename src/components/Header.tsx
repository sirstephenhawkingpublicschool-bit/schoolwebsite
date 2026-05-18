"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import { schoolDetails } from '../data/content';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer}>
        <Image
          src="/logo.jpg"
          alt={`${schoolDetails.name} Logo`}
          width={50}
          height={50}
          className={styles.logo}
        />
        <span className={styles.schoolName}>{schoolDetails.name}</span>
      </Link>
      
      <div className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✖' : '☰'}
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About Us</Link>
        <Link href="/gallery" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        <Link href="/news" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>News</Link>
        <Link href="/message" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Messages</Link>
        <Link href="/tc-verify" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>TC Verify</Link>
        <Link href="/disclosures" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Disclosures</Link>
        <Link href="/fee-structure" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Fee Structure & Booklist</Link>
        <Link href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
        {isMenuOpen && <Link href="/admissions" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Admission Open</Link>}
      </nav>

      <div className={styles.actions}>
        <Link href="/admissions" className={styles.contactBtn}>Admission Open</Link>
      </div>
    </header>
  );
}
