import style from "./Console.module.scss";
import React, { useState } from "react";

const Console = () => {
  const [returnConsole] = useState<string>(">console return here !!");
  return (
    <div className={style.container}>
      <h1 className="style.txt">{returnConsole} </h1>
    </div>
  );
};

export default Console;
