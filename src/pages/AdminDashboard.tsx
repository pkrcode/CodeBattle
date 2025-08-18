import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  UserPlus, 
  Eye, 
  Activity,
  User as UserIcon,
  Trash2
} from 'lucide-react';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const { demoteToUser, deleteUser, promoteToAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingUsers, setDeletingUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData: User[] = [];
        
        usersSnapshot.forEach((doc) => {
          const userData = doc.data() as any;
          usersData.push({
            ...userData,
            uid: doc.id,
            createdAt: userData.createdAt?.toDate?.() || new Date(),
            updatedAt: userData.updatedAt?.toDate?.() || new Date(),
            lastSeen: userData.lastSeen?.toDate?.() || new Date(),
            achievements: userData.achievements?.map((achievement: any) => ({
              ...achievement,
              unlockedAt: achievement.unlockedAt?.toDate?.() || new Date()
            })) || []
          });
        });
        
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-slate-900'} mx-auto mb-4`}></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading admin dashboard...</p>
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

  const handlePromoteToAdmin = async (userId: string, role: 'admin' | 'superadmin' = 'admin') => {
    try {
      // Call the actual promoteToAdmin function from AuthContext
      await promoteToAdmin(userId, role);
      
      // Update the user in the local list
      setUsers(prev => prev.map(user => 
        user.uid === userId ? { ...user, role } : user
      ));
      
      console.log(`Successfully promoted user ${userId} to ${role}`);
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Failed to promote user. Please try again.');
    }
  };

  const handleDemoteToUser = async (userId: string) => {
    try {
      await demoteToUser(userId);
      // Refresh the user list to get updated data
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData: User[] = [];
      
      usersSnapshot.forEach((doc) => {
        const userData = doc.data() as any;
        usersData.push({
          ...userData,
          uid: doc.id,
          createdAt: userData.createdAt?.toDate?.() || new Date(),
          updatedAt: userData.updatedAt?.toDate?.() || new Date(),
          lastSeen: userData.lastSeen?.toDate?.() || new Date(),
          achievements: userData.achievements?.map((achievement: any) => ({
            ...achievement,
            unlockedAt: achievement.unlockedAt?.toDate?.() || new Date()
          })) || []
        });
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error demoting user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Find the user to check their role
    const userToDelete = users.find(user => user.uid === userId);
    
    // Prevent superadmin from deleting themselves
    if (userToDelete?.role === 'superadmin' && adminUser?.uid === userId) {
      alert('Superadmin cannot delete their own account');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingUsers(prev => new Set(prev).add(userId));
      await deleteUser(userId);
      
      // Remove user from local state
      setUsers(prev => prev.filter(user => user.uid !== userId));
      
      // Close modal if the deleted user was selected
      if (selectedUser?.uid === userId) {
        setShowUserModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setDeletingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const cleanupDuplicateUsers = async () => {
    if (!window.confirm('This will delete duplicate users by email. Keep the oldest account for each email. Continue?')) {
      return;
    }

    try {
      // Find duplicate users by email
      const emailCounts: { [key: string]: string[] } = {};
      users.forEach(user => {
        if (!emailCounts[user.email]) {
          emailCounts[user.email] = [];
        }
        emailCounts[user.email].push(user.uid);
      });

      // Find emails with duplicates
      const duplicatesToDelete: string[] = [];
      Object.entries(emailCounts).forEach(([email, uids]) => {
        if (uids.length > 1) {
          // Keep the first one (oldest), delete the rest
          duplicatesToDelete.push(...uids.slice(1));
        }
      });

      if (duplicatesToDelete.length === 0) {
        alert('No duplicate users found.');
        return;
      }

      // Delete duplicate users from Firebase
      for (const userId of duplicatesToDelete) {
        try {
          await deleteDoc(doc(db, 'users', userId));
          console.log(`Deleted duplicate user: ${userId}`);
        } catch (error) {
          console.error(`Failed to delete user ${userId}:`, error);
        }
      }

      // Remove deleted users from local state
      setUsers(prev => prev.filter(user => !duplicatesToDelete.includes(user.uid)));
      
      alert(`Successfully deleted ${duplicatesToDelete.length} duplicate users.`);
    } catch (error) {
      console.error('Error cleaning up duplicate users:', error);
      alert('Failed to clean up duplicate users. Please try again.');
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'superadmin': return 'text-red-500';
      case 'admin': return 'text-purple-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (isOnline: boolean) => {
    return isOnline ? 'text-green-400' : 'text-gray-400';
  };

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
            Admin Dashboard{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>🛡️</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Manage users, content, and system settings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Total Users
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.length}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Online Users
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.isOnline).length}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Active Questions
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  25
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}>
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Total Battles
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  1,234
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-100'
              }`}>
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Users Management */}
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
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                User Management
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={cleanupDuplicateUsers}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  Clean Duplicates
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Level
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Role
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className={`text-center py-8 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-700'
                    }`}>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`text-center py-8 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.uid} className={`transition-colors duration-200 ${
                      theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.displayName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}>{user.displayName}</div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                            }`}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isOnline)}`}>
                          {user.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                      }`}>
                        Level {user.level} • {user.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role || 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.role !== 'admin' && user.role !== 'superadmin' && (
                            <button
                              onClick={() => handlePromoteToAdmin(user.uid, 'admin')}
                              className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                          )}
                          {(user.role === 'admin') && (
                            <button
                              onClick={() => handleDemoteToUser(user.uid)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Demote to User"
                            >
                              <UserIcon className="w-4 h-4" />
                            </button>
                          )}
                          {(user.role === 'superadmin') && (
                            <span
                              className="text-gray-500 cursor-not-allowed"
                              title="Superadmin cannot be demoted"
                            >
                              <Shield className="w-4 h-4" />
                            </span>
                          )}
                          {user.role === 'superadmin' && adminUser?.uid === user.uid ? (
                            <span
                              className="text-gray-500 cursor-not-allowed"
                              title="Superadmin cannot delete their own account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDeleteUser(user.uid)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Delete User"
                              disabled={deletingUsers.has(user.uid)}
                            >
                              {deletingUsers.has(user.uid) ? (
                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">User Details</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      {selectedUser.displayName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedUser.displayName}</h3>
                    <p className="text-gray-400">{selectedUser.email}</p>
                    <p className="text-sm text-gray-500">Member since {selectedUser.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedUser.level}</div>
                    <div className="text-sm text-gray-400">Level</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedUser.xp.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">XP</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gold-400">{selectedUser.goldXp}</div>
                    <div className="text-sm text-gray-400">Gold XP</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedUser.stats.totalProblemsSolved}</div>
                    <div className="text-sm text-gray-400">Problems</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-slate-700">
                  {selectedUser.role !== 'admin' && selectedUser.role !== 'superadmin' && (
                    <button
                      onClick={() => {
                        handlePromoteToAdmin(selectedUser.uid, 'admin');
                        setShowUserModal(false);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Promote to Admin
                    </button>
                  )}
                  {(selectedUser.role === 'admin') && (
                    <button
                      onClick={() => {
                        handleDemoteToUser(selectedUser.uid);
                        setShowUserModal(false);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Demote to User
                    </button>
                  )}
                  {selectedUser.role === 'superadmin' && adminUser?.uid === selectedUser.uid ? (
                    <button
                      className="flex-1 bg-gray-600 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
                      disabled
                      title="Superadmin cannot delete their own account"
                    >
                      Delete User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteUser(selectedUser.uid)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                      disabled={deletingUsers.has(selectedUser.uid)}
                    >
                      {deletingUsers.has(selectedUser.uid) ? 'Deleting...' : 'Delete User'}
                    </button>
                  )}
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Close
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

export default AdminDashboard;
