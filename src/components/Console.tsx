import React from "react";
import { ExecutedCode } from "../api/executeCodeAPI";
import ReactJson from "react-json-view";
import styles from "./Console.module.scss";

type ConsoleProps = {
  consoleResult: ExecutedCode[] | undefined;
};

const Console = ({ consoleResult }: ConsoleProps) => (
  <div
    className={[styles.container, styles.scroll, styles["scroll-2"]].join(" ")}
  >
    {consoleResult &&
      consoleResult.map((line, lineIndex) => (
        <p className={styles[line.type]} key={lineIndex}>
          <span>{`>\u00a0`}</span>
          <span>
            <ReactJson
              src={line.message}
              theme="hopscotch"
              collapsed={1}
              displayDataTypes={false}
              name={false}
              style={{
                backgroundColor: "black",
                fontSize: "16px",
              }}
            />
          </span>
        </p>
      ))}
  </div>
);

export default Console;
