/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { allMoves, pokemonMoves } from "../../data/pokemonMoves";
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
import { setInDamage, setPokemon, setState } from "./reducers/actions";
import { iPokemonBattle } from "./reducers/types";
import {
  iPokeBattleContext,
  iBattleMessage,
  iPokemonMove,
  iDoPokemonMoveParams,
  iBattlingPokemonInfoAndControls,
  iNext,
} from "./types";
import { calculateDamage } from "./utils/battleRules/calculateDamage";
import { flinch } from "./utils/battleRules/flinch";
import { isPhysicalOrSpecial } from "./utils/battleRules/isPhysicalOrSpecial";
import { getMoveText } from "./utils/getMoveText";
import { getPokemonBattleInfo } from "./utils/getPokemonBattleInfo";

export const PokeBattleContext = createContext({} as iPokeBattleContext);

export const PokeBattleProvider = ({ children }: iContextDefaultProps) => {
  const [battle, setBattle] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

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
  const [next, setNext] = useState<iNext | null>(null);

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
      setIsStarting(true);
      setTimeout(() => {
        setIsStarting(false);
      }, 800);

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

  useEffect(() => {
    if(next){
      doNextPokemonMove(next.move, next.userType);
    }
  }, [next])

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

    switch (userType) {
      case "player":
        user = {
          pokemon: player.pokemon,
          hp: playerHP,
          setHP: setPlayerHP,
          dispatch: dispatchPlayer,
        };

        target = {
          pokemon: enemy.pokemon,
          hp: enemyHP,
          setHP: setEnemyHP,
          dispatch: dispatchEnemy,
        };
        break;

      case "enemy":
        user = {
          pokemon: enemy.pokemon,
          hp: enemyHP,
          setHP: setEnemyHP,
          dispatch: dispatchEnemy,
        };

        target = {
          pokemon: player.pokemon,
          hp: playerHP,
          setHP: setPlayerHP,
          dispatch: dispatchPlayer,
        };
        break;
    }

    return { user, target };
  };

  const doPokemonMove = ({
    move,
    userPokemon,
    targetPokemon,
    userType,
    nextMove,
  }: iDoPokemonMoveParams) => {
    let newBattleChat = [];

    const { user, target } = getUserAndTarget(userType);
    const { attack, defense } = isPhysicalOrSpecial(move.category);

    const userStats = userPokemon.stats as iPokemonBattleStat[];
    const targetStats = targetPokemon.stats as iPokemonBattleStat[];

    function doDamage(multiplier: number) {
      const damage = calculateDamage(
        move.power,
        multiplier,
        userStats[attack].value,
        targetStats[defense].value
      );

      const newHP = (target.hp as number) - damage;

      target.setHP(newHP);

      if (move.effect === "drain") {
        const newUserHP = Math.round((user.hp as number) + damage / 2);
        const maxHP = userStats[0].value;

        if (newUserHP > maxHP) {
          user.setHP(maxHP);
        } else {
          user.setHP(newUserHP);
        }
      }

      if (move.effect === "recoil") {
        const newUserHP = Math.round((user.hp as number) - damage / 4);

        if (newUserHP < 1) {
          user.setHP(1);
        } else {
          user.setHP(newUserHP);
        }
      }

      if (newHP > 0) {
        target.dispatch(setInDamage(true));
        setTimeout(() => {
          target.dispatch(setInDamage(false));
        }, 600);
      }
    }

    function doHeal() {
      const healedHP = (user.hp as number) + userStats[0].value * (move.power / 100);
      const maxHP = userStats[0].value;

      if (healedHP > maxHP) {
        user.setHP(maxHP);
      } else {
        user.setHP(healedHP);
      }
    }

    function executeDamageMove(multiplier: number, effectiveMessage?: string) {
      const dice = Math.random() * 100;

      if (Math.round(dice) < move.accuracy || !move.accuracy) {
        newBattleChat.push({
          text: getMoveText(user.pokemon, move),
          callback: () => {
            doDamage(multiplier);
          },
        });

        if (effectiveMessage) {
          newBattleChat.push({
            text: effectiveMessage,
          });
        }
      } else {
        newBattleChat.push({
          text: getMoveText(user.pokemon, move),
        });

        newBattleChat.push({
          text: `${user.pokemon.name?.toUpperCase()} errou o movimento...`,
        });
      }
    }

    if (nextMove) {
      if (flinch(move)) {
        newBattleChat.push({
          text: "O movimento ACOVARDOU o alvo",
        });
      } else {
        setNext({
          move: nextMove,
          userType, 
        })
      }
    }
  };

  const doNextPokemonMove = (
    move: iPokemonMove,
    lastUserType: "player" | "enemy"
  ) => {
    switch (lastUserType) {
      case "player":
        if ((playerHP as number) > 0) {
          doPokemonMove({
            move,
            userPokemon: enemy.pokemon,
            targetPokemon: player.pokemon,
            userType: "enemy",
          });
        }
        break;

      case "enemy":
        if ((enemyHP as number) > 0) {
          doPokemonMove({
            move,
            userPokemon: player.pokemon,
            targetPokemon: enemy.pokemon,
            userType: "player",
          });
          break;
        }
    }
  };

  const tryBattleMove = (move: iPokemonMove) => {
    const dice = Math.round(Math.random()) * 3;

    const enemyMoves = pokemonMoves.find(pokemon => pokemon.name === enemy.pokemon.name)?.mainMoves as string[];

    const enemyRandomMove = enemyMoves[dice];
    
    const enemyMove = allMoves.find(move => move.name === enemyRandomMove) as iPokemonMove;

    const playerStats = player.pokemon.stats as iPokemonBattleStat[];
    const playerSpeed = playerStats[5].value;

    const enemyStats = enemy.pokemon.stats as iPokemonBattleStat[];
    const enemySpeed = enemyStats[5].value;

    if(playerSpeed > enemySpeed){
      doPokemonMove(
        {
          move,
          userPokemon: player.pokemon,
          targetPokemon: enemy.pokemon,
          userType: "player",
          nextMove: enemyMove,
        }
      )
    } else {
      doPokemonMove(
        {
          move: enemyMove,
          userPokemon: enemy.pokemon,
          targetPokemon: player.pokemon,
          userType: "player",
          nextMove: move,
        }
      )  
    }
  }

  return (
    <PokeBattleContext.Provider
      value={{
        isStarting,
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
