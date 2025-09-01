import {Routes, Route } from "react-router-dom";
import './App.css'
import Home from './component/homepage';
import Sportpage from './Sports/Sportpage';
import Matches from './Sports/Matches';
import Cricket from './Sports/Cricket';
import NewNavbar from './component/NewNavbar';
import Scoreboard from './component/Scoreboard';
import Allsports from './LiveScore/Allsports';
import Signupnew from './component/Signup UI';
import Article from './component/article';
import LiveScore from './component/LiveComponent';
import AboutSection from './component/AboutPage';
import LoginNew from './component/login UI'

function App() {
  

  return (
    <>
        {/* <Navbar/> */}
        <NewNavbar/>
       <Routes>
        
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signupnew/>}/>
            <Route path='/login' element={<LoginNew/>}/>
            <Route path='/sports' element={<Sportpage/>}/>
            <Route path='/matches' element={<Matches/>}/> 
            <Route path='/cricket' element={<Cricket/>}/>
            <Route path='/uploadscore' element={<Allsports/>}/>
            <Route path='/scoreboard' element={<Scoreboard/>}/>
            <Route path='/article' element={<Article/>}/>
            <Route path='/livescore' element={<LiveScore/>}/>
            <Route path='/AboutPage' element={<AboutSection />} />      
       </Routes>
     
    </>
  )
}

export default App
