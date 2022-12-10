import React from 'react'

const Watchlist = ({watchlist}) => {
  return (
    <div>
    <div className='flex flex-col gap-4 m-4'>
        {watchlist && watchlist.map((list, index) => {
            return (
                <div key={index} className='border flex flex-col gap-4 w-[1000px] p-5'>
                    <h1 className="uppercase text-2xl font-bold">{list.title}</h1>
                    <div className='flex gap-4'>
                        {list.movies.map((movie, index) => {
                            return (
                                <div className='flex flex-col gap-1 text-center' key={movie._id}>
                                    <img src={movie.poster} alt="movie poster" className="h-[300px] w-[203px] hover:shadow-lg rounded" />
                                    <h1>{movie.title}</h1>
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