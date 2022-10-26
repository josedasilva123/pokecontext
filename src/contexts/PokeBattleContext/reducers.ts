import { Reducer } from "react";

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

export enum pokemonBattleActions {
    setState = 'pokemon/setState',
    setPokemon = 'pokemon/setPokemon',
    setHP = 'pokemon/setHP',
    setInDamage = 'pokemon/setInDamage',
} 

interface iBattlingPokemon{
    type: string;
    name: null | string;
    types: null | any[],
    stats: null | any[],
    moves: null | any[],
}

export interface iPokemonBattle{
    damage: boolean;
    pokemon: iBattlingPokemon;
}

interface iPokemonBattleAction{
    type: pokemonBattleActions;
    payload: any;
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
