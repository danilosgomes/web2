package com.ufc.Pokedex.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufc.Pokedex.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class PokeApiService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String URL = "https://pokeapi.co/api/v2/pokemon/";

    public String getPokemon(String name) {
        String parse = URL + name.toLowerCase();
        try {
            Pokemon pokemon = restTemplate.getForObject(parse, Pokemon.class);
            return objectMapper.writeValueAsString(pokemon);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 404) {
                return "Pokemon not found";
            }
            throw e;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Pokemon to JSON", e);
        }
    }
}