import { gql } from "@apollo/client";

const fileRequest = {
  getFilesByProjectId: gql`
    query GetAllProjects($projectId: String!) {
      getFilesByProjectId(projectId: $projectId) {
        id
        id_storage_file
        language
        name
      }
    }
  `,
  updateCodeFile: gql`
    mutation UpdateCodeFile(
      $contentData: String!
      $fileId: Float!
      $projectId: Float!
    ) {
      updateCodeFile(
        contentData: $contentData
        fileId: $fileId
        projectId: $projectId
      )
    }
  `,
};

export { fileRequest };
