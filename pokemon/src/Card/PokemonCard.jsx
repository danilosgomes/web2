import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import { useState, useEffect } from "react";

const PokemonCard = ({
  id,
  name,
  img,
  life,
  atk,
  shild,
  speed,
  type,
  type2,
  addToPokedex,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pokedexes, setPokedexes] = useState([]); // Estado para armazenar as Pokédexes
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchPokedexes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/pokedex");
        if (!response.ok) {
          throw new Error("Erro ao buscar Pokédexes");
        }
        const data = await response.json();
        setPokedexes(data); // Armazena as Pokédexes no estado
      } catch (err) {
        setError(err.message); // Armazena a mensagem de erro no estado
        console.error("Erro ao buscar Pokédexes:", err);
      }
    };

    fetchPokedexes();
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleAddToPokedex = () => {
    setDropdownVisible(!dropdownVisible); // Alterna a visibilidade do dropdown
  };

  const handleSelectPokedex = async (pokedex) => {
    try {
      const response = await fetch(`http://localhost:8080/api/pokedex/${pokedex.id}/pokemon/${name}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar Pokémon à Pokédex");
      }
      const addedPokedex = await response.json(); // Se necessário, você pode usar a resposta da API
      addToPokedex(addedPokedex); // Adiciona à Pokédex no estado do pai
      setDropdownVisible(false); // Fecha o dropdown após a seleção
    } catch (error) {
      console.error("Erro ao adicionar Pokémon à Pokédex:", error);
      setError(error.message); // Armazena a mensagem de erro no estado
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={img} className="card-img-top" alt="Descrição" />
        <div className="card-body container" style={{ paddingTop: "0px" }}>
          <div className="row">
            <div className="col">
              <p
                className="card-text text-start"
                style={{
                  fontWeight: "100",
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                #00{id}
              </p>
              <p
                className="card-title text-start"
                style={{
                  fontWeight: "900",
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}
              >
                {name}
              </p>
              <p
                className="card-text text-start"
                style={{
                  fontWeight: "200",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
              >
                {type}
              </p>
              <p
                className="card-text text-start"
                style={{
                  fontWeight: "200",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
              >
                {type2}
              </p>
            </div>
            <div className="col" style={{ paddingLeft: "0px" }}>
              <p className="card-text text-start">Vida: {life}</p>
              <p className="card-text text-start">Ataque: {atk}</p>
              <p className="card-text text-start">Defesa: {shild}</p>
              <p className="card-text text-start">Velocidade: {speed}</p>
              <div
                className="d-flex justify-content-end"
                style={{ marginTop: "20px" }}
              >
                <button
                  className="btn btn-primary"
                  onClick={handleAddToPokedex}
                >
                  +
                </button>
              </div>
              {dropdownVisible && (
                <div
                  className="dropdown-menu show"
                  style={{ position: "absolute", zIndex: "1000" }}
                >
                  {pokedexes.map((pokedex) => (
                    <button
                      key={pokedex.id}
                      className="dropdown-item"
                      onClick={() => handleSelectPokedex(pokedex)}
                    >
                      {pokedex.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
