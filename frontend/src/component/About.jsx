import { Link } from "react-router-dom"
import { ArrowLeft, Trophy, Users, Calendar, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-[92vh] bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      {/* Navigation */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 drop-shadow mb-4">About ScoreTracker</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your all-in-one platform for tracking scores and hosting sports matches across multiple games.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* About Us Section */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            ScoreTracker was founded in 2023 by a group of sports enthusiasts who were frustrated with the lack of
            easy-to-use tools for tracking scores and organizing matches across different sports.
          </p>
          <p className="text-gray-600">
            Our platform supports multiple sports including Cricket, Kabaddi, Football, Badminton, Carrom, and
            Basketball, with plans to add more in the future. Whether you're organizing a small community tournament or
            tracking scores for your college sports league, ScoreTracker has you covered.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Score Tracking</h3>
            <p className="text-gray-600">
              Real-time score updates for all supported sports with customizable scoring rules and statistics tracking.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Match Hosting</h3>
            <p className="text-gray-600">
              Create and manage matches, send invitations to teams, and schedule events with our intuitive interface.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Team Management</h3>
            <p className="text-gray-600">
              Create teams, add players, track performance, and manage team statistics across multiple tournaments.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tournament Organization</h3>
            <p className="text-gray-600">
              Organize tournaments with automatic fixture generation, bracket updates, and leaderboard management.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-300 flex items-center justify-center font-bold text-gray-800 mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Choose Your Sport</h3>
                <p className="text-gray-600">
                  Select from our range of supported sports including Cricket, Kabaddi, Football, and more.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-300 flex items-center justify-center font-bold text-gray-800 mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Create or Join a Match</h3>
                <p className="text-gray-600">
                  Host a new match by setting up teams and schedules, or join an existing match as a participant.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-300 flex items-center justify-center font-bold text-gray-800 mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Track Scores in Real-Time</h3>
                <p className="text-gray-600">
                  Update scores as the match progresses, with automatic statistics calculation and leaderboard updates.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-300 flex items-center justify-center font-bold text-gray-800 mr-4">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Share Results</h3>
                <p className="text-gray-600">
                  Share match results with participants and spectators through our platform or via social media
                  integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", role: "Founder & CEO", image: "/placeholder.svg?height=100&width=100" },
              { name: "Priya Patel", role: "CTO", image: "/placeholder.svg?height=100&width=100" },
              { name: "Amit Kumar", role: "Lead Developer", image: "/placeholder.svg?height=100&width=100" },
              { name: "Neha Singh", role: "UX Designer", image: "/placeholder.svg?height=100&width=100" },
              { name: "Vikram Reddy", role: "Sports Analyst", image: "/placeholder.svg?height=100&width=100" },
              { name: "Ananya Gupta", role: "Marketing Lead", image: "/placeholder.svg?height=100&width=100" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">Have questions or suggestions? We'd love to hear from you!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600 mb-1">Email: contact@scoretracker.com</p>
              <p className="text-gray-600 mb-1">Phone: +91 98765 43210</p>
              <p className="text-gray-600">Address: 123 Sports Avenue, Bangalore, India</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-12 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600">© 2023 ScoreTracker. All rights reserved.</p>
      </footer>
    </div>
  )
}
