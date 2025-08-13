import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Trophy, 
  Crown, 
  TrendingUp, 
  Users, 
  Star,
  Medal,
  Target,
  Flame
} from 'lucide-react';
import { LeaderboardEntry, Season } from '../types';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [userRank, setUserRank] = useState<number>(0);

  // Mock data for MVP
  useEffect(() => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: '1',
        displayName: 'CodeMaster_Pro',
        xp: 15420,
        goldXp: 1250,
        rank: 1,
        problemsSolved: 89
      },
      {
        userId: '2',
        displayName: 'AlgoWarrior',
        xp: 12850,
        goldXp: 980,
        rank: 2,
        problemsSolved: 76
      },
      {
        userId: '3',
        displayName: 'DataStruct_King',
        xp: 11200,
        goldXp: 850,
        rank: 3,
        problemsSolved: 67
      },
      {
        userId: '4',
        displayName: 'LeetCode_Legend',
        xp: 9850,
        goldXp: 720,
        rank: 4,
        problemsSolved: 58
      },
      {
        userId: '5',
        displayName: 'Competitive_Coder',
        xp: 8750,
        goldXp: 650,
        rank: 5,
        problemsSolved: 52
      },
      {
        userId: user?.uid || '6',
        displayName: user?.displayName || 'You',
        xp: user?.xp || 0,
        goldXp: user?.goldXp || 0,
        rank: 15,
        problemsSolved: user?.stats?.totalProblemsSolved || 0
      }
    ];

    setLeaderboard(mockLeaderboard.sort((a, b) => a.rank - b.rank));
    setUserRank(15);

    // Use current dates for the season
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0); // Last day of 3 months from now

    const mockSeason: Season = {
      id: '1',
      name: 'Season 4: Competitive Programming',
      startDate: startDate,
      endDate: endDate,
      isActive: true,
      leaderboard: mockLeaderboard,
      rewards: [
        {
          id: 'reward-1',
          season: 'Season 4',
          title: 'Season Champion',
          description: 'Top performer of the season',
          type: 'badge',
          requirement: { type: 'rank', value: 1 },
          reward: { goldXp: 500, badge: 'Golden Crown' },
          isActive: true,
          createdBy: 'system',
          createdAt: startDate,
          updatedAt: startDate
        },
        {
          id: 'reward-2',
          season: 'Season 4',
          title: 'Season Runner-up',
          description: 'Second place finisher',
          type: 'badge',
          requirement: { type: 'rank', value: 2 },
          reward: { goldXp: 300, badge: 'Silver Crown' },
          isActive: true,
          createdBy: 'system',
          createdAt: startDate,
          updatedAt: startDate
        },
        {
          id: 'reward-3',
          season: 'Season 4',
          title: 'Season Bronze',
          description: 'Third place finisher',
          type: 'badge',
          requirement: { type: 'rank', value: 3 },
          reward: { goldXp: 200, badge: 'Bronze Crown' },
          isActive: true,
          createdBy: 'system',
          createdAt: startDate,
          updatedAt: startDate
        },
        {
          id: 'reward-4',
          season: 'Season 4',
          title: 'Elite Top 10',
          description: 'Elite top 10 performer',
          type: 'title',
          requirement: { type: 'rank', value: 10 },
          reward: { goldXp: 100, title: 'Elite Warrior' },
          isActive: true,
          createdBy: 'system',
          createdAt: startDate,
          updatedAt: startDate
        },
        {
          id: 'reward-5',
          season: 'Season 4',
          title: 'Top 50 Performer',
          description: 'Top 50 performer',
          type: 'title',
          requirement: { type: 'rank', value: 50 },
          reward: { goldXp: 50, title: 'Elite Coder' },
          isActive: true,
          createdBy: 'system',
          createdAt: startDate,
          updatedAt: startDate
        }
      ]
    };

    setCurrentSeason(mockSeason);
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-medium text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'bg-slate-800/50 border-slate-700';
    }
  };

  const getTimeLeft = () => {
    if (!currentSeason) return '';
    const now = new Date().getTime();
    const end = currentSeason.endDate.getTime();
    const distance = end - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}d ${hours}h`;
    }
    return 'Season Ended';
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Leaderboard</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Compete with the best programmers and climb the rankings</p>
      </motion.div>

      {/* Season Info */}
      {currentSeason && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-r from-primary-900/20 to-purple-900/20 border-primary-700/30' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border mb-8`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentSeason.name}</h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentSeason.startDate.toLocaleDateString()} - {currentSeason.endDate.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Season Ends In</div>
              <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{getTimeLeft()}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* User Rank Card */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-primary-600/30' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border mb-8`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">{user.displayName?.charAt(0)}</span>
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.displayName}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your current rank</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-400">#{userRank}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>out of {leaderboard.length} players</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.xp}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gold-400">{user.goldXp}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Gold XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{user.stats?.totalProblemsSolved || 0}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Problems</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl border overflow-hidden`}
      >
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Top Players
          </h2>
        </div>

        <div className={`divide-y ${theme === 'dark' ? 'divide-slate-700' : 'divide-gray-200'}`}>
          {leaderboard.slice(0, 10).map((entry, index) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-6 transition-colors duration-200 ${
                entry.userId === user?.uid 
                  ? 'bg-primary-600/10 border-l-4 border-primary-500' 
                  : theme === 'dark' 
                    ? 'hover:bg-slate-700/30' 
                    : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {entry.displayName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{entry.displayName}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Level {Math.floor(entry.xp / 1000) + 1}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Problems</div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{entry.problemsSolved}</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Gold XP</div>
                    <div className="font-semibold text-gold-400">{entry.goldXp}</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</div>
                    <div className="font-semibold text-primary-400">{entry.xp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Season Rewards */}
      {currentSeason && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Season Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSeason.rewards.map((reward) => (
              <div
                key={reward.id}
                className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reward.title}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rank #{reward.requirement.value}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gold-400">+{reward.reward.goldXp} Gold XP</span>
                  </div>
                  {reward.reward.badge && (
                    <div className="text-sm text-purple-400">{reward.reward.badge}</div>
                  )}
                  {reward.reward.title && (
                    <div className="text-sm text-blue-400">{reward.reward.title}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard; 