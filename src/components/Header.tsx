import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={[styles.header, styles.headerLeft].join(" ")}>
        <img src="/list.svg" alt="list" draggable={false} />
        <h2>Titre du projet</h2>
        <img src="/people-group.svg" alt="people-group" draggable={false} />
        <img src="/heart-empty.svg" alt="heart-empty" draggable={false} />
      </div>

      <h1 className={styles.middle}>
        <img
          src="/wildcodeonline.webp"
          alt="Wild Code Online logo"
          draggable={false}
        />
      </h1>

      <div className={[styles.header, styles.headerRight].join(" ")}>
        <img src="/people.svg" alt="people" draggable={false} />
        <img src="/settings.svg" alt="settings" draggable={false} />
        <img src="/home.svg" alt="home" draggable={false} />
      </div>
    </div>
  );
};

export default Header;
