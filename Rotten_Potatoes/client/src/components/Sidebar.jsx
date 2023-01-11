import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { BiSearch } from 'react-icons/bi';

const Sidebar = ({
  onLogoutHandler,
  onSubmitHandler,
  currentTitle,
  setCurrentTitle,
  setMenuView
}) => {

    const { user, setUser } = useContext(UserContext);
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));

    const handleTitle = (e) => {
      setCurrentTitle(e.target.value)
    };

    const handleMenuView = () => {
      setMenuView(false);
    }

    const handleSubmit = (e) => {
      onSubmitHandler(e);
      handleMenuView();
    };

  return (
    <div>
        {accessToken ? 
            <div className='absolute top-[95px] md:top-[112px] right-0 bg-red-500 w-full md:w-1/2 z-50 transition-all ease-in delay-200 flex flex-col '>
              <form onSubmit={handleSubmit} className="flex items-center p-2 gap-2">
                  <input id="search" className="border rounded-full text-white w-72 sm:w-96 md:w-[340px] lg:w-[450px] p-1 bg-red-800" type="text" onChange={handleTitle} value={currentTitle} placeholder="Search movies..." />
                  <button onClick><BiSearch size="25"/></button>
              </form>
              <Link to="/rotten_potatoes/user/account" className="p-1 w-full text-center" onClick={() => handleMenuView()}>{user.userName}</Link>
              <hr />
              <Link to="/rotten_potatoes/user/watchlist" className="p-1 w-full  text-center" onClick={() => handleMenuView()}>My Watchlists</Link>
              <hr />
              <button onClick={() => onLogoutHandler()} className="p-1 w-full ">Logout</button> 
              <hr />
            </div>
            :
            <div className='absolute top-[95px] md:top-[112px] right-0 bg-red-500 w-full md:w-1/2 z-50 transition-all ease-in delay-200 flex flex-col '>
            <form onSubmit={handleSubmit} className="flex items-center p-2 gap-2">
                <input id="search" className="border rounded-full text-white w-72 sm:w-96 md:w-[340px] lg:w-[450px] p-1 bg-red-800" type="text" onChange={handleTitle} value={currentTitle} placeholder="Search movies..." />
                <button onClick><BiSearch size="25"/></button>
            </form>
              <Link to="/rotten_potatoes/login" className="p-1 w-full text-center" onClick={() => handleMenuView()}>Sign In/Sign Up</Link>    
            </div>
        }
    </div>
  )
}

export default Sidebar