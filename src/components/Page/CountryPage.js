import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../UI/Loading";

import styles from "./CountryPage.module.css";
import { DarkModeContext } from "../../context";

function CountryPage() {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMore] = useContext(DarkModeContext);

  const { country_name } = useParams();

  const loadCounty = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country_name}`
      );
      setCountry(response.data[0]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCounty();
  }, [country_name]);

  return (
    <>
      {loading && <Loading />}
      {country && (
        <div
          className={styles.countryPage}
          style={{ color: darkMore ? "white" : "black" }}
        >
          <div className={styles.buttonContainer}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                className={styles.button}
                style={{
                  backgroundColor: darkMore ? "#212E37" : "white",
                  boxShadow: darkMore ? "0 0 6px black" : "0 0 6px #0d6efd",
                  color: !darkMore ? "#212529" : "white",
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-left-long"
                  className="svg-inline--fa fa-arrow-left-long "
                  role="img"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    style={{ fill: !darkMore ? "#212529" : "white" }}
                    d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z"
                  ></path>
                </svg>{" "}
                <h5
                  style={{
                    margin: "0 0 0 5px",
                  }}
                >
                  Back
                </h5>
              </button>
            </Link>
          </div>
          <div className={styles.countryDetails}>
            <div className={styles.flag}>
              <img
                className={styles.image}
                src={country?.flags?.png}
                alt={country?.name?.common}
              />
            </div>
            <div className={styles.countryInfo}>
              <h1>{country?.name?.common}</h1>
              <div className={styles.countryDetails} style={{ gap: "1rem" }}>
                <div>
                  <p>
                    <span className={styles.detail}>Native Name: </span>{" "}
                    {country?.name?.official}
                  </p>
                  <p>
                    <span className={styles.detail}>Population: </span>{" "}
                    {country.population}
                  </p>
                  <p>
                    <span className={styles.detail}>Region: </span>{" "}
                    {country.region}
                  </p>
                  <p>
                    <span className={styles.detail}>Sub Region: </span>{" "}
                    {country.subregion}
                  </p>
                  <p>
                    <span className={styles.detail}>Capital: </span>{" "}
                    {country.capital}
                  </p>
                </div>
                <div>
                  <p>
                    <span className={styles.detail}>Top Level Domain: </span>{" "}
                    {country.tld}
                  </p>
                  <p>
                    <span className={styles.detail}>Currencies: </span>{" "}
                    {country.currencies && Object.keys(country.currencies)}
                  </p>
                  <p>
                    <span className={styles.detail}>Languages: </span>{" "}
                    {country.languages &&
                      Object.values(country.languages).join(", ")}
                  </p>
                </div>
              </div>
              <div className={styles.borders}>
                <span className={styles.detail}>Border Countries: </span>
                {Array.isArray(country.borders) &&
                  country.borders.map((element, key) => {
                    return (
                      <span
                        key={element}
                        className={styles.bordersElement}
                        style={{
                          backgroundColor: darkMore ? "#212E37" : "white",
                          boxShadow: darkMore
                            ? "0 0 6px black"
                            : "0 0 6px #0d6efd",
                          color: !darkMore ? "#212529" : "white",
                        }}
                      >
                        {element}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CountryPage;
