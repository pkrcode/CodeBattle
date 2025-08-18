import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Zap, 
  Trophy, 
  Target, 
  Star, 
  Crown,
  CheckCircle,
  Code,
  ArrowRight,
  Sparkles,
  Calendar,
  Sword,
  Timer
} from 'lucide-react';
import { DailyTask, Match } from '../types';

const Home: React.FC = () => {
  const { user } = useAuth();
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
            { input: '[1,null,2,3]', output: '[1,3,2]', description: 'Basic case' },
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



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/10 to-success-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-200 dark:border-primary-700 mb-6">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Welcome back!</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            Hello, <span className="gradient-text-primary">{user?.displayName || 'Coder'}</span>! 👋
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to continue your coding journey? Let's see what challenges await you today.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="absolute top-4 right-4">
                <Zap className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-2">1,234</div>
              <div className="text-primary-100 font-medium">Total XP</div>
              <div className="mt-4 text-sm text-primary-200">+45 this week</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-gradient-to-br from-success-500 to-success-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="absolute top-4 right-4">
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-2">42</div>
              <div className="text-success-100 font-medium">Battles Won</div>
              <div className="mt-4 text-sm text-success-200">85% win rate</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="absolute top-4 right-4">
                <Target className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-2">156</div>
              <div className="text-warning-100 font-medium">Problems Solved</div>
              <div className="mt-4 text-sm text-warning-200">12 this month</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="absolute top-4 right-4">
                <Crown className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-2">Gold</div>
              <div className="text-secondary-100 font-medium">Current Rank</div>
              <div className="mt-4 text-sm text-secondary-200">Top 15%</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Current Match Section */}
        {currentMatch && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Active Battle</h2>
                  <p className="text-primary-100">You're currently battling against {currentMatch.player2Name}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-primary-200 mb-1">Time Remaining</div>
                  <div className="text-2xl font-bold flex items-center space-x-2">
                    <Timer className="w-6 h-6" />
                    <span>{timeLeft}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{currentMatch.player1Score}</div>
                  <div className="text-primary-200">Your Score</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-4xl">⚔️</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{currentMatch.player2Score}</div>
                  <div className="text-primary-200">{currentMatch.player2Name}</div>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/battles')}
                  className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 group"
                >
                  <Sword className="w-5 h-5" />
                  <span>Continue Battle</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Tasks Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Daily Challenges</h2>
              <p className="text-slate-600 dark:text-slate-400">Complete these tasks to earn bonus XP and rewards</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Today's Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-large transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{task.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{task.description}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      task.isCompleted 
                        ? 'bg-success-100 dark:bg-success-900/30' 
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {task.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{task.xpReward} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Crown className="w-4 h-4 text-warning-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{task.goldXpReward} Gold</span>
                      </div>
                    </div>
                    {!task.isCompleted && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => completeTask(task.id)}
                        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Complete
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/battles"
                className="block bg-gradient-to-br from-error-500 to-error-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sword className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Find Battle</h3>
                    <p className="text-error-100">Challenge other players</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/problems"
                className="block bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Practice</h3>
                    <p className="text-primary-100">Solve coding problems</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/leaderboard"
                className="block bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Leaderboard</h3>
                    <p className="text-warning-100">Check rankings</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 