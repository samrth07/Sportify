import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import LiveScore from "../component/LiveComponent";

const sportsOptions = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"];

const CreateMatch = () => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState("basketball");
  const [status, setStatus] = useState("upcoming");
  const [matchId, setMatchId] = useState(null);

  const handleCreateMatch = async () => {
    const body = {
      teamA,
      teamB,
      status,
      date: matchDate.toISOString(),
      startTime: startTime.toISOString(),
    };

    try {
      const res = await axios.post(`http://localhost:3000/admin/${selectedSport}`, body);
      const newMatchId = res.data.matchId;
      setMatchId(newMatchId);
      alert(res.data.message || "Match created");
    } catch (error) {
      console.error(error);
      alert("Error creating match");
    }
  };

  const getLiveMatches = async() => {
    const matches = await axios.get(`http://localhost:3000/creator/live/${selectedSport}`);
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Create Match</h2>

      <label className="block mb-1">Sport</label>
      <select
        className="w-full border p-2 mb-4 rounded"
        value={selectedSport}
        onChange={(e) => setSelectedSport(e.target.value)}
      >
        {sportsOptions.map((sport) => (
          <option key={sport} value={sport}>{sport}</option>
        ))}
      </select>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Team A"
        value={teamA}
        onChange={(e) => setTeamA(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="Team B"
        value={teamB}
        onChange={(e) => setTeamB(e.target.value)}
      />

      <label className="block mb-1">Match Date</label>
      <DatePicker
        selected={matchDate}
        onChange={(date) => setMatchDate(date)}
        dateFormat="MMMM d, yyyy"
        className="border p-2 rounded mb-4 w-full"
      />

      <label className="block mb-1">Start Time</label>
      <DatePicker
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="border p-2 rounded mb-4 w-full"
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="live || upcoming || completed"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCreateMatch}
      >
        Create Match
      </button>


      {selectedSport !=='cricket' && status === "live" && matchId && (
        <LiveScore sport={selectedSport} matchId={matchId} />
      )}

      {selectedSport === 'cricket' && status === 'live' && matchId && (
        <cricketLive matchId={matchId}/>
      )}
    </div>
  );
};

export default CreateMatch;
