package com.ufc.Pokedex.service;

import com.ufc.Pokedex.model.Pokedex;
import com.ufc.Pokedex.model.Pokemon;
import com.ufc.Pokedex.repository.PokedexRepository;
import com.ufc.Pokedex.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Pokedex createPokedex(Pokedex pokedex) {
        return pokedexRepository.save(pokedex);
    }

    public Pokedex updatePokedex(Long id, Pokedex pokedexDetails) {
        Pokedex pokedex = pokedexRepository.findById(id).orElseThrow();

        // Atualizar o nome da Pokedex
        pokedex.setName(pokedexDetails.getName());

        // Obter IDs dos novos Pokemons
        List<Long> newPokemonIds = pokedexDetails.getPokemons().stream()
                .map(Pokemon::getId)
                .collect(Collectors.toList());

        // Remover Pokemons que não estão na nova lista
        pokedex.getPokemons().removeIf(pokemon -> !newPokemonIds.contains(pokemon.getId()));

        // Adicionar novos Pokemons
        for (Pokemon newPokemon : pokedexDetails.getPokemons()) {
            if (!pokedex.getPokemons().contains(newPokemon)) {
                newPokemon.setPokedex(pokedex);
                pokedex.getPokemons().add(newPokemon);
            }
        }

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
}