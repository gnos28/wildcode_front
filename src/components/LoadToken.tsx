import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

type LoadTokenProps = {
  username: string;
  password: string;
};

const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

const LoadToken = ({ username, password }: LoadTokenProps) => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TOKEN, {
    variables: {
      email: username,
      password: password,
    },
    onCompleted(data: any) {
      console.log(data.getToken);
      localStorage.setItem("token", data.getToken);
      navigate("/");
    },
    onError(error: any) {
      console.log("Err", error);
    },
  });

  return <div>LoadToken</div>;
};

export default LoadToken;
