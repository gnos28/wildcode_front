import { api } from "./_graphQL";
import { fileRequest } from "./fileRequest";
import { IFiles } from "../interfaces/iFile";

type updateRes = {
  success: boolean,
}

export const fileAPI = {
  updateFileOnline: async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    try {
      const { data } = await api.mutate({
        mutation: fileRequest.updateCodeFile,
        variables: {
          contentData: codeToPush,
          fileId: fileId,
          projectId: projectId,
        },
      });
      return JSON.parse(data.updateCodeFile) as updateRes;
    } catch (err) {
      console.error(err);
    }
  },
  getAllFilesByProjectId: async (projectId: string): Promise<IFiles[]> => {
    try {
      const allProjectFiles = (
        await api.query({
          query: fileRequest.getFilesByProjectId,
          variables: {
            projectId: projectId,
          },
        })
      ).data.getFilesByProjectId as IFiles[];
      return allProjectFiles;
    } catch (err) {
      throw new Error("Erreur getAllFilesByProjectId");
    }
  },
};
