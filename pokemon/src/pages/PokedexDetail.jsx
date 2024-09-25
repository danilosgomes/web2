import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import pokemonImage from "../assets/International_Pokémon_logo.svg.png";
import Header from "../components/Header";

const PokedexDetail = () => {
  const { name } = useParams();
  

  return (
    <div
      className="background-container"
      style={{
        overflowY: "auto",
      }}
    >
      {/* Menu de Navegação */}
      <Header />
      <div
        className="text-center"
        style={{
          backgroundColor: "#B0B0B0",
          paddingTop: "80px",
          marginLeft: "320px",
          marginRight: "320px",
          overflow: "auto",
          height: "93.4%",
        }}
      >
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default PokedexDetail;
