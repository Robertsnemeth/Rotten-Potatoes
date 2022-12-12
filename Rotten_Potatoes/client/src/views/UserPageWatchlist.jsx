import { useState, useEffect} from 'react';
import axios from 'axios';
import Watchlist from '../components/Watchlist';
import Button from '../components/Button';
const USER_URL = "http://localhost:8000/api/rotten_potatoes/user/"

const UserPageWatchlist = () => {

    const [ user, setUser ] = useState({});
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const [ watchlist, setWatchlists ] = useState([]);
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
        axios.post("http://localhost:8000/api/rotten_potatoes/movie_watchlist",{
            title: watchlistTitle,
            user: user
        })
        .then(res => {
            console.log(res, "Watchlist Added");
            setDataChange(Math.random());
            setFormVisable(!formVisable);
        })
            .catch(err => console.log(err));
            setWatchlistTitle("")
        }; 

        const handleEdit = (title, id) => {
            axios.put(`http://localhost:8000/api/rotten_potatoes/movie_watchlist/${id}`,{title})
            .then(res => {
                console.log(res, "Watchlist Added");
            })
                .catch(err => console.log(err));
                setWatchlistTitle("")
        }; 

        const handleDelete = (id) => {
            axios.delete(`http://localhost:8000/api/rotten_potatoes/movie_watchlist/${id}`)
                .then(res => {
                    console.log(res);
                    setDataChange(Math.random());
                })
                .catch(err => console.log(err))
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
                console.log(res);
                setUser(res.data.user);
                localStorage.setItem('userId', res.data.user._id);
                setUserId(res.data.user._id)
                console.log(userId, "useEffect userId");
                axios.get(`http://localhost:8000/api/rotten_potatoes/movie_watchlist/${userId}`)
                .then((res) => {
                console.log(res.data.movieWatchlist, "reference get request");
                setWatchlists(res.data.movieWatchlist);
                })
                .catch((err) => console.log(err));
                })
            .catch(err => console.log(err))
    }, [watchlistTitle]);

  return (
    <div className='relative flex flex-col gap-4'>
        {accessToken ? 
            <div className='flex flex-col w-9/12'>
                <button className='self-center border border-green-500 rounded p-1 text-green-500 hover:text-white hover:bg-green-500 hover:border-white' onClick={handleAddMovie}>Add Watchlist</button>
                <h1 className="text-start ml-12  border-l-8 border-red-500 p-3 text-2xl font-bold">Watchlists</h1>
                {formVisable && 
                <div className='absolute z-10 bg-gray-50 shadow-2xl left-[37%] top-[50px]'>
                    <form onSubmit={handleSubmit} className="w-[500px] border border-black rounded p-4 flex flex-col">
                        <div className='flex'>
                            <section className='m-4'>
                                <div className="flex flex-col gap-2">
                                {/* {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>} */}
                                    <label htmlFor="email">Watchlist Title: </label>
                                    <input className="border border-black rounded w-[400px]" type="text" onChange={handleWatchlistTitle} value={watchlistTitle}/>
                                </div>
                            </section>
                        </div>
                            <Button buttonText="Add"/>
                    </form>
                </div>}
                <div className='flex flex-col gap-4 m-4'>
                    {watchlist &&
                    <Watchlist 
                    watchlist={watchlist}
                    userId={userId}
                    onSubmitHandler={handleEdit}
                    onDeleteHandler={handleDelete}
                    setDataChange={setDataChange}/>}
                </div>
            </div> :
            <h1>Not authorized</h1>
        }
    </div>
  )
}

export default UserPageWatchlist