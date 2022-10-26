export const playerInitialState = {
    hp: null,
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
    hp: null,
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
    type: "player" | "enemy";
    name: null | string;
    types: null | any[],
    stats: null | any[],
    moves: null | any[],
}

interface iPokemonBattle{
    hp: number | null;
    damage: boolean;
    pokemon: iBattlingPokemon;
}

interface iPokemonBattleAction{
    type: pokemonBattleActions;
    payload: any;
}

export const PokemonBattleReducer = (state: iPokemonBattle, action: iPokemonBattleAction) => {
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
