import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Award, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Trophy
} from 'lucide-react';
import { SeasonReward } from '../types';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminRewards: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [rewards, setRewards] = useState<SeasonReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<SeasonReward | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReward, setEditingReward] = useState<SeasonReward | null>(null);
  const [newReward, setNewReward] = useState<Partial<SeasonReward>>({
    season: '',
    title: '',
    description: '',
    type: 'badge',
    requirement: { type: 'rank', value: 1 },
    reward: { goldXp: 0 },
    isActive: true,
    createdBy: 'admin',
  });

  // Real-time Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'rewards'), (snap) => {
      const list: SeasonReward[] = [];
      snap.forEach((docu) => {
        const d: any = docu.data();
        list.push({
          id: docu.id,
          season: d.season,
          title: d.title,
          description: d.description,
          type: d.type,
          requirement: d.requirement,
          reward: d.reward,
          isActive: !!d.isActive,
          createdBy: d.createdBy || 'admin',
          createdAt: d.createdAt?.toDate?.() || new Date(),
          updatedAt: d.updatedAt?.toDate?.() || new Date(),
        });
      });
      setRewards(list);
    });
    return () => unsub();
  }, []);

  const openAdd = () => {
    setNewReward({
      season: '',
      title: '',
      description: '',
      type: 'badge',
      requirement: { type: 'rank', value: 1 },
      reward: { goldXp: 0 },
      isActive: true,
      createdBy: adminUser?.uid || 'admin',
    });
    setShowAddModal(true);
  };

  const handleCreate = async () => {
    try {
      const payload: any = {
        season: newReward.season || '',
        title: newReward.title || '',
        description: newReward.description || '',
        type: newReward.type || 'badge',
        requirement: newReward.requirement || { type: 'rank', value: 1 },
        reward: newReward.reward || { goldXp: 0 },
        isActive: newReward.isActive ?? true,
        createdBy: newReward.createdBy || (adminUser?.uid || 'admin'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, 'rewards'), payload);
      setShowAddModal(false);
    } catch (e) {
      console.error('Failed to add reward', e);
      alert('Failed to add reward.');
    }
  };

  const openEdit = (reward: SeasonReward) => {
    setEditingReward({ ...reward });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editingReward) return;
    try {
      await updateDoc(doc(db, 'rewards', editingReward.id), {
        season: editingReward.season,
        title: editingReward.title,
        description: editingReward.description,
        type: editingReward.type,
        requirement: editingReward.requirement,
        reward: editingReward.reward,
        isActive: editingReward.isActive,
        updatedAt: new Date(),
      });
      setShowEditModal(false);
      setEditingReward(null);
    } catch (e) {
      console.error('Failed to update reward', e);
      alert('Failed to update reward.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this reward?')) return;
    try {
      await deleteDoc(doc(db, 'rewards', id));
    } catch (e) {
      console.error('Failed to delete reward', e);
      alert('Failed to delete reward.');
    }
  };

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading admin rewards...</p>
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

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'badge': return 'text-purple-400';
      case 'title': return 'text-blue-400';
      case 'cosmetic': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRequirementText = (requirement: any) => {
    switch (requirement.type) {
      case 'rank': return `Rank #${requirement.value}`;
      case 'level': return `Level ${requirement.value}`;
      case 'xp': return `${requirement.value} XP`;
      case 'wins': return `${requirement.value} Wins`;
      case 'streak': return `${requirement.value} Win Streak`;
      case 'problems': return `${requirement.value} Problems Solved`;
      default: return `${requirement.value}`;
    }
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
            Reward Management{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>🎁</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Create, edit, and manage season rewards and achievements
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
                <Trophy className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rewards.length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Rewards</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rewards.filter(r => r.isActive).length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Rewards</div>
              </div>
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
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rewards.filter(r => r.type === 'badge').length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Badges</div>
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
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rewards.filter(r => r.type === 'title').length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Titles</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rewards Table */}
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
                <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                Reward Management
              </h2>
              <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Reward</span>
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
                    Reward
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Type
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Requirement
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Status
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
                {rewards.map((reward) => (
                  <tr key={reward.id} className={`transition-colors duration-200 ${
                    theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'
                  }`}>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>{reward.title}</div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                        }`}>{reward.description}</div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                        }`}>{reward.season}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRewardTypeColor(reward.type)}`}>
                        {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                    }`}>
                      {getRequirementText(reward.requirement)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reward.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {reward.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowRewardModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(reward)} className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(reward.id)} className="text-red-400 hover:text-red-300 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Reward Details Modal */}
        {showRewardModal && selectedReward && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Reward Details</h2>
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Reward Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedReward.title}</h3>
                  <p className="text-gray-400 mb-4">{selectedReward.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRewardTypeColor(selectedReward.type)}`}>
                      {selectedReward.type.charAt(0).toUpperCase() + selectedReward.type.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedReward.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedReward.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Reward Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Requirement</h4>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-sm text-white">{getRequirementText(selectedReward.requirement)}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Type: {selectedReward.requirement.type}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Reward</h4>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-sm text-yellow-400">{selectedReward.reward.goldXp} Gold XP</div>
                      {selectedReward.reward.badge && (
                        <div className="text-sm text-purple-400 mt-1">Badge: {selectedReward.reward.badge}</div>
                      )}
                      {selectedReward.reward.title && (
                        <div className="text-sm text-blue-400 mt-1">Title: {selectedReward.reward.title}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Season Info */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Season Information</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-white">{selectedReward.season}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Created: {selectedReward.createdAt.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Last Updated: {selectedReward.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      // Toggle reward status
                      setRewards(prev => prev.map(r => 
                        r.id === selectedReward.id ? { ...r, isActive: !r.isActive } : r
                      ));
                      setShowRewardModal(false);
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 ${
                      selectedReward.isActive 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedReward.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setShowRewardModal(false)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Reward Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add Reward</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors duration-200">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
                  <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.season as string) || ''} onChange={(e) => setNewReward(r => ({ ...r, season: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.title as string) || ''} onChange={(e) => setNewReward(r => ({ ...r, title: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={3} value={(newReward.description as string) || ''} onChange={(e) => setNewReward(r => ({ ...r, description: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.type as string) || 'badge'} onChange={(e) => setNewReward(r => ({ ...r, type: e.target.value as any }))}>
                    <option value="badge">Badge</option>
                    <option value="title">Title</option>
                    <option value="emote">Emote</option>
                    <option value="theme">Theme</option>
                    <option value="bonus">Bonus</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Requirement Type</label>
                    <select className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.requirement?.type as any) || 'rank'} onChange={(e) => setNewReward(r => ({
                      ...r,
                      requirement: {
                        type: e.target.value as any,
                        value: r.requirement?.value ?? 1,
                      },
                    }))}>
                      <option value="rank">Rank</option>
                      <option value="level">Level</option>
                      <option value="xp">XP</option>
                      <option value="wins">Wins</option>
                      <option value="streak">Streak</option>
                      <option value="problems">Problems</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Requirement Value</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.requirement?.value as number) || 1} onChange={(e) => setNewReward(r => ({
                      ...r,
                      requirement: {
                        type: (r.requirement?.type as any) ?? 'rank',
                        value: parseInt(e.target.value) || 1,
                      },
                    }))} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gold XP</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.reward?.goldXp as number) || 0} onChange={(e) => setNewReward(r => ({ ...r, reward: { goldXp: parseInt(e.target.value) || 0 } }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title/Badge</label>
                    <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={(newReward.reward?.title || newReward.reward?.badge || '') as string} onChange={(e) => setNewReward(r => ({ ...r, reward: { ...(r.reward || {}), title: e.target.value } }))} />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                  <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200">Cancel</button>
                  <button onClick={handleCreate} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">Create Reward</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Reward Modal */}
        {showEditModal && editingReward && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Reward</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white transition-colors duration-200">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
                  <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.season} onChange={(e) => setEditingReward(r => ({ ...r!, season: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.title} onChange={(e) => setEditingReward(r => ({ ...r!, title: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={3} value={editingReward.description} onChange={(e) => setEditingReward(r => ({ ...r!, description: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.type} onChange={(e) => setEditingReward(r => ({ ...r!, type: e.target.value as any }))}>
                    <option value="badge">Badge</option>
                    <option value="title">Title</option>
                    <option value="emote">Emote</option>
                    <option value="theme">Theme</option>
                    <option value="bonus">Bonus</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Requirement Type</label>
                    <select className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.requirement.type} onChange={(e) => setEditingReward(r => ({ ...r!, requirement: { ...r!.requirement, type: e.target.value as any } }))}>
                      <option value="rank">Rank</option>
                      <option value="level">Level</option>
                      <option value="xp">XP</option>
                      <option value="wins">Wins</option>
                      <option value="streak">Streak</option>
                      <option value="problems">Problems</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Requirement Value</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.requirement.value} onChange={(e) => setEditingReward(r => ({ ...r!, requirement: { ...r!.requirement, value: parseInt(e.target.value) } }))} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gold XP</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.reward.goldXp || 0} onChange={(e) => setEditingReward(r => ({ ...r!, reward: { ...r!.reward, goldXp: parseInt(e.target.value) } }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title/Badge</label>
                    <input className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" value={editingReward.reward.title || editingReward.reward.badge || ''} onChange={(e) => setEditingReward(r => ({ ...r!, reward: { ...r!.reward, title: e.target.value } }))} />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                  <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200">Cancel</button>
                  <button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRewards;
