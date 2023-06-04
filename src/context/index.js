import { createContext, useState } from "react";

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
  // localStorage.setItem("mode", true);

  const mode =
    (localStorage.getItem("mode") === null
      ? localStorage.setItem("mode", false)
      : localStorage.getItem("mode")) === "false"
      ? false
      : true;

  const [darkMode, setDarkMode] = useState(mode);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("mode", !darkMode);
  };

  return (
    <DarkModeContext.Provider value={[darkMode, toggleMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};
