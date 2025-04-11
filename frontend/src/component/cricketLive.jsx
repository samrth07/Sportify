import { useState, useEffect } from "react";
import axios from "axios";

const POLL_INTERVAL = 5000;

function CricketLiveScore({ matchId }) {
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    const res = await axios.get(`http://localhost:3000/creator/live/cricket?matchId=${matchId}`);
    console.log(res);
    setMatch(res.data);
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(fetchMatch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [matchId]);

  const updateScore = async (newData) => {
    await axios.put(`http://localhost:3000/creator/live/crciket?matchId=${matchId}`, newData);
    fetchMatch();
  };

  const increment = (team) => {
    if (!match) return;
    const updated = {
      teamARuns: team === "A" ? match.match.teamARuns + 1 : match.match.teamARuns,
      teamBRuns: team === "B" ? match.match.teamBRuns + 1 : match.match.teamBRuns,
      teamAWickets: team === 'A' ? match.match.teamAWickets + 1 : match.match.teamAWickets,
      teamBWickets: team === 'B' ? match.match.teamBWickets + 1 : match.match.teamBWickets,
    };
    updateScore(updated);
  };

  const decrement = (team) => {
    if (!match) return;
    const updated = {
      teamARuns: team === "A" ? Math.max(0, match.match.teamARuns - 1) : match.match.teamARuns,
      teamBRuns: team === "B" ? Math.max(0, match.match.teamBRuns - 1) : match.match.teamBRuns,
      teamAWickets: team === "A" ? Math.max(0, match.match.teamAWickets - 1) : match.match.teamAWickets,
      teamBWickets: team === "B" ? Math.max(0, match.match.teamBWickets - 1) : match.match.teamBWickets,
    };
    updateScore(updated);
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      {match ? (
        <>
          <h2 className="text-xl font-bold mb-2">Live Score</h2>
          <p>
            {match.match.teamA} {match.match.teamARuns} / {match.match.teamAWickets} - {match.match.teamBRuns} / {match.match.teamBWickets}
          </p>
          <p>Status: {match.match.status}</p>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Admin Panel</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => increment("A")} className="bg-green-300 btn">+ Team A </button>
              <button onClick={() => decrement("A")} className="bg-red-300 btn">- Team A</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => increment("B")} className="bg-green-300 btn">+ Team B</button>
              <button onClick={() => decrement("B")} className="bg-red-300 btn">- Team B</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading match data...</p>
      )}
    </div>
  );
}

export default CricketLiveScore;