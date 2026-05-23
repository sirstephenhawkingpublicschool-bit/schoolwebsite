import { ClipboardList, CheckCircle2, FileText } from 'lucide-react';
import styles from './AdmissionsPage.module.css';
import { schoolDetails } from '@/data/content';
import AdmissionsForm from './AdmissionsForm';

export const metadata = {
  title: `Admissions | ${schoolDetails.name}`,
  description: 'Apply for admission at Sir Stephen Hawking Public School.',
};

export default function AdmissionPage() {
  return (
    <main className={styles.page}>
      <div className={styles.blobLeft}></div>
      <div className={styles.blobRight}></div>

      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admissions Open</h1>
        <p className={styles.pageSubtitle}>
          Join {schoolDetails.name} for the upcoming academic session. Fill out the form below to begin the process.
        </p>
      </section>

      <div className={styles.container}>
        <div className={styles.mainGrid}>
          
          {/* Left Column: Info */}
          <div className={styles.infoCard}>
            
            <div>
              <h2 className={styles.sectionTitle}>
                <ClipboardList size={28} /> Admission Process
              </h2>
              <p className={styles.infoText}>
                Our admission process is designed to be transparent and straightforward. Please fill out the online enquiry form to initiate the process. Our admission counselor will contact you to schedule a campus visit and interaction.
              </p>
            </div>

            <div className={styles.divider}></div>

            <div>
              <h2 className={styles.sectionTitle}>
                <CheckCircle2 size={28} /> Eligibility Criteria
              </h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>Admissions are open for Classes 1 to 8 based on seat availability.</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>The age of the student must comply with the standard board guidelines for the respective class.</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>An interaction session will be held for the student and parents.</span>
                </li>
              </ul>
            </div>

            <div className={styles.divider}></div>

            <div>
              <h2 className={styles.sectionTitle}>
                <FileText size={28} /> Required Documents
              </h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>Copy of Birth Certificate</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>Previous School Leaving Certificate (TC)</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>Report Card of the previous class passed</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>4 Passport size photographs of the student</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 size={20} className={styles.listIcon} />
                  <span>Aadhar Card copy of student and parents</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Admission Form */}
          <AdmissionsForm />

        </div>
      </div>
    </main>
  );
}
