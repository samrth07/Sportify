import React from 'react'
import { Link } from 'react-router-dom'
import CreateMatch from './createMatch'
import LiveScore from './createMatch';


const Sportpage = () => {
  return (
    <div className="min-h-[92vh] bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 drop-shadow">Choose a Sport</h2>

      <ul className="grid grid-cols-3 grid-rows-2 gap-6 max-w-4xl mx-auto">
        <Link
          to={'/cricket'}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
          id="criket"
        >
          Cricket
        </Link>

        <Link
          to={'/matches'}
          state={{ sport: 'kabaddi' }}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
        >
          Kabaddi
        </Link>

        <Link
          to={'/matches'}
          state={{ sport: 'football' }}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
        >
          Football
        </Link>

        <Link
          to={'/matches'}
          state={{ sport: 'badminton' }}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
        >
          Badminton
        </Link>

        <Link
          to={'/matches'}
          state={{ sport: 'carrom' }}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
        >
          Carrom
        </Link>

        <Link
          to={'/matches'}
          state={{ sport: 'basketball' }}
          className="bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-xl font-semibold rounded-xl shadow-md flex items-center justify-center h-32"
        >
          Basketball
        </Link>
      </ul>

    <Link to={'/login'} className=' flex justify-center'>
    <div className='text-4xl font-bold  mt-24 flex justify-center border-2 to-black rounded-3xl h-20 p-3 bg-amber-300'>
        <p>Create/Update Matches</p>
      </div></Link>
      <CreateMatch/>
    </div>
  )
}

export default Sportpage
