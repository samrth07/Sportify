import { useState, useEffect } from "react";
import axios from "axios";

const POLL_INTERVAL = 5000;

function LiveScore({ sport, matchId }) {
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    const res = await axios.get(`http://localhost:3000/creator/live/${sport}?matchId=${matchId}`);
    console.log(res);
    setMatch(res.data);
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(fetchMatch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [matchId]);

  const updateScore = async (newData) => {
    await axios.put(`http://localhost:3000/creator/live/${sport}?matchId=${matchId}`, newData);
    fetchMatch();
  };

  const increment = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === "A" ? match.match.teamAGoals + 1 : match.match.teamAGoals,
      teamBGoals: team === "B" ? match.match.teamBGoals + 1 : match.match.teamBGoals,
    };
    updateScore(updated);
  };

  const decrement = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === "A" ? Math.max(0, match.match.teamAGoals - 1) : match.match.teamAGoals,
      teamBGoals: team === "B" ? Math.max(0, match.match.teamBGoals - 1) : match.match.teamBGoals,
    };
    updateScore(updated);
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      {match ? (
        <>
          <h2 className="text-xl font-bold mb-2">Live Score</h2>
          <p>
            {match.match.teamA} {match.match.teamAGoals} - {match.match.teamB} {match.match.teamBGoals}
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

export default LiveScore;