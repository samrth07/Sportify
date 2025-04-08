import { useState } from 'react'

import {Routes, Route } from "react-router-dom";
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import Login from './component/Login';
import Contact from './component/Contact';
import About from './component/About';

function App() {
  

  return (
    <>
        <Navbar/>
       <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
       </Routes>
     
    </>
  )
}

export default App
