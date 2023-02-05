/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { allMoves, pokemonMoves } from "../../data/pokemonMoves";
import { PokeListContext } from "../PokeListContext";
import { PokeTeamContext } from "../PokeTeamContext";
import { iContextDefaultProps, iPokemon, iPokemonBattleStat, iType } from "../types";
import {
   PokemonBattleReducer,
   playerInitialState,
   enemyInitialState,
   statsMultiplierInitialState,
   PokemonStatsMultiplier,
} from "./reducers";
import {
   setAttack,
   setDefense,
   setInDamage,
   setPokemon,
   setSpecialAttack,
   setSpecialDefense,
   setSpeed,
   setState,
   setStatsMultiplier,
} from "./reducers/actions";
import { iPokemonBattle } from "./reducers/types";
import { iPokeBattleContext, iBattleMessage, iPokemonMove, iDoPokemonMoveParams, iBattlingPokemonInfoAndControls, iNext } from "./types";
import { calculateDamage } from "./utils/battleRules/calculateDamage";
import { flinch } from "./utils/battleRules/flinch";
import { getMultiplier } from "./utils/battleRules/getMultiplier";
import { getStatsWithMultiplier } from "./utils/battleRules/getStatsMultiplier";
import { isImune } from "./utils/battleRules/isImune";
import { isPhysicalOrSpecial } from "./utils/battleRules/isPhysicalOrSpecial";
import { getMoveText } from "./utils/getMoveText";
import { getPokemonBattleInfo } from "./utils/getPokemonBattleInfo";

export const PokeBattleContext = createContext({} as iPokeBattleContext);

export const PokeBattleProvider = ({ children }: iContextDefaultProps) => {
   const [battle, setBattle] = useState(false);
   const [isStarting, setIsStarting] = useState(false);

   const [battleChat, setBattleChat] = useState([] as iBattleMessage[]);

   const [player, dispatchPlayer] = useReducer(PokemonBattleReducer, playerInitialState);
   const [playerHP, setPlayerHP] = useState<number | null>(null);
   const [playerStatsMultiplier, dispatchPlayerStatsMultiplier] = useReducer(PokemonStatsMultiplier, statsMultiplierInitialState);

   const [enemy, dispatchEnemy] = useReducer(PokemonBattleReducer, enemyInitialState);
   const [enemyHP, setEnemyHP] = useState<number | null>(null);
   const [enemyStatsMultiplier, dispatchEnemyStatsMultiplier] = useReducer(PokemonStatsMultiplier, statsMultiplierInitialState);

   const [next, setNext] = useState<iNext | null>(null);

   const pokeTeam = useContextSelector(PokeTeamContext, (state) => state.pokeTeam);
   const enemyPokemon = useContextSelector(PokeListContext, (state) => state.currentPokemon);

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
      if (playerHP !== null && enemyHP !== null) {
         const battleDeclareWinner = (loser: iPokemonBattle, loserType: "player" | "enemy", message: string) => {
            const filteredBattleChat = battleChat.filter((message) => message.owner !== loserType);

            setBattleChat([
               ...filteredBattleChat,
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
            battleDeclareWinner(player, "player", "Você foi derrotado...");
         } else if ((enemyHP as number) <= 0) {
            battleDeclareWinner(enemy, "enemy", "Parabéns você venceu!");
         }
      }
   }, [playerHP, enemyHP]);

   useEffect(() => {
      if (next && (playerHP as number) > 0 && (enemyHP as number) > 0) {
         doNextPokemonMove(next.move, next.userType);
      }
   }, [next]);

   const resetBattle = useCallback(() => {
      setBattle(false);
      setPlayerHP(null);
      setEnemyHP(null);
      dispatchPlayer(setState(playerInitialState));
      dispatchPlayerStatsMultiplier(setStatsMultiplier(statsMultiplierInitialState));
      dispatchEnemy(setState(enemyInitialState));
      dispatchEnemyStatsMultiplier(setStatsMultiplier(statsMultiplierInitialState));
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
               statsMultiplier: playerStatsMultiplier,
               dispatchStatsMultiplier: dispatchPlayerStatsMultiplier,
               dispatch: dispatchPlayer,
               type: "player",
            };

            target = {
               pokemon: enemy.pokemon,
               hp: enemyHP,
               setHP: setEnemyHP,
               statsMultiplier: enemyStatsMultiplier,
               dispatchStatsMultiplier: dispatchEnemyStatsMultiplier,
               dispatch: dispatchEnemy,
               type: "enemy",
            };
            break;

         case "enemy":
            user = {
               pokemon: enemy.pokemon,
               hp: enemyHP,
               setHP: setEnemyHP,
               statsMultiplier: enemyStatsMultiplier,
               dispatchStatsMultiplier: dispatchEnemyStatsMultiplier,
               dispatch: dispatchEnemy,
               type: "enemy",
            };

            target = {
               pokemon: player.pokemon,
               hp: playerHP,
               setHP: setPlayerHP,
               statsMultiplier: playerStatsMultiplier,
               dispatchStatsMultiplier: dispatchPlayerStatsMultiplier,
               dispatch: dispatchPlayer,
               type: "player",
            };
            break;
      }

      return { user, target };
   };

   const doPokemonMove = ({ move, userPokemon, targetPokemon, userType, nextMove }: iDoPokemonMoveParams) => {
      let newBattleChat = [] as iBattleMessage[];

      const { user, target } = getUserAndTarget(userType);
      const { attack, defense } = isPhysicalOrSpecial(move.category);

      const userStats = userPokemon.stats as iPokemonBattleStat[];
      const targetStats = targetPokemon.stats as iPokemonBattleStat[];

      function doDamage(multiplier: number) {
         const userAttack = getStatsWithMultiplier(userStats[attack], attack, user.statsMultiplier);
         const targetDefense = getStatsWithMultiplier(targetStats[defense], defense, target.statsMultiplier);

         const damage = calculateDamage(move.power, multiplier, userAttack, targetDefense);

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

         return { targetNewHP: newHP };
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

      function addToNewBattleChat(text: string, callback?: () => void) {
         newBattleChat.push({
            text,
            callback,
            owner: user.type,
         });
      }

      function executeNextMove() {
         if (nextMove) {
            if (flinch(move)) {
               addToNewBattleChat("O movimento ACOVARDOU o alvo");
            } else {
               setNext({
                  move: nextMove,
                  userType,
               });
            }
         }
      }

      function executeDamageMove(multiplier: number, effectiveMessage?: string) {
         const dice = Math.random() * 100;

         const imune = isImune(move.type, target.pokemon.types as iType[]);

         if (imune) {
            addToNewBattleChat(getMoveText(user.pokemon, move));
            addToNewBattleChat("Ops! O alvo é imune a este movimento...", () => executeNextMove());
         } else if (Math.round(dice) < move.accuracy || !move.accuracy) {
            addToNewBattleChat(getMoveText(user.pokemon, move), () => {
               doDamage(multiplier);
               executeNextMove();
            });

            if (effectiveMessage) {
               addToNewBattleChat(effectiveMessage);
            }
         } else {
            addToNewBattleChat(getMoveText(user.pokemon, move));
            addToNewBattleChat(`${user.pokemon.name?.toUpperCase()} errou o movimento...`, () => executeNextMove());
         }
      }

      function executeHealMove() {
         addToNewBattleChat(getMoveText(user.pokemon, move), () => {
            doHeal();
            executeNextMove();
         });
      }

      function executeBuffMove() {
         function buffStat(multiplierValue: number, statName: string, callback: (newMultiplier: number) => void) {
            const newMultiplier = multiplierValue + move.power;
            if (newMultiplier <= 6 && multiplierValue !== 6) {
               addToNewBattleChat(getMoveText(user.pokemon, move), () => {
                  callback(newMultiplier);
               });
               addToNewBattleChat(`${statName.toUpperCase()} ${move.power === 2 ? "aumentou drasticamente!" : "aumentou."}`, () => {
                  executeNextMove();
               });
            } else {
               addToNewBattleChat(`${statName.toUpperCase()} já está no máximo.`, () => {
                  executeNextMove();
               });
            }
         }

         switch (move.stat) {
            case "attack":
               buffStat(user.statsMultiplier.attack, move.stat, (newMultiplier) => {
                  user.dispatchStatsMultiplier(setAttack(newMultiplier > 6 ? 6 : newMultiplier));
               });
               break;

            case "defense":
               buffStat(user.statsMultiplier.defense, move.stat, (newMultiplier) => {
                  user.dispatchStatsMultiplier(setDefense(newMultiplier > 6 ? 6 : newMultiplier));
               });
               break;

            case "special-attack":
               buffStat(user.statsMultiplier.specialAttack, move.stat, (newMultiplier) => {
                  user.dispatchStatsMultiplier(setSpecialAttack(newMultiplier > 6 ? 6 : newMultiplier));
               });

               break;
            case "special-defense":
               buffStat(user.statsMultiplier.specialDefense, move.stat, (newMultiplier) => {
                  user.dispatchStatsMultiplier(setSpecialDefense(newMultiplier > 6 ? 6 : newMultiplier));
               });
               break;

            case "speed":
               buffStat(user.statsMultiplier.speed, move.stat, (newMultiplier) => {
                  user.dispatchStatsMultiplier(setSpeed(newMultiplier > 6 ? 6 : newMultiplier));
               });
               break;
         }
      }

      switch (move.category) {
         case "heal":
            executeHealMove();
            break;

         case "buff":
            executeBuffMove();
            break;

         default:
            const effectiveness = getMultiplier(move.type, target.pokemon.types as iType[]);
            executeDamageMove(effectiveness.modifier, effectiveness.message);
            break;
      }

      setBattleChat([...battleChat, ...newBattleChat]);
   };

   const doNextPokemonMove = (move: iPokemonMove, lastUserType: "player" | "enemy") => {
      switch (lastUserType) {
         case "player":
            doPokemonMove({
               move,
               userPokemon: enemy.pokemon,
               targetPokemon: player.pokemon,
               userType: "enemy",
            });

            break;

         case "enemy":
            doPokemonMove({
               move,
               userPokemon: player.pokemon,
               targetPokemon: enemy.pokemon,
               userType: "player",
            });
            break;
      }
   };

   const tryBattleMove = (move: iPokemonMove) => {
      const dice = Math.round(Math.random()) * 3;

      const enemyMoves = pokemonMoves.find((pokemon) => pokemon.name === enemy.pokemon.name)?.mainMoves as string[];

      const enemyRandomMove = enemyMoves[dice];

      const enemyMove = allMoves.find((move) => move.name === enemyRandomMove) as iPokemonMove;

      const playerStats = player.pokemon.stats as iPokemonBattleStat[];
      const playerSpeed = getStatsWithMultiplier(playerStats[5], 5, playerStatsMultiplier);

      const enemyStats = enemy.pokemon.stats as iPokemonBattleStat[];
      const enemySpeed = getStatsWithMultiplier(enemyStats[5], 5, enemyStatsMultiplier);

      if (playerSpeed > enemySpeed) {
         doPokemonMove({
            move,
            userPokemon: player.pokemon,
            targetPokemon: enemy.pokemon,
            userType: "player",
            nextMove: enemyMove,
         });
      } else {
         doPokemonMove({
            move: enemyMove,
            userPokemon: enemy.pokemon,
            targetPokemon: player.pokemon,
            userType: "enemy",
            nextMove: move,
         });
      }
   };

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
            setBattleChat,
            battleRun,
            tryBattleMove,
         }}
      >
         {children}
      </PokeBattleContext.Provider>
   );
};
