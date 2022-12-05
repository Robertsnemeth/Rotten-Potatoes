import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <nav className="bg-red-500 text-white flex content-between p-10 mb-4 items-center">
        <h1 className="text-3xl">Rotten Potatoes</h1>
        <div>
          <label htmlFor="search">Search Movies: </label>
          <input id="search" className="border rounded text-black w-96 p-1" type="text" />
        </div>
        <button>Sign In</button>
    </nav>
  )
}

export default NavBar