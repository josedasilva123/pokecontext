import { Reducer } from "react";
import { pokemonBattleActions } from "./actions";
import { iPokemonBattle, iPokemonBattleAction } from "./types";

export const playerInitialState = {
    damage: false,
    pokemon: {
        type: "player",
        name: null,
        types: null,
        stats: null,
        moves: null,
    }
}

export const enemyInitialState = {
    damage: false,
    pokemon: {
        type: "enemy",
        name: null,
        types: null,
        stats: null,
        moves: null,
    }
} 


export const PokemonBattleReducer: Reducer<iPokemonBattle, iPokemonBattleAction> = (state, action) => {
    switch(action.type){
        case pokemonBattleActions.setState:
            return action.payload;
        case pokemonBattleActions.setPokemon:
            return { ...state, pokemon: action.payload}     
        case pokemonBattleActions.setHP:
            return { ...state, hp: action.payload };
        case pokemonBattleActions.setInDamage:
            return { ...state, damage: action.payload }      
        default:
            return state;    
    } 
}
