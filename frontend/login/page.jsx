import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useAuth } from "../src/context/AuthContext"
import { useContext } from "react"

// Custom Football icon
const Football = ({ className = "h-6 w-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none" // ✅ FIXED
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
      <path d="M12 12 2.2 9.2" />
      <path d="m12 12 4.8-7.8" />
      <path d="m12 12 7.8 4.8" />
    </svg>
  )
  

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      login({
        email: formData.email,
        name: formData.email.split("@")[0],
      })
      setIsLoading(false)
      navigate("/")
    }, 1500)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      login({
        email: "user@gmail.com",
        name: "Google User",
        provider: "google",
      })
      setIsLoading(false)
      navigate("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <Football className="h-10 w-10 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Football Portal</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-8">Sign in to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
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
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
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
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <span className="text-sm font-medium text-green-600 hover:text-green-500 cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300"
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Image/Animation */}
      <div className="hidden md:block md:w-1/2 bg-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full border-2 border-gray-300 relative mb-4 animate-bounce shadow-lg">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 0%, white 50%, black 50%, black 55%, white 55%, white 60%, black 60%, black 65%, white 65%, white 100%)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="w-16 h-2 bg-black/10 rounded-full blur-sm"></div>
          </div>
          <h2 className="text-4xl font-bold text-green-800 mt-8">Welcome to Football Portal</h2>
          <p className="mt-4 text-lg text-green-700 max-w-md mx-auto">
            Track matches, celebrate victories, and be part of our thriving football community.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/80 p-3 rounded-lg shadow-md">
              <p className="font-bold text-green-800">Live Scores</p>
            </div>
            <div className="bg-white/80 p-3 rounded-lg shadow-md">
              <p className="font-bold text-green-800">Team Stats</p>
            </div>
            <div className="bg-white/80 p-3 rounded-lg shadow-md">
              <p className="font-bold text-green-800">Fantasy League</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="bg-white/80 px-4 py-2 rounded-full shadow-md">
            <p className="text-sm font-medium text-green-800">Join 100,000+ football fans today!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
