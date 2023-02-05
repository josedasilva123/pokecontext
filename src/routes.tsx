import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PokedexPage from './pages/PokedexPage'
import PokemonSinglePage from './pages/PokemonSinglePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonSinglePage />} />
    </Routes>  
  )
}

export default AppRoutes