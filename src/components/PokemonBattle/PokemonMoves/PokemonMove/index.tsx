import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { PokeBattleContext } from "../../../../contexts/PokeBattleContext";
import { iPokemonMove } from "../../../../contexts/PokeBattleContext/types";
import { allMoves } from "../../../../data/pokemonMoves";

interface iPokemonMoveProps {
   move: string;
}

const PokemonMove = ({ move }: iPokemonMoveProps) => {
   const tryBattleMove = useContextSelector(PokeBattleContext, context => context.tryBattleMove);

   const moveData = allMoves.find((moveData) => moveData.name === move) as iPokemonMove;
   const [pp, setPp] = useState(moveData?.pp as number);

   const doBattleMove = () => {
      if (pp > 0) {
         tryBattleMove(moveData);
         setPp(pp - 1);
      } 
   };

   return (
      <li>
         <button onClick={() => doBattleMove()}>
            <h3>{moveData?.name}</h3>
            <span>{moveData?.type}</span>
            <span>
               {pp}/{moveData?.pp}
            </span>
         </button>
      </li>
   );
};

export default PokemonMove;
