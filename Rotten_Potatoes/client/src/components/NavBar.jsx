import { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';

const CURRENT_USER_API = import.meta.env.VITE_CURRENT_USER_API;

const NavBar = ({
  movieTitle,
  setMovieTitle,
  setSearched,
  setSearchParam,
  dataChange
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
    navigate("/");
    window.location.reload(false)
  };

  const handleHomeClick = () => {
    navigate("/");
    window.location.reload(false);
  };

  useEffect(() => {
    axios.get(
        `${CURRENT_USER_API}`, 
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
}, [dataChange]);

  return (
    <nav className="bg-red-500 text-white grid grid-cols-3 p-1 mb-4 items-center w-full">
      <div className='flex gap-4 cursor-pointer border-red-500 p-1 hover:rounded hover:bg-red-400 hover:p-1' onClick={handleHomeClick}>
        <img src="https://kid-time.net/wp/wp-content/uploads/2018/06/the-grossery-gang-moldy-veg-series-1-118-smashed-potato.png" alt="rotten potato" className='w-20' />
        <div>
          <h1 className="text-[2rem] font-fredoka-one">Rotten</h1>
          <h1 className="text-[2rem] font-fredoka-one">Potatoes</h1>
        </div>
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