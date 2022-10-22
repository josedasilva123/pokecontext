import { Dispatch, SetStateAction } from "react";
import { iPokemon } from "../types";

export interface iDraggingPokemon extends iPokemon {
  index: number;
}

export interface iPokeTeamContext {
  pokeTeam: iPokemon[];
  addPokemonToPokeTeam: () => void;
  removePokemonFromPokeTeam: (removingPokemon: iPokemon) => void;
  pokeTeamDropAction: () => void;
  draggingPokemon: iDraggingPokemon | null;
  setDraggingPokemon: Dispatch<SetStateAction<iDraggingPokemon | null>>;
  hoveringPokemon: iDraggingPokemon | null;
  setHoveringPokemon: Dispatch<SetStateAction<iDraggingPokemon | null>>;
}
