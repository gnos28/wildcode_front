import React, { useState } from "react";
import Editor from "../components/Editor";
import Console from "../components/Console";
import { executeCodeAPI } from "../api/executeCodeAPI";
import styles from "./Edit.module.scss";

const Edit = () => {
  const [consoleResult, setConsoleResult] = useState<string>("");

  const sendMonaco = async (code: string) => {
    const { data, status } = await executeCodeAPI.sendCode(code);

    if (status === 200 && data) {
      setConsoleResult(data.log.join(""));
    }
  };

  return (
    <div className={styles.container}>
      <Editor sendMonaco={sendMonaco} />
      <div></div>
      <Console consoleResult={consoleResult} />
    </div>
  );
};

export default Edit;
