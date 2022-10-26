import React, { useContext, useState } from 'react';
import './App.css';
import PokemonTeam from './components/PokemonTeam';
import { PokeListContext } from './contexts/PokeListContext';
import { PokeTeamContext } from './contexts/PokeTeamContext';

function App() {
  const [loading, setLoading] = useState(false);
  const { pokeList, currentPokemon, getCurrentPokemon } = useContext(PokeListContext);
  const { addPokemonToPokeTeam } = useContext(PokeTeamContext);
  return (
    <div className="App">
      <PokemonTeam />
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          {currentPokemon && (
            <div>
              <h2>{currentPokemon.name}</h2>
              <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
              <button onClick={addPokemonToPokeTeam}>Adicionar</button>
            </div>
          )}
        </>
      )}
      {pokeList.map(pokemon => (
        <li onClick={() => getCurrentPokemon(pokemon.name, setLoading)}>
          <h3>{pokemon.name}</h3>
        </li>
      ))}
    </div>
  );
}

export default App;
