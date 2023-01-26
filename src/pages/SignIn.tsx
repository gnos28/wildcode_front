import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadToken from "../components/LoadToken";
import styles from "./Signin.module.scss";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const [showLoadToken, setShowLoadToken] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      Email{" "}
      <input
        placeholder="email"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />{" "}
      <br />
      Password{" "}
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />{" "}
      <br />
      <button onClick={() => setShowLoadToken(true)}>Login</button>
      {showLoadToken === true && (
        <LoadToken username={username} password={password} />
      )}
      <button
        onClick={() => {
          openModal();
        }}
      >
        inscription
      </button>
      {modal === true ? <div>aaaaa</div> : null}
    </div>
  );
};

export default SignIn;
