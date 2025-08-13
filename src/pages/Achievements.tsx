import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  Zap,
  Flame,
  Crown,
  Users,
  TrendingUp,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Mock achievements data for MVP
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        name: 'First Victory',
        description: 'Win your first battle',
        icon: '🏆',
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        rarity: 'common'
      },
      {
        id: '2',
        name: 'Problem Solver',
        description: 'Solve 10 problems',
        icon: '🎯',
        unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        rarity: 'common'
      },
      {
        id: '3',
        name: 'Streak Master',
        description: 'Maintain a 5-day win streak',
        icon: '🔥',
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        rarity: 'rare'
      },
      {
        id: '4',
        name: 'Social Butterfly',
        description: 'Add 5 friends',
        icon: '👥',
        unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        rarity: 'common'
      },
      {
        id: '5',
        name: 'Gold Collector',
        description: 'Earn 100 Gold XP',
        icon: '💰',
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        rarity: 'rare'
      },
      {
        id: '6',
        name: 'Level Up',
        description: 'Reach level 10',
        icon: '⭐',
        unlockedAt: new Date(),
        rarity: 'epic'
      },
      {
        id: '7',
        name: 'Tournament Champion',
        description: 'Win a tournament',
        icon: '👑',
        unlockedAt: null,
        rarity: 'legendary'
      },
      {
        id: '8',
        name: 'Speed Demon',
        description: 'Solve 3 problems in under 30 minutes',
        icon: '⚡',
        unlockedAt: null,
        rarity: 'epic'
      },
      {
        id: '9',
        name: 'Perfect Match',
        description: 'Win a battle without losing any problems',
        icon: '🎯',
        unlockedAt: null,
        rarity: 'rare'
      },
      {
        id: '10',
        name: 'Century Club',
        description: 'Solve 100 problems',
        icon: '💯',
        unlockedAt: null,
        rarity: 'epic'
      },
      {
        id: '11',
        name: 'Diamond Rank',
        description: 'Reach Diamond rank',
        icon: '💎',
        unlockedAt: null,
        rarity: 'legendary'
      },
      {
        id: '12',
        name: 'Team Player',
        description: 'Participate in 10 team battles',
        icon: '🤝',
        unlockedAt: null,
        rarity: 'rare'
      }
    ];

    setAchievements(mockAchievements);
  }, []);

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : filter === 'unlocked' 
    ? unlockedAchievements 
    : lockedAchievements;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 border-gray-500/30';
      case 'rare': return 'bg-blue-500/20 border-blue-500/30';
      case 'epic': return 'bg-purple-500/20 border-purple-500/30';
      case 'legendary': return 'bg-yellow-500/20 border-yellow-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const getProgressStats = () => {
    const total = achievements.length;
    const unlocked = unlockedAchievements.length;
    const percentage = Math.round((unlocked / total) * 100);

    const rarityCounts = {
      common: achievements.filter(a => a.rarity === 'common' && a.unlockedAt).length,
      rare: achievements.filter(a => a.rarity === 'rare' && a.unlockedAt).length,
      epic: achievements.filter(a => a.rarity === 'epic' && a.unlockedAt).length,
      legendary: achievements.filter(a => a.rarity === 'legendary' && a.unlockedAt).length
    };

    return { total, unlocked, percentage, rarityCounts };
  };

  const stats = getProgressStats();

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Achievements</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Unlock achievements and showcase your coding prowess</p>
      </motion.div>

      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
      >
        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.unlocked}/{stats.total}</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</div>
            <div className="text-xs text-primary-400">{stats.percentage}% Complete</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.rarityCounts.common}</div>
            <div className="text-sm text-gray-400">Common</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.rarityCounts.rare}</div>
            <div className="text-sm text-gray-400">Rare</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.rarityCounts.epic}</div>
            <div className="text-sm text-gray-400">Epic</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.rarityCounts.legendary}</div>
            <div className="text-sm text-gray-400">Legendary</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
            <span className="text-sm text-gray-400">{stats.percentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-purple-600 h-3 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:text-white'
            }`}
          >
            All ({achievements.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter === 'unlocked'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:text-white'
            }`}
          >
            Unlocked ({unlockedAchievements.length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter === 'locked'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:text-white'
            }`}
          >
            Locked ({lockedAchievements.length})
          </button>
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 ${
              achievement.unlockedAt 
                ? getRarityBg(achievement.rarity)
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            {achievement.unlockedAt && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  achievement.unlockedAt 
                    ? 'bg-white/20' 
                    : 'bg-slate-700/50'
                }`}>
                  {achievement.unlockedAt ? achievement.icon : <Lock className="w-6 h-6 text-gray-500" />}
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    achievement.unlockedAt ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                  <div className={`text-sm capitalize ${
                    achievement.unlockedAt ? getRarityColor(achievement.rarity) : 'text-gray-500'
                  }`}>
                    {achievement.rarity}
                  </div>
                </div>
              </div>

              <p className={`text-sm mb-4 ${
                achievement.unlockedAt ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {achievement.unlockedAt && (
                <div className="text-xs text-gray-400">
                  Unlocked {achievement.unlockedAt.toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Rarity indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${
              achievement.unlockedAt
                ? achievement.rarity === 'common' ? 'bg-gray-400' :
                  achievement.rarity === 'rare' ? 'bg-blue-400' :
                  achievement.rarity === 'epic' ? 'bg-purple-400' :
                  'bg-yellow-400'
                : 'bg-slate-600'
            }`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">
            {filter === 'unlocked' ? 'No achievements unlocked yet' : 'No achievements found'}
          </p>
          <p className="text-gray-500">
            {filter === 'unlocked' 
              ? 'Complete battles and solve problems to earn achievements!' 
              : 'Keep playing to discover more achievements!'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Achievements; 