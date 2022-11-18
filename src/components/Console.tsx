import style from "./Console.module.scss";
import React from "react";

type ConsoleProps = {
  consoleResult: string;
};

const Console = ({ consoleResult }: ConsoleProps) => {
  return (
    <div className={style.container}>
      <p>{consoleResult} </p>
    </div>
  );
};

export default Console;
