import { useState } from 'react'
import {Routes, Route } from "react-router-dom";
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import Login from './component/Login';
import Sportpage from './Sports/Sportpage';
import About from './component/About';
import Matches from './Sports/Matches';
import Cricket from './Sports/Cricket';

function App() {
  

  return (
    <>
        <Navbar/>
       <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sport' element={<Sportpage/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/matches' element={<Matches/>}/> 
            <Route path='/cricket' element={<Cricket/>}/>
       </Routes>
     
    </>
  )
}

export default App
