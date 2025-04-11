import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      <div className="navbar flex justify-around h-16 items-center text-2xl bg-blue-400">
        <div className='text-3xl'>Webstart</div>
        <div className='flex justify-around gap-24'>
          <div className='flex justify-center gap-16 list-none font-bold'>
            <Link to={"/"} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'>Home</Link>
            <Link to={'/about'} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'>About</Link>
            <Link to={'/sportAarya'} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'>Sport</Link>
          </div>

          <div className='flex justify-between gap-6 list-none font-bold'>
            {isLoggedIn ? (
              <>
                <FaUserCircle size={32} className="mt-1 cursor-pointer" />
                <button onClick={logout} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-red-300'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={'/signup'} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-amber-300'>Signup</Link>
                <Link to={'/login'} className='hover:border-2 border-solid rounded-3xl h-10 w-28 text-center hover:bg-gradient-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008]'>Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
