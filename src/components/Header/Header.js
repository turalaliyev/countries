import React, { useContext } from "react";

import styles from "./Header.module.css";
import { DarkModeContext } from "../../context";

function Header() {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  function toggleMode() {
    return setDarkMode(!darkMode);
  }

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: darkMode ? "#2B3743" : "#ffffff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <div>
        <h2>Where in the World?</h2>
      </div>
      <div>
        <button className={styles.darkModeButton} onClick={toggleMode}>
          <svg
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            fill={darkMode ? "#fff" : "#000"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
          </svg>
          <h3
            className={styles.buttonText}
            style={{ color: darkMode ? "#fff" : "#000" }}
          >
            Dark Mode
          </h3>
        </button>
      </div>
    </header>
  );
}

export default Header;
