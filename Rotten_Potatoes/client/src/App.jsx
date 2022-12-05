import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './views/HomePage';

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route element={<Navigate to="/rotten_potatoes/home_page"/>} path="/"/>
            <Route element={<HomePage/>} path="/rotten_potatoes/home_page"/>
            <Route element={<RegistrationForm/>} path="/rotten_potatoes/registration"/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
