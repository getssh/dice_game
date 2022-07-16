import React from 'react';
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import Dice from './Dice'
import Confetti from 'react-confetti'
import './App.css';


function App() {
  const [dice, setDice] = useState(resetDice())
  const [won, setWon] = useState(false)

  useEffect(() => {
    const checkAllSame = dice.every(die => die.value === dice[0].value)
    const checkAllHeld = dice.every(die => die.isHeld)

    if (checkAllHeld && checkAllSame) {
      setWon(true)
    }
    //check all values are equal
    //check all values are held
    //if the above conditions satisfied set won true
  }, [dice])
  function generateDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,

    }
  }

  function resetDice() {
    const die = []

    for (let i = 0; i < 10; i++) {
      die.push(generateDice())
    }

    return die
  }

  const diceElements = dice.map(die => <Dice
    value={die.value}
    isHeld={die.isHeld}
    handelDice={() => handelDice(die.id)}
  />)
  
  function handelDice(idNum) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === idNum ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function handelRoll() {
    if (!won) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    } else {
      setDice(resetDice())
      setWon(!won)
    }
  }

  return (
    <div className="dice">
      <div className='dice__discription'>
        <h2>Kids Dice Game</h2>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice__elements'>
        {won && <Confetti />}
        {diceElements}
      </div>
      <button onClick={handelRoll}>{won ? 'New Game' : 'Roll'}</button>
    </div>
  );
}

export default App;
