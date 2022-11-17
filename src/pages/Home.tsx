import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <section className={styles.section}>
        <h2>
          <img
            src="/triangle.svg"
            alt="triangle"
            className={styles.arrowDown}
          />
          <span>My Projects</span>
        </h2>
      </section>
      <section className={styles.section}>
        <h2>
          <img
            src="/triangle.svg"
            alt="triangle"
            className={styles.arrowDown}
          />
          <span>Projects shared with me</span>
        </h2>
      </section>
    </div>
  );
};

export default Home;
