import { pokemonBattleActions } from "./actions";

export interface iBattlingPokemon {
  type: string;
  name: null | string;
  types: null | any[];
  stats: null | any[];
  moves: null | any[];
}

export interface iPokemonBattle {
  damage: boolean;
  pokemon: iBattlingPokemon;
}

export interface iPokemonBattleAction {
  type: pokemonBattleActions;
  payload: any;
}
