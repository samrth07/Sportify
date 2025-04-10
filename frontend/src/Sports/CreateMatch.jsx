import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const sportsOptions = [
  "basketball",
  "football",
  "kabaddi",
  "cricket",
  "carrom",
  "badminton",
];

const CreateMatch = () => {


  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState("basketball");

  const handleCreateMatch = async () => {
    const body = {
      teamA,
      teamB,
      date: matchDate.toISOString(), // ensures JSON Date format
      startTime: startTime.toISOString() 
    };

    try {
      const res = await axios.post(`http://localhost:3000/admin/${selectedSport}`, body);
      console.log(res)
      alert(res.data.message);
      // const id = res.data.matchId;
    } catch (error) {
      alert("Error creating match");
    }
  };

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
          <option key={sport} value={sport}>
            {sport}
          </option>
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

      
      <DatePicker
        selected={matchDate}
        onChange={(date) => setMatchDate(date)}
        dateFormat="MMMM d, yyyy"
        className="border p-2 rounded"
      />

      <DatePicker
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="border p-2 rounded"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCreateMatch}
      >
        Create Match
      </button>
    </div>
  );
};

export default CreateMatch;
