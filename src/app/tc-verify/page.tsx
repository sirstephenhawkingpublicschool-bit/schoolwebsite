"use client";

import { useState } from 'react';
import { Search, ChevronDown, FileCheck2, Download, ArrowLeft, AlertCircle } from 'lucide-react';
import styles from './TcVerifyPage.module.css';

interface Certificate {
  id: string;
  tcNumber: string;
  studentName: string;
  dob: string;
  admissionNo: string;
  fatherName: string;
  motherName: string;
  issueDate: string;
  documentUrl: string;
}

export default function TcVerifyPage() {
  const [searchBy, setSearchBy] = useState('tc_number');
  const [tcNumber, setTcNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Certificate | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/verify-tc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchBy,
          tcNumber,
          studentName,
          dob,
          admissionNo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.certificates && data.certificates.length > 0) {
        setResult(data.certificates[0]);
      } else {
        setError('No verified Transfer Certificate record found matching the provided details. Please check and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while looking up the certificate.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setTcNumber('');
    setStudentName('');
    setDob('');
    setAdmissionNo('');
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
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
        {loading && (
          <div className={styles.card}>
            <div className={styles.loadingWrapper}>
              <div className={styles.spinner}></div>
              <div>Verifying certificate with school records...</div>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className={styles.verifiedCard}>
            <div className={styles.verifiedHeader}>
              <FileCheck2 size={48} />
              <h2 className={styles.cardTitle}>Verified Transfer Certificate</h2>
              <span className={styles.verifiedBadge}>Authentic Record</span>
            </div>

            <div className={styles.verifiedGrid}>
              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Student Name</span>
                <span className={styles.verifiedVal}>{result.studentName}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>TC Certificate No</span>
                <span className={styles.verifiedVal}>{result.tcNumber}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Admission Number</span>
                <span className={styles.verifiedVal}>{result.admissionNo}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Date of Birth</span>
                <span className={styles.verifiedVal}>{formatDate(result.dob)}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Father's Name</span>
                <span className={styles.verifiedVal}>{result.fatherName}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Mother's Name</span>
                <span className={styles.verifiedVal}>{result.motherName}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Issue Date</span>
                <span className={styles.verifiedVal}>{formatDate(result.issueDate)}</span>
              </div>

              <div className={styles.verifiedField}>
                <span className={styles.verifiedLabel}>Status</span>
                <span className={`${styles.verifiedVal} ${styles.verifiedText}`} style={{ color: '#27ae60' }}>
                  Successfully Discharged
                </span>
              </div>
            </div>

            <div className={styles.actionGrid}>
              <button onClick={handleReset} className={styles.backBtn}>
                <ArrowLeft size={20} /> Lookup Another
              </button>
              <a 
                href={result.documentUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.downloadLink}
              >
                <Download size={20} /> View TC Certificate
              </a>
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FileCheck2 size={28} /> Certificate Lookup
              </h2>
              <p className={styles.cardDesc}>
                Search using TC number, name or admission number
              </p>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <AlertCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline' }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSearch}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Search By</label>
                <div className={styles.selectWrapper}>
                  <select 
                    className={styles.select}
                    value={searchBy}
                    onChange={(e) => {
                      setSearchBy(e.target.value);
                      setError(null);
                    }}
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
                      placeholder="e.g. TC-2026-001" 
                      value={tcNumber}
                      onChange={(e) => setTcNumber(e.target.value)}
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
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Date of Birth</label>
                      <input 
                        type="date" 
                        className={styles.input} 
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
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
                      placeholder="e.g. ADM/2025/089" 
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
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
        )}
      </div>
    </main>
  );
}
