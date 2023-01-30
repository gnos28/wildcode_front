import { api } from "./_graphQL";
import { IProject, CreateProject } from "../interfaces/IProject";
import { gql } from "@apollo/client";

export const projectAPI = {
  create: async (project: Omit<CreateProject, "userId">): Promise<IProject> => {
    const newProject = (
      await api.mutate({
        // mutation à refaire lorsque le back sera OP
        mutation: gql`
          mutation CreateProject(
            $isPublic: Boolean!
            $description: String!
            $name: String!
          ) {
            createProject(
              isPublic: $isPublic
              description: $description
              name: $name
            ) {
              description
              id
              id_storage_number
              isPublic
              name
              nb_likes
              nb_views
            }
          }
        `,
        variables: {
          isPublic: project.isPublic,
          description: project.description,
          name: project.name,
        },
      })
    ).data.createProject as IProject;

    return { ...newProject, id: newProject.id.toString() };
  },

  getAll: async (): Promise<IProject[]> => {
    const projects = (
      await api.query({
        query: gql`
          query Query {
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
        `,
      })
    ).data.getAllProjects as IProject[];

    return projects.map((projects) => ({
      ...projects,
      id: projects.id.toString(),
    }));
  },

  getSharedWithMe: async (): Promise<IProject[]> => {
    const projects = (
      await api.query({
        query: gql`
          query getSharedWithMeProjects {
            getSharedWithMeProjects {
              description
              id
              id_storage_number
              isPublic
              name
              nb_likes
              nb_views
            }
          }
        `,
      })
    ).data.getSharedWithMeProjects as IProject[];

    return projects.map((projects) => ({
      ...projects,
      id: projects.id.toString(),
    }));
  },

  deleteProject: async (projectId: string): Promise<IProject> => {
    const project = (
      await api.mutate({
        mutation: gql`
          mutation Mutation($projectId: Float!) {
            deleteProject(projectId: $projectId) {
              id
            }
          }
        `,
        variables: { projectId },
      })
    ).data.deleteProject as IProject;

    return { ...project, id: project.id.toString() };
  },

  getPublic: async (): Promise<IProject[]> => {
    const projects = (
      await api.query({
        query: gql`
          query getPublicProjects {
            getPublicProjects {
              description
              id
              id_storage_number
              isPublic
              name
              nb_likes
              nb_views
            }
          }
        `,
      })
    ).data.getPublicProjects as IProject[];

    return projects.map((projects) => ({
      ...projects,
      id: projects.id.toString(),
    }));
  },
};
