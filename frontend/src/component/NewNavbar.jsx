import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trophy, User, LogOut, ChevronDown, Menu, X } from "lucide-react";

// Import your Auth context or create it
// This assumes you have an AuthContext similar to the one in the original code
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use your authentication context
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Trophy className="h-8 w-8 text-green-500 mr-2" />
            <span className="text-2xl font-bold text-green-500">Sportify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", label: "Home" },
              { path: "/sports", label: "Sports" },
             
              { path: "/article", label: "Articles" },
              { path: "/AboutPage", label: "About" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-green-800 font-medium hover:text-green-500 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium max-w-[100px] truncate">
                    {user.firstName || user.name || user.email}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-700 hover:text-green-500 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-2">
              {[
                { path: "/", label: "Home" },
                { path: "/sports", label: "Sports" },
                { path: "/events", label: "Events" },
                { path: "/article", label: "Articles" },
                { path: "/AboutPage", label: "About" }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-green-700 hover:text-green-500 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!user && (
                <div className="pt-2 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="text-green-700 hover:text-green-500 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-sm transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
              
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-green-700 hover:text-green-500 font-medium py-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}