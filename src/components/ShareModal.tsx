import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import ProjectContext from "../contexts/projectContext";
import ShareModalContext from "../contexts/shareModalContext";
import styles from "./ShareModal.module.scss";
import { userAPI } from "../api/userAPI";
import { IUser } from "../interfaces/IUser";
import { projectShareAPI } from "../api/projectShareAPI";
import { IProjectShare } from "../interfaces/IProject";

type ShareModalProps = {
  closeShareModal: () => void;
};

const ShareModal = ({ closeShareModal }: ShareModalProps) => {
  const { shareModal, setShareModal } = useContext(ShareModalContext);
  const { project, setProject } = useContext(ProjectContext);

  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectValue, setSelectValue] = useState("");

  const handleAddUser = async (event: any, newValue: string | null) => {
    if (newValue) {
      const projectId = project.id;

      const userListFiltered = userList.filter(
        (user) => user.email === newValue || user.login === newValue
      );

      if (projectId && userListFiltered.length) {
        const { id: userId, login, email } = userListFiltered[0];

        const id = await projectShareAPI.create({
          projectId: parseInt(projectId, 10),
          userId: parseInt(userId, 10),
          comment: false,
          write: false,
          read: false,
        });

        const projectProjectShare = project.projectShare;
        const projectShare: IProjectShare[] = [
          ...(projectProjectShare !== undefined ? projectProjectShare : []),
          {
            id,
            userId: {
              id: parseInt(userId, 10),
              login,
              email,
            },
            comment: false,
            read: false,
            write: false,
          },
        ];
        if (projectProjectShare !== undefined)
          setProject({ ...project, projectShare });
      }

      setSelectValue("");
    }
  };

  const toggleCheckbox = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "read" | "write" | "comment",
    projectShareId: number
  ) => {
    const checked = e.target.checked;

    const projectShare: Partial<IProjectShare> = {};

    projectShare[type] = checked;

    await projectShareAPI.update({ projectShareId, projectShare });

    setProject({
      ...project,
      projectShare: project.projectShare?.map((pshare) =>
        pshare.id === projectShareId ? { ...pshare, [type]: checked } : pshare
      ),
    });
  };

  const getAllUsers = async () => {
    const allUsers = await userAPI.getAll();
    setUserList(allUsers);
    console.log("allUsers", allUsers);
  };

  console.log("shareModal", shareModal);
  console.log("project", project);

  const handleModalClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={styles.modalBackground} onClick={closeShareModal}>
      <div className={styles.modalContainer} onClick={handleModalClick}>
        <h3>Partager le projet</h3>
        <div>
          <h4>Liste des partages</h4>
          <table className={styles.table}>
            <tr>
              <td></td>
              <td>lecture</td>
              <td>écriture</td>
              <td>commentaire</td>
            </tr>
            {project.projectShare?.map((share) => (
              <tr>
                <td>{share.userId.login}</td>
                <td>
                  <Checkbox
                    checked={share.read}
                    onChange={(e) => toggleCheckbox(e, "read", share.id)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={share.write}
                    onChange={(e) => toggleCheckbox(e, "write", share.id)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={share.comment}
                    onChange={(e) => toggleCheckbox(e, "comment", share.id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <h4>Ajouter un utilisateur</h4>
          <Autocomplete
            value={selectValue}
            onChange={handleAddUser}
            size="small"
            options={userList.map((user) => [user.email, user.login]).flat()}
            sx={{
              width: "auto",
              height: "auto",
              fontSize: "12px",
              font: "initial",
              backgroundColor: "white",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="recherche"
                data-testid={`autoCompleteTextField`}
              />
            )}
            ListboxProps={{ style: { fontSize: "12px" } }}
            data-testid={`autoComplete`}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
