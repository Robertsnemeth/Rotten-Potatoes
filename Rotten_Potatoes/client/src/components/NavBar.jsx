import { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

import axios from 'axios';

const NavBar = ({
  movieTitle,
  setMovieTitle,
  setSearched,
  setSearchParam
}) => {

  const [ title, setTitle ] = useState("");
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
  const [ user, setUser ] = useState({});
  const [ userId, setUserId] = useState(localStorage.getItem('userId'));

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieTitle(title);
    setSearchParam(title);
    setSearched(true);
    setTitle("");
    navigate("/")
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate("/")
  }

  const handleHomeClick = () => {
    navigate("/");
    window.location.reload(false);
  };

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
            setUserId(localStorage.setItem('userId', res.data.user._id));
        })
        .catch(err => console.log(err))
}, []);

  return (
    <nav className="bg-red-500 text-white grid grid-cols-3 p-2 mb-4 items-center">
        <div onClick={handleHomeClick} className="cursor-pointer">
          <h1 className="text-[2rem] font-fredoka-one">Rotten</h1>
          <h1 className="text-[2rem] font-fredoka-one">Potatoes</h1>
        </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input id="search" className="border rounded-full text-white w-96 p-1 bg-red-800" type="text" onChange={handleTitle} value={title} placeholder="Search movies..." />
            <button><BiSearch size="25"/></button>
          </form>
          {accessToken ? 
          <div className='flex gap-6'>
            <Link to="/rotten_potatoes/user/account" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500">{user.userName}</Link>
            <Link to="/rotten_potatoes/user/watchlist" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500">My Watchlists</Link>
            <button onClick={handleLogout} className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500">Logout</button> 
          </div> :
          <Link to="/rotten_potatoes/login" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500">Sign In/Sign Up</Link>
          }
    </nav>
  )
}

export default NavBar