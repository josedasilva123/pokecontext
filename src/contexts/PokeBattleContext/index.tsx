/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { PokeListContext } from "../PokeListContext";
import { PokeTeamContext } from "../PokeTeamContext";
import { iContextDefaultProps, iPokemon } from "../types";
import {
  PokemonBattleReducer,
  playerInitialState,
  enemyInitialState,
} from "./reducers";
import { setPokemon, setState } from "./reducers/actions";
import { iPokemonBattle } from "./reducers/types";
import { iPokeBattleContext, iBattleMessage } from "./types";
import { getPokemonBattleInfo } from "./utils/getPokemonBattleInfo";

export const PokeBattleContext = createContext({} as iPokeBattleContext);

export const PokeBattleProvider = ({ children }: iContextDefaultProps) => {
  const [battle, setBattle] = useState(false);

  const [battleChat, setBattleChat] = useState([] as iBattleMessage[]);
  const [player, dispatchPlayer] = useReducer(
    PokemonBattleReducer,
    playerInitialState
  );

  const [playerHP, setPlayerHP] = useState<number | null>(0);
  const [enemy, dispatchEnemy] = useReducer(
    PokemonBattleReducer,
    enemyInitialState
  );
  const [enemyHP, setEnemyHP] = useState<number | null>(0);

  const pokeTeam = useContextSelector(
    PokeTeamContext,
    (state) => state.pokeTeam
  );
  const enemyPokemon = useContextSelector(
    PokeListContext,
    (state) => state.currentPokemon
  );

  useEffect(() => {
    if (battle) {
      const playerPokemon = pokeTeam[0];
      const playerPokemonInfo = getPokemonBattleInfo(playerPokemon);
      const enemyPokemonInfo = getPokemonBattleInfo(enemyPokemon as iPokemon);

      dispatchPlayer(
        setPokemon({
          type: "player",
          name: playerPokemon.name,
          types: playerPokemon.types,
          stats: playerPokemonInfo.stats,
          moves: playerPokemonInfo.moves,
        })
      );
      setPlayerHP(playerPokemonInfo.stats[0].value);

      dispatchEnemy(
        setPokemon({
          type: "enemy",
          name: enemyPokemon?.name as string,
          types: enemyPokemon?.types as any[],
          stats: enemyPokemonInfo.stats,
          moves: enemyPokemonInfo.moves,
        })
      );
      setEnemyHP(enemyPokemonInfo.stats[0].value);
    }
  }, [battle]);

  useEffect(() => {
    const battleDeclareWinner = (loser: iPokemonBattle, message: string) => {
      setBattleChat([
        ...battleChat,
        {
          text: `${loser.pokemon.name?.toUpperCase()} foi derrotado...`,
        },
        {
          text: message,
          callback: () => {
            resetBattle();
          },
        },
      ]);
    };
  }, [playerHP, enemyHP]);

  const resetBattle = useCallback(() => {
    setBattle(false);
    dispatchPlayer(setState(playerInitialState));
    dispatchEnemy(setState(enemyInitialState));
  }, []);

  const battleRun = useCallback(() => {
    setBattleChat([
      {
        text: "Você fugiu em segurança...",
        callback: () => {
          resetBattle();
        },
      },
    ]);
  }, []);

  return (
    <PokeBattleContext.Provider
      value={{ player, enemy, playerHP, enemyHP, battle, setBattle, battleRun }}
    >
      {children}
    </PokeBattleContext.Provider>
  );
};