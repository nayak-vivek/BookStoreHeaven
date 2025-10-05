import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import {useDispatch} from 'react-redux'
const Login = () => {
  const[Values, setValues] = useState({
    username:"",
    password:""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e)=>{
    const {name,value} = e.target;
    setValues({...Values,[name]:value })
  }
  const submit = async()=>{
    try{
      if(Values.username === '' || Values.password === ''){
        alert("all fields are rerquired")
      }else{
        // console.log(Values);
        const response = await axios.post("http://localhost:5000/api/v1/sign-in",Values);
        console.log(response.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile");
      }
    }catch(error){
      alert(error.response.data.message);
    }
  }
  return (
    <div className='min-h-screen flex flex-col bg-zinc-900 px-12 py-8 flex items-center justify-center'>
        <div className='bg-zinc-800 rounded-lg px-8 py-5 ww-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>LogIn</p>
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
                Password
            </label>
            <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='xyz@Password.com' name='password' required value={Values.password} onChange={change}/>
          </div>
          
        </div>

       
        <button className='w-full bg-blue-500 cursor-pointer mt-4 p-2 rounded-xl text-white text-xl font-semibold'onClick={submit}>Login</button>
        <span className='flex items-center justify-center mt-2 text-white'>Or</span>
        <span className='flex items-center justify-center cursor-pointer' onClick={()=>navigate('/SignUp')}>Don`t have an account? SignUp </span>
        </div>
    </div>
  )
}

export default Login
