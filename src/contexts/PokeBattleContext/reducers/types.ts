import { iPokemonBattleStat, iType } from "../../types";
import { pokemonBattleActions, statsMultiplierActions } from "./actions";

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

export interface iStatusMultiplierAction {
  type: statsMultiplierActions,
  payload: any,
}

export interface iStatsMultiplier {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

