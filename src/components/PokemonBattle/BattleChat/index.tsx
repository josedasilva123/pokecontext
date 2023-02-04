import React from 'react'
import produce from 'immer'
import { useContextSelector } from 'use-context-selector'
import { PokeBattleContext } from '../../../contexts/PokeBattleContext'

const BattleChat = () => {
  const battleChat = useContextSelector(PokeBattleContext, context => context.battleChat);
  const setBattleChat = useContextSelector(PokeBattleContext, context => context.setBattleChat);
    
  const nextBattleChatMessage = () => {
    const newBattleChat = produce(battleChat, draft => {
        draft.shift();
    })

    setBattleChat(newBattleChat);

    if(battleChat[0]?.callback){
        battleChat[0]?.callback(); 
    }
  }  

  return (
    <div>
        <p>{battleChat[0]?.text}</p>
        <button onClick={() => nextBattleChatMessage()}>
            Avançar
        </button>
    </div>
  )
}

export default BattleChat