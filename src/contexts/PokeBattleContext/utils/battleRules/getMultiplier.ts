import { types } from "../../../../data/pokemonTypes";
import { iType } from "../../../types";

export function getMultiplier(moveType: string, pokemonTypes: iType[]) {
  pokemonTypes.forEach((type) => {
    const currentMoveType = types.find((t) => {
      return t.type === type.type.name;
    });

    if (currentMoveType?.halfDamage.includes(moveType)) {
      return .5;
    } else if (currentMoveType?.doubleDamage.includes(moveType)) {
      return 2;
    } else {
      return 1;
    }
  });
}
