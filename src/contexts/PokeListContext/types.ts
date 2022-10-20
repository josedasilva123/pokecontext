import { Dispatch, SetStateAction } from "react";
import { iPokemon } from "../types";

export interface iPokemonResult{
    name: string;
}

export interface iPokeListContext{
    pokeListLoading: boolean;
    pokeList: iPokemonResult[];
    currentPokemon: iPokemon | null;
    getCurrentPokemon: (
        pokemonName: string,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => void;
}