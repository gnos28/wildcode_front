import { api } from "./_graphQL";
import { fileRequest } from "./fileRequest";

export const fileAPI = {
  updateFileOnline: async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    try {
      const { data } = await api.mutate({
        mutation: fileRequest.UPDATE_FILE,
        variables: {
          contentData: codeToPush,
          fileId: fileId,
          projectId: projectId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
