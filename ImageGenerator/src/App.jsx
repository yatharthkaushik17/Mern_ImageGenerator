import React from 'react';
import './App.css';
import SearchPhoto from './pages/SearchPhoto';
import Hello from './pages/Hello';
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import OpenRoute from './Component/openRoute'; 
import Header from './Component/Header';
import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
   
       <BrowserRouter>
       <Header />
       <Routes >
   
        <Route path="/" element={<Dashboard/>}/>
      
        <Route path="/Signup" element={
          <OpenRoute>
            <SignUp/>
          </OpenRoute>
        }/>
      
       
          <Route path="/Login" element={
            <OpenRoute>
              <Login/>
            </OpenRoute>}/>

         <Route path='/fetchPhotos' element={<SearchPhoto />}></Route>
       
      

      </Routes>
    </BrowserRouter>

     

 
  );
};

export default App;
