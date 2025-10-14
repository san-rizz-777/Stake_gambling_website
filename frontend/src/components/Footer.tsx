import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0f212e] to-[#0a1620] border-t border-gray-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold gradient-text">Plinkoo.100x</span>
              </Link>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Experience the thrill of Plinko with provably fair gameplay, instant payouts, and customizable risk levels. Your trusted destination for online gaming.
              </p>

              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <FiShield className="w-4 h-4" />
                <span className="font-semibold">Licensed & Secure</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Play Game', path: '/game' },
                  { name: 'Simulation', path: '/simulation' },
                  { name: 'How to Play', path: '/how-to-play' },
                  { name: 'Strategies', path: '/strategies' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {[
                  { icon: FiMail, name: 'support@plinkoo.com', href: 'mailto:support@plinkoo.com' },
                  { icon: FiPhone, name: '24/7 Live Chat', href: '#' },
                  { icon: FiMapPin, name: 'Help Center', href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors text-sm group"
                    >
                      <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Connect */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Connect With Us</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: FaGithub, name: 'GitHub', href: 'https://github.com/san-rizz-777', color: 'hover:text-gray-300' },
                  { icon: FaLinkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/sanskar-gunde-7b9a0b33a/', color: 'hover:text-blue-400' },
                  { icon: FaTwitter, name: 'Twitter', href: '#', color: 'hover:text-blue-300' },
                  { icon: FaDiscord, name: 'Discord', href: '#', color: 'hover:text-purple-400' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 text-gray-400 ${social.color} transition-all p-2 rounded-lg hover:bg-white/5 group`}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="glass-effect p-4 rounded-lg">
                <p className="text-gray-300 text-sm mb-3">Get updates on new features</p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                  />
                  <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold text-white transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <span>&copy; 2024 Plinkoo.100x. All rights reserved.</span>
                <div className="hidden md:flex items-center space-x-4">
                  <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-green-400 transition-colors">Responsible Gaming</a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Provably Fair</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
                  <span>18+ Only</span>
                </div>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="md:hidden flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-800/50">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Responsible Gaming</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 