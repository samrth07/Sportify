import { useState, useEffect } from "react";
import axios from "axios";
import { Activity, PlusCircle, MinusCircle } from "lucide-react"

const POLL_INTERVAL = 5000;

function LiveScore({ sport, matchId }) {
  const [match, setMatch] = useState({});

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
    const res = await axios.put(`http://localhost:3000/creator/live/${sport}?matchId=${matchId}`, newData);
    console.log(res);
    fetchMatch();
  };

  const increment = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === "A" ? match.teamAGoals + 1 : match.teamAGoals,
      teamBGoals: team === "B" ? match.teamBGoals + 1 : match.teamBGoals,
    };
    updateScore(updated);
    alert("score updated succesfully");
  };

  const decrement = (team) => {
    if (!match) return;
    const updated = {
      teamAGoals: team === "A" ? Math.max(0, match.teamAGoals - 1) : match.teamAGoals,
      teamBGoals: team === "B" ? Math.max(0, match.teamBGoals - 1) : match.teamBGoals,
    };
    updateScore(updated);
  };

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center justify-center mb-2">
      <Activity className="h-5 w-5 text-red-500 mr-2" />
      <span className="text-red-500 font-medium">LIVE</span>
    </div>

    <div className="flex justify-between items-center mb-4">
      <div className="text-center flex-1">
        <p className="font-semibold text-lg text-green-800">{match.teamA}</p>
        <div className="flex items-center justify-center mt-2">
          <button
            onClick={() => decrement("A")}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <MinusCircle className="h-6 w-6" />
          </button>
          <span className="mx-3 text-2xl font-bold">{match.teamAGoals}</span>
          <button
            onClick={() => increment("A")}
            className="text-green-600 hover:text-green-800 focus:outline-none"
          >
            <PlusCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="px-4">
        <span className="text-green-600 font-medium">VS</span>
      </div>

      <div className="text-center flex-1">
        <p className="font-semibold text-lg text-green-800">{match.teamB}</p>
        <div className="flex items-center justify-center mt-2">
          <button
            onClick={() => decrement("B")}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <MinusCircle className="h-6 w-6" />
          </button>
          <span className="mx-3 text-2xl font-bold">{match.teamBGoals}</span>
          <button
            onClick={() => increment("B")}
            className="text-green-600 hover:text-green-800 focus:outline-none"
          >
            <PlusCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div className="mt-4">
      <p className="block text-green-800 font-medium mb-1">
        Match Status
      </p>
      <input
        type="text"
        id="status"
        value={match.match.status}
        className="w-full border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="e.g. live, halftime, etc."
      />
    </div>
  </div>
  );
}

export default LiveScore;