import { iBattlingPokemon, iPokemonBattle, iStatsMultiplier } from "./types";

export enum pokemonBattleActions {
    setState = 'pokemon/setState',
    setPokemon = 'pokemon/setPokemon',
    setInDamage = 'pokemon/setInDamage',
} 

export const setState = (payload: iPokemonBattle) => ({ type: pokemonBattleActions.setState, payload });
export const setPokemon = (payload: iBattlingPokemon) => ({ type: pokemonBattleActions.setPokemon, payload });
export const setInDamage = (payload: boolean) => ({ type: pokemonBattleActions.setInDamage, payload });

export enum statsMultiplierActions{
    setStatsMultiplier = 'pokemon/setStatsMultiplier',
    setAttack = 'pokemon/setAttack',
    setDefense = 'pokemon/setDefense',
    setSpecialAttack = 'pokemon/setSpecialAttack',
    setSpecialDefense = 'pokemon/setSpecialDefense',
    setSpeed = 'pokemon/setSpeed',
}

export const setStatsMultiplier = (payload: iStatsMultiplier) => ({ type: statsMultiplierActions.setStatsMultiplier, payload });
export const setAttack = (payload: number) => ({ type: statsMultiplierActions.setAttack, payload });
export const setDefense = (payload: number) => ({ type: statsMultiplierActions.setDefense, payload });
export const setSpecialAttack = (payload: number) => ({ type: statsMultiplierActions.setSpecialAttack, payload });
export const setSpecialDefense = (payload: number) => ({ type: statsMultiplierActions.setSpecialDefense, payload });
export const setSpeed = (payload: number) => ({ type: statsMultiplierActions.setSpeed, payload });

