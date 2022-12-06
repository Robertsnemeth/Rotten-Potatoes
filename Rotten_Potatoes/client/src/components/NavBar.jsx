import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

const NavBar = ({
  movieTitle,
  setMovieTitle
}) => {

  const [ title, setTitle ] = useState("");

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieTitle(title);
    setTitle("");
  };

  return (
    <nav className="bg-red-500 text-white flex content-between p-8 mb-4 items-center">
        <Link to="/" className="text-[2.5rem]">Rotten Potatoes</Link>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="search" className="text-2xl">Search Movies: </label>
            <input id="search" className="border rounded text-black w-96 p-1" type="text" onChange={handleTitle} value={title} />
            <button><BiSearch size="25"/></button>
          </form>
        <Link to="/rotten_potatoes/login">Sign In</Link>
    </nav>
  )
}

export default NavBar