import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  MessageCircle,
  Search,
  Crown,
  Target,
  Zap
} from 'lucide-react';
import { User, FriendRequest } from '../types';

const Friends: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  // Mock data for MVP
  useEffect(() => {
    const mockFriends: User[] = [
      {
        uid: '1',
        email: 'friend1@example.com',
        displayName: 'CodeMaster_Pro',
        photoURL: undefined,
        xp: 15420,
        goldXp: 1250,
        level: 15,
        rank: 'Diamond',
        friends: [],
        isOnline: true,
        lastSeen: new Date(),
        achievements: [],
        stats: {
          totalProblemsSolved: 89,
          totalMatchesWon: 45,
          totalMatchesLost: 22,
          totalMatchesPlayed: 67,
          winRate: 67,
          currentStreak: 5,
          longestStreak: 12,
          problemsSolvedThisSeason: 23
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: '2',
        email: 'friend2@example.com',
        displayName: 'AlgoWarrior',
        photoURL: undefined,
        xp: 12850,
        goldXp: 980,
        level: 12,
        rank: 'Platinum',
        friends: [],
        isOnline: false,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        achievements: [],
        stats: {
          totalProblemsSolved: 76,
          totalMatchesWon: 38,
          totalMatchesLost: 20,
          totalMatchesPlayed: 58,
          winRate: 65,
          currentStreak: 0,
          longestStreak: 8,
          problemsSolvedThisSeason: 18
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: '3',
        email: 'friend3@example.com',
        displayName: 'DataStruct_King',
        photoURL: undefined,
        xp: 11200,
        goldXp: 850,
        level: 11,
        rank: 'Gold',
        friends: [],
        isOnline: true,
        lastSeen: new Date(),
        achievements: [],
        stats: {
          totalProblemsSolved: 67,
          totalMatchesWon: 32,
          totalMatchesLost: 17,
          totalMatchesPlayed: 49,
          winRate: 65,
          currentStreak: 3,
          longestStreak: 7,
          problemsSolvedThisSeason: 15
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const mockFriendRequests: FriendRequest[] = [
      {
        id: '1',
        fromUserId: '4',
        toUserId: user?.uid || '',
        status: 'pending',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];

    setFriends(mockFriends);
    setFriendRequests(mockFriendRequests);
  }, [user]);

  const filteredFriends = friends.filter(friend =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = friends.filter(friend => friend.isOnline);
  const offlineFriends = friends.filter(friend => !friend.isOnline);

  const handleAddFriend = () => {
    // Mock add friend functionality
    if (newFriendEmail.trim()) {
      setShowAddFriend(false);
      setNewFriendEmail('');
      // In real app, this would send a friend request
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    // In real app, this would accept the friend request
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    // In real app, this would reject the friend request
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date().getTime();
    const time = date.getTime();
    const diff = now - time;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

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

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Friends</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Connect with other programmers and battle together</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{friends.length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Friends</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{onlineFriends.length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Online</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{friendRequests.length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Requests</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>12</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Battles Together</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Friends List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-400" />
                  Friends
                </h2>
                <button
                  onClick={() => setShowAddFriend(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Friend</span>
                </button>
              </div>
              
              {/* Search */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-700">
              {/* Online Friends */}
              {onlineFriends.length > 0 && (
                <div>
                  <div className="px-6 py-3 bg-green-500/10">
                    <h3 className="text-sm font-medium text-green-400">Online ({onlineFriends.length})</h3>
                  </div>
                  {onlineFriends.map((friend) => (
                    <FriendCard key={friend.uid} friend={friend} />
                  ))}
                </div>
              )}

              {/* Offline Friends */}
              {offlineFriends.length > 0 && (
                <div>
                  <div className="px-6 py-3 bg-slate-700/30">
                    <h3 className="text-sm font-medium text-gray-400">Offline ({offlineFriends.length})</h3>
                  </div>
                  {offlineFriends.map((friend) => (
                    <FriendCard key={friend.uid} friend={friend} />
                  ))}
                </div>
              )}

              {filteredFriends.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No friends found</p>
                  <p className="text-gray-500 text-sm">Add some friends to get started!</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Friend Requests & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Friend Requests */}
          {friendRequests.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-yellow-400" />
                Friend Requests
              </h2>
              <div className="space-y-3">
                {friendRequests.map((request) => (
                  <div key={request.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">U</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">Unknown User</div>
                        <div className="text-sm text-gray-400">{getTimeAgo(request.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors duration-200"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Zap className="w-5 h-5" />
                <span>Start Team Battle</span>
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <MessageCircle className="w-5 h-5" />
                <span>Group Chat</span>
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Target className="w-5 h-5" />
                <span>Create Tournament</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add Friend</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Friend's Email
                </label>
                <input
                  type="email"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter friend's email"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddFriend}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowAddFriend(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Friend Card Component
const FriendCard: React.FC<{ friend: User }> = ({ friend }) => {
  const getTimeAgo = (date: Date) => {
    const now = new Date().getTime();
    const time = date.getTime();
    const diff = now - time;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

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

  return (
    <div className="p-6 hover:bg-slate-700/30 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {friend.displayName.charAt(0)}
              </span>
            </div>
            {friend.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{friend.displayName}</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`${getRankColor(friend.rank)}`}>{friend.rank}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">Lv.{friend.level}</span>
              {!friend.isOnline && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{getTimeAgo(friend.lastSeen)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{friend.xp.toLocaleString()}</div>
            <div className="text-xs text-gray-400">XP</div>
          </div>
          <div className="flex space-x-1">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors duration-200">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors duration-200">
              <Target className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends; 