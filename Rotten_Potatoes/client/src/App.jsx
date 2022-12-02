import { useState } from 'react'
import NavBar from './components/NavBar'
import HomePage from './views/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
        <h1>Hello world</h1>
        <NavBar/>
        <HomePage/>
    </div>
  )
}

export default App
