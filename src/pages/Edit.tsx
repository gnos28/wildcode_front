import { useContext, useEffect, useState } from "react";
import Editor from "../components/Editor";
import Console from "../components/Console";
import { executeCodeAPI, ExecutedCode } from "../api/executeCodeAPI";
import styles from "./Edit.module.scss";
import ProjectContext from "../contexts/projectContext";
import { fileAPI } from "../api/fileAPI";
import { IFiles, FilesCodeData } from "../interfaces/iFile";

const Edit = () => {
  const [consoleResult, setConsoleResult] = useState<
    ExecutedCode[] | undefined
  >(undefined);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectFiles, setProjectFiles] = useState<IFiles[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filesCodeArr, setFilesCodeArr] = useState<FilesCodeData[]>();
  const [usedFile, setUsedFile] = useState<FilesCodeData>();

  const [editorCode, setEditorCode] = useState("");

  const updateFileCodeOnline = async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    if (usedFile) {
      try {
        return await fileAPI.updateFileOnline(codeToPush, fileId, projectId);
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const updateCode = async (value: string) => {
    setEditorCode(value);
  };

  const { project } = useContext(ProjectContext);
  const sendMonaco = async (code: string) => {
    const { data, status } = await executeCodeAPI.sendCode(code);

    if (status === 200 && data) {
      setConsoleResult(data);
    }
  };

  const getFilesInformations = async () => {
    const projectId = project.id;
    if (projectId !== undefined) {
      const req = await fileAPI.getAllFilesByProjectId(projectId);
      setProjectFiles(req.getFilesByProjectId);
      setFilesCodeArr(req.getCodeFiles);
      setUsedFile(req.getCodeFiles[0]);
      setEditorCode(req.getCodeFiles[0].code);
    }
  };

  useEffect(() => {
    getFilesInformations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className={styles.container}>
      {usedFile ? (
        <Editor
          sendMonaco={sendMonaco}
          editorCode={editorCode}
          updateCode={updateCode}
          updateFileCodeOnline={updateFileCodeOnline}
          fileId={usedFile.id}
          projectId={usedFile?.projectId}
        />
      ) : (
        <p>Loading Editor...</p>
      )}
      <div className={styles.resizeBar}>
        <img src="/grab.svg" alt="resize" draggable={false} />
      </div>
      <Console consoleResult={consoleResult} />
    </div>
  );
};

export default Edit;
