// Comprehensive technical interview questions data - CODING ONLY
export const QUESTIONS_DATA = [
  // Data Structures and Algorithms (1-50)
  {
    id: '1',
    title: 'Reverse a Singly Linked List',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: 'Implement a function to reverse a singly linked list both iteratively and recursively.',
    tags: ['linked-list', 'recursion', 'iterative']
  },
  {
    id: '2',
    title: 'Detect Cycle in Linked List',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: "Detect if a linked list has a cycle using Floyd's Algorithm (tortoise and hare).",
    tags: ['linked-list', 'two-pointers', 'cycle-detection']
  },
  {
    id: '3',
    title: 'Find Missing Number',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 120,
    description: 'Given an array of size n containing numbers from 0 to n, find the missing number.',
    tags: ['array', 'math', 'xor']
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    difficulty: 'easy' as const,
    category: 'Stack',
    points: 150,
    description: 'Check if the input string has valid parentheses using a stack.',
    tags: ['stack', 'string', 'parentheses']
  },
  {
    id: '5',
    title: 'Maximum Subarray Sum (Kadane)',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 250,
    description: "Find the maximum subarray sum using Kadane's Algorithm.",
    tags: ['array', 'dp', 'kadane']
  },
  {
    id: '6',
    title: 'Binary Search',
    difficulty: 'easy' as const,
    category: 'Search',
    points: 100,
    description: 'Implement binary search in a sorted array.',
    tags: ['binary-search', 'array']
  },
  {
    id: '7',
    title: 'Longest Substring Without Repeating',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 250,
    description: 'Find the longest substring without repeating characters.',
    tags: ['string', 'sliding-window', 'hash-table']
  },
  {
    id: '8',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 130,
    description: 'Merge two sorted arrays into one sorted array efficiently.',
    tags: ['array', 'sorting', 'merge']
  },
  {
    id: '9',
    title: 'Kth Largest Element',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 250,
    description: 'Find the Kth largest/smallest element in an unsorted array.',
    tags: ['array', 'heap', 'quickselect']
  },
  {
    id: '10',
    title: 'Queue Using Stacks',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Implement a queue using stacks (FIFO using LIFO).',
    tags: ['stack', 'queue', 'design']
  },
  {
    id: '11',
    title: 'Binary Tree Traversals',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 180,
    description: 'Implement inorder, preorder, and postorder traversals of a binary tree.',
    tags: ['tree', 'traversal', 'recursion']
  },
  {
    id: '12',
    title: 'QuickSort Implementation',
    difficulty: 'medium' as const,
    category: 'Sorting',
    points: 220,
    description: 'Implement QuickSort algorithm.',
    tags: ['sorting', 'quicksort', 'divide-conquer']
  },
  {
    id: '13',
    title: 'MergeSort Implementation',
    difficulty: 'medium' as const,
    category: 'Sorting',
    points: 200,
    description: 'Implement MergeSort algorithm.',
    tags: ['sorting', 'mergesort', 'divide-conquer']
  },
  {
    id: '14',
    title: 'Detect Cycle in Directed Graph',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 280,
    description: 'Detect cycle in a directed graph using DFS or Kahn\'s Algorithm.',
    tags: ['graph', 'dfs', 'topological-sort']
  },
  {
    id: '15',
    title: 'Number of Islands',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: 'Count the number of islands using BFS/DFS/Union-Find.',
    tags: ['graph', 'dfs', 'bfs', 'union-find']
  },
  {
    id: '16',
    title: 'BFS Shortest Path',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 220,
    description: 'Find shortest path using BFS.',
    tags: ['graph', 'bfs', 'shortest-path']
  },
  {
    id: '17',
    title: 'Topological Sort',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 240,
    description: 'Implement topological sort for a directed acyclic graph.',
    tags: ['graph', 'topological-sort', 'dfs']
  },
  {
    id: '18',
    title: 'Edit Distance',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: 'Calculate the minimum edit distance between two strings.',
    tags: ['dp', 'string', 'edit-distance']
  },
  {
    id: '19',
    title: 'Palindromic Substrings',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 220,
    description: 'Find all palindromic substrings in a string.',
    tags: ['string', 'palindrome', 'dp']
  },
  {
    id: '20',
    title: 'Longest Consecutive Sequence',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 300,
    description: 'Find the longest consecutive sequence in an unsorted array.',
    tags: ['array', 'hash-set', 'sequence']
  },
  {
    id: '21',
    title: 'Merge Two Sorted Linked Lists',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 160,
    description: 'Merge two sorted linked lists into one sorted list.',
    tags: ['linked-list', 'merge', 'sorting']
  },
  {
    id: '22',
    title: 'Intersection of Two Linked Lists',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Find the intersection point of two linked lists.',
    tags: ['linked-list', 'two-pointers', 'intersection']
  },
  {
    id: '23',
    title: 'Remove Nth Node From End',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: 'Remove the N-th node from the end of a linked list.',
    tags: ['linked-list', 'two-pointers', 'removal']
  },
  {
    id: '24',
    title: 'Copy List with Random Pointer',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: 'Copy a linked list with random pointer.',
    tags: ['linked-list', 'hash-map', 'copy']
  },
  {
    id: '25',
    title: 'Level Order Traversal',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 200,
    description: 'Perform level order traversal of a binary tree.',
    tags: ['tree', 'bfs', 'level-order']
  },
  {
    id: '26',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 220,
    description: 'Find the lowest common ancestor of two nodes in a binary tree.',
    tags: ['tree', 'lca', 'recursion']
  },
  {
    id: '27',
    title: 'Diameter of Binary Tree',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 240,
    description: 'Find the diameter of a binary tree.',
    tags: ['tree', 'diameter', 'dfs']
  },
  {
    id: '28',
    title: 'Symmetric Tree',
    difficulty: 'easy' as const,
    category: 'Trees',
    points: 150,
    description: 'Check if a binary tree is symmetric.',
    tags: ['tree', 'symmetric', 'recursion']
  },
  {
    id: '29',
    title: 'Balanced Binary Tree',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 200,
    description: 'Check if a binary tree is balanced.',
    tags: ['tree', 'balanced', 'dfs']
  },
  {
    id: '30',
    title: 'BST to Doubly Linked List',
    difficulty: 'hard' as const,
    category: 'Trees',
    points: 300,
    description: 'Convert a BST to a sorted doubly linked list.',
    tags: ['tree', 'bst', 'doubly-linked-list']
  },
  {
    id: '31',
    title: 'Binary Search in Rotated Array',
    difficulty: 'medium' as const,
    category: 'Search',
    points: 250,
    description: 'Implement binary search on a rotated sorted array.',
    tags: ['binary-search', 'rotated-array', 'search']
  },
  {
    id: '32',
    title: 'Find Duplicate Number',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 220,
    description: 'Find the duplicate number in an array without modifying the array.',
    tags: ['array', 'duplicate', 'two-pointers']
  },
  {
    id: '33',
    title: 'Rotate Array by K Steps',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 200,
    description: 'Rotate an array by k steps (cyclic rotation).',
    tags: ['array', 'rotation', 'cyclic']
  },
  {
    id: '34',
    title: 'Set Matrix Zeroes',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 200,
    description: 'Set matrix zeroes in-place when an element is zero.',
    tags: ['matrix', 'in-place', 'zero']
  },
  {
    id: '35',
    title: 'Top K Frequent Elements',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 220,
    description: 'Find the top K frequent elements in an array.',
    tags: ['array', 'heap', 'frequency']
  },
  {
    id: '36',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 240,
    description: 'Find the number of subarrays that sum to K.',
    tags: ['array', 'prefix-sum', 'hash-map']
  },
  {
    id: '37',
    title: 'Isomorphic Strings',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 140,
    description: 'Check if two strings are isomorphic.',
    tags: ['string', 'isomorphic', 'mapping']
  },
  {
    id: '38',
    title: 'Two Sum',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 100,
    description: 'Find two numbers in an array that add up to a target.',
    tags: ['array', 'hash-map', 'two-sum']
  },
  {
    id: '39',
    title: 'Add Two Numbers',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Add two numbers represented by linked lists.',
    tags: ['linked-list', 'addition', 'carry']
  },
  {
    id: '40',
    title: 'Container With Most Water',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 250,
    description: 'Find two lines that together with the x-axis forms a container that would hold the maximum amount of water.',
    tags: ['array', 'two-pointers', 'area']
  },
  // Additional Algorithm Questions (41-100)
  {
    id: '41',
    title: 'Dijkstra\'s Algorithm',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 300,
    description: 'Implement Dijkstra\'s shortest path algorithm.',
    tags: ['graph', 'dijkstra', 'shortest-path']
  },
  {
    id: '42',
    title: 'Floyd-Warshall Algorithm',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 320,
    description: 'Implement Floyd-Warshall algorithm for all-pairs shortest paths.',
    tags: ['graph', 'floyd-warshall', 'shortest-path']
  },
  {
    id: '43',
    title: 'Kruskal\'s Algorithm',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: 'Implement Kruskal\'s algorithm for minimum spanning tree.',
    tags: ['graph', 'kruskal', 'mst']
  },
  {
    id: '44',
    title: 'Prim\'s Algorithm',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: 'Implement Prim\'s algorithm for minimum spanning tree.',
    tags: ['graph', 'prim', 'mst']
  },
  {
    id: '45',
    title: 'Knapsack Problem',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: 'Solve the 0/1 knapsack problem using dynamic programming.',
    tags: ['dp', 'knapsack', 'optimization']
  },
  {
    id: '46',
    title: 'Longest Common Subsequence',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 250,
    description: 'Find the longest common subsequence of two strings.',
    tags: ['dp', 'string', 'lcs']
  },
  {
    id: '47',
    title: 'Coin Change Problem',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 220,
    description: 'Find the minimum number of coins needed to make a given amount.',
    tags: ['dp', 'coins', 'optimization']
  },
  {
    id: '48',
    title: 'Climbing Stairs',
    difficulty: 'easy' as const,
    category: 'Dynamic Programming',
    points: 120,
    description: 'Find the number of ways to climb n stairs.',
    tags: ['dp', 'stairs', 'fibonacci']
  },
  {
    id: '49',
    title: 'House Robber',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 200,
    description: 'Find the maximum amount of money you can rob from houses.',
    tags: ['dp', 'robbery', 'optimization']
  },
  {
    id: '50',
    title: 'Word Break',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 220,
    description: 'Determine if a string can be segmented into dictionary words.',
    tags: ['dp', 'string', 'word-break']
  },
  {
    id: '51',
    title: 'Regular Expression Matching',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: 'Implement regular expression matching with support for \'.\' and \'*\'.',
    tags: ['dp', 'regex', 'string']
  },
  {
    id: '52',
    title: 'Wildcard Matching',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 280,
    description: 'Implement wildcard pattern matching with support for \'?\' and \'*\'.',
    tags: ['dp', 'wildcard', 'string']
  },
  {
    id: '53',
    title: 'Trapping Rain Water',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 300,
    description: 'Calculate how much water can be trapped between bars.',
    tags: ['array', 'two-pointers', 'water']
  },
  {
    id: '54',
    title: 'Sliding Window Maximum',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 280,
    description: 'Find the maximum element in each sliding window of size k.',
    tags: ['array', 'sliding-window', 'deque']
  },
  {
    id: '55',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 350,
    description: 'Find the median of two sorted arrays.',
    tags: ['array', 'median', 'binary-search']
  },
  {
    id: '56',
    title: 'Reverse Words in String',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 180,
    description: 'Reverse the order of words in a string.',
    tags: ['string', 'reverse', 'words']
  },
  {
    id: '57',
    title: 'Valid Anagram',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 100,
    description: 'Check if two strings are anagrams.',
    tags: ['string', 'anagram', 'hash-map']
  },
  {
    id: '58',
    title: 'Group Anagrams',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 200,
    description: 'Group strings that are anagrams of each other.',
    tags: ['string', 'anagram', 'grouping']
  },
  {
    id: '59',
    title: 'Valid Palindrome',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 120,
    description: 'Check if a string is a valid palindrome.',
    tags: ['string', 'palindrome', 'two-pointers']
  },
  {
    id: '60',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 250,
    description: 'Find the longest palindromic substring in a string.',
    tags: ['string', 'palindrome', 'dp']
  },
  {
    id: '61',
    title: 'Implement Trie',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Implement a Trie (prefix tree) data structure.',
    tags: ['trie', 'prefix-tree', 'data-structure']
  },
  {
    id: '62',
    title: 'Word Search',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 240,
    description: 'Find if a word exists in a 2D board of characters.',
    tags: ['graph', 'dfs', 'backtracking']
  },
  {
    id: '63',
    title: 'Sudoku Solver',
    difficulty: 'hard' as const,
    category: 'Backtracking',
    points: 300,
    description: 'Solve a Sudoku puzzle using backtracking.',
    tags: ['backtracking', 'sudoku', 'puzzle']
  },
  {
    id: '64',
    title: 'N-Queens',
    difficulty: 'hard' as const,
    category: 'Backtracking',
    points: 280,
    description: 'Place N queens on an NxN chessboard so no two queens threaten each other.',
    tags: ['backtracking', 'n-queens', 'chess']
  },
  {
    id: '65',
    title: 'Permutations',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: 'Generate all permutations of an array.',
    tags: ['backtracking', 'permutations', 'recursion']
  },
  {
    id: '66',
    title: 'Combinations',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 180,
    description: 'Generate all combinations of k numbers from 1 to n.',
    tags: ['backtracking', 'combinations', 'recursion']
  },
  {
    id: '67',
    title: 'Subsets',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: 'Generate all possible subsets of an array.',
    tags: ['backtracking', 'subsets', 'recursion']
  },
  {
    id: '68',
    title: 'Generate Parentheses',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 220,
    description: 'Generate all valid combinations of n pairs of parentheses.',
    tags: ['backtracking', 'parentheses', 'recursion']
  },
  {
    id: '69',
    title: 'Letter Combinations of Phone Number',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: 'Generate all possible letter combinations from a phone number.',
    tags: ['backtracking', 'phone', 'combinations']
  },
  {
    id: '70',
    title: 'Combination Sum',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 220,
    description: 'Find all combinations of numbers that sum to a target.',
    tags: ['backtracking', 'combination-sum', 'recursion']
  },
  {
    id: '71',
    title: 'LRU Cache',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: 'Design and implement an LRU (Least Recently Used) cache.',
    tags: ['cache', 'lru', 'hash-map', 'doubly-linked-list']
  },
  {
    id: '72',
    title: 'LFU Cache',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 300,
    description: 'Design and implement an LFU (Least Frequently Used) cache.',
    tags: ['cache', 'lfu', 'hash-map', 'frequency']
  },
  {
    id: '73',
    title: 'All O(1) Data Structure',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 320,
    description: 'Design a data structure that supports all operations in O(1) time.',
    tags: ['data-structure', 'o1', 'hash-map', 'doubly-linked-list']
  },
  {
    id: '74',
    title: 'Min Stack',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element.',
    tags: ['stack', 'min', 'data-structure']
  },
  {
    id: '75',
    title: 'Max Stack',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: 'Design a max stack that supports push, pop, top, peekMax, and popMax.',
    tags: ['stack', 'max', 'data-structure']
  },
  {
    id: '76',
    title: 'Implement Stack using Queues',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Implement a stack using queues (LIFO using FIFO).',
    tags: ['stack', 'queue', 'design']
  },
  {
    id: '77',
    title: 'Implement Queue using Stacks',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Implement a queue using stacks (FIFO using LIFO).',
    tags: ['queue', 'stack', 'design']
  },
  {
    id: '78',
    title: 'Circular Queue',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Design and implement a circular queue.',
    tags: ['queue', 'circular', 'design']
  },
  {
    id: '79',
    title: 'Design HashMap',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: 'Design a HashMap without using any built-in hash table libraries.',
    tags: ['hash-map', 'design', 'data-structure']
  },
  {
    id: '80',
    title: 'Design HashSet',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Design a HashSet without using any built-in hash table libraries.',
    tags: ['hash-set', 'design', 'data-structure']
  },
  {
    id: '81',
    title: 'Design Linked List',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: 'Design your implementation of the linked list.',
    tags: ['linked-list', 'design', 'data-structure']
  },
  {
    id: '82',
    title: 'Design Browser History',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Design a browser history system.',
    tags: ['design', 'browser', 'history']
  },
  {
    id: '83',
    title: 'Design Underground System',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: 'Design an underground railway system.',
    tags: ['design', 'railway', 'system']
  },
  {
    id: '84',
    title: 'Design Authentication Manager',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Design an authentication manager.',
    tags: ['design', 'authentication', 'manager']
  },
  {
    id: '85',
    title: 'Design Leaderboard',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Design a leaderboard system.',
    tags: ['design', 'leaderboard', 'ranking']
  },
  {
    id: '86',
    title: 'Design Parking System',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: 'Design a parking system.',
    tags: ['design', 'parking', 'system']
  },
  {
    id: '87',
    title: 'Design Ordered Stream',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 120,
    description: 'Design an ordered stream.',
    tags: ['design', 'stream', 'ordered']
  },
  {
    id: '88',
    title: 'Design Recent Counter',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 100,
    description: 'Design a recent counter.',
    tags: ['design', 'counter', 'recent']
  },
  {
    id: '89',
    title: 'Design Logger Rate Limiter',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 130,
    description: 'Design a logger rate limiter.',
    tags: ['design', 'logger', 'rate-limiter']
  },
  {
    id: '90',
    title: 'Design Hit Counter',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: 'Design a hit counter.',
    tags: ['design', 'hit-counter', 'timestamp']
  },
  {
    id: '91',
    title: 'Design Snake Game',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: 'Design a snake game.',
    tags: ['design', 'snake', 'game']
  },
  {
    id: '92',
    title: 'Design Tic-Tac-Toe',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Design a tic-tac-toe game.',
    tags: ['design', 'tic-tac-toe', 'game']
  },
  {
    id: '93',
    title: 'Design Connect Four',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Design a Connect Four game.',
    tags: ['design', 'connect-four', 'game']
  },
  {
    id: '94',
    title: 'Design Minesweeper',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: 'Design a Minesweeper game.',
    tags: ['design', 'minesweeper', 'game']
  },
  {
    id: '95',
    title: 'Design Excel Sum Formula',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: 'Design an Excel sum formula system.',
    tags: ['design', 'excel', 'formula']
  },
  {
    id: '96',
    title: 'Design File System',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 230,
    description: 'Design a file system.',
    tags: ['design', 'file-system', 'tree']
  },
  {
    id: '97',
    title: 'Design Search Autocomplete System',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 300,
    description: 'Design a search autocomplete system.',
    tags: ['design', 'search', 'autocomplete']
  },
  {
    id: '98',
    title: 'Design Word Dictionary',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: 'Design a word dictionary with wildcard support.',
    tags: ['design', 'dictionary', 'wildcard']
  },
  {
    id: '99',
    title: 'Design Magic Dictionary',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: 'Design a magic dictionary.',
    tags: ['design', 'magic', 'dictionary']
  },
  {
    id: '100',
    title: 'Design Add and Search Words',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: 'Design a data structure that supports adding new words and finding if a string matches any previously added string.',
    tags: ['design', 'add', 'search', 'words']
  }
];
