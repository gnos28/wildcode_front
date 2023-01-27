import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/authAPI";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogin = async () => {
    const token = await authAPI.getToken(userEmail, password);

    localStorage.setItem("token", token);
  };

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
          setUserEmail(e.target.value);
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SignIn;
