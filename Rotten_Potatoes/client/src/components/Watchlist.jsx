import { useState } from 'react';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Button from './Button';
import HappyPotato from './../assets/happypotato2.jpg';
import RottenPotato from './../assets/favicon.ico';
const IMDB_URL = "https://www.imdb.com/title/";

const Watchlist = ({
    list,
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

    const handleSlideLeft = () => {
        let slider = document.getElementById('slider' + list._id);
        slider.scrollLeft = slider.scrollLeft - 1000;
    };

    const handleSlideRight = () => {
        let slider = document.getElementById('slider' + list._id);
        slider.scrollLeft = slider.scrollLeft + 1000;
    };

  return (
    <div className='relative w-[1000px]'>
        <div className='border rounded shadow flex flex-col relative gap-4 p-5 m-4 group'>
            <div className='flex items-center gap-2'>
                {isEditing && list._id === listId ? 
                <form onSubmit={handleSubmit} className='flex items-center relative'>
                    <input type="text" onChange={handleTitle} value={watchlistTitle} className="uppercase text-2xl font-bold border rounded"/>
                    <Button buttonText={<AiOutlineCheckCircle/>}/>
                </form>
                :
                <h1 className="uppercase text-2xl font-bold border-l-8 border-red-500 rounded p-2">{list.title}</h1>
                }
                <AiOutlineEdit color="green" onClick={() => handleEdit(list.title, list._id)} className="cursor-pointer hover:border hover:border-green-500 hover:rounded"/>
                {!isEditing && <RiDeleteBin6Line color="red" onClick={() => handleDelete(list._id)} className="cursor-pointer hover:border hover:border-red-500 hover:rounded"/>}
            </div>
            {list.movies.length > 3 && <MdChevronLeft onClick={handleSlideLeft} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-5" size={40} color="red"/>}                
            <div id={'slider' + list._id} className=' h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {list.movies.map((currentMovie, index) => {
                    return (
                        <div className='inline-block text-center mx-10 w-[250px]' key={currentMovie._id}>
                            <a href={`${IMDB_URL}${currentMovie.movie.imdbID}`} target="_blank"><img src={currentMovie.movie.poster} alt="movie poster" className=" cursor-pointer h-[300px] w-[203px] hover:shadow-lg rounded" /></a>
                            <h1 className="text-xs">{currentMovie.movie.title}</h1>
                            <div className='flex gap-1'>
                                <img className="h-12" src={HappyPotato} alt="" />
                                <img className="h-12" src={RottenPotato} alt="" />
                            </div>
                        </div>
                    )
                })}
            </div>
            {list.movies.length > 3 && <MdChevronRight onClick={handleSlideRight} className="bg-white border border-red-500 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-5" size={40} color="red"/>}
        </div>
    </div>
  )
}

export default Watchlist