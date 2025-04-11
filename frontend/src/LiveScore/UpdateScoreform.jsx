"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Activity, AlertCircle, PlusCircle, MinusCircle } from "lucide-react"

const UpdateScoreForm = ({ matches, selectedSport, onSportChange }) => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [matchData, setMatchData] = useState(null)

  const SPORTS = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"]

  useEffect(() => {
    if (selectedMatch) {
      fetchMatchDetails(selectedMatch)
    }
  }, [selectedMatch])

  const fetchMatchDetails = async (matchId) => {
    try {
      const res = await axios.get(`/api/livescore/${matchId}`)
      setMatchData(res.data)
    } catch (error) {
      console.error("Error fetching match details:", error)
    }
  }

  const handleSportChange = (e) => {
    const sport = e.target.value
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

      <div>
        <label htmlFor="matchId" className="block text-green-800 font-medium mb-1">
          Select Match
        </label>
        <select
          id="matchId"
          value={selectedMatch || ""}
          onChange={handleMatchChange}
          className="w-full bg-white border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
        >
          <option value="">-- Select a match --</option>
          {matches.map((match) => (
            <option key={match.id || match._id} value={match.id || match._id}>
              {match.teamA} vs {match.teamB}
            </option>
          ))}
        </select>
      </div>

      {matchData && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-500 font-medium">LIVE</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <p className="font-semibold text-lg text-green-800">{matchData.teamA}</p>
              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={() => decrement("A")}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  disabled={loading}
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="mx-3 text-2xl font-bold">{matchData.scoreA}</span>
                <button
                  onClick={() => increment("A")}
                  className="text-green-600 hover:text-green-800 focus:outline-none"
                  disabled={loading}
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="px-4">
              <span className="text-green-600 font-medium">VS</span>
            </div>

            <div className="text-center flex-1">
              <p className="font-semibold text-lg text-green-800">{matchData.teamB}</p>
              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={() => decrement("B")}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  disabled={loading}
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="mx-3 text-2xl font-bold">{matchData.scoreB}</span>
                <button
                  onClick={() => increment("B")}
                  className="text-green-600 hover:text-green-800 focus:outline-none"
                  disabled={loading}
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="status" className="block text-green-800 font-medium mb-1">
              Match Status
            </label>
            <input
              type="text"
              id="status"
              value={matchData.status}
              onChange={handleStatusChange}
              className="w-full border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. live, halftime, etc."
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateScoreForm
