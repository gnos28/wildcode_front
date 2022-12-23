import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { ExtProject } from "../interfaces";
import ProjectItem from "../components/ProjectItem";
import { useNavigate } from "react-router-dom";
import { useApolloClient, gql, useQuery } from "@apollo/client";

const Home = () => {
  const [myProjects, setMyProjects] = useState<ExtProject[]>();
  const [sharedProjects, setSharedProjects] = useState<ExtProject[]>();
  

  const navigate = useNavigate();

  const routeEdit = () => {
    navigate("/Edit");
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  // call API pour récupérer liste des projets du user

  const GET_PROJECT = gql`
    query {
      getAllProjects {
        description
        id
        id_storage_number
        isPublic
        name
        nb_likes
        nb_views
      }
    }
  `;

  const { loading, error } = useQuery(GET_PROJECT, {
    onCompleted: (data: any) => {
      setMyProjects(data.getAllProjects);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
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
          <article className={styles.newProject} onClick={routeEdit}>
            <img src="/add-circle.svg" alt="add" className={styles.addIcon} />
            <span>new project</span>
          </article>
        </div>
      </section>

      {/* <section className={styles.section}>
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
      </section>  */}
    </div>
  );
};

export default Home;
