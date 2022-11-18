import { api } from "./_REST";

type GetExecutedCode = {
  status: number;
  data: Required<any>[];
};

export const executeCodeAPI = {
  sendCode: async (code: string): Promise<GetExecutedCode> => {
    try {
      const { status, data }: GetExecutedCode = await api.post(`/executeCode`, {
        code,
      });

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: [] };
    }
  },
};
