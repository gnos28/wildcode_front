import { useContext, useEffect, useState } from "react";
import Editor from "../components/Editor";
import Console from "../components/Console";
import { executeCodeAPI, ExecutedCode } from "../api/executeCodeAPI";
import styles from "./Edit.module.scss";
import ProjectContext from "../contexts/projectContext";
import { fileAPI } from "../api/fileAPI";
import { IFiles } from "../interfaces/iFile";

const Edit = () => {
  const [consoleResult, setConsoleResult] = useState<
    ExecutedCode[] | undefined
  >(undefined);

  const [projectFiles, setProjectFiles] = useState<IFiles[]>();
  const { project } = useContext(ProjectContext);

  const sendMonaco = async (code: string) => {
    const { data, status } = await executeCodeAPI.sendCode(code);

    if (status === 200 && data) {
      setConsoleResult(data);
    }
  };

  const getFilesInformations = async () => {
    const projectId = project.id;
    if (projectId !== undefined)
      setProjectFiles(await fileAPI.getAllFilesByProjectId(projectId));
    console.log({ projectFiles });
  };

  const updateFileCodeOnline = (codeToPush: string) => {};

  useEffect(() => {
    getFilesInformations();
  }, []);

  return (
    <div className={styles.container}>
      <Editor sendMonaco={sendMonaco} />
      <div className={styles.resizeBar}>
        <img src="/grab.svg" alt="resize" draggable={false} />
      </div>
      <Console consoleResult={consoleResult} />
    </div>
  );
};

export default Edit;
