export type ILike = {
  id: number;
  userId: { id: number };
};

export type IProject = {
  id: string;
  id_storage_number: string;
  name: string;
  description: string;
  isPublic: boolean;
  like?: ILike[];
  nb_views: number;
  file: { language: string }[];
};

export type CreateProject = {
  userId: number;
  name: string;
  description: string;
  isPublic: boolean;
};
