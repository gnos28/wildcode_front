import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import ProjectItem from "../components/ProjectItem";
import { useNavigate } from "react-router-dom";
import { projectAPI } from "../api/projectAPI";
import { IProject, CreateProject } from "../interfaces/IProject";
import NewProjectModal from "../components/NewProjectModal";
import UserContext from "../contexts/userContext";
import ProjectContext from "../contexts/projectContext";

const Home = () => {
  const [myProjects, setMyProjects] = useState<IProject[]>();
  const [sharedProjects, setSharedProjects] = useState<IProject[]>();
  const [publicProjects, setPublicProjects] = useState<IProject[]>();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
<<<<<<< HEAD
=======
  const [showMyProjectList, setShowMyProjectList] = useState(true);
  const [showSharedProjectList, setShowSharedProjectList] = useState(true);
  const [showAllProjectList, setShowAllProjectList] = useState(true);
  const { user } = useContext(UserContext);
  const { setProject } = useContext(ProjectContext);
>>>>>>> 30bccb6bf632cb11e40e55ca81cf9b6849092744

  const navigate = useNavigate();

  const openNewProjectModal = () => {
    setShowNewProjectModal(true);
  };

  const closeNewProjectModal = () => {
    setShowNewProjectModal(false);
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
    setProject({});
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
=======
          {showMyProjectList && myProjects && myProjects.length > 0 && (
>>>>>>> 30bccb6bf632cb11e40e55ca81cf9b6849092744
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
=======
          {showSharedProjectList &&
            sharedProjects &&
            sharedProjects.length > 0 && (
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
>>>>>>> 30bccb6bf632cb11e40e55ca81cf9b6849092744
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
=======
          {showAllProjectList &&
            publicProjects &&
            publicProjects.length > 0 && (
              <div className={styles.projectsContainer}>
                {publicProjects
                  ?.filter((project) => project.userId?.id === user.id)
                  .map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      owned={false}
                      getEveryProjects={getEveryProjects}
                    />
                  ))}
              </div>
            )}
>>>>>>> 30bccb6bf632cb11e40e55ca81cf9b6849092744
        </section>
      </div>
      {showNewProjectModal === true && (
        <NewProjectModal
          createNewProject={createNewProject}
          closeNewProjectModal={closeNewProjectModal}
        />
      )}
    </>
  );
};

export default Home;
