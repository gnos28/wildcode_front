import { useNavigate } from "react-router-dom";
import { IProject } from "../interfaces/IProject";
import styles from "./ProjectItem.module.scss";
import ProjectContext from "../contexts/projectContext";
import { useContext } from "react";
import { projectAPI } from "../api/projectAPI";

type ProjectItemProps = {
  project: IProject;
  owned?: boolean;
};

const ProjectItem = ({ project, owned }: ProjectItemProps) => {
  const { setProject } = useContext(ProjectContext);

  const navigate = useNavigate();
  const handleOpenProject = () => {
    setProject(project);
    projectAPI.addView(project.id);
    navigate("/Edit");
  };

  return (
    <article className={styles.article}>
      <h3>{project.name}</h3>
      <div>
        <div className={styles.content}>
          <p>{project.description}</p>
          <button
            onClick={handleOpenProject}
            className={[styles.button, styles.edit].join(" ")}
          >
            <img src="/pen.svg" alt="edit" draggable={false} />
          </button>
          {owned === true && (
            <button
              onClick={() => {}}
              className={[styles.button, styles.delete].join(" ")}
            >
              <img src="/trash.svg" alt="delete" draggable={false} />
            </button>
          )}
          {/* <div className={styles.languagesContainer}>
            {project.languages.map((lan) => (
              <div>
                <img src={`/${lan}.svg`} alt={lan} draggable={false} />
              </div>
            ))}
          </div> */}
        </div>

        <div className={styles.footer}>
          {owned === true || project.isPublic === true ? (
            <button
              onClick={() => {}}
              className={[styles.button, styles.share].join(" ")}
            >
              <img src="/share.svg" alt="share" draggable={false} />
            </button>
          ) : (
            <div className={styles.hiddenButton} />
          )}

          <div>
            <img src="/eye.svg" alt="views" draggable={false} />
            {project.nb_views}
          </div>

          <div>
            <img src="/heart-full.svg" alt="likes" draggable={false} />
            {project.nb_likes}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
