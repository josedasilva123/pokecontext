import {
  useEffect,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector"
import { PokeListContext } from "../PokeListContext";
import { iContextDefaultProps, iPokemon } from "../types";
import produce from "immer";
import { iPokeTeamContext, iDraggingPokemon } from "./types";

export const PokeTeamContext = createContext({} as iPokeTeamContext);

export const PokeTeamProvider = ({ children }: iContextDefaultProps) => {
  const storagedPokeTeam = localStorage.getItem("@POKETEAM");
  const currentTeam = storagedPokeTeam
    ? (JSON.parse(storagedPokeTeam) as iPokemon[])
    : ([] as iPokemon[]);

  const [pokeTeam, setPokeTeam] = useState<iPokemon[]>(currentTeam);
  const [draggingPokemon, setDraggingPokemon] =
    useState<iDraggingPokemon | null>(null);
  const [hoveringPokemon, setHoveringPokemon] =
    useState<iDraggingPokemon | null>(null);

  const currentPokemon = useContextSelector(PokeListContext, state => state.currentPokemon);

  useEffect(() => {
    localStorage.setItem("@POKETEAM", JSON.stringify(pokeTeam));
  }, [pokeTeam]);

  const addPokemonToPokeTeam = () => {
    if (pokeTeam.length !== 6) {
      if (!pokeTeam.some((pokemon) => pokemon.name === currentPokemon?.name)) {
        const newTeam = [...pokeTeam, currentPokemon] as iPokemon[];
        setPokeTeam(newTeam);
      } else {
        alert(`${currentPokemon?.name} já está no time`);
      }
    } else {
      alert("Seu time está cheio.");
    }
  };

  const removePokemonFromPokeTeam = (removingPokemon: iPokemon) => {
    const newTeam = pokeTeam.filter(
      (pokemon) => pokemon.name !== removingPokemon.name
    );
    setPokeTeam(newTeam);
  };

  const pokeTeamDropAction = () => {
    const currentPokemon = { ...draggingPokemon } as iDraggingPokemon;

    const newTeam = produce(pokeTeam, (draft: iDraggingPokemon[]) => {
      if (draggingPokemon) {
        draft.splice(currentPokemon.index, 1);
        hoveringPokemon
          ? draft.splice(
              hoveringPokemon.index,
              0,
              pokeTeam[currentPokemon.index] as iDraggingPokemon
            )
          : draft.push(currentPokemon);
      }
    });

    setPokeTeam(newTeam);
  };

  return (
    <PokeTeamContext.Provider
      value={{
        pokeTeam,
        addPokemonToPokeTeam,
        removePokemonFromPokeTeam,
        pokeTeamDropAction,
        draggingPokemon,
        setDraggingPokemon,
        hoveringPokemon,
        setHoveringPokemon,
      }}
    >
      {children}
    </PokeTeamContext.Provider>
  );
};
