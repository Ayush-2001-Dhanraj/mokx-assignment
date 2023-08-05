import React from "react";
import styles from "./Divider.module.css";

export default function Divider({ message, coloredBg }) {
  return (
    <div className={styles.divider}>
      <div
        className={[
          styles.divideContent,
          coloredBg ? styles.coloredBg : styles.normalBg,
        ].join(" ")}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
