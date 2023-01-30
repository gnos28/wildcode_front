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
  const [publicProjects, setPublicProjects] = useState<IProject[]>();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const navigate = useNavigate();

  const openNewProjectModal = () => {
    setShowNewProjectModal(true);
  };

  const token = localStorage.getItem("token");

  const getMyProjects = async () => {
    const projects = await projectAPI.getAll();
    setMyProjects(projects);
  };

  const getSharedProjects = async () => {
    const projects = await projectAPI.getSharedWithMe();
    setSharedProjects(projects);
  };

  const getPublicProjects = async () => {
    const projects = await projectAPI.getPublic();
    setPublicProjects(projects);
  };

  const createNewProject = async (project: Omit<CreateProject, "userId">) => {
    setShowNewProjectModal(false);
    await projectAPI.create(project);
    await getEveryProjects();
  };

  const getEveryProjects = async () => {
    await getMyProjects();
    await getSharedProjects();
    await getPublicProjects();
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getEveryProjects();
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
<<<<<<< HEAD

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
=======
          {showMyProjectList && (
            <div className={styles.projectsContainer}>
              {myProjects?.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  owned={true}
                  getEveryProjects={getEveryProjects}
                />
              ))}
              <article
                className={styles.newProject}
                onClick={openNewProjectModal}
              >
                <img
                  src="/add-circle.svg"
                  alt="add"
                  className={styles.addIcon}
                />
                <span>new project</span>
              </article>
            </div>
          )}
>>>>>>> 566f283c90a7c037831f03b6b19561a172a63aca
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
<<<<<<< HEAD
          <div className={styles.projectsContainer}>
            {sharedProjects?.map((project) => (
              <ProjectItem key={project.id} project={project} owned={false} />
            ))}
          </div>
=======
          {showSharedProjectList && (
            <div className={styles.projectsContainer}>
              {sharedProjects?.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  owned={false}
                  getEveryProjects={getEveryProjects}
                />
              ))}
            </div>
          )}
>>>>>>> 566f283c90a7c037831f03b6b19561a172a63aca
        </section>

        <section className={styles.section}>
          <h2>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={styles.arrowDown}
            />
            <span>All public projects</span>
          </h2>
<<<<<<< HEAD
          <div className={styles.projectsContainer}>
            {publicProjects?.map((project) => (
              <ProjectItem key={project.id} project={project} owned={false} />
            ))}
          </div>
=======
          {showAllProjectList && (
            <div className={styles.projectsContainer}>
              {publicProjects?.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  owned={false}
                  getEveryProjects={getEveryProjects}
                />
              ))}
            </div>
          )}
>>>>>>> 566f283c90a7c037831f03b6b19561a172a63aca
        </section>
      </div>
      {showNewProjectModal === true && (
        <NewProjectModal createNewProject={createNewProject} />
      )}
    </>
  );
};

export default Home;
