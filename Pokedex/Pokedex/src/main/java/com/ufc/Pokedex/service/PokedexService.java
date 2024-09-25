package com.ufc.Pokedex.service;

import com.ufc.Pokedex.model.Pokedex;
import com.ufc.Pokedex.model.Pokemon;
import com.ufc.Pokedex.repository.PokedexRepository;
import com.ufc.Pokedex.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PokedexService {

    @Autowired
    private PokedexRepository pokedexRepository;

    @Autowired
    private PokemonRepository pokemonRepository;

    public List<Pokedex> getAllPokedex() {
        return pokedexRepository.findAll();
    }

    public Pokedex getPokedexById(Long id) {
        return pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
    }

    public List<Pokemon> getPokemonByPokedexIdSortedByName(Long id) {
        Pokedex pokedex = pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
        return pokedex.getPokemons().stream()
                .sorted(Comparator.comparing(Pokemon::getName))
                .collect(Collectors.toList());
    }

    public List<Pokemon> getPokemonByPokedexIdAndName(Long id, String name) {
        Pokedex pokedex = pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
        return pokedex.getPokemons().stream()
                .filter(pokemon -> pokemon.getName().equalsIgnoreCase(name))
                .collect(Collectors.toList());
    }

    public Pokedex createPokedex(Pokedex pokedex) {
        return pokedexRepository.save(pokedex);
    }


    public Pokedex updatePokedexName(Long id, String newName) {
        Pokedex pokedex = pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
        pokedex.setName(newName);
        return pokedexRepository.save(pokedex);
    }

    public void deletePokedex(Long id) {
        pokedexRepository.deleteById(id);
    }

    public Pokedex addPokemonToPokedex(Long pokedexId, Pokemon pokemon) {
        Pokedex pokedex = pokedexRepository.findById(pokedexId)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
        pokemon.setPokedex(pokedex);
        pokemon = pokemonRepository.saveAndFlush(pokemon); // Save and flush the Pokemon to ensure it is managed
        pokedex.getPokemons().add(pokemon);
        return pokedexRepository.save(pokedex);
    }

    public List<Pokemon> getPokemonByPokedexId(Long id) {
        Pokedex pokedex = pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokedex not found"));
        return pokedex.getPokemons();
    }
}