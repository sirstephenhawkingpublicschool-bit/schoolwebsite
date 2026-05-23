"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./AdmissionsPage.module.css";

export default function AdmissionsForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    class: "",
    previousSchool: "",
    parentName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
          formType: "admission",
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        throw new Error(data.message || "Failed to submit enquiry. Please try again.");
      }

      setStatus("success");
      setFormData({
        studentName: "",
        dob: "",
        class: "",
        previousSchool: "",
        parentName: "",
        phone: "",
        email: "",
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
      <div className={styles.formCard} style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "400px" }}>
        <div style={{ color: "var(--color-primary)", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <CheckCircle2 size={64} style={{ color: "var(--color-primary)" }} />
        </div>
        <h2 className={styles.formTitle} style={{ fontSize: "1.8rem" }}>Enquiry Submitted!</h2>
        <p className={styles.formDesc} style={{ margin: "1rem 0 2rem" }}>
          Thank you for your interest in our school. The details have been successfully saved to our Google Sheet database. Our admissions counselor will contact you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={styles.submitBtn}
          style={{ width: "auto", margin: "0 auto", padding: "0.8rem 2rem" }}
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Online Enquiry Form</h2>
      <p className={styles.formDesc}>
        Submit your details to register your interest. Our team will get back to you within 24 hours.
      </p>

      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem", borderRadius: "0.5rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", color: "#c62828", marginBottom: "1.5rem", fontFamily: "var(--font-inter)", fontSize: "0.95rem" }}>
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3 className={styles.label} style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-outline-variant)', paddingBottom: '0.5rem' }}>Student Details</h3>
        
        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Student's Full Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Applying for Class *</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="" disabled>Select Class...</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Previous School (if any)</label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              className={styles.input}
              placeholder="Name of previous school"
            />
          </div>
        </div>

        <h3 className={styles.label} style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginTop: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-outline-variant)', paddingBottom: '0.5rem' }}>Parent/Guardian Details</h3>

        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Father's/Mother's Name *</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Amit Sharma"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="amit.sharma@example.com"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Any Questions or Comments?</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit Enquiry"} <Send size={20} />
        </button>
      </form>
    </div>
  );
}
