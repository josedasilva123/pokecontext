import { Dispatch, SetStateAction } from "react";
import { iBattlingPokemon, iPokemonBattle, iPokemonBattleAction, iStatsMultiplier, iStatusMultiplierAction } from "./reducers/types";

export interface iBattleMessage {
   text: string;
   callback?: () => void;
   owner?: string;
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
   setBattleChat: Dispatch<SetStateAction<iBattleMessage[]>>;
   isStarting: boolean;
   tryBattleMove: (move: iPokemonMove) => void;
}

export interface iPokemonMove {
   name: string;
   type: string;
   power: number;
   hits?: number;
   accuracy: number;
   category: string;
   pp: number;
   chance?: string;
   effect?: string;
   stat?: "attack" | "defense" | "special-attack" | "special-defense" | "speed";
}

export interface iDoPokemonMoveParams {
   move: iPokemonMove;
   userPokemon: iBattlingPokemon;
   targetPokemon: iBattlingPokemon;
   userType: "player" | "enemy";
   nextMove?: iPokemonMove;
}

export interface iBattlingPokemonInfoAndControls {
   pokemon: iBattlingPokemon;
   hp: number | null;
   setHP: Dispatch<SetStateAction<number | null>>;
   statsMultiplier: iStatsMultiplier,
   dispatchStatsMultiplier: React.Dispatch<iStatusMultiplierAction>,
   dispatch: Dispatch<iPokemonBattleAction>;
   type: "player" | "enemy";
}

export interface iNext {
   userType: "player" | "enemy";
   move: iPokemonMove;
}




