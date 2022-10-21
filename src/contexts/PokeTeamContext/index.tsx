import { createContext, useContext, useEffect, useState } from "react";
import { PokeListContext } from "../PokeListContext";
import { iContextDefaultProps, iPokemon } from "../types";

export const PokeTeamContext = createContext({});

export const PokeTeamProvider = ({ children }: iContextDefaultProps) => {
  const storagedPokeTeam = localStorage.getItem("@POKETEAM");
  const currentTeam = storagedPokeTeam
    ? (JSON.parse(storagedPokeTeam) as iPokemon[])
    : ([] as iPokemon[]);

  const [pokeTeam, setPokeTeam] = useState<iPokemon[]>(currentTeam);

  const { currentPokemon } = useContext(PokeListContext);

  useEffect(() => {
    localStorage.setItem('@POKETEAM', JSON.stringify(pokeTeam));
  }, [pokeTeam])

  const addPokemonToPokeTeam = () => {
    if(pokeTeam.length !== 6){
        if(!pokeTeam.some(pokemon => pokemon.name === currentPokemon?.name)){
            const newTeam = [...pokeTeam, currentPokemon] as iPokemon[];
            setPokeTeam(newTeam);
        } else {
            alert(`${currentPokemon?.name} já está no time`);
        }   
    } else {
        alert('Seu time está cheio.');
    }   
  }

  const removePokemonFromPokeTeam = (removingPokemon: iPokemon) => {
    const newTeam = pokeTeam.filter(pokemon => pokemon.name !== removingPokemon.name);
    setPokeTeam(newTeam);
  }

  const pokeTeamDropAction = (

    
  ) => {

  }

  return (
    <PokeTeamContext.Provider value={{ pokeTeam, addPokemonToPokeTeam, removePokemonFromPokeTeam }}>{children}</PokeTeamContext.Provider>
  );
};
