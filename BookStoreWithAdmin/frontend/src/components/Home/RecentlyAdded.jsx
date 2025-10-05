import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCards";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/v1/get-recent-books",{
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                 
                setData(response.data.data);
                
            };
        fetch();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            {!Data && <div className="flex utems-center justify-center my-8"><Loader /> </div> }
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {Data
                  && Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;
