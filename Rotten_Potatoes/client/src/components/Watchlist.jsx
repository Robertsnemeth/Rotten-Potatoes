import { useState } from 'react';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BiGridAlt } from 'react-icons/bi';
import Button from './Button';
const IMDB_URL = import.meta.env.VITE_IMDB_URL;

const Watchlist = ({
    list,
    onSubmitHandler,
    onDeleteHandler,
    setDataChange
}) => {

    const [ isEditing, setIsEditing ] = useState(false);
    const [ watchlistTitle, setWatchlistTitle ] = useState("");
    const [ listId, setListId ] = useState("");
    const [ isGrid, setIsGrid ] = useState(false);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(watchlistTitle, listId);
        setDataChange(Math.random());
        setWatchlistTitle("");
        setIsEditing(false);
    };

    const handleSlideLeft = () => {
        let slider = document.getElementById('slider' + list._id);
        slider.scrollLeft = slider.scrollLeft - 1000;
    };

    const handleSlideRight = () => {
        let slider = document.getElementById('slider' + list._id);
        slider.scrollLeft = slider.scrollLeft + 1000;
    };

    const handleGridView = () => {
        setIsGrid(!isGrid);
    };

  return (
        <div className='w-full sm:w-3/4 border rounded shadow flex flex-col relative gap-4 p-5 m-4 group'>
            <div className='flex flex-col md:flex md:flex-row items-center gap-2'>
                {isEditing && list._id === listId ? 
                <form onSubmit={handleSubmit} className='flex items-center relative'>
                    <input type="text" onChange={handleTitle} value={watchlistTitle} className="uppercase md:text-2xl font-bold border rounded"/>
                    <Button buttonText={<AiOutlineCheckCircle/>}/>
                </form>
                :
                <h1 className="uppercase md:text-2xl font-bold border-l-8 border-red-500 rounded p-2">{list.title}</h1>
                }
                <div className='flex gap-1'>
                    <AiOutlineEdit color="green" onClick={() => handleEdit(list.title, list._id)} className="cursor-pointer hover:border hover:border-green-500 hover:rounded"/>
                    {!isEditing && <RiDeleteBin6Line color="red" onClick={() => handleDelete(list._id)} className="cursor-pointer hover:border hover:border-red-500 hover:rounded"/>}
                    {!isEditing && <BiGridAlt onClick={() => handleGridView()} className="cursor-pointer hover:border hover:border-black hover:rounded hidden md:block" />}
                </div>
            </div>
            {isGrid ? 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {list.movies.map((currentMovie, index) => {
                        return(
                            <div className='inline-block text-center mx-10 w-3/4 my-2' key={currentMovie._id}>
                                <a href={`${IMDB_URL}${currentMovie.movie.imdbID}`} target="_blank">
                                    <img src={currentMovie.movie.poster} alt="movie poster" className=" cursor-pointer h-[300px] w-[203px] hover:shadow-lg hover:scale-105 hover:transition-all rounded mb-1" />
                                </a>
                                <h1 className="text-xs">{currentMovie.movie.title}</h1>
                            </div>
                        )
                    })}
                </div>
                :
                <>
                    {list.movies.length > 3 && <MdChevronLeft onClick={handleSlideLeft} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden sm:group-hover:block left-5" size={40} color="red"/>}                
                    <div id={'slider' + list._id} className=' h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                        {list.movies.map((currentMovie, index) => {
                            return (
                                <div className='inline-block text-center mx-10' key={currentMovie._id}>
                                    <a href={`${IMDB_URL}${currentMovie.movie.imdbID}`} target="_blank">
                                        <img src={currentMovie.movie.poster} alt="movie poster" className=" cursor-pointer h-[300px] w-[203px] hover:shadow-lg rounded hover:scale-105 hover:transition-all my-2" />
                                    </a>
                                    <h1 className="text-xs">{currentMovie.movie.title}</h1>
                                </div>
                            )
                        })}
                    </div>
                    {list.movies.length > 3 && <MdChevronRight onClick={handleSlideRight} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden sm:group-hover:block right-5" size={40} color="red"/>}
                </>
            }
        </div>
  )
}

export default Watchlist