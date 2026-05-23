"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./ContactPage.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        throw new Error(data.message || "Failed to submit message. Please try again.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please check your internet connection.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.formSection} style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <div style={{ color: "var(--color-primary)", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <CheckCircle2 size={64} style={{ color: "var(--color-primary)" }} />
        </div>
        <h2 className={styles.formTitle} style={{ fontSize: "1.8rem" }}>Thank You!</h2>
        <p className={styles.formDesc} style={{ margin: "1rem 0 2rem" }}>
          Your message has been successfully saved to our Google Sheet database. Our school representatives will reach out to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={styles.submitBtn}
          style={{ width: "auto", margin: "0 auto", padding: "0.8rem 2rem" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Send a Message</h2>
      <p className={styles.formDesc}>
        Have a question about admissions or our curriculum? Fill out the form below and our team will get back to you shortly.
      </p>

      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem", borderRadius: "0.5rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", color: "#c62828", marginBottom: "1.5rem", fontFamily: "var(--font-inter)", fontSize: "0.95rem" }}>
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              placeholder="First Name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Email Address"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="" disabled>Select a subject...</option>
            <option value="Admissions Inquiry">Admissions Inquiry</option>
            <option value="General Information">General Information</option>
            <option value="Feedback / Suggestion">Feedback / Suggestion</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="How can we help you today?"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"} <Send size={20} />
        </button>
      </form>
    </div>
  );
}
