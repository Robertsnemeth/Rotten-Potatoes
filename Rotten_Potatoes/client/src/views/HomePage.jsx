import {useState, useEffect} from 'react';
import axios from 'axios';
// b79df8f9
const API_URL = "http://www.omdbapi.com?apikey=b79df8f9"

const HomePage = () => {

  const [ movies, setMovies ] = useState([]);
  const [ movieTitle, setMovieTitle ] = useState("Harry Potter")

  useEffect(() => {
    axios.get(`${API_URL}&s=${movieTitle}`)
      .then(res => {console.log(res), setMovies(res.data.Search)})
      .catch(err => console.log(err))
  }, []);

  return (
    <div>{movies.map((movie, index) => {
      return (
        <>
        <h1 key={index}>{movie.Title}</h1>
        <img src={movie.Poster} alt="" />
        </>
      )
    })}</div>
  )
}

export default HomePage