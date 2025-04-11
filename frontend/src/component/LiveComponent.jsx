import { useEffect, useState } from 'react';
import axios from 'axios';

const POLL_INTERVAL = 5000;

function LiveScore({ matchId }) {
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    const res = await axios.get(`/creator/live/football?matchId=${matchId}`);
    setMatch(res.data);
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(fetchMatch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [matchId]);

  const updateScore = async (newData) => {
    await axios.put(`/creator/live/football?matchId=${matchId}`, newData);
    fetchMatch(); // Optimistic update
  };

  const increment = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === 'A' ? match.teamAGoals + 1 : match.teamAGoals,
      teamBGoals: team === 'B' ? match.teamBGoals + 1 : match.teamBGoals,
    };
    updateScore(updated);
  };

  const decrement = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === 'A' ? Math.max(0, match.teamAGoals - 1) : match.teamAGoals,
      teamBGoals: team === 'B' ? Math.max(0, match.teamBGoals - 1) : match.teamBGoals,
    };
    updateScore(updated);
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      {match ? (
        <>
          <h2 className="text-xl font-bold mb-2">Live Score</h2>
          <p>{match.teamA} {match.teamAGoals} - {match.teamB} {match.teamBGoals}</p>
          <p>Status: {match.status}</p>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Admin Panel</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => increment('A')} className="bg-green-300 hover btn">+ Team A</button>
              <button onClick={() => decrement('A')} className="point bg-red-300 btn">- Team A</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => increment('B')} className="btn bg-green-300">+ Team B</button>
              <button onClick={() => decrement('B')} className="btn bg-red-300">- Team B</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading match data...</p>
      )}
    </div>
  );
}

export default LiveScore;