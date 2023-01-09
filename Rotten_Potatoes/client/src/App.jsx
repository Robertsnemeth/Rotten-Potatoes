import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import UserPageWatchlist from './views/UserPageWatchlist';
import HomePage from './views/HomePage';
import UserPageAccount from './views/UserPageAccount';
import Footer from './components/Footer';
import randomWords from 'random-words';
import { UserContext } from './contexts/UserContext';

function App() {

  const [ movies, setMovies ] = useState([]);
  const [ movieTitle, setMovieTitle ] = useState(randomWords);
  const [ searched, setSearched ] = useState(false);
  const [ searchParam, setSearchParam ] = useState("");
  const [ dataChange, setDataChange ] = useState("");
  const [ user, setUser ] = useState({});

  return (
    <div className="relative h-full w-full font-bold bg-white">
      <UserContext.Provider value={{user, setUser}}>
        <NavBar  
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}
            setSearched={setSearched}
            setSearchParam={setSearchParam}
            dataChange={setDataChange}/>
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
            <Route element={<UserPageAccount 
              dataChange={dataChange}
              setDataChange={setDataChange}/>} 
              path="/rotten_potatoes/user/account"/>
          </Routes>
          <Footer/>
      </UserContext.Provider>
    </div>
  )
}

export default App
