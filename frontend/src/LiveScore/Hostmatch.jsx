"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar, Clock, Users } from "lucide-react"

const SPORTS = ["basketball", "football", "kabaddi", "cricket", "carrom", "badminton"]

const HostMatchForm = ({ onSuccess, onSportChange, selectedSport }) => {
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    sport: selectedSport,
    date: new Date(),
    startTime: new Date(),
    status: "upcoming",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSportChange = (e) => {
    const sport = e.target.value
    setFormData((prev) => ({
      ...prev,
      sport,
    }))
    onSportChange(sport)
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }))
  }

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      startTime: time,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call the onSuccess function with the form data
      onSuccess(formData)

      // Reset form except for sport
      setFormData({
        teamA: "",
        teamB: "",
        sport: formData.sport,
        date: new Date(),
        startTime: new Date(),
        status: "upcoming",
      })
    } catch (error) {
      console.error("Error creating match:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div>
          <label htmlFor="sport" className="block text-green-800 font-medium mb-1">
            Sport
          </label>
          <select
            id="sport"
            value={formData.sport}
            onChange={handleSportChange}
            className="w-full bg-white border border-green-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          >
            {SPORTS.map((sport) => (
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
                value={formData.teamA}
                onChange={handleChange}
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
                value={formData.teamB}
                onChange={handleChange}
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
                selected={formData.date}
                onChange={handleDateChange}
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
                selected={formData.startTime}
                onChange={handleTimeChange}
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
            value={formData.status}
            onChange={handleChange}
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
        className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Match"}
      </button>
    </form>
  )
}

export default HostMatchForm
