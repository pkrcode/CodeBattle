import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Zap, 
  Clock, 
  Users, 
  Play, 
  Trophy, 
  Target, 
  CheckCircle,
  X,
  Crown,
  Flame,
  TrendingUp
} from 'lucide-react';
import { Match, Problem } from '../types';

const Battles: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeBattles, setActiveBattles] = useState<Match[]>([]);
  const [battleHistory, setBattleHistory] = useState<Match[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState<Match | null>(null);

  // Mock data for MVP
  useEffect(() => {
    const mockActiveBattles: Match[] = [
      {
        id: '1',
        player1Id: user?.uid || '',
        player2Id: 'bot-player-1',
        player1Name: user?.displayName || 'You',
        player2Name: 'CodeMaster_Bot',
        player1Score: 2,
        player2Score: 1,
        status: 'active',
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
              { input: '()', output: 'true', description: 'Simple parentheses' },
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
      }
    ];

    const mockBattleHistory: Match[] = [
      {
        id: '2',
        player1Id: user?.uid || '',
        player2Id: 'bot-player-2',
        player1Name: user?.displayName || 'You',
        player2Name: 'AlgoWarrior_Bot',
        player1Score: 3,
        player2Score: 2,
        status: 'completed',
        startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        duration: 3,
        problems: [
          { 
            id: '4', 
            title: 'Reverse String', 
            difficulty: 'easy', 
            category: 'Strings', 
            points: 10, 
            solvedBy: [user?.uid || ''],
            description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
            testCases: [
              { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]', description: 'Basic string' },
              { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', description: 'Palindrome' }
            ],
            starterCode: {
              cpp: 'class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};',
              python: 'class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        """\n        Do not return anything, modify s in-place instead.\n        """\n        ',
              javascript: '/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    \n};',
              java: 'class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}'
            }
          },
          { 
            id: '5', 
            title: 'Merge Two Sorted Lists', 
            difficulty: 'medium', 
            category: 'Linked Lists', 
            points: 15, 
            solvedBy: [user?.uid || ''],
            description: 'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
            testCases: [
              { input: '[1,2,4]\n[1,3,4]', output: '[1,1,2,3,4,4]', description: 'Basic merge' },
              { input: '[]\n[]', output: '[]', description: 'Empty lists' }
            ],
            starterCode: {
              cpp: '/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};',
              python: '# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ',
              javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};',
              java: '/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Your code here\n        return null;\n    }\n}'
            }
          },
          { 
            id: '6', 
            title: 'Climbing Stairs', 
            difficulty: 'medium', 
            category: 'DP', 
            points: 15, 
            solvedBy: [user?.uid || ''],
            description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
            testCases: [
              { input: '2', output: '2', description: 'Two steps' },
              { input: '3', output: '3', description: 'Three steps' }
            ],
            starterCode: {
              cpp: 'class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};',
              python: 'class Solution:\n    def climbStairs(self, n: int) -> int:\n        ',
              javascript: '/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    \n};',
              java: 'class Solution {\n    public int climbStairs(int n) {\n        // Your code here\n        return 0;\n    }\n}'
            }
          }
        ],
        winner: user?.uid,
        xpReward: 200,
        goldXpReward: 20
      }
    ];

    setActiveBattles(mockActiveBattles);
    setBattleHistory(mockBattleHistory);
  }, [user]);

  const startNewBattle = () => {
    setIsSearching(true);
    // Simulate matchmaking
    setTimeout(() => {
      const newBattle: Match = {
        id: Date.now().toString(),
        player1Id: user?.uid || '',
        player2Id: 'bot-player-new',
        player1Name: user?.displayName || 'You',
        player2Name: 'BattleBot_' + Math.floor(Math.random() * 1000),
        player1Score: 0,
        player2Score: 0,
        status: 'active',
        startTime: new Date(),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        duration: 3,
        problems: [
          { 
            id: '7', 
            title: 'Palindrome Number', 
            difficulty: 'easy', 
            category: 'Math', 
            points: 10, 
            solvedBy: [],
            description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
            testCases: [
              { input: '121', output: 'true', description: 'Palindrome number' },
              { input: '-121', output: 'false', description: 'Negative number' }
            ],
            starterCode: {
              cpp: 'class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};',
              python: 'class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        ',
              javascript: '/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    \n};',
              java: 'class Solution {\n    public boolean isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n}'
            }
          },
          { 
            id: '8', 
            title: 'Container With Most Water', 
            difficulty: 'medium', 
            category: 'Two Pointers', 
            points: 15, 
            solvedBy: [],
            description: 'Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that would hold the maximum amount of water.',
            testCases: [
              { input: '[1,8,6,2,5,4,8,3,7]', output: '49', description: 'Maximum area' },
              { input: '[1,1]', output: '1', description: 'Minimum case' }
            ],
            starterCode: {
              cpp: 'class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};',
              python: 'class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        ',
              javascript: '/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    \n};',
              java: 'class Solution {\n    public int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n}'
            }
          },
          { 
            id: '9', 
            title: '3Sum', 
            difficulty: 'medium', 
            category: 'Arrays', 
            points: 15, 
            solvedBy: [],
            description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
            testCases: [
              { input: '[-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', description: 'Basic case' },
              { input: '[]', output: '[]', description: 'Empty array' }
            ],
            starterCode: {
              cpp: 'class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};',
              python: 'class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        ',
              javascript: '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    \n};',
              java: 'class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}'
            }
          }
        ],
        xpReward: 200,
        goldXpReward: 20
      };
      setActiveBattles(prev => [newBattle, ...prev]);
      setIsSearching(false);
    }, 2000);
  };

  const getTimeLeft = (endTime: Date) => {
    const now = new Date().getTime();
    const end = endTime.getTime();
    const distance = end - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}d ${hours}h`;
    }
    return 'Ended';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
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
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Battle Arena</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Challenge opponents in epic 1v1 programming battles</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.stats?.totalMatchesWon || 0}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Battles Won</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.stats?.totalProblemsSolved || 0}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Problems Solved</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.stats?.winRate || 0}%</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Win Rate</div>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.stats?.currentStreak || 0}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Win Streak</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Start New Battle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-primary-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-primary-700/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ready for Battle?</h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Find an opponent and start a new 3-day battle</p>
            </div>
            <button
              onClick={startNewBattle}
              disabled={isSearching}
              className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Battle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active Battles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <Zap className="w-5 h-5 mr-2 text-primary-400" />
          Active Battles
        </h2>
        <div className="space-y-4">
          {activeBattles.map((battle) => (
            <div
              key={battle.id}
              className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 hover:border-gray-300'} backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 cursor-pointer`}
              onClick={() => setSelectedBattle(battle)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{battle.player2Name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>3-day battle</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{getTimeLeft(battle.endTime)}</span>
                  </div>
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {battle.player1Score} - {battle.player2Score}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {battle.problems.map((problem) => (
                  <div
                    key={problem.id}
                    className={`p-2 rounded-lg text-center ${
                      problem.solvedBy.includes(user?.uid || '')
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{problem.title}</div>
                    <div className={`text-xs px-2 py-1 rounded ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-400">+{battle.xpReward} XP</span>
                <span className="text-gold-400">+{battle.goldXpReward} Gold</span>
              </div>
            </div>
          ))}
          {activeBattles.length === 0 && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Zap className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No active battles</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Start a new battle to compete!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Battle History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Battle History
        </h2>
        <div className="space-y-4">
          {battleHistory.map((battle) => (
            <div
              key={battle.id}
              className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    battle.winner === user?.uid
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}>
                    {battle.winner === user?.uid ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : (
                      <X className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{battle.player2Name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    battle.winner === user?.uid ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {battle.player1Score} - {battle.player2Score}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {battle.winner === user?.uid ? 'Victory' : 'Defeat'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-400">+{battle.xpReward} XP</span>
                <span className="text-gold-400">+{battle.goldXpReward} Gold</span>
              </div>
            </div>
          ))}
          {battleHistory.length === 0 && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Trophy className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No battle history</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Complete your first battle to see history!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Battle Detail Modal */}
      {selectedBattle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                     <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
           >
             <div className="flex items-center justify-between mb-6">
               <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Battle Details</h2>
               <button
                 onClick={() => setSelectedBattle(null)}
                 className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 <X className="w-6 h-6" />
               </button>
             </div>

            <div className="space-y-6">
              {/* Battle Info */}
                             <div className={`${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-4`}>
                 <div className="flex items-center justify-between mb-4">
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                       <span className="text-white font-bold text-lg">{user?.displayName?.charAt(0)}</span>
                     </div>
                     <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedBattle.player1Name}</div>
                     <div className="text-2xl font-bold text-primary-400">{selectedBattle.player1Score}</div>
                   </div>

                   <div className="text-center">
                     <div className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>VS</div>
                     <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>3 Days</div>
                   </div>

                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                       <span className="text-white font-bold text-lg">B</span>
                     </div>
                     <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedBattle.player2Name}</div>
                     <div className="text-2xl font-bold text-red-400">{selectedBattle.player2Score}</div>
                   </div>
                 </div>

                 <div className={`flex items-center justify-between text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                   <span>Time Left: {getTimeLeft(selectedBattle.endTime)}</span>
                   <span>Rewards: +{selectedBattle.xpReward} XP, +{selectedBattle.goldXpReward} Gold</span>
                 </div>
               </div>

              {/* Problems */}
                             <div>
                 <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problems</h3>
                 <div className="space-y-3">
                   {selectedBattle.problems.map((problem) => (
                     <div
                       key={problem.id}
                       className={`p-4 rounded-lg border ${
                         problem.solvedBy.includes(user?.uid || '')
                           ? 'bg-green-500/10 border-green-500/30'
                           : theme === 'dark' 
                             ? 'bg-slate-700/50 border-slate-600'
                             : 'bg-gray-100 border-gray-300'
                       }`}
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center space-x-3">
                           <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{problem.title}</span>
                           <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(problem.difficulty)}`}>
                             {problem.difficulty}
                           </span>
                         </div>
                         <div className="flex items-center space-x-2">
                           <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{problem.points} pts</span>
                           {problem.solvedBy.includes(user?.uid || '') && (
                             <CheckCircle className="w-4 h-4 text-green-400" />
                           )}
                         </div>
                       </div>
                       <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{problem.category}</div>
                     </div>
                   ))}
                 </div>
               </div>

              <button
                onClick={() => setSelectedBattle(null)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Continue Battle
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Battles; 