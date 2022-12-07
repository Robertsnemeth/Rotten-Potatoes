import { useState, useEffect} from 'react';
import axios from 'axios';
const USER_URL = "http://localhost:8000/api/rotten_potatoes/user/"

const UserPageWatchlist = () => {

    const [ user, setUser ] = useState({});
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const [ watchlist, setWatchlist ] = useState([]);
    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ watchlistTitle, setWatchlistTitle ] = useState("");
    const [ dataChange, setDataChange ] = useState("");
    const [ formVisable, setFormVisable ] = useState(false);

    const handleWatchlistTitle = (e) => {
        setWatchlistTitle(e.target.value);
    };

    const handleAddMovie = () => {
        setFormVisable(!formVisable);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(watchlist)
        axios.put(`${USER_URL}${userId}`,{
            watchlists:[...watchlist, {title:watchlistTitle}]
        })
        .then(res => {
            console.log(res, "Watchlist Added");
            setDataChange(Math.random());
            setFormVisable(!formVisable);
        })
            .catch(err => console.log(err));
            setWatchlistTitle("")
        }; 

    useEffect(() => {
        console.log(watchlist, "watchlist")
        axios.get(
            "http://localhost:8000/api/rotten_potatoes/current_user", 
            {headers:
                {'Authorization': `Bearer ${accessToken}`}
            },
            {withCredentials: true}
        )
            .then((res) => {
                // console.log(res);
                setUser(res.data.user);
                localStorage.setItem('userId', res.data.user._id);
                setUserId(res.data.user._id)
                console.log(userId, "useEffect userId");
                setWatchlist(res.data.user.watchlists);
            })
            .catch(err => console.log(err))
    }, [dataChange]);

  return (
    <div className='relative flex flex-col gap-4'>
        {accessToken ? 
            <div>
                <h1>{user.firstName}</h1>
                <button className='border rounded p-2 m-2 hover:bg-gray-50' onClick={handleAddMovie}>Add Watchlist</button>
                {formVisable && 
                <div className='absolute z-10 bg-gray-50 shadow-2xl left-[37%]'>
                    <form onSubmit={handleSubmit} className="w-[500px] border border-black p-4 flex flex-col">
                        <div className='flex'>
                            <section className='m-4'>
                                <div className="flex flex-col gap-2">
                                {/* {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>} */}
                                    <label htmlFor="email">Watchlist Title: </label>
                                    <input className="border border-black rounded w-[400px]" type="text" onChange={handleWatchlistTitle} value={watchlistTitle}/>
                                </div>
                            </section>
                        </div>
                            <button className="border border-black rounded p-2 m-2 bg-red-500 hover:bg-red-400 text-white">Add</button>
                    </form>
                </div>}
                <div className='flex flex-col gap-4 m-4'>
                    {watchlist && watchlist.map((list, index) => {
                        return (
                            <div key={index} className='border flex flex-col gap-4 w-[1000px]'>
                                <h1 className="uppercase text-2xl font-bold">{list.title}</h1>
                                {list.movies.map((movie, index) => {
                                    return (
                                        <div className='flex flex-row'>
                                            <h1>{JSON.stringify(movie)}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div> :
            <h1>Not authorized</h1>
        }
    </div>
  )
}

export default UserPageWatchlist