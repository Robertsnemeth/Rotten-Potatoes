import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { TbChevronUp, TbChevronDown } from 'react-icons/tb';
import { Transition } from '@tailwindui/react';

const IMDB_URL = import.meta.env.VITE_IMDB_URL;
const USER_API = import.meta.env.VITE_USER_API;

 

const AllUsersWatchlists = () => {

    const [ allUsers, setAllUsers ] = useState([])
    const [ isViewing, setIsViewing ] = useState(true);
    const [ viewingUserId, setViewingUserId ] = useState("");

    const userId = localStorage.getItem('userId');

    const handleSlideLeft = (listId) => {
        let slider = document.getElementById('slider' + listId);
        slider.scrollLeft = slider.scrollLeft - 1000;
    };

    const handleSlideRight = (listId) => {
        let slider = document.getElementById('slider' + listId);
        slider.scrollLeft = slider.scrollLeft + 1000;
    };

    const handleViewWatchlist = (id) => {
        setViewingUserId(id);
        setIsViewing(!isViewing)
    };

    useEffect(() => {
        axios.get(`${USER_API}`)
            .then(res => {
                console.log(res, "all users watchlists");
                setAllUsers(res.data.users)
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <section className='my-10'>
        <h1 className="uppercase text-2xl font-bold border-l-8 border-red-500 rounded p-2 ml-12">Users Watchlists</h1>
        {allUsers.map((user, index) => {
            return( 
                    user._id !== userId && <div className='relative w-3/4 border rounded shadow p-5' key={user._id}>
                        <div className='flex justify-between'>
                            <h1 className="text-2xl border-l-8 border-red-500 rounded p-2">{user.userName}</h1>
                            {isViewing ? 
                            <>
                                <TbChevronDown onClick={() => handleViewWatchlist(user._id)} color="red" size="40" className="m-0 bg-white hover:border hover:border-red-500 rounded-full  opacity-50 hover:opacity-100 cursor-pointer"/>
                            </> 
                            :
                            user._id === viewingUserId && 
                            <>
                                <TbChevronUp onClick={() => handleViewWatchlist(user._id)} color="red" size="40" className="m-0 bg-white hover:border hover:border-red-500 rounded-full opacity-50 hover:opacity-100 cursor-pointer"/>
                            </>}
                        </div>
                        {user.watchlists.map((list, index) => {
                            return (
                                <Transition
                                enter="transition-opacity transtion-ease-in duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity transition-ease-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                show={!isViewing}
                                key={list._id}
                                >
                                <div>
                                    { viewingUserId === user._id && 
                                    <div className=' flex flex-col relative gap-4 m-4 group '>
                                        <div className='flex items-center gap-2'>
                                            <h1 className="uppercase font-bold border-l-8 border-red-500 rounded p-2">{list.title}</h1>
                                        </div>
                                        {list.movies.length > 12 && <MdChevronLeft onClick={() => handleSlideLeft(list._id)} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-5" size={40} color="red"/>}                
                                        <div id={'slider' + list._id} className='ease-in duration-300 h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                                            {list.movies.map((currentMovie, index) => {
                                                return (
                                                    <div className='inline-block text-center' key={currentMovie._id}>
                                                        <a href={`${IMDB_URL}${currentMovie.movie.imdbID}`} target="_blank">
                                                            <img src={currentMovie.movie.poster} alt="movie poster" className=" cursor-pointer h-[150px] w-[102px] hover:shadow-lg hover:scale-105 hover:transition-all rounded mx-1 my-2" />
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {list.movies.length > 12 && <MdChevronRight onClick={() => handleSlideRight(list._id)} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-5" size={40} color="red"/>}
                                        <hr />
                                    </div>}
                                </div>
                        </Transition>
                            )
                        })}
                    </div>
            )
        })}
    </section>
  )
}

export default AllUsersWatchlists