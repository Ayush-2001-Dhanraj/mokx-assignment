import React from "react";
import styles from "./Button.module.css";

export default function Button({ onClick, children, type, disabled }) {
  return (
    <button
      type={type || "button"}
      className={styles.btn}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
