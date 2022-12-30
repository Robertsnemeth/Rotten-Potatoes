import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import UserPageWatchlist from './views/UserPageWatchlist';
import HomePage from './views/HomePage';
import UserPageAccount from './views/UserPageAccount';
import Footer from './components/Footer';

function App() {

  const [ movies, setMovies ] = useState([]);
  const [ movieTitle, setMovieTitle ] = useState("Harry Potter");
  const [ searched, setSearched ] = useState(false);
  const [ searchParam, setSearchParam ] = useState("");

  return (
    <div className="relative h-full w-full font-bold bg-white">
        <NavBar  
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}
            setSearched={setSearched}
            setSearchParam={setSearchParam}/>
          <Routes>
            <Route element={<Navigate to="/rotten_potatoes/home_page"/>} path="/"/>
            <Route element={<HomePage
              movies={movies}
              setMovies={setMovies}
              movieTitle={movieTitle}
              setMovieTitle={setMovieTitle}
              searched={searched}
              searchParam={searchParam}/>}
              path="/rotten_potatoes/home_page"/>
            <Route element={<LoginForm/>} path="/rotten_potatoes/login"/>
            <Route element={<RegistrationForm/>} path="/rotten_potatoes/registration"/>
            <Route element={<UserPageWatchlist/>} path="/rotten_potatoes/user/watchlist"/>
            <Route element={<UserPageAccount/>} path="/rotten_potatoes/user/account"/>
          </Routes>
          <Footer/>
    </div>
  )
}

export default App
