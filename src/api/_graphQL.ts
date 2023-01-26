import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
} from "@apollo/client";

let fromFrontUrl = "http://localhost:5000";

if (process.env.BACKEND_URL) fromFrontUrl = process.env.BACKEND_URL;

const params: ApolloClientOptions<unknown> = {
  uri: `${fromFrontUrl}/graphql`,
  cache: new InMemoryCache(),
};

const token = localStorage.getItem("token");

if (token) params.headers = { Authorization: "Bearer " + token };

export const api = new ApolloClient(params);
