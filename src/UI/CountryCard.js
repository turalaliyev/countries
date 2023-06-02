import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { DarkModeContext } from "../context";

import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";

function CountryCard(props) {
  const [darkMode] = useContext(DarkModeContext);

  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className={`${styles.card} ${hovered ? styles.hovered : ""}`}
      style={{
        borderRadius: "0.5rem",
        backgroundColor: darkMode ? "#2B3743" : "white",
        color: darkMode ? "white" : "black",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia sx={{ height: 140 }} image={props.image} title={props.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <p>Population: {props.population}</p>
        <p>Region: {props.region}</p>
        <p>Capital: {props.capital}</p>
      </CardContent>
      <CardActions>
        <Link to={`/details/${props.name.toLowerCase()}`}>
          <Button
            size="medium"
            style={{
              backgroundColor: "#31D2F2",
              color: darkMode ? "white" : "black",
            }}
          >
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CountryCard;
