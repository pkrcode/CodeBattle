import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Bell
} from 'lucide-react';


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const [notifications] = useState([
    {
      id: '1',
      title: 'New Battle Challenge',
      message: 'CodeMaster_Pro has challenged you to a battle!',
      time: '2 minutes ago',
      type: 'battle',
      isRead: false,
      action: 'battles'
    },
    {
      id: '2',
      title: 'Achievement Unlocked',
      message: 'Congratulations! You\'ve unlocked "Problem Solver" achievement.',
      time: '1 hour ago',
      type: 'achievement',
      isRead: false,
      action: 'achievements'
    },
    {
      id: '3',
      title: 'Friend Request',
      message: 'AlgoWarrior wants to be your friend.',
      time: '3 hours ago',
      type: 'friend',
      isRead: true,
      action: 'friends'
    },
    {
      id: '4',
      title: 'Daily Challenge Available',
      message: 'New daily coding challenge is ready for you!',
      time: '5 hours ago',
      type: 'challenge',
      isRead: false,
      action: 'problems'
    },
    {
      id: '5',
      title: 'Leaderboard Update',
      message: 'You\'ve moved up to #15 on the leaderboard!',
      time: '1 day ago',
      type: 'leaderboard',
      isRead: true,
      action: 'leaderboard'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { path: '/battles', icon: '⚔️', label: 'Battles', badge: 'Live' },
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close user dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      
      // Close notification dropdown if clicking outside
      if (notificationRef.current && !notificationRef.current.contains(target)) {
        setIsNotificationOpen(false);
      }
    };

    // Use both mousedown and click events for better compatibility
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'battle': return '⚔️';
      case 'achievement': return '🏆';
      case 'friend': return '👥';
      case 'challenge': return '🎯';
      case 'leaderboard': return '📊';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'battle': return 'text-error-500';
      case 'achievement': return 'text-warning-500';
      case 'friend': return 'text-success-500';
      case 'challenge': return 'text-primary-500';
      case 'leaderboard': return 'text-secondary-500';
      default: return 'text-primary-500';
    }
  };

  const handleNotificationClick = (notification: any) => {
    setIsNotificationOpen(false);
    
    // Navigate to the corresponding page based on notification type
    switch (notification.action) {
      case 'battles':
        navigate('/battles');
        break;
      case 'achievements':
        navigate('/achievements');
        break;
      case 'friends':
        navigate('/friends');
        break;
      case 'problems':
        navigate('/problems');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      default:
        // Default to home page
        navigate('/dashboard');
    }
  };

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
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <img 
                  src="/logo.svg" 
                  alt="CodeBattle Logo" 
                  className="h-8 w-8 rounded-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-20 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold gradient-text-primary">
                CodeBattle
              </span>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {typeof item.icon === 'string' ? (
                      <span className="text-lg">{item.icon}</span>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full animate-pulse"></span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
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

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative p-2 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    {/* Backdrop to catch clicks outside */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border z-50 ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                    <div className="p-4 max-h-96 overflow-y-auto">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Notifications</h3>
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full text-left flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                              notification.isRead ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700' : 'bg-error-50 dark:bg-error-900 hover:bg-error-100 dark:hover:bg-error-800'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${getNotificationColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 dark:text-white">{notification.title}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <span className="text-xs text-slate-500 dark:text-slate-400">{notification.time}</span>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-error-500 rounded-full"></span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm ${user?.photoURL ? 'hidden' : ''}`}>
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <span className="hidden sm:block font-medium truncate max-w-24">{user?.displayName || 'User'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
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
                      {/* User info */}
                      <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-12 h-12 rounded-xl object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-lg ${user?.photoURL ? 'hidden' : ''}`}>
                          {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                            {user?.displayName || 'User'}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">1,234</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">XP</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                          <div className="text-lg font-bold text-warning-600 dark:text-warning-400">42</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Wins</div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/achievements"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Award className="w-4 h-4" />
                          <span>Achievements</span>
                        </Link>
                        <Link
                          to="/friends"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          <span>Friends</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t ${
              theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                        : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {typeof item.icon === 'string' ? (
                      <span className="text-lg">{item.icon}</span>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 text-xs bg-error-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </motion.nav>
  );
};

export default Navbar; 