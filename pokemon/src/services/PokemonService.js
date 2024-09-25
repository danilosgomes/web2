import axios from "axios";

const url = "http://localhost:3000";

class PokemonService {
  getPokemon() {
    return axios.get(url + "/pokemons");
  }
}
export default PokemonService
