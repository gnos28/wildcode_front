import { ExecutedCode } from "../api/executeCodeAPI";
import styles from "./Console.module.scss";

type ConsoleProps = {
  consoleResult: ExecutedCode[] | undefined;
};

const Console = ({ consoleResult }: ConsoleProps) => {
  return (
    <div className={styles.container}>
      {consoleResult &&
        consoleResult.map((line, lineIndex) => (
          <p className={styles[line.type]} key={lineIndex}>
            {`>\u00a0` + line.message}
          </p>
        ))}
    </div>
  );
};

export default Console;
