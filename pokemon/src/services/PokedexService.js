import axios from "axios";

const url = "http://localhost:3000";

class PokedexService {
  getPokedex() {
    return axios.get(url + "/listaPokedex");
  }

  createPokedex(pokedex){
    return axios.post(url + '/adicionar' + pokedex);
  }

  updatePokedex(pokedex){
    return axios.put(url + '/atualizar' + pokedex);
  }

  deletePokedex(pokedexId){
    return axios.delete(url + '/deletar/' + pokedexId);
  }
}

export default PokedexService;
