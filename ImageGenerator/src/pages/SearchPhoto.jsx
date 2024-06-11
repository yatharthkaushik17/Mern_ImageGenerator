import React, { useRef, useState } from 'react';
import axios from 'axios';
import './SearchPhoto.css';
import { useSelector } from 'react-redux';
import History from "../Component/history";

const SearchPhoto = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const searchInput = useRef(null);
  const { token } = useSelector((state) => state.auth);

  const fetchPhotos = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    console.log(token);
    try {
      const query = searchInput.current.value;
      const response = await axios.get(`http://localhost:3000/api/v1/getPhoto/${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // If your backend requires credentials
      });
      console.log(response);
      if (response.data && response.data.data.results) {
        setImages(response.data.data.results);
        console.log(images);
      } else {
        throw new Error('Invalid response structure');
      }

    } catch (error) {
      setErrorMsg('Error fetching photos');
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      <div className='w-1/5 bg-slate-600 p-4'>
        <History />
      </div>
      <div className='w-4/5 bg-red-300 flex flex-col justify-center items-center p-4'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-3xl text-yellow-950 font-bold'>Image Search</h1>
          {errorMsg && <p className='text-red-800'>{errorMsg}</p>}
          <form onSubmit={fetchPhotos} className='flex gap-2'>
            <input
              type='search'
              placeholder='Type something to search...'
              className='p-2 rounded-md outline-none'
              ref={searchInput}
            />
            <button type='submit' className='rounded-lg bg-zinc-600 p-2'>Submit</button>
          </form>
        </div>
        {loading ? (
          <p className='mt-4'>Loading...</p>
        ) : (
          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className='w-full h-auto object-cover rounded'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPhoto;
