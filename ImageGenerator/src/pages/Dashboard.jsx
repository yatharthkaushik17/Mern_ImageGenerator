import React from 'react'
import Header from '../Component/Header'

const Dashboard = () => {
  return (
      <section className="dark:bg-gray-900 text-main">
        <Header/>
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Generate Images
  
        </h1>
  
        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-zinc-300">
          ImageGenerator provides a smooth experience for fetching Images. 
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-main focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/Login"
          >
            Get Started
          </a>
  
          <a
            className="block w-full rounded border text-zinc-400 border-blue-600 px-12 py-3 text-sm font-medium text-main hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/Signup"
          >
            Register with us
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Dashboard
