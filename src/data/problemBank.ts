import { Problem, Question } from '../types';
import { QUESTIONS_DATA } from './questionsData';

type LanguageKey = 'cpp' | 'python' | 'javascript' | 'java';

interface ProblemBankItem {
  id: string;
  problem: Problem;
  question: Question;
}

// Helper function to get starter code based on problem ID
const getStarterCode = (problemId: string): Record<LanguageKey, string> => {
  switch (problemId) {
    case '1': // Reverse a Singly Linked List
      return {
        cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Your code here
        return nullptr;
    }
};`,
        python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
        javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // Your code here
};`,
        java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Your code here
        return null;
    }
}`
      };
    
    case '2': // Detect Cycle in Linked List
      return {
        cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Your code here
        return false;
    }
};`,
        python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        # Your code here
        pass`,
        javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Your code here
};`,
        java: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        // Your code here
        return false;
    }
}`
      };
    
    case '4': // Valid Parentheses
      return {
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Your code here
};`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`
      };
    
    case '5': // Maximum Subarray Sum (Kadane)
      return {
        cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
        return 0;
    }
};`,
        python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Your code here
        pass`,
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Your code here
};`,
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
        return 0;
    }
}`
      };
    
    case '6': // Binary Search
      return {
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};`,
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Your code here
        pass`,
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Your code here
};`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`
      };
    
    case '7': // Longest Substring Without Repeating
      return {
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your code here
        pass`,
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Your code here
};`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}`
      };
    
    case '38': // Two Sum
      return {
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`
      };
    
    case '71': // LRU Cache
      return {
        cpp: `class LRUCache {
private:
    // Your data structures here
    
public:
    LRUCache(int capacity) {
        // Initialize your cache
    }
    
    int get(int key) {
        // Your code here
        return -1;
    }
    
    void put(int key, int value) {
        // Your code here
    }
};`,
        python: `class LRUCache:
    def __init__(self, capacity: int):
        # Initialize your cache
        pass
    
    def get(self, key: int) -> int:
        # Your code here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Your code here
        pass`,
        javascript: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    // Initialize your cache
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    // Your code here
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // Your code here
};`,
        java: `class LRUCache {
    // Your data structures here
    
    public LRUCache(int capacity) {
        // Initialize your cache
    }
    
    public int get(int key) {
        // Your code here
        return -1;
    }
    
    public void put(int key, int value) {
        // Your code here
    }
}`
      };
    
    case '74': // Min Stack
      return {
        cpp: `class MinStack {
private:
    // Your data structures here
    
public:
    MinStack() {
        // Initialize your stack
    }
    
    void push(int val) {
        // Your code here
    }
    
    void pop() {
        // Your code here
    }
    
    int top() {
        // Your code here
        return 0;
    }
    
    int getMin() {
        // Your code here
        return 0;
    }
};`,
        python: `class MinStack:
    def __init__(self):
        # Initialize your stack
        pass
    
    def push(self, val: int) -> None:
        # Your code here
        pass
    
    def pop(self) -> None:
        # Your code here
        pass
    
    def top(self) -> int:
        # Your code here
        pass
    
    def getMin(self) -> int:
        # Your code here
        pass`,
        javascript: `var MinStack = function() {
    // Initialize your stack
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    // Your code here
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // Your code here
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    // Your code here
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    // Your code here
};`,
        java: `class MinStack {
    // Your data structures here
    
    public MinStack() {
        // Initialize your stack
    }
    
    public void push(int val) {
        // Your code here
    }
    
    public void pop() {
        // Your code here
    }
    
    public int top() {
        // Your code here
        return 0;
    }
    
    public int getMin() {
        // Your code here
        return 0;
    }
}`
      };
    
    case '79': // Design HashMap
      return {
        cpp: `class MyHashMap {
private:
    // Your data structures here
    
public:
    MyHashMap() {
        // Initialize your hash map
    }
    
    void put(int key, int value) {
        // Your code here
    }
    
    int get(int key) {
        // Your code here
        return -1;
    }
    
    void remove(int key) {
        // Your code here
    }
};`,
        python: `class MyHashMap:
    def __init__(self):
        # Initialize your hash map
        pass
    
    def put(self, key: int, value: int) -> None:
        # Your code here
        pass
    
    def get(self, key: int) -> int:
        # Your code here
        pass
    
    def remove(self, key: int) -> None:
        # Your code here
        pass`,
        javascript: `var MyHashMap = function() {
    // Initialize your hash map
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    // Your code here
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    // Your code here
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    // Your code here
};`,
        java: `class MyHashMap {
    // Your data structures here
    
    public MyHashMap() {
        // Initialize your hash map
    }
    
    public void put(int key, int value) {
        // Your code here
    }
    
    public int get(int key) {
        // Your code here
        return -1;
    }
    
    public void remove(int key) {
        // Your code here
    }
}`
      };
    
    case '81': // Design Linked List
      return {
        cpp: `class MyLinkedList {
private:
    // Your data structures here
    
public:
    MyLinkedList() {
        // Initialize your linked list
    }
    
    int get(int index) {
        // Your code here
        return -1;
    }
    
    void addAtHead(int val) {
        // Your code here
    }
    
    void addAtTail(int val) {
        // Your code here
    }
    
    void addAtIndex(int index, int val) {
        // Your code here
    }
    
    void deleteAtIndex(int index) {
        // Your code here
    }
};`,
        python: `class MyLinkedList:
    def __init__(self):
        # Initialize your linked list
        pass
    
    def get(self, index: int) -> int:
        # Your code here
        pass
    
    def addAtHead(self, val: int) -> None:
        # Your code here
        pass
    
    def addAtTail(self, val: int) -> None:
        # Your code here
        pass
    
    def addAtIndex(self, index: int, val: int) -> None:
        # Your code here
        pass
    
    def deleteAtIndex(self, index: int) -> None:
        # Your code here
        pass`,
        javascript: `var MyLinkedList = function() {
    // Initialize your linked list
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    // Your code here
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    // Your code here
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    // Your code here
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    // Your code here
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    // Your code here
};`,
        java: `class MyLinkedList {
    // Your data structures here
    
    public MyLinkedList() {
        // Initialize your linked list
    }
    
    public int get(int index) {
        // Your code here
        return -1;
    }
    
    public void addAtHead(int val) {
        // Your code here
    }
    
    public void addAtTail(int val) {
        // Your code here
    }
    
    public void addAtIndex(int index, int val) {
        // Your code here
    }
    
    public void deleteAtIndex(int index) {
        // Your code here
    }
}`
      };
    
    default:
      return {
        cpp: `class Solution {
public:
    // Your code here
};`,
        python: `class Solution:
    def solve(self):
        # Your code here
        pass`,
        javascript: `/**
 * Your solution here
 */
var solve = function() {
    // Your code here
};`,
        java: `class Solution {
    public void solve() {
        // Your code here
    }
}`
      };
  }
};

// Generate specific test cases based on problem ID
const generateTestCases = (problemId: string) => {
  switch (problemId) {
    case '1': // Reverse a Singly Linked List
      return [
        { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]', description: 'Basic linked list reversal' },
        { input: '[1,2]', output: '[2,1]', description: 'Two node list' },
        { input: '[]', output: '[]', description: 'Empty list' }
      ];
    
    case '2': // Detect Cycle in Linked List
      return [
        { input: '[3,2,0,-4] (cycle at pos 1)', output: 'true', description: 'Linked list with cycle' },
        { input: '[1,2] (cycle at pos 0)', output: 'true', description: 'Two node cycle' },
        { input: '[1] (no cycle)', output: 'false', description: 'Single node no cycle' }
      ];
    
    case '3': // Find Missing Number
      return [
        { input: '[3,0,1]', output: '2', description: 'Missing number 2' },
        { input: '[0,1]', output: '2', description: 'Missing number 2' },
        { input: '[9,6,4,2,3,5,7,0,1]', output: '8', description: 'Missing number 8' }
      ];
    
    case '4': // Valid Parentheses
      return [
        { input: '"()"', output: 'true', description: 'Simple parentheses' },
        { input: '"()[]{}"', output: 'true', description: 'Multiple types of brackets' },
        { input: '"(]"', output: 'false', description: 'Mismatched brackets' }
      ];
    
    case '5': // Maximum Subarray Sum (Kadane)
      return [
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6', description: 'Maximum subarray [4,-1,2,1]' },
        { input: '[1]', output: '1', description: 'Single element' },
        { input: '[5,4,-1,7,8]', output: '23', description: 'All positive numbers' }
      ];
    
    case '6': // Binary Search
      return [
        { input: '[-1,0,3,5,9,12]\n9', output: '4', description: 'Target found at index 4' },
        { input: '[-1,0,3,5,9,12]\n2', output: '-1', description: 'Target not found' },
        { input: '[5]\n5', output: '0', description: 'Single element array' }
      ];
    
    case '7': // Longest Substring Without Repeating
      return [
        { input: '"abcabcbb"', output: '3', description: 'Longest substring "abc"' },
        { input: '"bbbbb"', output: '1', description: 'Single character repeated' },
        { input: '"pwwkew"', output: '3', description: 'Longest substring "wke"' }
      ];
    
    case '8': // Merge Two Sorted Arrays
      return [
        { input: '[1,2,3]\n[2,5,6]', output: '[1,2,2,3,5,6]', description: 'Merge two sorted arrays' },
        { input: '[1]\n[]', output: '[1]', description: 'One empty array' },
        { input: '[]\n[1]', output: '[1]', description: 'One empty array' }
      ];
    
    case '9': // Kth Largest Element
      return [
        { input: '[3,2,1,5,6,4]\n2', output: '5', description: '2nd largest element' },
        { input: '[3,2,3,1,2,4,5,5,6]\n4', output: '4', description: '4th largest element' }
      ];
    
    case '10': // Queue Using Stacks
      return [
        { input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]', output: '[null, null, null, 1, 1, false]', description: 'Queue operations' }
      ];
    
    case '11': // Binary Tree Traversals
      return [
        { input: '[1,2,3,4,5]', output: 'Inorder: [4,2,5,1,3]\nPreorder: [1,2,4,5,3]\nPostorder: [4,5,2,3,1]', description: 'Tree traversals' }
      ];
    
    case '12': // QuickSort Implementation
      return [
        { input: '[64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]', description: 'QuickSort example' }
      ];
    
    case '13': // MergeSort Implementation
      return [
        { input: '[38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]', description: 'MergeSort example' }
      ];
    
    case '14': // Detect Cycle in Directed Graph
      return [
        { input: '[[1,2],[2,3],[3,4],[4,2]]', output: 'true', description: 'Graph with cycle' },
        { input: '[[1,2],[2,3],[3,4]]', output: 'false', description: 'Acyclic graph' }
      ];
    
    case '15': // Number of Islands
      return [
        { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', description: 'Single island' },
        { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', description: 'Three islands' }
      ];
    
    case '16': // BFS Shortest Path
      return [
        { input: '[[1,2],[1,3],[2,4],[3,4]]\n1\n4', output: '2', description: 'Shortest path length' }
      ];
    
    case '17': // Topological Sort
      return [
        { input: '[[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]', description: 'Topological order' }
      ];
    
    case '18': // Edit Distance
      return [
        { input: '"horse"\n"ros"', output: '3', description: 'Edit distance calculation' },
        { input: '"intention"\n"execution"', output: '5', description: 'Longer strings' }
      ];
    
    case '19': // Palindromic Substrings
      return [
        { input: '"aaa"', output: '6', description: 'All palindromic substrings' },
        { input: '"abc"', output: '3', description: 'Single characters' }
      ];
    
    case '20': // Longest Consecutive Sequence
      return [
        { input: '[100,4,200,1,3,2]', output: '4', description: 'Longest consecutive sequence' },
        { input: '[0,3,7,2,5,8,4,6,0,1]', output: '9', description: 'Long sequence' }
      ];
    
    case '21': // Merge Two Sorted Linked Lists
      return [
        { input: '[1,2,4]\n[1,3,4]', output: '[1,1,2,3,4,4]', description: 'Merge sorted lists' }
      ];
    
    case '22': // Intersection of Two Linked Lists
      return [
        { input: '[4,1,8,4,5]\n[5,6,1,8,4,5]', output: '8', description: 'Intersection point' }
      ];
    
    case '23': // Remove Nth Node From End
      return [
        { input: '[1,2,3,4,5]\n2', output: '[1,2,3,5]', description: 'Remove 2nd from end' }
      ];
    
    case '24': // Copy List with Random Pointer
      return [
        { input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', description: 'Copy with random pointers' }
      ];
    
    case '25': // Level Order Traversal
      return [
        { input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', description: 'Level order traversal' }
      ];
    
    case '26': // Lowest Common Ancestor
      return [
        { input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1', output: '3', description: 'LCA of nodes 5 and 1' }
      ];
    
    case '27': // Diameter of Binary Tree
      return [
        { input: '[1,2,3,4,5]', output: '3', description: 'Diameter calculation' }
      ];
    
    case '28': // Symmetric Tree
      return [
        { input: '[1,2,2,3,4,4,3]', output: 'true', description: 'Symmetric tree' },
        { input: '[1,2,2,null,3,null,3]', output: 'false', description: 'Asymmetric tree' }
      ];
    
    case '29': // Balanced Binary Tree
      return [
        { input: '[3,9,20,null,null,15,7]', output: 'true', description: 'Balanced tree' },
        { input: '[1,2,2,3,3,null,null,4,4]', output: 'false', description: 'Unbalanced tree' }
      ];
    
    case '30': // BST to Doubly Linked List
      return [
        { input: '[4,2,5,1,3]', output: '[1,2,3,4,5]', description: 'BST to sorted DLL' }
      ];
    
    case '31': // Binary Search in Rotated Array
      return [
        { input: '[4,5,6,7,0,1,2]\n0', output: '4', description: 'Target in rotated array' },
        { input: '[4,5,6,7,0,1,2]\n3', output: '-1', description: 'Target not found' }
      ];
    
    case '32': // Find Duplicate Number
      return [
        { input: '[1,3,4,2,2]', output: '2', description: 'Duplicate number found' },
        { input: '[3,1,3,4,2]', output: '3', description: 'Another duplicate' }
      ];
    
    case '33': // Rotate Array by K Steps
      return [
        { input: '[1,2,3,4,5,6,7]\n3', output: '[5,6,7,1,2,3,4]', description: 'Rotate by 3 steps' }
      ];
    
    case '34': // Set Matrix Zeroes
      return [
        { input: '[[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', description: 'Set zeroes in matrix' }
      ];
    
    case '35': // Top K Frequent Elements
      return [
        { input: '[1,1,1,2,2,3]\n2', output: '[1,2]', description: 'Top 2 frequent elements' }
      ];
    
    case '36': // Subarray Sum Equals K
      return [
        { input: '[1,1,1]\n2', output: '2', description: 'Subarrays with sum 2' }
      ];
    
    case '37': // Isomorphic Strings
      return [
        { input: '"egg"\n"add"', output: 'true', description: 'Isomorphic strings' },
        { input: '"foo"\n"bar"', output: 'false', description: 'Non-isomorphic strings' }
      ];
    
    case '38': // Two Sum
      return [
        { input: '[2,7,11,15]\n9', output: '[0,1]', description: 'Target found with indices 0 and 1' },
        { input: '[3,2,4]\n6', output: '[1,2]', description: 'Target found with indices 1 and 2' },
        { input: '[3,3]\n6', output: '[0,1]', description: 'Same numbers' }
      ];
    
    case '39': // Add Two Numbers
      return [
        { input: '[2,4,3]\n[5,6,4]', output: '[7,0,8]', description: 'Add two numbers' }
      ];
    
    case '40': // Container With Most Water
      return [
        { input: '[1,8,6,2,5,4,8,3,7]', output: '49', description: 'Maximum water container' }
      ];
    
    case '41': // Dijkstra's Algorithm
      return [
        { input: 'Graph with weighted edges', output: 'Shortest path distances', description: 'Dijkstra algorithm' }
      ];
    
    case '42': // Floyd-Warshall Algorithm
      return [
        { input: 'Graph adjacency matrix', output: 'All-pairs shortest paths', description: 'Floyd-Warshall' }
      ];
    
    case '43': // Kruskal's Algorithm
      return [
        { input: 'Weighted graph edges', output: 'Minimum spanning tree', description: 'Kruskal algorithm' }
      ];
    
    case '44': // Prim's Algorithm
      return [
        { input: 'Weighted graph', output: 'Minimum spanning tree', description: 'Prim algorithm' }
      ];
    
    case '45': // Knapsack Problem
      return [
        { input: 'Weights: [1,3,4,5], Values: [1,4,5,7], Capacity: 7', output: '9', description: '0/1 Knapsack' }
      ];
    
    case '46': // Longest Common Subsequence
      return [
        { input: '"abcde"\n"ace"', output: '3', description: 'LCS length' }
      ];
    
    case '47': // Coin Change Problem
      return [
        { input: '[1,2,5]\n11', output: '3', description: 'Minimum coins needed' }
      ];
    
    case '48': // Climbing Stairs
      return [
        { input: '3', output: '3', description: 'Ways to climb 3 stairs' }
      ];
    
    case '49': // House Robber
      return [
        { input: '[1,2,3,1]', output: '4', description: 'Maximum money robbed' }
      ];
    
    case '50': // Word Break
      return [
        { input: '"leetcode"\n["leet","code"]', output: 'true', description: 'Word can be broken' }
      ];
    
    case '51': // Regular Expression Matching
      return [
        { input: '"aa"\n"a*"', output: 'true', description: 'Regex matching' }
      ];
    
    case '52': // Wildcard Matching
      return [
        { input: '"aa"\n"a?"', output: 'false', description: 'Wildcard matching' }
      ];
    
    case '53': // Trapping Rain Water
      return [
        { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', description: 'Water trapped' }
      ];
    
    case '54': // Sliding Window Maximum
      return [
        { input: '[1,3,-1,-3,5,3,6,7]\n3', output: '[3,3,5,5,6,7]', description: 'Sliding window max' }
      ];
    
    case '55': // Median of Two Sorted Arrays
      return [
        { input: '[1,3]\n[2]', output: '2.0', description: 'Median calculation' }
      ];
    
    case '56': // Reverse Words in String
      return [
        { input: '"the sky is blue"', output: '"blue is sky the"', description: 'Reverse words' }
      ];
    
    case '57': // Valid Anagram
      return [
        { input: '"anagram"\n"nagaram"', output: 'true', description: 'Valid anagram' }
      ];
    
    case '58': // Group Anagrams
      return [
        { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', description: 'Group anagrams' }
      ];
    
    case '59': // Valid Palindrome
      return [
        { input: '"A man, a plan, a canal: Panama"', output: 'true', description: 'Valid palindrome' }
      ];
    
    case '60': // Longest Palindromic Substring
      return [
        { input: '"babad"', output: '"bab"', description: 'Longest palindrome' }
      ];
    
    case '61': // Implement Trie
      return [
        { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output: '[null,null,true,false,true,null,true]', description: 'Trie operations' }
      ];
    
    case '62': // Word Search
      return [
        { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"', output: 'true', description: 'Word found in board' }
      ];
    
    case '63': // Sudoku Solver
      return [
        { input: '[[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]]', output: 'Solved sudoku', description: 'Sudoku solution' }
      ];
    
    case '64': // N-Queens
      return [
        { input: '4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', description: 'N-Queens solutions' }
      ];
    
    case '65': // Permutations
      return [
        { input: '[1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', description: 'All permutations' }
      ];
    
    case '66': // Combinations
      return [
        { input: '4\n2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', description: 'All combinations' }
      ];
    
    case '67': // Subsets
      return [
        { input: '[1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', description: 'All subsets' }
      ];
    
    case '68': // Generate Parentheses
      return [
        { input: '3', output: '["((()))","(()())","(())()","()(())","()()()"]', description: 'Valid parentheses' }
      ];
    
    case '69': // Letter Combinations of Phone Number
      return [
        { input: '"23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', description: 'Phone number combinations' }
      ];
    
    case '70': // Combination Sum
      return [
        { input: '[2,3,6,7]\n7', output: '[[2,2,3],[7]]', description: 'Combination sum' }
      ];
    
    case '71': // LRU Cache
      return [
        { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]', description: 'LRU cache operations' }
      ];
    
    case '72': // LFU Cache
      return [
        { input: '["LFUCache","put","put","get","put","get","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,3,null,-1,3,4]', description: 'LFU cache operations' }
      ];
    
    case '73': // All O(1) Data Structure
      return [
        { input: '["AllOne","inc","inc","getMaxKey","getMinKey","inc","getMaxKey","getMinKey"]\n[[],["hello"],["hello"],[],[],["leet"],[],[]]', output: '[null,null,null,"hello","hello",null,"hello","leet"]', description: 'O(1) operations' }
      ];
    
    case '74': // Min Stack
      return [
        { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]', description: 'Min stack operations' }
      ];
    
    case '75': // Max Stack
      return [
        { input: '["MaxStack","push","push","push","top","popMax","top","peekMax","pop","top"]\n[[],[5],[1],[5],[],[],[],[],[],[]]', output: '[null,null,null,null,5,5,1,5,1,5]', description: 'Max stack operations' }
      ];
    
    case '76': // Implement Stack using Queues
      return [
        { input: '["MyStack","push","push","top","pop","empty"]\n[[],[1],[2],[],[],[]]', output: '[null,null,null,2,2,false]', description: 'Stack operations' }
      ];
    
    case '77': // Implement Queue using Stacks
      return [
        { input: '["MyQueue","push","push","peek","pop","empty"]\n[[],[1],[2],[],[],[]]', output: '[null,null,null,1,1,false]', description: 'Queue operations' }
      ];
    
    case '78': // Circular Queue
      return [
        { input: '["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull","deQueue","enQueue","Rear"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]', output: '[null,true,true,true,false,3,true,true,true,4]', description: 'Circular queue operations' }
      ];
    
    case '79': // Design HashMap
      return [
        { input: '["MyHashMap","put","put","get","get","put","get","remove","get"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]', output: '[null,null,null,1,-1,null,1,null,-1]', description: 'HashMap operations' }
      ];
    
    case '80': // Design HashSet
      return [
        { input: '["MyHashSet","add","add","contains","contains","add","contains","remove","contains"]\n[[],[1],[2],[1],[3],[2],[2],[2],[2]]', output: '[null,null,null,true,false,null,true,null,false]', description: 'HashSet operations' }
      ];
    
    case '81': // Design Linked List
      return [
        { input: '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n[[],[1],[3],[1,2],[1],[1],[1]]', output: '[null,null,null,null,2,null,3]', description: 'Linked list operations' }
      ];
    
    case '82': // Design Browser History
      return [
        { input: '["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]\n[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]', output: '[null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]', description: 'Browser history operations' }
      ];
    
    case '83': // Design Underground System
      return [
        { input: '["UndergroundSystem","checkIn","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime"]\n[[],[45,"Leyton",3],[32,"Paradise",8],[45,"Waterloo",15],[45,"Leyton",10],[10,"Leyton",24],[10,"Waterloo",38],[10,"Leyton",24]]', output: '[null,null,null,null,14.0,null,null,11.0]', description: 'Underground system operations' }
      ];
    
    case '84': // Design Authentication Manager
      return [
        { input: '["AuthenticationManager","renew","generate","countUnexpiredTokens","generate","renew","renew","countUnexpiredTokens"]\n[[5],["aaa",1],["bbb",2],[6],["ccc",7],["aaa",8],["bbb",10],[15]]', output: '[null,null,null,1,null,null,null,0]', description: 'Authentication manager operations' }
      ];
    
    case '85': // Design Leaderboard
      return [
        { input: '["Leaderboard","addScore","addScore","addScore","addScore","addScore","top","reset","reset","addScore","top"]\n[[],[1,73],[2,56],[3,39],[4,51],[5,4],[1],[1],[2],[2,51],[3]]', output: '[null,null,null,null,null,73,null,null,null,141]', description: 'Leaderboard operations' }
      ];
    
    case '86': // Design Parking System
      return [
        { input: '["ParkingSystem","addCar","addCar","addCar","addCar"]\n[[1,1,0],[1],[2],[3],[1]]', output: '[null,true,true,false,false]', description: 'Parking system operations' }
      ];
    
    case '87': // Design Ordered Stream
      return [
        { input: '["OrderedStream","insert","insert","insert","insert","insert"]\n[[5],[3,"ccccc"],[1,"aaaaa"],[2,"bbbbb"],[5,"eeeee"],[4,"ddddd"]]', output: '[[],["ccccc"],[],["bbbbb","ccccc"],[],["ddddd","eeeee"]]', description: 'Ordered stream operations' }
      ];
    
    case '88': // Design Recent Counter
      return [
        { input: '["RecentCounter","ping","ping","ping","ping"]\n[[],[1],[100],[3001],[3002]]', output: '[null,1,2,3,3]', description: 'Recent counter operations' }
      ];
    
    case '89': // Design Logger Rate Limiter
      return [
        { input: '["Logger","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage"]\n[[],[1,"foo"],[2,"bar"],[3,"foo"],[8,"bar"],[10,"foo"],[11,"foo"]]', output: '[null,true,true,false,false,false,true]', description: 'Logger rate limiter operations' }
      ];
    
    case '90': // Design Hit Counter
      return [
        { input: '["HitCounter","hit","hit","hit","getHits","hit","getHits","getHits"]\n[[],[1],[2],[3],[4],[300],[300],[301]]', output: '[null,null,null,null,3,null,4,3]', description: 'Hit counter operations' }
      ];
    
    case '91': // Design Snake Game
      return [
        { input: '["SnakeGame","move","move","move","move","move","move"]\n[[3,2,[[1,2],[0,1]]],["R"],["D"],["R"],["U"],["L"],["U"]]', output: '[null,0,0,1,1,2,-1]', description: 'Snake game operations' }
      ];
    
    case '92': // Design Tic-Tac-Toe
      return [
        { input: '["TicTacToe","move","move","move","move","move","move","move"]\n[[3],[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]', output: '[null,0,0,0,0,0,0,1]', description: 'Tic-tac-toe game operations' }
      ];
    
    case '93': // Design Connect Four
      return [
        { input: '["ConnectFour","move","move","move","move","move","move","move"]\n[[6,7],[0,1],[0,2],[0,1],[0,2],[0,1],[0,2],[0,1]]', output: '[null,0,0,0,0,0,0,1]', description: 'Connect Four game operations' }
      ];
    
    case '94': // Design Minesweeper
      return [
        { input: '["Minesweeper","click"]\n[[["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]],[3,0]]', output: '[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]', description: 'Minesweeper game operations' }
      ];
    
    case '95': // Design Excel Sum Formula
      return [
        { input: '["Excel","set","sum","set","get"]\n[[3,"C"],[1,"A",2],[3,"C",["A1","A1:B2"]],[2,"B",2],[3,"C"]]', output: '[null,null,4,null,6]', description: 'Excel sum formula operations' }
      ];
    
    case '96': // Design File System
      return [
        { input: '["FileSystem","createPath","get"]\n[[],["/a",1],["/a"]]', output: '[null,true,1]', description: 'File system operations' }
      ];
    
    case '97': // Design Search Autocomplete System
      return [
        { input: '["AutocompleteSystem","input","input","input","input"]\n[[["i love you","island","iroman","i love leetcode"],[5,3,2,2]],["i"],[" "],["a"],["#"]]', output: '[[],["i love you","island","i love leetcode"],[],["i love you","i love leetcode"],[]]', description: 'Search autocomplete operations' }
      ];
    
    case '98': // Design Word Dictionary
      return [
        { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: '[null,null,null,null,false,true,true,true]', description: 'Word dictionary operations' }
      ];
    
    case '99': // Design Magic Dictionary
      return [
        { input: '["MagicDictionary","buildDict","search","search","search"]\n[[],[["hello","leetcode"]],["hello"],["hhllo"],["hell"]]', output: '[null,null,false,true,false]', description: 'Magic dictionary operations' }
      ];
    
    case '100': // Design Add and Search Words
      return [
        { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: '[null,null,null,null,false,true,true,true]', description: 'Add and search words operations' }
      ];
    
    default:
      return [
        { input: 'Test input', output: 'Expected output', description: 'General test case' },
        { input: 'Another input', output: 'Another output', description: 'Additional test case' }
      ];
  }
};

// Create comprehensive problem bank from questions data
const BANK: ProblemBankItem[] = QUESTIONS_DATA.map(q => ({
  id: q.id,
  problem: {
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    category: q.category,
    points: q.points,
    solvedBy: [],
    description: q.description,
    testCases: generateTestCases(q.id),
    starterCode: getStarterCode(q.id)
  },
  question: {
    id: q.id,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    category: q.category,
    tags: q.tags,
    testCases: generateTestCases(q.id).map((tc, index) => ({
      id: (index + 1).toString(),
      input: tc.input,
      expectedOutput: tc.output,
      isHidden: false,
      description: tc.description
    })),
    solution: `// Solution for ${q.title}\n// Implement your solution here`,
    hints: ['Read the problem description carefully', 'Consider edge cases', 'Think about time and space complexity'],
    points: q.points,
    timeLimit: 30,
    memoryLimit: 64,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
}));

export const getAllProblems = (): Problem[] => BANK.map(x => x.problem);
export const getProblemById = (id: string): Problem | undefined => BANK.find(x => x.id === id)?.problem;
export const getAllQuestions = (): Question[] => BANK.map(x => x.question);
export const getQuestionById = (id: string): Question | undefined => BANK.find(x => x.id === id)?.question;


