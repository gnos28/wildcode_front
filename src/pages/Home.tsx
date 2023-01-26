import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import ProjectItem from "../components/ProjectItem";
import { useNavigate } from "react-router-dom";
import { projectAPI } from "../api/projectAPI";
import { IProject, CreateProject } from "../interfaces/IProject";
import NewProjectModal from "../components/NewProjectModal";

const Home = () => {
  const [myProjects, setMyProjects] = useState<IProject[]>();
  const [sharedProjects, setSharedProjects] = useState<IProject[]>();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const navigate = useNavigate();

  const openNewProjectModal = () => {
    setShowNewProjectModal(true);
    // navigate("/Edit");
  };

  const token = localStorage.getItem("token");

  const getMyProjects = async () => {
    const projects = await projectAPI.getAll();

console.log("projects", projects);


    setMyProjects(projects);
  };

  const getSharedProjects = async () => {
    const projects = await projectAPI.getAll();
    setSharedProjects(projects);
  };

  const createNewProject = async (project: Omit<CreateProject, "userId">) => {
    setShowNewProjectModal(false);
    const newProject = await projectAPI.create(project);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getMyProjects(); // not good
    getSharedProjects(); // not good
  }, []);

  return (
    <>
      <div>
        <section className={styles.section}>
          <h2>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={styles.arrowDown}
            />
            <span>My Projects</span>
          </h2>

          <div className={styles.projectsContainer}>
            {myProjects?.map((project) => (
              <ProjectItem key={project.id} project={project} owned={true} />
            ))}
            <article
              className={styles.newProject}
              onClick={openNewProjectModal}
            >
              <img src="/add-circle.svg" alt="add" className={styles.addIcon} />
              <span>new project</span>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={styles.arrowDown}
            />
            <span>Projects shared with me</span>
          </h2>
          <div className={styles.projectsContainer}>
            {sharedProjects?.map((project) => (
              <ProjectItem key={project.id} project={project} owned={false} />
            ))}
          </div>
        </section>
      </div>
      {showNewProjectModal === true && (
        <NewProjectModal createNewProject={createNewProject} />
      )}
    </>
  );
};

export default Home;
