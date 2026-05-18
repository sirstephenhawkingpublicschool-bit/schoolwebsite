"use client";

import { useState } from 'react';
import { Search, ChevronDown, FileCheck2 } from 'lucide-react';
import styles from './TcVerifyPage.module.css';

export default function TcVerifyPage() {
  const [searchBy, setSearchBy] = useState('tc_number');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a demo. In production, this will query the database.");
  };

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Transfer Certificate</h1>
        <p className={styles.pageSubtitle}>
          Verify the authenticity of student Transfer Certificates securely online.
        </p>
      </section>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <FileCheck2 size={28} /> Certificate Lookup
            </h2>
            <p className={styles.cardDesc}>
              Search using TC number, name or admission number
            </p>
          </div>

          <form onSubmit={handleSearch}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Search By</label>
              <div className={styles.selectWrapper}>
                <select 
                  className={styles.select}
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="tc_number">TC Number</option>
                  <option value="name_dob">Student Name & DOB</option>
                  <option value="admission_number">Admission Number</option>
                </select>
                <ChevronDown size={20} className={styles.chevron} />
              </div>
            </div>

            <div className={styles.formGroup}>
              {searchBy === 'tc_number' && (
                <>
                  <label className={styles.label}>TC Number</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="e.g. TC-2024-001" 
                    required 
                  />
                </>
              )}

              {searchBy === 'name_dob' && (
                <div className={`${styles.inputGrid} ${styles.twoCols}`}>
                  <div>
                    <label className={styles.label}>Student Name</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Enter full name" 
                      required 
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Date of Birth</label>
                    <input 
                      type="date" 
                      className={styles.input} 
                      required 
                    />
                  </div>
                </div>
              )}

              {searchBy === 'admission_number' && (
                <>
                  <label className={styles.label}>Admission Number</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="e.g. ADM/2023/145" 
                    required 
                  />
                </>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Search size={20} /> Verify Certificate
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
