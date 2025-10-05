import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({status:""});

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    setValues({ status: e.target.value });
  };

  const submitChange = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      alert(response.data.message);

      // update locally
      const updatedOrders = [...allOrders];
      updatedOrders[i].status = values.status;
      setAllOrders(updatedOrders);
      setOptions(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = allOrders.slice(0, -1);

  return (
    <>
      {!allOrders || allOrders.length === 0 ? (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>

          {/* Header */}
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%] text-center'>Sr.</div>
            <div className='w-[40%] md:w-[22%]'>Books</div>
            <div className='w-0 md:w-[45%] hidden md:block'>Description</div>
            <div className='w-[17%] md:w-[9%]'>Price</div>
            <div className='w-[30%] md:w-[16%]'>Status</div>
            <div className='w-[10%] md:w-[5%] text-center'><FaUserLarge /></div>
          </div>

          {/* Orders */}
          {filteredOrders.map((item, i) => (
            <div
              key={item._id}
              className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'
            >
              <div className='w-[3%] text-center'>{i+1}</div>

              <div className='w-[40%] md:w-[22%]'>
                {item.book ? (
                  <Link
                    to={`/view-book-details/${item.book._id}`}
                    className='hover:text-blue-300'
                  >
                    {item.book.title}
                  </Link>
                ) : (
                  <span>Book not found</span>
                )}
              </div>

              <div className='w-0 md:w-[45%] hidden md:block'>
                {item.book ? item.book.desc.slice(0, 50) + '...' : '-'}
              </div>

              <div className='w-[17%] md:w-[9%]'>
                {item.book ? `₹ ${item.book.price}` : '-'}
              </div>

              <div className='w-[30%] md:w-[16%]'>
                <button
                  className='hover:scale-105 transition-all duration-300 font-semibold'
                  onClick={() => setOptions(i)}
                >
                  {item.status === 'Order Placed' ? (
                    <span className='text-yellow-500'>{item.status}</span>
                  ) : item.status === 'Canceled' ? (
                    <span className='text-red-500'>{item.status}</span>
                  ) : (
                    <span className='text-green-500'>{item.status}</span>
                  )}
                </button>

                <div className={`${options === i ? "flex mt-2 gap-2" : "hidden"}`}>
                  <select
                    name="status"
                    className='bg-gray-800 text-white p-1 rounded'
                    value={values.status}
                    onChange={change}
                  >
                    {['Order Placed', 'Out for Delivery', 'delivered', 'Canceled'].map(
                      (statusOption) => (
                        <option key={statusOption} value={statusOption}>{statusOption}</option>
                      )
                    )}
                  </select>

                  <button
                    className='text-green-500 hover:text-pink-500'
                    onClick={() => submitChange(i)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>

              <div className='w-[10%] md:w-[5%]'>
                <button
                  className='text-xl hover:text-orange-500'
                  onClick={() => setOptions(-1)}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
