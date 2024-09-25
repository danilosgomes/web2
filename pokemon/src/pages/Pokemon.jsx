import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import { Link } from "react-router-dom";
import pokemonImage from "../assets/International_Pokémon_logo.svg.png";
import PokemonCard from "../Card/PokemonCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";


const Pokemon = () => {
  axios.defaults.timeout = 10000;
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    // Filtro por nome
    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "life") {
          comparison = a.stats[0].base_stat - b.stats[0].base_stat;
        } else if (sortBy === "attack") {
          comparison = a.stats[1].base_stat - b.stats[1].base_stat;
        } else if (sortBy === "defense") {
          comparison = a.stats[2].base_stat - b.stats[2].base_stat;
        } else if (sortBy === "speed") {
          comparison = a.stats[5].base_stat - b.stats[5].base_stat;
        } else if (sortBy === "id") {
          comparison = a.id - b.id;
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons, sortBy, sortDirection]);

  const getPokemons = async () => {
    const endpoints = [];
    for (let i = 1; i < 10; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    try {
      const results = await Promise.all(
        endpoints.map((endpoint) =>
          axios
            .get(endpoint)
            .then((res) => res.data)
            .catch((err) => {
              console.log(err);
              return null;
            })
        )
      );

      const validPokemons = results.filter((result) => result !== null);
      setPokemons(validPokemons);
      setFilteredPokemons(validPokemons); // Inicializa com todos os pokémons
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    }
  };

  const handleSort = (sortKey) => {
    if (sortBy === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

  return (
    <div className="background-container" style={{ overflowY: "auto" }}>
      <Header />

      <div
        className="text-center"
        style={{
          backgroundColor: "#B0B0B0",
          paddingTop: "120px",
          margin: "0 320px",
          overflow: "auto",
          height: "93.4%",
        }}
      >
        <img
          src={pokemonImage}
          alt="Pokemon Logo"
          style={{ height: "160px" }}
        />
        <div
          className="text-center form-group"
          style={{
            paddingTop: "40px",
            paddingBottom: "20px",
            margin: "0 320px",
          }}
        >
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="d-flex justify-content-center mb-3"
            style={{ marginTop: "20px" }}
          >
            <div className="btn-group" role="group" aria-label="Filtros">
              <button
                type="button"
                className={`btn btn-secondary ${
                  sortBy === "id" ? "active" : ""
                }`}
                onClick={() => handleSort("id")}
              >
                ID
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  sortBy === "name" ? "active" : ""
                }`}
                onClick={() => handleSort("name")}
              >
                Nome
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  sortBy === "life" ? "active" : ""
                }`}
                onClick={() => handleSort("life")}
              >
                Vida
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  sortBy === "attack" ? "active" : ""
                }`}
                onClick={() => handleSort("attack")}
              >
                Ataque
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  sortBy === "speed" ? "active" : ""
                }`}
                onClick={() => handleSort("speed")}
              >
                Velocidade
              </button>
            </div>
          </div>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {filteredPokemons.map((pokemon) => (
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={pokemon.id}
            >
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                img={pokemon.sprites.front_default}
                life={pokemon.stats[0].base_stat}
                atk={pokemon.stats[1].base_stat}
                shild={pokemon.stats[2].base_stat}
                speed={pokemon.stats[5].base_stat}
                type={pokemon.types[0].type.name}
                type2={
                  pokemon.types.length > 1 ? pokemon.types[1].type.name : null
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
