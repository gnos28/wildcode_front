export type IUser = {
  id: string;
  email: string;
  login: string;
  date_start_subscription?: Date | null;
  date_end_subscription?: Date | null;
};

export type CreateUser = {
  email: string;
  login: string;
  password: string;
};
