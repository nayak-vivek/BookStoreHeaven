import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCards from '../BookCard/BookCards'; 
const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
  };
  useEffect(() => {
    const fetch = async()=>{
      const response = await axios.get("http://localhost:5000/api/v1/get-favourite-books",{headers});
      setFavouriteBooks(response.data.data);
    };
    fetch();
  },[FavouriteBooks]);
  
  return (
    <>
    <div className='grid grid-cols-1 gap-4 h-[100%] w-full '>
      {FavouriteBooks.length === 0 && (
        <div className='text-5xl font-semibold  text-zinc-500 flex items-center justify-center flex-col w-full '>
          No Favourite Books
          <img src="bookmark.png" alt="star image" width={120} className='m-8'/>
          </div>
        )}
      {FavouriteBooks && FavouriteBooks.map((items,i)=>
        <div key={i}> 
          <BookCards data={items} favourite={true}/>
        </div>
      )}
    </div>
    </>
  )
}

export default Favourites
