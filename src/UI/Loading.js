import React, { useContext } from "react";

import styles from "./Loading.module.css";
import { DarkModeContext } from "../context";

function Loading() {
  const [darkMode] = useContext(DarkModeContext);

  return (
    <div
      className={styles.loaderContainer}
      style={{
        backgroundColor: darkMode ? "#2B3743" : "white",
      }}
    >
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loading;
