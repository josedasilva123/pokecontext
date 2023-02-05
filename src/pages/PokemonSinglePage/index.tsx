/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "use-context-selector";
import { PokeBattleContext } from "../../contexts/PokeBattleContext";
import { PokeListContext } from "../../contexts/PokeListContext";
import { PokeTeamContext } from "../../contexts/PokeTeamContext";
import { galleryBaseURL } from "../../services/api";

const PokemonSinglePage = () => {
   const [loading, setLoading] = useState(false);
   const { currentPokemon, getCurrentPokemon } = useContext(PokeListContext);
   const { addPokemonToPokeTeam } = useContext(PokeTeamContext);
   const { setBattle } = useContext(PokeBattleContext);
   const { pokemonName } = useParams();

   useEffect(() => {
      getCurrentPokemon(pokemonName as string, setLoading)
   }, [])

   return (
      <div>
         <Link to="/">Voltar</Link>
         {currentPokemon && (
            <div>
               <h2>{currentPokemon.name}</h2>
               <img src={`${galleryBaseURL + currentPokemon.name}.jpg`} alt={currentPokemon.name} />
               <button onClick={addPokemonToPokeTeam}>Adicionar</button>
               <button onClick={() => setBattle(true)}>Desafiar</button>
            </div>
         )}
      </div>
   );
};

export default PokemonSinglePage;
