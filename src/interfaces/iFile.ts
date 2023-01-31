import { IUser } from "./IUser";

export type IFiles = {
  id: number;
  id_storage_file: string;
  name: string;
  language: string;
  userId?: IUser;
  projectId?: number;
};

