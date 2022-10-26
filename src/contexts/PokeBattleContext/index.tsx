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
  iPokemonBattle,
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
  const [playerHP, setPlayerHP] = useState<number | null>(0);
  const [enemy, dispatchEnemy] = useReducer(
    PokemonBattleReducer,
    enemyInitialState
  );
  const [enemyHP, setEnemyHP] = useState<number | null>(0);

  const { pokeTeam } = useContext(PokeTeamContext);
  const { currentPokemon: enemyPokemon } = useContext(PokeListContext);

  useEffect(() => {
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
        }
      ]);
    };

  }, [playerHP, enemyHP]);

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
