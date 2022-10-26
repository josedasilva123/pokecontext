import { pokemonMoves } from "../../../data/pokemonMoves";
import { iPokemon } from "../../types";
import { getBattleStats } from "./getBattleStats";

export const getPokemonBattleInfo = (pokemon: iPokemon) => {
    const newPokemonInfo = {
        stats: getBattleStats(pokemon.stats, 31, 50),
        moves: pokemonMoves.find((pokemonInfo) => pokemonInfo.name === pokemon.name)
          ?.mainMoves as string[],
      };
      newPokemonInfo.moves.length = 4;

      return newPokemonInfo;
}