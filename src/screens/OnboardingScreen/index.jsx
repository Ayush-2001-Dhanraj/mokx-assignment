import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingScreen.module.css";
import SocialIcons from "../../componenets/SocialIcons/SocialIcons";
import Divider from "../../componenets/Divider/Divider";
import Button from "../../componenets/Button/Button";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.banner}>
        <p className={styles.nameTag}>Arya, AI Acharya</p>
      </div>
      <div className={styles.journeyContainer}>
        <p className={styles.tagline}>
          Discover the <br /> timeless wisdom of <br />{" "}
          <span className={styles.highlight}>the Vedas</span>
        </p>
        <p className={styles.signupMessage}>
          Sign up and&nbsp;
          <span className={styles.highlight}>
            journey through ancient knowledge with Arya 🌟
          </span>
        </p>
        <SocialIcons />
        <Divider message="OR" coloredBg />
        <Button onClick={() => navigate("/auth", { state: { login: false } })}>
          Sign up with mail
        </Button>
        <p className={styles.existingAcc}>
          Existing account?{" "}
          <span
            className={styles.highlight}
            onClick={() => navigate("/auth", { state: { login: true } })}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
