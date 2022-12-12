import { useState } from 'react';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Form } from 'react-router-dom';
import Button from './Button';

const Watchlist = ({
    watchlist,
    userId,
    url,
    onSubmitHandler
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [ watchlistTitle, setWatchlistTitle ] = useState("");

    const handleTitle = (e) => {
        setWatchlistTitle(e.target.value);
    };

    const handleEdit = (title) => {
        setWatchlistTitle(title);
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler();
        setWatchlistTitle("");
    };

  return (
    <div>
    <div className='flex flex-col gap-4 m-4'>
        {watchlist && watchlist.map((list, index) => {
            return (
                <div key={index} className='border rounded flex flex-col gap-4 w-[1000px] p-5'>
                    <div className='flex items-center gap-2'>
                        {isEditing ? 
                        <form className='flex items-center relative'>
                            <input type="text" onChange={handleTitle} value={watchlistTitle} className="uppercase text-2xl font-bold border rounded"/>
                            <Button buttonText={<AiOutlineCheckCircle/>}/>
                        </form>
                        :
                        <h1 className="uppercase text-2xl font-bold border-l-8 border-red-500 p-2">{list.title}</h1>
                        }
                        <AiOutlineEdit color="green" onClick={() => handleEdit(list.title)} className="cursor-pointer hover:border hover:border-green-500 hover:rounded"/>
                        <RiDeleteBin6Line color="red" onClick={handleDelete} className="cursor-pointer hover:border hover:border-red-500 hover:rounded"/>
                    </div>
                    <div className='flex gap-11'>
                        {list.movies.map((movie, index) => {
                            return (
                                <div className='flex flex-col gap-1 text-center' key={movie._id}>
                                    <img src={movie.poster} alt="movie poster" className="h-[300px] w-[203px] hover:shadow-lg rounded" />
                                    <h1 className="text-xs">{movie.title}</h1>
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