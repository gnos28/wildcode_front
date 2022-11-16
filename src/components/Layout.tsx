import React, { ReactNode } from "react";
import styles from "./Layout.module.scss";

type Children = { children: ReactNode };

const Layout = ({ children }: Children) => {
  return <div className={styles.layoutContainer}>{children}</div>;
};

export default Layout;
