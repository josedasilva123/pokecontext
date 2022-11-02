import { Dispatch, SetStateAction } from "react";
import { iPokemonBattle } from "./reducers/types";

export interface iBattleMessage {
  text: string;
  callback?: () => void;
}

export interface iPokeBattleContext {
  player: iPokemonBattle;
  enemy: iPokemonBattle;
  playerHP: number | null;
  enemyHP: number | null;
  battle: boolean;
  setBattle: Dispatch<SetStateAction<boolean>>;
  battleRun: () => void;
  battleChat: iBattleMessage[];
}