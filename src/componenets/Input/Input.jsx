import React from "react";
import styles from "./Input.module.css";

export default function Input({
  label,
  type,
  value,
  onChange,
  property,
  errors,
}) {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(property, e.target.value)}
          className={styles.input}
          required
        />
        <span className={styles.errors}>
          {errors[property] && errors[property]}
        </span>
      </label>
    </>
  );
}
