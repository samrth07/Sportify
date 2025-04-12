"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Activity, AlertCircle, PlusCircle, MinusCircle } from "lucide-react"

const UpdateScoreForm = ({ matches, selectedSport, onSportChange }) => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [matchData, setMatchData] = useState(null)
  const [sport , setsport] = useState('kabaddi')

  const SPORTS = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"]

  useEffect(() => {
    if (selectedMatch) {
      fetchMatchDetails(selectedMatch)
    }
  }, [selectedMatch])

  const fetchMatchDetails = async (matchId) => {
    try {
      const res = await axios.get(`http://localhost:3000/creator/${sport}`)
      setMatchData(res.data)
      console.log("from the form data : "+res)
    } catch (error) {
      console.error("Error fetching match details:", error)
    }
  }

  const handleSportChange = (e) => {
    const sport = e.target.value
    setsport(sport)
    onSportChange(sport)
    setSelectedMatch(null)
    setMatchData(null)
  }

  const handleMatchChange = (e) => {
    setSelectedMatch(e.target.value)
  }

  const updateScore = async (newData) => {
    setLoading(true)
    try {
      await axios.post(`/admin/live/${selectedMatch}`, newData)
      fetchMatchDetails(selectedMatch) // Refresh data
    } catch (error) {
      console.error("Error updating score:", error)
    } finally {
      setLoading(false)
    }
  }

  const increment = (team) => {
    if (!matchData) return
    const updated = {
      scoreA: team === "A" ? matchData.scoreA + 1 : matchData.scoreA,
      scoreB: team === "B" ? matchData.scoreB + 1 : matchData.scoreB,
      status: matchData.status,
    }
    updateScore(updated)
  }

  const decrement = (team) => {
    if (!matchData) return
    const updated = {
      scoreA: team === "A" ? Math.max(0, matchData.scoreA - 1) : matchData.scoreA,
      scoreB: team === "B" ? Math.max(0, matchData.scoreB - 1) : matchData.scoreB,
      status: matchData.status,
    }
    updateScore(updated)
  }

  const handleStatusChange = (e) => {
    if (!matchData) return
    updateScore({ ...matchData, status: e.target.value })
  }

  if (matches.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start">
        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
        <p className="text-amber-700">
          No live matches available. Host a match and set its status to "live" to update scores.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="sport" className="block text-green-800 font-medium mb-1">
          Sport
        </label>
        <select
          id="sport"
          value={selectedSport}
          onChange={handleSportChange}
          className="w-full bg-white border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
      </div>

      

    </div>
  )
}

export default UpdateScoreForm
