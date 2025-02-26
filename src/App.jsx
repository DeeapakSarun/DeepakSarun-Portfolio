import { useState } from 'react'
import reactLogo from './assets/react.svg'
import deepakSvg from '/deepak.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='mainBlock'>
        <a href="https://vite.dev" target="_blank">
          <img src={deepakSvg} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Deepak Sarun</h1>
    </>
  )
}

export default App
