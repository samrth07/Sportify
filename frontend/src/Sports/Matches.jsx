"use client"
import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Trophy, Users, Star, TrendingUp, BarChart2 } from "lucide-react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("live")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const { state } = useLocation();
  const sport = state?.sport || 'Cricket';

  // Match data state
  const [matches, setMatches] = useState({
    live: [],
    upcoming: [],
    completed: [],
  })

  // Stats data
  const [statsData, setStatsData] = useState({
    topScorers: [
      { name: "Rahul Sharma", team: "Computer Science", runs: 245 },
      { name: "Amit Patel", team: "Mechanical Engineering", runs: 198 },
      { name: "Vikram Singh", team: "Information Technology", runs: 187 },
    ],
    topWicketTakers: [
      { name: "Suresh Kumar", team: "Electronics", wickets: 12 },
      { name: "Rajesh Gupta", team: "Civil Engineering", wickets: 10 },
      { name: "Dinesh Yadav", team: "Physics Department", wickets: 8 },
    ],
    recentResults: [
      { team1: "Mathematics", team2: "Biology", result: "Mathematics won by 31 runs" },
      { team1: "Computer Science", team2: "Information Technology", result: "IT won by 5 wickets" },
      { team1: "Civil Engineering", team2: "Electronics", result: "Electronics won by 7 wickets" },
    ],
  })

  // Form state for create match
  const [createForm, setCreateForm] = useState({
    teamA: "",
    teamB: "",
    venue: "",
    date: "",
    startTime: "",
    status: "upcoming",
  })

  // Form state for update score
  const [updateForm, setUpdateForm] = useState({
    matchId: "",
    teamA: "",
    teamB: "",
    teamAGoals: "",
    teamBGoals: "",
    status: "",
    winningTeam: "",
  })

  // Fetch matches from MongoDB
  const fetchMatches = async () => {
    try {
      setLoading(true)
      // Use a relative URL instead of hardcoded localhost
      const response = await axios.get(`http://localhost:3000/matches/${sport}`)

      console.log(response);

      // Organize matches by status
      const liveMatches = response.data.filter((match) => match.status === "live")
      const upcomingMatches = response.data.filter((match) => match.status === "upcoming")
      const completedMatches = response.data.filter((match) => match.status === "completed")

      setMatches({
        live: liveMatches,
        upcoming: upcomingMatches,
        completed: completedMatches,
      })
    } catch (error) {
      console.error("Error fetching matches:", error)
      // More descriptive error message
      setMatches({
        live: [],
        upcoming: [],
        completed: [],
      })
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchMatches()

    // Set up polling for live matches
    const interval = setInterval(() => {
      fetchMatches()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle create form change
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target
    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle create match submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("/api/matches", {
        ...createForm,
        sport: "Cricket",
      })

      // Reset form and fetch updated matches
      setCreateForm({
        teamA: "",
        teamB: "",
        venue: "",
        date: "",
        startTime: "",
        status: "upcoming",
      })

      setShowCreateForm(false)
      fetchMatches()
      alert("Match created successfully!")
    } catch (error) {
      console.error("Error creating match:", error)
      alert("Failed to create match. Please try again.")
    }
  }

  // Handle update score submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`/api/matches/${updateForm.matchId}`, {
        teamAGoals: updateForm.teamAGoals,
        teamBGoals: updateForm.teamBGoals,
        status: updateForm.status,
        winningTeam: updateForm.winningTeam,
      })

      // Reset form and fetch updated matches
      setUpdateForm({
        matchId: "",
        teamA: "",
        teamB: "",
        teamAGoals: "",
        teamBGoals: "",
        status: "",
        winningTeam: "",
      })

      setShowUpdateForm(false)
      fetchMatches()
      alert("Score updated successfully!")
    } catch (error) {
      console.error("Error updating score:", error)
      alert("Failed to update score. Please try again.")
    }
  }

  // Load match details when a match is selected for update
  useEffect(() => {
    if (updateForm.matchId) {
      const allMatches = [...matches.live, ...matches.upcoming, ...matches.completed]
      const selectedMatch = allMatches.find((match) => match._id === updateForm.matchId)

      if (selectedMatch) {
        setUpdateForm((prev) => ({
          ...prev,
          teamA: selectedMatch.teamA,
          teamB: selectedMatch.teamB,
          teamAGoals: selectedMatch.teamAGoals || "",
          teamBGoals: selectedMatch.teamBGoals || "",
          status: selectedMatch.status,
          winningTeam: selectedMatch.winningTeam || "",
        }))
      }
    }
  }, [updateForm.matchId, matches])

  return (
    <div className="cricket-page">
      {/* Cricket Hero Section */}
      <div className="cricket-hero">
        <h1 className="cricket-title">{sport}</h1>
        <div className="scroll-indicator">Scroll to explore</div>
      </div>

      {/* Navigation Tabs */}
      <div className="cricket-tabs">
        <div className="tabs-container">
          <button className={`tab ${activeTab === "live" ? "active" : ""}`} onClick={() => setActiveTab("live")}>
            Live Matches
          </button>
          <button
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <div className="button-container">
            <Link to={'/login'}><button
              className="create-score-btn"
            >
              Create Match
            </button>
            </Link>
           
          </div>
        </div>
      </div>

      {/* Create Match Form */}
      {showCreateForm && (
        <div className="score-form-container">
          <form onSubmit={handleCreateSubmit} className="score-form">
            <h2>Create New Cricket Match</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Team 1</label>
                <input
                  type="text"
                  name="teamA"
                  value={createForm.teamA}
                  onChange={handleCreateFormChange}
                  placeholder="Team 1 Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Team 2</label>
                <input
                  type="text"
                  name="teamB"
                  value={createForm.teamB}
                  onChange={handleCreateFormChange}
                  placeholder="Team 2 Name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={createForm.venue}
                  onChange={handleCreateFormChange}
                  placeholder="Match Venue"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={createForm.date} onChange={handleCreateFormChange} required />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={createForm.startTime}
                  onChange={handleCreateFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={createForm.status} onChange={handleCreateFormChange} required>
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Create Match
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowCreateForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      

      {/* Match Content Based on Active Tab */}
      <div className="matches-container">
        {loading ? (
          <div className="no-matches">Loading matches...</div>
        ) : (
          <>
            {activeTab === "live" && (
              <div className="matches-grid">
                {matches.live.length > 0 ? (
                  matches.live.map((match) => (
                    <div className="match-card live" key={match._id}>
                      <div className="match-header">
                        <span className="live-indicator">LIVE</span>
                        <span className="match-overs">Cricket</span>
                      </div>
                      <div className="match-teams">
                        <div className="team">
                          <span className="team-name">{match.teamA}</span>
                          <span className="team-score">{match.teamAGoals || 0}</span>
                        </div>
                        <div className="vs">VS</div>
                        <div className="team">
                          <span className="team-name">{match.teamB}</span>
                          <span className="team-score">{match.teamBGoals || 0}</span>
                        </div>
                      </div>
                      <div className="match-status">
                        {match.teamAGoals > match.teamBGoals
                          ? `${match.teamA} leads by ${match.teamAGoals - match.teamBGoals} runs`
                          : match.teamBGoals > match.teamAGoals
                            ? `${match.teamB} leads by ${match.teamBGoals - match.teamAGoals} runs`
                            : "Match is tied"}
                      </div>
                      <button className="view-details-btn">View Details</button>
                    </div>
                  ))
                ) : (
                  <div className="no-matches">No live matches at the moment</div>
                )}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="matches-grid">
                {matches.upcoming.length > 0 ? (
                  matches.upcoming.map((match) => (
                    <div className="match-card upcoming" key={match._id}>
                      <div className="match-header">
                        <span className="upcoming-indicator">UPCOMING</span>
                      </div>
                      <div className="match-teams">
                        <div className="team">
                          <span className="team-name">{match.teamA}</span>
                        </div>
                        <div className="vs">VS</div>
                        <div className="team">
                          <span className="team-name">{match.teamB}</span>
                        </div>
                      </div>
                      <div className="match-details">
                        <div className="match-info">
                          <div className="match-info-item">
                            <Calendar className="match-info-icon" size={16} />
                            <span>{new Date(match.date).toLocaleDateString()}</span>
                          </div>
                          <div className="match-info-item">
                            <Clock className="match-info-icon" size={16} />
                            <span>
                              {new Date(match.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="view-details-btn">Set Reminder</button>
                    </div>
                  ))
                ) : (
                  <div className="no-matches">No upcoming matches scheduled</div>
                )}
              </div>
            )}

            {activeTab === "completed" && (
              <div className="matches-grid">
                {matches.completed.length > 0 ? (
                  matches.completed.map((match) => (
                    <div className="match-card completed" key={match._id}>
                      <div className="match-header">
                        <span className="completed-indicator">COMPLETED</span>
                      </div>
                      <div className="match-teams">
                        <div className="team">
                          <span className="team-name">{match.teamA}</span>
                          <span className="team-score">{match.teamAGoals || 0}</span>
                        </div>
                        <div className="vs">VS</div>
                        <div className="team">
                          <span className="team-name">{match.teamB}</span>
                          <span className="team-score">{match.teamBGoals || 0}</span>
                        </div>
                      </div>
                      <div className="match-result">
                        {match.winningTeam === "Draw"
                          ? "Match ended in a draw"
                          : match.winningTeam
                            ? `${match.winningTeam} won the match`
                            : match.teamAGoals > match.teamBGoals
                              ? `${match.teamA} won by ${match.teamAGoals - match.teamBGoals} runs`
                              : `${match.teamB} won by ${match.teamBGoals - match.teamAGoals} runs`}
                      </div>
                      <button className="view-details-btn">View Scorecard</button>
                    </div>
                  ))
                ) : (
                  <div className="no-matches">No completed matches</div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Tournament Stats Section */}
      <div className="tournament-stats">
        <h2 className="stats-title">Tournament Statistics</h2>
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-header">
              <TrendingUp className="stats-icon" />
              <h3>Top Run Scorers</h3>
            </div>
            <ul className="stats-list">
              {statsData.topScorers.map((player, index) => (
                <li key={index} className="stats-item">
                  <div className="stats-rank">{index + 1}</div>
                  <div className="stats-info">
                    <div className="stats-name">{player.name}</div>
                    <div className="stats-team">{player.team}</div>
                  </div>
                  <div className="stats-value">{player.runs} runs</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="stats-card">
            <div className="stats-header">
              <BarChart2 className="stats-icon" />
              <h3>Top Wicket Takers</h3>
            </div>
            <ul className="stats-list">
              {statsData.topWicketTakers.map((player, index) => (
                <li key={index} className="stats-item">
                  <div className="stats-rank">{index + 1}</div>
                  <div className="stats-info">
                    <div className="stats-name">{player.name}</div>
                    <div className="stats-team">{player.team}</div>
                  </div>
                  <div className="stats-value">{player.wickets} wickets</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="stats-card">
            <div className="stats-header">
              <Trophy className="stats-icon" />
              <h3>Recent Results</h3>
            </div>
            <ul className="stats-list">
              {statsData.recentResults.map((result, index) => (
                <li key={index} className="stats-item result-item">
                  <div className="result-teams">
                    {result.team1} vs {result.team2}
                  </div>
                  <div className="result-info">{result.result}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="quick-links-section">
        <div className="quick-links-container">
          <div className="quick-link-card">
            <Users className="quick-link-icon" />
            <h3>Team Rankings</h3>
            <p>View the current standings of all teams in the tournament</p>
            <button className="quick-link-btn">View Rankings</button>
          </div>

          <div className="quick-link-card">
            <Star className="quick-link-icon" />
            <h3>Star Players</h3>
            <p>Check out the performances of the tournament's best players</p>
            <button className="quick-link-btn">View Players</button>
          </div>

          <div className="quick-link-card">
            <Trophy className="quick-link-icon" />
            <h3>Tournament History</h3>
            <p>Explore the rich history of cricket tournaments at Zeal College</p>
            <button className="quick-link-btn">View History</button>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Global Styles */
        * {
        
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .cricket-page {
          width: 100%;
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        /* Cricket Hero Section */
        .cricket-hero {
          position: relative;
          height: 300px;
          background: linear-gradient(rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.3)), url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .cricket-title {
          font-size: 6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
          margin-bottom: 1rem;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        /* Cricket Tabs */
        .cricket-tabs {
          background-color: white;
          padding: 0 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .tabs-container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          overflow-x: auto;
        }

        .tab {
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .tab:hover {
          color: #10b981;
        }

        .tab.active {
          color: #10b981;
          border-bottom-color: #10b981;
        }

        .button-container {
          margin-left: auto;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .create-score-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          align-self: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
        }

        .create-score-btn:hover {
          background-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
        }

        /* Score Form */
        .score-form-container {
          background-color: white;
          padding: 2rem;
          margin: 2rem auto;
          max-width: 1000px;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .score-form h2 {
          margin-bottom: 1.5rem;
          color: #111827;
          font-size: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .form-group {
          flex: 1;
          min-width: 200px;
        }

        .form-group.full-width {
          flex-basis: 100%;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4b5563;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          font-size: 1rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .match-info-display {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
        }

        .match-info-display .team {
          font-weight: 600;
          font-size: 1.25rem;
          color: #111827;
        }

        .match-info-display .vs {
          margin: 0 1rem;
          color: #6b7280;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .submit-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #059669;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-btn {
          background-color: white;
          color: #4b5563;
          border: 1px solid #d1d5db;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background-color: #f3f4f6;
        }

        /* Matches Container */
        .matches-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          
          gap: 1.5rem;
        }

        .match-card {
          background-color: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .match-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
        }

        .match-card.live {
          border-top: 4px solid #ef4444;
        }

        .match-card.upcoming {
          border-top: 4px solid #3b82f6;
        }

        .match-card.completed {
          border-top: 4px solid #10b981;
        }

        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .live-indicator {
          background-color: #ef4444;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .upcoming-indicator {
          background-color: #3b82f6;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .completed-indicator {
          background-color: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .match-teams {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          background-color: white;
        }

        .team {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
        }

        .team-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .team-score {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .vs {
          font-weight: 600;
          color: #9ca3af;
          padding: 0 0.5rem;
          position: relative;
        }

        .vs:before, .vs:after {
          content: '';
          position: absolute;
          height: 1px;
          width: 15px;
          background-color: #e5e7eb;
          top: 50%;
        }

        .vs:before {
          right: 100%;
        }

        .vs:after {
          left: 100%;
        }

        .match-status, .match-result {
          padding: 0.75rem 1rem;
          text-align: center;
          font-weight: 500;
          color: #4b5563;
          background-color: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .match-details {
          padding: 1rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .match-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .match-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4b5563;
          font-size: 0.875rem;
        }

        .match-info-icon {
          color: #10b981;
        }

        .view-details-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: #f9fafb;
          color: #10b981;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-details-btn:hover {
          background-color: #10b981;
          color: white;
        }

        .no-matches {
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          background-color: white;
          border-radius: 0.5rem;
          color: #6b7280;
        }

        /* Tournament Stats Section */
        .tournament-stats {
          background-color: white;
          padding: 3rem 2rem;
          margin: 2rem 0;
        }

        .stats-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #111827;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-card {
          background-color: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }

        .stats-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .stats-icon {
          color: #10b981;
        }

        .stats-header h3 {
          font-size: 1.125rem;
          color: #111827;
        }

        .stats-list {
          list-style: none;
          padding: 0;
        }

        .stats-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .stats-item:last-child {
          border-bottom: none;
        }

        .stats-rank {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #10b981;
          color: white;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 600;
          margin-right: 0.75rem;
        }

        .stats-info {
          flex: 1;
        }

        .stats-name {
          font-weight: 500;
          color: #111827;
        }

        .stats-team {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .stats-value {
          font-weight: 600;
          color: #10b981;
        }

        .result-item {
          flex-direction: column;
          align-items: flex-start;
        }

        .result-teams {
          font-weight: 500;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .result-info {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Quick Links Section */
        .quick-links-section {
          padding: 3rem 2rem;
          background-color: #f9fafb;
        }

        .quick-links-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .quick-link-card {
          background-color: white;
          padding: 2rem;
          border-radius: 0.75rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
        }

        .quick-link-icon {
          width: 48px;
          height: 48px;
          color: #10b981;
          margin-bottom: 0.5rem;
        }

        .quick-link-card h3 {
          font-size: 1.25rem;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .quick-link-card p {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }

        .quick-link-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .quick-link-btn:hover {
          background-color: #059669;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .cricket-title {
            font-size: 4rem;
          }
          
          .cricket-tabs {
            padding: 0 1rem;
          }
          
          .tabs-container {
            flex-wrap: wrap;
          }
          
          .tab {
            flex: 1;
            text-align: center;
            padding: 0.75rem;
          }
          
          .button-container {
            width: 100%;
            margin: 0.5rem 0;
            justify-content: space-between;
          }
          
          .create-score-btn {
            flex: 1;
          }
          
          .matches-grid {
            grid-template-columns: 1fr;
          }
          
          .form-group {
            flex-basis: 100%;
          }

          .stats-grid,
          .quick-links-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Matches
