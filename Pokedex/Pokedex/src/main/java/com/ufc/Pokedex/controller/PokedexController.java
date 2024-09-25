package com.ufc.Pokedex.controller;

import com.ufc.Pokedex.repository.PokedexRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufc.Pokedex.model.Pokedex;
import com.ufc.Pokedex.model.Pokemon;
import com.ufc.Pokedex.service.PokedexService;
import com.ufc.Pokedex.service.PokeApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/pokedex")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PokedexController {
    @Autowired
    private PokedexService pokedexService;

    @Autowired
    private PokeApiService pokeApiService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PokedexRepository pokedexRepository;

    @GetMapping
    public List<Pokedex> getAllPokedex() {
        return pokedexService.getAllPokedex();
    }

    @GetMapping("/{id}")
    public Pokedex getPokedexById(@PathVariable Long id) {
        return pokedexService.getPokedexById(id);
    }

    @GetMapping("/{pokedexId}/pokemon")
    public List<Pokemon> getPokemonByPokedexId(@PathVariable Long pokedexId) {
        return pokedexService.getPokemonByPokedexId(pokedexId);
    }

    @GetMapping("/{pokedexId}/pokemon/sorted")
    public List<Pokemon> getPokemonByPokedexIdSortedByName(@PathVariable Long pokedexId) {
        return pokedexService.getPokemonByPokedexIdSortedByName(pokedexId);
    }

    @GetMapping("/{pokedexId}/pokemon/name/{name}")
    public List<Pokemon> getPokemonByPokedexIdAndName(@PathVariable Long pokedexId, @PathVariable String name) {
        return pokedexService.getPokemonByPokedexIdAndName(pokedexId, name);
    }

    @PostMapping
    public Pokedex createPokedex(@RequestBody Pokedex pokedex) {
        return pokedexService.createPokedex(pokedex);
    }

    @PutMapping("/{id}/name")
    public Pokedex updatePokedexName(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newName = request.get("name");
        return pokedexService.updatePokedexName(id, newName);
    }

    @DeleteMapping("/{id}")
    public void deletePokedex(@PathVariable Long id) {
        pokedexService.deletePokedex(id);
    }

    @GetMapping("/pokemon/{name}")
    public String getPokemon(@PathVariable String name) {
        return pokeApiService.getPokemon(name);
    }

    @PostMapping("/{pokedexId}/pokemon/{name}")
    public Pokedex addPokemonToPokedex(@PathVariable Long pokedexId, @PathVariable String name) {
        String pokemonJson = pokeApiService.getPokemon(name);
        if (pokemonJson.equals("Pokemon not found")) {
            throw new RuntimeException("Pokemon not found");
        }
        try {
            Pokemon pokemon = objectMapper.readValue(pokemonJson, Pokemon.class);
            return pokedexService.addPokemonToPokedex(pokedexId, pokemon);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing Pokemon JSON", e);
        }
    }
    
}