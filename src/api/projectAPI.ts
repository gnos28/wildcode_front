import { api } from "./_graphQL";
import { IProject, CreateProject } from "../interfaces/IProject";
import { gql } from "@apollo/client";

export const projectAPI = {
  create: async (project: Partial<CreateProject>): Promise<IProject> => {
    const newProject = (
      await api.mutate({
        // mutation à refaire lorsque le back sera OP
        mutation: gql`
          mutation CreateProject(
            $isPublic: Boolean!
            $description: String!
            $name: String!
            $userId: Float!
          ) {
            createProject(
              isPublic: $isPublic
              description: $description
              name: $name
              userId: $userId
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
          userId: project.userId,
        },
      })
    ).data.createProject as IProject;

    return { ...newProject, id: newProject.id.toString() };
  },

  getAll: async (): Promise<IProject[]> => {
    const projects = (
      await api.query({
        query: gql`
          query {
            getAllProjects {
              description
              id
              id_storage_number
              isPublic
              name
              nb_likes
              nb_views
              file {
                language
              }
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
};
