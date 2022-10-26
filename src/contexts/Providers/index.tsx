import React from 'react'
import { PokeBattleProvider } from '../PokeBattleContext'
import { PokeListProvider } from '../PokeListContext'
import { PokeTeamProvider } from '../PokeTeamContext'
import { iContextDefaultProps } from '../types'

const Providers = ({children}: iContextDefaultProps) => {
  return (
    <PokeListProvider>
        <PokeTeamProvider>
            <PokeBattleProvider>
                {children}
            </PokeBattleProvider>
        </PokeTeamProvider>
    </PokeListProvider>    
  )
}

export default Providers