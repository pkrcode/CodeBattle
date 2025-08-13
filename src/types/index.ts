export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  profileIcon?: string;
  xp: number;
  goldXp: number;
  level: number;
  rank: string;
  friends: string[];
  isOnline: boolean;
  lastSeen: Date;
  achievements: Achievement[];
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
  role?: 'user' | 'admin' | 'superadmin';
}

export interface UserStats {
  totalProblemsSolved: number;
  totalMatchesWon: number;
  totalMatchesLost: number;
  totalMatchesPlayed: number;
  winRate: number;
  currentStreak: number;
  longestStreak: number;
  problemsSolvedThisSeason: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  status: 'pending' | 'active' | 'completed';
  startTime: Date;
  endTime: Date;
  duration: number; // in days
  problems: Problem[];
  winner?: string;
  xpReward: number;
  goldXpReward: number;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  solvedBy: string[];
  submittedAt?: Date;
  description: string;
  testCases: {
    input: string;
    output: string;
    description: string;
  }[];
  starterCode: {
    cpp: string;
    python: string;
    javascript: string;
    java: string;
  };
}

export interface Season {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  leaderboard: LeaderboardEntry[];
  rewards: SeasonReward[];
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  xp: number;
  goldXp: number;
  rank: number;
  problemsSolved: number;
}

export interface SeasonReward {
  id: string;
  season: string;
  title: string;
  description: string;
  type: 'badge' | 'title' | 'emote' | 'theme' | 'bonus';
  requirement: {
    type: 'level' | 'xp' | 'wins' | 'streak' | 'problems' | 'rank';
    value: number;
  };
  reward: {
    xp?: number;
    goldXp?: number;
    badge?: string;
    title?: string;
    emote?: string;
    theme?: string;
  };
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  goldXpReward: number;
  type: 'problem' | 'streak' | 'social' | 'battle';
  isCompleted: boolean;
  completedAt?: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  entryFee: number; // in gold XP
  prizePool: TournamentPrize[];
  startDate: Date;
  endDate: Date;
  participants: string[];
  status: 'upcoming' | 'active' | 'completed';
  maxParticipants: number;
}

export interface TournamentPrize {
  rank: number;
  reward: string; // e.g., "10Rs Play Store Voucher"
  goldXp: number;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'friend_request' | 'match_invite' | 'achievement' | 'tournament' | 'daily_task';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any;
}

// Admin Types
export interface AdminUser extends User {
  role: 'admin' | 'superadmin';
  permissions: AdminPermission[];
  lastAdminAction?: Date;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  resource: 'users' | 'questions' | 'events' | 'rewards' | 'seasons' | 'analytics' | 'settings' | 'system';
  action: 'manage' | 'create' | 'read' | 'update' | 'delete' | 'view';
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;
  tags: string[];
  testCases: TestCase[];
  solution: string;
  hints: string[];
  points: number;
  timeLimit: number; // in seconds
  memoryLimit: number; // in MB
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  season?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'tournament' | 'challenge' | 'workshop' | 'hackathon';
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  rewards: EventReward[];
  rules: string[];
  isActive: boolean;
  isRegistrationOpen: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  banner?: string;
}

export interface EventReward {
  id: string;
  rank: number;
  xp: number;
  goldXp: number;
  title: string;
  description: string;
  icon?: string;
}

export interface AdminAction {
  id: string;
  adminId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: any;
  timestamp: Date;
  ipAddress?: string;
} 