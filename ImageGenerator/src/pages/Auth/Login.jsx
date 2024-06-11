import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import {useNavigate, Link} from 'react-router-dom';
import toast, {Toaster} from  'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Slices/authSlice';
import {EyeOff,Eye} from 'lucide-react'


const Login = () => {
  const router = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const RegisterHandeler = (e) => {
    e.preventDefault();

    const parsedresp = (data) => {
      if(data.success){
        localStorage.setItem('token' ,JSON.stringify(data.token));
        toast.success(data.message);
        dispatch(setToken(JSON.stringify(data.token)))
        
        setTimeout((e) => {
          
          router('/fetchPhotos');
        }, 2000);
      }  
      else{
        console.log("User not found");
        toast.error("User not Found");
        return;
      }   
    }
    const response = (resp) => {
        resp.json().then(parsedresp);
    }
    fetch("http://localhost:3000/api/v1/Login" ,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": email,
            "password": password,
          
          }) 
    }).then(response).catch((err)=>{
      console.log("Error occurred while posting the Login data ",err);
      return;
    })
    
}

  return (
    <div className='h-screen w-screen bg-white p-8 flex justify-center items-center'>
      <Toaster/>
        <div className='h-min-96 w-96 bg-gray-800 text-white shadow-2xl p-4 border rounded-md'>
          <h2 className='text-center text-2xl font-serif '>Login</h2>
          
          <div className='flex justify-center gap-4 m-4'>
            <GoogleButton
              type = 'dark'
            />
          </div>

          <div className='flex gap-3 flex-col mt-8'>
            <label>Email</label>
            <input className='border p-4 text-gray-900 bg-gray-300' 
            type="email"
            placeholder='Enter Email' 
            onChange={(event)=>{setEmail(event.target.value)}}
             />
             
          </div>

          <div className='flex gap-3 flex-col mt- relative'>
            <label>Password</label>
            <input className='border p-4 text-gray-900 bg-gray-300 '
             type={showPassword===false ? "password" : "text"} 
             placeholder='Enter Password' 
             onChange={(event)=>{setPassword(event.target.value)}}
             />
             {showPassword===false?<EyeOff onClick={()=>{setShowPassword(true)}} size={22} color='black' className='absolute top-14 right-5'/> : <Eye onClick={()=>{setShowPassword(false)}} size={22} color='black' className='absolute top-14 right-5' /> }
          </div>

          <div className='flex justify-center'>
            <button className='border p-2 mt-4 bg-blue-500 text-white rounded-md' onClick={RegisterHandeler}>Login</button>
          </div>
          <div className='mt-8 text-center'>
            <span>Don't Have an Account? <Link to="/Signup" className='text-blue-600'>Create One</Link></span>
          </div>
        </div>

    </div>
  )
}

export default Login
