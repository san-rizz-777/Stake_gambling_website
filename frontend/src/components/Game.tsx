import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface GameResult {
  success: boolean;
  point: number;
  multiplier: number;
  pattern: string[];
  betAmount: number;
  payout: number;
  profit: number;
  newBalance: number;
  gameId: string;
}

interface GameHistory {
  _id: string;
  betAmount: number;
  multiplier: number;
  payout: number;
  profit: number;
  timestamp: string;
}

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>(null);
  
  // User & Balance State
  const [userId, setUserId] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<number>(100);
  
  // Game State
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResult, setLastResult] = useState<GameResult | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  
  // Stats
  const [stats, setStats] = useState({
    totalWagered: 0,
    totalWon: 0,
    gamesPlayed: 0,
    netProfit: 0
  });

  // Initialize BallManager
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  // Load user data on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && storedUserId.trim() !== "") {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    }
  }, []);

  // Fetch user balance and stats
  const fetchUserData = async (uid: string) => {
    if (!uid || uid.trim() === "") return; // Guard clause
    
    try {
      const [userResponse, statsResponse] = await Promise.all([
        axios.get(`${API_URL}/users/${uid}`),
        axios.get(`${API_URL}/users/${uid}/stats`)
      ]);
      
      setBalance(userResponse.data.balance);
      setStats({
        totalWagered: statsResponse.data.totalWagered,
        totalWon: statsResponse.data.totalWon,
        gamesPlayed: statsResponse.data.gamesPlayed,
        netProfit: statsResponse.data.netProfit
      });
      setGameHistory(statsResponse.data.recentGames.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Clear invalid user ID
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        localStorage.removeItem("userId");
        setUserId("");
        alert("User not found. Please enter a valid User ID or create a new account.");
      }
    }
  };

  // Play game
  const playGame = async () => {
    if (!userId) {
      alert("Please set a User ID first (see browser console)");
      console.log("Create a user first using POST /api/users/register");
      return;
    }

    if (betAmount <= 0) {
      alert("Please enter a valid bet amount");
      return;
    }

    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsPlaying(true);
    setLastResult(null);

    try {
      const response = await axios.post<GameResult>(
        `${API_URL}/game/play`,
        { betAmount },
        { headers: { "user-id": userId } }
      );

      const result = response.data;
      setLastResult(result);
      setBalance(result.newBalance);

      // Add ball to canvas
      if (ballManager) {
        ballManager.addBall(result.point);
      }

      // Update stats
      setStats(prev => ({
        totalWagered: prev.totalWagered + result.betAmount,
        totalWon: prev.totalWon + result.payout,
        gamesPlayed: prev.gamesPlayed + 1,
        netProfit: prev.netProfit + result.profit
      }));

      // Refresh history
      await fetchGameHistory();

    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to play game");
      console.error("Game error:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  // Fetch game history
  const fetchGameHistory = async () => {
    if (!userId || userId.trim() === "") return; // Guard clause
    
    try {
      const response = await axios.get(`${API_URL}/game/history/${userId}?limit=5`);
      setGameHistory(response.data.history);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  // Quick bet buttons
  const quickBets = [10, 50, 100, 500, 1000];

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  // Get profit color
  const getProfitColor = (profit: number) => {
    if (profit > 0) return "text-green-400";
    if (profit < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Plinko Game
          </h1>
          <p className="text-gray-400 text-lg">Drop the ball and win big!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Balance & Stats Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Balance</p>
                  <p className="text-3xl font-bold text-green-400">
                    {formatCurrency(balance)}
                  </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Wagered</p>
                  <p className="text-xl font-semibold text-blue-400">
                    {formatCurrency(stats.totalWagered)}
                  </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Won</p>
                  <p className="text-xl font-semibold text-yellow-400">
                    {formatCurrency(stats.totalWon)}
                  </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Net Profit</p>
                  <p className={`text-xl font-semibold ${getProfitColor(stats.netProfit)}`}>
                    {formatCurrency(stats.netProfit)}
                  </p>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
              <div className="flex justify-center items-center">
                <canvas 
                  ref={canvasRef} 
                  width="800" 
                  height="800" 
                  className="max-w-full rounded-lg"
                  style={{ maxHeight: '800px' }}
                ></canvas>
              </div>
            </div>

            {/* Last Result */}
            {lastResult && (
              <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 shadow-xl ${
                lastResult.profit > 0 ? 'border-green-500' : 'border-red-500'
              }`}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Multiplier</p>
                    <p className="text-4xl font-bold text-purple-400">
                      {lastResult.multiplier}x
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Payout</p>
                    <p className="text-3xl font-bold text-yellow-400">
                      {formatCurrency(lastResult.payout)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Profit</p>
                    <p className={`text-3xl font-bold ${getProfitColor(lastResult.profit)}`}>
                      {lastResult.profit > 0 ? '+' : ''}{formatCurrency(lastResult.profit)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Bet Controls */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Place Your Bet</h3>
              
              {/* User ID Input - Always show when no userId */}
              {!userId && (
                <div className="mb-6 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm font-semibold mb-3">⚠️ Enter User ID to Start</p>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      const newUserId = e.target.value.trim();
                      setUserId(newUserId);
                      if (newUserId) {
                        localStorage.setItem("userId", newUserId);
                        fetchUserData(newUserId);
                      }
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="68f4c3634b2867a34f27bb65"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Your User ID: <span className="font-mono text-green-400">68f4c3634b2867a34f27bb65</span>
                  </p>
                </div>
              )}

              {/* Show current user */}
              {userId && (
                <div className="mb-6 bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-3">
                  <p className="text-green-400 text-xs font-semibold mb-1">✓ Logged In</p>
                  <p className="text-gray-300 text-xs font-mono truncate">{userId}</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userId");
                      setUserId("");
                      setBalance(0);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* Bet Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bet Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-4 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    min="1"
                    max={balance}
                  />
                </div>
              </div>

              {/* Quick Bet Buttons */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-300 mb-3">Quick Bets</p>
                <div className="grid grid-cols-5 gap-2">
                  {quickBets.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg py-3 text-sm font-semibold transition-all duration-150 hover:scale-105"
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={playGame}
                disabled={isPlaying || !userId}
                className={`w-full py-4 text-lg font-bold rounded-lg transition-all duration-200 ${
                  isPlaying || !userId
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isPlaying ? 'Dropping...' : `🎲 Drop Ball - ${formatCurrency(betAmount)}`}
              </button>

              {/* Potential Win */}
              <div className="mt-6 text-center bg-gray-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Potential Win Range</p>
                <p className="text-lg font-bold text-yellow-400">
                  {formatCurrency(betAmount * 0.5)} - {formatCurrency(betAmount * 16)}
                </p>
              </div>
            </div>

            {/* Game History */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Recent Games</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {gameHistory.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">
                    No games played yet
                  </p>
                ) : (
                  gameHistory.map((game) => (
                    <div
                      key={game._id}
                      className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex justify-between items-center transition-colors"
                    >
                      <div>
                        <p className="font-bold text-lg text-purple-400">{game.multiplier}x</p>
                        <p className="text-sm text-gray-400">
                          Bet: {formatCurrency(game.betAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${getProfitColor(game.profit)}`}>
                          {game.profit > 0 ? '+' : ''}{formatCurrency(game.profit)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(game.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Games Played</span>
                  <span className="font-bold text-lg">{stats.gamesPlayed}</span>
                </div>
                <div className="w-full h-px bg-gray-700"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-bold text-lg text-green-400">
                    {stats.gamesPlayed > 0 
                      ? `${((stats.netProfit > 0 ? 1 : 0) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div className="w-full h-px bg-gray-700"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg Bet</span>
                  <span className="font-bold text-lg text-blue-400">
                    {stats.gamesPlayed > 0
                      ? formatCurrency(stats.totalWagered / stats.gamesPlayed)
                      : formatCurrency(0)
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}