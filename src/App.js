import React, { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {
  const [pairs,setPairs] = useState([])
  const [isOn,setIsOn] = useState(false)
  const [knit, setKnit] = useState('')
  let k = useRef()

  useEffect(() => {
    if (isOn) {
      window.setInterval(() => {
        setKnit('')
      },1000)
      // every 3 secods  shows to do a "random" knit
      const intervId2 = window.setInterval(() => {
        let date = new Date().toJSON().replaceAll(/[TZ]/g, ' ').trim()
        k.current = lazyRandomKnit()
        setPairs(pairs => pairs.concat({ t: date, knit: k.current}))
        setKnit(k.current)
      }, 3000)
      return () => window.clearInterval(intervId2)
    }
    return undefined
  }, [isOn])

  //"randomly" selects which type of knit will be asked to knit
  const lazyRandomKnit = () => {
    const x = Math.random()
    if(x >0.5) {
      return 'o' // oikea neule
    } else {
      return 'v' // nurja neule
    }
  }

  const buttonStart = () => <button id='btn' onClick={() => { setIsOn(true) }}>Start</button>
  const buttonStop = () => <button id='btn' onClick={() => { setIsOn(false) }}>Stop</button>

  return (
    <div className="App">
      <h1>Neulonta Labeling</h1>
      <div>
        {isOn
          ? buttonStop()
          : buttonStart()
        }
      </div>
      {!isOn && pairs.length !== 0
        ? <div className='App-knit'>Finished knitting!</div>
        : <div className='App-knit'>knit: {knit}</div>
      }
      <div>
       <h3>Knit-time pairs</h3>
        {isOn
          ? ''
          : (<div>
              {pairs.map((val,i) =>
                <div key={i}>{val.t}  {val.knit}</div>)}
            </div>)
        }
      </div>
    </div>
  );
}

export default App;