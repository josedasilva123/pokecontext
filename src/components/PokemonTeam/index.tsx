import React, { useState } from "react";
import { useContext } from "use-context-selector";
import { PokeTeamContext } from "../../contexts/PokeTeamContext";
import { useDropZone } from "../../hooks/useDropZone";
import PokemonTeamCard from "./PokemonTeamCard";

const PokemonTeam = () => {
  const { pokeTeam, draggingPokemon, setHoveringPokemon, pokeTeamDropAction } = useContext(PokeTeamContext);
  const { dropZoneEvents } = useDropZone({
    draggingElement: draggingPokemon,
    setHoveringElement: setHoveringPokemon,
    dropType: "pokeTeam",
    callback: () => pokeTeamDropAction(),
  })

  return (
    <>
    {pokeTeam.length > 0 ? (
      <ul {...dropZoneEvents}>
      {pokeTeam.map((pokemon, index) => (
        <PokemonTeamCard key={pokemon.name} pokemon={pokemon} index={index} />
      ))}
      </ul>
    ) : (
      <h1>Adicione um pokémon...</h1>
    )}      
    </>
  );
};

export default PokemonTeam;
