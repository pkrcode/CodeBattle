const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, addDoc } = require('firebase/direstore');

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzPUqw5EPPhDIUFQqtnVUdy8el8RRzJ40",
  authDomain: "codebattle-ecbdf.firebaseapp.com",
  projectId: "codebattle-ecbdf",
  storageBucket: "codebattle-ecbdf.firebasestorage.app",
  messagingSenderId: "176360651527",
  appId: "1:176360651527:web:9d7edda85866f5db1663a2",
  measurementId: "G-0SMX7YR030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample achievements data
const achievements = [
  {
    id: "first_win",
    title: "First Victory",
    description: "Win your first battle",
    icon: "🏆",
    rarity: "common",
    xpReward: 100,
    goldXpReward: 10
  },
  {
    id: "problem_solver",
    title: "Problem Solver",
    description: "Solve 10 problems",
    icon: "💻",
    rarity: "common",
    xpReward: 200,
    goldXpReward: 20
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Win 5 battles in a row",
    icon: "🔥",
    rarity: "rare",
    xpReward: 500,
    goldXpReward: 50
  },
  {
    id: "tournament_champion",
    title: "Tournament Champion",
    description: "Win a tournament",
    icon: "👑",
    rarity: "legendary",
    xpReward: 1000,
    goldXpReward: 100
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Add 10 friends",
    icon: "🦋",
    rarity: "rare",
    xpReward: 300,
    goldXpReward: 30
  },
  {
    id: "daily_warrior",
    title: "Daily Warrior",
    description: "Complete daily tasks for 7 days",
    icon: "⚔️",
    rarity: "epic",
    xpReward: 800,
    goldXpReward: 80
  }
];

// Sample season data
const currentSeason = {
  id: "season_1",
  name: "Season 1: Code Warriors",
  startDate: "2024-01-01T00:00:00Z",
  endDate: "2024-02-01T00:00:00Z",
  isActive: true,
  rewards: {
    top1: { xp: 5000, goldXp: 500, title: "Season Champion" },
    top10: { xp: 2000, goldXp: 200, title: "Elite Coder" },
    top50: { xp: 1000, goldXp: 100, title: "Skilled Warrior" },
    top100: { xp: 500, goldXp: 50, title: "Rising Star" }
  }
};

// Sample daily tasks
const dailyTasks = [
  {
    id: "daily_1",
    title: "Solve 3 Problems",
    description: "Complete 3 coding problems today",
    xpReward: 50,
    goldXpReward: 5,
    type: "problems",
    target: 3
  },
  {
    id: "daily_2",
    title: "Win a Battle",
    description: "Win at least one battle today",
    xpReward: 100,
    goldXpReward: 10,
    type: "battle_win",
    target: 1
  },
  {
    id: "daily_3",
    title: "Add a Friend",
    description: "Send a friend request to someone",
    xpReward: 25,
    goldXpReward: 2,
    type: "friend_request",
    target: 1
  }
];

async function setupFirestore() {
  try {
    console.log('Setting up Firestore data...');

    // Add achievements
    console.log('Adding achievements...');
    for (const achievement of achievements) {
      await setDoc(doc(db, 'achievements', achievement.id), achievement);
    }

    // Add current season
    console.log('Adding current season...');
    await setDoc(doc(db, 'seasons', currentSeason.id), currentSeason);

    // Add daily tasks
    console.log('Adding daily tasks...');
    for (const task of dailyTasks) {
      await setDoc(doc(db, 'dailyTasks', task.id), task);
    }

    console.log('✅ Firestore setup completed successfully!');
    console.log(`- Added ${achievements.length} achievements`);
    console.log('- Added current season');
    console.log(`- Added ${dailyTasks.length} daily tasks`);

  } catch (error) {
    console.error('❌ Error setting up Firestore:', error);
  }
}

// Run the setup
setupFirestore();
