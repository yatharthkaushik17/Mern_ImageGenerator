import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {setToken} from "../Slices/authSlice"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {token} = useSelector((state)=>state.auth);
  const Logout = ()=>{
    dispatch(setToken(null));
    console.log(token);
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout( () =>{
      navigate("/");
    },2000)
  }
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-main fixed w-screen mb-10">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="md:flex md:items-center md:gap-12">
          <a className="text-main dark:text-teal-600 flex justify-center items-center gap-4 text-3xl font-serif" href="#">
            <span className="sr-only">Home</span>
            
            Image Generator
          </a>
        </div>
  
        {/* <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-lg">
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  About
                </a>
              </li>
  
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Careers
                </a>
              </li>
  
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  History
                </a>
              </li>
  
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Services
                </a>
              </li>
  
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Projects
                </a>
              </li>
  
              <li>
                <a
                  className="text-main transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
  
        {token != null ? (<button className='text-main text-blsck bg-white p-2 rounded-md font-bold' onClick={Logout}> Logout</button>): (<div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4"> 
            <a
              className="rounded-md bg-main px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
              href="/Signup"
            >
              Register
            </a>
          </div>
          </div>)}
  
          <div className="block md:hidden">
            <button
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
      </div>
    </div>
  </header>
  )
}

export default Header
