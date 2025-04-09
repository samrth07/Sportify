import React from 'react'
import { Link } from 'react-router-dom'

const Spcard = () => {



  return (
    <div>
                <ul className='grid grid-cols-3 grid-rows-2 h-[92vh]   gap-4 mt-2'>
                    <Link to={'/matches'} state={{ sport: 'Cricket' }} className='bg-amber-300' id='criket'>Cricket</Link>
                    <Link to={'/matches'} state={{ sport: 'Kabaddi' }} className='bg-amber-300' >Kabaddi</Link>
                    <Link to={'/matches'} state={{ sport: 'Football' }} className='bg-amber-300'>Football</Link>
                    <Link to={'/matches'} state={{ sport: 'Badminton' }} className='bg-amber-300'>Badminton</Link>
                    <Link to={'/matches'} state={{ sport: 'Carrom' }} className='bg-amber-300'>Carrom</Link>
                    <Link to={'/matches'} state={{ sport: 'Basketball' }} className='bg-amber-300'>Basketball</Link>
                </ul>
    </div>
  )
}

export default Spcard
