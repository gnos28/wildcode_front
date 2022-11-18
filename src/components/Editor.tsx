import { useEffect, useState, useRef } from "react";
import style from "./Editor.module.scss";
import Editor, { useMonaco } from "@monaco-editor/react";

type EditeurProps = {
  sendMonaco: (code: string) => Promise<void>;
};

const Editeur = ({ sendMonaco }: EditeurProps) => {
  const [theme, setTheme] = useState<string>("light");
  // const editor = document.getElementById("resize");
  // const [input, setInput] = useState<string>();
  const editorRef = useRef<any>(null);

  const monaco = useMonaco();
  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const execute = () => {
    // console.log(editorRef.current.getValue());

    const code = editorRef.current.getValue();

    if (code) sendMonaco(code);
  };

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }, [monaco]);

  return (
    <div className="container">
      <button onClick={toggleTheme}>thème</button>
      <div className={style.resizable} id="resize">
        <button onClick={execute}>EXECUTE</button>
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
