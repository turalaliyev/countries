import React, { useEffect, useState } from "react";

import styles from "./Main.module.css";
import Select from "react-select";
import CountryCard from "../../UI/CountryCard";
import axios from "axios";
import Loading from "../../UI/Loading";

function Main() {
  const [regionFilter, setRegionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  function sortByName(arr) {
    return arr.sort(function (a, b) {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
  }

  function selectHandler(event) {
    setRegionFilter(event.value);
  }

  const options = [
    { value: "", label: "--Select--" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);

      const response = await axios.get("https://restcountries.com/v3.1/all");
      setData(
        sortByName(response.data).filter(
          (country) => country.name.common !== "Armenia"
        )
      );

      setLoading(false);

      window.scrollTo();
    };

    loadCountries();
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.main}>
          <section className={styles.filterSection}>
            <div className={styles.search}>
              <svg
                className={styles.svg}
                stroke="currentColor"
                fill="grey"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
              <input
                placeholder="Search for a country..."
                className={styles.input}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.selectContainer}>
              <Select
                className={styles.selector}
                placeholder="Filter by Region"
                options={options}
                onChange={selectHandler}
              />
            </div>
          </section>
          <section className={styles.cardsSection}>
            {data
              .filter((country) => {
                return regionFilter === ""
                  ? country
                  : country.region === regionFilter;
              })
              .filter((country) => {
                return searchQuery.toLowerCase() === ""
                  ? country
                  : country.name.common
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
              })
              .map((el) => {
                return (
                  <CountryCard
                    id={el.id}
                    key={el.name.official}
                    image={el.flags.png}
                    name={el.name.common}
                    population={el.population}
                    region={el.region}
                    capital={el.capital}
                  />
                );
              })}
          </section>
        </div>
      )}
    </>
  );
}

export default Main;
