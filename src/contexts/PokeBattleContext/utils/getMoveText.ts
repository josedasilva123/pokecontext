import { iBattlingPokemon } from "../reducers/types";
import { iPokemonMove } from "../types";

export function getMoveText(pokemon: iBattlingPokemon, move: iPokemonMove) {
  return `${pokemon.name?.toUpperCase()} utilizou ${move.name.toUpperCase()}`;
}
