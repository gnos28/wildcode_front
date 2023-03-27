import React, { BaseSyntheticEvent, useState } from "react";
import modalStyles from "../styles/modal.module.scss";
import styles from "./RegisterModal.module.scss";
import { Button, TextField } from "@mui/material";

type RegisterModalProps = {
  closeModal: () => void;
  registerNewUser: (
    emailInscription: string,
    loginInscription: string,
    passwordInscription: string
  ) => Promise<JSX.Element>;
};

type Fields = "email" | "password" | "login";

const verif = (
  stateType: Fields,
  getState: {
    email: string;
    password: string;
    login: string;
  }
) => {
  const state = getState[stateType];

  const regVerif = {
    email: state.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: state.match(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    ),
    login: state.match(/^[a-zA-Z0-9_\-]{3,15}$/),
  };

  return regVerif[stateType];
};

const RegisterModal = ({ closeModal, registerNewUser }: RegisterModalProps) => {
  const [emailInscription, setEmailInscription] = useState("");
  const [passwordInscription, setPasswordInscription] = useState("");
  const [loginInscription, setLoginInscription] = useState("");

  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

  const setState = {
    email: setWrongEmail,
    password: setWrongPassword,
    login: setWrongLogin,
  };
  const getState = {
    email: emailInscription,
    password: passwordInscription,
    login: loginInscription,
  };

  const verifySingleField = (field: Fields) => {
    const status = getState[field] !== "" && !verif(field, getState);

    setState[field](status);
  };

  const verifyBeforeRegister = () => {
    const fields: Fields[] = ["email", "password", "login"];

    const verifiedFields = fields.map((field) => ({
      field,
      value: getState[field],
      status: !verif(field, getState),
    }));

    verifiedFields.map((vField) => {
      setState[vField.field](vField.status);
    });

    if (verifiedFields.every((vField) => !vField.status))
      registerNewUser(emailInscription, loginInscription, passwordInscription);
  };

  const handleFieldChange = (
    e: BaseSyntheticEvent,
    fieldType: "email" | "password" | "login"
  ) => {
    const field = e.target.value;
    const setState = {
      email: setEmailInscription,
      password: setPasswordInscription,
      login: setLoginInscription,
    };

    setState[fieldType](field);
  };

  const handleModalClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={modalStyles.modalBackground} onClick={closeModal}>
      <div className={modalStyles.modalContainer} onClick={handleModalClick}>
        <h3>Inscription nouvel utilisateur</h3>
        <div className={styles.form}>
          <TextField
            id="outlined-basic"
            label="votre email"
            variant="outlined"
            sx={{
              backgroundColor: "white",
            }}
            value={emailInscription}
            onChange={(e) => {
              handleFieldChange(e, "email");
            }}
            error={wrongEmail}
            autoFocus
            onBlur={() => verifySingleField("email")}
          />
          <span className={styles.errorSpan}>
            {wrongEmail ? "votre email n'est pas valide" : ""}
          </span>
          <TextField
            id="outlined-basic"
            label="votre identifiant"
            variant="outlined"
            sx={{
              backgroundColor: "white",
            }}
            value={loginInscription}
            onChange={(e) => {
              handleFieldChange(e, "login");
            }}
            error={wrongLogin}
            onBlur={() => verifySingleField("login")}
          />
          <span className={styles.errorSpan}>
            {wrongLogin
              ? 'votre login n\'est pas valide, il doit contenir entre 3 et 15 caractères (minuscules, majuscules, chiffres et "_" "-")'
              : ""}
          </span>
          <TextField
            id="outlined-basic"
            label="votre mot de passe"
            variant="outlined"
            type="password"
            sx={{
              backgroundColor: "white",
            }}
            value={passwordInscription}
            onChange={(e) => {
              handleFieldChange(e, "password");
            }}
            error={wrongPassword}
            onBlur={() => verifySingleField("password")}
          />
          <span className={styles.errorSpan}>
            {wrongPassword
              ? "votre mot de passe n'est pas valide, il doit contenir au moins 8 caractères dont 1 caractère minuscule, 1 caractère majuscule et 1 caractère spécial"
              : ""}
          </span>
          <Button
            onClick={verifyBeforeRegister}
            variant="contained"
            color="primary"
          >
            envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
