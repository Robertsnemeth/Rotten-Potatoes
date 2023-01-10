import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import Sidebar from './Sidebar';

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
  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId] = useState(localStorage.getItem('userId'));
  const [ menuView, setMenuView ] = useState(false);
  const [ isSearchClicked, setIsSearchClicked ] = useState(false);

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
    setMenuView(false)
    navigate("/");
    window.location.reload(false)
  };

  const handleHomeClick = () => {
    setMenuView(false)
    navigate("/");
    window.location.reload(false);
  };

  const handleHamburgerMenuClick = () => {
    setMenuView(!menuView)
  }

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
    <nav className="bg-red-500 text-white flex lg:grid lg:grid-cols-3 p-1 mb-4 items-center w-full">
      <div className='flex gap-4 cursor-pointer border-red-500 p-1 hover:rounded hover:bg-red-400 hover:p-1' onClick={handleHomeClick}>
        <img src="https://kid-time.net/wp/wp-content/uploads/2018/06/the-grossery-gang-moldy-veg-series-1-118-smashed-potato.png" alt="rotten potato" className='w-20' />
        <div className='hidden sm:block'>
          <h1 className="text-[2rem] font-fredoka-one">Rotten</h1>
          <h1 className="text-[2rem] font-fredoka-one">Potatoes</h1>
        </div>
      </div>
          <form onSubmit={handleSubmit} className="lg:flex lg:items-center lg:gap-2 hidden">
            <input id="search" className="border rounded-full text-white w-96 p-1 bg-red-800" type="text" onChange={handleTitle} value={title} placeholder="Search movies..." />
            <button><BiSearch size="25"/></button>
          </form>
          {accessToken ? 
          <div className='flex gap-6'>
            <div className='flex gap-5'>
              <form onSubmit={handleSubmit} className="lg:flex lg:items-center lg:gap-2 hidden">
                {isSearchClicked && <input id="search" className="border rounded-full text-white w-96 p-1 bg-red-800" type="text" onChange={handleTitle} value={title} placeholder="Search movies..." />}
                <button onClick><BiSearch size="25" className="lg:hidden"/></button>
              </form>
              <RxHamburgerMenu size="40" className="xl:hidden" onClick={() => handleHamburgerMenuClick()}/>
            </div>
            {menuView && <Sidebar onLogoutHandler={handleLogout}/>}
            <Link to="/rotten_potatoes/user/account" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500 hidden xl:block">{user.userName}</Link>
            <Link to="/rotten_potatoes/user/watchlist" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500 hidden xl:block">My Watchlists</Link>
            <button onClick={handleLogout} className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500 hidden xl:block">Logout</button> 
          </div> :
          <div className='relative'>
            <div className='flex gap-5'>
              <button><BiSearch size="25" className="lg:hidden"/></button>
              <RxHamburgerMenu size="40" className="xl:hidden" onClick={() => handleHamburgerMenuClick()}/>
            </div>
            {menuView && <Sidebar/>}
            <Link to="/rotten_potatoes/login" className="hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded p-1 border border-red-500 hidden xl:block">Sign In/Sign Up</Link>
          </div>
          }
    </nav>
  )
}

export default NavBar