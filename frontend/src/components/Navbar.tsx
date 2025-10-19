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
    },
    { 
      name: 'Simulation', 
      path: '/simulation', 
      icon: FiBarChart,
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0f212e]/95 backdrop-blur-xl border-b border-green-500/20 shadow-2xl' 
          : 'bg-gradient-to-r from-[#0f212e] to-[#1a2c3a] border-b border-gray-800/50'
      }`}>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Main flex container: Logo (Left) | Nav/Content (Middle) | Mobile Button (Right) */}
          <div className="flex items-center justify-between h-16">
            
            {/* 1. Logo Section (FAR LEFT) */}
            <Link
              to="/"
              className="flex items-center space-x-3 group shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-green-500/25">
                  <div className="w-3 h-3 bg-white rounded-lg transform group-hover:rotate-45 transition-transform duration-300"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-75"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-400 transition-all duration-300 whitespace-nowrap">
                  Plinkoo.100x
                </span>
                <span className="text-xs text-green-400 font-medium whitespace-nowrap">Provably Fair</span>
              </div>
            </Link>

            {/* 2. Desktop Navigation & Right-Side Group (Fills the remaining space) */}
            {/* 🔑 CRITICAL CHANGE: flex-1 takes all available width. justify-between separates Nav from the Stats/CTA group. */}
            <div className="hidden lg:flex items-center flex-1 justify-between ml-8"> 
              
              {/* A. Navigation Links Group (Center-Left) */}
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* B. Stats & CTA Group (FAR RIGHT) */}
              <div className="flex items-center space-x-4"> 
                
                {/* Stats */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1.5 bg-blue-500/20 px-2.5 py-1.5 rounded-full border border-blue-500/30">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-300">1,247</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-yellow-500/20 px-2.5 py-1.5 rounded-full border border-yellow-500/30">
                    <FiStar className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-300">$12K</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => navigate('/game')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-5 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/25 text-sm flex items-center space-x-2 whitespace-nowrap"
                >
                  <FiPlay className="w-4 h-4" />
                  <span>Play Now</span>
                </button>
              </div>
            </div>

            {/* 3. Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-500/50 text-green-400 transition-all duration-300 shrink-0 ml-4"
            >
              {isMenuOpen ? (
                <RxCross1 size={20} />
              ) : (
                <RxHamburgerMenu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (No changes) */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-[#0f212e]/98 backdrop-blur-xl border-t border-gray-800/50">
            <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
              
              {/* Mobile Stats */}
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-full hover:bg-blue-500/30 transition-all duration-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">1,247 online</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full hover:bg-yellow-500/30 transition-all duration-300">
                  <FiStar className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-300">$12,345</span>
                </div>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <div className="font-semibold text-sm">{item.name}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActiveRoute(item.path) ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600 group-hover:bg-gray-400'
                  }`}></div>
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-800/50">
                <button 
                  onClick={() => navigate('/game')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 text-sm flex items-center justify-center space-x-2"
                >
                  <FiPlay className="w-4 h-4" />
                  <span>Start Playing Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};