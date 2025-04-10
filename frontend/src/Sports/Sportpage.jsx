import React from 'react'
import { Link } from 'react-router-dom'

const Sportpage = () => {



  return (
    <div>
                <ul className='grid grid-cols-3 grid-rows-2 h-[92vh]   gap-4 mt-2'>

                    <Link to={'/cricket'} className='bg-amber-300' id='criket'>Cricket</Link>
                    <Link to={'/matches'} state={{ sport: 'kabaddi' }} className='bg-amber-300' >Kabaddi</Link>
                    <Link to={'/matches'} state={{ sport: 'football' }} className='bg-amber-300'>Football</Link>
                    <Link to={'/matches'} state={{ sport: 'badminton' }} className='bg-amber-300'>Badminton</Link>
                    <Link to={'/matches'} state={{ sport: 'carrom' }} className='bg-amber-300'>Carrom</Link>
                    <Link to={'/matches'} state={{ sport: 'basketball' }} className='bg-amber-300'>Basketball</Link>
                    
                </ul>
    </div>
  )
}

export default Sportpage
