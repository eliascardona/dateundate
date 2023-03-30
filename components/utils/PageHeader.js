import React from "react";
import { auth } from "../../firebase/base";
import { signOut } from "firebase/auth";
import styles from "../../styles/pageheader.module.css"
import { useRouter } from "next/router";

export const PageHeader = () => {
  const router = useRouter()
  return (
    <>
      <header className={styles.headerStyles}>
        <div>
          <span className={styles.linkStyle} onClick={() => router.push("/")}>
            <span className={styles.text}>
              DATE UN
            </span>
            {" "}
            <span className={styles.font}>
              DATE
            </span>
          </span>
        </div>
        <div>
          <h4 onClick={() => signOut(auth)}>
            <ion-icon name="exit-outline"></ion-icon>
          </h4>
        </div>
      </header>
    </>
  );
};