import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Sidebar = ({onLogoutHandler}) => {

    const { user, setUser } = useContext(UserContext);
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));

  return (
    <div className='absolute top-[95px] md:top-[112px] right-0 bg-red-500 w-full md:w-1/2 z-50 transition-all ease-in flex flex-col'>
        {accessToken ? 
            <>
            <Link to="/rotten_potatoes/user/account" className="p-1 w-full text-center" >{user.userName}</Link>
            <hr />
            <Link to="/rotten_potatoes/user/watchlist" className="p-1 w-full  text-center">My Watchlists</Link>
            <hr />
            <button onClick={() => onLogoutHandler()} className="p-1 w-full ">Logout</button> 
            <hr />
            </>
            :
            <Link to="/rotten_potatoes/login" className="p-1 w-full h-full text-center">Sign In/Sign Up</Link>    
        }
    </div>
  )
}

export default Sidebar