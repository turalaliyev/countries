import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CountryPage from "./components/Page/CountryPage";

function App() {
  const [darkMode] = useContext(DarkModeContext);

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = darkMode ? "#212E37" : "#FAFAFA";
  }, [darkMode]);

  return (
    <div className="main">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:country_name" element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
