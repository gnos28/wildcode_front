import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadToken from "../components/LoadToken";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showLoadToken, setShowLoadToken] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <div>
      Email{" "}
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />{" "}
      <br />
      Password{" "}
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />{" "}
      <br />
      <button onClick={() => setShowLoadToken(true)}>Login</button>
      {showLoadToken === true && (
        <LoadToken username={username} password={password} />
      )}
    </div>
  );
};

export default SignIn;
