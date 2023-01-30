import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signin.module.scss";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { userAPI } from "../api/userAPI";
import { CreateUser } from "../interfaces/IUser";
import { authAPI } from "../api/authAPI";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [emailInscription, setEmailInscription] = useState("");
  const [passwordInscription, setPasswordInscription] = useState("");
  const [loginInscription, setLoginInscription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogin = async () => {
    const token = await authAPI.getToken(email, password);

    localStorage.setItem("token", token);

    navigate("/");
  };
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
    if (emailInscription && passwordInscription && !token) {
      try {
        const user: CreateUser = {
          password: passwordInscription,
          login: loginInscription,
          email: emailInscription,
        };
        await userAPI.create(user);
      } catch (e) {
        console.log("error", e);
      }
    }
    handleClose();
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Stack>
    );
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
      <div className={styles.btnco}>
        <Button
          onClick={handleLogin}
          variant="outlined"
          color="primary"
          size="medium"
        >
          Login
        </Button>
        <Button onClick={handleOpen} variant="outlined" color="primary">
          inscription
        </Button>
      </div>
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
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmailInscription(e.target.value);
              }}
            />
            <input
              className={styles.input}
              type="password"
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
