import { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';

const NavBar = ({
  movieTitle,
  setMovieTitle
}) => {

  const [ title, setTitle ] = useState("");
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
  const [ user, setUser ] = useState({});

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieTitle(title);
    setTitle("");
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate("/")
    window.location.reload(false);
  }

  useEffect(() => {
    axios.get(
        "http://localhost:8000/api/rotten_potatoes/current_user", 
        {headers:
            {'Authorization': `Bearer ${accessToken}`}
        },
        {withCredentials: true}
    )
        .then((res) => {
            console.log(res);
            setUser(res.data.user);
        })
        .catch(err => console.log(err))
}, []);

  return (
    <nav className="bg-red-500 text-white flex content-between p-8 mb-4 items-center">
        <Link to="/" className="text-[2.5rem]">Rotten Potatoes</Link>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="search" className="text-2xl">Search Movies: </label>
            <input id="search" className="border rounded text-black w-96 p-1" type="text" onChange={handleTitle} value={title} />
            <button><BiSearch size="25"/></button>
          </form>
          {accessToken ? 
          <div className='flex gap-6'>
            <Link to="/rotten_potatoes/user/account" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1">{user.userName}</Link>
            <Link to="/rotten_potatoes/user/watchlist" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1">My Watchlists</Link>
            <button onClick={handleLogout} className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1">Logout</button> 
          </div> :
          <Link to="/rotten_potatoes/login">Sign In</Link>
          }
    </nav>
  )
}

export default NavBar