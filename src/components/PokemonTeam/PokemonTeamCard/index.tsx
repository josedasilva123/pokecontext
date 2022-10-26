import React, { useContext } from "react";
import { PokeTeamContext } from "../../../contexts/PokeTeamContext";
import { iPokemon } from "../../../contexts/types";
import { useDragElement } from "../../../hooks/useDragElement";

interface iPokemonTeamCardProps {
  pokemon: iPokemon;
  index: number;
}

const PokemonTeamCard = ({ pokemon, index }: iPokemonTeamCardProps) => {
  const {
    draggingPokemon,
    setDraggingPokemon,
    hoveringPokemon,
    setHoveringPokemon,
    removePokemonFromPokeTeam
  } = useContext(PokeTeamContext);


  const { hover, dragging, dragElementEvents } = useDragElement({
    currentElement: {
      dropType: "pokeTeam",
      index,
      ...pokemon,
    },
    dropType: "pokeTeam",
    draggingElement: draggingPokemon,
    setDraggingElement: setDraggingPokemon,
    hoveringElement: hoveringPokemon,
    setHoveringElement: setHoveringPokemon,
  });

  return (
    <li draggable={true} {...dragElementEvents}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />  
      <h1>{pokemon.name}</h1>
      <button onClick={() => removePokemonFromPokeTeam(pokemon)}>Remover</button>
    </li>
  );
};

export default PokemonTeamCard;
