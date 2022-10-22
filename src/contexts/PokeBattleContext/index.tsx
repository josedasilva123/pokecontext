import { createContext, useReducer, useState } from "react";
import { iContextDefaultProps } from "../types";
import { PokemonBattleReducer, playerInitialState, enemyInitialState } from "./reducers";

export const PokeBattleContext = createContext({});

export const PokeBattleProvider = ({children}: iContextDefaultProps) => {
    const [battle, setBattle] = useState(false);
    const [battleChat, setBattleChat] = useState([]);
    const [player, dispatchPlayer] = useReducer(PokemonBattleReducer, playerInitialState);
    const [enemy, dispatchEnemy] = useReducer(PokemonBattleReducer, enemyInitialState);

    return(
        <PokeBattleContext.Provider value={{}}>
            {children}
        </PokeBattleContext.Provider>
    )
}