import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PokeListContext } from './contexts/PokeListContext';
import { pokemonBattleActions } from './contexts/PokeBattleContext/reducers';

function App() {
  const [loading, setLoading] = useState(false);
  const { pokeList, currentPokemon, getCurrentPokemon } = useContext(PokeListContext);
  return (
    <div className="App">
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          {currentPokemon && (
            <div>
              <h2>{currentPokemon.name}</h2>
              <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
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
