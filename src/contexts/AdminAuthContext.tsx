import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;
  createAdminAccount: (email: string, password: string, displayName: string) => Promise<void>;
  updateAdminProfile: (updates: Partial<AdminUser>) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Check if this user is an admin
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as any;
            
            // Only set as admin user if they have admin role
            if (userData.role === 'admin' || userData.role === 'superadmin') {
              const adminUserData = {
                ...userData,
                role: userData.role,
                permissions: userData.permissions || [],
                createdAt: userData.createdAt?.toDate?.() || new Date(),
                updatedAt: userData.updatedAt?.toDate?.() || new Date(),
                lastSeen: userData.lastSeen?.toDate?.() || new Date(),
                lastAdminAction: userData.lastAdminAction?.toDate?.() || new Date(),
                achievements: userData.achievements?.map((achievement: any) => ({
                  ...achievement,
                  unlockedAt: achievement.unlockedAt?.toDate?.() || new Date()
                })) || []
              };
              setAdminUser(adminUserData);
            } else {
              // Not an admin, don't set admin user
              setAdminUser(null);
            }
          } else {
            // User doesn't exist, don't set admin user
            setAdminUser(null);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const adminLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const adminLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to main login page after logout
      window.location.href = '/login';
    } catch (error) {
      throw error;
    }
  };

  const createAdminAccount = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create admin user document in Firestore
      const adminUserData: AdminUser = {
        uid: user.uid,
        email: email,
        displayName: displayName,
        photoURL: user.photoURL || null,
        role: 'superadmin', // Changed to superadmin
        permissions: [
          {
            id: 'manage_users',
            name: 'Manage Users',
            description: 'Can view, edit, and manage user accounts',
            resource: 'users',
            action: 'manage'
          },
          {
            id: 'manage_questions',
            name: 'Manage Questions',
            description: 'Can create, edit, and manage coding questions',
            resource: 'questions',
            action: 'manage'
          },
          {
            id: 'manage_events',
            name: 'Manage Events',
            description: 'Can create, edit, and manage events and tournaments',
            resource: 'events',
            action: 'manage'
          },
          {
            id: 'manage_rewards',
            name: 'Manage Rewards',
            description: 'Can create, edit, and manage season rewards',
            resource: 'rewards',
            action: 'manage'
          },
          {
            id: 'manage_seasons',
            name: 'Manage Seasons',
            description: 'Can create, edit, and manage competitive seasons',
            resource: 'seasons',
            action: 'manage'
          },
          {
            id: 'view_analytics',
            name: 'View Analytics',
            description: 'Can view platform analytics and reports',
            resource: 'analytics',
            action: 'read'
          },
          {
            id: 'system_settings',
            name: 'System Settings',
            description: 'Can modify system settings and configurations',
            resource: 'settings',
            action: 'manage'
          }
        ],
        xp: 0,
        goldXp: 0,
        level: 1,
        rank: 'Super Admin',
        friends: [],
        isOnline: true,
        lastSeen: new Date(),
        lastAdminAction: new Date(),
        achievements: [],
        stats: {
          totalProblemsSolved: 0,
          totalMatchesWon: 0,
          totalMatchesLost: 0,
          totalMatchesPlayed: 0,
          winRate: 0,
          currentStreak: 0,
          longestStreak: 0,
          problemsSolvedThisSeason: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), adminUserData);
    } catch (error) {
      throw error;
    }
  };

  const updateAdminProfile = async (updates: Partial<AdminUser>) => {
    if (!firebaseUser) {
      throw new Error('User not logged in');
    }
    try {
      await updateDoc(doc(db, 'users', firebaseUser.uid), updates);
      setAdminUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    adminUser,
    firebaseUser,
    loading,
    adminLogin,
    adminLogout,
    createAdminAccount,
    updateAdminProfile
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
