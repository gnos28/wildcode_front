import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadToken from "../components/LoadToken";
import styles from "./Signin.module.scss";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { userAPI } from "../api/userAPI";
import { CreateUser } from "../interfaces/IUser";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [emailInscription, setEmailInscription] = useState("");
  const [passwordInscription, setPasswordInscription] = useState("");
  const [loginInscription, setLoginInscription] = useState("");

  const [showLoadToken, setShowLoadToken] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const openModal = () => {
    setModal(!modal);
  };

  const postUser = () => {
    userAPI.create({});
  };

  const SendUser = async () => {
    console.log("ca passe dans send user ");
    if (emailInscription && passwordInscription) {
      console.log("ca passe dans la condition");
      try {
        const user: CreateUser = {
          email: emailInscription,
          login: loginInscription,
          password: passwordInscription,
        };
        await userAPI.create(user);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <div className={styles.connection}>
      <input
        className={styles.inputCo}
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />{" "}
      <br />
      <input
        className={styles.inputCo}
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />{" "}
      <br />
      <Button
        onClick={() => setShowLoadToken(true)}
        variant="outlined"
        color="primary"
      >
        Login
      </Button>
      {showLoadToken === true && (
        <LoadToken username={email} password={password} />
      )}
      <Button onClick={handleOpen} variant="outlined" color="primary">
        inscription
      </Button>
      <div>
        <Modal
          className={styles.modal}
          open={modal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmailInscription(e.target.value);
              }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPasswordInscription(e.target.value);
              }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="login"
              onChange={(e) => {
                setLoginInscription(e.target.value);
              }}
            />
            <Button
              onClick={SendUser}
              variant="outlined"
              color="primary"
              className={styles.button}
            >
              envoyé
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignIn;
