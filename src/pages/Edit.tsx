import React, { useState } from "react";
import Editor from "../components/Editor";
import Console from "../components/Console";
import { executeCodeAPI } from "../api/executeCodeAPI";

const Edit = () => {
  const [consoleResult, setConsoleResult] = useState<string>("");

  const sendMonaco = async (code: string) => {
    const { data, status } = await executeCodeAPI.sendCode(code);

    if (status === 200 && data) {
      setConsoleResult(data.log.join(""));
    }
  };

  return (
    <div>
      Edit
      <Editor sendMonaco={sendMonaco} />
      <Console consoleResult={consoleResult} />
    </div>
  );
};

export default Edit;
