import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, MinusCircle, Activity } from "lucide-react";

const UpdateLive = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedSport, setSelectedSport] = useState("basketball");

  const sportsOptions = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"];

  // 🟢 Fetch function placed outside useEffect so it's reusable
  const fetchMatches = async (sport) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/creator/live/filter/${sport}`);
      setMatches(res.data.matches);
    } catch (err) {
      console.error("Error fetching live matches", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Fetch matches on initial render and whenever sport changes
  useEffect(() => {
    fetchMatches(selectedSport);
  }, [selectedSport]);

  const handleInputChange = (matchId, field, value) => {
    setMatches((prev) =>
      prev.map((match) =>
        match._id === matchId ? { ...match, [field]: Number(value) } : match
      )
    );
  };

  const handleUpdate = async (matchId, teamAGoals, teamBGoals) => {
    setUpdatingId(matchId);
    try {
      await axios.put(`http://localhost:3000/creator/live/${selectedSport}?matchId=${matchId}`, {
        teamAGoals,
        teamBGoals,
      });
      alert("Score updated successfully!");
    } catch (error) {
      console.error("Error updating match:", error);
      alert("Failed to update score");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="p-4 text-gray-700">Loading live {selectedSport} matches...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Sport Selection Dropdown */}
      <div>
        <label htmlFor="sport" className="block text-green-800 font-medium mb-1">
          Sport
        </label>
        <select
          id="sport"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="w-full bg-white border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
        >
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Live Match Cards */}
      {matches.map((match) => (
        <div key={match._id} className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-4">
          <div className="flex items-center justify-center text-red-500 font-medium">
            <Activity className="h-5 w-5 mr-2" />
            LIVE
          </div>

          <div className="flex justify-between items-center">
            {/* Team A */}
            <div className="text-center flex-1">
              <p className="font-semibold text-lg text-green-800">{match.teamA}</p>
              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={() =>
                    handleInputChange(match._id, "teamAGoals", match.teamAGoals - 1)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="mx-3 text-2xl font-bold">{match.teamAGoals}</span>
                <button
                  onClick={() =>
                    handleInputChange(match._id, "teamAGoals", match.teamAGoals + 1)
                  }
                  className="text-green-600 hover:text-green-800"
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* VS */}
            <div className="px-4 text-green-600 font-medium">VS</div>

            {/* Team B */}
            <div className="text-center flex-1">
              <p className="font-semibold text-lg text-green-800">{match.teamB}</p>
              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={() =>
                    handleInputChange(match._id, "teamBGoals", match.teamBGoals - 1)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="mx-3 text-2xl font-bold">{match.teamBGoals}</span>
                <button
                  onClick={() =>
                    handleInputChange(match._id, "teamBGoals", match.teamBGoals + 1)
                  }
                  className="text-green-600 hover:text-green-800"
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Match Status */}
          <div>
            <label htmlFor={`status-${match._id}`} className="block text-green-800 font-medium mb-1">
              Match Status
            </label>
            <input
              type="text"
              id={`status-${match._id}`}
              value={match.status}
              onChange={(e) => handleInputChange(match._id, "status", e.target.value)}
              className="w-full border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. live, halftime, etc."
            />
          </div>

          {/* Update Button */}
          <button
            onClick={() => handleUpdate(match._id, match.teamAGoals, match.teamBGoals)}
            disabled={updatingId === match._id}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {updatingId === match._id ? "Updating..." : "Update Score"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateLive;
