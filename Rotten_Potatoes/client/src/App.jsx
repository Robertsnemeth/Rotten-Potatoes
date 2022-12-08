import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import UserPageWatchlist from './components/UserPageWatchlist';
import HomePage from './views/HomePage';
import UserPageAccount from './views/UserPageAccount';

function App() {

  const [ movies, setMovies ] = useState([]);
  const [ movieTitle, setMovieTitle ] = useState("Harry Potter")

  return (
    <div className="">
      <BrowserRouter>
        <NavBar  
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}/>
          <Routes>
            <Route element={<Navigate to="/rotten_potatoes/home_page"/>} path="/"/>
            <Route element={<HomePage
            movies={movies}
            setMovies={setMovies}
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}/>} 
            path="/rotten_potatoes/home_page"/>
            <Route element={<LoginForm/>} path="/rotten_potatoes/login"/>
            <Route element={<RegistrationForm/>} path="/rotten_potatoes/registration"/>
            <Route element={<UserPageWatchlist/>} path="/rotten_potatoes/user/watchlist"/>
            <Route element={<UserPageAccount/>} path="/rotten_potatoes/user/account"/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
