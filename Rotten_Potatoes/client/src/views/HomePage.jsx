import {useState, useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://www.omdbapi.com?apikey=b79df8f9";
const WATCHLIST_URL = "http://localhost:8000/api/rotten_potatoes/movie_watchlist/"
import notFound from '../assets/not_found.jpg';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../components/Button';

const HomePage = ({
  movies,
  setMovies,
  movieTitle,
  setMovieTitle
}) => {

  const [ watchlists, setWatchlists ] = useState([]);
  const [ watchlistId, setWatchlistId ] = useState("");
  const [ watchlistMovieTitle, setWatchlistMovieTitle ] = useState("");
  const [ watchlistMoviePoster, setWatchlistMoviePoster ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ addIsClicked, setAddIsClicked ] = useState(false);
 
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  const handleId = (e) => {
    console.log(e.target.value)
    setWatchlistId(e.target.value);
  };

  const handleAddMovie = ( title, poster) => {
    console.log("title", title, "poster", poster)
    setWatchlistMovieTitle(title);
    setWatchlistMoviePoster(poster);
    setAddIsClicked(!addIsClicked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${WATCHLIST_URL}v2/${watchlistId}`)
      .then(res => {
        console.log(res, 'MOVIE RES');
        console.log(res.data.movieWatchlist.movies, "MOVIES");
        const currentMovies = res.data.movieWatchlist.movies;
        axios.put(`${WATCHLIST_URL}${watchlistId}`,{
          movies:[...currentMovies, {movie:{title: watchlistMovieTitle, poster: watchlistMoviePoster}}]
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
          setWatchlistId("");
          setWatchlistMovieTitle("");
          setWatchlistMoviePoster("");
      })
      .catch(err => console.log(err))

  }; 

  useEffect(() => {

    axios.get(`${API_URL}&s=${movieTitle}`)
      .then(res => {console.log(res, "movie api"), setMovies(res.data.Search)})
      .catch(err => console.log(err));

      axios.get(
        "http://localhost:8000/api/rotten_potatoes/current_user", 
        {headers:
            {'Authorization': `Bearer ${accessToken}`}
        },
        {withCredentials: true}
    )
        .then((res) => {
            console.log(res, "user data");
            setIsLoading(false);
        })
        .catch(err => console.log(err));

        axios.get(`http://localhost:8000/api/rotten_potatoes/movie_watchlist/${userId}`)
          .then((res) => {
            console.log(res.data.movieWatchlist, "reference get request");
            setWatchlists(res.data.movieWatchlist);
        })
          .catch((err) => console.log(err));

  }, [movieTitle]);

  return (
    <div>
      {isLoading ?
      <div>
        <h1>Loading...</h1>
      </div> :
    <div>
    {movies ? <div>
      <h1 className="text-start ml-12  border-l-8 border-red-500 p-3 text-2xl font-bold">Featured Movies</h1>
      <div className="grid grid-cols-5 m-5">{movies.map((movie, index) => {
        return (
          <div key={index} className="m-2">
            { movie.Poster === "N/A" ?
            <div>
                <img src={notFound} alt="movie poster, not found" className="h-[400px] w-[270px] cursor-pointer rounded"/>
                <AiOutlinePlus size="30px" className="absolute right-[50px] top-2 bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90" onClick={() => {handleAddMovie(movie.Title, movie.Poster)}}/>
            </div>
              :
              <div className='relative'>
                <div className="flex">
                  {addIsClicked && movie.Title === watchlistMovieTitle && 
                  <form onSubmit={handleSubmit} className="absolute border border-black bg-white p-1 flex gap-1 rounded items-center top-[-44px] left-[44px] w-[270px] z-10">
                      <label htmlFor="watchlist" className="p-0">Watchlist:</label>
                      <select id="watchlist" onChange={handleId} className="border border-red-500 rounded">
                        <option>--</option>
                      {watchlists.map((list, index) => {
                        return(
                          <option key={index} value={list._id}>{list.title}</option>
                          )
                      })}
                      </select>
                      <Button buttonText="Add"/>
                  </form>}
                </div>
                <AiOutlinePlus size="30px" className="absolute right-[50px] top-[10px] bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90 " onClick={() => {handleAddMovie(movie.Title, movie.Poster)}}/>
                <img src={movie.Poster} alt="movie poster" className="h-[400px] w-[270px] cursor-pointer hover:shadow-3xl rounded hover:grayscale"/>
              </div>
            }
          </div>
          )
        })}</div> 
    </div> 
    :
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">0 results</h1>
        <img src={notFound} alt="" />
      </div>
    }
    </div>}

    </div>
    
    )
}

export default HomePage