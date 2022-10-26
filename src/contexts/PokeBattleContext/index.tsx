/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { PokeListContext } from "../PokeListContext";
import { PokeTeamContext } from "../PokeTeamContext";
import { iContextDefaultProps, iPokemon } from "../types";
import {
  PokemonBattleReducer,
  playerInitialState,
  enemyInitialState,
  pokemonBattleActions,
} from "./reducers";
import { getPokemonBattleInfo } from "./utils/getPokemonBattleInfo";

export const PokeBattleContext = createContext({});

interface iBattleMessage {
  text: string;
  callback?: () => void;
}

export const PokeBattleProvider = ({ children }: iContextDefaultProps) => {
  const [battle, setBattle] = useState(false);
  const [battleChat, setBattleChat] = useState([] as iBattleMessage[]);
  const [player, dispatchPlayer] = useReducer(
    PokemonBattleReducer,
    playerInitialState
  );
  const [enemy, dispatchEnemy] = useReducer(
    PokemonBattleReducer,
    enemyInitialState
  );

  const { pokeTeam } = useContext(PokeTeamContext);
  const { currentPokemon: enemyPokemon } = useContext(PokeListContext);

  useEffect(() => {
    const playerPokemon = pokeTeam[0];
    const playerPokemonInfo = getPokemonBattleInfo(playerPokemon);
    const enemyPokemonInfo = getPokemonBattleInfo(enemyPokemon as iPokemon);

    dispatchPlayer({
      type: pokemonBattleActions.setState,
      payload: {
        hp: playerPokemonInfo.stats[0].value,
        damage: false,
        pokemon: {
          name: playerPokemon.name,
          types: playerPokemon.types,
          stats: playerPokemonInfo.stats,
          moves: playerPokemonInfo.moves,
        },
      },
    });

    dispatchEnemy({
      type: pokemonBattleActions.setState,
      payload: {
        hp: enemyPokemonInfo.stats[0].value,
        damage: false,
        pokemon: {
          name: enemyPokemon?.name,
          types: enemyPokemon?.types,
          stats: enemyPokemonInfo.stats,
          moves: enemyPokemonInfo.moves,
        },
      },
    });
  }, [battle]);

  const battleRun = () => {
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
  };

  return (
    <PokeBattleContext.Provider value={{}}>
      {children}
    </PokeBattleContext.Provider>
  );
};
