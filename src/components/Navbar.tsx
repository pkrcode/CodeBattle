import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Users, 
  Award, 
  LogOut, 
  Sun, 
  Moon,
  Code,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/battles', icon: '⚔️', label: 'Battles' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/problems', icon: Code, label: 'Problems' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/logo.svg" 
              alt="CodeBattle Logo" 
              className="h-8 w-8 rounded-lg"
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              CodeBattle
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg'
                      : `hover:bg-opacity-10 ${
                          theme === 'dark' 
                            ? 'text-gray-300 hover:bg-white hover:text-white' 
                            : 'text-slate-700 hover:bg-slate-900 hover:text-slate-900'
                        }`
                  }`}
                >
                  {typeof Icon === 'string' ? (
                    <span className="text-lg">{Icon}</span>
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - User Dropdown Menu */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* User Info and Dropdown */}
            <div className="relative">
                             <button
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                   theme === 'dark' 
                     ? 'text-gray-300 hover:bg-opacity-10 hover:bg-white hover:text-white' 
                     : 'text-slate-700 hover:bg-opacity-10 hover:bg-slate-900 hover:text-slate-900'
                 }`}
               >
                <div className="hidden sm:block text-right">
                  <div className={`text-sm font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {user?.displayName}
                  </div>
                  <div className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    Level {user?.level} • {user?.rank}
                  </div>
                </div>
                
                {/* User Avatar */}
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-8 w-8 rounded-full border-2 border-primary-500"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.displayName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {user?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-2 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border border-slate-700' 
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  {/* Profile */}
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:bg-slate-700' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  {/* Achievements */}
                  <Link
                    to="/achievements"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:bg-slate-700' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Award className="h-4 w-4" />
                    <span>Achievements</span>
                  </Link>

                  {/* Friends */}
                  <Link
                    to="/friends"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:bg-slate-700' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    <span>Friends</span>
                  </Link>

                  {/* Divider */}
                  <div className={`border-t my-1 ${
                    theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                  }`} />

                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:bg-slate-700' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>

                  {/* Divider */}
                  <div className={`border-t my-1 ${
                    theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                  }`} />

                  {/* Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors duration-200 text-red-600 hover:bg-red-50 ${
                      theme === 'dark' ? 'hover:bg-red-900/20' : ''
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-700"
        >
          <div className="px-4 py-3 space-y-1">
            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : `${
                          theme === 'dark' 
                            ? 'text-gray-300 hover:bg-slate-700' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {typeof Icon === 'string' ? (
                    <span className="text-xl">{Icon}</span>
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Divider */}
            <div className={`border-t my-2 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`} />
            
            {/* User Menu Items */}
            <Link
              to="/profile"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            <Link
              to="/achievements"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </Link>
            
            <Link
              to="/friends"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5" />
              <span>Friends</span>
            </Link>
            
            {/* Divider */}
            <div className={`border-t my-2 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`} />
            
            {/* Settings */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            {/* Logout */}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium w-full text-left text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 