import { useNavigate } from "react-router-dom";
import { FiPlay, FiZap, FiDollarSign, FiTrendingUp } from "react-icons/fi";

export const Quotes = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-5xl w-full">
        
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full">
            <FiZap className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Provably Fair • Instant Payouts</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6 animate-slide-in">
          <span className="text-white">Play Plinko, Earn More!</span>
        </h1>

        {/* Decorative line */}
        <div className="flex justify-center mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
        </div>

        {/* Description */}
        <div className="glass-effect rounded-2xl p-8 mb-8 animate-fade-in border border-white/10 shadow-xl" style={{animationDelay: '0.3s'}}>
          <p className="text-xl text-gray-200 leading-relaxed">
            <span className="text-green-400 font-semibold">Plinko</span> lets players drop a ball from the top of our triangular pin pyramid to find the <span className="text-yellow-400 font-medium">winning route</span> down to a corresponding <span className="text-green-400 font-medium">multiplier</span>. 
            Inspired by the Japanese mechanical game known as <span className="text-green-400 font-semibold">Pachinko</span>, Plinko provides players with the ability to <span className="text-blue-400 font-medium">customise your risk factor</span> and <span className="text-yellow-400 font-medium">multipliers</span> ensuring this Stake Original game is suited for everyone at our online casino!
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 card-hover border border-white/10">
            <FiDollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1000x</div>
            <div className="text-sm text-gray-400">Max Multiplier</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 card-hover border border-white/10">
            <FiTrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Custom Risk</div>
            <div className="text-sm text-gray-400">Your Strategy</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 card-hover border border-white/10">
            <FiZap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Instant</div>
            <div className="text-sm text-gray-400">Win Payouts</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-fade-in" style={{animationDelay: '0.5s'}}>
          <button
            onClick={() => navigate("/game")}
            className="group relative px-12 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 flex items-center space-x-3 text-lg"
          >
            <FiPlay className="w-6 h-6" />
            <span>PLAY PLINKO NOW</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                 style={{
                   animation: 'shimmer 2s infinite',
                   animationPlayState: 'paused'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                 onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
            </div>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Provably Fair</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Instant Withdrawals</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%);
          }
          100% { 
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};