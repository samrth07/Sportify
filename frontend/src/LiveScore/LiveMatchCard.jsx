"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Activity, PlusCircle, MinusCircle } from "lucide-react"

const POLL_INTERVAL = 5000

const LiveMatchCard = ({ matchId, selectedSport }) => {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchMatch = async () => {
    try {
      console.log(matchId);
      const res = await axios.get(`http://localhost:3000/creator/live/basketball?${matchId}`)
      console.log(res);
      setMatch(res.data)
    } catch (error) {
      console.error("Error fetching match:", error)
    }
  }

  useEffect(() => {
    fetchMatch()
    const interval = setInterval(fetchMatch, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [matchId])

  const updateScore = async (newData) => {
    setLoading(true)
    try {
      const res = await axios.put(`http://localhost:3000/creator/live/basketball/?${matchId}`, newData);
      console.log(res);
      fetchMatch() // Optimistic update
    } catch (error) {
      console.error("Error updating score:", error)
    } finally {
      setLoading(false)
    }
  }

  const increment = (team) => {
    if (!match) return
    const updated = {
      scoreA: team === "A" ? match.teamAGoals + 1 : match.teamAGoals,
      scoreB: team === "B" ? match.teamBGoals + 1 : match.teamBGoals,
      status: match.status,
    }
    updateScore(updated)
  }

  const decrement = (team) => {
    if (!match) return
    const updated = {
      scoreA: team === "A" ? Math.max(0, match.teamAGoals - 1) : match.teamAGoals,
      scoreB: team === "B" ? Math.max(0, match.teamBGoals - 1) : match.teamBGoals,
      status: match.status,
    }
    updateScore(updated)
  }

  const handleStatusChange = (e) => {
    if (!match) return
    updateScore({ ...match, status: e.target.value })
  }

  if (!match) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-green-800">Loading match data...</p>
      </div>
    )
  }

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
              disabled={loading}
            >
              <MinusCircle className="h-6 w-6" />
            </button>
            <span className="mx-3 text-2xl font-bold">{match.teamAGoals}</span>
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
          <p className="font-semibold text-lg text-green-800">{match.teamB}</p>
          <div className="flex items-center justify-center mt-2">
            <button
              onClick={() => decrement("B")}
              className="text-red-500 hover:text-red-700 focus:outline-none"
              disabled={loading}
            >
              <MinusCircle className="h-6 w-6" />
            </button>
            <span className="mx-3 text-2xl font-bold">{match.teamBGoals}</span>
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
          value={match.status}
          onChange={handleStatusChange}
          className="w-full border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. live, halftime, etc."
        />
      </div>
    </div>
  )
}

export default LiveMatchCard
