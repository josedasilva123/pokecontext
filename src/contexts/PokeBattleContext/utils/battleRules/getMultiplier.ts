import { types } from "../../../../data/pokemonTypes";
import { iType } from "../../../types";

export function getMultiplier(moveType: string, pokemonTypes: iType[]) {
   let modifier = 0;

   pokemonTypes.forEach((type) => {
      const currentMoveType = types.find((t) => {
         return t.type === type.type.name;
      });

      if (currentMoveType?.halfDamage.includes(moveType)) {
         modifier = modifier - 1;
      } else if (currentMoveType?.doubleDamage.includes(moveType)) {
         modifier = modifier + 1;
      }
   });

   if (modifier > 0) {
      return { modifier: 2, message: "Foi super efetivo!" };
   } else if (modifier < 0) {
      return { modifier: 0.5, message: "Não é muito efeitivo!" };
   } else {
      return { modifier: 1 };
   }
}
