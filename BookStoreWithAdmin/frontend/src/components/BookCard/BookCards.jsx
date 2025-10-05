import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BookCard = ({ data, favourite }) => {
    
    var l = data.url;
    var result = l.substring(29);  
    const headers = {
        id:localStorage.getItem('id'),
        authorization:`Bearer ${localStorage.getItem('token')}`,
        bookid: data._id
    };
    const handleRemoveBook = async()=>{
    const response = await axios.put("http://localhost:5000/api/v1/remove-book-from-favourite",{},{headers});
    alert(response.data.message);
    
  }

    return (
        <div className='bg-zinc-800 rounded p-4 flex flex-col gap-4'>
        <Link to={`/view-book-details/${data._id}`}>
            <div className='bg-zinc-800 rounded-xl p-4 w-64 h-[400px] flex flex-col items-center'>
                <div className='bg-zinc-800 w-full h-64 overflow-hidden rounded-lg'>
                    <img 
                        src={data.url} 
                        alt={data.title} 
                        className="w-full h-auto object-cover"
                    />
                </div>
                <h2 className="text-white mt-4 text-xl font-semibold line-clamp-2">{data.title}</h2>
                <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
                <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹{data.price}</p> 
               
            </div>

        </Link>
         {favourite && (
                    <button className='bg-yellow-50 px-3 py-2 rounded border border-yellow-500 text-yellow-600 mt-4  text-sm font-medium hover:bg-yellow-100 transition' onClick={handleRemoveBook}>
                        Remove From the favourite
                    </button>
                )}
        </div>
        
    );
};

export default BookCard;
