import { Reducer } from "react";
import { pokemonBattleActions, statsMultiplierActions } from "./actions";
import { iPokemonBattle, iPokemonBattleAction, iStatsMultiplier, iStatusMultiplierAction } from "./types";

export const playerInitialState = {
   damage: false,
   pokemon: {
      type: "player",
      name: null,
      types: null,
      stats: null,
      moves: null,
   },
};

export const enemyInitialState = {
   damage: false,
   pokemon: {
      type: "enemy",
      name: null,
      types: null,
      stats: null,
      moves: null,
   },
};

export const statsMultiplierInitialState = {
   attack: 0,
   defense: 0,
   specialAttack: 0,
   specialDefense: 0,
   speed: 0,
};

export const PokemonBattleReducer: Reducer<iPokemonBattle, iPokemonBattleAction> = (state, action) => {
   switch (action.type) {
      case pokemonBattleActions.setState:
         return action.payload;
      case pokemonBattleActions.setPokemon:
         return { ...state, pokemon: action.payload };
      case pokemonBattleActions.setInDamage:
         return { ...state, damage: action.payload };
      default:
         return state;
   }
};

export const PokemonStatsMultiplier: Reducer<iStatsMultiplier, iStatusMultiplierAction> = (state, action) => {
   switch (action.type) {
      case statsMultiplierActions.setStatsMultiplier:
         return action.payload;
      case statsMultiplierActions.setAttack:
         return { ...state, attack: action.payload };
      case statsMultiplierActions.setDefense:
         return { ...state, defense: action.payload };
      case statsMultiplierActions.setSpecialAttack:
         return { ...state, specialAttack: action.payload };
      case statsMultiplierActions.setSpecialDefense:
         return { ...state, specialDefense: action.payload };
      case statsMultiplierActions.setSpeed:
         return { ...state, speed: action.payload };
      default:
         return state;
   }
};
