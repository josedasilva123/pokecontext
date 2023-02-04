import { useState } from "react";
import { allMoves } from "../../../../data/pokemonMoves";

interface iPokemonMoveProps {
   move: string;
}

const PokemonMove = ({ move }: iPokemonMoveProps) => {
   const moveData = allMoves.find((moveData) => moveData.name === move);
   const [pp, setPp] = useState(moveData?.pp as number);

   const doBattleMove = () => {
      if (pp > 0) {
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
