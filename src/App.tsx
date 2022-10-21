import {useState} from 'react'
import classes from './App.module.css'

export function App() {
  const [side, setSide] = useState<'front' | 'back'>('front')
  return (
    <div
      className={classes.widget}
      onClick={() => {
        setSide(side == 'front' ? 'back' : 'front')
      }}
    >
      {side == 'front' ? <Front /> : <Back />}
    </div>
  )
}

function Front() {
  return <div style={{backgroundColor: 'white'}}>front</div>
}

function Back() {
  return <div style={{backgroundColor: 'white'}}>back</div>
}
