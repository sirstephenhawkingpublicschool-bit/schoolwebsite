import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import styles from './ContactPage.module.css';
import { schoolDetails } from '@/data/content';

export const metadata = {
  title: `Contact Us | ${schoolDetails.name}`,
  description: 'Get in touch with Sir Stephen Hawking Public School.',
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.blobLeft}></div>
      <div className={styles.blobRight}></div>

      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contact Us</h1>
        <p className={styles.pageSubtitle}>
          We'd love to hear from you. Reach out to us for admissions, queries, or any other information.
        </p>
      </section>

      <div className={styles.container}>
        
        {/* Floating Info Cards */}
        <div className={styles.contactCards}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <MapPin size={28} />
            </div>
            <div className={styles.cardContent}>
              <h3>Visit Us</h3>
              <p>{schoolDetails.contact.address}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Phone size={28} />
            </div>
            <div className={styles.cardContent}>
              <h3>Call Us</h3>
              <p>{schoolDetails.contact.phone}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Mail size={28} />
            </div>
            <div className={styles.cardContent}>
              <h3>Email Us</h3>
              <p>{schoolDetails.contact.email}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Clock size={28} />
            </div>
            <div className={styles.cardContent}>
              <h3>Working Hours</h3>
              <p>Mon - Sat<br/>08:00 AM - 02:00 PM</p>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Map */}
        <div className={styles.mainGrid}>
          
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <p className={styles.formDesc}>
              Have a question about admissions or our curriculum? Fill out the form below and our team will get back to you shortly.
            </p>
            
            <form>
              <div className={styles.inputGrid}>
                <div className={styles.formGroup}>
                  <input type="text" className={styles.input} placeholder="First Name" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="text" className={styles.input} placeholder="Last Name" required />
                </div>
              </div>

              <div className={styles.inputGrid}>
                <div className={styles.formGroup}>
                  <input type="email" className={styles.input} placeholder="Email Address" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="tel" className={styles.input} placeholder="Phone Number" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <select className={styles.input} required defaultValue="">
                  <option value="" disabled>Select a subject...</option>
                  <option value="admission">Admissions Inquiry</option>
                  <option value="general">General Information</option>
                  <option value="feedback">Feedback / Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <textarea className={styles.textarea} placeholder="How can we help you today?" required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

          <div className={styles.mapSection}>
            <iframe 
              src="https://maps.google.com/maps?q=Sir+Stephen+Hawking+Public+School,+Bagjala,+Gaulapaar,+Haldwani&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className={styles.map}
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
            ></iframe>
          </div>

        </div>

      </div>
    </main>
  );
}
