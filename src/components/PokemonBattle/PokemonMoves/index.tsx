import { useContextSelector } from "use-context-selector";
import { PokeBattleContext } from "../../../contexts/PokeBattleContext";
import PokemonMove from "./PokemonMove";

const PokemonMoves = () => {
   const player = useContextSelector(PokeBattleContext, (context) => context.player);
   const battleRun = useContextSelector(PokeBattleContext, (context) => context.battleRun);

   return (
      <div>
         <ul>
            {player.pokemon.moves?.map(move => (
                <PokemonMove key={move} move={move} />
            ))}
         </ul>
         <button onClick={() => battleRun()}>Fugir</button>
      </div>
   );
};

export default PokemonMoves;
