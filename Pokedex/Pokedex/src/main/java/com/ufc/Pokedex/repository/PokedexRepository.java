package com.ufc.Pokedex.repository;

import com.ufc.Pokedex.model.Pokedex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokedexRepository extends JpaRepository<Pokedex, Long> {

}
