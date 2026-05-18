import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Get in Touch</span>
          <h2 className={styles.title}>Contact & Location</h2>
          <p className={styles.description}>
            We would love to hear from you. Feel free to reach out with any questions regarding admissions, facilities, or general inquiries.
          </p>
        </div>

        <div className={styles.contentWrapper}>
          {/* Contact Information */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <div className={styles.iconBox}><MapPin size={24} /></div>
              <div className={styles.infoText}>
                <h3>Our Campus</h3>
                <p>Sir Stephen Hawking Public School,<br/>Bagjala, Gaulapaar, Haldwani</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><Phone size={24} /></div>
              <div className={styles.infoText}>
                <h3>Call Us</h3>
                <p><a href="tel:+919720077248">+91 97200 77248</a><br/>Mon - Sat: 8:00 AM - 3:00 PM</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><Mail size={24} /></div>
              <div className={styles.infoText}>
                <h3>Email Us</h3>
                <p><a href="mailto:info@sirstephenhawking.edu.in">info@sirstephenhawking.edu.in</a><br/>Send us a message anytime!</p>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.iconBox}><Clock size={24} /></div>
              <div className={styles.infoText}>
                <h3>Office Hours</h3>
                <p>Monday - Saturday: 8:00 AM - 3:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className={styles.mapCol}>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://maps.google.com/maps?q=Sir+Stephen+Hawking+Public+School,+Bagjala,+Gaulapaar,+Haldwani&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.iframe}
                title="School Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
