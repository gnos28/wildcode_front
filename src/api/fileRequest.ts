import { gql } from "@apollo/client";

const fileRequest = {
  UPDATE_FILE: gql`
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
