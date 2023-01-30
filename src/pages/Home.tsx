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
  const [showMyProjectList, setShowMyProjectList] = useState(true);
  const [showSharedProjectList, setShowSharedProjectList] = useState(true);
  const [showAllProjectList, setShowAllProjectList] = useState(true);

  const navigate = useNavigate();

  const openNewProjectModal = () => {
    setShowNewProjectModal(true);
  };

  const token = localStorage.getItem("token");

  const handleArrowClick = (
    list: "myProjects" | "sharedProjects" | "allProjects"
  ) => {
    if (list === "myProjects") setShowMyProjectList(!showMyProjectList);
    if (list === "sharedProjects")
      setShowSharedProjectList(!showSharedProjectList);
    if (list === "allProjects") setShowAllProjectList(!showAllProjectList);
  };

  const getMyProjects = async () => {
    const projects = await projectAPI.getAll();
    console.log("getMyProjects", projects);

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
    console.log("createNewProject", createNewProject);

    setShowNewProjectModal(false);
    const res = await projectAPI.create(project);
    console.log("projectAPI.created !", res);
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
          <h2 onClick={() => handleArrowClick("myProjects")}>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={[
                styles.arrowDown,
                showMyProjectList ? null : styles.arrowLeft,
              ].join(" ")}
            />
            <span>My Projects</span>
          </h2>
          {showMyProjectList && (
            <div className={styles.projectsContainer}>
              {myProjects?.map((project) => (
                <ProjectItem key={project.id} project={project} owned={true} />
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
        </section>

        <section className={styles.section}>
          <h2 onClick={() => handleArrowClick("sharedProjects")}>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={[
                styles.arrowDown,
                showSharedProjectList ? null : styles.arrowLeft,
              ].join(" ")}
            />
            <span>Projects shared with me</span>
          </h2>
          {showSharedProjectList && (
            <div className={styles.projectsContainer}>
              {sharedProjects?.map((project) => (
                <ProjectItem key={project.id} project={project} owned={false} />
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2 onClick={() => handleArrowClick("allProjects")}>
            <img
              src="/triangle.svg"
              alt="triangle"
              className={[
                styles.arrowDown,
                showAllProjectList ? null : styles.arrowLeft,
              ].join(" ")}
            />
            <span>All public projects</span>
          </h2>
          {showAllProjectList && (
            <div className={styles.projectsContainer}>
              {publicProjects?.map((project) => (
                <ProjectItem key={project.id} project={project} owned={false} />
              ))}
            </div>
          )}
        </section>
      </div>
      {showNewProjectModal === true && (
        <NewProjectModal createNewProject={createNewProject} />
      )}
    </>
  );
};

export default Home;
