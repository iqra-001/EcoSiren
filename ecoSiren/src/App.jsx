import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class=" flex justify-center ">
      <div class="  content-center border-2 rounded-3xl bg-green-200 backdrop-blur-lg w-fit p-2.5">
         <h1 class="text-4xl text-green-700 ">ECO SIREN</h1>

    </div>
    </div>
    
    </>
  )
}

export default App
