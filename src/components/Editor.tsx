import React, { useEffect, useState, useRef } from "react";
import style from "./Editor.module.scss";

import Editor, { useMonaco } from "@monaco-editor/react";

const Editeur = () => {
  const [theme, setTheme] = useState<string>("light");
  const editor = document.getElementById("resize");
  // const [input, setInput] = useState<string>();
  const editorRef = useRef<any>(null);

  const monaco = useMonaco();
  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const showValue = () => {
    console.log(editorRef.current.getValue());
  };

  console.log("editor", editor);

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }, [monaco]);

  return (
    <div className="container">
      <button onClick={toggleTheme}>thème</button>
      <div className={style.resizable} id="resize">
        <button onClick={showValue}>get code</button>
        <Editor
          height="50vh"
          defaultLanguage="javascript"
          theme={theme}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default Editeur;
