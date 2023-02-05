import React from "react";
import { useContext } from "use-context-selector";
import { PokeBattleContext } from "../../contexts/PokeBattleContext";
import BattleChat from "./BattleChat";
import PokemonMoves from "./PokemonMoves";

const PokemonBattle = () => {
   const { player, playerHP, enemy, enemyHP, battleChat } = useContext(PokeBattleContext) 

   return (
      <div>
         <div>
            <h1>{player.pokemon.name}</h1>
            <span>{playerHP}</span>
         </div>
         <div>
            <h1>{enemy.pokemon.name}</h1>
            <span>{enemyHP}</span>
         </div>
         {battleChat.length > 0 ? <BattleChat /> : <PokemonMoves />}
      </div>
   );
};

export default PokemonBattle;
