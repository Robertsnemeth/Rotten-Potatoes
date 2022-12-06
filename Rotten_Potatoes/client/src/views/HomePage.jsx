import {useState, useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://www.omdbapi.com?apikey=b79df8f9";
import notFound from '../assets/not_found.jpg'

const HomePage = ({
  movies,
  setMovies,
  movieTitle,
  setMovieTitle
}) => {

  useEffect(() => {
    axios.get(`${API_URL}&s=${movieTitle}`)
      .then(res => {console.log(res), setMovies(res.data.Search)})
      .catch(err => console.log(err))
  }, [movieTitle]);

  return (
    <div className="grid grid-cols-5 m-4">{movies.map((movie, index) => {
      return (
        <div key={index} className="m-2">
          { movie.Poster === "N/A" ?
          <img src={notFound} alt="movie poster, not found" className="h-[400px] w-[270px] cursor-pointer hover:scale-105 rounded" onClick=""/> :
          <img src={movie.Poster} alt="movie poster" className="h-[400px] w-[270px] cursor-pointer hover:scale-105 rounded" onClick=""/>
          }
        </div>
      )
    })}</div>
  )
}

export default HomePage