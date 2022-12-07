import {useState, useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://www.omdbapi.com?apikey=b79df8f9";
const USER_URL = "http://localhost:8000/api/rotten_potatoes/user/"
import notFound from '../assets/not_found.jpg';
import { AiOutlinePlus } from 'react-icons/ai';

const HomePage = ({
  movies,
  setMovies,
  movieTitle,
  setMovieTitle
}) => {

  const [ watchlist, setWatchlist ] = useState([]);

  const userId = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('accessToken');

  const handleAddMovie = (index, movie) => {
    axios.put(`${USER_URL}${userId}`,{
      watchlists,[index]:{
        movies: movie
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }; 

  useEffect(() => {

    axios.get(`${API_URL}&s=${movieTitle}`)
      .then(res => {console.log(res), setMovies(res.data.Search)})
      .catch(err => console.log(err));

      axios.get(
        "http://localhost:8000/api/rotten_potatoes/current_user", 
        {headers:
            {'Authorization': `Bearer ${accessToken}`}
        },
        {withCredentials: true}
    )
        .then((res) => {
            console.log(res);
            setWatchlist(res.data.user.watchlists);
            console.log(watchlist, "watchlist")
        })
        .catch(err => console.log(err))

  }, [movieTitle]);

  return (
    <div className="grid grid-cols-5 m-4">{movies.map((movie, index) => {
      return (
        <div key={index} className="m-2">
          { movie.Poster === "N/A" ?
          <div>
              <img src={notFound} alt="movie poster, not found" className="h-[400px] w-[270px] cursor-pointer hover:scale-105 rounded" onClick=""/>
              <AiOutlinePlus size="30px" className="absolute right-[50px] top-2 bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90" onClick={() => {handleAddMovie()}}/>
          </div>
            :
            <div className='relative'>
              <AiOutlinePlus size="30px" className="absolute right-[50px] top-2 bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90" onClick={() => {handleAddMovie()}}/>
              <img src={movie.Poster} alt="movie poster" className="h-[400px] w-[270px] cursor-pointer hover:scale-105 rounded" onClick=""/>
            </div>
          }
        </div>
      )
    })}</div>
  )
}

export default HomePage