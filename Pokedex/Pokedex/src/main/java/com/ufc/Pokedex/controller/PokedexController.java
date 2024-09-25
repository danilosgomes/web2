package com.ufc.Pokedex.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufc.Pokedex.model.Pokedex;
import com.ufc.Pokedex.model.Pokemon;
import com.ufc.Pokedex.service.PokedexService;
import com.ufc.Pokedex.service.PokeApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public List<Pokedex> getAllPokedex() {
        return pokedexService.getAllPokedex();
    }

    @GetMapping("/{id}")
    public Pokedex getPokedexById(@PathVariable Long id) {
        return pokedexService.getPokedexById(id);
    }

    @PostMapping
    public Pokedex createPokedex(@RequestBody Pokedex pokedex) {
        return pokedexService.createPokedex(pokedex);
    }

    @PutMapping("/{id}")
    public Pokedex updatePokedex(@PathVariable Long id, @RequestBody Pokedex pokedexDetails) {
        return pokedexService.updatePokedex(id, pokedexDetails);
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