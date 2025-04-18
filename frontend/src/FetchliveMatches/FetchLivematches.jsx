import axios from 'axios'
import React from 'react'
import { useState , useEffect} from 'react'

const FetchLivematches = () => {
    const [selectedSport, setSelectedSport] = useState("cricket")

    const[livematch , setLiveMatches] = useState([])

    const SPORTS = ["cricket", "carrom", "badminton", "basketball", "kabaddi", "football"]
  
    const handleSportChange = (e) => {
      const chosenSport = e.target.value
      setSelectedSport(chosenSport)
      console.log("Selected Sport:", chosenSport)
      // You can trigger more logic here (like fetching matches, etc.)
    }
  
      useEffect(() => {
        fetchMatch(selectedSport)
      }, [selectedSport])
    
 async function fetchMatch(selectedSport) {
    
    const res = await axios.get(`http://localhost:3000/creator/${selectedSport}`)
    console.log(res);
    setLiveMatches(res.data.match)
    console.log(livematch)
 }


    return (
        <div style={{ padding: "20px" }}>
        <select value={selectedSport} onChange={handleSportChange}>
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
  
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", gap: "16px" }}>
          {livematch.length > 0 ? (
            livematch.map((match, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "250px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{match.match.title || `Match ${index + 1}`}</h3>
                <p>Status: {match.status}</p>
                {match.match.teamA && <p>Team A: {match.match.teamA}</p>}
                {match.match.teamB && <p>Team B: {match.match.teamB}</p>}
                {/* Add more fields based on your match model */}
              </div>
            ))
          ) : (
            <p>No live matches available.</p>
          )}
        </div>
      </div>
    )
}

export default FetchLivematches
