package com.ufc.Pokedex.repository;

// import com.ufc.Pokedex.model.Pokedex;
import com.ufc.Pokedex.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

}
