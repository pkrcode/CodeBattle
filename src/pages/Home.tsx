import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Zap, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Play,
  Crown,
  Flame,
  CheckCircle,
  Code
} from 'lucide-react';
import { DailyTask, Match } from '../types';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  // Mock daily tasks for MVP
  useEffect(() => {
    const tasks: DailyTask[] = [
      {
        id: '1',
        title: 'Solve 3 Problems',
        description: 'Complete any 3 coding problems to earn XP',
        xpReward: 50,
        goldXpReward: 5,
        type: 'problem',
        isCompleted: false
      },
      {
        id: '2',
        title: 'Win a Battle',
        description: 'Win one 1v1 battle match',
        xpReward: 100,
        goldXpReward: 10,
        type: 'battle',
        isCompleted: false
      },
      {
        id: '3',
        title: 'Add a Friend',
        description: 'Send a friend request to another player',
        xpReward: 25,
        goldXpReward: 2,
        type: 'social',
        isCompleted: false
      },
      {
        id: '4',
        title: '3-Day Streak',
        description: 'Maintain a 3-day problem solving streak',
        xpReward: 75,
        goldXpReward: 8,
        type: 'streak',
        isCompleted: false
      }
    ];
    setDailyTasks(tasks);
  }, []);

  // Mock current match
  useEffect(() => {
    const mockMatch: Match = {
      id: '1',
      player1Id: user?.uid || '',
      player2Id: 'bot-player',
      player1Name: user?.displayName || 'You',
      player2Name: 'CodeMaster_Bot',
      player1Score: 2,
      player2Score: 1,
      status: 'active',
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: 3,
      problems: [
        { 
          id: '1', 
          title: 'Two Sum', 
          difficulty: 'easy', 
          category: 'Arrays', 
          points: 10, 
          solvedBy: [user?.uid || ''],
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          testCases: [
            { input: '[2,7,11,15]\n9', output: '[0,1]', description: 'Basic case' },
            { input: '[3,2,4]\n6', output: '[1,2]', description: 'Target in middle' }
          ],
          starterCode: {
            cpp: '#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
            python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ',
            javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}'
          }
        },
        { 
          id: '2', 
          title: 'Valid Parentheses', 
          difficulty: 'medium', 
          category: 'Stack', 
          points: 15, 
          solvedBy: [user?.uid || ''],
          description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
          testCases: [
            { input: '()', output: 'true', description: 'Simple case' },
            { input: '()[]{}', output: 'true', description: 'Mixed brackets' }
          ],
          starterCode: {
            cpp: '#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};',
            python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        ',
            javascript: '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};',
            java: 'class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}'
          }
        },
        { 
          id: '3', 
          title: 'Binary Tree Inorder Traversal', 
          difficulty: 'medium', 
          category: 'Trees', 
          points: 15, 
          solvedBy: [],
          description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
          testCases: [
            { input: '[1,null,2,3]', output: '[1,3,2]', description: 'Basic tree' },
            { input: '[]', output: '[]', description: 'Empty tree' }
          ],
          starterCode: {
            cpp: '/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        \n    }\n};',
            python: '# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        ',
            javascript: '/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar inorderTraversal = function(root) {\n    \n};',
            java: '/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}'
          }
        }
      ],
      xpReward: 200,
      goldXpReward: 20
    };
    setCurrentMatch(mockMatch);
  }, [user]);

  // Calculate time left in current match
  useEffect(() => {
    if (currentMatch) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const end = currentMatch.endTime.getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft('Ended');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentMatch]);

  const completeTask = (taskId: string) => {
    setDailyTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, isCompleted: true }
          : task
      )
    );
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-cyan-500';
      case 'Diamond': return 'text-purple-500';
      default: return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
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
            Welcome back, {user?.displayName}!{' '}
            <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>👋</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Ready to dominate the coding battlefield?
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* XP Card */}
          <div className={`card battle-card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Total XP
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {user?.xp || 0}
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
                  Level {user?.level || 1}
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
                  {user?.xp || 0} / {(user?.level || 1) * 1000}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="xp-bar h-2 rounded-full"
                  style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Gold XP Card */}
          <div className={`card battle-card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Gold XP
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {user?.goldXp || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className={`text-sm mt-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              For tournaments & rewards
            </p>
          </div>

          {/* Rank Card */}
          <div className={`card battle-card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Current Rank
                </p>
                <p className={`text-2xl font-bold ${getRankColor(user?.rank || 'Bronze')}`}>
                  {user?.rank || 'Bronze'}
                </p>
              </div>
              <div className="p-3 bg-slate-100 rounded-full">
                <Trophy className="h-6 w-6 text-slate-600" />
              </div>
            </div>
            <p className={`text-sm mt-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Win battles to rank up
            </p>
          </div>

          {/* Streak Card */}
          <div className={`card battle-card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {user?.stats?.currentStreak || 0} days
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className={`text-sm mt-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Keep the fire burning! 🔥
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Link
            to="/problems"
            className={`card battle-card group ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Code className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Solve Problems
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Practice coding challenges
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/battles"
            className={`card battle-card group ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Join Battle
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Compete in 1v1 matches
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/leaderboard"
            className={`card battle-card group ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  View Rankings
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Check leaderboards
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Current Match */}
        {currentMatch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`card ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Active Battle
              </h2>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {timeLeft}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Player 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {currentMatch.player1Name}
                </h3>
                <p className="text-2xl font-bold text-primary-600">
                  {currentMatch.player1Score}
                </p>
              </div>

              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">VS</div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    {currentMatch.problems.length} problems
                  </div>
                </div>
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {currentMatch.player2Name}
                </h3>
                <p className="text-2xl font-bold text-slate-600">
                  {currentMatch.player2Score}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Problems solved: {currentMatch.problems.filter(p => p.solvedBy.includes(user?.uid || '')).length}/{currentMatch.problems.length}
                </span>
                <Link
                  to="/battles"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Continue Battle</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`card ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Daily Tasks
            </h2>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
              }`}>
                {dailyTasks.filter(t => t.isCompleted).length}/{dailyTasks.length} completed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  task.isCompleted
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                    : theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`font-semibold ${
                        task.isCompleted
                          ? 'text-green-800 dark:text-green-200'
                          : theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className={`text-sm mb-3 ${
                      task.isCompleted
                        ? 'text-green-700 dark:text-green-300'
                        : theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-primary-500" />
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                        }`}>
                          +{task.xpReward} XP
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                        }`}>
                          +{task.goldXpReward} Gold
                        </span>
                      </div>
                    </div>
                  </div>
                  {!task.isCompleted && (
                    <button
                      onClick={() => {
                        if (task.type === 'problem') {
                          navigate('/problems');
                        } else {
                          completeTask(task.id);
                        }
                      }}
                      className="btn-primary text-sm"
                    >
                      {task.type === 'problem' ? 'Solve' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 