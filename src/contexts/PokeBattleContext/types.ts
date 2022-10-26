import { Dispatch, SetStateAction } from "react";
import { iPokemonBattle } from "./reducers";

export interface iPokeBattleContext {
  player: iPokemonBattle;
  enemy: iPokemonBattle;
  playerHP: number | null;
  enemyHP: number | null;
  setBattle: Dispatch<SetStateAction<boolean>>;
  battleRun: () => void;
}

export interface iBattleMessage {
  text: string;
  callback?: () => void;
}
