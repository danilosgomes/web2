import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

const PokemonMinCard = ({ name, img }) => {
  return (
    <div className="col mb-3">
      {" "}
      {/* Adiciona a coluna responsiva */}
      <div className="card" style={{ width: "100px" }}>
        {" "}
        {/* Largura em 100% para preencher a coluna */}
        <img src={img} className="card-img-top" alt={"Logo pokemon"} />
        <div className="card-body text-center" style={{ padding: "0px" }}>
          <p
            className="card-title"
            style={{
              fontWeight: "400",
              textTransform: "capitalize",
              fontSize: "12px",
              margin: "0", // Remove margem padrão
            }}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonMinCard;
