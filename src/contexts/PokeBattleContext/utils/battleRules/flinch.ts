import { iPokemonMove } from "../../types";

export function flinch(move: iPokemonMove) {    
    const dice = Math.random() * 100;
    if (move.chance === "flinch" && Math.round(dice) <= 20) {
      return true;
    } else {
      return false;
    }
  }