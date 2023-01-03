import {useState, useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://www.omdbapi.com?apikey=b79df8f9";
const WATCHLIST_URL = "http://localhost:8000/api/rotten_potatoes/movie_watchlist/";
const IMDB_URL = "https://www.imdb.com/title/";
import notFound from '../assets/not_found.jpg';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../components/Button';
import AllUsersWatchlists from '../components/AllUsersWatchlists';

const HomePage = ({
  movies,
  setMovies,
  movieTitle,
  searched,
  searchParam
}) => {

  const [ watchlists, setWatchlists ] = useState([]);
  const [ watchlistId, setWatchlistId ] = useState("");
  const [ watchlistMovieTitle, setWatchlistMovieTitle ] = useState("");
  const [ watchlistMoviePoster, setWatchlistMoviePoster ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);
  const [ addIsClicked, setAddIsClicked ] = useState(false);
  const [ movieImdbId, setMovieImdbId ] = useState("");
  const [ isAdded, setIsAdded ] = useState(false);
  const [ totalResults, setTotalResults ] = useState("");
  let [ pageNumber, setPageNumber ] = useState(1);
 
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  const handleId = (e) => {
    console.log(e.target.value)
    setWatchlistId(e.target.value);
  };

  const handleAddMovie = ( title, poster, id) => {
    console.log("title", title, "poster", poster)
    setWatchlistMovieTitle(title);
    setWatchlistMoviePoster(poster);
    setMovieImdbId(id);
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
          movies:[...currentMovies, {movie:{title: watchlistMovieTitle, poster: watchlistMoviePoster, imdbID: movieImdbId}}]
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
          setWatchlistId("");
          setWatchlistMovieTitle("");
          setWatchlistMoviePoster("");
          setAddIsClicked(!addIsClicked);
          setIsAdded(!isAdded);
      })
      .catch(err => console.log(err))

  }; 

  const handleNextPage = () => {
    setPageNumber(pageNumber += 1)
  };

  const handlePrevPage = () => {
    setPageNumber(pageNumber -= 1)
  };

  useEffect(() => {

    axios.get(`${API_URL}&s=${movieTitle}&page=${pageNumber}`)
      .then(res => {
        console.log(res, "movie api");
        setMovies(res.data.Search);
        setTotalResults(res.data.totalResults);
        setIsLoading(false)
      })
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

  }, [pageNumber]);

  return (
    <div>
      {isLoading ?
      <div className='h-screen'>
        <h1 className='text-center text-4xl'>Loading...</h1>
      </div> :
    <div>
    {movies ? 
    <div>
      {!searched && <h1 className="text-start ml-12  border-l-8 border-red-500 rounded p-3 text-2xl font-bold">Featured Movies</h1>}
      {searched && <h1 className="text-start text-2xl ml-12 m-4">Searched for "{searchParam}"</h1>}
      <div className="flex justify-between items-center">
        <h1 className="text-start ml-12 m-4">Total results: {totalResults}</h1>
        <h1 className="mr-12">Page: {pageNumber}</h1>
      </div>
      <hr />
      <div className="text-blue-600 hover:text-blue-800 text-center">
          {pageNumber!=1 && <button className="m-2 underline" onClick={() => handlePrevPage()}>Prev Page</button>}
          {movies.length ===10 && <button className="m-2 underline" onClick={() => handleNextPage()}>Next Page</button>}
        </div>
      <div className="grid grid-cols-5 m-6">{movies.map((movie, index) => {
        return (
          <div key={index} className="my-2">
            { movie.Poster === "N/A" ?
            <div className='relative'>
                <div className="flex">
                  {addIsClicked && movie.imdbID === movieImdbId && 
                  <form onSubmit={handleSubmit} className="absolute border border-black bg-white p-1 flex gap-1 rounded items-center top-[-36px] left-0 w-[270px] z-10">
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
                <h1 className='absolute bottom-0 left-6'>{movie.Title}</h1>
                {accessToken && <AiOutlinePlus size="30px" className="absolute right-[10px] top-2 bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90" onClick={() => {handleAddMovie(movie.Title, movie.Poster, movie.imdbID)}}/>}
                <a href={`${IMDB_URL}${movie.imdbID}`} target="_blank" className='m-0'>
                  <img src={notFound} alt="movie poster, not found" className="h-[400px] w-[270px] cursor-pointer hover:shadow-3xl rounded hover:grayscale m-0"/>
                </a>
            </div>
              :
              <div className='relative'>
                <div className="flex">
                  {addIsClicked && movie.imdbID === movieImdbId && 
                  <form onSubmit={handleSubmit} className="absolute border bg-white flex gap-1 rounded items-center top-[-36px] left-0 w-[270px] z-10">
                      <label htmlFor="watchlist" className="p-0">Watchlist:</label>
                      <select id="watchlist" onChange={handleId} className="border border-red-500 rounded">
                        <option>--</option>
                      {watchlists && watchlists.map((list, index) => {
                        return(
                          <option key={index} value={list._id}>{list.title}</option>
                          )
                      })}
                      </select>
                      <Button buttonText="Add"/>
                  </form>}
                </div>
                  {accessToken && <AiOutlinePlus size="30px" className="absolute right-[10px] top-[10px] bg-white rounded opacity-50 z-10 cursor-pointer hover:opacity-90 " onClick={() => {handleAddMovie(movie.Title, movie.Poster,  movie.imdbID)}}/>}
                  <a href={`${IMDB_URL}${movie.imdbID}`} target="_blank">
                    <img src={movie.Poster} alt="movie poster" className="h-[400px] w-[270px] cursor-pointer hover:shadow-3xl rounded hover:grayscale"/>
                  </a>
              </div>
            }
          </div>
          )
        })}</div> 
        <hr />
      {!searched && <AllUsersWatchlists/>}
    </div> 
    :
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">0 results</h1>
        <img src={notFound} alt="no results" className="h-[660px]" />
      </div>
    }
    </div>}

    </div>
    
    )
}

export default HomePage