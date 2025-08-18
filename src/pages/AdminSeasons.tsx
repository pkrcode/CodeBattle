import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Trophy,
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  Award,
  X,
  Save
} from 'lucide-react';
import { Season } from '../types';

const AdminSeasons: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [seasons, setSeasons] = useState<Season[]>([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockSeasons: Season[] = [
      {
        id: '1',
        name: 'Winter 2024',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        isActive: true,
        leaderboard: [],
        rewards: [
          {
            id: '1',
            season: 'Winter 2024',
            title: 'Winter Champion',
            description: 'First place in winter season',
            type: 'badge',
            requirement: {
              type: 'rank',
              value: 1
            },
            reward: {
              xp: 1000,
              goldXp: 500,
              badge: 'Winter Champion'
            },
            isActive: true,
            createdBy: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            season: 'Winter 2024',
            title: 'Winter Runner-up',
            description: 'Second place in winter season',
            type: 'title',
            requirement: {
              type: 'rank',
              value: 2
            },
            reward: {
              xp: 750,
              goldXp: 300,
              title: 'Winter Runner-up'
            },
            isActive: true,
            createdBy: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      },
      {
        id: '2',
        name: 'Spring 2024',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-30'),
        isActive: false,
        leaderboard: [],
        rewards: [
          {
            id: '1',
            season: 'Spring 2024',
            title: 'Spring Champion',
            description: 'First place in spring season',
            type: 'badge',
            requirement: {
              type: 'rank',
              value: 1
            },
            reward: {
              xp: 1200,
              goldXp: 600,
              badge: 'Spring Champion'
            },
            isActive: true,
            createdBy: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    ];
    setSeasons(mockSeasons);
  }, []);

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading admin seasons...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const getSeasonStatus = (season: Season) => {
    const now = new Date();
    if (now < season.startDate) return 'upcoming';
    if (now >= season.startDate && now <= season.endDate) return 'active';
    return 'completed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'upcoming': return 'text-blue-400';
      case 'completed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const handleEditSeason = (season: Season) => {
    setEditingSeason({ ...season });
    setShowEditModal(true);
  };

  const handleSaveSeason = () => {
    if (editingSeason) {
      setSeasons(prevSeasons => 
        prevSeasons.map(season => 
          season.id === editingSeason.id 
            ? { ...editingSeason, updatedAt: new Date() }
            : season
        )
      );
      setShowEditModal(false);
      setEditingSeason(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingSeason(null);
  };

  const handleInputChange = (field: keyof Season, value: any) => {
    if (editingSeason) {
      setEditingSeason({ ...editingSeason, [field]: value });
    }
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    if (editingSeason) {
      setEditingSeason({ 
        ...editingSeason, 
        [field]: new Date(value) 
      });
    }
  };

  const activateSeason = (seasonId: string) => {
    setSeasons(prevSeasons => 
      prevSeasons.map(season => ({
        ...season,
        isActive: season.id === seasonId
      }))
    );
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'}`}>
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
            Season Management{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>🏆</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Create, edit, and manage competitive seasons
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{seasons.length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Seasons</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {seasons.filter(s => getSeasonStatus(s) === 'active').length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Seasons</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {seasons.filter(s => getSeasonStatus(s) === 'upcoming').length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming Seasons</div>
              </div>
            </div>
          </div>

          <div className={`card battle-card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {seasons.reduce((total, season) => total + season.rewards.length, 0)}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Rewards</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Seasons Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          } overflow-hidden`}
        >
          <div className={`p-6 border-b ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold flex items-center ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                Season Management
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Season</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Season
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Duration
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Rewards
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200'
              }`}>
                {seasons.map((season) => {
                  const status = getSeasonStatus(season);
                  return (
                    <tr key={season.id} className={`transition-colors duration-200 ${
                      theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'
                    }`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>{season.name}</div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                          }`}>
                            {season.startDate.toLocaleDateString()} - {season.endDate.toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                      }`}>
                        {Math.ceil((season.endDate.getTime() - season.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                      }`}>
                        {season.rewards.length} rewards
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditSeason(season)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                            title="Edit Season"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {status === 'upcoming' && (
                            <button 
                              onClick={() => activateSeason(season.id)}
                              className="text-green-400 hover:text-green-300 transition-colors duration-200"
                              title="Activate Season"
                            >
                              <Trophy className="w-4 h-4" />
                            </button>
                          )}
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-200" title="Delete Season">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Edit Season Modal */}
        {showEditModal && editingSeason && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Season</h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Season Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Season Name
                  </label>
                  <input
                    type="text"
                    value={editingSeason.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                    placeholder="Enter season name"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingSeason.startDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editingSeason.endDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingSeason.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Active Season</span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSeason}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSeasons;
