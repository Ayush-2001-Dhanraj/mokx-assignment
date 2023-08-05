import React from "react";
import { ReactComponent as FBicon } from "../../assets/icons/fb.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/g.svg";
import { ReactComponent as AppleIcon } from "../../assets/icons/a.svg";
import { ReactComponent as AppleBlackIcon } from "../../assets/icons/aBlack.svg";
import styles from "./SocialIcons.module.css";

export default function SocialIcons({ blackBorder }) {
  const socialArr = [
    <FBicon />,
    <GoogleIcon />,
    blackBorder ? <AppleBlackIcon /> : <AppleIcon />,
  ];
  return (
    <div className={styles.socialContainer}>
      {socialArr.map((social, index) => (
        <div
          className={[
            styles.social,
            blackBorder ? styles.bBorder : styles.wBorder,
          ].join(" ")}
          key={index}
        >
          {social}
        </div>
      ))}
    </div>
  );
}
