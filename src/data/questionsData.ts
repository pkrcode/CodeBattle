// Comprehensive technical interview questions data - CODING ONLY
export const QUESTIONS_DATA = [
  // Data Structures and Algorithms (1-50)
  {
    id: '1',
    title: 'Reverse a Singly Linked List',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: `Implement a function to reverse a singly linked list.

A singly linked list is a data structure where each node contains a value and a reference to the next node. Reversing the list means changing the direction of all the pointers so that the last node becomes the first node.

Examples:
- Input: [1,2,3,4,5] → Output: [5,4,3,2,1]
- Input: [] → Output: [] (empty list)
- Input: [1] → Output: [1] (single node)

Approach:
- Iterative: Use three pointers (prev, current, next) to reverse links
- Recursive: Recursively reverse the rest and adjust head pointer

Complexity: O(n) time, O(1) space for iterative, O(n) space for recursive`,
    tags: ['linked-list', 'recursion', 'iterative']
  },
  {
    id: '2',
    title: 'Detect Cycle in Linked List',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Detect if a linked list has a cycle using Floyd's Algorithm (tortoise and hare).

A cycle occurs when a node in the linked list points to a previously visited node, creating a loop.

Examples:
- Input: [3,2,0,-4] → Output: true (cycle at position 1)
- Input: [1,2,3,4,5] → Output: false (no cycle)
- Input: [1,2] → Output: true (cycle at position 0)

Approach:
- Use two pointers (slow and fast) moving at different speeds
- If they meet, there's a cycle; if fast reaches null, no cycle

Complexity: O(n) time, O(1) space`,
    tags: ['linked-list', 'two-pointers', 'cycle-detection']
  },
  {
    id: '3',
    title: 'Find Missing Number',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 120,
    description: `Given an array of size n containing numbers from 0 to n, find the missing number.

The array contains n distinct numbers in the range [0, n], but one number is missing.

Examples:
- Input: nums = [3,0,1], n = 3 → Output: 2 (missing number)
- Input: nums = [0,1], n = 2 → Output: 2 (missing number)
- Input: nums = [9,6,4,2,3,5,7,0,1], n = 9 → Output: 8 (missing number)

Approach:
- Use sum formula: expected sum = n*(n+1)/2, actual sum = sum of array
- Use XOR: XOR all numbers from 0 to n with array elements
- Use sorting: sort and find the gap

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'math', 'xor']
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    difficulty: 'easy' as const,
    category: 'Stack',
    points: 150,
    description: `Check if the input string has valid parentheses using a stack.

A string is valid if every opening bracket has a corresponding closing bracket in the correct order.

Examples:
- Input: "()" → Output: true (valid)
- Input: "()[]{}" → Output: true (valid)
- Input: "(]" → Output: false (invalid)
- Input: "([)]" → Output: false (invalid)

Approach:
- Use a stack to keep track of opening brackets
- For each closing bracket, check if it matches the top of stack
- Stack should be empty at the end

Complexity: O(n) time, O(n) space`,
    tags: ['stack', 'string', 'parentheses']
  },
  {
    id: '5',
    title: 'Maximum Subarray Sum (Kadane)',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 250,
    description: `Find the maximum subarray sum using Kadane's Algorithm.

Given an array of integers, find the contiguous subarray with the largest sum.

Examples:
- Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 (subarray [4,-1,2,1])
- Input: [1] → Output: 1 (single element)
- Input: [5,4,-1,7,8] → Output: 23 (entire array)

Approach:
- Use Kadane's algorithm: keep track of current sum and max sum
- If current sum becomes negative, reset it to 0
- Update max sum whenever current sum exceeds it

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'dp', 'kadane']
  },
  {
    id: '6',
    title: 'Binary Search',
    difficulty: 'easy' as const,
    category: 'Search',
    points: 100,
    description: `Implement binary search in a sorted array.

Given a sorted array and a target value, return the index of the target if found, otherwise return -1.

Examples:
- Input: nums = [-1,0,3,5,9,12], target = 9 → Output: 4 (found at index 4)
- Input: nums = [-1,0,3,5,9,12], target = 2 → Output: -1 (not found)
- Input: nums = [5], target = 5 → Output: 0 (found at index 0)

Approach:
- Use two pointers (left and right) to narrow down the search
- Compare target with middle element
- Eliminate half of the array in each iteration

Complexity: O(log n) time, O(1) space`,
    tags: ['binary-search', 'array']
  },
  {
    id: '7',
    title: 'Longest Substring Without Repeating',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 250,
    description: `Find the longest substring without repeating characters.

Given a string, find the length of the longest substring without repeating characters.

Examples:
- Input: "abcabcbb" → Output: 3 (substring "abc")
- Input: "bbbbb" → Output: 1 (substring "b")
- Input: "pwwkew" → Output: 3 (substring "wke")

Approach:
- Use sliding window with two pointers
- Use hash set/map to track characters in current window
- Expand window when no duplicates, shrink when duplicates found

Complexity: O(n) time, O(min(m,n)) space where m is charset size`,
    tags: ['string', 'sliding-window', 'hash-table']
  },
  {
    id: '8',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 130,
    description: `Merge two sorted arrays into one sorted array efficiently.

Given two sorted arrays, merge them into the first array in sorted order.

Examples:
- Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3 → Output: [1,2,2,3,5,6]
- Input: nums1 = [1], m = 1, nums2 = [], n = 0 → Output: [1]
- Input: nums1 = [0], m = 0, nums2 = [1], n = 1 → Output: [0,1]

Approach:
- Use three pointers: one for result, two for input arrays
- Compare elements from both arrays and place smaller one
- Work backwards to avoid overwriting elements in nums1

Complexity: O(m+n) time, O(1) space`,
    tags: ['array', 'sorting', 'merge']
  },
  {
    id: '9',
    title: 'Kth Largest Element',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 250,
    description: `Find the Kth largest element in an unsorted array.

Given an unsorted array, find the kth largest element without sorting the entire array.

Examples:
- Input: nums = [3,2,1,5,6,4], k = 2 → Output: 5 (2nd largest)
- Input: nums = [3,2,3,1,2,4,5,5,6], k = 4 → Output: 4 (4th largest)
- Input: nums = [1], k = 1 → Output: 1 (1st largest)

Approach:
- Use min heap: keep only k largest elements
- Use quickselect: partition around pivot
- Use sorting: sort and return kth element

Complexity: O(n log k) for heap, O(n) average for quickselect`,
    tags: ['array', 'heap', 'quickselect']
  },
  {
    id: '10',
    title: 'Queue Using Stacks',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Implement a queue using stacks (FIFO using LIFO).

Design a queue that supports push, pop, peek, and empty operations using only stacks.

Examples:
- push(1), push(2), push(3), pop() → returns 1, queue becomes [2,3]
- push(1), push(2), peek() → returns 1, queue remains [1,2]
- empty() → returns false if queue has elements

Approach:
- Use two stacks: one for push operations, one for pop operations
- When popping, transfer all elements from push stack to pop stack
- This reverses the order, making LIFO behave like FIFO

Complexity: O(1) amortized for all operations`,
    tags: ['stack', 'queue', 'design']
  },
  {
    id: '11',
    title: 'Binary Tree Traversals',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 180,
    description: `Implement inorder, preorder, and postorder traversals of a binary tree.

Given a binary tree, implement three different traversal methods to visit all nodes.

Examples:
- Input: [1,null,2,3] → Output: inorder: [1,3,2], preorder: [1,2,3], postorder: [3,2,1]
- Input: [] → Output: inorder: [], preorder: [], postorder: []
- Input: [1] → Output: inorder: [1], preorder: [1], postorder: [1]

Approach:
- Inorder: Left → Root → Right (gives sorted order for BST)
- Preorder: Root → Left → Right (useful for tree serialization)
- Postorder: Left → Right → Root (useful for tree deletion)

Complexity: O(n) time, O(n) space (recursive stack)`,
    tags: ['tree', 'traversal', 'recursion']
  },
  {
    id: '12',
    title: 'QuickSort Implementation',
    difficulty: 'medium' as const,
    category: 'Sorting',
    points: 220,
    description: `Implement QuickSort algorithm with partition function.

Given an array, sort it using the QuickSort algorithm with divide-and-conquer approach.

Examples:
- Input: [64,34,25,12,22,11,90] → Output: [11,12,22,25,34,64,90]
- Input: [1] → Output: [1]
- Input: [5,4,3,2,1] → Output: [1,2,3,4,5]

Approach:
- Choose a pivot element (usually last element)
- Partition array around pivot (smaller elements left, larger right)
- Recursively sort left and right partitions
- Combine results

Complexity: O(n log n) average, O(n²) worst case, O(log n) space`,
    tags: ['sorting', 'quicksort', 'divide-conquer']
  },
  {
    id: '13',
    title: 'MergeSort Implementation',
    difficulty: 'medium' as const,
    category: 'Sorting',
    points: 200,
    description: `Implement MergeSort algorithm with merge function.

Given an array, sort it using the MergeSort algorithm with divide-and-conquer approach.

Examples:
- Input: [38,27,43,3,9,82,10] → Output: [3,9,10,27,38,43,82]
- Input: [1] → Output: [1]
- Input: [5,4,3,2,1] → Output: [1,2,3,4,5]

Approach:
- Divide array into two halves recursively
- Sort each half using merge sort
- Merge sorted halves using merge function
- Continue until array is sorted

Complexity: O(n log n) time, O(n) space`,
    tags: ['sorting', 'mergesort', 'divide-conquer']
  },
  {
    id: '14',
    title: 'Detect Cycle in Directed Graph',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 280,
    description: `Detect cycle in a directed graph using DFS or Kahn's Algorithm.

Given a directed graph with n nodes and edges, determine if it contains a cycle.

Examples:
- Input: n = 4, edges = [[0,1],[1,2],[2,3],[3,0]] → Output: true (cycle exists)
- Input: n = 3, edges = [[0,1],[1,2]] → Output: false (no cycle)
- Input: n = 2, edges = [[0,1],[1,0]] → Output: true (self cycle)

Approach:
- DFS with visited and recursion stack: track nodes in current path
- Kahn's Algorithm: count in-degrees, remove nodes with 0 in-degree
- If all nodes processed, no cycle; otherwise cycle exists

Complexity: O(V + E) time, O(V) space`,
    tags: ['graph', 'dfs', 'topological-sort']
  },
  {
    id: '15',
    title: 'Number of Islands',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: `Count the number of islands using BFS/DFS/Union-Find.

Given a 2D grid of '1's (land) and '0's (water), count the number of islands.

Examples:
- Input: [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]] → Output: 1
- Input: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] → Output: 3
- Input: [["0","0","0","0","0"],["0","0","0","0","0"]] → Output: 0

Approach:
- DFS/BFS: mark visited cells, explore connected land cells
- Union-Find: connect adjacent land cells, count connected components
- Mark visited cells to avoid counting same island multiple times

Complexity: O(m×n) time, O(m×n) space`,
    tags: ['graph', 'dfs', 'bfs', 'union-find']
  },
  {
    id: '16',
    title: 'BFS Shortest Path',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 220,
    description: `Find shortest path using BFS in an unweighted graph.

Given a graph with n nodes and edges, find the shortest path from start to end node.

Examples:
- Input: n = 4, edges = [[0,1],[1,2],[2,3]], start = 0, end = 3 → Output: 3
- Input: n = 3, edges = [[0,1],[1,2]], start = 0, end = 2 → Output: 2
- Input: n = 2, edges = [[0,1]], start = 0, end = 1 → Output: 1

Approach:
- Use BFS to explore nodes level by level
- Keep track of distance from start node
- Return distance when end node is reached
- Return -1 if end node is unreachable

Complexity: O(V + E) time, O(V) space`,
    tags: ['graph', 'bfs', 'shortest-path']
  },
  {
    id: '17',
    title: 'Topological Sort',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 240,
    description: `Implement topological sort for a directed acyclic graph.

Given a DAG with n nodes and edges, return a topological ordering of nodes.

Examples:
- Input: n = 4, edges = [[1,0],[2,0],[3,1],[3,2]] → Output: [0,1,2,3] or [0,2,1,3]
- Input: n = 2, edges = [[0,1]] → Output: [1,0]
- Input: n = 3, edges = [] → Output: [0,1,2] (any order)

Approach:
- Kahn's Algorithm: count in-degrees, process nodes with 0 in-degree
- DFS with recursion stack: process nodes in reverse topological order
- Return empty array if cycle detected (not a DAG)

Complexity: O(V + E) time, O(V) space`,
    tags: ['graph', 'topological-sort', 'dfs']
  },
  {
    id: '18',
    title: 'Edit Distance',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: `Calculate the minimum edit distance between two strings.

Given two strings, find the minimum number of operations (insert, delete, replace) to convert one to another.

Examples:
- Input: word1 = "horse", word2 = "ros" → Output: 3 (horse → rorse → rose → ros)
- Input: word1 = "intention", word2 = "execution" → Output: 5
- Input: word1 = "", word2 = "" → Output: 0

Approach:
- Use dynamic programming with 2D table
- dp[i][j] = min operations to convert word1[0:i] to word2[0:j]
- Consider insert, delete, and replace operations
- Fill table bottom-up or use recursion with memoization

Complexity: O(m×n) time, O(m×n) space`,
    tags: ['dp', 'string', 'edit-distance']
  },
  {
    id: '19',
    title: 'Palindromic Substrings',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 220,
    description: `Find all palindromic substrings in a string.

Given a string, count the number of palindromic substrings (single characters count as palindromes).

Examples:
- Input: "abc" → Output: 3 (a, b, c)
- Input: "aaa" → Output: 6 (a, a, a, aa, aa, aaa)
- Input: "aba" → Output: 4 (a, b, a, aba)

Approach:
- Expand around center: check each character and pair as center
- For each center, expand left and right while characters match
- Count all valid palindromes found
- Handle odd-length (single char center) and even-length (pair center)

Complexity: O(n²) time, O(1) space`,
    tags: ['string', 'palindrome', 'dp']
  },
  {
    id: '20',
    title: 'Longest Consecutive Sequence',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 300,
    description: `Find the longest consecutive sequence in an unsorted array.

Given an unsorted array, find the length of the longest consecutive elements sequence.

Examples:
- Input: [100,4,200,1,3,2] → Output: 4 (sequence [1,2,3,4])
- Input: [0,3,7,2,5,8,4,6,0,1] → Output: 9 (sequence [0,1,2,3,4,5,6,7,8])
- Input: [1] → Output: 1 (sequence [1])

Approach:
- Use HashSet for O(1) lookup
- For each number, check if it's start of sequence (no num-1 exists)
- If start, count consecutive numbers forward
- Track maximum sequence length found

Complexity: O(n) time, O(n) space`,
    tags: ['array', 'hash-set', 'sequence']
  },
  {
    id: '21',
    title: 'Merge Two Sorted Linked Lists',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 160,
    description: `Merge two sorted linked lists into one sorted list.

Given two sorted linked lists, merge them into a single sorted linked list.

Examples:
- Input: list1 = [1,2,4], list2 = [1,3,4] → Output: [1,1,2,3,4,4]
- Input: list1 = [], list2 = [] → Output: []
- Input: list1 = [], list2 = [0] → Output: [0]

Approach:
- Use two pointers to traverse both lists
- Compare values at current positions
- Link smaller value to result list
- Advance pointer in list with smaller value
- Handle remaining nodes in either list

Complexity: O(n + m) time, O(1) space`,
    tags: ['linked-list', 'merge', 'sorting']
  },
  {
    id: '22',
    title: 'Intersection of Two Linked Lists',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Find the intersection point of two linked lists.

Given two linked lists, find the node at which they intersect (if any).

Examples:
- Input: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3 → Output: 8
- Input: listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1 → Output: 2
- Input: listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2 → Output: null

Approach:
- Two pointers: traverse both lists to find lengths
- Calculate length difference and advance longer list
- Move both pointers together until they meet
- Alternative: use hash set to track visited nodes

Complexity: O(n + m) time, O(1) space`,
    tags: ['linked-list', 'two-pointers', 'intersection']
  },
  {
    id: '23',
    title: 'Remove Nth Node From End',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: `Remove the N-th node from the end of a linked list.

Given a linked list, remove the nth node from the end and return the head.

Examples:
- Input: head = [1,2,3,4,5], n = 2 → Output: [1,2,3,5]
- Input: head = [1], n = 1 → Output: []
- Input: head = [1,2], n = 1 → Output: [1]

Approach:
- Use two pointers: fast and slow
- Move fast pointer n steps ahead
- Move both pointers until fast reaches end
- Remove node after slow pointer
- Handle edge case: removing head node

Complexity: O(n) time, O(1) space`,
    tags: ['linked-list', 'two-pointers', 'removal']
  },
  {
    id: '24',
    title: 'Copy List with Random Pointer',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: `Copy a linked list with random pointer.

Given a linked list where each node has a random pointer, create a deep copy.

Examples:
- Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]] → Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
- Input: head = [[1,1],[2,1]] → Output: [[1,1],[2,1]]
- Input: head = [[3,null],[3,0],[3,null]] → Output: [[3,null],[3,0],[3,null]]

Approach:
- Three-pass algorithm: create copy nodes, link random pointers, separate lists
- Hash map approach: map original nodes to copy nodes
- Handle null random pointers and self-references

Complexity: O(n) time, O(n) space`,
    tags: ['linked-list', 'hash-map', 'copy']
  },
  {
    id: '25',
    title: 'Level Order Traversal',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 200,
    description: `Perform level order traversal of a binary tree.

Given a binary tree, return the level order traversal of its nodes' values.

Examples:
- Input: [3,9,20,null,null,15,7] → Output: [[3],[9,20],[15,7]]
- Input: [1] → Output: [[1]]
- Input: [] → Output: []

Approach:
- Use BFS with queue to process nodes level by level
- Track level size to separate levels in result
- Add children to queue for next level
- Continue until queue is empty

Complexity: O(n) time, O(n) space`,
    tags: ['tree', 'bfs', 'level-order']
  },
  {
    id: '26',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 220,
    description: `Find the lowest common ancestor of two nodes in a binary tree.

Given a binary tree and two nodes, find their lowest common ancestor (LCA).

Examples:
- Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1 → Output: 3
- Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4 → Output: 5
- Input: root = [1,2], p = 1, q = 2 → Output: 1

Approach:
- Recursive approach: if current node is p or q, return it
- If p and q are in different subtrees, current node is LCA
- If both in same subtree, recurse on that subtree
- Handle case where one node is ancestor of other

Complexity: O(n) time, O(h) space (height of tree)`,
    tags: ['tree', 'lca', 'recursion']
  },
  {
    id: '27',
    title: 'Diameter of Binary Tree',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 240,
    description: `Find the diameter of a binary tree.

Given a binary tree, find the length of the diameter (longest path between any two nodes).

Examples:
- Input: [1,2,3,4,5] → Output: 3 (path [4,2,1,3] or [5,2,1,3])
- Input: [1,2] → Output: 1 (path [2,1])
- Input: [1] → Output: 0 (no path)

Approach:
- Diameter = max path length through root or in subtrees
- For each node, calculate height of left and right subtrees
- Update diameter if path through current node is longer
- Return maximum diameter found

Complexity: O(n) time, O(h) space (height of tree)`,
    tags: ['tree', 'diameter', 'dfs']
  },
  {
    id: '28',
    title: 'Symmetric Tree',
    difficulty: 'easy' as const,
    category: 'Trees',
    points: 150,
    description: `Check if a binary tree is symmetric.

Given a binary tree, check whether it is a mirror of itself (symmetric around its center).

Examples:
- Input: [1,2,2,3,4,4,3] → Output: true (symmetric)
- Input: [1,2,2,null,3,null,3] → Output: false (not symmetric)
- Input: [1] → Output: true (single node is symmetric)

Approach:
- Recursive: check if left subtree mirrors right subtree
- Compare left.left with right.right and left.right with right.left
- Handle null nodes (null mirrors null)
- Iterative: use queue to compare nodes level by level

Complexity: O(n) time, O(h) space (height of tree)`,
    tags: ['tree', 'symmetric', 'recursion']
  },
  {
    id: '29',
    title: 'Balanced Binary Tree',
    difficulty: 'medium' as const,
    category: 'Trees',
    points: 200,
    description: `Check if a binary tree is balanced.

Given a binary tree, determine if it is height-balanced (left and right subtrees differ by at most 1).

Examples:
- Input: [3,9,20,null,null,15,7] → Output: true (balanced)
- Input: [1,2,2,3,3,null,null,4,4] → Output: false (unbalanced)
- Input: [] → Output: true (empty tree is balanced)

Approach:
- Calculate height of left and right subtrees
- Check if difference is ≤ 1
- Recursively check if both subtrees are balanced
- Return false if any subtree is unbalanced

Complexity: O(n) time, O(h) space (height of tree)`,
    tags: ['tree', 'balanced', 'dfs']
  },
  {
    id: '30',
    title: 'BST to Doubly Linked List',
    difficulty: 'hard' as const,
    category: 'Trees',
    points: 300,
    description: `Convert a BST to a sorted doubly linked list.

Given a BST, convert it to a sorted circular doubly linked list in-place.

Examples:
- Input: [4,2,5,1,3] → Output: [1,2,3,4,5] (doubly linked)
- Input: [2,1,3] → Output: [1,2,3] (doubly linked)
- Input: [] → Output: [] (empty)

Approach:
- Inorder traversal to visit nodes in sorted order
- Maintain previous node to link current node
- Update left/right pointers to create doubly linked list
- Connect first and last nodes for circular list

Complexity: O(n) time, O(h) space (height of tree)`,
    tags: ['tree', 'bst', 'doubly-linked-list']
  },
  {
    id: '31',
    title: 'Binary Search in Rotated Array',
    difficulty: 'medium' as const,
    category: 'Search',
    points: 250,
    description: `Implement binary search on a rotated sorted array.

Given a sorted array that has been rotated at some pivot point, find a target element.

Examples:
- Input: nums = [4,5,6,7,0,1,2], target = 0 → Output: 4 (found at index 4)
- Input: nums = [4,5,6,7,0,1,2], target = 3 → Output: -1 (not found)
- Input: nums = [1], target = 0 → Output: -1 (not found)

Approach:
- Find the pivot point where array is rotated
- Determine which half contains the target
- Apply binary search on the appropriate half
- Handle edge cases: single element, no rotation

Complexity: O(log n) time, O(1) space`,
    tags: ['binary-search', 'rotated-array', 'search']
  },
  {
    id: '32',
    title: 'Find Duplicate Number',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 220,
    description: `Find the duplicate number in an array without modifying the array.

Given an array of n+1 integers where each integer is between 1 and n, find the duplicate number.

Examples:
- Input: [1,3,4,2,2] → Output: 2 (duplicate number)
- Input: [3,1,3,4,2] → Output: 3 (duplicate number)
- Input: [1,1] → Output: 1 (duplicate number)

Approach:
- Floyd's Tortoise and Hare: treat array as linked list
- Use two pointers moving at different speeds
- When they meet, reset one pointer and move both at same speed
- Meeting point is the duplicate

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'duplicate', 'two-pointers']
  },
  {
    id: '33',
    title: 'Rotate Array by K Steps',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 200,
    description: `Rotate an array by k steps (cyclic rotation).

Given an array, rotate it to the right by k steps, where k is non-negative.

Examples:
- Input: nums = [1,2,3,4,5,6,7], k = 3 → Output: [5,6,7,1,2,3,4]
- Input: nums = [-1,-100,3,99], k = 2 → Output: [3,99,-1,-100]
- Input: nums = [1,2,3], k = 4 → Output: [3,1,2] (k % n = 1)

Approach:
- Reverse entire array, then reverse first k and last n-k elements
- Handle case where k > array length using modulo
- Alternative: use extra array or cyclic replacement

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'rotation', 'cyclic']
  },
  {
    id: '34',
    title: 'Set Matrix Zeroes',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 200,
    description: `Set matrix zeroes in-place when an element is zero.

Given an m×n matrix, if an element is 0, set its entire row and column to 0.

Examples:
- Input: [[1,1,1],[1,0,1],[1,1,1]] → Output: [[1,0,1],[0,0,0],[1,0,1]]
- Input: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] → Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
- Input: [[1,0]] → Output: [[0,0]]

Approach:
- Use first row and column as markers for zero rows/columns
- Handle first row/column separately to avoid overwriting markers
- Set zeros based on markers

Complexity: O(m×n) time, O(1) space`,
    tags: ['matrix', 'in-place', 'zero']
  },
  {
    id: '35',
    title: 'Top K Frequent Elements',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 220,
    description: `Find the top K frequent elements in an array.

Given an integer array and an integer k, return the k most frequent elements.

Examples:
- Input: nums = [1,1,1,2,2,3], k = 2 → Output: [1,2] (1 appears 3 times, 2 appears 2 times)
- Input: nums = [1], k = 1 → Output: [1]
- Input: nums = [1,2], k = 2 → Output: [1,2] (both appear once)

Approach:
- Count frequency of each element using hash map
- Use min heap to keep top k frequent elements
- Alternative: use bucket sort for O(n) time

Complexity: O(n log k) time, O(n) space`,
    tags: ['array', 'heap', 'frequency']
  },
  {
    id: '36',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 240,
    description: `Find the number of subarrays that sum to K.

Given an array of integers and an integer k, find the total number of continuous subarrays whose sum equals k.

Examples:
- Input: nums = [1,1,1], k = 2 → Output: 2 (subarrays [1,1] and [1,1])
- Input: nums = [1,2,3], k = 3 → Output: 2 (subarrays [1,2] and [3])
- Input: nums = [1], k = 1 → Output: 1 (subarray [1])

Approach:
- Use prefix sum with hash map
- Track cumulative sum and count occurrences
- If sum-k exists in map, add its count to result

Complexity: O(n) time, O(n) space`,
    tags: ['array', 'prefix-sum', 'hash-map']
  },
  {
    id: '37',
    title: 'Isomorphic Strings',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 140,
    description: `Check if two strings are isomorphic.

Two strings are isomorphic if characters in one string can be replaced to get the other string.

Examples:
- Input: s = "egg", t = "add" → Output: true (e→a, g→d)
- Input: s = "foo", t = "bar" → Output: false (f→b, o→a, o→r conflict)
- Input: s = "paper", t = "title" → Output: true (p→t, a→i, e→l, r→e)

Approach:
- Use two hash maps to track character mappings
- Check both directions: s→t and t→s
- Ensure one-to-one mapping (no conflicts)

Complexity: O(n) time, O(1) space (fixed charset)`,
    tags: ['string', 'isomorphic', 'mapping']
  },
  {
    id: '38',
    title: 'Two Sum',
    difficulty: 'easy' as const,
    category: 'Arrays',
    points: 100,
    description: `Find two numbers in an array that add up to a target.

Given an array of integers and a target sum, return indices of two numbers that add up to target.

Examples:
- Input: nums = [2,7,11,15], target = 9 → Output: [0,1] (2+7=9)
- Input: nums = [3,2,4], target = 6 → Output: [1,2] (2+4=6)
- Input: nums = [3,3], target = 6 → Output: [0,1] (3+3=6)

Approach:
- Use hash map to store complements
- For each number, check if target-number exists in map
- Return indices when complement is found

Complexity: O(n) time, O(n) space`,
    tags: ['array', 'hash-map', 'two-sum']
  },
  {
    id: '39',
    title: 'Add Two Numbers',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Add two numbers represented by linked lists.

Given two non-empty linked lists representing two non-negative integers, add them and return as linked list.

Examples:
- Input: l1 = [2,4,3], l2 = [5,6,4] → Output: [7,0,8] (342+465=807)
- Input: l1 = [0], l2 = [0] → Output: [0]
- Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9] → Output: [8,9,9,9,0,0,0,1]

Approach:
- Traverse both lists simultaneously
- Add corresponding digits and carry
- Create new node for each sum digit
- Handle different list lengths

Complexity: O(max(m,n)) time, O(max(m,n)) space`,
    tags: ['linked-list', 'addition', 'carry']
  },
  {
    id: '40',
    title: 'Container With Most Water',
    difficulty: 'medium' as const,
    category: 'Arrays',
    points: 250,
    description: `Find two lines that together with the x-axis forms a container that would hold the maximum amount of water.

Given n non-negative integers representing height of bars, find maximum area container.

Examples:
- Input: height = [1,8,6,2,5,4,8,3,7] → Output: 49 (between bars 1 and 8)
- Input: height = [1,1] → Output: 1
- Input: height = [4,3,2,1,4] → Output: 16 (between bars 0 and 4)

Approach:
- Use two pointers from both ends
- Calculate area: min(height[left], height[right]) * (right-left)
- Move pointer with smaller height inward
- Track maximum area found

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'two-pointers', 'area']
  },
  // Additional Algorithm Questions (41-100)
  {
    id: '41',
    title: 'Dijkstra\'s Algorithm',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 300,
    description: `Implement Dijkstra's shortest path algorithm.

Given a weighted graph with n nodes and edges, find the shortest path from a source node to all other nodes.

Examples:
- Input: n = 4, edges = [[0,1,1],[0,2,4],[1,2,2],[1,3,5],[2,3,1]], source = 0 → Output: [0,1,3,4]
- Input: n = 3, edges = [[0,1,2],[1,2,3]], source = 0 → Output: [0,2,5]
- Input: n = 2, edges = [[0,1,1]], source = 0 → Output: [0,1]

Approach:
- Use priority queue (min heap) to always process closest unvisited node
- Maintain distance array to track shortest distances
- Update distances when shorter path found through current node
- Continue until all nodes processed

Complexity: O((V + E) log V) time, O(V) space`,
    tags: ['graph', 'dijkstra', 'shortest-path']
  },
  {
    id: '42',
    title: 'Floyd-Warshall Algorithm',
    difficulty: 'hard' as const,
    category: 'Graphs',
    points: 320,
    description: `Implement Floyd-Warshall algorithm for all-pairs shortest paths.

Given a weighted graph, find shortest paths between all pairs of vertices.

Examples:
- Input: n = 4, edges = [[0,1,1],[1,2,2],[2,3,3],[0,3,10]] → Output: [[0,1,3,6],[∞,0,2,5],[∞,∞,0,3],[∞,∞,∞,0]]
- Input: n = 3, edges = [[0,1,2],[1,2,3]] → Output: [[0,2,5],[∞,0,3],[∞,∞,0]]
- Input: n = 2, edges = [[0,1,1]] → Output: [[0,1],[∞,0]]

Approach:
- Use 3D dynamic programming: dp[k][i][j] = shortest path from i to j using vertices 0 to k
- For each intermediate vertex k, update all pairs (i,j)
- Consider path through k: dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])

Complexity: O(V³) time, O(V²) space`,
    tags: ['graph', 'floyd-warshall', 'shortest-path']
  },
  {
    id: '43',
    title: 'Kruskal\'s Algorithm',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: `Implement Kruskal's algorithm for minimum spanning tree.

Given a weighted undirected graph, find the minimum spanning tree (MST).

Examples:
- Input: n = 4, edges = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]] → Output: [[0,1,1],[0,2,2],[1,3,4]] (weight = 7)
- Input: n = 3, edges = [[0,1,2],[1,2,3],[0,2,1]] → Output: [[0,2,1],[0,1,2]] (weight = 3)
- Input: n = 2, edges = [[0,1,1]] → Output: [[0,1,1]] (weight = 1)

Approach:
- Sort edges by weight in ascending order
- Use Union-Find to detect cycles
- Add edge if it doesn't create cycle
- Continue until n-1 edges added

Complexity: O(E log E) time, O(V) space`,
    tags: ['graph', 'kruskal', 'mst']
  },
  {
    id: '44',
    title: 'Prim\'s Algorithm',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 250,
    description: `Implement Prim's algorithm for minimum spanning tree.

Given a weighted undirected graph, find the minimum spanning tree (MST).

Examples:
- Input: n = 4, edges = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]] → Output: [[0,1,1],[0,2,2],[1,3,4]] (weight = 7)
- Input: n = 3, edges = [[0,1,2],[1,2,3],[0,2,1]] → Output: [[0,2,1],[0,1,2]] (weight = 3)
- Input: n = 2, edges = [[0,1,1]] → Output: [[0,1,1]] (weight = 1)

Approach:
- Start with any vertex, add to MST
- Use priority queue to find minimum weight edge to unvisited vertex
- Add edge and vertex to MST
- Continue until all vertices visited

Complexity: O(E log V) time, O(V) space`,
    tags: ['graph', 'prim', 'mst']
  },
  {
    id: '45',
    title: 'Knapsack Problem',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: `Solve the 0/1 knapsack problem using dynamic programming.

Given weights and values of items, find maximum value that can be obtained with weight limit.

Examples:
- Input: weights = [1,3,4,5], values = [1,4,5,7], capacity = 7 → Output: 9 (items 1,3,4)
- Input: weights = [2,3,4,5], values = [3,4,5,6], capacity = 5 → Output: 7 (items 2,3)
- Input: weights = [1,2,3], values = [10,15,40], capacity = 6 → Output: 65 (items 1,2,3)

Approach:
- Use 2D DP: dp[i][w] = max value using first i items with weight limit w
- For each item, either include it or exclude it
- dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])

Complexity: O(n×W) time, O(n×W) space`,
    tags: ['dp', 'knapsack', 'optimization']
  },
  {
    id: '46',
    title: 'Longest Common Subsequence',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 250,
    description: `Find the longest common subsequence of two strings.

Given two strings, find the length of their longest common subsequence.

Examples:
- Input: text1 = "abcde", text2 = "ace" → Output: 3 (LCS: "ace")
- Input: text1 = "abc", text2 = "abc" → Output: 3 (LCS: "abc")
- Input: text1 = "abc", text2 = "def" → Output: 0 (no common subsequence)

Approach:
- Use 2D DP: dp[i][j] = LCS length of text1[0:i] and text2[0:j]
- If characters match: dp[i][j] = dp[i-1][j-1] + 1
- If characters don't match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

Complexity: O(m×n) time, O(m×n) space`,
    tags: ['dp', 'string', 'lcs']
  },
  {
    id: '47',
    title: 'Coin Change Problem',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 220,
    description: `Find the minimum number of coins needed to make a given amount.

Given coins of different denominations and a total amount, find minimum coins needed.

Examples:
- Input: coins = [1,2,5], amount = 11 → Output: 3 (5+5+1)
- Input: coins = [2], amount = 3 → Output: -1 (impossible)
- Input: coins = [1], amount = 0 → Output: 0 (no coins needed)

Approach:
- Use 1D DP: dp[i] = minimum coins needed for amount i
- For each coin, try using it: dp[i] = min(dp[i], dp[i-coin] + 1)
- Initialize dp[0] = 0, others to infinity

Complexity: O(amount×coins) time, O(amount) space`,
    tags: ['dp', 'coins', 'optimization']
  },
  {
    id: '48',
    title: 'Climbing Stairs',
    difficulty: 'easy' as const,
    category: 'Dynamic Programming',
    points: 120,
    description: `Find the number of ways to climb n stairs.

You can climb 1 or 2 steps at a time. Find total ways to reach the top.

Examples:
- Input: n = 2 → Output: 2 (ways: 1+1, 2)
- Input: n = 3 → Output: 3 (ways: 1+1+1, 1+2, 2+1)
- Input: n = 4 → Output: 5 (ways: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)

Approach:
- Use DP: dp[i] = ways to climb i stairs
- dp[i] = dp[i-1] + dp[i-2] (Fibonacci sequence)
- Base cases: dp[0] = 1, dp[1] = 1

Complexity: O(n) time, O(1) space`,
    tags: ['dp', 'stairs', 'fibonacci']
  },
  {
    id: '49',
    title: 'House Robber',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 200,
    description: `Find the maximum amount of money you can rob from houses.

You cannot rob adjacent houses. Find maximum money possible.

Examples:
- Input: nums = [1,2,3,1] → Output: 4 (rob houses 1 and 3)
- Input: nums = [2,7,9,3,1] → Output: 12 (rob houses 1, 3, 5)
- Input: nums = [2,1,1,2] → Output: 4 (rob houses 1 and 4)

Approach:
- Use DP: dp[i] = max money from first i houses
- dp[i] = max(dp[i-1], dp[i-2] + nums[i])
- Choose between robbing current house or skipping it

Complexity: O(n) time, O(1) space`,
    tags: ['dp', 'robbery', 'optimization']
  },
  {
    id: '50',
    title: 'Word Break',
    difficulty: 'medium' as const,
    category: 'Dynamic Programming',
    points: 220,
    description: `Determine if a string can be segmented into dictionary words.

Given a string and dictionary, check if string can be broken into valid words.

Examples:
- Input: s = "leetcode", wordDict = ["leet","code"] → Output: true ("leet" + "code")
- Input: s = "applepenapple", wordDict = ["apple","pen"] → Output: true ("apple" + "pen" + "apple")
- Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"] → Output: false

Approach:
- Use DP: dp[i] = can segment string[0:i]
- For each position, try all possible word endings
- dp[i] = true if dp[j] and wordDict contains s[j:i]

Complexity: O(n³) time, O(n) space`,
    tags: ['dp', 'string', 'word-break']
  },
  {
    id: '51',
    title: 'Regular Expression Matching',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 300,
    description: `Implement regular expression matching with support for '.' and '*'.

Given a string and pattern, check if string matches the pattern.

Examples:
- Input: s = "aa", p = "a" → Output: false (no match)
- Input: s = "aa", p = "a*" → Output: true (a repeated 0 or more times)
- Input: s = "ab", p = ".*" → Output: true (any character repeated 0 or more times)

Approach:
- Use 2D DP: dp[i][j] = does s[0:i] match p[0:j]
- Handle '.' (matches any single character)
- Handle '*' (matches 0 or more of preceding character)
- Consider empty string cases

Complexity: O(m×n) time, O(m×n) space`,
    tags: ['dp', 'regex', 'string']
  },
  {
    id: '52',
    title: 'Wildcard Matching',
    difficulty: 'hard' as const,
    category: 'Dynamic Programming',
    points: 280,
    description: `Implement wildcard pattern matching with support for '?' and '*'.

Given a string and pattern, check if string matches the wildcard pattern.

Examples:
- Input: s = "aa", p = "a" → Output: false (no match)
- Input: s = "aa", p = "*" → Output: true (matches any sequence)
- Input: s = "cb", p = "?a" → Output: false (no match)

Approach:
- Use 2D DP: dp[i][j] = does s[0:i] match p[0:j]
- Handle '?' (matches any single character)
- Handle '*' (matches any sequence including empty)
- Consider empty string cases

Complexity: O(m×n) time, O(m×n) space`,
    tags: ['dp', 'wildcard', 'string']
  },
  {
    id: '53',
    title: 'Trapping Rain Water',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 300,
    description: `Calculate how much water can be trapped between bars.

Given elevation map, find total water that can be trapped.

Examples:
- Input: height = [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6
- Input: height = [4,2,0,3,2,5] → Output: 9
- Input: height = [2,0,2] → Output: 2

Approach:
- Use two pointers from both ends
- Track left and right maximum heights
- Water trapped = min(leftMax, rightMax) - current height
- Move pointer with smaller maximum

Complexity: O(n) time, O(1) space`,
    tags: ['array', 'two-pointers', 'water']
  },
  {
    id: '54',
    title: 'Sliding Window Maximum',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 280,
    description: `Find the maximum element in each sliding window of size k.

Given an array and window size k, return maximum for each window.

Examples:
- Input: nums = [1,3,-1,-3,5,3,6,7], k = 3 → Output: [3,3,5,5,6,7]
- Input: nums = [1], k = 1 → Output: [1]
- Input: nums = [1,-1], k = 1 → Output: [1,-1]

Approach:
- Use monotonic decreasing deque
- Remove elements smaller than current from back
- Remove elements outside window from front
- Front of deque is always maximum

Complexity: O(n) time, O(k) space`,
    tags: ['array', 'sliding-window', 'deque']
  },
  {
    id: '55',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard' as const,
    category: 'Arrays',
    points: 350,
    description: `Find the median of two sorted arrays.

Given two sorted arrays, find the median of the merged array.

Examples:
- Input: nums1 = [1,3], nums2 = [2] → Output: 2.0 (merged: [1,2,3])
- Input: nums1 = [1,2], nums2 = [3,4] → Output: 2.5 (merged: [1,2,3,4])
- Input: nums1 = [0,0], nums2 = [0,0] → Output: 0.0

Approach:
- Use binary search to find correct partition
- Ensure left partition has correct number of elements
- Check if partition is valid (all left elements ≤ right elements)
- Handle edge cases for empty arrays

Complexity: O(log(min(m,n))) time, O(1) space`,
    tags: ['array', 'median', 'binary-search']
  },
  {
    id: '56',
    title: 'Reverse Words in String',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 180,
    description: `Reverse the order of words in a string.

Given a string with words separated by spaces, reverse word order.

Examples:
- Input: s = "the sky is blue" → Output: "blue is sky the"
- Input: s = "  hello world  " → Output: "world hello"
- Input: s = "a good   example" → Output: "example good a"

Approach:
- Split string into words (handle multiple spaces)
- Reverse the word array
- Join words with single space
- Handle leading/trailing spaces

Complexity: O(n) time, O(n) space`,
    tags: ['string', 'reverse', 'words']
  },
  {
    id: '57',
    title: 'Valid Anagram',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 100,
    description: `Check if two strings are anagrams.

Two strings are anagrams if they contain same characters in different order.

Examples:
- Input: s = "anagram", t = "nagaram" → Output: true
- Input: s = "rat", t = "car" → Output: false
- Input: s = "", t = "" → Output: true

Approach:
- Use character frequency count
- Count characters in both strings
- Compare frequency arrays
- Alternative: sort both strings and compare

Complexity: O(n) time, O(1) space (fixed charset)`,
    tags: ['string', 'anagram', 'hash-map']
  },
  {
    id: '58',
    title: 'Group Anagrams',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 200,
    description: `Group strings that are anagrams of each other.

Given an array of strings, group anagrams together.

Examples:
- Input: strs = ["eat","tea","tan","ate","nat","bat"] → Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
- Input: strs = [""] → Output: [[""]]
- Input: strs = ["a"] → Output: [["a"]]

Approach:
- Use sorted string as key for hash map
- Group strings with same sorted key
- Alternative: use character count as key
- Return grouped strings

Complexity: O(n×k log k) time, O(n×k) space`,
    tags: ['string', 'anagram', 'grouping']
  },
  {
    id: '59',
    title: 'Valid Palindrome',
    difficulty: 'easy' as const,
    category: 'Strings',
    points: 120,
    description: `Check if a string is a valid palindrome.

A palindrome reads the same forward and backward (ignoring case and non-alphanumeric).

Examples:
- Input: s = "A man, a plan, a canal: Panama" → Output: true
- Input: s = "race a car" → Output: false
- Input: s = " " → Output: true

Approach:
- Use two pointers from both ends
- Skip non-alphanumeric characters
- Compare characters (case-insensitive)
- Continue until pointers meet

Complexity: O(n) time, O(1) space`,
    tags: ['string', 'palindrome', 'two-pointers']
  },
  {
    id: '60',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium' as const,
    category: 'Strings',
    points: 250,
    description: `Find the longest palindromic substring in a string.

Given a string, find the longest substring that is a palindrome.

Examples:
- Input: s = "babad" → Output: "bab" or "aba"
- Input: s = "cbbd" → Output: "bb"
- Input: s = "a" → Output: "a"

Approach:
- Expand around center for each character and pair
- Check odd-length (single char center) and even-length (pair center)
- Track longest palindrome found
- Return substring with maximum length

Complexity: O(n²) time, O(1) space`,
    tags: ['string', 'palindrome', 'dp']
  },
  {
    id: '61',
    title: 'Implement Trie',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Implement a Trie (prefix tree) data structure.

A Trie is a tree-like data structure used to store strings for efficient prefix-based operations.

Examples:
- insert("apple"), search("apple") → true, search("app") → false, startsWith("app") → true
- insert("app"), search("app") → true, startsWith("app") → true
- insert("apple"), search("banana") → false, startsWith("ban") → false

Approach:
- Each node contains a character and a map of child nodes
- Use boolean flag to mark end of words
- For search: traverse tree and check end flag
- For startsWith: traverse tree without checking end flag

Complexity: O(m) time for insert/search/startsWith, O(m) space where m is word length`,
    tags: ['trie', 'prefix-tree', 'data-structure']
  },
  {
    id: '62',
    title: 'Word Search',
    difficulty: 'medium' as const,
    category: 'Graphs',
    points: 240,
    description: `Find if a word exists in a 2D board of characters.

Given a 2D board and a word, find if the word exists in the board by connecting adjacent characters.

Examples:
- Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED" → Output: true
- Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE" → Output: true
- Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB" → Output: false

Approach:
- Use DFS with backtracking
- For each cell, try to match word starting from that position
- Mark visited cells and backtrack when path doesn't work
- Check all four directions (up, down, left, right)

Complexity: O(m×n×4^L) time, O(L) space where L is word length`,
    tags: ['graph', 'dfs', 'backtracking']
  },
  {
    id: '63',
    title: 'Sudoku Solver',
    difficulty: 'hard' as const,
    category: 'Backtracking',
    points: 300,
    description: `Solve a Sudoku puzzle using backtracking.

Given a 9×9 Sudoku board, fill in the empty cells with valid numbers.

Examples:
- Input: [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]] → Output: solved board
- Input: [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]] → Output: solved board

Approach:
- Use backtracking to try numbers 1-9 in each empty cell
- Check row, column, and 3×3 box constraints
- If current number doesn't work, backtrack and try next
- Continue until board is filled or no solution exists

Complexity: O(9^(n²)) time, O(n²) space`,
    tags: ['backtracking', 'sudoku', 'puzzle']
  },
  {
    id: '64',
    title: 'N-Queens',
    difficulty: 'hard' as const,
    category: 'Backtracking',
    points: 280,
    description: `Place N queens on an NxN chessboard so no two queens threaten each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Examples:
- Input: n = 4 → Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
- Input: n = 1 → Output: [["Q"]]
- Input: n = 2 → Output: [] (no solution)

Approach:
- Use backtracking to place queens row by row
- Check column, diagonal, and anti-diagonal conflicts
- Use arrays to track occupied columns and diagonals
- When queen placed in row n, add solution to result

Complexity: O(n!) time, O(n²) space`,
    tags: ['backtracking', 'n-queens', 'chess']
  },
  {
    id: '65',
    title: 'Permutations',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: `Generate all permutations of an array.

Given an array of distinct integers, return all possible permutations.

Examples:
- Input: nums = [1,2,3] → Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
- Input: nums = [0,1] → Output: [[0,1],[1,0]]
- Input: nums = [1] → Output: [[1]]

Approach:
- Use backtracking with swapping
- Fix one element at a time and permute the rest
- Swap elements to generate different permutations
- Use recursion to handle remaining elements

Complexity: O(n!) time, O(n) space`,
    tags: ['backtracking', 'permutations', 'recursion']
  },
  {
    id: '66',
    title: 'Combinations',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 180,
    description: `Generate all combinations of k numbers from 1 to n.

Given two integers n and k, return all possible combinations of k numbers chosen from 1 to n.

Examples:
- Input: n = 4, k = 2 → Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
- Input: n = 1, k = 1 → Output: [[1]]
- Input: n = 3, k = 3 → Output: [[1,2,3]]

Approach:
- Use backtracking to build combinations
- Start with smallest number and add larger numbers
- Use recursion to add remaining elements
- Stop when combination reaches size k

Complexity: O(C(n,k)) time, O(k) space`,
    tags: ['backtracking', 'combinations', 'recursion']
  },
  {
    id: '67',
    title: 'Subsets',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: `Generate all possible subsets of an array.

Given an array of distinct integers, return all possible subsets (power set).

Examples:
- Input: nums = [1,2,3] → Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
- Input: nums = [0] → Output: [[],[0]]
- Input: nums = [1,2] → Output: [[],[1],[2],[1,2]]

Approach:
- Use backtracking to include/exclude each element
- For each element, try including it and excluding it
- Build subsets incrementally
- Add current subset to result at each step

Complexity: O(2^n) time, O(n) space`,
    tags: ['backtracking', 'subsets', 'recursion']
  },
  {
    id: '68',
    title: 'Generate Parentheses',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 220,
    description: `Generate all valid combinations of n pairs of parentheses.

Given n pairs of parentheses, generate all valid combinations.

Examples:
- Input: n = 3 → Output: ["((()))","(()())","(())()","()(())","()()()"]
- Input: n = 1 → Output: ["()"]
- Input: n = 2 → Output: ["(())","()()"]

Approach:
- Use backtracking with open and close counts
- Add opening parenthesis if open < n
- Add closing parenthesis if close < open
- Track current string and counts
- Add to result when string length equals 2n

Complexity: O(4^n/√n) time, O(n) space`,
    tags: ['backtracking', 'parentheses', 'recursion']
  },
  {
    id: '69',
    title: 'Letter Combinations of Phone Number',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 200,
    description: `Generate all possible letter combinations from a phone number.

Given a string containing digits from 2-9, return all possible letter combinations.

Examples:
- Input: digits = "23" → Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
- Input: digits = "" → Output: []
- Input: digits = "2" → Output: ["a","b","c"]

Approach:
- Use backtracking to build combinations
- Map each digit to its corresponding letters
- For each digit, try all possible letters
- Build combinations incrementally
- Add complete combinations to result

Complexity: O(4^n) time, O(n) space`,
    tags: ['backtracking', 'phone', 'combinations']
  },
  {
    id: '70',
    title: 'Combination Sum',
    difficulty: 'medium' as const,
    category: 'Backtracking',
    points: 220,
    description: `Find all combinations of numbers that sum to a target.

Given an array of distinct integers and a target, return all combinations that sum to target.

Examples:
- Input: candidates = [2,3,6,7], target = 7 → Output: [[2,2,3],[7]]
- Input: candidates = [2,3,5], target = 8 → Output: [[2,2,2,2],[2,3,3],[3,5]]
- Input: candidates = [2], target = 1 → Output: []

Approach:
- Use backtracking with sorting
- Try each candidate and recurse with reduced target
- Skip duplicates to avoid redundant combinations
- Add combination to result when target becomes 0
- Backtrack by removing last added element

Complexity: O(2^n) time, O(n) space`,
    tags: ['backtracking', 'combination-sum', 'recursion']
  },
  {
    id: '71',
    title: 'LRU Cache',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: `Design and implement an LRU (Least Recently Used) cache.

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Examples:
- Input: ["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]] → Output: [null,null,null,1,null,-1,null,-1,3,4]
- Input: ["LRUCache","put","get","put","get","get"], [[1],[1,1],[1],[2,2],[1],[2]] → Output: [null,null,1,null,-1,2]
- Input: ["LRUCache","put","put","get","get","put","get"], [[2],[1,1],[2,2],[1],[2],[3,3],[1]] → Output: [null,null,1,2,null,-1]

Approach:
- Use hash map for O(1) key-value access
- Use doubly linked list to track access order
- Move accessed elements to front (most recently used)
- Remove from back when capacity exceeded
- Update hash map when moving elements

Complexity: O(1) time for all operations, O(capacity) space`,
    tags: ['cache', 'lru', 'hash-map', 'doubly-linked-list']
  },
  {
    id: '72',
    title: 'LFU Cache',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 300,
    description: `Design and implement an LFU (Least Frequently Used) cache.

Design a data structure that follows the constraints of a Least Frequently Used (LFU) cache.

Examples:
- Input: ["LFUCache","put","put","get","put","get","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]] → Output: [null,null,null,1,null,-1,3,null,-1,3,4]
- Input: ["LFUCache","put","put","get","put","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[3]] → Output: [null,null,null,1,null,-1,3]
- Input: ["LFUCache","put","get"], [[0],[1,1],[1]] → Output: [null,-1]

Approach:
- Use hash map for key-value and frequency tracking
- Use frequency map to group elements by frequency
- Use doubly linked list for each frequency level
- Remove least frequently used element when capacity exceeded
- Update frequency when element accessed

Complexity: O(1) time for all operations, O(capacity) space`,
    tags: ['cache', 'lfu', 'hash-map', 'frequency']
  },
  {
    id: '73',
    title: 'All O(1) Data Structure',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 320,
    description: `Design a data structure that supports all operations in O(1) time.

Implement a data structure to store strings' count with the following methods: inc, dec, getMaxKey, getMinKey.

Examples:
- Input: ["AllOne","inc","inc","getMaxKey","getMinKey","inc","getMaxKey","getMinKey"], [[],["hello"],["hello"],[""],[""],["leet"],[""],[""]] → Output: [null,null,null,"hello","hello",null,"hello","leet"]
- Input: ["AllOne","inc","inc","inc","inc","inc","dec","dec","getMaxKey","getMinKey"], [[],["a"],["b"],["b"],["b"],["b"],["b"],["b"],[""],[""]] → Output: [null,null,null,null,null,null,null,null,"b","a"]

Approach:
- Use hash map for key-count mapping
- Use doubly linked list with frequency buckets
- Each bucket contains keys with same frequency
- Move keys between buckets when frequency changes
- Track min and max frequency buckets

Complexity: O(1) time for all operations, O(n) space`,
    tags: ['data-structure', 'o1', 'hash-map', 'doubly-linked-list']
  },
  {
    id: '74',
    title: 'Min Stack',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element.

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Examples:
- Input: ["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]] → Output: [null,null,null,null,-3,null,0,-2]
- Input: ["MinStack","push","push","push","getMin","pop","getMin"], [[],[1],[2],[3],[],[],[]] → Output: [null,null,null,null,1,null,1]
- Input: ["MinStack","push","getMin","top"], [[],[1],[],[]] → Output: [null,null,1,1]

Approach:
- Use two stacks: one for values, one for minimums
- For each push, also push current minimum to min stack
- For each pop, also pop from min stack
- Top of min stack always contains current minimum
- Handle empty stack cases

Complexity: O(1) time for all operations, O(n) space`,
    tags: ['stack', 'min', 'data-structure']
  },
  {
    id: '75',
    title: 'Max Stack',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: `Design a max stack that supports push, pop, top, peekMax, and popMax.

Design a max stack data structure that supports stack operations and retrieving the maximum element.

Examples:
- Input: ["MaxStack","push","push","push","top","popMax","top","peekMax","pop","top"], [[],[5],[1],[5],[],[],[],[],[],[]] → Output: [null,null,null,null,5,5,1,5,1,5]
- Input: ["MaxStack","push","push","push","peekMax","popMax","top"], [[],[1],[2],[3],[],[],[]] → Output: [null,null,null,null,3,3,2]
- Input: ["MaxStack","push","popMax","top"], [[],[1],[],[]] → Output: [null,null,1,-1]

Approach:
- Use two stacks: one for values, one for maximums
- For push: push value and current maximum
- For popMax: pop from both stacks until max found
- For peekMax: return top of max stack
- Handle empty stack cases

Complexity: O(n) time for popMax, O(1) for others, O(n) space`,
    tags: ['stack', 'max', 'data-structure']
  },
  {
    id: '76',
    title: 'Implement Stack using Queues',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Implement a stack using queues (LIFO using FIFO).

Implement a last-in-first-out (LIFO) stack using only two queues.

Examples:
- Input: ["MyStack","push","push","top","pop","empty"], [[],[1],[2],[],[],[]] → Output: [null,null,null,2,2,false]
- Input: ["MyStack","push","pop","empty"], [[],[1],[],[]] → Output: [null,null,1,true]
- Input: ["MyStack","push","push","push","top","pop","pop","top"], [[],[1],[2],[3],[],[],[],[]] → Output: [null,null,null,null,3,3,2,1]

Approach:
- Use two queues: main queue and auxiliary queue
- For push: add to main queue
- For pop: move all elements except last to auxiliary queue
- Swap queues after pop operation
- For top: similar to pop but don't remove last element

Complexity: O(1) time for push, O(n) time for pop/top, O(n) space`,
    tags: ['stack', 'queue', 'design']
  },
  {
    id: '77',
    title: 'Implement Queue using Stacks',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Implement a queue using stacks (FIFO using LIFO).

Implement a first-in-first-out (FIFO) queue using only two stacks.

Examples:
- Input: ["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]] → Output: [null,null,null,1,1,false]
- Input: ["MyQueue","push","pop","empty"], [[],[1],[],[]] → Output: [null,null,1,true]
- Input: ["MyQueue","push","push","push","peek","pop","pop","peek"], [[],[1],[2],[3],[],[],[],[]] → Output: [null,null,null,null,1,1,2,2]

Approach:
- Use two stacks: input stack and output stack
- For push: add to input stack
- For pop/peek: if output stack empty, transfer all from input
- Transfer reverses order, making LIFO behave like FIFO
- For peek: return top of output stack

Complexity: O(1) amortized time for all operations, O(n) space`,
    tags: ['queue', 'stack', 'design']
  },
  {
    id: '78',
    title: 'Circular Queue',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Design and implement a circular queue.

Design your implementation of the circular queue.

Examples:
- Input: ["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull","deQueue","enQueue","Rear"], [[3],[1],[2],[3],[4],[],[],[],[4],[]] → Output: [null,true,true,true,false,3,true,true,true,4]
- Input: ["MyCircularQueue","enQueue","deQueue","Front","isEmpty"], [[2],[1],[],[],[]] → Output: [null,true,true,-1,true]
- Input: ["MyCircularQueue","enQueue","enQueue","Front","Rear"], [[3],[1],[2],[],[]] → Output: [null,true,true,1,2]

Approach:
- Use array with fixed size
- Track front and rear pointers
- Use modulo arithmetic for circular behavior
- Handle full and empty conditions
- Update pointers after enqueue/dequeue

Complexity: O(1) time for all operations, O(k) space`,
    tags: ['queue', 'circular', 'design']
  },
  {
    id: '79',
    title: 'Design HashMap',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: `Design a HashMap without using any built-in hash table libraries.

Design a HashMap without using any built-in hash table libraries.

Examples:
- Input: ["MyHashMap","put","put","get","get","put","get","remove","get"], [[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]] → Output: [null,null,null,1,-1,null,1,null,-1]
- Input: ["MyHashMap","put","put","get","remove","get"], [[],[1,1],[2,2],[1],[1],[1]] → Output: [null,null,null,1,null,-1]
- Input: ["MyHashMap","put","get","put","get","get"], [[],[1,1],[1],[1,2],[1],[2]] → Output: [null,null,1,null,2,-1]

Approach:
- Use array of linked lists for collision handling
- Use hash function to map keys to array indices
- Handle collisions using chaining
- Implement put, get, and remove operations
- Handle key not found cases

Complexity: O(1) average time, O(n) worst case, O(n) space`,
    tags: ['hash-map', 'design', 'data-structure']
  },
  {
    id: '80',
    title: 'Design HashSet',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Design a HashSet without using any built-in hash table libraries.

Design a HashSet without using any built-in hash table libraries.

Examples:
- Input: ["MyHashSet","add","add","contains","contains","add","contains","remove","contains"], [[],[1],[2],[1],[3],[2],[2],[2],[2]] → Output: [null,null,null,true,false,null,true,null,false]
- Input: ["MyHashSet","add","remove","contains"], [[],[1],[1],[1]] → Output: [null,null,null,false]
- Input: ["MyHashSet","add","add","contains","remove","contains"], [[],[1],[2],[1],[1],[1]] → Output: [null,null,null,true,null,false]

Approach:
- Use array of linked lists for collision handling
- Use hash function to map values to array indices
- Handle collisions using chaining
- Implement add, remove, and contains operations
- Handle value not found cases

Complexity: O(1) average time, O(n) worst case, O(n) space`,
    tags: ['hash-set', 'design', 'data-structure']
  },
  {
    id: '81',
    title: 'Design Linked List',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: `Design your implementation of the linked list.

Design and implement a linked list data structure with basic operations.

Examples:
- Input: ["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"], [[],[1],[3],[1,2],[1],[1],[1]] → Output: [null,null,null,null,2,null,3]
- Input: ["MyLinkedList","addAtHead","addAtTail","get"], [[],[1],[3],[1]] → Output: [null,null,null,3]
- Input: ["MyLinkedList","addAtIndex","get","deleteAtIndex"], [[],[0,1],[0],[0]] → Output: [null,null,1,null]

Approach:
- Use singly linked list with head pointer
- Track size for boundary checking
- For addAtHead: create new node and update head
- For addAtTail: traverse to end and add node
- For addAtIndex: traverse to position and insert
- For get: traverse to index and return value
- For deleteAtIndex: traverse to position and remove

Complexity: O(1) time for addAtHead, O(n) for others, O(n) space`,
    tags: ['linked-list', 'design', 'data-structure']
  },
  {
    id: '82',
    title: 'Design Browser History',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Design a browser history system.

Design a browser history system that supports visiting URLs, going back and forward in history.

Examples:
- Input: ["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"], [["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]] → Output: [null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
- Input: ["BrowserHistory","visit","visit","back","forward"], [["a.com"],["b.com"],[1],[1]] → Output: [null,null,null,"a.com","b.com"]
- Input: ["BrowserHistory","visit","visit","visit","back","back","forward"], [["a.com"],["b.com"],["c.com"],[2],[1],[1]] → Output: [null,null,null,null,"a.com","b.com","c.com"]

Approach:
- Use array to store history URLs
- Track current position in history
- For visit: clear forward history and add new URL
- For back: move position backward (if possible)
- For forward: move position forward (if possible)

Complexity: O(1) time for all operations, O(n) space`,
    tags: ['design', 'browser', 'history']
  },
  {
    id: '83',
    title: 'Design Underground System',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: `Design an underground railway system.

Design an underground railway system to track customer travel times between different stations.

Examples:
- Input: ["UndergroundSystem","checkIn","checkIn","checkOut","checkOut","getAverageTime"], [[],[45,"Leyton",3],[32,"Paradise",8],[45,"Waterloo",15],[32,"Cambridge",22],["Paradise","Cambridge"]] → Output: [null,null,null,null,null,14.0]
- Input: ["UndergroundSystem","checkIn","checkOut","getAverageTime"], [[],[10,"Leyton",3],[10,"Paradise",8],["Leyton","Paradise"]] → Output: [null,null,null,5.0]
- Input: ["UndergroundSystem","checkIn","checkIn","checkOut","getAverageTime"], [[],[1,"A",1],[2,"A",2],[1,"B",5],["A","B"]] → Output: [null,null,null,null,4.0]

Approach:
- Use hash map to track active check-ins
- Use hash map to store travel times between stations
- For checkIn: store (station, time) for customer
- For checkOut: calculate travel time and update averages
- For getAverageTime: return stored average

Complexity: O(1) time for all operations, O(n) space`,
    tags: ['design', 'railway', 'system']
  },
  {
    id: '84',
    title: 'Design Authentication Manager',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Design an authentication manager.

Design an authentication manager that handles token generation and expiration.

Examples:
- Input: ["AuthenticationManager","renew","generate","countUnexpiredTokens","generate","renew","renew","countUnexpiredTokens"], [[5],["aaa",1],["aaa",2],[7],["bbb",7],["aaa",8],["bbb",10],[15]] → Output: [null,null,null,1,null,null,null,0]
- Input: ["AuthenticationManager","generate","renew","countUnexpiredTokens"], [[5],["a",1],["a",2],[6]] → Output: [null,null,null,1]
- Input: ["AuthenticationManager","generate","countUnexpiredTokens"], [[3],["a",1],[4]] → Output: [null,null,0]

Approach:
- Use hash map to store token expiration times
- For generate: store token with current time + timeToLive
- For renew: update expiration time if token exists and not expired
- For countUnexpiredTokens: count tokens with expiration > current time
- Clean up expired tokens periodically

Complexity: O(1) time for generate/renew, O(n) time for count, O(n) space`,
    tags: ['design', 'authentication', 'manager']
  },
  {
    id: '85',
    title: 'Design Leaderboard',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Design a leaderboard system.

Design a leaderboard system that tracks player scores and returns top K players.

Examples:
- Input: ["Leaderboard","addScore","addScore","addScore","addScore","addScore","top","reset","reset","addScore","top"], [[],[1,73],[2,56],[3,39],[4,51],[5,4],[1],[1],[2],[2,51],[3]] → Output: [null,null,null,null,null,null,73,null,null,null,141]
- Input: ["Leaderboard","addScore","top","reset","top"], [[],[1,100],[1],[1],[1]] → Output: [null,null,100,null,0]
- Input: ["Leaderboard","addScore","addScore","top"], [[],[1,50],[2,50],[2]] → Output: [null,null,null,100]

Approach:
- Use hash map to store player scores
- Use priority queue (max heap) for top K queries
- For addScore: update player score in map
- For top: collect top K scores from map
- For reset: remove player from map

Complexity: O(n log k) time for top, O(1) for others, O(n) space`,
    tags: ['design', 'leaderboard', 'ranking']
  },
  {
    id: '86',
    title: 'Design Parking System',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 150,
    description: `Design a parking system.

Design a parking system for a parking lot with three types of parking spaces: big, medium, and small.

Examples:
- Input: ["ParkingSystem","addCar","addCar","addCar","addCar"], [[1,1,0],[1],[2],[3],[1]] → Output: [null,true,true,false,false]
- Input: ["ParkingSystem","addCar","addCar","addCar"], [[1,1,1],[1],[2],[3]] → Output: [null,true,true,true]
- Input: ["ParkingSystem","addCar","addCar"], [[0,0,0],[1],[2]] → Output: [null,false,false]

Approach:
- Store available spaces for each car type
- For addCar: check if space available for car type
- Decrement available spaces when car added
- Return true if space available, false otherwise

Complexity: O(1) time for all operations, O(1) space`,
    tags: ['design', 'parking', 'system']
  },
  {
    id: '87',
    title: 'Design Ordered Stream',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 120,
    description: `Design an ordered stream.

Design an ordered stream that receives integers and returns them in order.

Examples:
- Input: ["OrderedStream","insert","insert","insert","insert","insert"], [[5],[3,"ccccc"],[1,"aaaaa"],[2,"bbbbb"],[5,"eeeee"],[4,"ddddd"]] → Output: [null,[],["aaaaa"],["bbbbb","ccccc"],[],["ddddd","eeeee"]]
- Input: ["OrderedStream","insert","insert","insert"], [[3],[1,"a"],[2,"b"],[3,"c"]] → Output: [null,["a"],["b"],["c"]]
- Input: ["OrderedStream","insert","insert"], [[2],[2,"b"],[1,"a"]] → Output: [null,[],["a","b"]]

Approach:
- Use array to store stream elements
- Track pointer to next expected element
- For insert: store element at given index
- Return consecutive elements starting from pointer
- Update pointer after returning elements

Complexity: O(n) time for insert, O(n) space`,
    tags: ['design', 'stream', 'ordered']
  },
  {
    id: '88',
    title: 'Design Recent Counter',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 100,
    description: `Design a recent counter.

Design a recent counter that counts the number of requests within a time window.

Examples:
- Input: ["RecentCounter","ping","ping","ping","ping"], [[],[1],[100],[3001],[3002]] → Output: [null,1,2,3,3]
- Input: ["RecentCounter","ping","ping","ping"], [[],[1],[100],[3001]] → Output: [null,1,2,3]
- Input: ["RecentCounter","ping","ping"], [[],[1],[3001]] → Output: [null,1,1]

Approach:
- Use queue to store request timestamps
- For ping: add timestamp to queue
- Remove timestamps older than 3000ms from front
- Return current queue size

Complexity: O(1) amortized time for ping, O(n) space`,
    tags: ['design', 'counter', 'recent']
  },
  {
    id: '89',
    title: 'Design Logger Rate Limiter',
    difficulty: 'easy' as const,
    category: 'Data Structures',
    points: 130,
    description: `Design a logger rate limiter.

Design a logger system that receives stream of messages along with their timestamps.

Examples:
- Input: ["Logger","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage"], [[],[1,"foo"],[2,"bar"],[3,"foo"],[8,"bar"],[10,"foo"],[11,"foo"]] → Output: [null,true,true,false,false,false,true]
- Input: ["Logger","shouldPrintMessage","shouldPrintMessage"], [[],[1,"hello"],[2,"hello"]] → Output: [null,true,false]
- Input: ["Logger","shouldPrintMessage","shouldPrintMessage"], [[],[1,"test"],[11,"test"]] → Output: [null,true,true]

Approach:
- Use hash map to store message timestamps
- For shouldPrintMessage: check if message exists and time difference >= 10
- Update timestamp if message should be printed
- Return true if message should be printed, false otherwise

Complexity: O(1) time for shouldPrintMessage, O(n) space`,
    tags: ['design', 'logger', 'rate-limiter']
  },
  {
    id: '90',
    title: 'Design Hit Counter',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 180,
    description: `Design a hit counter.

Design a hit counter that counts the number of hits received in the past 5 minutes.

Examples:
- Input: ["HitCounter","hit","hit","hit","getHits","hit","getHits","getHits"], [[],[1],[2],[3],[4],[300],[300],[301]] → Output: [null,null,null,null,3,null,4,3]
- Input: ["HitCounter","hit","getHits","hit","getHits"], [[],[1],[2],[300],[301]] → Output: [null,null,1,null,2]
- Input: ["HitCounter","hit","hit","getHits"], [[],[1],[2],[3]] → Output: [null,null,null,2]

Approach:
- Use queue to store hit timestamps
- For hit: add timestamp to queue
- For getHits: remove timestamps older than 5 minutes (300 seconds)
- Return current queue size

Complexity: O(1) amortized time for hit, O(n) time for getHits, O(n) space`,
    tags: ['design', 'hit-counter', 'timestamp']
  },
  {
    id: '91',
    title: 'Design Snake Game',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 250,
    description: `Design a snake game.

Design a snake game with basic game mechanics including movement, food collection, and collision detection.

Examples:
- Input: ["SnakeGame","move","move","move","move","move","move"], [[3,2,[[1,2],[0,1]]],["R"],["D"],["R"],["U"],["L"],["U"]] → Output: [null,0,0,1,1,2,-1]
- Input: ["SnakeGame","move","move","move"], [[2,2,[[0,1]]],["R"],["D"],["L"]] → Output: [null,0,1,1]
- Input: ["SnakeGame","move","move"], [[1,1,[]],["R"],["L"]] → Output: [null,0,-1]

Approach:
- Use queue to represent snake body
- Use set to track occupied positions
- Track food positions and current direction
- For move: update head position based on direction
- Check for wall collision, self collision, and food collection
- Update snake length when food is eaten

Complexity: O(1) time for move, O(n) space where n is snake length`,
    tags: ['design', 'snake', 'game']
  },
  {
    id: '92',
    title: 'Design Tic-Tac-Toe',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Design a tic-tac-toe game.

Design a tic-tac-toe game that tracks moves and determines the winner.

Examples:
- Input: ["TicTacToe","move","move","move","move","move","move","move"], [[3],[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]] → Output: [null,0,0,0,0,0,0,1]
- Input: ["TicTacToe","move","move","move"], [[3],[0,0,1],[1,1,2],[2,2,1]] → Output: [null,0,0,1]
- Input: ["TicTacToe","move","move","move","move","move","move","move"], [[3],[0,0,1],[0,1,2],[0,2,1],[1,0,2],[1,1,1],[1,2,2],[2,0,1]] → Output: [null,0,0,0,0,0,0,1]

Approach:
- Use 2D array to represent game board
- Track row, column, and diagonal sums for each player
- For move: update board and check sums
- Check for win conditions: row, column, or diagonal
- Return player number if winner, 0 if no winner yet

Complexity: O(1) time for move, O(n²) space`,
    tags: ['design', 'tic-tac-toe', 'game']
  },
  {
    id: '93',
    title: 'Design Connect Four',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Design a Connect Four game.

Design a Connect Four game that tracks moves and determines the winner.

Examples:
- Input: ["ConnectFour","drop","drop","drop","drop","drop","drop","drop"], [[6,7],[0,1],[1,2],[2,1],[3,2],[4,1],[5,2],[0,1]] → Output: [null,0,0,0,0,0,0,1]
- Input: ["ConnectFour","drop","drop","drop","drop"], [[6,7],[0,1],[1,1],[2,1],[3,1]] → Output: [null,0,0,0,0,1]
- Input: ["ConnectFour","drop","drop","drop","drop","drop","drop"], [[6,7],[0,1],[0,2],[1,1],[1,2],[2,1],[2,2]] → Output: [null,0,0,0,0,0,0,0]

Approach:
- Use 2D array to represent game board
- Track column heights for valid moves
- For drop: place piece in lowest available position
- Check for win in four directions: horizontal, vertical, diagonal
- Return player number if winner, 0 if no winner

Complexity: O(n) time for drop, O(n²) space`,
    tags: ['design', 'connect-four', 'game']
  },
  {
    id: '94',
    title: 'Design Minesweeper',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: `Design a Minesweeper game.

Design a Minesweeper game with reveal and flag operations.

Examples:
- Input: ["Minesweeper","reveal","reveal","reveal"], [[3,3,[[0,0]]],[0,0],[0,1],[1,1]] → Output: [null,["E","E","E"],["E","E","E"],["E","E","E"]]
- Input: ["Minesweeper","reveal","flag","reveal"], [[3,3,[[0,0]]],[0,1],[0,0],[0,1]] → Output: [null,["E","1","E"],["E","F","E"],["E","1","E"]]
- Input: ["Minesweeper","reveal"], [[1,1,[[0,0]]],[0,0]] → Output: [null,["X"]]

Approach:
- Use 2D array to represent game board
- Track mine positions and revealed cells
- For reveal: check if mine, count adjacent mines, or reveal recursively
- For flag: mark cell as flagged
- Use BFS for revealing empty cells

Complexity: O(n²) time for reveal, O(n²) space`,
    tags: ['design', 'minesweeper', 'game']
  },
  {
    id: '95',
    title: 'Design Excel Sum Formula',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 280,
    description: `Design an Excel sum formula system.

Design a spreadsheet system that supports setting values and calculating sums with formulas.

Examples:
- Input: ["Excel","set","sum","set","get"], [[3,"C"],[1,"A",2],[3,"C",["A1","A1:B2"]],[2,"B",2],[1,"A"]] → Output: [null,null,4,null,2]
- Input: ["Excel","set","sum","get"], [[3,"C"],[1,"A",5],[3,"C",["A1"]],[3,"C"]] → Output: [null,null,5,5]
- Input: ["Excel","set","sum","set","get"], [[3,"C"],[1,"A",1],[3,"C",["A1","A1"]],[1,"A",2],[3,"C"]] → Output: [null,null,2,null,4]

Approach:
- Use 2D array to store cell values and formulas
- Track dependencies between cells
- For set: update cell value and recalculate dependent cells
- For sum: evaluate formula and update result
- Handle circular dependencies

Complexity: O(n²) time for set/sum, O(n²) space`,
    tags: ['design', 'excel', 'formula']
  },
  {
    id: '96',
    title: 'Design File System',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 230,
    description: `Design a file system.

Design a file system that supports creating paths and getting values.

Examples:
- Input: ["FileSystem","createPath","get"], [[],["/a",1],["/a"]] → Output: [null,true,1]
- Input: ["FileSystem","createPath","createPath","get"], [[],["/leet",1],["/leet/code",2],["/leet/code"]] → Output: [null,true,true,2]
- Input: ["FileSystem","createPath","get","createPath","get"], [[],["/a",1],["/a"],["/a/b",2],["/a/b"]] → Output: [null,true,1,true,2]

Approach:
- Use hash map to store path-value mappings
- For createPath: check if parent path exists
- For get: return value if path exists
- Validate path format and parent existence

Complexity: O(n) time for createPath, O(1) for get, O(n) space`,
    tags: ['design', 'file-system', 'tree']
  },
  {
    id: '97',
    title: 'Design Search Autocomplete System',
    difficulty: 'hard' as const,
    category: 'Data Structures',
    points: 300,
    description: `Design a search autocomplete system.

Design a search autocomplete system that suggests sentences based on input history.

Examples:
- Input: ["AutocompleteSystem","input","input","input","input"], [[["i love you","island","iroman","i love leetcode"],[5,3,2,2]],["i"],[" "],["a"],["#"]] → Output: [null,["i love you","island","i love leetcode"],["i love you","i love leetcode"],["i love you","i love leetcode"],[]]
- Input: ["AutocompleteSystem","input","input","input"], [[["i love you","island","iroman"],[5,3,2]],["i"],[" "],["a"]] → Output: [null,["i love you","island","iroman"],["i love you"],["i love you"]]
- Input: ["AutocompleteSystem","input","input"], [[["i love you","island"],[5,3]],["i"],["#"]] → Output: [null,["i love you","island"],[]]

Approach:
- Use trie to store sentences and their frequencies
- Track current input prefix
- For input: search trie for matching sentences
- Sort by frequency and lexicographical order
- Handle special characters and end of input

Complexity: O(n log n) time for input, O(n) space`,
    tags: ['design', 'search', 'autocomplete']
  },
  {
    id: '98',
    title: 'Design Word Dictionary',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 220,
    description: `Design a word dictionary with wildcard support.

Design a data structure that supports adding words and searching with wildcard characters.

Examples:
- Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]] → Output: [null,null,null,null,false,true,true,true]
- Input: ["WordDictionary","addWord","search","search"], [[],["a"],["a"],["."]] → Output: [null,null,true,true]
- Input: ["WordDictionary","addWord","addWord","search"], [[],["at"],["and"],["an."]] → Output: [null,null,null,false]

Approach:
- Use trie data structure to store words
- For addWord: insert word into trie
- For search: use DFS with wildcard matching
- Handle '.' character by trying all possible characters
- Track end of word markers

Complexity: O(n) time for addWord, O(26^n) worst case for search, O(n) space`,
    tags: ['design', 'dictionary', 'wildcard']
  },
  {
    id: '99',
    title: 'Design Magic Dictionary',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 200,
    description: `Design a magic dictionary.

Design a magic dictionary that supports building a dictionary and searching for words with exactly one character difference.

Examples:
- Input: ["MagicDictionary","buildDict","search","search","search","search"], [[],[["hello","leetcode"]],"hello","hhllo","hell","leetcoded"]] → Output: [null,null,false,true,false,false]
- Input: ["MagicDictionary","buildDict","search","search"], [[],[["hello","hallo","leetcode"]],"hello","hhllo"]] → Output: [null,null,false,true]
- Input: ["MagicDictionary","buildDict","search"], [[],[["hello","leetcode"]],"hello"]] → Output: [null,null,false]

Approach:
- Use hash set to store dictionary words
- For buildDict: add all words to set
- For search: try changing each character and check if result exists
- Ensure exactly one character difference
- Handle edge cases and word lengths

Complexity: O(n) time for buildDict, O(26 * m) time for search, O(n) space`,
    tags: ['design', 'magic', 'dictionary']
  },
  {
    id: '100',
    title: 'Design Add and Search Words',
    difficulty: 'medium' as const,
    category: 'Data Structures',
    points: 240,
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Design a data structure that supports adding new words and searching with wildcard characters.

Examples:
- Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]] → Output: [null,null,null,null,false,true,true,true]
- Input: ["WordDictionary","addWord","search","search"], [[],["a"],["a"],["."]] → Output: [null,null,true,true]
- Input: ["WordDictionary","addWord","addWord","search"], [[],["at"],["and"],["an."]] → Output: [null,null,null,false]

Approach:
- Use trie data structure to store words
- For addWord: insert word into trie
- For search: use DFS with wildcard matching
- Handle '.' character by trying all possible characters
- Track end of word markers

Complexity: O(n) time for addWord, O(26^n) worst case for search, O(n) space`,
    tags: ['design', 'add', 'search', 'words']
  }
];
