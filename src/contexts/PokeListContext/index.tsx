
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { request } from "../../services/api";
import { iContextDefaultProps, iPokemon } from "../types";
import { iPokeListContext, iPokemonResult } from "./types";

export const PokeListContext = createContext({} as iPokeListContext);

export const PokeListProvider = ({children}: iContextDefaultProps) => {
    const [pokeListLoading, setPokeListLoading] = useState(false);
    const [pokeList, setPokeList] = useState([] as iPokemonResult[]);
    const [currentPokemon, setCurrentPokemon] = useState<iPokemon | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setPokeListLoading(true);
                const response = await request({
                    method: "get",
                    url: "pokemon?limit=151&offset=0",
                })   

                setPokeList(response.data.results);
            } catch (error) {
               console.log(error);
            } finally {
                setPokeListLoading(false);
            }          
        })();
    }, []);

    const getCurrentPokemon = async (pokemonName: string, setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await request({
                method: "get",
                url: `pokemon/${pokemonName}`,
            })
            setCurrentPokemon(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }    

    return (
        <PokeListContext.Provider value={{ pokeListLoading, pokeList, currentPokemon, getCurrentPokemon}}>
            {children}
        </PokeListContext.Provider>
    )
}