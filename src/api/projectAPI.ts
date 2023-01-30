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
              like {
                id
                userId {
                  id
                }
              }
              id
              id_storage_number
              isPublic
              name
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
              like {
                id
                userId {
                  id
                }
              }
              id
              id_storage_number
              isPublic
              name
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
              like {
                id
                userId {
                  id
                }
              }
              id
              id_storage_number
              isPublic
              name
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
              like {
                id
                userId {
                  id
                }
              }
              id
              id_storage_number
              isPublic
              name
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
<<<<<<< HEAD
=======

  addView: async (rawProjectId: number | string): Promise<number> => {
    let projectId =
      typeof rawProjectId === "string" ? parseInt(rawProjectId) : rawProjectId;

    const updatedProject = (
      await api.mutate({
        mutation: gql`
          mutation Mutation($projectId: Float!) {
            addView(projectId: $projectId) {
              nb_views
            }
          }
        `,
        variables: {
          projectId,
        },
      })
    ).data.addView as IProject[];

    return updatedProject[0]?.nb_views;
  },

  addLike: async (rawProjectId: number | string): Promise<number> => {
    let projectId =
      typeof rawProjectId === "string" ? parseInt(rawProjectId) : rawProjectId;

    const updatedProject = (
      await api.mutate({
        mutation: gql`
          mutation Mutation($projectId: Float!) {
            addLike(projectId: $projectId) {
              description
              like {
                id
                userId {
                  id
                }
              }
              id
              id_storage_number
              isPublic
              name
              nb_views
            }
          }
        `,
        variables: {
          projectId,
        },
      })
    ).data.addLike as IProject[];

    return updatedProject[0]?.like?.length || 0;
  },

  removeLike: async (rawProjectId: number | string): Promise<number> => {
    let projectId =
      typeof rawProjectId === "string" ? parseInt(rawProjectId) : rawProjectId;

    const updatedProject = (
      await api.mutate({
        mutation: gql`
          mutation Mutation($projectId: Float!) {
            removeLike(projectId: $projectId) {
              description
              id
              id_storage_number
              isPublic
              like {
                id
                userId {
                  id
                }
              }
              name
              nb_views
            }
          }
        `,
        variables: {
          projectId,
        },
      })
    ).data.removeLike as IProject[];

    return updatedProject[0]?.like?.length || 0;
  },
>>>>>>> 566f283c90a7c037831f03b6b19561a172a63aca
};
