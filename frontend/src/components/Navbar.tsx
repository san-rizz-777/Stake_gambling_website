import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FiPlay, FiBarChart, FiStar } from "react-icons/fi";
import { Button } from "../ui";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActiveRoute = (path: string) => location.pathname === path;

  const navItems = [
    { 
      name: 'Game', 
      path: '/game', 
      icon: FiPlay,
      description: 'Play Plinko'
    },
    { 
      name: 'Simulation', 
      path: '/simulation', 
      icon: FiBarChart,
      description: 'Practice Mode'
    }
  ];

  return (
    <>
      <nav className={`fixed top-4 left-4 z-50 max-w-sm rounded-2xl transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0f212e]/95 backdrop-blur-xl border border-green-500/20 shadow-2xl' 
          : 'bg-gradient-to-r from-[#0f212e] to-[#1a2c3a] border border-gray-800/50'
      }`}>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 animate-pulse rounded-2xl"></div>
        
        <div className="relative px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-green-500/25">
                  <div className="w-3 h-3 bg-white rounded-lg transform group-hover:rotate-45 transition-transform duration-300"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-75"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-400 transition-all duration-300">
                  Plinkoo.100x
                </span>
                <span className="text-xs text-gray-400 font-medium">Provably Fair</span>
              </div>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? (
                <RxCross1 size={20} className="animate-spin" />
              ) : (
                <RxHamburgerMenu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Menu */}
        <div className={`transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-[#0f212e]/98 backdrop-blur-xl border-t border-gray-800/50 rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              
              {/* Live Stats */}
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">1,247 online</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
                  <FiStar className="w-4 h-4 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
                  <span className="text-sm font-bold text-yellow-300">$12,345</span>
                </div>
              </div>

              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromTop 0.5s ease-out forwards' : ''
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActiveRoute(item.path) ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600 group-hover:bg-gray-400'
                  }`}></div>
                </Link>
              ))}

              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-800/50">
                <button 
                  onClick={() => navigate('/game')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 text-sm"
                >
                  🎰 Start Playing Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated-box {
          animation: slideInFromTop 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};