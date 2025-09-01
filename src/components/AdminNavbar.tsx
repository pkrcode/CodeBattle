import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Settings, 
  LogOut, 
  ChevronDown,
  BarChart3,
  Calendar,
  Award,
  Activity,
  Trophy,
  User,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen
} from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const { adminUser, adminLogout } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/questions', icon: Shield, label: 'Questions' },
  { path: '/admin/aptitude', icon: BookOpen, label: 'Aptitude' },
    { path: '/admin/events', icon: Calendar, label: 'Events' },
    { path: '/admin/rewards', icon: Award, label: 'Rewards' },
    { path: '/admin/seasons', icon: Trophy, label: 'Seasons' },
    { path: '/admin/analytics', icon: Activity, label: 'Analytics' },
  ];

  const handleLogout = async () => {
    try {
      await adminLogout();
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-slate-700/50' 
          : 'bg-white/90 border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Admin Portal
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
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-xl ${theme === 'dark' ? 'text-white hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Right Side - Theme Toggle and Admin Dropdown Menu */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <span className="hidden sm:block font-medium">{adminUser?.displayName || 'Admin'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="p-4">
                    {/* Admin info */}
                    <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {adminUser?.displayName || 'Admin'}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {adminUser?.role || 'admin'}
                        </p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="space-y-1">
                      <Link
                        to="/admin/settings"
                        className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                          theme === 'dark' 
                            ? 'text-slate-300 hover:bg-slate-800' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors w-full ${
                          theme === 'dark'
                            ? 'text-error-400 hover:bg-error-900/20'
                            : 'text-error-600 hover:bg-error-50'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <div className={`md:hidden border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="px-4 py-3 grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default AdminNavbar;
