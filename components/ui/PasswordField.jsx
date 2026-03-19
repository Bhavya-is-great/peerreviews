"use client";

import { useState } from "react";
import styles from "@/components/ui/AuthForm.module.css";

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.6 6.4A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a18.4 18.4 0 0 1-3.2 3.9M6.7 6.7C3.8 8.4 2 12 2 12s3.5 6 10 6c1.9 0 3.5-.5 4.9-1.2M9.9 9.9A3 3 0 0 0 14.1 14.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PasswordField({ id, label, autoComplete, inputProps, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          className={`${styles.input} ${styles.passwordInput}`}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          {...inputProps}
        />
        <button
          className={styles.toggle}
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          aria-pressed={visible}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {error ? <p className={styles.fieldError}>{error}</p> : null}
    </div>
  );
}
