import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import pokemonImage from "../assets/Group141.png";
import { Link }from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="background-container">
      <Header />
      {/* ----- */}

      <div
        className="navbar navbar-expand-xxl-block content-bar d-flex align-items-center overflow-auto"
        style={{
          backgroundColor: "#B0B0B0",
          paddingTop: "120px",
          paddingLeft: "50px",
          marginLeft: "320px",
          marginRight: "320px",
          height: "93.4%",
        }}
      >
        <div className="testo">
          <h1
            style={{
              maxWidth: "420px",
              margin: "0",
              fontSize: "40px",
              fontWeight: 800,
              lineHeight: 1.4,
            }}
          >
            ENCONTRE TODOS OS SEUS POKÉMONS FAVORITOS
          </h1>
          <p
            className="Style-regular"
            style={{
              maxWidth: "420px",
              paddingTop: "80px",
              paddingBottom: "30px",
              margin: "0",
              fontSize: "20px",
              fontWeight: 400,
            }}
          >
            Selecione os pokémons para sua batalha em diferentes pokédex. Você
            pode conhecer os tipos de Pokémons, seus pontos fortes e suas
            habilidades.
          </p>
          <Link type="button" className="btn btn-primary" to="pokemons">
            Ver Pokémons
          </Link>
        </div>
        <div>
          <img
            src={pokemonImage}
            alt="PokemonHome"
            style={{ width: "700px" }}
          />
        </div>
        <div
          className="content-bar text-center"
          style={{ paddingRight: "50px", width: "100%" }}
        >
          <p
            className="Style-thin text-center"
            style={{
              paddingTop: "40px",
              fontSize: "10px",
            }}
          >
            @Projeto da cadeira de Desenvolvimento de Software para WEB - 2024.1
            <br />
            Feito para competidores. | UFC - Campus Quixadá
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;