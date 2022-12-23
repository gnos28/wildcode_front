import { api } from "./_graphQL";
import { IUser, CreateUser } from "../interfaces/IUser";
import { gql } from "@apollo/client";

export const userAPI = {
  create: async (user: Partial<CreateUser>): Promise<IUser> => {
    const newUser = (
      await api.mutate({
        // mutation à refaire lorsque le back sera OP
        mutation: gql`
          mutation Mutation($user: iUser!) {
            createUser(password: $password, email: $email) {
              id
            }
          }
        `,
        variables: {
          user: {
            email: user.email,
            password: user.password,
          },
        },
      })
    ).data.createUser as IUser;

    return { ...newUser, id: newUser.id.toString() };
  },

  getAll: async (): Promise<IUser[]> => {
    const users = (
      await api.query({
        // query à refaire lorsque le back sera OP
        query: gql`
          query Query {
            User {
              id
              email
              login
              date_start_subscription
              date_end_subscription
            }
          }
        `,
      })
    ).data.User as IUser[];

    return users.map((user) => ({ ...user, id: user.id.toString() }));
  },
};
