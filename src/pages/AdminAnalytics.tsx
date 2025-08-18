import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Award
} from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminAnalytics: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [users, setUsers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  // Real-time subscriptions
  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const list: any[] = [];
      snap.forEach((docu) => list.push({ id: docu.id, ...docu.data() }));
      setUsers(list);
    });

    const unsubQuestions = onSnapshot(collection(db, 'questions'), (snap) => {
      const list: any[] = [];
      snap.forEach((docu) => list.push({ id: docu.id, ...docu.data() }));
      setQuestions(list);
    });

    // Matches collection might not exist yet; empty snapshot is fine
    const unsubMatches = onSnapshot(collection(db, 'matches'), (snap) => {
      const list: any[] = [];
      snap.forEach((docu) => list.push({ id: docu.id, ...docu.data() }));
      setMatches(list);
    });

    return () => {
      unsubUsers();
      unsubQuestions();
      unsubMatches();
    };
  }, []);

  const now = Date.now();
  const rangeMs = useMemo(() => {
    switch (timeRange) {
      case '7d': return 7 * 24 * 60 * 60 * 1000;
      case '30d': return 30 * 24 * 60 * 60 * 1000;
      case '90d': return 90 * 24 * 60 * 60 * 1000;
      case '1y': return 365 * 24 * 60 * 60 * 1000;
      default: return 7 * 24 * 60 * 60 * 1000;
    }
  }, [timeRange]);

  const totalUsers = useMemo(
    () => users.filter((u) => !u.isBot).length,
    [users]
  );
  const activeUsers = useMemo(
    () => users.filter((u) => !u.isBot && !!u.isOnline).length,
    [users]
  );
  const totalBattles = useMemo(
    () => matches.length,
    [matches]
  );
  const totalQuestions = useMemo(
    () => questions.length,
    [questions]
  );
  const newUsers = useMemo(() => {
    const cutoff = now - rangeMs;
    return users.filter((u) => {
      const ts = u.createdAt?.toDate?.() ? u.createdAt.toDate() : (u.createdAt ? new Date(u.createdAt) : undefined);
      return !u.isBot && ts && ts.getTime() >= cutoff;
    }).length;
  }, [users, rangeMs, now]);

  const difficultyDistribution = useMemo(() => {
    const counts: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    questions.forEach((q) => {
      const d = (q.difficulty || '').toLowerCase();
      if (d === 'easy') counts.Easy += 1;
      else if (d === 'medium') counts.Medium += 1;
      else if (d === 'hard') counts.Hard += 1;
    });
    const total = counts.Easy + counts.Medium + counts.Hard || 1;
    return [
      { difficulty: 'Easy', count: counts.Easy, percentage: Math.round((counts.Easy / total) * 100) },
      { difficulty: 'Medium', count: counts.Medium, percentage: Math.round((counts.Medium / total) * 100) },
      { difficulty: 'Hard', count: counts.Hard, percentage: Math.round((counts.Hard / total) * 100) },
    ];
  }, [questions]);

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-slate-900'} mx-auto mb-4`}></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading admin analytics...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  // Derived analytics from real-time data

  return (
    <div className={`min-h-screen p-6 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center space-y-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          <h1 className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Analytics Dashboard{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>📊</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Monitor platform performance and user engagement
          </p>
          <div className="flex justify-center">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'bg-slate-700 border border-slate-600 text-white' 
                  : 'bg-white border border-slate-300 text-slate-900'
              }`}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalUsers.toLocaleString()}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Users</div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+12.5%</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} ml-1`}>from last month</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activeUsers.toLocaleString()}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Active Users</div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+8.3%</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} ml-1`}>from last month</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalBattles.toLocaleString()}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Battles</div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+15.2%</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} ml-1`}>from last month</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalQuestions}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Questions</div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+5.7%</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} ml-1`}>from last month</span>
            </div>
          </div>
        </motion.div>

        {/* Charts and Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Difficulty Distribution */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Difficulty Distribution</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {difficultyDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.difficulty === 'Easy' ? 'bg-green-500' :
                      item.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-16 rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${
                          item.difficulty === 'Easy' ? 'bg-green-500' :
                          item.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm w-8 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Activity</h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>New user registered</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Battle completed</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>5 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Question solved</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>8 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Achievement unlocked</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>12 minutes ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quick Stats</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>New Users Today</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{newUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Battles Today</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Questions Solved</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Avg Session Time</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>24m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Completion Rate</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>87.3%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
