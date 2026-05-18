import { ClipboardList, CheckCircle2, FileText, Send } from 'lucide-react';
import styles from './AdmissionsPage.module.css';
import { schoolDetails } from '@/data/content';

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
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Online Enquiry Form</h2>
            <p className={styles.formDesc}>
              Submit your details to register your interest. Our team will get back to you within 24 hours.
            </p>
            
            <form>
              <h3 className={styles.label} style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-outline-variant)', paddingBottom: '0.5rem' }}>Student Details</h3>
              
              <div className={styles.inputGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Student's Full Name *</label>
                  <input type="text" className={styles.input} placeholder="e.g. Rahul Sharma" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date of Birth *</label>
                  <input type="date" className={styles.input} required />
                </div>
              </div>

              <div className={styles.inputGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Applying for Class *</label>
                  <select className={styles.input} required defaultValue="">
                    <option value="" disabled>Select Class...</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Previous School (if any)</label>
                  <input type="text" className={styles.input} placeholder="Name of previous school" />
                </div>
              </div>

              <h3 className={styles.label} style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginTop: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-outline-variant)', paddingBottom: '0.5rem' }}>Parent/Guardian Details</h3>

              <div className={styles.inputGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Father's/Mother's Name *</label>
                  <input type="text" className={styles.input} placeholder="e.g. Amit Sharma" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number *</label>
                  <input type="tel" className={styles.input} placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input type="email" className={styles.input} placeholder="amit.sharma@example.com" required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Any Questions or Comments?</label>
                <textarea className={styles.textarea} placeholder="Write your message here..."></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Enquiry <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
