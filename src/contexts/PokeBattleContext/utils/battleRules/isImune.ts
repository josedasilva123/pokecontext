import { types } from "../../../../data/pokemonTypes";
import { iType } from "../../../types";

export function isImune(moveType: string, pokemonTypes: iType[]) {
  const imuneTypes = pokemonTypes.filter((type) => {
    const currentMoveType = types.find((t) => {
      return t.type === type.type.name;
    });

    return currentMoveType?.imune.includes(moveType);
  });
  
  if (imuneTypes.length > 0) {
    return true;
  } else {
    return false;
  }
}
