import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    initialBalance: 1000,
  });

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Since we don't have a login endpoint, we'll search by email
      const response = await axios.get(`${API_URL}/users/search?email=${loginEmail}`);
      
      if (response.data) {
        // Store user ID in localStorage
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("username", response.data.username);
        
        // Navigate to game
        navigate("/game");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "User not found. Please register first.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/register`, registerData);
      
      // Store user ID in localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", registerData.username);
      
      // Navigate to game
      navigate("/game");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Username or email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Plinko
          </h1>
          <p className="text-gray-400 text-lg">Drop the ball, win big! 🎲</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          
          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 bg-gray-900 bg-opacity-50">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`py-4 font-semibold transition-all ${
                isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`py-4 font-semibold transition-all ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Container */}
          <div className="p-8">
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Register here
                  </button>
                </p>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, username: e.target.value })
                    }
                    className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Choose a username"
                    required
                    minLength={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Balance (₹)
                  </label>
                  <input
                    type="number"
                    value={registerData.initialBalance}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        initialBalance: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    min={100}
                    max={100000}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Start with ₹100 - ₹100,000 (Default: ₹1,000)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg"
                  }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Login here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🎰 Play responsibly. For entertainment purposes only.</p>
        </div>
      </div>
    </div>
  );
}