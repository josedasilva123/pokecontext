import { iBattlingPokemon, iPokemonBattle } from "./types";

export enum pokemonBattleActions {
    setState = 'pokemon/setState',
    setPokemon = 'pokemon/setPokemon',
    setHP = 'pokemon/setHP',
    setInDamage = 'pokemon/setInDamage',
} 

export const setState = (payload: iPokemonBattle) => ({ type: pokemonBattleActions.setState, payload });
export const setPokemon = (payload: iBattlingPokemon) => ({ type: pokemonBattleActions.setPokemon, payload });
export const setHP = (payload: number | null) => ({ type: pokemonBattleActions.setHP, payload });
export const setInDamage = (payload: boolean) => ({ type: pokemonBattleActions.setInDamage, payload });