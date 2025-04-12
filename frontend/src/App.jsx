import { useState } from 'react'
import {Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './component/Navbar';
import Home from './component/homepage';
import Signup from './component/Signup';
import Login from './component/Login';
import Sportpage from './Sports/Sportpage';
import Matches from './Sports/Matches';
import Cricket from './Sports/Cricket';
import NewNavbar from './component/NewNavbar';
import Samarth from './component/Samarth';
import CreateMatch from './Sports/createMatch';
import Allsports from './LiveScore/Allsports';
import Signupnew from './component/Signup UI';
import Article from './component/article';
import LiveScore from './component/LiveComponent';
import AboutPage from './component/AboutPage';

function App() {
  

  return (
    <>
        <NewNavbar/>
       <Routes>
        
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signupnew/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sportAarya' element={<Sportpage/>}/>
            <Route path='/matches' element={<Matches/>}/> 
            <Route path='/cricket' element={<Cricket/>}/>
            <Route path='/creatematches' element={<CreateMatch/>}/>
            <Route path='/uploadscore' element={<Allsports/>}/>
            <Route path='/samarth' element={<Samarth/>}/>
            <Route path='/article' element={<Article/>}/>
            <Route path='/livescore' element={<LiveScore/>}/>  
            <Route path='/AboutPage' element={<AboutPage/>}/>          
       </Routes>
     
    </>
  )
}

export default App
