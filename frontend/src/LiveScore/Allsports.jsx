"use client"

import { useState, useEffect } from "react"
import { Trophy, Activity, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react"
import axios from "axios"
import CreateMatch from "../Sports/createMatch"
import UpdateLive from "../component/updateLive"

export default function SportsManagementPage() {
  const [matches, setMatches] = useState([])
  const [liveMatches, setLiveMatches] = useState([])
  const [activeTab, setActiveTab] = useState("host-match")
  const [selectedSport, setSelectedSport] = useState("basketball")
  const [createdMatchId, setCreatedMatchId] = useState(null)

  // Fetch matches on component mount and when sport changes
  useEffect(() => {
    fetchMatches()
  }, [selectedSport])

  const fetchMatches = async () => {
    try {
      // Fetch all matches for the selected sport
      const response = await axios.get(`http://localhost:3000/creator/cricket`)
      // Ensure matches is an array
      setMatches(Array.isArray(response.data.match) ? response.data.match : [])
      // Fetch live matches for the selected sport
      const liveResponse = await axios.get(`/creator/live/${selectedSport}`)
      // Ensure liveMatches is an array
      setLiveMatches(Array.isArray(liveResponse.data) ? liveResponse.data : [])
    } catch (error) {
      console.error("Failed to fetch matches:", error)
      // Set empty arrays on error
      setMatches([])
      setLiveMatches([])
    }
  }

  // Add a safety check before filtering
  // Filter matches based on status
  const upcomingMatches = Array.isArray(matches) ? matches.filter((match) => match.status === "upcoming") : []
  const completedMatches = Array.isArray(matches) ? matches.filter((match) => match.status === "completed") : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-12">
          <div className="bg-green-500 p-3 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 text-center">Sports Management</h1>
        </div>

        <div className="w-full">
          <div className="grid w-full grid-cols-2 mb-8 border-b">
            <button
              onClick={() => setActiveTab("host-match")}
              className={`flex items-center justify-center gap-2 py-3 px-4 ${
                activeTab === "host-match"
                  ? "border-b-2 border-green-500 text-green-800 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="h-5 w-5" />
              Host Match
            </button>
            <button
              onClick={() => setActiveTab("update-score")}
              className={`flex items-center justify-center gap-2 py-3 px-4 ${
                activeTab === "update-score"
                  ? "border-b-2 border-green-500 text-green-800 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Activity className="h-5 w-5" />
              Update Score
            </button>
          </div>

          <div className=" justify-center items-center">
            <div className="md:col-span-1 lg:col-span-2">
              {activeTab === "host-match" ?
                <div className= "max-w-200 gap-8 border border-green-100 rounded-lg shadow-lg overflow-hidden w-full">
                  <div className="bg-green-500 py-4 px-6">
                    <h2 className="text-xl font-bold text-white">Host a New Match</h2>
                  </div>
                  <div className="p-6">
                    <CreateMatch />
                  </div>
                </div> :
              <UpdateLive/>
              }
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div>
                <div className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {activeTab === "host-match" && (
                      <>
                        {liveMatches.length > 0 && (
                          <div className="p-4 border-b border-green-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                              <Activity className="h-5 w-5 mr-2 text-green-500" />
                              Live Matches
                            </h3>
                            <div className="space-y-3">
                              {liveMatches.map((match) => (
                                <MatchCard key={match.id || match._id} match={match} />
                              ))}
                            </div>
                          </div>
                        )}

                        {upcomingMatches.length > 0 && (
                          <div className="p-4 border-b border-green-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                              <Calendar className="h-5 w-5 mr-2 text-green-500" />
                              Upcoming Matches
                            </h3>
                            <div className="space-y-3">
                              {upcomingMatches.map((match) => (
                                <MatchCard key={match.id || match._id} match={match} />
                              ))}
                            </div>
                          </div>
                        )}

                        {completedMatches.length > 0 && (
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                              Completed Matches
                            </h3>
                            <div className="space-y-3">
                              {completedMatches.map((match) => (
                                <MatchCard key={match.id || match._id} match={match} />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Live</span>
      case "upcoming":
        return <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Upcoming</span>
      case "completed":
        return <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>
      default:
        return null
    }
  }

  return (
    <div className="border border-green-100 hover:border-green-300 transition-colors rounded-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">{match.sport}</span>
          {getStatusBadge(match.status)}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-3">
          <div className="flex-1 text-center mb-2 sm:mb-0">
            <p className="font-bold text-lg text-green-800">{match.teamA}</p>
            {match.scoreA !== undefined && <p className="text-xl font-bold">{match.scoreA}</p>}
          </div>

          <div className="px-4 my-2 sm:my-0">
            <span className="text-gray-400 font-medium">VS</span>
          </div>

          <div className="flex-1 text-center">
            <p className="font-bold text-lg text-green-800">{match.teamB}</p>
            {match.scoreB !== undefined && <p className="text-xl font-bold">{match.scoreB}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-500 justify-center gap-2">
          {match.venue && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{match.venue}</span>
            </div>
          )}
          {match.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(match.date)}</span>
            </div>
          )}
          {match.startTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(match.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
