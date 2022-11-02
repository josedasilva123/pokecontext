/* eslint-disable react-hooks/exhaustive-deps */
import produce from "immer";
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { PokeListContext } from "../PokeListContext";
import { PokeTeamContext } from "../PokeTeamContext";
import {
  iContextDefaultProps,
  iPokemon,
  iPokemonBattleStat,
  iType,
} from "../types";
import {
  PokemonBattleReducer,
  playerInitialState,
  enemyInitialState,
} from "./reducers";
import { pokemonBattleActions, setInDamage, setPokemon, setState } from "./reducers/actions";
import { iPokemonBattle } from "./reducers/types";
import { iPokeBattleContext, iBattleMessage, iPokemonMove, iDoPokemonMoveParams, iBattlingPokemonInfoAndControls } from "./types";
import { calculateDamage } from "./utils/battleRules/calculateDamage";
import { flinch } from "./utils/battleRules/flinch";
import { isPhysicalOrSpecial } from "./utils/battleRules/isPhysicalOrSpecial";
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
          types: enemyPokemon?.types as iType[],
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
    if ((playerHP as number) <= 0) {
      battleDeclareWinner(player, "Você foi derrotado...");
    } else if ((enemyHP as number) <= 0) {
      battleDeclareWinner(enemy, "Parabéns você venceu!");
    }
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

  const getUserAndTarget = (userType: "player" | "enemy") => {
    let user = {} as iBattlingPokemonInfoAndControls;
    let target = {} as iBattlingPokemonInfoAndControls;

    switch(userType){
      case 'player':
        user = {
          pokemon: player.pokemon,
          hp: playerHP,
          setHP: setPlayerHP,
          dispatch: dispatchPlayer
        }

        target = {
          pokemon: enemy.pokemon,
          hp: enemyHP,
          setHP: setEnemyHP,
          dispatch: dispatchEnemy
        }
      break;

      case 'enemy':
        user = {
          pokemon: enemy.pokemon,
          hp: enemyHP,
          setHP: setEnemyHP,
          dispatch: dispatchEnemy
        }

        target = {
          pokemon: player.pokemon,
          hp: playerHP,
          setHP: setPlayerHP,
          dispatch: dispatchPlayer
        }
      break;  
    }

    return { user, target };
  } 

  const doPokemonMove = ({
    move,
    userPokemon,
    targetPokemon,
    userType,
    nextMove,
  }: iDoPokemonMoveParams) => {
    const { attack, defense } = isPhysicalOrSpecial(move.category);

    function doDamage(multiplier: number) {
      const newBattleChat = produce(battleChat, (draft) => {
        return draft;
      })

      const userStats = userPokemon.stats as iPokemonBattleStat[];
      const targetStats = targetPokemon.stats as iPokemonBattleStat[];

      const damage = calculateDamage(
        move.power,
        multiplier,
        userStats[attack].value,
        targetStats[attack].value
      );

      const { user, target } = getUserAndTarget(userType);

      const newHP = target.hp as number - damage;

      target.setHP(newHP);

      if (move.effect === "drain") {
        const newUserHP = Math.round(user.hp as number + damage / 2);
        
        if(newUserHP > userStats[0].value){
          user.setHP(userStats[0].value);
        } else {
          user.setHP(newUserHP);
        }
      }

      if(move.effect === "recoil") {
        const newUserHP = Math.round(user.hp as number - (damage/4));  

        if(newUserHP < 1){
          user.setHP(1);
        } else {
          user.setHP(newUserHP);
        }
      }

      if(newHP > 0){
        target.dispatch(setInDamage(true));
        setTimeout(() => {
          target.dispatch(setInDamage(false));
        }, 600);

        if(nextMove && target.hp as number > 0){
          if(flinch(move)) {
            newBattleChat.push({
              text: "O movimento ACOVARDOU o alvo",
            })
          } else {
            doNextMovePokemonMove(nextMove, userType);
          }
        }
      }
    }
  };

  const doNextMovePokemonMove = (move: iPokemonMove, lastUserType:  "player" | "enemy") => {
    switch(lastUserType){
      case "player":
        doPokemonMove({
          move,
          userPokemon: enemy.pokemon,
          targetPokemon: player.pokemon,
          userType: "enemy",
        })
      break;

      case "enemy":
        doPokemonMove({
          move,
          userPokemon: player.pokemon,
          targetPokemon: enemy.pokemon,
          userType: "player",
        })
      break;
    }
  }

  return (
    <PokeBattleContext.Provider
      value={{
        player,
        enemy,
        playerHP,
        enemyHP,
        battle,
        setBattle,
        battleChat,
        battleRun,
      }}
    >
      {children}
    </PokeBattleContext.Provider>
  );
};
