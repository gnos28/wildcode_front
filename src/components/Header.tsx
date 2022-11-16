import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={[styles.header, styles.headerLeft].join(" ")}>
        <img src="/list.svg" alt="list" />
        <h2>Titre du projet</h2>
        <img src="/people-group.svg" alt="people-group" />
        <img src="/heart-empty.svg" alt="heart-empty" />
      </div>

      <h1>Wild Code Online</h1>

      <div className={[styles.header, styles.headerRight].join(" ")}>
        <img src="/people.svg" alt="people" />
        <img src="/settings.svg" alt="settings" />
        <img src="/home.svg" alt="home" />
      </div>
    </div>
  );
};

export default Header;
