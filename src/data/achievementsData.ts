import { Achievement } from '../types';

// Returns a demo list of achievements with 6 unlocked to reflect ~20% completion.
export function getDemoAchievements(): Achievement[] {
  const daysAgo = (d: number) => new Date(Date.now() - d * 24 * 60 * 60 * 1000);
  return [
    { id: '1', name: 'First Victory', description: 'Win your first battle', icon: '🏆', unlockedAt: daysAgo(7), rarity: 'common' },
    { id: '2', name: 'Problem Solver', description: 'Solve 10 problems', icon: '🎯', unlockedAt: daysAgo(5), rarity: 'common' },
    { id: '3', name: 'Streak Master', description: 'Maintain a 5-day win streak', icon: '🔥', unlockedAt: daysAgo(3), rarity: 'rare' },
    { id: '4', name: 'Social Butterfly', description: 'Add 5 friends', icon: '👥', unlockedAt: daysAgo(2), rarity: 'common' },
    { id: '5', name: 'Gold Collector', description: 'Earn 100 Gold XP', icon: '💰', unlockedAt: daysAgo(1), rarity: 'rare' },
    { id: '6', name: 'Level Up', description: 'Reach level 10', icon: '⭐', unlockedAt: new Date(), rarity: 'epic' },
    { id: '7', name: 'Tournament Champion', description: 'Win a tournament', icon: '👑', unlockedAt: null, rarity: 'legendary' },
    { id: '8', name: 'Speed Demon', description: 'Solve 3 problems in under 30 minutes', icon: '⚡', unlockedAt: null, rarity: 'epic' },
    { id: '9', name: 'Perfect Match', description: 'Win a battle without losing any problems', icon: '🎯', unlockedAt: null, rarity: 'rare' },
    { id: '10', name: 'Century Club', description: 'Solve 100 problems', icon: '💯', unlockedAt: null, rarity: 'epic' },
    { id: '11', name: 'Diamond Rank', description: 'Reach Diamond rank', icon: '💎', unlockedAt: null, rarity: 'legendary' },
    { id: '12', name: 'Team Player', description: 'Participate in 10 team battles', icon: '🤝', unlockedAt: null, rarity: 'rare' },
    { id: '13', name: 'Warm Up', description: 'Complete your profile', icon: '🧩', unlockedAt: null, rarity: 'common' },
    { id: '14', name: 'Code Sprinter', description: 'Solve a problem in under 60 seconds', icon: '🏃‍♂️', unlockedAt: null, rarity: 'epic' },
    { id: '15', name: 'Night Owl', description: 'Solve a problem between 2-4 AM', icon: '🌙', unlockedAt: null, rarity: 'rare' },
    { id: '16', name: 'Early Bird', description: 'Log in before 6 AM', icon: '🐦', unlockedAt: null, rarity: 'common' },
    { id: '17', name: 'Daily Dev', description: 'Solve at least one problem every day for 7 days', icon: '📅', unlockedAt: null, rarity: 'epic' },
    { id: '18', name: 'Bug Hunter', description: 'Submit a valid bug report', icon: '🪲', unlockedAt: null, rarity: 'rare' },
    { id: '19', name: 'Helper', description: 'Help a friend solve a problem', icon: '🤗', unlockedAt: null, rarity: 'common' },
    { id: '20', name: 'Reviewer', description: 'Leave constructive feedback on 5 solutions', icon: '📝', unlockedAt: null, rarity: 'common' },
    { id: '21', name: 'Marathoner', description: 'Solve 20 problems in a day', icon: '🏅', unlockedAt: null, rarity: 'epic' },
    { id: '22', name: 'Polyglot', description: 'Solve problems in 3 different languages', icon: '🗣️', unlockedAt: null, rarity: 'rare' },
    { id: '23', name: 'Aptitude Ace', description: 'Score 15+ in Aptitude Challenge', icon: '🧠', unlockedAt: null, rarity: 'rare' },
    { id: '24', name: 'Flawless', description: 'Win an Aptitude Challenge with 0 wrong', icon: '✨', unlockedAt: null, rarity: 'epic' },
    { id: '25', name: 'Clutch', description: 'Win a battle after trailing', icon: '🧤', unlockedAt: null, rarity: 'rare' },
    { id: '26', name: 'Collector', description: 'Earn 1000 Gold', icon: '🏦', unlockedAt: null, rarity: 'epic' },
    { id: '27', name: 'Community Star', description: 'Invite 5 friends', icon: '🌟', unlockedAt: null, rarity: 'rare' },
    { id: '28', name: 'Seasoned', description: 'Finish in top 100 of a season', icon: '🍂', unlockedAt: null, rarity: 'legendary' },
    { id: '29', name: 'The Mentor', description: 'Publish 3 editorials', icon: '📚', unlockedAt: null, rarity: 'epic' },
    { id: '30', name: 'The Author', description: 'Create 5 approved problems', icon: '✍️', unlockedAt: null, rarity: 'epic' }
  ];
}
