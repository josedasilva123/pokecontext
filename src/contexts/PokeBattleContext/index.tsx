/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector"
import { PokeListContext } from "../PokeListContext";
import { PokeTeamContext } from "../PokeTeamContext";
import { iContextDefaultProps, iPokemon } from "../types";
import {
  PokemonBattleReducer,
  playerInitialState,
  enemyInitialState,
  pokemonBattleActions,
  iPokemonBattle,
} from "./reducers";
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

  const pokeTeam= useContextSelector(PokeTeamContext, state => state.pokeTeam);
  const enemyPokemon = useContextSelector(PokeListContext, state => state.currentPokemon);

  useEffect(() => {
    if (battle) {
      const playerPokemon = pokeTeam[0];
      const playerPokemonInfo = getPokemonBattleInfo(playerPokemon);
      const enemyPokemonInfo = getPokemonBattleInfo(enemyPokemon as iPokemon);

      dispatchPlayer({
        type: pokemonBattleActions.setPokemon,
        payload: {
          pokemon: {
            type: "player",
            name: playerPokemon.name,
            types: playerPokemon.types,
            stats: playerPokemonInfo.stats,
            moves: playerPokemonInfo.moves,
          },
        },
      });
      setPlayerHP(playerPokemonInfo.stats[0].value);

      dispatchEnemy({
        type: pokemonBattleActions.setPokemon,
        payload: {
          pokemon: {
            type: "enemy",
            name: enemyPokemon?.name,
            types: enemyPokemon?.types,
            stats: enemyPokemonInfo.stats,
            moves: enemyPokemonInfo.moves,
          },
        },
      });
      setEnemyHP(playerPokemonInfo.stats[0].value);
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
            setBattle(false);
            dispatchPlayer({
              type: pokemonBattleActions.setState,
              payload: playerInitialState,
            });
            dispatchEnemy({
              type: pokemonBattleActions.setState,
              payload: enemyInitialState,
            });
          },
        },
      ]);
    };
  }, [playerHP, enemyHP]);

  const battleRun = useCallback(() => {
    setBattleChat([
      {
        text: "Você fugiu em segurança...",
        callback: () => {
          setBattle(false);
          dispatchPlayer({
            type: pokemonBattleActions.setState,
            payload: playerInitialState,
          });
          dispatchEnemy({
            type: pokemonBattleActions.setState,
            payload: enemyInitialState,
          });
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
