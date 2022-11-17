import React, { useEffect, useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

const Editeur = () => {
  const [theme, setTheme] = useState("light");

  const monaco = useMonaco();
  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <div className="container">
      <button onClick={toggleTheme}>thème</button>
      <Editor
        height="50vh"
        defaultValue="// WELCOME TO WILD CODE ONLINE"
        defaultLanguage="javascript"
        theme={theme}
      />
    </div>
  );
};

export default Editeur;
