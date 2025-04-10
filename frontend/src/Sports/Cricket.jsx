import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cricketcard from './Cricketcard';

const Cricket = () => {
 
  const sport = 'Cricket';

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/matches/Cricket`);
        setMatches(res.data); // should include status field
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [sport]);

  if (loading) return <div className="text-center mt-10">Loading {sport} matches...</div>;
  return (
    <div>
          <div className="p-4">
              <h2 className="text-3xl font-bold text-center mb-6">{sport} Matches</h2>
              <Cricketcard matches={matches} />
            </div>
      
    </div>
  )
}

export default Cricket
