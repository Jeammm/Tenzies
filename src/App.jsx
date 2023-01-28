import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import reactLogo from './assets/react.svg'
import './App.css'


import Die from './Die'

function App() {

  
  const [dices, setDices] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [counting, setCounting] = useState(0)
  
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(
            {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
            }
          )
    }
    return newDice
  }

  useEffect(() => {
      if (checkWin()) {
        console.log("You Won!")
        setTenzies(true)
      }
  }, [dices])

  function checkWin() {
    let num = -1
    for (let i=0; i<10; i++) {
      if (num === -1) {
        num = dices[i].value
      } else if (num !== dices[i].value) {
          return false
      } else if (dices[i].isHeld === false) {
        return false
      }
    }
    return true;
  }

  function rollDice() {

    if (tenzies) {
      setTenzies(false)
      setDices(allNewDice)
      setCounting(0)
    } else {
      setCounting(counting+1)
      setDices(prevState => prevState.map( die => {
        return die.isHeld? die : {...die, value:Math.ceil(Math.random() * 6)}
      }))
    }
  }

  function holdDice(id) {
    setDices(prevState => prevState.map( die => {
      return die.id === id ? {...die, isHeld:!die.isHeld} : die
    }))
  }

  const diceElements = dices.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>
  ))


  return (
    <main>
      <div className="container">
        
        <h3 className="title">
          Tenzies
        </h3>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>

        <h2 className={tenzies? "counting game-won":"counting"}>
          {counting} Rolls
        </h2>

        <div className="die-area top-die">
          {diceElements.slice(0,5)}
        </div>
        <div className="die-area bottom-die">
          {diceElements.slice(5,10)}
        </div>

        <button className={tenzies? "roll-button won":"roll-button"} onClick={rollDice}>
          {tenzies? "New Game" : "ROLL"}
        </button>

      </div>
    </main>
  )
}

export default App
