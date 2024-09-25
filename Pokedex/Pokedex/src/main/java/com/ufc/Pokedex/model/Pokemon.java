package com.ufc.Pokedex.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pokemon {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String img;
    private int life;
    private int atk;
    private int shield;
    private int speed;
    private String type;
    private String type2;

    @ManyToOne
    @JoinColumn(name = "pokedex_id")
    @JsonIgnore
    private Pokedex pokedex;
}
