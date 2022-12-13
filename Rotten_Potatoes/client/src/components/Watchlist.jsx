import { useState } from 'react';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from './Button';

const Watchlist = ({
    watchlist,
    setDataChange,
    onSubmitHandler,
    onDeleteHandler
}) => {

    const [ isEditing, setIsEditing ] = useState(false);
    const [ watchlistTitle, setWatchlistTitle ] = useState("");
    const [ listId, setListId ] = useState("");

    const handleTitle = (e) => {
        setWatchlistTitle(e.target.value);
    };

    const handleEdit = (title, id) => {
        setWatchlistTitle(title);
        setIsEditing(!isEditing);
        setListId(id)
    };

    const handleDelete = (id) => {
        onDeleteHandler(id);
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(watchlistTitle, listId);
        window.location.reload(false);
        setWatchlistTitle("");
    };

  return (
    <div>
    <div className='flex flex-col gap-4 m-4'>
        {watchlist && watchlist.map((list, index) => {
            return (
                <div key={index} className='border rounded flex flex-col gap-4 w-[1000px] p-5'>
                    <div className='flex items-center gap-2'>
                        {isEditing && list._id === listId ? 
                        <form onSubmit={handleSubmit} className='flex items-center relative'>
                            <input type="text" onChange={handleTitle} value={watchlistTitle} className="uppercase text-2xl font-bold border rounded"/>
                            <Button buttonText={<AiOutlineCheckCircle/>}/>
                        </form>
                        :
                        <h1 className="uppercase text-2xl font-bold border-l-8 border-red-500 p-2">{list.title}</h1>
                        }
                        <AiOutlineEdit color="green" onClick={() => handleEdit(list.title, list._id)} className="cursor-pointer hover:border hover:border-green-500 hover:rounded"/>
                        <RiDeleteBin6Line color="red" onClick={() => handleDelete(list._id)} className="cursor-pointer hover:border hover:border-red-500 hover:rounded"/>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {list.movies.map((currentMovie, index) => {
                            return (
                                <div className='flex flex-col gap-1 text-center' key={currentMovie._id}>
                                    <img src={currentMovie.movie.poster} alt="movie poster" className="h-[300px] w-[203px] hover:shadow-lg rounded" />
                                    <h1 className="text-xs">{currentMovie.movie.title}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </div>
</div>  )
}

export default Watchlist