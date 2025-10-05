import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const[Values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    address:"",
  })
  const navigate = useNavigate();
  const change = (e)=>{
    const {name,value} = e.target;
    setValues({...Values,[name]:value })
  }
  const submit = async()=>{
    try{
      if(Values.username === '' || Values.email === '' || Values.password === '' || Values.address === ''){
        alert("all fields are rerquired")
      }else{
        // console.log(Values);
        const response = await axios.post("http://localhost:5000/api/v1/sign-up",Values);
        console.log(response.data.message);
        
        navigate("/Login")
      }
    }catch(error){
      alert(error.response.data.message);
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
        <div className='bg-zinc-800 rounded-lg px-8 py-5 ww-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>
                Username
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='username' name='username' required value={Values.username} onChange={change}/>
          </div>
          
        </div>


        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>
                Email
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='xyz@example.com' name='email' required value={Values.email} onChange={change}/>
          </div>
          
        </div>

         <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>
                Password
            </label>
            <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='xyz@Password.com' name='password' required value={Values.password} onChange={change}/>
          </div>
          
        </div>

        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>
                Address
            </label>
            <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='address' name='address' rows='5' required value={Values.address} onChange={change}></textarea>
          </div>
          
        </div>
        <button className='w-full bg-blue-500 cursor-pointer mt-4 p-2 rounded-xl text-white text-xl font-semibold hover:bg-blue-600 transition-all duration-300' onClick={submit}>Sign Up</button>
        <span className='flex items-center justify-center mt-2 text-white'>Or</span>
        <span className='flex items-center justify-center cursor-pointer' onClick={()=>navigate('/Login')}>Already have an account? Login </span>
        </div>
    </div>
  )
}

export default SignUp
