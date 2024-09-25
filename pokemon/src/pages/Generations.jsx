import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import { Link } from "react-router-dom";
import pokemonImage from "../assets/International_Pokémon_logo.svg.png";
import PokemonMinCard from "../Card/PokemonMinCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Generations = () => {
  axios.defaults.timeout = 10000; // 10 segundos

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    const endpoints = [];

    for (let i = 1; i < 10; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    Promise.all(
      endpoints.map((endpoint) =>
        axios
          .get(endpoint)
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
            return null;
          })
      )
    ).then((results) => {
      const validPokemons = results.filter((result) => result !== null);
      setPokemons(validPokemons);
      setFilteredPokemons(validPokemons);
    });
  };

  // Função para filtrar por geração
  const filterByGeneration = (generation) => {
    let start = 0;
    let end = 0;

    if (generation === 0) {
      start = 1;
      end = 898;
    } else if (generation === 1) {
      start = 1;
      end = 151; // 1ª geração
    } else if (generation === 2) {
      start = 152;
      end = 251; // 2ª geração
    } else if (generation === 3) {
      start = 252;
      end = 386; // 3ª geração
    } else if (generation === 4) {
      start = 387;
      end = 493; // 4ª geração
    } else if (generation === 5) {
      start = 494;
      end = 649; // 5ª geração
    } else if (generation === 6) {
      start = 650;
      end = 721; // 6ª geração
    } else if (generation === 7) {
      start = 722;
      end = 809; // 7ª geração
    } else if (generation === 8) {
      start = 810;
      end = 898; // 8ª geração
    }

    const filtered = pokemons.filter(
      (pokemon) => pokemon.id >= start && pokemon.id <= end
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div
      className="background-container"
      style={{
        overflowY: "auto",
      }}
    >
      {/* Menu de Navegação */}
      <nav
        className="navbar navbar-expand-xxl bg-body-tertiary"
        style={{
          backgroundColor: "#222",
          marginLeft: "320px",
          marginRight: "320px",
          padding: "10px",
        }}
        data-bs-theme="dark"
      >
        <div
          className="container-fluid position-relative"
          style={{
            maxWidth: "1200px",
            padding: "0",
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          <a aria-current="page" href="http://localhost:3000">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png"
              alt="Pokémon"
              width="112"
              height="41"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/pokemons">
                  Pokémons
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/geracoes">
                  Gerações
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/pokedex">
                  Pokédex
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
        <img
          src={pokemonImage}
          alt="Pokemon Logo"
          style={{
            paddingBottom: "40px",
            height: "120px",
          }}
        />
        <div className="text-center mt-4">
          {/* Botões para seleção de geração */}
          <button
            className="btn btn- me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(0)}
          >
            Todos
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(1)}
          >
            1ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(2)}
          >
            2ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(3)}
          >
            3ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(4)}
          >
            4ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(5)}
          >
            5ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(6)}
          >
            6ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(7)}
          >
            7ª Geração
          </button>
          <button
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={() => filterByGeneration(8)}
          >
            8ª Geração
          </button>
        </div>

        <div
          className="container mt-4"
          style={{
            display: "flex",
            flexDirection: "column", // Mudar para coluna
            alignItems: "center", // Centralizar os itens
          }}
        >
          {/* Agrupar Pokémons por geração */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((gen) => {
            // Filtra os pokémons pela geração
            const generationPokemons = filteredPokemons.filter((pokemon) => {
              const id = pokemon.id;
              return (
                (gen === 1 && id <= 151) ||
                (gen === 2 && id > 151 && id <= 251) ||
                (gen === 3 && id > 251 && id <= 386) ||
                (gen === 4 && id > 386 && id <= 493) ||
                (gen === 5 && id > 493 && id <= 649) ||
                (gen === 6 && id > 649 && id <= 721) ||
                (gen === 7 && id > 721 && id <= 807) ||
                (gen === 8 && id > 807 && id <= 898)
              );
            });

            // Renderiza se houver pokémons da geração
            if (generationPokemons.length > 0) {
              return (
                <div
                  key={gen}
                  style={{ marginBottom: "40px", textAlign: "left" }}
                >
                  <h3 style={{ marginLeft: "40px", fontWeight: "800" }}>
                    {gen}ª Geração
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {generationPokemons.map((pokemon, index) => (
                      <div style={{ margin: "10px" }} key={index}>
                        <PokemonMinCard
                          name={pokemon.name}
                          img={pokemon.sprites.front_default}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null; // Não renderiza nada se não houver pokémons da geração
          })}
        </div>
      </div>
    </div>
  );
};

export default Generations;
