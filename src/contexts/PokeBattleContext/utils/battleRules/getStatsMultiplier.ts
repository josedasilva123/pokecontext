import { iPokemonBattleStat } from "../../../types";
import { iStatsMultiplier } from "../../reducers/types";

export function getStatsMultiplier(statsIndex: number, statsMultiplier: iStatsMultiplier) {
    switch (statsIndex) {
       case 1:
          return statsMultiplier.attack;
       case 2:
          return statsMultiplier.defense;
       case 3:
          return statsMultiplier.specialAttack;
       case 4:
          return statsMultiplier.specialDefense;
       case 5:
          return statsMultiplier.speed;
    }
 }

 export function getStatsWithMultiplier(stats: iPokemonBattleStat, statsIndex: number, statsMultiplier: iStatsMultiplier){
    const multiplier = getStatsMultiplier(statsIndex, statsMultiplier) as number;

    if(multiplier > 0){
        const statusBuff = stats.value * .5 * multiplier;
        return stats.value + statusBuff;
    } else if (multiplier < 0){
        const statsDebuff = 2 / ( multiplier + 2 )
        return stats.value * statsDebuff;
    } else {
        return stats.value;
    }    
 }