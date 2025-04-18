import { useEffect, useState } from 'react';
import axios from 'axios';

const POLL_INTERVAL = 2000;

function LiveScore({matchId}) {
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    const res = await axios.get(`/api/livescore/${matchId}`);
    setMatch(res.data);
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(fetchMatch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [matchId]);

  const updateScore = async (newData) => {
    await axios.post(`/admin/live/${matchId}`, newData);
    fetchMatch(); // Optimistic update
  };

  const increment = (team) => {
    if (!match) return;
    const updated = {
      scoreA: team === 'A' ? match.scoreA + 1 : match.scoreA,
      scoreB: team === 'B' ? match.scoreB + 1 : match.scoreB,
      status: match.status
    };
    updateScore(updated);
  };

  const decrement = (team) => {
    if (!match) return;
    const updated = {
      scoreA: team === 'A' ? Math.max(0, match.scoreA - 1) : match.scoreA,
      scoreB: team === 'B' ? Math.max(0, match.scoreB - 1) : match.scoreB,
      status: match.status
    };
    updateScore(updated);
  };

  const handleStatusChange = (e) => {
    if (!match) return;
    updateScore({ ...match, status: e.target.value });
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      {match ? (
        <>
          <h2 className="text-xl font-bold mb-2">Live Score</h2>
          <p>{match.teamA} {match.scoreA} - {match.teamB} {match.scoreB}</p>
          <p>Status: {match.status}</p>

            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Admin Panel</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => increment('A')} className="btn">+ Team A</button>
                <button onClick={() => decrement('A')} className="btn">- Team A</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => increment('B')} className="btn">+ Team B</button>
                <button onClick={() => decrement('B')} className="btn">- Team B</button>
              </div>
              <input
                type="text"
                value={match.status}
                onChange={handleStatusChange}
                className="input"
              />
            </div>
        </>
      ) : (
        <p>Loading match data...</p>
      )}
    </div>
  );
}

export default LiveScore;
