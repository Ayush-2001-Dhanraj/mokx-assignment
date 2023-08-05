import React, { useState, useEffect } from "react";
import { ReactComponent as NamasteIcon } from "../../assets/icons/namaste.svg";
import { useNavigate } from "react-router-dom";
import styles from "./SplashScreen.module.css";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    // Simulate loading time with a 3-second timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // If loading is complete, redirect to /onboarding
      navigate("/onboarding");
    }
  }, [isLoading, navigate]);

  if (isLoading)
    return (
      <div className={styles.splashContainer}>
        <NamasteIcon />
        <p className={styles.welcomeText}>Back to Vedas 🕉️</p>
      </div>
    );

  return null;
}
