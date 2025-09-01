import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Edit, 
  Save, 
  X, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp, 
  Award, 
  Flame, 
  RefreshCw,
  BookOpen,
  Clock,
  BarChart2,
  History
} from 'lucide-react';
import ProfileIcon, { availableIcons, getRandomIcon } from '../components/ProfileIcons';
import RankBadge from '../components/RankBadge';
import { summarizeProgress } from '../utils/aptitudeService';
import { getDemoAchievements } from '../data/achievementsData';
import type { AptitudeSessionRecord } from '../types';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { theme } = useTheme();
  const { user, updateUserProfile } = useAuth();
  const { adminUser, updateAdminProfile } = useAdminAuth();
  
  // Use admin user if available, otherwise use regular user
  const currentUser = adminUser || user;
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [selectedIcon, setSelectedIcon] = useState(currentUser?.profileIcon || 'star');
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'icons' | 'upload'>('icons');
  // Aptitude progress
  const [aptitudeSessions, setAptitudeSessions] = useState<AptitudeSessionRecord[]>([]);
  const [topicStats, setTopicStats] = useState<Array<{ topic: string; attempts: number; correct: number; wrong: number }>>([]);
  
  // Admin-specific editing states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [role, setRole] = useState<'admin' | 'superadmin'>(currentUser?.role as 'admin' | 'superadmin' || 'admin');

  // Update state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setSelectedIcon(currentUser.profileIcon || 'star');
      setEmail(currentUser.email || '');
      setRole(currentUser.role as 'admin' | 'superadmin' || 'admin');
    }
  }, [currentUser]);

  // Load aptitude practice progress (local MVP)
  useEffect(() => {
    if (!currentUser?.uid) return;
    const { sessions, byTopic } = summarizeProgress(currentUser.uid);
    setAptitudeSessions((sessions || []).slice(0, 5));
    const topicArr = Array.from(byTopic.entries()).map(([topic, stats]) => ({ topic, ...stats }));
    topicArr.sort((a, b) => b.attempts - a.attempts);
    setTopicStats(topicArr.slice(0, 8));
  }, [currentUser?.uid]);

  // If the user has no achievements yet, populate a demo set for display parity with Achievements page
  const recentAchievements = (currentUser?.achievements && currentUser.achievements.length > 0)
    ? currentUser.achievements
    : getDemoAchievements();

  const handleSave = async () => {
    if (!currentUser) return;
    
    try {
      // Use admin update function if user is admin, otherwise use regular update
      if (adminUser) {
        await updateAdminProfile({
          displayName: displayName.trim(),
          profileIcon: selectedIcon
        });
      } else {
        await updateUserProfile({
          displayName: displayName.trim(),
          profileIcon: selectedIcon
        });
      }
      setIsEditing(false);
      setShowIconSelector(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleRandomIcon = () => {
    setSelectedIcon(getRandomIcon());
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomImage(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (customImage) {
      if (adminUser) {
        await updateAdminProfile({ 
          photoURL: customImage,
          profileIcon: undefined // Clear icon when using custom image
        });
      } else {
        await updateUserProfile({ 
          photoURL: customImage,
          profileIcon: undefined // Clear icon when using custom image
        });
      }
      setShowIconSelector(false);
    }
  };

  const handleRemoveImage = () => {
    setCustomImage(null);
    if (adminUser) {
      updateAdminProfile({ 
        photoURL: null,
        profileIcon: selectedIcon // Restore icon when removing image
      });
    } else {
      updateUserProfile({ 
        photoURL: null,
        profileIcon: selectedIcon // Restore icon when removing image
      });
    }
  };

  const handleSaveEmail = async () => {
    if (!currentUser || !email.trim()) return;
    
    try {
      if (adminUser) {
        await updateAdminProfile({
          email: email.trim()
        });
      } else {
        await updateUserProfile({
          email: email.trim()
        });
      }
      setIsEditingEmail(false);
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleSaveRole = async () => {
    if (!currentUser || !role) return;
    
    try {
      if (adminUser) {
        // For admin users, only allow admin or superadmin roles
        await updateAdminProfile({
          role: role as 'admin' | 'superadmin'
        });
      } else {
        // For regular users, allow any role
        await updateUserProfile({
          role: role as 'user' | 'admin' | 'superadmin'
        });
      }
      setIsEditingRole(false);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return 'text-gray-400';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-cyan-500';
      case 'Diamond': return 'text-purple-500';
      default: return 'text-gray-300';
    }
  };

  const getProgressToNextLevel = () => {
    if (!currentUser) return 0;
    const currentLevel = currentUser.level;
    const xpForCurrentLevel = (currentLevel - 1) * 1000;
    const xpForNextLevel = currentLevel * 1000;
    const progress = ((currentUser.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your coding journey and achievements</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
                      <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-gradient-to-r from-slate-700 to-slate-800' : 'bg-gradient-to-r from-gray-200 to-gray-300'} rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden`}
                     onClick={() => setShowIconSelector(!showIconSelector)}>
                  {customImage ? (
                    <img 
                      src={customImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileIcon 
                      icon={selectedIcon} 
                      className={theme === 'dark' ? 'text-white' : 'text-gray-700'} 
                      size={32}
                    />
                  )}
                </div>
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 ${theme === 'dark' ? 'border-slate-800' : 'border-white'} flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
                                            {/* Icon Selector */}
                {showIconSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 p-4 ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-100 border-gray-300'} rounded-lg border`}
                  >
                                         {/* Tab Navigation */}
                     <div className={`flex mb-4 border-b ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                       <button
                         onClick={() => setActiveTab('icons')}
                         className={`px-3 py-2 text-sm font-medium transition-colors ${
                           activeTab === 'icons' ? 'text-primary-400 border-b-2 border-primary-400' : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                         }`}
                       >
                         Icons
                       </button>
                       <button
                         onClick={() => setActiveTab('upload')}
                         className={`px-3 py-2 text-sm font-medium transition-colors ${
                           activeTab === 'upload' ? 'text-primary-400 border-b-2 border-primary-400' : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                         }`}
                       >
                         Upload Image
                       </button>
                     </div>

                                         {/* Icons Tab */}
                     {activeTab === 'icons' && (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Choose Icon</h3>
                          <button
                            onClick={handleRandomIcon}
                            className="p-1 text-primary-400 hover:text-primary-300 transition-colors"
                            title="Random Icon"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto mb-4">
                          {availableIcons.map((icon) => (
                            <button
                              key={icon}
                              onClick={() => setSelectedIcon(icon)}
                              className={`p-2 rounded-lg transition-colors ${
                                selectedIcon === icon
                                  ? 'bg-primary-600 text-white'
                                  : theme === 'dark' 
                                    ? 'bg-slate-600 text-gray-300 hover:bg-slate-500 hover:text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                              }`}
                            >
                              <ProfileIcon icon={icon} size={20} />
                            </button>
                          ))}
                        </div>
                        <div className={`flex items-center justify-end space-x-2 pt-2 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                          <button
                            onClick={() => setShowIconSelector(false)}
                            className={`px-3 py-1 text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                          >
                            Save Icon
                          </button>
                        </div>
                      </>
                    )}

                                         {/* Upload Image Tab */}
                     {activeTab === 'upload' && (
                      <>
                        <div className="mb-4">
                          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>Upload Image</h3>
                          <div className="flex items-center justify-center w-full">
                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                              theme === 'dark' 
                                ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50' 
                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                            }`}>
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {isUploading ? (
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
                                ) : (
                                  <>
                                    <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className={`mb-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                      <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>PNG, JPG, GIF up to 10MB</p>
                                  </>
                                )}
                              </div>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                        </div>
                        
                        {customImage && (
                          <div className="mb-4">
                            <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Preview:</h4>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={customImage} 
                                alt="Preview" 
                                className={`w-16 h-16 rounded-full object-cover border-2 ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}
                              />
                              <button
                                onClick={handleRemoveImage}
                                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}

                        <div className={`flex items-center justify-end space-x-2 pt-2 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                          <button
                            onClick={() => setShowIconSelector(false)}
                            className={`px-3 py-1 text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveImage}
                            disabled={!customImage}
                            className={`px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors ${
                              !customImage ? (theme === 'dark' ? 'disabled:bg-slate-600' : 'disabled:bg-gray-300') + ' disabled:cursor-not-allowed' : ''
                            }`}
                          >
                            Save Image
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Display Name</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(currentUser?.displayName || '');
                      }}
                      className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:border-primary-500 ${
                      theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter display name"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg`}>{currentUser?.displayName || 'No display name set'}</p>
                </div>
              )}

              <div className="flex flex-col items-center">
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center break-all max-w-full`} title={currentUser?.email}>
                  {currentUser?.email && currentUser.email.length > 30 
                    ? `${currentUser.email.substring(0, 30)}...` 
                    : currentUser?.email}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Member since {currentUser?.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            {/* Admin-specific editable fields */}
            {adminUser && (
              <div className={`space-y-4 mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-300'}`}>
                {/* Email Editing */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                  {!isEditingEmail ? (
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEmail}
                        className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingEmail(false);
                          setEmail(currentUser?.email || '');
                        }}
                        className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditingEmail ? (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:border-primary-500 ${
                        theme === 'dark'
                          ? 'bg-slate-700 border border-slate-600 text-white placeholder-slate-400'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter new email"
                    />
                    <p className="text-xs text-yellow-400">
                      ⚠️ Note: Changing email will require re-authentication on next login
                    </p>
                  </div>
                ) : (
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} break-all max-w-full`} title={currentUser?.email}>
                    {currentUser?.email && currentUser.email.length > 40 
                      ? `${currentUser.email.substring(0, 40)}...` 
                      : currentUser?.email}
                  </p>
                )}

                {/* Role Editing */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Role</h3>
                  {!isEditingRole ? (
                    <button
                      onClick={() => setIsEditingRole(true)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveRole}
                        className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingRole(false);
                          setRole(currentUser?.role as 'admin' | 'superadmin' || 'admin');
                        }}
                        className={`px-3 py-1 text-sm rounded transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditingRole ? (
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'superadmin')}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:border-primary-500 ${
                      theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                ) : (
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} capitalize`}>{currentUser?.role}</p>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser?.level || 1}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-400">{currentUser?.goldXp || 0}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Gold XP</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>XP Progress</span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{currentUser?.xp || 0} / {(currentUser?.level || 1) * 1000} XP</span>
              </div>
              <div className={`w-full rounded-full h-2 mb-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-slate-600 to-slate-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
                  style={{ width: `${getProgressToNextLevel()}%` }}
                ></div>
              </div>
            </div>

            {/* Rank */}
            <div className="text-center mb-6">
              <RankBadge rank={currentUser?.rank} />
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Gold XP</span>
                <span className="text-gold-400 font-semibold">{currentUser?.goldXp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Win Rate</span>
                <span className="text-green-400 font-semibold">{currentUser?.stats?.winRate || 0}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Current Streak</span>
                <span className="text-purple-400 font-semibold">{currentUser?.stats?.currentStreak || 0}</span>
              </div>
            </div>

            {/* Battle Statistics (moved to left column) */}
            <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border mt-6`}>
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
                Battle Statistics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} text-center p-3 rounded-lg`}>
                  <div className="text-xl sm:text-2xl font-bold text-primary-400">{currentUser?.stats?.totalMatchesPlayed || 0}</div>
                  <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Total Battles</div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} text-center p-3 rounded-lg`}>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">{currentUser?.stats?.totalMatchesWon || 0}</div>
                  <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Battles Won</div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} text-center p-3 rounded-lg`}>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">{currentUser?.stats?.totalProblemsSolved || 0}</div>
                  <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Problems Solved</div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} text-center p-3 rounded-lg`}>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">{currentUser?.stats?.longestStreak || 0}</div>
                  <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Longest Streak</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats & Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Detailed Stats moved to left column */}

          {/* Recent Achievements */}
          <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Recent Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(recentAchievements || [])
                .filter(a => !!a.unlockedAt)
                .sort((a, b) => (b.unlockedAt?.getTime?.() || 0) - (a.unlockedAt?.getTime?.() || 0))
                .slice(0, 6)
                .map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'}`}
                >
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{achievement.name}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.description}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {achievement.unlockedAt ? (achievement.unlockedAt as Date).toLocaleDateString() : 'Not unlocked'}
                    </div>
                  </div>
                </div>
              ))}
              {(!recentAchievements || (recentAchievements.filter(a => !!a.unlockedAt).length === 0)) && (
                <div className="col-span-2 text-center py-8">
                  <Award className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No achievements yet</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Complete battles and solve problems to earn achievements!</p>
                </div>
              )}
            </div>
          </div>

          {/* Aptitude Progress */}
          <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <BarChart2 className="w-5 h-5 mr-2 text-primary-400" />
                Aptitude Progress
              </h2>
              <div className="flex items-center gap-3">
                <Link to="/aptitude/practice" className="text-sm text-primary-400 hover:text-primary-300">Practice</Link>
                <Link to="/aptitude/library" className="text-sm text-primary-400 hover:text-primary-300">Library</Link>
              </div>
            </div>

            {/* Recent sessions */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} flex items-center`}><History className="w-4 h-4 mr-2"/>Recent Sessions</h3>
              {aptitudeSessions.length > 0 ? (
                <div className="space-y-3">
                  {aptitudeSessions.map((s, idx) => {
                    const total = s.questionCount;
                    const acc = total ? Math.round((s.correct / total) * 100) : 0;
                    const durationSec = s.durationSec ?? Math.max(0, Math.round((new Date(s.endedAt).getTime() - new Date(s.startedAt).getTime()) / 1000));
                    return (
                      <div key={idx} className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} p-3 rounded-lg flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-primary-400" />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.difficulty.toUpperCase()} • {s.topics.length ? s.topics.join(', ') : 'All Topics'}</div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(s.startedAt).toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-400">{s.correct}/{total}</div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Acc {acc}% • Wrong {s.wrong}</div>
                          </div>
                          <div className="flex items-center text-xs">
                            <Clock className="w-4 h-4 mr-1 opacity-70" />
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{durationSec}s</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>No practice sessions yet</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Start with a topic-wise practice or browse the library.</p>
                  <div className="mt-3 flex items-center justify-center gap-4">
                    <Link to="/aptitude/practice" className="px-3 py-1.5 rounded bg-primary-600 text-white text-sm hover:bg-primary-700">Start Practice</Link>
                    <Link to="/aptitude/library" className={`text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>View Library</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Per-topic stats */}
            <div>
              <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} flex items-center`}><Target className="w-4 h-4 mr-2"/>By Topic</h3>
              {topicStats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topicStats.map(t => {
                    const total = t.correct + t.wrong;
                    const acc = total ? Math.round((t.correct / total) * 100) : 0;
                    return (
                      <div key={t.topic} className={`${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'} p-3 rounded-lg flex items-center justify-between`}>
                        <div>
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.topic}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.attempts} attempts</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-400">{acc}% acc</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>C {t.correct} • W {t.wrong}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No topic stats yet</p>
              )}
            </div>
          </div>

          {/* Battle History Summary */}
          <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Trophy className="w-5 h-5 mr-2 text-gold-400" />
              Battle History
            </h2>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Best Win Streak</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{currentUser?.stats?.longestStreak || 0} consecutive wins</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">{currentUser?.stats?.longestStreak || 0}</div>
                </div>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problems Solved</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>This season</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-400">{currentUser?.stats?.problemsSolvedThisSeason || 0}</div>
                </div>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Current Streak</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active win streak</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-400">{currentUser?.stats?.currentStreak || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Profile; 