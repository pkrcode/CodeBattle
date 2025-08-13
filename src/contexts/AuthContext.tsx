import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  promoteToAdmin: (userId: string, role?: 'admin' | 'superadmin') => Promise<void>;
  demoteToUser: (userId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as any;
          
          // Check if user is an admin - if so, don't set them in regular user context
          if (userData.role === 'admin' || userData.role === 'superadmin') {
            // Admin users should be handled by AdminAuthContext, not regular AuthContext
            setUser(null);
            setLoading(false);
            return;
          }
          
          setUser({
            ...userData,
            role: userData.role || 'user',
            createdAt: userData.createdAt?.toDate?.() || new Date(),
            updatedAt: userData.updatedAt?.toDate?.() || new Date(),
            lastSeen: userData.lastSeen?.toDate?.() || new Date(),
            achievements: userData.achievements?.map((achievement: any) => ({
              ...achievement,
              unlockedAt: achievement.unlockedAt?.toDate?.() || new Date()
            })) || []
          });
        } else {
          // Create new user profile (regular user, not admin)
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || 'CodeWarrior',
            photoURL: firebaseUser.photoURL || null,
            role: 'user', // Default role is user
            xp: 0,
            goldXp: 0,
            level: 1,
            rank: 'Bronze',
            friends: [],
            isOnline: true,
            lastSeen: new Date(),
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
          
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in Firestore
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: displayName,
        photoURL: firebaseUser.photoURL || null,
        role: 'user', // Default role is user
        xp: 0,
        goldXp: 0,
        level: 1,
        rank: 'Bronze',
        friends: [],
        isOnline: true,
        lastSeen: new Date(),
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

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Redirect to main login page after logout
      window.location.href = '/login';
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates, updatedAt: new Date() };
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: new Date()
      });
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const promoteToAdmin = async (userId: string, role: 'admin' | 'superadmin' = 'admin') => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: role,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  };

  const demoteToUser = async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'user',
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Prevent superadmin from deleting themselves
      if (user && user.uid === userId && user.role === 'superadmin') {
        throw new Error('Superadmin cannot delete their own account');
      }
      
      await deleteDoc(doc(db, 'users', userId));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
    promoteToAdmin,
    demoteToUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 