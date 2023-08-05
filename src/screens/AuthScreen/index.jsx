import React, { useState, useCallback, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import styles from "./AuthScreen.module.css";
import SocialIcons from "../../componenets/SocialIcons/SocialIcons";
import Divider from "../../componenets/Divider/Divider";
import Button from "../../componenets/Button/Button";
import Input from "../../componenets/Input/Input";

export default function AuthScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = state;

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [shouldvalidate, setShouldValidate] = useState(false);

  const [errors, setErrors] = useState({});

  const handleBackClick = () => {
    navigate(-1);
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Check for empty fields
    if (formValues.name.trim() === "" && !login) {
      newErrors.name = "Name is required";
    }

    if (formValues.email.trim() === "") {
      newErrors.email = "Email is required";
    } else {
      // Email format validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (formValues.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    if (formValues.confirmPassword.trim() === "" && !login) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    // Check for password match
    if (formValues.password !== formValues.confirmPassword && !login) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!shouldvalidate && Object.keys(newErrors).length === 0) {
      navigate("/main");
      setFormValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    if (Object.keys(newErrors).length === 0) {
      setShouldValidate(false);
    } else {
      setShouldValidate(true);
    }

    setErrors(newErrors);
  }, [
    formValues.confirmPassword,
    formValues.email,
    formValues.name,
    formValues.password,
    login,
    navigate,
    shouldvalidate,
  ]);

  const handleInputChange = (property, value) => {
    setFormValues((preV) => ({ ...preV, [property]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };
  useEffect(() => {
    if (shouldvalidate) validateForm();
  }, [formValues, shouldvalidate]);

  return (
    <form className={styles.LoginContainer}>
      <div className={styles.header}>
        <BackIcon onClick={handleBackClick} />
      </div>
      <div className={styles.main}>
        {!login && <Logo />}
        <div className={styles.mainText}>
          {login ? (
            <>
              Log in to Mokx <div className={styles.leftHighlight} />
            </>
          ) : (
            <>
              Sign up with Email <div className={styles.rightHighlight} />
            </>
          )}
        </div>
        <p className={styles.info}>
          Welcome back! Sign in using your social account or email to continue
          us
        </p>
        {login && (
          <>
            <SocialIcons blackBorder />
            <Divider message="OR" />
          </>
        )}
        {!login && (
          <Input
            type="text"
            label="Your name"
            value={formValues.name}
            property="name"
            onChange={handleInputChange}
            errors={errors}
          />
        )}
        <Input
          type="email"
          label="Your email"
          value={formValues.email}
          property="email"
          onChange={handleInputChange}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          value={formValues.password}
          property="password"
          onChange={handleInputChange}
          errors={errors}
        />
        {!login && (
          <Input
            type="password"
            label="Confirm Password"
            value={formValues.confirmPassword}
            property="confirmPassword"
            onChange={handleInputChange}
            errors={errors}
          />
        )}
      </div>
      <div className={styles.footer}>
        <Button
          type="submit"
          onClick={handleFormSubmit}
          disabled={Object.keys(errors).length !== 0}
        >
          {login ? "Login" : "Create an account"}
        </Button>
        {login && <p className={styles.forgotPas}>Forgot Password?</p>}
      </div>
    </form>
  );
}
