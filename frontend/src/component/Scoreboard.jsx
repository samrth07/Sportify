"use client"
import { useState } from "react"
import { Calendar, Clock, Trophy, Users, Star, TrendingUp, BarChart2 } from "lucide-react"

const Scoreboard = () => {
  const [activeTab, setActiveTab] = useState("live")
  const [showScoreForm, setShowScoreForm] = useState(false)

  // Sample match data
  const liveMatches = [
    {
      id: 1,
      team1: "Computer Science",
      team2: "Mechanical Engineering",
      score1: "156/4",
      score2: "89/2",
      overs: "15.2/20",
      status: "Computer Science leads by 67 runs",
    },
    {
      id: 2,
      team1: "Civil Engineering",
      team2: "Electronics",
      score1: "112/7",
      score2: "114/3",
      overs: "18.4/20",
      status: "Electronics won by 7 wickets",
    },
  ]

  const upcomingMatches = [
    {
      id: 3,
      team1: "Information Technology",
      team2: "Electrical Engineering",
      date: "April 12, 2025",
      time: "2:00 PM",
      venue: "College Main Ground",
    },
    {
      id: 4,
      team1: "Physics Department",
      team2: "Chemistry Department",
      date: "April 15, 2025",
      time: "10:00 AM",
      venue: "College Secondary Ground",
    },
  ]

  const completedMatches = [
    {
      id: 5,
      team1: "Mathematics",
      team2: "Biology",
      score1: "187/6",
      score2: "156/10",
      result: "Mathematics won by 31 runs",
    },
    {
      id: 6,
      team1: "Computer Science",
      team2: "Information Technology",
      score1: "145/8",
      score2: "146/5",
      result: "Information Technology won by 5 wickets",
    },
  ]

  // Add this after the existing useState hooks
  const [matches, setMatches] = useState({
    live: [...liveMatches],
    upcoming: [...upcomingMatches],
    completed: [...completedMatches],
  })

  // Stats data
  const statsData = {
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
  }

  // Form state for score entry
  const [scoreForm, setScoreForm] = useState({
    matchId: "",
    team1: "",
    team2: "",
    team1Score: "",
    team1Wickets: "",
    team2Score: "",
    team2Wickets: "",
    team1Overs: "",
    team2Overs: "",
    status: "",
    matchDate: "",
    matchTime: "",
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setScoreForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add this function before the return statement
  const updateMatchData = (formData) => {
    const newMatch = {
      id: formData.matchId === "new" ? Date.now() : Number.parseInt(formData.matchId),
      team1: formData.team1,
      team2: formData.team2,
      score1: formData.team1Score ? `${formData.team1Score}/${formData.team1Wickets}` : "",
      score2: formData.team2Score ? `${formData.team2Score}/${formData.team2Wickets}` : "",
      overs: formData.team1Overs ? `${formData.team1Overs}/20` : "",
      status: formData.status,
      date: formData.matchDate,
      time: formData.matchTime,
      venue: formData.venue,
    }

    // Update the appropriate match list
    if (formData.matchId !== "new") {
      // Update existing match
      const matchId = Number.parseInt(formData.matchId)
      const updatedLive = matches.live.map((match) => (match.id === matchId ? newMatch : match))
      const updatedUpcoming = matches.upcoming.map((match) => (match.id === matchId ? newMatch : match))
      const updatedCompleted = matches.completed.map((match) => (match.id === matchId ? newMatch : match))

      setMatches({
        live: updatedLive,
        upcoming: updatedUpcoming,
        completed: updatedCompleted,
      })
    } else {
      // Add new match to live matches
      setMatches({
        ...matches,
        live: [...matches.live, newMatch],
      })
    }

    setShowScoreForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateMatchData(scoreForm)
    alert("Score updated successfully!")
    setScoreForm({
      matchId: "",
      team1: "",
      team2: "",
      team1Score: "",
      team1Wickets: "",
      team2Score: "",
      team2Wickets: "",
      team1Overs: "",
      team2Overs: "",
      status: "",
      venue: "",
      matchDate: "",
      matchTime: "",
    })
  }

  return (
    <div className="cricket-page">
      {/* Cricket Hero Section */}
      <div className="cricket-hero">
        <h1 className="cricket-title">CRICKET</h1>
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
          <button className="create-score-btn" onClick={() => setShowScoreForm(!showScoreForm)}>
            {showScoreForm ? "Cancel" : "Create/Update Score"}
          </button>
        </div>
      </div>

      {/* Score Entry Form */}
      {showScoreForm && (
        <div className="score-form-container">
          <form onSubmit={handleSubmit} className="score-form">
            <h2>Create/Update Cricket Score</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Match Type</label>
                <select name="matchId" value={scoreForm.matchId} onChange={handleFormChange} required>
                  <option value="">Select Match Type</option>
                  <option value="new">New Match</option>
                  {matches.live.map((match) => (
                    <option key={`live-${match.id}`} value={match.id}>
                      {match.team1} vs {match.team2} (Live)
                    </option>
                  ))}
                  {matches.upcoming.map((match) => (
                    <option key={`upcoming-${match.id}`} value={match.id}>
                      {match.team1} vs {match.team2} (Upcoming)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Team 1</label>
                <input
                  type="text"
                  name="team1"
                  value={scoreForm.team1}
                  onChange={handleFormChange}
                  placeholder="Team 1 Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Team 2</label>
                <input
                  type="text"
                  name="team2"
                  value={scoreForm.team2}
                  onChange={handleFormChange}
                  placeholder="Team 2 Name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Team 1 Score</label>
                <input
                  type="number"
                  name="team1Score"
                  value={scoreForm.team1Score}
                  onChange={handleFormChange}
                  placeholder="Runs"
                />
              </div>
              <div className="form-group">
                <label>Team 1 Wickets</label>
                <input
                  type="number"
                  name="team1Wickets"
                  value={scoreForm.team1Wickets}
                  onChange={handleFormChange}
                  placeholder="Wickets"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Team 1 Overs</label>
                <input
                  type="text"
                  name="team1Overs"
                  value={scoreForm.team1Overs}
                  onChange={handleFormChange}
                  placeholder="Overs (e.g. 12.4)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Team 2 Score</label>
                <input
                  type="number"
                  name="team2Score"
                  value={scoreForm.team2Score}
                  onChange={handleFormChange}
                  placeholder="Runs"
                />
              </div>
              <div className="form-group">
                <label>Team 2 Wickets</label>
                <input
                  type="number"
                  name="team2Wickets"
                  value={scoreForm.team2Wickets}
                  onChange={handleFormChange}
                  placeholder="Wickets"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Team 2 Overs</label>
                <input
                  type="text"
                  name="team2Overs"
                  value={scoreForm.team2Overs}
                  onChange={handleFormChange}
                  placeholder="Overs (e.g. 12.4)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Match Status</label>
                <input
                  type="text"
                  name="status"
                  value={scoreForm.status}
                  onChange={handleFormChange}
                  placeholder="e.g. Team 1 leads by 45 runs"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={scoreForm.venue}
                  onChange={handleFormChange}
                  placeholder="Match Venue"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="matchDate" value={scoreForm.matchDate} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name="matchTime" value={scoreForm.matchTime} onChange={handleFormChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Save Score
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowScoreForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Match Content Based on Active Tab */}
      <div className="matches-container">
        {activeTab === "live" && (
          <div className="matches-grid">
            {matches.live.length > 0 ? (
              matches.live.map((match) => (
                <div className="match-card live" key={match.id}>
                  <div className="match-header">
                    <span className="live-indicator">LIVE</span>
                    <span className="match-overs">{match.overs} overs</span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <span className="team-name">{match.team1}</span>
                      <span className="team-score">{match.score1}</span>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <span className="team-name">{match.team2}</span>
                      <span className="team-score">{match.score2}</span>
                    </div>
                  </div>
                  <div className="match-status">{match.status}</div>
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
                <div className="match-card upcoming" key={match.id}>
                  <div className="match-header">
                    <span className="upcoming-indicator">UPCOMING</span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <span className="team-name">{match.team1}</span>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <span className="team-name">{match.team2}</span>
                    </div>
                  </div>
                  <div className="match-details">
                    <div className="match-info">
                      <div className="match-info-item">
                        <Calendar className="match-info-icon" size={16} />
                        <span>{match.date}</span>
                      </div>
                      <div className="match-info-item">
                        <Clock className="match-info-icon" size={16} />
                        <span>{match.time}</span>
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
                <div className="match-card completed" key={match.id}>
                  <div className="match-header">
                    <span className="completed-indicator">COMPLETED</span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <span className="team-name">{match.team1}</span>
                      <span className="team-score">{match.score1}</span>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <span className="team-name">{match.team2}</span>
                      <span className="team-score">{match.score2}</span>
                    </div>
                  </div>
                  <div className="match-result">{match.result || match.status}</div>
                  <button className="view-details-btn">View Scorecard</button>
                </div>
              ))
            ) : (
              <div className="no-matches">No completed matches</div>
            )}
          </div>
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

        .create-score-btn {
          margin-left: auto;
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

        .submit-btn:hover {
          background-color: #059669;
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
          
          .create-score-btn {
            width: 100%;
            margin: 0.5rem 0;
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

export default Scoreboard
