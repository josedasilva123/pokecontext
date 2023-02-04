import { iPokemonBattleStat, iType } from "../../types";
import { pokemonBattleActions } from "./actions";

export interface iBattlingPokemon {
  type: string;
  name: null | string;
  types: null | iType[];
  stats: null | iPokemonBattleStat[];
  moves: null | string[];
}

export interface iPokemonBattle {
  damage: boolean;
  pokemon: iBattlingPokemon;
}

export interface iPokemonBattleAction {
  type: pokemonBattleActions;
  payload: any;
}
