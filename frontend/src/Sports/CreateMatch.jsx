import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import LiveScore from "../component/LiveComponent";
import { Calendar, Clock, Users } from "lucide-react"

const sportsOptions = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"];

const CreateMatch = () => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState("basketball");
  const [status, setStatus] = useState("upcoming");
  const [matchId, setMatchId] = useState(null);
  const [loading, setLoading] = useState("true");

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
  return (

 <div className="space-y-5">
    <div className="space-y-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teamA" className="block text-green-800 font-medium mb-1">
              Team A
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <input
                id="teamA"
                name="teamA"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
                placeholder="Enter team A name"
                className="w-full pl-10 border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="teamB" className="block text-green-800 font-medium mb-1">
              Team B
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <input
                id="teamB"
                name="teamB"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
                placeholder="Enter team B name"
                className="w-full pl-10 border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-green-800 font-medium mb-1">
              Match Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4 z-10" />
              <DatePicker
                selected={matchDate}
                onChange={(date) => setMatchDate(date)}
                dateFormat="MMMM d, yyyy"
                className="w-full pl-10 border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-green-800 font-medium mb-1">
              Start Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4 z-10" />
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full pl-10 border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-green-800 font-medium mb-1">
            Initial Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-white border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md `}
      onClick={handleCreateMatch}
      >
        Create Match
        
      </button> 

      {selectedSport !=='cricket' && status === "live" && matchId && (
        <LiveScore sport={selectedSport} matchId={matchId} />
      )}

      {/* {selectedSport === 'cricket' && status === 'live' && matchId && (
        <CricketLive matchId={matchId}/>
      )} */}
      </div>
  );
};

export default CreateMatch;
