import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, MinusCircle, Activity } from "lucide-react";

const UpdateLive = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedSport, setSelectedSport] = useState("basketball");

  const token = JSON.parse(localStorage.getItem("user"));

  const sportsOptions = [
    "basketball",
    "football",
    "kabaddi",
    "cricket",
    "carrom",
    "badminton",
  ];

  /* ================= FETCH MATCHES ================= */
  const fetchMatches = async (sport) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/creator/live/filter/${sport}`
      );
      setMatches(res.data.matches || []);
    } catch (err) {
      console.error("Error fetching live matches", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(selectedSport);
  }, [selectedSport]);

  /* ================= SCORE CHANGE ================= */
  const updateScoreLocal = (matchId, field, delta) => {
    setMatches((prev) =>
      prev.map((match) =>
        match._id === matchId
          ? {
              ...match,
              [field]: Math.max(0, (match[field] || 0) + delta),
            }
          : match
      )
    );
  };

  /* ================= STATUS CHANGE ================= */
  const updateStatusLocal = (matchId, value) => {
    setMatches((prev) =>
      prev.map((match) =>
        match._id === matchId ? { ...match, status: value } : match
      )
    );
  };

  /* ================= UPDATE TO BACKEND ================= */
  const handleUpdate = async (match) => {
    setUpdatingId(match._id);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/creator/live/${selectedSport}/${match._id}`,
        {
          teamAPoint: match.teamAPoint,
          teamBPoint: match.teamBPoint,
          status: match.status,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Score updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update score");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <p className="p-4 text-gray-700">
        Loading live {selectedSport} matches...
      </p>
    );

  return (
    <div className="p-6 space-y-6">
      {/* ================= SPORT SELECT ================= */}
      <div className="max-w-150 mb-10">
        <label className="block text-green-800 font-medium mb-1">
          Sport
        </label>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="w-full bg-white border border-green-200 rounded-md py-2 px-3"
        >
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ================= MATCH CARDS ================= */}
      <div className="grid grid-cols-2 gap-6">
        {matches.map((match) => (
          <div
            key={match._id}
            className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-4"
          >
            <div className="flex justify-center items-center text-red-500 font-medium">
              <Activity className="h-5 w-5 mr-2" /> LIVE
            </div>

            <div className="flex justify-between items-center">
              {/* TEAM A */}
              <div className="text-center flex-1">
                <p className="font-semibold text-lg">{match.teamA}</p>
                <div className="flex justify-center items-center mt-2">
                  <button
                    onClick={() =>
                      updateScoreLocal(match._id, "teamAPoint", -1)
                    }
                  >
                    <MinusCircle />
                  </button>
                  <span className="mx-3 text-2xl font-bold">
                    {match.teamAPoint}
                  </span>
                  <button
                    onClick={() =>
                      updateScoreLocal(match._id, "teamAPoint", 1)
                    }
                  >
                    <PlusCircle />
                  </button>
                </div>
              </div>

              <div className="px-4 font-medium text-green-700">VS</div>

              {/* TEAM B */}
              <div className="text-center flex-1">
                <p className="font-semibold text-lg">{match.teamB}</p>
                <div className="flex justify-center items-center mt-2">
                  <button
                    onClick={() =>
                      updateScoreLocal(match._id, "teamBPoint", -1)
                    }
                  >
                    <MinusCircle />
                  </button>
                  <span className="mx-3 text-2xl font-bold">
                    {match.teamBPoint}
                  </span>
                  <button
                    onClick={() =>
                      updateScoreLocal(match._id, "teamBPoint", 1)
                    }
                  >
                    <PlusCircle />
                  </button>
                </div>
              </div>
            </div>

            {/* STATUS */}
            <input
              value={match.status || ""}
              onChange={(e) =>
                updateStatusLocal(match._id, e.target.value)
              }
              placeholder="Match status"
              className="w-full border rounded px-3 py-2"
            />

            {/* UPDATE BUTTON */}
            <button
              onClick={() => handleUpdate(match)}
              disabled={updatingId === match._id}
              className={`w-full py-2 rounded text-white ${
                updatingId === match._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {updatingId === match._id ? "Updating..." : "Update Score"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateLive;
