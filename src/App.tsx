import { useState, useEffect } from 'react'
import './App.css'
import { IDie } from './interfaces/interfaces'
import Die from './components/Die'

function App() {
    const initialDie = [2, 3, 4, 6, 8, 10, 12, 20, 100];
    const [diceBowl, setDiceBowl] = useState<IDie[]>([])
    const [diceSet, setDiceSet] = useState<IDie[]>([])
    const [rolledDice, setRolledDice] = useState<IDie[]>([])
    const [sum, setSum] = useState(0)

    useEffect(() => {
        const initialSet: IDie[] = initialDie.map(die => {
            return {shape: die, value: die, id: `${die}`}
        })
        setDiceSet(initialSet)

    }, [])

    useEffect(() => {
        setSum(sumDice(rolledDice))
    }, [rolledDice])

    const generateRandomID = () => {
        const characters = '0123456789abcdef';
        let id = '';
        for (let i = 0; i < characters.length; i++) {
            id += characters[Math.floor(Math.random() * characters.length)]
        }
        return id;
    }

    const addDieToBowl = (die:IDie) => {
        const newDie = {...die, id: generateRandomID()}
        setDiceBowl([...diceBowl, newDie]);
    };
    // const createDie = (newDie: number) => setDiceSet([...diceSet, {shape: newDie, value: newDie, id: `${newDie}`}])
    const clearBowl = () => setDiceBowl([])
    const clearRolls = () => setRolledDice([])

    
    const removeDieFromBowl = (id: string) => {
        const newBowl = diceBowl.filter(die => die.id !== id)
        setDiceBowl([...newBowl])
    };

    const rollDice = (dice: IDie[]) => {
        const diceResult = dice.map(die => {
            return {...die, value: Math.ceil(Math.random() * die.value)}
        })
        return [...diceResult]
    }

    const sumDice = (dice: IDie[]) => {
        if(dice.length === 1) return dice[0].value
        const diceSum = dice.reduce((prev, curr) => prev + curr.value, 0);
        return diceSum
    }    

    return (
        <div className="App">
            <h1>Super Dice Roller</h1>
            <div className="dice_bowl dice_container">
                {diceBowl.map((die, index) => (
                    <Die die={die} placement="dice_bowl" callback={() => removeDieFromBowl(die.id)} key={index} />
                ))}
            </div>
            <div className="rolled_dice dice_container">
                {rolledDice.map((die, index) => (
                    <Die die={die} placement="rolled_dice" key={index}/>
                ))}
                <p className="dice_sum">{rolledDice.length > 0 &&  `= ${sum}`}</p>
            </div>
            <div className="buttons">
                <button onClick={() => setRolledDice(rollDice(diceBowl))} disabled={diceBowl.length === 0}>Roll Dice!</button>
                <button onClick={clearBowl}>Clear Bowl</button>
                <button onClick={clearRolls}>Clear Rolls</button>
            </div>
            

            <div className="dice_set dice_container">
                {diceSet.map((die, index) => (
                    <Die die={die} placement="dice_set" callback={() => addDieToBowl(die)} key={index}/>
                ))}
            </div>
            {/* <button onClick={createDie}>Create New Die</button> */}
        </div>
    )
}

export default App
