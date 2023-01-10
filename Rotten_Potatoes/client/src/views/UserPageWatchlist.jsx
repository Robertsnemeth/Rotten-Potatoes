import { useState, useEffect} from 'react';
import axios from 'axios';
import Watchlist from '../components/Watchlist';
import Button from '../components/Button';

const CURRENT_USER_API = import.meta.env.VITE_CURRENT_USER_API;
const USER_API = import.meta.env.VITE_USER_API;
const WATCHLIST_URL = import.meta.env.VITE_WATCHLIST_URL;


const UserPageWatchlist = () => {

    const [ user, setUser ] = useState({});
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const [ watchlist, setWatchlists ] = useState([]);
    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ watchlistTitle, setWatchlistTitle ] = useState("");
    const [ dataChange, setDataChange ] = useState("");
    const [ formErrors, setFormErrors ] = useState({});
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
        axios.post(`${WATCHLIST_URL}`,{
            title: watchlistTitle,
            user: user
        })
        .then(res => {
            console.log(res, "Watchlist Added");
            const newWatchlistId = res.data.movieWatchlist._id;
            const usersWatchlists = user.watchlists;
                axios.put(`${USER_API}${userId}`, 
                {watchlists:[ ...usersWatchlists, newWatchlistId ] }
            )
                .then(res => console.log(res, "watchlistId for User"))
                .catch(err => console.log(err))
            setDataChange(Math.random());
            setFormVisable(!formVisable);
        })
            .catch(err => {
                console.log(err);
                const errRes = err.response.data.error.errors;
                setFormErrors(errRes);
            });
            setWatchlistTitle("")
        }; 

        const handleEdit = (title, id) => {
            axios.put(`${WATCHLIST_URL}${id}`,{title})
            .then(res => {
                console.log(res, "Watchlist Added");
                setDataChange(Math.random());
            })
                .catch(err => console.log(err));
                setWatchlistTitle("")
        }; 

        const handleDelete = (id) => {
            axios.delete(`${WATCHLIST_URL}${id}`)
                .then(res => {
                    console.log(res, "deleted watchlist");
                    const usersWatchlists = user.watchlists;
                    const newWatchlists = usersWatchlists.filter((listId) => listId != id);
                    axios.put(`${USER_API}${userId}`, 
                    {watchlists: newWatchlists })
                    setDataChange(Math.random());
                })
                .catch(err => console.log(err))
        };

    useEffect(() => {
        console.log(watchlist, "watchlist")
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
                localStorage.setItem('userId', res.data.user._id);
                setUserId(res.data.user._id)
                console.log(userId, "useEffect userId");
                axios.get(`${WATCHLIST_URL}${userId}`)
                    .then((res) => {
                    console.log(res.data.movieWatchlist, "reference get request");
                    setWatchlists(res.data.movieWatchlist);
                    })
                    .catch((err) => console.log(err));
                })
            .catch(err => console.log(err))
    }, [dataChange]);

  return (
    <div className='relative min-h-screen'>
        {accessToken ? 
            <div className='flex flex-col w-full '>
                <button className='self-center border border-green-500 rounded p-1 text-green-500 hover:text-white hover:bg-green-500 hover:border-white' onClick={handleAddMovie}>Add Potato Sack</button>
                <h1 className="text-start ml-12  border-l-8 border-red-500 rounded p-3 text-2xl font-bold mb-5">Potato Sack's</h1>
                <hr />
                {formVisable && 
                    <form onSubmit={handleSubmit} className="absolute z-10 bg-gray-50 shadow-2xl left-0 md:left-[12%] lg:left-[25%] top-10 w-full md:w-3/4 lg:w-1/2 border rounded p-4 flex flex-col items-center">
                        <div className='flex'>
                            <section className='m-4'>
                                <div className="flex flex-col gap-2">
                                {formErrors.title && <p className="text-center text-red-500">{formErrors.title.message}</p>}
                                    <label htmlFor="email">Watchlist Title: </label>
                                    <input className="border border-black rounded w-full sm:w-[400px]" type="text" onChange={handleWatchlistTitle} value={watchlistTitle}/>
                                </div>
                            </section>
                        </div>
                            <Button buttonText="Add"/>
                    </form>}
                <div className='flex flex-col items-center gap-4 m-4'>
                    {watchlist && watchlist.map((list, idx) => {
                        return (
                            <Watchlist 
                            key={idx}
                            list={list}
                            onSubmitHandler={handleEdit}
                            onDeleteHandler={handleDelete}
                            setDataChange={setDataChange}
                            />
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