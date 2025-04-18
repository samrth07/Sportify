"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Calendar } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Custom Cricket icon
const Cricket = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <circle cx="12" cy="12" r="9" />
  </svg>
)

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    favoriteTeam: "",
  })

  const router = useRouter()
  const { signup } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      signup(formData)
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 bg-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/40"></div>
        <div className="absolute inset-0 cricket-pattern opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="cricket-equipment">
            <div className="cricket-bat"></div>
            <div className="cricket-stumps"></div>
          </div>
          <h2 className="text-4xl font-bold text-emerald-800 mt-8">Join Our Cricket Community</h2>
          <p className="mt-4 text-lg text-emerald-700 max-w-md mx-auto">
            Create an account to track matches, join tournaments, and connect with other cricket enthusiasts.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <Cricket className="h-10 w-10 text-emerald-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Cricket Portal</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-gray-600 mb-8">Join our cricket community today</p>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-emerald-500" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Account Details</span>
              <span>Personal Info</span>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters long with a number and a special character.</p>
              </div>

              <button type="submit" className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 transition-all">
                Continue <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                  <div className="relative">
                    <User className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500"
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of birth</label>
                <div className="relative">
                  <Calendar className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Favorite Team */}
              <div className="space-y-2">
                <label htmlFor="favoriteTeam" className="text-sm font-medium text-gray-700">Favorite cricket team</label>
                <select
                  id="favoriteTeam"
                  name="favoriteTeam"
                  value={formData.favoriteTeam}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a team</option>
                  <option value="india">India</option>
                  <option value="australia">Australia</option>
                  <option value="england">England</option>
                  <option value="newZealand">New Zealand</option>
                  <option value="southAfrica">South Africa</option>
                  <option value="westIndies">West Indies</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="sriLanka">Sri Lanka</option>
                  <option value="bangladesh">Bangladesh</option>
                  <option value="afghanistan">Afghanistan</option>
                </select>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-emerald-500" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-500">Terms</a> and <a href="#" className="text-emerald-600 hover:text-emerald-500">Privacy</a>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-4 rounded-lg border bg-white text-gray-700 hover:bg-gray-50">Back</button>
                <button type="submit" disabled={isLoading} className={`flex-1 py-3 px-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}>
                  {isLoading ? <div className="loader"></div> : "Create account"}
                </button>
              </div>
            </form>
          )}

          {/* Login redirect */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }

        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
