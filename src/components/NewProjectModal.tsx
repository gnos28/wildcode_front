import styles from "./NewProjectModal.module.scss";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { FormControlLabel } from "@mui/material";
import { BaseSyntheticEvent, useState } from "react";
import { CreateProject } from "../interfaces/IProject";

type NewProjectModalProps = {
  createNewProject: (project: Omit<CreateProject, "userId">) => Promise<void>;
  closeNewProjectModal: () => void;
};

const NewProjectModal = ({
  createNewProject,
  closeNewProjectModal,
}: NewProjectModalProps) => {
  const [isPublic, setIsPublic] = useState(true);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  const handleModalClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
  };

  const handleIsPuclicChange = () => {
    setIsPublic(!isPublic);
  };

  const handleProjectNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = () => {
    const project = {
      name: projectName,
      description: projectDescription,
      isPublic,
    };

    createNewProject(project);
  };

  return (
    <div className={styles.modalBackground} onClick={closeNewProjectModal}>
      <div className={styles.modalContainer} onClick={handleModalClick}>
        <h3>Création d'un nouveau projet</h3>
        <TextField
          id="outlined-basic"
          label="Nom du projet"
          variant="outlined"
          sx={{
            backgroundColor: "white",
          }}
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Description du projet"
          variant="outlined"
          multiline
          sx={{
            backgroundColor: "white",
          }}
          minRows={4}
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={handleIsPuclicChange}
              name="antoine"
              defaultChecked
            />
          }
          label="Projet public ?"
        />
        <div className={styles.buttonContainer}>
          <Button variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
