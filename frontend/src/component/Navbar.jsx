import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
            <div className="navbar flex justify-around h-16 items-center text-2xl bg-blue-400 ">
                    <div className='text-3xl'>Webstart</div>
                   <div className='flex justify-around gap-24'>
                   <div className='flex justify-center gap-16 list-none font-bold' >
                        <Link to={"/"} className='hover:border-2  border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300 '>Home</Link>
                        <Link to={'/about'} className='hover:border-2  border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'> About</Link>
                        <Link to={'/sport'} className='hover:border-2  border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'>Sport</Link>
                    </div>
                    <div className='flex justify-between gap-6 list-none font-bold'>
                        <Link to={'/signup'} className='hover:border-2  border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300 '>signup</Link>
                        <Link to={'/login'} className='hover:border-2  border-solid rounded-3xl h-10 w-28 text-center hover:bg-gradient-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008]'>login</Link>
                    </div>
                   </div>
            </div>
    </div>
  )
}




export default Navbar
