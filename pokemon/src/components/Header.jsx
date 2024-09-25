import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import { Link }from "react-router-dom";

const Header = () => {
    return (
        <nav
            className="navbar navbar-expand-xxl bg-body-tertiar"
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

    );
}

export default Header;