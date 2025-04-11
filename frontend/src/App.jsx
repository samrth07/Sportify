import { useState } from 'react'
import {Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './component/Navbar';
import Home from './component/homepage';
import Signup from './component/Signup';
import Login from './component/Login';
import Sportpage from './Sports/Sportpage';
import About from './component/About';
import Matches from './Sports/Matches';
import Cricket from './Sports/Cricket';
// import Sports from './component/sports'; not in use 
import NewNavbar from './component/NewNavbar';
import Samarth from './component/Samarth';
import Signupnew from './component/Signup UI';
import article from './component/article';
import Article from './component/article';

function App() {
  

  return (
    <>
        <Navbar/>
        <NewNavbar/>
       <Routes>
        
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signupnew/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sportAarya' element={<Sportpage/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/matches' element={<Matches/>}/> 
            <Route path='/cricket' element={<Cricket/>}/>
            <Route path='/cricket' element={<Cricket/>}/>
            <Route path='/samarth' element={<Samarth/>}/>
            <Route path='/article' element={<Article/>}/>
            
            {/* sport for arrays's url */}
            
       </Routes>
     
    </>
  )
}

export default App
