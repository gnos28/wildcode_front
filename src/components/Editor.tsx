import { useEffect, useState, useRef } from "react";
import styles from "./Editor.module.scss";
import Editor, { useMonaco } from "@monaco-editor/react";
import { updateRes } from "../api/fileAPI";

type EditeurProps = {
  sendMonaco: (code: string) => Promise<void>;
  updateCode: (value: string) => void;
  editorCode: string;
  updateFileCodeOnline: (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => Promise<false | updateRes | undefined>;
  fileId: number;
  projectId: number;
};

type Theme = "light" | "vs-dark";

const Editeur = (props: EditeurProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  // State Booléen pour savoir si le document est sauvegarder en ligne
  const [isSaveOnline, setIsSaveOnline] = useState(true);

  // const editor = document.getElementById("resize");
  // const [input, setInput] = useState<string>();
  const editorRef = useRef<any>(null);

  const getMonacoText = () => {
    setIsSaveOnline(false);
    props.updateCode(editorRef.current.getValue());
  };

  const monaco = useMonaco();
  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const execute = () => {
    const code = editorRef.current.getValue();

    if (code) props.sendMonaco(code);
  };

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    const willUpdate = setTimeout(async () => {
      const res = await props.updateFileCodeOnline(
        props.editorCode,
        props.fileId,
        props.projectId
      );
      if (res !== false && res !== undefined) setIsSaveOnline(true);
    }, 2000);
    return () => clearTimeout(willUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco, props.editorCode]);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <button onClick={execute}>
          <img src="/start.svg" alt="execute code" draggable={false} />
        </button>
        <p>{isSaveOnline ? "Sauvegarde réussie" : "Non sauvegardé"}</p>
        <button onClick={toggleTheme}>
          {theme === "light" ? "light mode" : "dark mode"}
        </button>
      </div>

      <div className={styles.resizable} id="resize">
        {props.fileId ? (
          <Editor
            height="50vh"
            defaultLanguage="javascript"
            theme={theme}
            onMount={handleEditorDidMount}
            onChange={getMonacoText}
            defaultValue={props.editorCode}
          />
        ) : (
          <p>Test</p>
        )}
      </div>
    </div>
  );
};

export default Editeur;
