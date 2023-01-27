import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import ProjectContext from "../contexts/projectContext";
import { useApolloClient } from "@apollo/client";

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { project } = useContext(ProjectContext);
  const client = useApolloClient();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsAuth(true);
    }
  }, [token]);

  const signOut = () => {
    localStorage.setItem("token", "");
    client.resetStore();
    navigate("/login");
    setIsAuth(false);
  };

  return (
    <header className={styles.container}>
      {project.name && (
        <div className={[styles.header, styles.headerLeft].join(" ")}>
          <img
            src="/list.svg"
            alt="list"
            draggable={false}
            className={styles.img}
          />
          <h2>{project.name}</h2>
          <img
            src="/people-group.svg"
            alt="people-group"
            draggable={false}
            className={styles.img}
          />
          <img
            src="/heart-empty.svg"
            alt="heart-empty"
            draggable={false}
            className={styles.img}
          />
        </div>
      )}

      <h1 className={styles.middle}>
        <img
          src="/wildcodeonline.webp"
          alt="Wild Code Online logo"
          draggable={false}
        />
      </h1>

      <div className={[styles.header, styles.headerRight].join(" ")}>
        <button onClick={signOut}>Logout</button>
        <NavLink to="/Profil">
          <img
            src="/people.svg"
            alt="people"
            draggable={false}
            className={styles.img}
          />
        </NavLink>

        {/* <NavLink to="/Profil">
          <img
            src="/people.svg"
            alt="people"
            draggable={false}
            className={styles.img}
          />
        </NavLink> */}

        <NavLink to="/Settings">
          <img
            src="/settings.svg"
            alt="settings"
            draggable={false}
            className={styles.img}
          />
        </NavLink>

        <NavLink to="/">
          <img
            src="/home.svg"
            alt="home"
            draggable={false}
            className={styles.img}
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
