import { Problem, Question } from '../types';
import { QUESTIONS_DATA } from './questionsData';

type LanguageKey = 'cpp' | 'python' | 'java';

interface ProblemBankItem {
  id: string;
  problem: Problem;
  question: Question;
}

// Minimal starter templates for each language. Each contains a single,
// unambiguous "Start coding here" comment and a tiny skeleton where
// required (Java Solution class) so users see a clear edit point.
export const getStarterCode = (problemId: string): Record<LanguageKey, string> => {
  // Default minimal template
  let cppTemplate = `// Start coding here`;

  const pyTemplate = `# Start coding here

class Solution:
    # Implement methods here
    pass`;

  let javaTemplate = `// Problem ${problemId}
// LeetCode-style: implement your solution in the Solution class.
public class Solution {
    // Start coding here. Replace the signature with the actual problem signature.
    // Example:
    // public int exampleMethod(int[] nums) {
    //     // Start coding here
    //     return 0;
    // }

    public static void main(String[] args) {
        // Optional local tests:
        // System.out.println(new Solution().exampleMethod(new int[]{1,2,3}));
    }
}`;

  // Find question metadata so we can tailor signatures
  const q = QUESTIONS_DATA.find(x => x.id === problemId);
  const tags = (q?.tags || []).map(t => t.toLowerCase());

  // Problem 1: Reverse a Singly Linked List
  if (String(problemId) === '1') {
    cppTemplate = `/**
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
// Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate1 = `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # Start coding here
        pass`;
    
    javaTemplate = `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */

public class Solution {
    public ListNode reverseList(ListNode head) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate1, java: javaTemplate };
  }

  // Problem 2: Detect Cycle in Linked List
  if (problemId === '2') {
    cppTemplate = `/**
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
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate2 = `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate2 = `/**
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
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate2, java: javaTemplate2 };
  }

  // Problem 3: Find Missing Number
  if (problemId === '3') {
    cppTemplate = `class Solution {
public:
    int missingNumber(vector<int>& nums, int n) {
        // Start coding here
    return 0;
    }
};`;
    
    const pyTemplate3 = `class Solution:
    def missingNumber(self, nums: List[int], n: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate3 = `public class Solution {
    public int missingNumber(List<Integer> nums, int n) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate3, java: javaTemplate3 };
  }

  // Problem 4: Valid Parentheses
  if (problemId === '4') {
    cppTemplate = `class Solution {
public:
    bool isValid(std::string s) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate4 = `class Solution:
    def isValid(self, s: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate4 = `class Solution {
    public boolean isValid(String s) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate4, java: javaTemplate4 };
  }

  // Problem 5: Maximum Subarray Sum (Kadane)
  if (problemId === '5') {
    cppTemplate = `class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate5 = `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate5 = `class Solution {
    public int maxSubArray(int[] nums) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate5, java: javaTemplate5 };
  }

  // Problem 6: Binary Search
  if (problemId === '6') {
    cppTemplate = `class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        // Start coding here
        return -1;
    }
};`;
    
    const pyTemplate6 = `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate6 = `class Solution {
    public int search(int[] nums, int target) {
        // Start coding here
        return -1;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate6, java: javaTemplate6 };
  }

  // Problem 7: Longest Substring Without Repeating
  if (problemId === '7') {
    cppTemplate = `class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate7 = `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate7 = `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate7, java: javaTemplate7 };
  }

  // Problem 8: Merge Two Sorted Arrays
  if (problemId === '8') {
    cppTemplate = `class Solution {
public:
    void merge(std::vector<int>& nums1, int m, std::vector<int>& nums2, int n) {
        // Start coding here
    }
};`;
    
    const pyTemplate8 = `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate8 = `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate8, java: javaTemplate8 };
  }

  // Problem 9: Kth Largest Element
  if (problemId === '9') {
    cppTemplate = `class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate9 = `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate9 = `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate9, java: javaTemplate9 };
  }

  // Problem 10: Queue Using Stacks
  if (problemId === '10') {
    cppTemplate = `class MyQueue {
public:
    MyQueue() {
        // Start coding here
    }
    
    void push(int x) {
        // Start coding here
    }
    
    int pop() {
        // Start coding here
        return 0;
    }
    
    int peek() {
        // Start coding here
        return 0;
    }
    
    bool empty() {
        // Start coding here
        return true;
    }
};`;
    
    const pyTemplate10 = `class MyQueue:
    def __init__(self):
        # Start coding here
        pass
    
    def push(self, x: int) -> None:
        # Start coding here
        pass
    
    def pop(self) -> int:
        # Start coding here
        pass
    
    def peek(self) -> int:
        # Start coding here
        pass
    
    def empty(self) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate10 = `class MyQueue {
    public MyQueue() {
        // Start coding here
    }
    
    public void push(int x) {
        // Start coding here
    }
    
    public int pop() {
        // Start coding here
        return 0;
    }
    
    public int peek() {
        // Start coding here
        return 0;
    }
    
    public boolean empty() {
        // Start coding here
        return true;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate10, java: javaTemplate10 };
  }

  // Problem 11: Binary Tree Traversals
  if (problemId === '11') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Start coding here
        return {};
    }
    
    vector<int> preorderTraversal(TreeNode* root) {
        // Start coding here
        return {};
    }
    
    vector<int> postorderTraversal(TreeNode* root) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate11 = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        # Start coding here
        return []
    
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        # Start coding here
        return []
    
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        # Start coding here
        return []`;
    
    const javaTemplate11 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Start coding here
        return new ArrayList<>();
    }
    
    public List<Integer> preorderTraversal(TreeNode root) {
        // Start coding here
        return new ArrayList<>();
    }
    
    public List<Integer> postorderTraversal(TreeNode root) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate11, java: javaTemplate11 };
  }

  // Problem 12: QuickSort Implementation
  if (problemId === '12') {
    cppTemplate = `class Solution {
public:
    void quickSort(vector<int>& arr, int low, int high) {
        // Start coding here
    }
    
    int partition(vector<int>& arr, int low, int high) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate12 = `class Solution:
    def quickSort(self, arr: List[int], low: int, high: int) -> None:
        # Start coding here
        pass
    
    def partition(self, arr: List[int], low: int, high: int) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate12 = `class Solution {
    public void quickSort(int[] arr, int low, int high) {
        // Start coding here
    }
    
    public int partition(int[] arr, int low, int high) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate12, java: javaTemplate12 };
  }

  // Problem 13: MergeSort Implementation
  if (problemId === '13') {
    cppTemplate = `class Solution {
public:
    void mergeSort(vector<int>& arr, int left, int right) {
        // Start coding here
    }
    
    void merge(vector<int>& arr, int left, int mid, int right) {
        // Start coding here
    }
};`;
    
    const pyTemplate13 = `class Solution:
    def mergeSort(self, arr: List[int], left: int, right: int) -> None:
        # Start coding here
        pass
    
    def merge(self, arr: List[int], left: int, mid: int, right: int) -> None:
        # Start coding here
    pass`;

    const javaTemplate13 = `class Solution {
    public void mergeSort(int[] arr, int left, int right) {
        // Start coding here
    }
    
    public void merge(int[] arr, int left, int mid, int right) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate13, java: javaTemplate13 };
  }

  // Problem 14: Detect Cycle in Directed Graph
  if (problemId === '14') {
    cppTemplate = `class Solution {
public:
    bool hasCycle(int n, vector<vector<int>>& edges) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate14 = `class Solution:
    def hasCycle(self, n: int, edges: List[List[int]]) -> bool:
        # Start coding here
        return False`;
    
    const javaTemplate14 = `class Solution {
    public boolean hasCycle(int n, int[][] edges) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate14, java: javaTemplate14 };
  }

  // Problem 15: Number of Islands
  if (problemId === '15') {
    cppTemplate = `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate15 = `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate15 = `class Solution {
    public int numIslands(char[][] grid) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate15, java: javaTemplate15 };
  }

  // Problem 16: BFS Shortest Path
  if (problemId === '16') {
    cppTemplate = `class Solution {
public:
    int shortestPath(int n, vector<vector<int>>& edges, int start, int end) {
        // Start coding here
        return -1;
    }
};`;
    
    const pyTemplate16 = `class Solution:
    def shortestPath(self, n: int, edges: List[List[int]], start: int, end: int) -> int:
        # Start coding here
        return -1`;
    
    const javaTemplate16 = `class Solution {
    public int shortestPath(int n, int[][] edges, int start, int end) {
        // Start coding here
        return -1;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate16, java: javaTemplate16 };
  }

  // Problem 17: Topological Sort
  if (problemId === '17') {
    cppTemplate = `class Solution {
public:
    vector<int> topologicalSort(int n, vector<vector<int>>& edges) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate17 = `class Solution:
    def topologicalSort(self, n: int, edges: List[List[int]]) -> List[int]:
        # Start coding here
        return []`;
    
    const javaTemplate17 = `class Solution {
    public List<Integer> topologicalSort(int n, int[][] edges) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate17, java: javaTemplate17 };
  }

  // Problem 18: Edit Distance
  if (problemId === '18') {
    cppTemplate = `class Solution {
public:
    int minDistance(string word1, string word2) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate18 = `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate18 = `class Solution {
    public int minDistance(String word1, String word2) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate18, java: javaTemplate18 };
  }

  // Problem 19: Palindromic Substrings
  if (problemId === '19') {
    cppTemplate = `class Solution {
public:
    int countSubstrings(string s) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate19 = `class Solution:
    def countSubstrings(self, s: str) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate19 = `class Solution {
    public int countSubstrings(String s) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate19, java: javaTemplate19 };
  }

  // Problem 20: Longest Consecutive Sequence
  if (problemId === '20') {
    cppTemplate = `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate20 = `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate20 = `class Solution {
    public int longestConsecutive(int[] nums) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate20, java: javaTemplate20 };
  }

  // Problem 21: Merge Two Sorted Linked Lists
  if (problemId === '21') {
    cppTemplate = `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate21 = `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:
        # Start coding here
        return None`;
    
    const javaTemplate21 = `public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate21, java: javaTemplate21 };
  }

  // Problem 22: Intersection of Two Linked Lists
  if (problemId === '22') {
    cppTemplate = `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate22 = `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        # Start coding here
        return None`;
    
    const javaTemplate22 = `public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate22, java: javaTemplate22 };
  }

  // Problem 23: Remove Nth Node From End
  if (problemId === '23') {
    cppTemplate = `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate23 = `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # Start coding here
        return None`;
    
    const javaTemplate23 = `public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate23, java: javaTemplate23 };
  }

  // Problem 24: Copy List with Random Pointer
  if (problemId === '24') {
    cppTemplate = `class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate24 = `class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        # Start coding here
        return None`;
    
    const javaTemplate24 = `class Node {
    int val;
    Node next;
    Node random;
    
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

class Solution {
    public Node copyRandomList(Node head) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate24, java: javaTemplate24 };
  }

  // Problem 25: Level Order Traversal
  if (problemId === '25') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate25 = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        # Start coding here
        return []`;
    
    const javaTemplate25 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate25, java: javaTemplate25 };
  }

  // Problem 26: Lowest Common Ancestor
  if (problemId === '26') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate26 = `class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        # Start coding here
        return None`;
    
    const javaTemplate26 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate26, java: javaTemplate26 };
  }

  // Problem 27: Diameter of Binary Tree
  if (problemId === '27') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate27 = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        # Start coding here
        return 0`;
    
    const javaTemplate27 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate27, java: javaTemplate27 };
  }

  // Problem 28: Symmetric Tree
  if (problemId === '28') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate28 = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        # Start coding here
        return False`;
    
    const javaTemplate28 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public boolean isSymmetric(TreeNode root) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate28, java: javaTemplate28 };
  }

  // Problem 29: Balanced Binary Tree
  if (problemId === '29') {
    cppTemplate = `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isBalanced(TreeNode* root) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate29 = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        # Start coding here
        return False`;
    
    const javaTemplate29 = `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public boolean isBalanced(TreeNode root) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate29, java: javaTemplate29 };
  }

  // Problem 30: BST to Doubly Linked List
  if (problemId === '30') {
    cppTemplate = `class Node {
public:
    int val;
    Node* left;
    Node* right;
    
    Node() {}
    
    Node(int _val) {
        val = _val;
        left = NULL;
        right = NULL;
    }
    
    Node(int _val, Node* _left, Node* _right) {
        val = _val;
        left = _left;
        right = _right;
    }
};

class Solution {
public:
    Node* treeToDoublyList(Node* root) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate30 = `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def treeToDoublyList(self, root: 'Node') -> 'Node':
        # Start coding here
        return None`;
    
    const javaTemplate30 = `class Node {
    public int val;
    public Node left;
    public Node right;
    
    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }
    
    public Node(int _val,Node _left,Node _right) {
        val = _val;
        left = _left;
        right = _right;
    }
}

class Solution {
    public Node treeToDoublyList(Node root) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate30, java: javaTemplate30 };
  }

  // Problem 31: Binary Search in Rotated Array
  if (problemId === '31') {
    cppTemplate = `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Start coding here
        return -1;
    }
};`;
    
    const pyTemplate31 = `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate31 = `class Solution {
    public int search(int[] nums, int target) {
        // Start coding here
        return -1;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate31, java: javaTemplate31 };
  }

  // Problem 32: Find Duplicate Number
  if (problemId === '32') {
    cppTemplate = `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate32 = `class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate32 = `class Solution {
    public int findDuplicate(int[] nums) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate32, java: javaTemplate32 };
  }

  // Problem 33: Rotate Array by K Steps
  if (problemId === '33') {
    cppTemplate = `class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // Start coding here
    }
};`;
    
    const pyTemplate33 = `class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate33 = `class Solution {
    public void rotate(int[] nums, int k) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate33, java: javaTemplate33 };
  }

  // Problem 34: Set Matrix Zeroes
  if (problemId === '34') {
    cppTemplate = `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Start coding here
    }
};`;
    
    const pyTemplate34 = `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate34 = `class Solution {
    public void setZeroes(int[][] matrix) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate34, java: javaTemplate34 };
  }

  // Problem 35: Top K Frequent Elements
  if (problemId === '35') {
    cppTemplate = `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate35 = `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # Start coding here
        pass`;
    
    const javaTemplate35 = `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Start coding here
        return new int[0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate35, java: javaTemplate35 };
  }

  // Problem 36: Subarray Sum Equals K
  if (problemId === '36') {
    cppTemplate = `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate36 = `class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate36 = `class Solution {
    public int subarraySum(int[] nums, int k) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate36, java: javaTemplate36 };
  }

  // Problem 37: Isomorphic Strings
  if (problemId === '37') {
    cppTemplate = `class Solution {
public:
    bool isIsomorphic(string s, string t) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate37 = `class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate37 = `class Solution {
    public boolean isIsomorphic(String s, String t) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate37, java: javaTemplate37 };
  }

  // Problem 38: Two Sum
  if (problemId === '38') {
    cppTemplate = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate38 = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Start coding here
        pass`;
    
    const javaTemplate38 = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Start coding here
        return new int[0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate38, java: javaTemplate38 };
  }

  // Problem 39: Add Two Numbers
  if (problemId === '39') {
    cppTemplate = `/**
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Start coding here
        return nullptr;
    }
};`;
    
    const pyTemplate39 = `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Start coding here
        pass`;
    
    const javaTemplate39 = `/**
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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Start coding here
        return null;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate39, java: javaTemplate39 };
  }

  // Problem 40: Container With Most Water
  if (problemId === '40') {
    cppTemplate = `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate40 = `class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate40 = `class Solution {
    public int maxArea(int[] height) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate40, java: javaTemplate40 };
  }

  // Problem 41: Dijkstra's Algorithm
  if (problemId === '41') {
    cppTemplate = `class Solution {
public:
    vector<int> dijkstra(int n, vector<vector<int>>& edges, int source) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate41 = `class Solution:
    def dijkstra(self, n: int, edges: List[List[int]], source: int) -> List[int]:
        # Start coding here
        pass`;
    
    const javaTemplate41 = `class Solution {
    public int[] dijkstra(int n, int[][] edges, int source) {
        // Start coding here
        return new int[0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate41, java: javaTemplate41 };
  }

  // Problem 42: Floyd-Warshall Algorithm
  if (problemId === '42') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> floydWarshall(int n, vector<vector<int>>& edges) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate42 = `class Solution:
    def floydWarshall(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate42 = `class Solution {
    public int[][] floydWarshall(int n, int[][] edges) {
        // Start coding here
        return new int[0][0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate42, java: javaTemplate42 };
  }

  // Problem 43: Kruskal's Algorithm
  if (problemId === '43') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> kruskal(int n, vector<vector<int>>& edges) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate43 = `class Solution:
    def kruskal(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate43 = `class Solution {
    public int[][] kruskal(int n, int[][] edges) {
        // Start coding here
        return new int[0][0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate43, java: javaTemplate43 };
  }

  // Problem 44: Prim's Algorithm
  if (problemId === '44') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> prim(int n, vector<vector<int>>& edges) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate44 = `class Solution:
    def prim(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate44 = `class Solution {
    public int[][] prim(int n, int[][] edges) {
        // Start coding here
        return new int[0][0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate44, java: javaTemplate44 };
  }

  // Problem 45: Knapsack Problem
  if (problemId === '45') {
    cppTemplate = `class Solution {
public:
    int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate45 = `class Solution:
    def knapsack(self, weights: List[int], values: List[int], capacity: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate45 = `class Solution {
    public int knapsack(int[] weights, int[] values, int capacity) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate45, java: javaTemplate45 };
  }

  // Problem 46: Longest Common Subsequence
  if (problemId === '46') {
    cppTemplate = `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate46 = `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate46 = `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate46, java: javaTemplate46 };
  }

  // Problem 47: Coin Change Problem
  if (problemId === '47') {
    cppTemplate = `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate47 = `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate47 = `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate47, java: javaTemplate47 };
  }

  // Problem 48: Climbing Stairs
  if (problemId === '48') {
    cppTemplate = `class Solution {
public:
    int climbStairs(int n) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate48 = `class Solution:
    def climbStairs(self, n: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate48 = `class Solution {
    public int climbStairs(int n) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate48, java: javaTemplate48 };
  }

  // Problem 49: House Robber
  if (problemId === '49') {
    cppTemplate = `class Solution {
public:
    int rob(vector<int>& nums) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate49 = `class Solution:
    def rob(self, nums: List[int]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate49 = `class Solution {
    public int rob(int[] nums) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate49, java: javaTemplate49 };
  }

  // Problem 50: Word Break
  if (problemId === '50') {
    cppTemplate = `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate50 = `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate50 = `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate50, java: javaTemplate50 };
  }

  // Problem 51: Regular Expression Matching
  if (problemId === '51') {
    cppTemplate = `class Solution {
public:
    bool isMatch(string s, string p) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate51 = `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate51 = `class Solution {
    public boolean isMatch(String s, String p) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate51, java: javaTemplate51 };
  }

  // Problem 52: Wildcard Matching
  if (problemId === '52') {
    cppTemplate = `class Solution {
public:
    bool isMatch(string s, string p) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate52 = `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate52 = `class Solution {
    public boolean isMatch(String s, String p) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate52, java: javaTemplate52 };
  }

  // Problem 53: Trapping Rain Water
  if (problemId === '53') {
    cppTemplate = `class Solution {
public:
    int trap(vector<int>& height) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate53 = `class Solution:
    def trap(self, height: List[int]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate53 = `class Solution {
    public int trap(int[] height) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate53, java: javaTemplate53 };
  }

  // Problem 54: Sliding Window Maximum
  if (problemId === '54') {
    cppTemplate = `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate54 = `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        # Start coding here
        pass`;
    
    const javaTemplate54 = `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // Start coding here
        return new int[0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate54, java: javaTemplate54 };
  }

  // Problem 55: Median of Two Sorted Arrays
  if (problemId === '55') {
    cppTemplate = `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Start coding here
        return 0.0;
    }
};`;
    
    const pyTemplate55 = `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Start coding here
        pass`;
    
    const javaTemplate55 = `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Start coding here
        return 0.0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate55, java: javaTemplate55 };
  }

  // Problem 56: Reverse Words in String
  if (problemId === '56') {
    cppTemplate = `class Solution {
public:
    string reverseWords(string s) {
        // Start coding here
        return "";
    }
};`;
    
    const pyTemplate56 = `class Solution:
    def reverseWords(self, s: str) -> str:
        # Start coding here
        pass`;
    
    const javaTemplate56 = `class Solution {
    public String reverseWords(String s) {
        // Start coding here
        return "";
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate56, java: javaTemplate56 };
  }

  // Problem 57: Valid Anagram
  if (problemId === '57') {
    cppTemplate = `class Solution {
public:
    bool isAnagram(string s, string t) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate57 = `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate57 = `class Solution {
    public boolean isAnagram(String s, String t) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate57, java: javaTemplate57 };
  }

  // Problem 58: Group Anagrams
  if (problemId === '58') {
    cppTemplate = `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate58 = `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Start coding here
        pass`;
    
    const javaTemplate58 = `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate58, java: javaTemplate58 };
  }

  // Problem 59: Valid Palindrome
  if (problemId === '59') {
    cppTemplate = `class Solution {
public:
    bool isPalindrome(string s) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate59 = `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate59 = `class Solution {
    public boolean isPalindrome(String s) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate59, java: javaTemplate59 };
  }

  // Problem 60: Longest Palindromic Substring
  if (problemId === '60') {
    cppTemplate = `class Solution {
public:
    string longestPalindrome(string s) {
        // Start coding here
        return "";
    }
};`;
    
    const pyTemplate60 = `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Start coding here
        pass`;
    
    const javaTemplate60 = `class Solution {
    public String longestPalindrome(String s) {
        // Start coding here
        return "";
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate60, java: javaTemplate60 };
  }

  // Problem 61: Implement Trie (Prefix Tree)
  if (problemId === '61') {
    cppTemplate = `class TrieNode {
public:
    bool isEnd;
    vector<TrieNode*> children;
    
    TrieNode() : isEnd(false), children(26, nullptr) {}
};

class Trie {
private:
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        // Start coding here
    }
    
    bool search(string word) {
        // Start coding here
        return false;
    }
    
    bool startsWith(string prefix) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate61 = `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        # Start coding here
        pass
    
    def insert(self, word: str) -> None:
        # Start coding here
        pass
    
    def search(self, word: str) -> bool:
        # Start coding here
        pass
    
    def startsWith(self, prefix: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate61 = `class TrieNode {
    boolean isEnd;
    TrieNode[] children;
    
    public TrieNode() {
        isEnd = false;
        children = new TrieNode[26];
    }
}

public class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        // Start coding here
    }
    
    public boolean search(String word) {
        // Start coding here
        return false;
    }
    
    public boolean startsWith(String prefix) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate61, java: javaTemplate61 };
  }

  // Problem 62: Word Search
  if (problemId === '62') {
    cppTemplate = `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate62 = `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate62 = `public class Solution {
    public boolean exist(char[][] board, String word) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate62, java: javaTemplate62 };
  }

  // Problem 63: Sudoku Solver
  if (problemId === '63') {
    cppTemplate = `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        // Start coding here
    }
};`;
    
    const pyTemplate63 = `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate63 = `public class Solution {
    public void solveSudoku(char[][] board) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate63, java: javaTemplate63 };
  }

  // Problem 64: N-Queens
  if (problemId === '64') {
    cppTemplate = `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate64 = `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        # Start coding here
        pass`;
    
    const javaTemplate64 = `public class Solution {
    public List<List<String>> solveNQueens(int n) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate64, java: javaTemplate64 };
  }

  // Problem 65: Permutations
  if (problemId === '65') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate65 = `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate65 = `public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate65, java: javaTemplate65 };
  }

  // Problem 66: Combinations
  if (problemId === '66') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate66 = `class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate66 = `public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate66, java: javaTemplate66 };
  }

  // Problem 67: Subsets
  if (problemId === '67') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate67 = `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate67 = `public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate67, java: javaTemplate67 };
  }

  // Problem 68: Generate Parentheses
  if (problemId === '68') {
    cppTemplate = `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate68 = `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # Start coding here
        pass`;
    
    const javaTemplate68 = `public class Solution {
    public List<String> generateParenthesis(int n) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate68, java: javaTemplate68 };
  }

  // Problem 69: Letter Combinations of a Phone Number
  if (problemId === '69') {
    cppTemplate = `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate69 = `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        # Start coding here
        pass`;
    
    const javaTemplate69 = `public class Solution {
    public List<String> letterCombinations(String digits) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate69, java: javaTemplate69 };
  }

  // Problem 70: Combination Sum
  if (problemId === '70') {
    cppTemplate = `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate70 = `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Start coding here
        pass`;
    
    const javaTemplate70 = `public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate70, java: javaTemplate70 };
  }

  // Problem 71: LRU Cache
  if (problemId === '71') {
    cppTemplate = `class LRUCache {
private:
    int capacity;
    // Start coding here
    
public:
    LRUCache(int capacity) {
        // Start coding here
    }
    
    int get(int key) {
        // Start coding here
        return -1;
    }
    
    void put(int key, int value) {
        // Start coding here
    }
};`;
    
    const pyTemplate71 = `class LRUCache:
    def __init__(self, capacity: int):
        # Start coding here
        pass
    
    def get(self, key: int) -> int:
        # Start coding here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate71 = `public class LRUCache {
    private int capacity;
    // Start coding here
    
    public LRUCache(int capacity) {
        // Start coding here
    }
    
    public int get(int key) {
        // Start coding here
        return -1;
    }
    
    public void put(int key, int value) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate71, java: javaTemplate71 };
  }

  // Problem 72: LFU Cache
  if (problemId === '72') {
    cppTemplate = `class LFUCache {
private:
    int capacity;
    // Start coding here
    
public:
    LFUCache(int capacity) {
        // Start coding here
    }
    
    int get(int key) {
        // Start coding here
        return -1;
    }
    
    void put(int key, int value) {
        // Start coding here
    }
};`;
    
    const pyTemplate72 = `class LFUCache:
    def __init__(self, capacity: int):
        # Start coding here
        pass
    
    def get(self, key: int) -> int:
        # Start coding here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate72 = `public class LFUCache {
    private int capacity;
    // Start coding here
    
    public LFUCache(int capacity) {
        // Start coding here
    }
    
    public int get(int key) {
        // Start coding here
        return -1;
    }
    
    public void put(int key, int value) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate72, java: javaTemplate72 };
  }

  // Problem 73: All O(1) Data Structure
  if (problemId === '73') {
    cppTemplate = `class AllOne {
public:
    AllOne() {
        // Start coding here
    }
    
    void inc(string key) {
        // Start coding here
    }
    
    void dec(string key) {
        // Start coding here
    }
    
    string getMaxKey() {
        // Start coding here
        return "";
    }
    
    string getMinKey() {
        // Start coding here
        return "";
    }
};`;
    
    const pyTemplate73 = `class AllOne:
    def __init__(self):
        # Start coding here
        pass
    
    def inc(self, key: str) -> None:
        # Start coding here
        pass
    
    def dec(self, key: str) -> None:
        # Start coding here
        pass
    
    def getMaxKey(self) -> str:
        # Start coding here
        pass
    
    def getMinKey(self) -> str:
        # Start coding here
        pass`;
    
    const javaTemplate73 = `public class AllOne {
    public AllOne() {
        // Start coding here
    }
    
    public void inc(String key) {
        // Start coding here
    }
    
    public void dec(String key) {
        // Start coding here
    }
    
    public String getMaxKey() {
        // Start coding here
        return "";
    }
    
    public String getMinKey() {
        // Start coding here
        return "";
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate73, java: javaTemplate73 };
  }

  // Problem 74: Min Stack
  if (problemId === '74') {
    cppTemplate = `class MinStack {
private:
    // Start coding here
    
public:
    MinStack() {
        // Start coding here
    }
    
    void push(int val) {
        // Start coding here
    }
    
    void pop() {
        // Start coding here
    }
    
    int top() {
        // Start coding here
        return 0;
    }
    
    int getMin() {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate74 = `class MinStack:
    def __init__(self):
        # Start coding here
        pass
    
    def push(self, val: int) -> None:
        # Start coding here
        pass
    
    def pop(self) -> None:
        # Start coding here
        pass
    
    def top(self) -> int:
        # Start coding here
        pass
    
    def getMin(self) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate74 = `public class MinStack {
    // Start coding here
    
    public MinStack() {
        // Start coding here
    }
    
    public void push(int val) {
        // Start coding here
    }
    
    public void pop() {
        // Start coding here
    }
    
    public int top() {
        // Start coding here
        return 0;
    }
    
    public int getMin() {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate74, java: javaTemplate74 };
  }

  // Problem 75: Max Stack
  if (problemId === '75') {
    cppTemplate = `class MaxStack {
private:
    // Start coding here
    
public:
    MaxStack() {
        // Start coding here
    }
    
    void push(int x) {
        // Start coding here
    }
    
    int pop() {
        // Start coding here
        return 0;
    }
    
    int top() {
        // Start coding here
        return 0;
    }
    
    int peekMax() {
        // Start coding here
        return 0;
    }
    
    int popMax() {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate75 = `class MaxStack:
    def __init__(self):
        # Start coding here
        pass
    
    def push(self, x: int) -> None:
        # Start coding here
        pass
    
    def pop(self) -> int:
        # Start coding here
        pass
    
    def top(self) -> int:
        # Start coding here
        pass
    
    def peekMax(self) -> int:
        # Start coding here
        pass
    
    def popMax(self) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate75 = `public class MaxStack {
    // Start coding here
    
    public MaxStack() {
        // Start coding here
    }
    
    public void push(int x) {
        // Start coding here
    }
    
    public int pop() {
        // Start coding here
        return 0;
    }
    
    public int top() {
        // Start coding here
        return 0;
    }
    
    public int peekMax() {
        // Start coding here
        return 0;
    }
    
    public int popMax() {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate75, java: javaTemplate75 };
  }

  // Problem 76: Implement Stack using Queues
  if (problemId === '76') {
    cppTemplate = `class MyStack {
private:
    // Start coding here
    
public:
    MyStack() {
        // Start coding here
    }
    
    void push(int x) {
        // Start coding here
    }
    
    int pop() {
        // Start coding here
        return 0;
    }
    
    int top() {
        // Start coding here
        return 0;
    }
    
    bool empty() {
        // Start coding here
        return true;
    }
};`;
    
    const pyTemplate76 = `class MyStack:
    def __init__(self):
        # Start coding here
        pass
    
    def push(self, x: int) -> None:
        # Start coding here
        pass
    
    def pop(self) -> int:
        # Start coding here
        pass
    
    def top(self) -> int:
        # Start coding here
        pass
    
    def empty(self) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate76 = `public class MyStack {
    // Start coding here
    
    public MyStack() {
        // Start coding here
    }
    
    public void push(int x) {
        // Start coding here
    }
    
    public int pop() {
        // Start coding here
        return 0;
    }
    
    public int top() {
        // Start coding here
        return 0;
    }
    
    public boolean empty() {
        // Start coding here
        return true;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate76, java: javaTemplate76 };
  }

  // Problem 77: Implement Queue using Stacks
  if (problemId === '77') {
    cppTemplate = `class MyQueue {
private:
    // Start coding here
    
public:
    MyQueue() {
        // Start coding here
    }
    
    void push(int x) {
        // Start coding here
    }
    
    int pop() {
        // Start coding here
        return 0;
    }
    
    int peek() {
        // Start coding here
        return 0;
    }
    
    bool empty() {
        // Start coding here
        return true;
    }
};`;
    
    const pyTemplate77 = `class MyQueue:
    def __init__(self):
        # Start coding here
        pass
    
    def push(self, x: int) -> None:
        # Start coding here
        pass
    
    def pop(self) -> int:
        # Start coding here
        pass
    
    def peek(self) -> int:
        # Start coding here
        pass
    
    def empty(self) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate77 = `public class MyQueue {
    // Start coding here
    
    public MyQueue() {
        // Start coding here
    }
    
    public void push(int x) {
        // Start coding here
    }
    
    public int pop() {
        // Start coding here
        return 0;
    }
    
    public int peek() {
        // Start coding here
        return 0;
    }
    
    public boolean empty() {
        // Start coding here
        return true;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate77, java: javaTemplate77 };
  }

  // Problem 78: Design Circular Queue
  if (problemId === '78') {
    cppTemplate = `class MyCircularQueue {
private:
    // Start coding here
    
public:
    MyCircularQueue(int k) {
        // Start coding here
    }
    
    bool enQueue(int value) {
        // Start coding here
        return false;
    }
    
    bool deQueue() {
        // Start coding here
        return false;
    }
    
    int Front() {
        // Start coding here
        return -1;
    }
    
    int Rear() {
        // Start coding here
        return -1;
    }
    
    bool isEmpty() {
        // Start coding here
        return true;
    }
    
    bool isFull() {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate78 = `class MyCircularQueue:
    def __init__(self, k: int):
        # Start coding here
        pass
    
    def enQueue(self, value: int) -> bool:
        # Start coding here
        pass
    
    def deQueue(self) -> bool:
        # Start coding here
        pass
    
    def Front(self) -> int:
        # Start coding here
        pass
    
    def Rear(self) -> int:
        # Start coding here
        pass
    
    def isEmpty(self) -> bool:
        # Start coding here
        pass
    
    def isFull(self) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate78 = `public class MyCircularQueue {
    // Start coding here
    
    public MyCircularQueue(int k) {
        // Start coding here
    }
    
    public boolean enQueue(int value) {
        // Start coding here
        return false;
    }
    
    public boolean deQueue() {
        // Start coding here
        return false;
    }
    
    public int Front() {
        // Start coding here
        return -1;
    }
    
    public int Rear() {
        // Start coding here
        return -1;
    }
    
    public boolean isEmpty() {
        // Start coding here
        return true;
    }
    
    public boolean isFull() {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate78, java: javaTemplate78 };
  }

  // Problem 79: Design HashMap
  if (problemId === '79') {
    cppTemplate = `class MyHashMap {
private:
    // Start coding here
    
public:
    MyHashMap() {
        // Start coding here
    }
    
    void put(int key, int value) {
        // Start coding here
    }
    
    int get(int key) {
        // Start coding here
        return -1;
    }
    
    void remove(int key) {
        // Start coding here
    }
};`;
    
    const pyTemplate79 = `class MyHashMap:
    def __init__(self):
        # Start coding here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Start coding here
        pass
    
    def get(self, key: int) -> int:
        # Start coding here
        pass
    
    def remove(self, key: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate79 = `public class MyHashMap {
    // Start coding here
    
    public MyHashMap() {
        // Start coding here
    }
    
    public void put(int key, int value) {
        // Start coding here
    }
    
    public int get(int key) {
        // Start coding here
        return -1;
    }
    
    public void remove(int key) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate79, java: javaTemplate79 };
  }

  // Problem 80: Design HashSet
  if (problemId === '80') {
    cppTemplate = `class MyHashSet {
private:
    // Start coding here
    
public:
    MyHashSet() {
        // Start coding here
    }
    
    void add(int key) {
        // Start coding here
    }
    
    void remove(int key) {
        // Start coding here
    }
    
    bool contains(int key) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate80 = `class MyHashSet:
    def __init__(self):
        # Start coding here
        pass
    
    def add(self, key: int) -> None:
        # Start coding here
        pass
    
    def remove(self, key: int) -> None:
        # Start coding here
        pass
    
    def contains(self, key: int) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate80 = `public class MyHashSet {
    // Start coding here
    
    public MyHashSet() {
        // Start coding here
    }
    
    public void add(int key) {
        // Start coding here
    }
    
    public void remove(int key) {
        // Start coding here
    }
    
    public boolean contains(int key) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate80, java: javaTemplate80 };
  }

  // Problem 81: Design Linked List
  if (problemId === '81') {
    cppTemplate = `class MyLinkedList {
private:
    // Start coding here
    
public:
    MyLinkedList() {
        // Start coding here
    }
    
    int get(int index) {
        // Start coding here
        return -1;
    }
    
    void addAtHead(int val) {
        // Start coding here
    }
    
    void addAtTail(int val) {
        // Start coding here
    }
    
    void addAtIndex(int index, int val) {
        // Start coding here
    }
    
    void deleteAtIndex(int index) {
        // Start coding here
    }
};`;
    
    const pyTemplate81 = `class MyLinkedList:
    def __init__(self):
        # Start coding here
        pass
    
    def get(self, index: int) -> int:
        # Start coding here
        pass
    
    def addAtHead(self, val: int) -> None:
        # Start coding here
        pass
    
    def addAtTail(self, val: int) -> None:
        # Start coding here
        pass
    
    def addAtIndex(self, index: int, val: int) -> None:
        # Start coding here
        pass
    
    def deleteAtIndex(self, index: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate81 = `public class MyLinkedList {
    // Start coding here
    
    public MyLinkedList() {
        // Start coding here
    }
    
    public int get(int index) {
        // Start coding here
        return -1;
    }
    
    public void addAtHead(int val) {
        // Start coding here
    }
    
    public void addAtTail(int val) {
        // Start coding here
    }
    
    public void addAtIndex(int index, int val) {
        // Start coding here
    }
    
    public void deleteAtIndex(int index) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate81, java: javaTemplate81 };
  }

  // Problem 82: Design Browser History
  if (problemId === '82') {
    cppTemplate = `class BrowserHistory {
private:
    // Start coding here
    
public:
    BrowserHistory(string homepage) {
        // Start coding here
    }
    
    void visit(string url) {
        // Start coding here
    }
    
    string back(int steps) {
        // Start coding here
        return "";
    }
    
    string forward(int steps) {
        // Start coding here
        return "";
    }
};`;
    
    const pyTemplate82 = `class BrowserHistory:
    def __init__(self, homepage: str):
        # Start coding here
        pass
    
    def visit(self, url: str) -> None:
        # Start coding here
        pass
    
    def back(self, steps: int) -> str:
        # Start coding here
        pass
    
    def forward(self, steps: int) -> str:
        # Start coding here
        pass`;
    
    const javaTemplate82 = `public class BrowserHistory {
    // Start coding here
    
    public BrowserHistory(String homepage) {
        // Start coding here
    }
    
    public void visit(String url) {
        // Start coding here
    }
    
    public String back(int steps) {
        // Start coding here
        return "";
    }
    
    public String forward(int steps) {
        // Start coding here
        return "";
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate82, java: javaTemplate82 };
  }

  // Problem 83: Design Underground System
  if (problemId === '83') {
    cppTemplate = `class UndergroundSystem {
private:
    // Start coding here
    
public:
    UndergroundSystem() {
        // Start coding here
    }
    
    void checkIn(int id, string stationName, int t) {
        // Start coding here
    }
    
    void checkOut(int id, string stationName, int t) {
        // Start coding here
    }
    
    double getAverageTime(string startStation, string endStation) {
        // Start coding here
        return 0.0;
    }
};`;
    
    const pyTemplate83 = `class UndergroundSystem:
    def __init__(self):
        # Start coding here
        pass
    
    def checkIn(self, id: int, stationName: str, t: int) -> None:
        # Start coding here
        pass
    
    def checkOut(self, id: int, stationName: str, t: int) -> None:
        # Start coding here
        pass
    
    def getAverageTime(self, startStation: str, endStation: str) -> float:
        # Start coding here
        pass`;
    
    const javaTemplate83 = `public class UndergroundSystem {
    // Start coding here
    
    public UndergroundSystem() {
        // Start coding here
    }
    
    public void checkIn(int id, String stationName, int t) {
        // Start coding here
    }
    
    public void checkOut(int id, String stationName, int t) {
        // Start coding here
    }
    
    public double getAverageTime(String startStation, String endStation) {
        // Start coding here
        return 0.0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate83, java: javaTemplate83 };
  }

  // Problem 84: Design Authentication Manager
  if (problemId === '84') {
    cppTemplate = `class AuthenticationManager {
private:
    int timeToLive;
    // Start coding here
    
public:
    AuthenticationManager(int timeToLive) {
        // Start coding here
    }
    
    void generate(string tokenId, int currentTime) {
        // Start coding here
    }
    
    void renew(string tokenId, int currentTime) {
        // Start coding here
    }
    
    int countUnexpiredTokens(int currentTime) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate84 = `class AuthenticationManager:
    def __init__(self, timeToLive: int):
        # Start coding here
        pass
    
    def generate(self, tokenId: str, currentTime: int) -> None:
        # Start coding here
        pass
    
    def renew(self, tokenId: str, currentTime: int) -> None:
        # Start coding here
        pass
    
    def countUnexpiredTokens(self, currentTime: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate84 = `public class AuthenticationManager {
    private int timeToLive;
    // Start coding here
    
    public AuthenticationManager(int timeToLive) {
        // Start coding here
    }
    
    public void generate(String tokenId, int currentTime) {
        // Start coding here
    }
    
    public void renew(String tokenId, int currentTime) {
        // Start coding here
    }
    
    public int countUnexpiredTokens(int currentTime) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate84, java: javaTemplate84 };
  }

  // Problem 85: Design Leaderboard
  if (problemId === '85') {
    cppTemplate = `class Leaderboard {
private:
    // Start coding here
    
public:
    Leaderboard() {
        // Start coding here
    }
    
    void addScore(int playerId, int score) {
        // Start coding here
    }
    
    int top(int K) {
        // Start coding here
        return 0;
    }
    
    void reset(int playerId) {
        // Start coding here
    }
};`;
    
    const pyTemplate85 = `class Leaderboard:
    def __init__(self):
        # Start coding here
        pass
    
    def addScore(self, playerId: int, score: int) -> None:
        # Start coding here
        pass
    
    def top(self, K: int) -> int:
        # Start coding here
        pass
    
    def reset(self, playerId: int) -> None:
        # Start coding here
        pass`;
    
    const javaTemplate85 = `public class Leaderboard {
    // Start coding here
    
    public Leaderboard() {
        // Start coding here
    }
    
    public void addScore(int playerId, int score) {
        // Start coding here
    }
    
    public int top(int K) {
        // Start coding here
        return 0;
    }
    
    public void reset(int playerId) {
        // Start coding here
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate85, java: javaTemplate85 };
  }

  // Problem 86: Design Parking System
  if (problemId === '86') {
    cppTemplate = `class ParkingSystem {
private:
    // Start coding here
    
public:
    ParkingSystem(int big, int medium, int small) {
        // Start coding here
    }
    
    bool addCar(int carType) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate86 = `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        # Start coding here
        pass
    
    def addCar(self, carType: int) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate86 = `public class ParkingSystem {
    // Start coding here
    
    public ParkingSystem(int big, int medium, int small) {
        // Start coding here
    }
    
    public boolean addCar(int carType) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate86, java: javaTemplate86 };
  }

  // Problem 87: Design Ordered Stream
  if (problemId === '87') {
    cppTemplate = `class OrderedStream {
private:
    // Start coding here
    
public:
    OrderedStream(int n) {
        // Start coding here
    }
    
    vector<string> insert(int idKey, string value) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate87 = `class OrderedStream:
    def __init__(self, n: int):
        # Start coding here
        pass
    
    def insert(self, idKey: int, value: str) -> List[str]:
        # Start coding here
        pass`;
    
    const javaTemplate87 = `public class OrderedStream {
    // Start coding here
    
    public OrderedStream(int n) {
        // Start coding here
    }
    
    public List<String> insert(int idKey, String value) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate87, java: javaTemplate87 };
  }

  // Problem 88: Design Recent Counter
  if (problemId === '88') {
    cppTemplate = `class RecentCounter {
private:
    // Start coding here
    
public:
    RecentCounter() {
        // Start coding here
    }
    
    int ping(int t) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate88 = `class RecentCounter:
    def __init__(self):
        # Start coding here
        pass
    
    def ping(self, t: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate88 = `public class RecentCounter {
    // Start coding here
    
    public RecentCounter() {
        // Start coding here
    }
    
    public int ping(int t) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate88, java: javaTemplate88 };
  }

  // Problem 89: Design Logger Rate Limiter
  if (problemId === '89') {
    cppTemplate = `class Logger {
private:
    // Start coding here
    
public:
    Logger() {
        // Start coding here
    }
    
    bool shouldPrintMessage(int timestamp, string message) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate89 = `class Logger:
    def __init__(self):
        # Start coding here
        pass
    
    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate89 = `public class Logger {
    // Start coding here
    
    public Logger() {
        // Start coding here
    }
    
    public boolean shouldPrintMessage(int timestamp, String message) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate89, java: javaTemplate89 };
  }

  // Problem 90: Design Hit Counter
  if (problemId === '90') {
    cppTemplate = `class HitCounter {
private:
    // Start coding here
    
public:
    HitCounter() {
        // Start coding here
    }
    
    void hit(int timestamp) {
        // Start coding here
    }
    
    int getHits(int timestamp) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate90 = `class HitCounter:
    def __init__(self):
        # Start coding here
        pass
    
    def hit(self, timestamp: int) -> None:
        # Start coding here
        pass
    
    def getHits(self, timestamp: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate90 = `public class HitCounter {
    // Start coding here
    
    public HitCounter() {
        // Start coding here
    }
    
    public void hit(int timestamp) {
        // Start coding here
    }
    
    public int getHits(int timestamp) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate90, java: javaTemplate90 };
  }

  // Problem 91: Design Snake Game
  if (problemId === '91') {
    cppTemplate = `class SnakeGame {
private:
    // Start coding here
    
public:
    SnakeGame(int width, int height, vector<vector<int>>& food) {
        // Start coding here
    }
    
    int move(string direction) {
        // Start coding here
        return -1;
    }
};`;
    
    const pyTemplate91 = `class SnakeGame:
    def __init__(self, width: int, height: int, food: List[List[int]]):
        # Start coding here
        pass
    
    def move(self, direction: str) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate91 = `public class SnakeGame {
    // Start coding here
    
    public SnakeGame(int width, int height, int[][] food) {
        // Start coding here
    }
    
    public int move(String direction) {
        // Start coding here
        return -1;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate91, java: javaTemplate91 };
  }

  // Problem 92: Design Tic-Tac-Toe
  if (problemId === '92') {
    cppTemplate = `class TicTacToe {
private:
    // Start coding here
    
public:
    TicTacToe(int n) {
        // Start coding here
    }
    
    int move(int row, int col, int player) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate92 = `class TicTacToe:
    def __init__(self, n: int):
        # Start coding here
        pass
    
    def move(self, row: int, col: int, player: int) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate92 = `public class TicTacToe {
    // Start coding here
    
    public TicTacToe(int n) {
        // Start coding here
    }
    
    public int move(int row, int col, int player) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate92, java: javaTemplate92 };
  }

  // Problem 93: Design Connect Four
  if (problemId === '93') {
    cppTemplate = `class ConnectFour {
private:
    // Start coding here
    
public:
    ConnectFour(int rows, int cols) {
        // Start coding here
    }
    
    int drop(int col, int player) {
        // Start coding here
        return -1;
    }
    
    bool isGameOver() {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate93 = `class ConnectFour:
    def __init__(self, rows: int, cols: int):
        # Start coding here
        pass
    
    def drop(self, col: int, player: int) -> int:
        # Start coding here
        pass
    
    def isGameOver(self) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate93 = `public class ConnectFour {
    // Start coding here
    
    public ConnectFour(int rows, int cols) {
        // Start coding here
    }
    
    public int drop(int col, int player) {
        // Start coding here
        return -1;
    }
    
    public boolean isGameOver() {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate93, java: javaTemplate93 };
  }

  // Problem 94: Design Minesweeper
  if (problemId === '94') {
    cppTemplate = `class Solution {
public:
    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate94 = `class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        # Start coding here
        pass`;
    
    const javaTemplate94 = `public class Solution {
    public char[][] updateBoard(char[][] board, int[] click) {
        // Start coding here
        return new char[0][0];
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate94, java: javaTemplate94 };
  }

  // Problem 95: Design Excel Sum Formula
  if (problemId === '95') {
    cppTemplate = `class Excel {
private:
    // Start coding here
    
public:
    Excel(int height, char width) {
        // Start coding here
    }
    
    void set(int row, char column, int val) {
        // Start coding here
    }
    
    int get(int row, char column) {
        // Start coding here
        return 0;
    }
    
    int sum(int row, char column, vector<string> numbers) {
        // Start coding here
        return 0;
    }
};`;
    
    const pyTemplate95 = `class Excel:
    def __init__(self, height: int, width: str):
        # Start coding here
        pass
    
    def set(self, row: int, column: str, val: int) -> None:
        # Start coding here
        pass
    
    def get(self, row: int, column: str) -> int:
        # Start coding here
        pass
    
    def sum(self, row: int, column: str, numbers: List[str]) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate95 = `public class Excel {
    // Start coding here
    
    public Excel(int height, char width) {
        // Start coding here
    }
    
    public void set(int row, char column, int val) {
        // Start coding here
    }
    
    public int get(int row, char column) {
        // Start coding here
        return 0;
    }
    
    public int sum(int row, char column, String[] numbers) {
        // Start coding here
        return 0;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate95, java: javaTemplate95 };
  }

  // Problem 96: Design File System
  if (problemId === '96') {
    cppTemplate = `class FileSystem {
private:
    // Start coding here
    
public:
    FileSystem() {
        // Start coding here
    }
    
    bool createPath(string path, int value) {
        // Start coding here
        return false;
    }
    
    int get(string path) {
        // Start coding here
        return -1;
    }
};`;
    
    const pyTemplate96 = `class FileSystem:
    def __init__(self):
        # Start coding here
        pass
    
    def createPath(self, path: str, value: int) -> bool:
        # Start coding here
        pass
    
    def get(self, path: str) -> int:
        # Start coding here
        pass`;
    
    const javaTemplate96 = `public class FileSystem {
    // Start coding here
    
    public FileSystem() {
        // Start coding here
    }
    
    public boolean createPath(String path, int value) {
        // Start coding here
        return false;
    }
    
    public int get(String path) {
        // Start coding here
        return -1;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate96, java: javaTemplate96 };
  }

  // Problem 97: Design Search Autocomplete System
  if (problemId === '97') {
    cppTemplate = `class AutocompleteSystem {
private:
    // Start coding here
    
public:
    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {
        // Start coding here
    }
    
    vector<string> input(char c) {
        // Start coding here
        return {};
    }
};`;
    
    const pyTemplate97 = `class AutocompleteSystem:
    def __init__(self, sentences: List[str], times: List[int]):
        # Start coding here
        pass
    
    def input(self, c: str) -> List[str]:
        # Start coding here
        pass`;
    
    const javaTemplate97 = `public class AutocompleteSystem {
    // Start coding here
    
    public AutocompleteSystem(String[] sentences, int[] times) {
        // Start coding here
    }
    
    public List<String> input(char c) {
        // Start coding here
        return new ArrayList<>();
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate97, java: javaTemplate97 };
  }

  // Problem 98: Design Word Dictionary
  if (problemId === '98') {
    cppTemplate = `class WordDictionary {
private:
    // Start coding here
    
public:
    WordDictionary() {
        // Start coding here
    }
    
    void addWord(string word) {
        // Start coding here
    }
    
    bool search(string word) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate98 = `class WordDictionary:
    def __init__(self):
        # Start coding here
        pass
    
    def addWord(self, word: str) -> None:
        # Start coding here
        pass
    
    def search(self, word: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate98 = `public class WordDictionary {
    // Start coding here
    
    public WordDictionary() {
        // Start coding here
    }
    
    public void addWord(String word) {
        // Start coding here
    }
    
    public boolean search(String word) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate98, java: javaTemplate98 };
  }

  // Problem 99: Design Magic Dictionary
  if (problemId === '99') {
    cppTemplate = `class MagicDictionary {
private:
    // Start coding here
    
public:
    MagicDictionary() {
        // Start coding here
    }
    
    void buildDict(vector<string> dictionary) {
        // Start coding here
    }
    
    bool search(string searchWord) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate99 = `class MagicDictionary:
    def __init__(self):
        # Start coding here
        pass
    
    def buildDict(self, dictionary: List[str]) -> None:
        # Start coding here
        pass
    
    def search(self, searchWord: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate99 = `public class MagicDictionary {
    // Start coding here
    
    public MagicDictionary() {
        // Start coding here
    }
    
    public void buildDict(String[] dictionary) {
        // Start coding here
    }
    
    public boolean search(String searchWord) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate99, java: javaTemplate99 };
  }

  // Problem 100: Design Add and Search Words
  if (problemId === '100') {
    cppTemplate = `class WordDictionary {
private:
    // Start coding here
    
public:
    WordDictionary() {
        // Start coding here
    }
    
    void addWord(string word) {
        // Start coding here
    }
    
    bool search(string word) {
        // Start coding here
        return false;
    }
};`;
    
    const pyTemplate100 = `class WordDictionary:
    def __init__(self):
        # Start coding here
        pass
    
    def addWord(self, word: str) -> None:
        # Start coding here
        pass
    
    def search(self, word: str) -> bool:
        # Start coding here
        pass`;
    
    const javaTemplate100 = `public class WordDictionary {
    // Start coding here
    
    public WordDictionary() {
        // Start coding here
    }
    
    public void addWord(String word) {
        // Start coding here
    }
    
    public boolean search(String word) {
        // Start coding here
        return false;
    }
}`;
    
    return { cpp: cppTemplate, python: pyTemplate100, java: javaTemplate100 };
  }

  // Linked list problems -> provide ListNode skeleton and a placeholder method
  if (tags.includes('linked-list')) {
    cppTemplate = `struct ListNode { 
    int val; 
    ListNode* next; 
    ListNode():val(0),next(nullptr){} 
    ListNode(int x):val(x),next(nullptr){} 
    ListNode(int x, ListNode* n):val(x),next(n){} 
};

class Solution {
public:
    // Replace 'yourFunction' with the required function name/signature (e.g. reverseList)
    ListNode* yourFunction(ListNode* head) {
        // Start coding here
        return nullptr;
    }
};`;
  }

  // Tree problems -> provide TreeNode skeleton
  if (tags.includes('tree') || tags.includes('binary-tree')) {
    cppTemplate = `struct TreeNode { 
    int val; 
    TreeNode* left; 
    TreeNode* right; 
    TreeNode():val(0),left(nullptr),right(nullptr){} 
    TreeNode(int x):val(x),left(nullptr),right(nullptr){} 
    TreeNode(int x, TreeNode* l, TreeNode* r):val(x),left(l),right(r){} 
};

class Solution {
public:
    // Replace 'yourFunction' with the required signature, e.g. TreeNode* yourFunction(TreeNode* root)
    void yourFunction(TreeNode* root) {
        // Start coding here
    }
};`;
  }

  // Array problems
  if (tags.includes('array') || tags.includes('arrays')) {
    cppTemplate = `class Solution {
public:
    // Example signature: replace with actual return type and name
    // int yourFunction(std::vector<int>& nums) {
    //     // Start coding here
    //     return 0;
    // }
};`;
  }

  // String problems
  if (tags.includes('string')) {
    cppTemplate = `class Solution {
public:
    // Example signature: replace with actual return type and name
    // int yourFunction(const std::string& s) {
    //     // Start coding here
    //     return 0;
    // }
};`;
  }

  // Graph problems
  if (tags.includes('graph')) {
    cppTemplate = `// Graph represented as adjacency list: std::vector<std::vector<int>> adj;
class Solution {
public:
    // Replace with required signature
    void yourFunction(int n, const std::vector<std::vector<int>>& adj) {
        // Start coding here
    }
};`;
  }
  return { cpp: cppTemplate, python: pyTemplate, java: javaTemplate };
};

const generateTestCases = (problemId: string) => {
  // Comprehensive test cases with visible (Run) and hidden (Submit) test cases
  switch (problemId) {
    case '1': // Reverse a Singly Linked List
      return [
        // Visible test cases (users see these when clicking Run)
        { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]', description: 'Basic linked list reversal', isHidden: false },
        { input: '[]', output: '[]', description: 'Empty list', isHidden: false },
        { input: '[1]', output: '[1]', description: 'Single node', isHidden: false },

        // Hidden test cases (used only on Submit)
        { input: '[1,2,2,3,4,5]', output: '[5,4,3,2,2,1]', description: 'Even-length with duplicates', isHidden: true },
        { input: '[9,8,7,6,5,4,3,2,1]', output: '[1,2,3,4,5,6,7,8,9]', description: 'Long reverse', isHidden: true },
        { input: '[0,0,0,0]', output: '[0,0,0,0]', description: 'All equal elements', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10]', output: '[10,9,8,7,6,5,4,3,2,1]', description: 'Longer list', isHidden: true },
        { input: '[100, -1, 50]', output: '[50, -1, 100]', description: 'Mixed values', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]', output: '[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]', description: 'Very long list', isHidden: true }
      ];

    case '2': // Detect Cycle in Linked List
      return [
        // Visible test cases
        { input: '[3,2,0,-4]', output: 'true', description: 'Cycle at position 1 (2->0->-4->2->...)', isHidden: false },
        { input: '[1,2]', output: 'true', description: 'Cycle at position 0 (1->2->1->2->...)', isHidden: false },
        { input: '[1,2,3,4,5]', output: 'false', description: 'No cycle (1->2->3->4->5->null)', isHidden: false },

        // Hidden test cases
        { input: '[]', output: 'false', description: 'Empty list', isHidden: true },
        { input: '[1]', output: 'false', description: 'Single node without cycle', isHidden: true },
        { input: '[1,2,3,4,5]', output: 'true', description: 'Cycle at position 2 (1->2->3->4->5->3->...)', isHidden: true },
        { input: '[1]', output: 'true', description: 'Self cycle at position 0 (1->1->1->...)', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10]', output: 'true', description: 'Cycle at position 5 (1->2->3->4->5->6->7->8->9->10->6->...)', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10]', output: 'false', description: 'Long list without cycle', isHidden: true }
      ];

    case '3': // Find Missing Number
      return [
        // Visible test cases
        { input: 'nums = [3,0,1], n = 3', output: '2', description: 'Array [3,0,1] with n=3, range 0-2, missing 2', isHidden: false },
        { input: 'nums = [0,1], n = 3', output: '2', description: 'Array [0,1] with n=3, range 0-2, missing 2', isHidden: false },
        { input: 'nums = [9,6,4,2,3,5,7,0,1], n = 9', output: '8', description: 'Array [9,6,4,2,3,5,7,0,1] with n=9, range 0-8, missing 8', isHidden: false },

        // Hidden test cases
        { input: 'nums = [0], n = 2', output: '1', description: 'Array [0] with n=2, range 0-1, missing 1', isHidden: true },
        { input: 'nums = [1], n = 2', output: '0', description: 'Array [1] with n=2, range 0-1, missing 0', isHidden: true },
        { input: 'nums = [0,1,2,3,4,5,6,7,8,9], n = 10', output: '10', description: 'Array [0,1,2,3,4,5,6,7,8,9] with n=10, range 0-9, missing 10', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9,10], n = 10', output: '0', description: 'Array [1,2,3,4,5,6,7,8,9,10] with n=10, range 0-9, missing 0', isHidden: true },
        { input: 'nums = [0,1,2,3,4,6,7,8,9,10], n = 10', output: '5', description: 'Array [0,1,2,3,4,6,7,8,9,10] with n=10, range 0-9, missing 5', isHidden: true }
      ];

    case '4': // Valid Parentheses
      return [
        // Visible test cases
        { input: '"()"', output: 'true', description: 'Simple parentheses', isHidden: false },
        { input: '"()[]{}"', output: 'true', description: 'Mixed brackets', isHidden: false },
        { input: '"(]"', output: 'false', description: 'Invalid brackets', isHidden: false },

        // Hidden test cases
        { input: '""', output: 'true', description: 'Empty string', isHidden: true },
        { input: '"("', output: 'false', description: 'Single opening', isHidden: true },
        { input: '")"', output: 'false', description: 'Single closing', isHidden: true },
        { input: '"([{}])"', output: 'true', description: 'Nested brackets', isHidden: true },
        { input: '"((("', output: 'false', description: 'Multiple opening', isHidden: true },
        { input: '")))"', output: 'false', description: 'Multiple closing', isHidden: true },
        { input: '"{[]}"', output: 'true', description: 'Square brackets inside curly', isHidden: true }
      ];

    case '5': // Maximum Subarray Sum (Kadane)
      return [
        // Visible test cases
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6', description: 'Standard case', isHidden: false },
        { input: '[1]', output: '1', description: 'Single element', isHidden: false },
        { input: '[5,4,-1,7,8]', output: '23', description: 'All positive', isHidden: false },

        // Hidden test cases
        { input: '[-1]', output: '-1', description: 'Single negative', isHidden: true },
        { input: '[-2,-1]', output: '-1', description: 'All negative', isHidden: true },
        { input: '[1,2,3,4,5]', output: '15', description: 'All positive sequence', isHidden: true },
        { input: '[-1,-2,-3,-4,-5]', output: '-1', description: 'All negative sequence', isHidden: true },
        { input: '[0,0,0,0,0]', output: '0', description: 'All zeros', isHidden: true },
        { input: '[1,-2,3,-4,5,-6,7]', output: '7', description: 'Alternating positive negative', isHidden: true }
      ];

    case '6': // Binary Search
      return [
        // Visible test cases
        { input: '[-1,0,3,5,9,12], target = 9', output: '4', description: 'Target found', isHidden: false },
        { input: '[-1,0,3,5,9,12], target = 2', output: '-1', description: 'Target not found', isHidden: false },
        { input: '[5], target = 5', output: '0', description: 'Single element found', isHidden: false },

        // Hidden test cases
        { input: '[5], target = -5', output: '-1', description: 'Single element not found', isHidden: true },
        { input: '[], target = 1', output: '-1', description: 'Empty array', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10], target = 1', output: '0', description: 'First element', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10], target = 10', output: '9', description: 'Last element', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10], target = 5', output: '4', description: 'Middle element', isHidden: true },
        { input: '[1,1,1,1,1], target = 1', output: '2', description: 'Duplicate elements', isHidden: true }
      ];

    case '7': // Longest Substring Without Repeating
      return [
        // Visible test cases
        { input: '"abcabcbb"', output: '3', description: 'Standard case', isHidden: false },
        { input: '"bbbbb"', output: '1', description: 'All same characters', isHidden: false },
        { input: '"pwwkew"', output: '3', description: 'Mixed case', isHidden: false },

        // Hidden test cases
        { input: '""', output: '0', description: 'Empty string', isHidden: true },
        { input: '"a"', output: '1', description: 'Single character', isHidden: true },
        { input: '"ab"', output: '2', description: 'Two different characters', isHidden: true },
        { input: '"aa"', output: '1', description: 'Two same characters', isHidden: true },
        { input: '"abcdefghijklmnopqrstuvwxyz"', output: '26', description: 'All unique characters', isHidden: true },
        { input: '"aab"', output: '2', description: 'Repeating at start', isHidden: true },
        { input: '"dvdf"', output: '3', description: 'Repeating in middle', isHidden: true }
      ];

    case '8': // Merge Two Sorted Arrays
      return [
        // Visible test cases
        { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]', description: 'Standard merge', isHidden: false },
        { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]', description: 'Empty second array', isHidden: false },
        { input: 'nums1 = [0], m = 0, nums2 = [1], n = 1', output: '[0,1]', description: 'Empty first array', isHidden: false },

        // Hidden test cases
        { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [4,5,6], n = 3', output: '[1,2,3,4,5,6]', description: 'No overlap', isHidden: true },
        { input: 'nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3', output: '[1,2,3,4,5,6]', description: 'Second array smaller', isHidden: true },
        { input: 'nums1 = [1,1,1,0,0,0], m = 3, nums2 = [1,1,1], n = 3', output: '[1,1,1,1,1,1]', description: 'All same values', isHidden: true },
        { input: 'nums1 = [1,3,5,0,0,0], m = 3, nums2 = [2,4,6], n = 3', output: '[1,2,3,4,5,6]', description: 'Alternating values', isHidden: true }
      ];

    case '9': // Kth Largest Element
      return [
        // Visible test cases
        { input: '[3,2,1,5,6,4], k = 2', output: '5', description: 'Second largest', isHidden: false },
        { input: '[3,2,3,1,2,4,5,5,6], k = 4', output: '4', description: 'Fourth largest', isHidden: false },
        { input: '[1], k = 1', output: '1', description: 'Single element', isHidden: false },

        // Hidden test cases
        { input: '[1,2,3,4,5], k = 1', output: '5', description: 'Largest element', isHidden: true },
        { input: '[1,2,3,4,5], k = 5', output: '1', description: 'Smallest element', isHidden: true },
        { input: '[5,5,5,5,5], k = 3', output: '5', description: 'All same values', isHidden: true },
        { input: '[1,1,2,2,3,3], k = 2', output: '3', description: 'With duplicates', isHidden: true },
        { input: '[9,8,7,6,5,4,3,2,1], k = 5', output: '5', description: 'Reverse sorted', isHidden: true }
      ];

    case '10': // Queue Using Stacks
      return [
        // Visible test cases
        { input: 'push(1), push(2), peek(), pop(), empty()', output: '1, 1, false', description: 'Basic operations', isHidden: false },
        { input: 'push(1), pop(), empty()', output: '1, true', description: 'Single element', isHidden: false },
        { input: 'empty()', output: 'true', description: 'Empty queue', isHidden: false },

        // Hidden test cases
        { input: 'push(1), push(2), push(3), pop(), pop(), pop(), empty()', output: '1, 2, 3, true', description: 'Multiple operations', isHidden: true },
        { input: 'push(1), peek(), peek(), pop(), empty()', output: '1, 1, 1, true', description: 'Multiple peeks', isHidden: true },
        { input: 'push(1), push(2), pop(), push(3), pop(), pop()', output: '1, 2, 3', description: 'Mixed operations', isHidden: true },
        { input: 'push(0), push(-1), push(100), pop(), peek(), pop()', output: '0, -1, -1', description: 'Mixed values', isHidden: true }
      ];

    case '11': // Binary Tree Traversals
      return [
        // Visible test cases
        { input: '[1,null,2,3]', output: 'inorder: [1,3,2], preorder: [1,2,3], postorder: [3,2,1]', description: 'Basic tree', isHidden: false },
        { input: '[]', output: 'inorder: [], preorder: [], postorder: []', description: 'Empty tree', isHidden: false },
        { input: '[1]', output: 'inorder: [1], preorder: [1], postorder: [1]', description: 'Single node', isHidden: false },

        // Hidden test cases
        { input: '[1,2,3,4,5]', output: 'inorder: [4,2,5,1,3], preorder: [1,2,4,5,3], postorder: [4,5,2,3,1]', description: 'Complete binary tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7]', output: 'inorder: [4,2,5,1,6,3,7], preorder: [1,2,4,5,3,6,7], postorder: [4,5,2,6,7,3,1]', description: 'Full binary tree', isHidden: true },
        { input: '[1,null,2,null,3]', output: 'inorder: [1,2,3], preorder: [1,2,3], postorder: [3,2,1]', description: 'Right skewed tree', isHidden: true },
        { input: '[1,2,null,3]', output: 'inorder: [3,2,1], preorder: [1,2,3], postorder: [3,2,1]', description: 'Left skewed tree', isHidden: true }
      ];

    case '12': // QuickSort Implementation
      return [
        // Visible test cases
        { input: '[64,34,25,12,22,11,90]', output: '[11,12,22,25,34,64,90]', description: 'Standard array', isHidden: false },
        { input: '[1]', output: '[1]', description: 'Single element', isHidden: false },
        { input: '[5,4,3,2,1]', output: '[1,2,3,4,5]', description: 'Reverse sorted', isHidden: false },

        // Hidden test cases
        { input: '[1,1,1,1,1]', output: '[1,1,1,1,1]', description: 'All same elements', isHidden: true },
        { input: '[]', output: '[]', description: 'Empty array', isHidden: true },
        { input: '[1,2,3,4,5]', output: '[1,2,3,4,5]', description: 'Already sorted', isHidden: true },
        { input: '[3,1,4,1,5,9,2,6]', output: '[1,1,2,3,4,5,6,9]', description: 'Random array', isHidden: true },
        { input: '[9,8,7,6,5,4,3,2,1]', output: '[1,2,3,4,5,6,7,8,9]', description: 'Reverse sorted large', isHidden: true }
      ];

    case '13': // MergeSort Implementation
      return [
        // Visible test cases
        { input: '[38,27,43,3,9,82,10]', output: '[3,9,10,27,38,43,82]', description: 'Standard array', isHidden: false },
        { input: '[1]', output: '[1]', description: 'Single element', isHidden: false },
        { input: '[5,4,3,2,1]', output: '[1,2,3,4,5]', description: 'Reverse sorted', isHidden: false },

        // Hidden test cases
        { input: '[1,1,1,1,1]', output: '[1,1,1,1,1]', description: 'All same elements', isHidden: true },
        { input: '[]', output: '[]', description: 'Empty array', isHidden: true },
        { input: '[1,2,3,4,5]', output: '[1,2,3,4,5]', description: 'Already sorted', isHidden: true },
        { input: '[64,34,25,12,22,11,90]', output: '[11,12,22,25,34,64,90]', description: 'Random array', isHidden: true },
        { input: '[9,8,7,6,5,4,3,2,1]', output: '[1,2,3,4,5,6,7,8,9]', description: 'Reverse sorted large', isHidden: true }
      ];

    case '14': // Detect Cycle in Directed Graph
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3],[3,0]]', output: 'true', description: 'Cycle exists', isHidden: false },
        { input: 'n = 3, edges = [[0,1],[1,2]]', output: 'false', description: 'No cycle', isHidden: false },
        { input: 'n = 2, edges = [[0,1],[1,0]]', output: 'true', description: 'Self cycle', isHidden: false },

        // Hidden test cases
        { input: 'n = 1, edges = []', output: 'false', description: 'Single node no edges', isHidden: true },
        { input: 'n = 3, edges = [[0,1],[1,2],[2,0]]', output: 'true', description: 'Triangle cycle', isHidden: true },
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3]]', output: 'false', description: 'Linear path', isHidden: true },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4],[4,0]]', output: 'true', description: 'Large cycle', isHidden: true },
        { input: 'n = 3, edges = [[0,1],[0,2],[1,2]]', output: 'false', description: 'DAG no cycle', isHidden: true }
      ];

    case '15': // Number of Islands
      return [
        // Visible test cases
        { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', description: 'Single island', isHidden: false },
        { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', description: 'Multiple islands', isHidden: false },
        { input: '[["0","0","0","0","0"],["0","0","0","0","0"]]', output: '0', description: 'No islands', isHidden: false },

        // Hidden test cases
        { input: '[["1"]]', output: '1', description: 'Single cell island', isHidden: true },
        { input: '[["0"]]', output: '0', description: 'Single cell water', isHidden: true },
        { input: '[["1","1","1"],["1","1","1"],["1","1","1"]]', output: '1', description: 'All land', isHidden: true },
        { input: '[["1","0","1","0","1"],["0","1","0","1","0"],["1","0","1","0","1"]]', output: '9', description: 'Checkerboard pattern', isHidden: true },
        { input: '[["1","1","1","1","1"],["1","0","0","0","1"],["1","0","1","0","1"],["1","0","0","0","1"],["1","1","1","1","1"]]', output: '2', description: 'Island with lake', isHidden: true }
      ];

    case '16': // BFS Shortest Path
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3]], start = 0, end = 3', output: '3', description: 'Linear path', isHidden: false },
        { input: 'n = 3, edges = [[0,1],[1,2]], start = 0, end = 2', output: '2', description: 'Short path', isHidden: false },
        { input: 'n = 2, edges = [[0,1]], start = 0, end = 1', output: '1', description: 'Direct edge', isHidden: false },

        // Hidden test cases
        { input: 'n = 3, edges = [[0,1],[1,2]], start = 0, end = 0', output: '0', description: 'Same start and end', isHidden: true },
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3]], start = 0, end = 4', output: '-1', description: 'Invalid end node', isHidden: true },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4],[0,4]], start = 0, end = 4', output: '1', description: 'Shortest path exists', isHidden: true },
        { input: 'n = 3, edges = [[0,1]], start = 0, end = 2', output: '-1', description: 'No path exists', isHidden: true },
        { input: 'n = 6, edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[0,5]], start = 0, end = 5', output: '1', description: 'Direct path vs long path', isHidden: true }
      ];

    case '17': // Topological Sort
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3] or [0,2,1,3]', description: 'Valid DAG', isHidden: false },
        { input: 'n = 2, edges = [[0,1]]', output: '[1,0]', description: 'Simple dependency', isHidden: false },
        { input: 'n = 3, edges = []', output: '[0,1,2] or [0,2,1] or [1,0,2] or [1,2,0] or [2,0,1] or [2,1,0]', description: 'No dependencies', isHidden: false },

        // Hidden test cases
        { input: 'n = 1, edges = []', output: '[0]', description: 'Single node', isHidden: true },
        { input: 'n = 3, edges = [[0,1],[1,2],[2,0]]', output: '[]', description: 'Cycle exists', isHidden: true },
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3],[3,0]]', output: '[]', description: 'Large cycle', isHidden: true },
        { input: 'n = 5, edges = [[0,1],[0,2],[1,3],[2,3],[3,4]]', output: '[4,3,1,2,0] or [4,3,2,1,0]', description: 'Complex DAG', isHidden: true },
        { input: 'n = 3, edges = [[0,1],[0,2]]', output: '[1,2,0] or [2,1,0]', description: 'Multiple dependencies', isHidden: true }
      ];

    case '18': // Edit Distance
      return [
        // Visible test cases
        { input: 'word1 = "horse", word2 = "ros"', output: '3', description: 'Standard case', isHidden: false },
        { input: 'word1 = "intention", word2 = "execution"', output: '5', description: 'Long words', isHidden: false },
        { input: 'word1 = "", word2 = ""', output: '0', description: 'Empty strings', isHidden: false },

        // Hidden test cases
        { input: 'word1 = "a", word2 = "b"', output: '1', description: 'Single character different', isHidden: true },
        { input: 'word1 = "abc", word2 = "abc"', output: '0', description: 'Same strings', isHidden: true },
        { input: 'word1 = "abc", word2 = "def"', output: '3', description: 'Completely different', isHidden: true },
        { input: 'word1 = "abc", word2 = ""', output: '3', description: 'One empty string', isHidden: true },
        { input: 'word1 = "", word2 = "abc"', output: '3', description: 'Other empty string', isHidden: true },
        { input: 'word1 = "abcd", word2 = "acd"', output: '1', description: 'One deletion', isHidden: true }
      ];

    case '19': // Palindromic Substrings
      return [
        // Visible test cases
        { input: '"abc"', output: '3', description: 'Single characters', isHidden: false },
        { input: '"aaa"', output: '6', description: 'Multiple palindromes', isHidden: false },
        { input: '"aba"', output: '4', description: 'Mixed palindromes', isHidden: false },

        // Hidden test cases
        { input: '""', output: '0', description: 'Empty string', isHidden: true },
        { input: '"a"', output: '1', description: 'Single character', isHidden: true },
        { input: '"aa"', output: '3', description: 'Two same characters', isHidden: true },
        { input: '"ab"', output: '2', description: 'Two different characters', isHidden: true },
        { input: '"racecar"', output: '10', description: 'Long palindrome', isHidden: true },
        { input: '"aaaa"', output: '10', description: 'All same characters', isHidden: true }
      ];

    case '20': // Longest Consecutive Sequence
      return [
        // Visible test cases
        { input: '[100,4,200,1,3,2]', output: '4', description: 'Standard case', isHidden: false },
        { input: '[0,3,7,2,5,8,4,6,0,1]', output: '9', description: 'Long sequence', isHidden: false },
        { input: '[1]', output: '1', description: 'Single element', isHidden: false },

        // Hidden test cases
        { input: '[]', output: '0', description: 'Empty array', isHidden: true },
        { input: '[1,2,3,4,5]', output: '5', description: 'Consecutive sequence', isHidden: true },
        { input: '[5,4,3,2,1]', output: '5', description: 'Reverse consecutive', isHidden: true },
        { input: '[1,1,1,1]', output: '1', description: 'All same elements', isHidden: true },
        { input: '[1,3,5,7,9]', output: '1', description: 'No consecutive elements', isHidden: true },
        { input: '[1,2,3,5,6,7,8,9]', output: '5', description: 'Multiple sequences', isHidden: true }
      ];

    case '21': // Merge Two Sorted Linked Lists
      return [
        // Visible test cases
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', description: 'Standard merge', isHidden: false },
        { input: 'list1 = [], list2 = []', output: '[]', description: 'Empty lists', isHidden: false },
        { input: 'list1 = [], list2 = [0]', output: '[0]', description: 'One empty list', isHidden: false },

        // Hidden test cases
        { input: 'list1 = [1,2,3], list2 = [4,5,6]', output: '[1,2,3,4,5,6]', description: 'No overlap', isHidden: true },
        { input: 'list1 = [4,5,6], list2 = [1,2,3]', output: '[1,2,3,4,5,6]', description: 'Second list smaller', isHidden: true },
        { input: 'list1 = [1,1,1], list2 = [1,1,1]', output: '[1,1,1,1,1,1]', description: 'All same values', isHidden: true },
        { input: 'list1 = [1], list2 = [2]', output: '[1,2]', description: 'Single elements', isHidden: true },
        { input: 'list1 = [1,3,5], list2 = [2,4,6]', output: '[1,2,3,4,5,6]', description: 'Alternating values', isHidden: true }
      ];

    case '22': // Intersection of Two Linked Lists
      return [
        // Visible test cases
        { input: 'listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3', output: '8', description: 'Intersection exists', isHidden: false },
        { input: 'listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1', output: '2', description: 'Another intersection', isHidden: false },
        { input: 'listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2', output: 'null', description: 'No intersection', isHidden: false },

        // Hidden test cases
        { input: 'listA = [], listB = []', output: 'null', description: 'Empty lists', isHidden: true },
        { input: 'listA = [1], listB = [1]', output: '1', description: 'Same single node', isHidden: true },
        { input: 'listA = [1,2,3], listB = [4,5,6]', output: 'null', description: 'No intersection', isHidden: true },
        { input: 'listA = [1,2,3,4,5], listB = [6,7,3,4,5]', output: '3', description: 'Intersection in middle', isHidden: true },
        { input: 'listA = [1,2,3], listB = [1,2,3]', output: '1', description: 'Same lists', isHidden: true }
      ];

    case '23': // Remove Nth Node From End
      return [
        // Visible test cases
        { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', description: 'Remove second from end', isHidden: false },
        { input: 'head = [1], n = 1', output: '[]', description: 'Remove only node', isHidden: false },
        { input: 'head = [1,2], n = 1', output: '[1]', description: 'Remove last node', isHidden: false },

        // Hidden test cases
        { input: 'head = [1,2,3,4,5], n = 1', output: '[1,2,3,4]', description: 'Remove last node', isHidden: true },
        { input: 'head = [1,2,3,4,5], n = 5', output: '[2,3,4,5]', description: 'Remove first node', isHidden: true },
        { input: 'head = [1,2,3], n = 2', output: '[1,3]', description: 'Remove middle node', isHidden: true },
        { input: 'head = [1,2,3,4,5], n = 3', output: '[1,2,4,5]', description: 'Remove third from end', isHidden: true },
        { input: 'head = [1,2,3,4,5], n = 4', output: '[1,3,4,5]', description: 'Remove second node', isHidden: true }
      ];

    case '24': // Copy List with Random Pointer
      return [
        // Visible test cases
        { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', description: 'Standard case', isHidden: false },
        { input: 'head = [[1,1],[2,1]]', output: '[[1,1],[2,1]]', description: 'Self reference', isHidden: false },
        { input: 'head = [[3,null],[3,0],[3,null]]', output: '[[3,null],[3,0],[3,null]]', description: 'Multiple same values', isHidden: false },

        // Hidden test cases
        { input: 'head = null', output: 'null', description: 'Empty list', isHidden: true },
        { input: 'head = [[1,null]]', output: '[[1,null]]', description: 'Single node', isHidden: true },
        { input: 'head = [[1,1]]', output: '[[1,1]]', description: 'Single node self reference', isHidden: true },
        { input: 'head = [[1,null],[2,0],[3,1]]', output: '[[1,null],[2,0],[3,1]]', description: 'Linear references', isHidden: true },
        { input: 'head = [[1,2],[2,0],[3,1]]', output: '[[1,2],[2,0],[3,1]]', description: 'Circular references', isHidden: true }
      ];

    case '25': // Level Order Traversal
      return [
        // Visible test cases
        { input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', description: 'Standard tree', isHidden: false },
        { input: '[1]', output: '[[1]]', description: 'Single node', isHidden: false },
        { input: '[]', output: '[]', description: 'Empty tree', isHidden: false },

        // Hidden test cases
        { input: '[1,2,3,4,5]', output: '[[1],[2,3],[4,5]]', description: 'Complete binary tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7]', output: '[[1],[2,3],[4,5,6,7]]', description: 'Full binary tree', isHidden: true },
        { input: '[1,null,2,null,3]', output: '[[1],[2],[3]]', description: 'Right skewed tree', isHidden: true },
        { input: '[1,2,null,3]', output: '[[1],[2],[3]]', description: 'Left skewed tree', isHidden: true },
        { input: '[1,2,3,4,null,null,5]', output: '[[1],[2,3],[4,5]]', description: 'Unbalanced tree', isHidden: true }
      ];

    case '26': // Lowest Common Ancestor
      return [
        // Visible test cases
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', description: 'Standard case', isHidden: false },
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', description: 'One is ancestor', isHidden: false },
        { input: 'root = [1,2], p = 1, q = 2', output: '1', description: 'Simple case', isHidden: false },

        // Hidden test cases
        { input: 'root = [1], p = 1, q = 1', output: '1', description: 'Same node', isHidden: true },
        { input: 'root = [1,2,3], p = 2, q = 3', output: '1', description: 'Root is LCA', isHidden: true },
        { input: 'root = [1,2,3,4,5], p = 4, q = 5', output: '2', description: 'Left subtree LCA', isHidden: true },
        { input: 'root = [1,2,3,4,5], p = 2, q = 4', output: '2', description: 'One is descendant', isHidden: true },
        { input: 'root = [1,2,3,4,5,6,7], p = 4, q = 6', output: '1', description: 'Different subtrees', isHidden: true }
      ];

    case '27': // Diameter of Binary Tree
      return [
        // Visible test cases
        { input: '[1,2,3,4,5]', output: '3', description: 'Standard case', isHidden: false },
        { input: '[1,2]', output: '1', description: 'Simple case', isHidden: false },
        { input: '[1]', output: '0', description: 'Single node', isHidden: false },

        // Hidden test cases
        { input: '[]', output: '0', description: 'Empty tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7]', output: '4', description: 'Full binary tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9]', output: '5', description: 'Larger tree', isHidden: true },
        { input: '[1,null,2,null,3,null,4]', output: '3', description: 'Right skewed tree', isHidden: true },
        { input: '[1,2,null,3,null,4]', output: '3', description: 'Left skewed tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]', output: '6', description: 'Complete binary tree', isHidden: true }
      ];

    case '28': // Symmetric Tree
      return [
        // Visible test cases
        { input: '[1,2,2,3,4,4,3]', output: 'true', description: 'Symmetric tree', isHidden: false },
        { input: '[1,2,2,null,3,null,3]', output: 'false', description: 'Asymmetric tree', isHidden: false },
        { input: '[1]', output: 'true', description: 'Single node', isHidden: false },

        // Hidden test cases
        { input: '[]', output: 'true', description: 'Empty tree', isHidden: true },
        { input: '[1,2,2]', output: 'true', description: 'Simple symmetric', isHidden: true },
        { input: '[1,2,3]', output: 'false', description: 'Simple asymmetric', isHidden: true },
        { input: '[1,2,2,3,4,4,3,5,6,7,8,8,7,6,5]', output: 'true', description: 'Complex symmetric', isHidden: true },
        { input: '[1,2,2,3,4,4,3,5,6,7,8,8,7,6,9]', output: 'false', description: 'Complex asymmetric', isHidden: true },
        { input: '[1,2,2,3,4,4,3,5,6,7,8,8,7,6,5,9,10,11,12,12,11,10,9]', output: 'true', description: 'Very complex symmetric', isHidden: true }
      ];

    case '29': // Balanced Binary Tree
      return [
        // Visible test cases
        { input: '[3,9,20,null,null,15,7]', output: 'true', description: 'Balanced tree', isHidden: false },
        { input: '[1,2,2,3,3,null,null,4,4]', output: 'false', description: 'Unbalanced tree', isHidden: false },
        { input: '[]', output: 'true', description: 'Empty tree', isHidden: false },

        // Hidden test cases
        { input: '[1]', output: 'true', description: 'Single node', isHidden: true },
        { input: '[1,2,3]', output: 'true', description: 'Simple balanced', isHidden: true },
        { input: '[1,2,2,3,3,3,3,4,4,4,4,4,4,null,null,5,5]', output: 'false', description: 'Highly unbalanced', isHidden: true },
        { input: '[1,2,3,4,5,6,7]', output: 'true', description: 'Complete binary tree', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]', output: 'true', description: 'Full binary tree', isHidden: true },
        { input: '[1,null,2,null,3,null,4]', output: 'false', description: 'Right skewed tree', isHidden: true }
      ];

    case '30': // BST to Doubly Linked List
      return [
        // Visible test cases
        { input: '[4,2,5,1,3]', output: '[1,2,3,4,5]', description: 'Standard BST', isHidden: false },
        { input: '[2,1,3]', output: '[1,2,3]', description: 'Simple BST', isHidden: false },
        { input: '[]', output: '[]', description: 'Empty tree', isHidden: false },

        // Hidden test cases
        { input: '[1]', output: '[1]', description: 'Single node', isHidden: true },
        { input: '[1,null,2,null,3]', output: '[1,2,3]', description: 'Right skewed BST', isHidden: true },
        { input: '[3,2,1]', output: '[1,2,3]', description: 'Left skewed BST', isHidden: true },
        { input: '[4,2,6,1,3,5,7]', output: '[1,2,3,4,5,6,7]', description: 'Complete BST', isHidden: true },
        { input: '[5,3,7,2,4,6,8]', output: '[2,3,4,5,6,7,8]', description: 'Full BST', isHidden: true },
        { input: '[1,1,1]', output: '[1,1,1]', description: 'Duplicate values', isHidden: true }
      ];

    case '31': // Binary Search in Rotated Array
      return [
        // Visible test cases
        { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', description: 'Target found in rotated array', isHidden: false },
        { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', description: 'Target not found', isHidden: false },
        { input: 'nums = [1], target = 0', output: '-1', description: 'Single element not found', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1], target = 1', output: '0', description: 'Single element found', isHidden: true },
        { input: 'nums = [1,3], target = 3', output: '1', description: 'Two elements target found', isHidden: true },
        { input: 'nums = [1,3], target = 0', output: '-1', description: 'Two elements target not found', isHidden: true },
        { input: 'nums = [3,1], target = 1', output: '1', description: 'Rotated two elements', isHidden: true },
        { input: 'nums = [3,1], target = 3', output: '0', description: 'Rotated two elements first', isHidden: true },
        { input: 'nums = [5,1,3], target = 5', output: '0', description: 'Rotated three elements first', isHidden: true }
      ];

    case '32': // Find Duplicate Number
      return [
        // Visible test cases
        { input: '[1,3,4,2,2]', output: '2', description: 'Duplicate found', isHidden: false },
        { input: '[3,1,3,4,2]', output: '3', description: 'Duplicate at beginning', isHidden: false },
        { input: '[1,1]', output: '1', description: 'Two same elements', isHidden: false },

        // Hidden test cases
        { input: '[1,1,2]', output: '1', description: 'Duplicate at start', isHidden: true },
        { input: '[1,2,2]', output: '2', description: 'Duplicate at end', isHidden: true },
        { input: '[2,2,2,2,2]', output: '2', description: 'All same elements', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,1]', output: '1', description: 'Large array with duplicate', isHidden: true },
        { input: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,100]', output: '100', description: 'Large array duplicate at end', isHidden: true }
      ];

    case '33': // Rotate Array by K Steps
      return [
        // Visible test cases
        { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', description: 'Standard rotation', isHidden: false },
        { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', description: 'Negative numbers', isHidden: false },
        { input: 'nums = [1,2,3], k = 4', output: '[3,1,2]', description: 'K larger than array length', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1], k = 1', output: '[1]', description: 'Single element', isHidden: true },
        { input: 'nums = [1,2], k = 1', output: '[2,1]', description: 'Two elements', isHidden: true },
        { input: 'nums = [1,2,3,4,5], k = 0', output: '[1,2,3,4,5]', description: 'No rotation', isHidden: true },
        { input: 'nums = [1,2,3,4,5], k = 5', output: '[1,2,3,4,5]', description: 'Full rotation', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9,10], k = 7', output: '[4,5,6,7,8,9,10,1,2,3]', description: 'Large array rotation', isHidden: true }
      ];

    case '34': // Set Matrix Zeroes
      return [
        // Visible test cases
        { input: '[[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', description: 'Standard matrix', isHidden: false },
        { input: '[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]', description: 'Multiple zeros', isHidden: false },
        { input: '[[1,0]]', output: '[[0,0]]', description: 'Single row with zero', isHidden: false },

        // Hidden test cases
        { input: '[[0]]', output: '[[0]]', description: 'Single element zero', isHidden: true },
        { input: '[[1]]', output: '[[1]]', description: 'Single element non-zero', isHidden: true },
        { input: '[[0,0,0],[0,0,0],[0,0,0]]', output: '[[0,0,0],[0,0,0],[0,0,0]]', description: 'All zeros', isHidden: true },
        { input: '[[1,1,1],[1,1,1],[1,1,1]]', output: '[[1,1,1],[1,1,1],[1,1,1]]', description: 'No zeros', isHidden: true },
        { input: '[[1,2,3,4],[5,0,7,8],[9,10,11,12],[13,14,15,0]]', output: '[[1,0,3,0],[0,0,0,0],[9,0,11,0],[0,0,0,0]]', description: 'Large matrix with zeros', isHidden: true }
      ];

    case '35': // Top K Frequent Elements
      return [
        // Visible test cases
        { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]', description: 'Standard case', isHidden: false },
        { input: 'nums = [1], k = 1', output: '[1]', description: 'Single element', isHidden: false },
        { input: 'nums = [1,2], k = 2', output: '[1,2]', description: 'Two unique elements', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1,1,1,1], k = 1', output: '[1]', description: 'All same elements', isHidden: true },
        { input: 'nums = [1,2,3,4,5], k = 3', output: '[1,2,3]', description: 'All unique elements', isHidden: true },
        { input: 'nums = [1,1,2,2,3,3], k = 3', output: '[1,2,3]', description: 'Equal frequencies', isHidden: true },
        { input: 'nums = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5], k = 2', output: '[1,2]', description: 'Multiple equal frequencies', isHidden: true },
        { input: 'nums = [1,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10], k = 5', output: '[1,2,3,4,5]', description: 'Large array top 5', isHidden: true }
      ];

    case '36': // Subarray Sum Equals K
      return [
        // Visible test cases
        { input: 'nums = [1,1,1], k = 2', output: '2', description: 'Multiple subarrays sum to k', isHidden: false },
        { input: 'nums = [1,2,3], k = 3', output: '2', description: 'Two subarrays sum to k', isHidden: false },
        { input: 'nums = [1], k = 1', output: '1', description: 'Single element equals k', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1,2,3,4,5], k = 9', output: '2', description: 'Subarrays [2,3,4] and [4,5]', isHidden: true },
        { input: 'nums = [1,2,3,4,5], k = 0', output: '0', description: 'No subarray sums to zero', isHidden: true },
        { input: 'nums = [0,0,0,0,0], k = 0', output: '15', description: 'All subarrays sum to zero', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9,10], k = 15', output: '3', description: 'Large array multiple subarrays', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9,10], k = 55', output: '1', description: 'Entire array sums to k', isHidden: true }
      ];

    case '37': // Isomorphic Strings
      return [
        // Visible test cases
        { input: 's = "egg", t = "add"', output: 'true', description: 'Isomorphic strings', isHidden: false },
        { input: 's = "foo", t = "bar"', output: 'false', description: 'Non-isomorphic strings', isHidden: false },
        { input: 's = "paper", t = "title"', output: 'true', description: 'Long isomorphic strings', isHidden: false },

        // Hidden test cases
        { input: 's = "a", t = "b"', output: 'true', description: 'Single character', isHidden: true },
        { input: 's = "ab", t = "aa"', output: 'false', description: 'One-to-many mapping', isHidden: true },
        { input: 's = "aa", t = "ab"', output: 'false', description: 'Many-to-one mapping', isHidden: true },
        { input: 's = "", t = ""', output: 'true', description: 'Empty strings', isHidden: true },
        { input: 's = "abcdefghijklmnopqrstuvwxyz", t = "zyxwvutsrqponmlkjihgfedcba"', output: 'true', description: 'Long strings reverse mapping', isHidden: true }
      ];

    case '38': // Two Sum
      return [
        // Visible test cases
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', description: 'Standard case', isHidden: false },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]', description: 'Target in middle', isHidden: false },
        { input: 'nums = [3,3], target = 6', output: '[0,1]', description: 'Same elements', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1,2,3,4,5], target = 9', output: '[3,4]', description: 'Large array', isHidden: true },
        { input: 'nums = [1,2,3,4,5], target = 10', output: '[]', description: 'No solution', isHidden: true },
        { input: 'nums = [0,0], target = 0', output: '[0,1]', description: 'Zero target', isHidden: true },
        { input: 'nums = [-1,-2,-3,-4,-5], target = -8', output: '[2,4]', description: 'Negative numbers', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9,10], target = 19', output: '[8,9]', description: 'Large array end elements', isHidden: true }
      ];

    case '39': // Add Two Numbers
      return [
        // Visible test cases
        { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', description: 'Standard addition', isHidden: false },
        { input: 'l1 = [0], l2 = [0]', output: '[0]', description: 'Zero addition', isHidden: false },
        { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]', description: 'Carry overflow', isHidden: false },

        // Hidden test cases
        { input: 'l1 = [1], l2 = [2]', output: '[3]', description: 'Single digit addition', isHidden: true },
        { input: 'l1 = [1,2,3], l2 = [4,5,6]', output: '[5,7,9]', description: 'No carry', isHidden: true },
        { input: 'l1 = [9,9], l2 = [1]', output: '[0,0,1]', description: 'Carry to new digit', isHidden: true },
        { input: 'l1 = [1,2,3,4,5], l2 = [6,7,8,9,0]', output: '[7,9,1,4,6]', description: 'Large lists no carry', isHidden: true },
        { input: 'l1 = [9,9,9,9,9], l2 = [9,9,9,9,9]', output: '[8,9,9,9,9,1]', description: 'All nines with carry', isHidden: true }
      ];

    case '40': // Container With Most Water
      return [
        // Visible test cases
        { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', description: 'Standard case', isHidden: false },
        { input: 'height = [1,1]', output: '1', description: 'Two same heights', isHidden: false },
        { input: 'height = [4,3,2,1,4]', output: '16', description: 'End heights', isHidden: false },

        // Hidden test cases
        { input: 'height = [1]', output: '0', description: 'Single height', isHidden: true },
        { input: 'height = [1,2,3,4,5]', output: '6', description: 'Increasing heights', isHidden: true },
        { input: 'height = [5,4,3,2,1]', output: '6', description: 'Decreasing heights', isHidden: true },
        { input: 'height = [1,2,1]', output: '2', description: 'Peak in middle', isHidden: true },
        { input: 'height = [1,8,6,2,5,4,8,3,7,1,8,6,2,5,4,8,3,7]', output: '72', description: 'Large array repeated pattern', isHidden: true }
      ];

    case '41': // Dijkstra's Algorithm
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1,1],[0,2,4],[1,2,2],[1,3,5],[2,3,1]], source = 0', output: '[0,1,3,4]', description: 'Standard graph', isHidden: false },
        { input: 'n = 3, edges = [[0,1,2],[1,2,3]], source = 0', output: '[0,2,5]', description: 'Linear graph', isHidden: false },
        { input: 'n = 2, edges = [[0,1,1]], source = 0', output: '[0,1]', description: 'Two nodes', isHidden: false },

        // Hidden test cases
        { input: 'n = 5, edges = [[0,1,1],[0,2,2],[1,3,3],[2,3,1],[3,4,2]], source = 0', output: '[0,1,2,3,5]', description: 'Complex graph', isHidden: true },
        { input: 'n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], source = 0', output: '[0,1,2]', description: 'Triangle graph', isHidden: true },
        { input: 'n = 4, edges = [[0,1,1],[1,2,1],[2,3,1]], source = 1', output: '[1,0,1,2]', description: 'Source in middle', isHidden: true },
        { input: 'n = 6, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4],[4,5,5]], source = 0', output: '[0,1,3,6,10,15]', description: 'Long path', isHidden: true }
      ];

    case '42': // Floyd-Warshall Algorithm
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1,1],[1,2,2],[2,3,3],[0,3,10]]', output: '[[0,1,3,6],[∞,0,2,5],[∞,∞,0,3],[∞,∞,∞,0]]', description: 'Standard graph', isHidden: false },
        { input: 'n = 3, edges = [[0,1,2],[1,2,3]]', output: '[[0,2,5],[∞,0,3],[∞,∞,0]]', description: 'Linear graph', isHidden: false },
        { input: 'n = 2, edges = [[0,1,1]]', output: '[[0,1],[∞,0]]', description: 'Two nodes', isHidden: false },

        // Hidden test cases
        { input: 'n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]]', output: '[[0,1,2],[∞,0,1],[∞,∞,0]]', description: 'Triangle graph', isHidden: true },
        { input: 'n = 4, edges = [[0,1,1],[1,2,2],[2,3,3],[0,3,6]]', output: '[[0,1,3,6],[∞,0,2,5],[∞,∞,0,3],[∞,∞,∞,0]]', description: 'Direct path optimal', isHidden: true },
        { input: 'n = 5, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4]]', output: '[[0,1,3,6,10],[∞,0,2,5,9],[∞,∞,0,3,7],[∞,∞,∞,0,4],[∞,∞,∞,∞,0]]', description: 'Long path', isHidden: true }
      ];

    case '43': // Kruskal's Algorithm
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]', output: '[[0,1,1],[0,2,2],[1,3,4]]', description: 'Standard MST', isHidden: false },
        { input: 'n = 3, edges = [[0,1,2],[1,2,3],[0,2,1]]', output: '[[0,2,1],[0,1,2]]', description: 'Triangle MST', isHidden: false },
        { input: 'n = 2, edges = [[0,1,1]]', output: '[[0,1,1]]', description: 'Two nodes', isHidden: false },

        // Hidden test cases
        { input: 'n = 5, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4],[0,4,10]]', output: '[[0,1,1],[1,2,2],[2,3,3],[3,4,4]]', description: 'Linear MST', isHidden: true },
        { input: 'n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,3]]', output: '[[0,1,1],[1,2,1],[2,3,1]]', description: 'Cycle avoidance', isHidden: true },
        { input: 'n = 6, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4],[4,5,5],[0,5,15]]', output: '[[0,1,1],[1,2,2],[2,3,3],[3,4,4],[4,5,5]]', description: 'Long path MST', isHidden: true }
      ];

    case '44': // Prim's Algorithm
      return [
        // Visible test cases
        { input: 'n = 4, edges = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]', output: '[[0,1,1],[0,2,2],[1,3,4]]', description: 'Standard MST', isHidden: false },
        { input: 'n = 3, edges = [[0,1,2],[1,2,3],[0,2,1]]', output: '[[0,2,1],[0,1,2]]', description: 'Triangle MST', isHidden: false },
        { input: 'n = 2, edges = [[0,1,1]]', output: '[[0,1,1]]', description: 'Two nodes', isHidden: false },

        // Hidden test cases
        { input: 'n = 5, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4],[0,4,10]]', output: '[[0,1,1],[1,2,2],[2,3,3],[3,4,4]]', description: 'Linear MST', isHidden: true },
        { input: 'n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,3]]', output: '[[0,1,1],[1,2,1],[2,3,1]]', description: 'Cycle avoidance', isHidden: true },
        { input: 'n = 6, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4],[4,5,5],[0,5,15]]', output: '[[0,1,1],[1,2,2],[2,3,3],[3,4,4],[4,5,5]]', description: 'Long path MST', isHidden: true }
      ];

    case '45': // Knapsack Problem
      return [
        // Visible test cases
        { input: 'weights = [1,3,4,5], values = [1,4,5,7], capacity = 7', output: '9', description: 'Standard knapsack', isHidden: false },
        { input: 'weights = [2,3,4,5], values = [3,4,5,6], capacity = 5', output: '7', description: 'Capacity constraint', isHidden: false },
        { input: 'weights = [1,2,3], values = [10,15,40], capacity = 6', output: '65', description: 'High value items', isHidden: false },

        // Hidden test cases
        { input: 'weights = [1,1,1], values = [1,2,3], capacity = 2', output: '5', description: 'Multiple small items', isHidden: true },
        { input: 'weights = [10,20,30], values = [60,100,120], capacity = 50', output: '220', description: 'Large weights', isHidden: true },
        { input: 'weights = [1], values = [1], capacity = 0', output: '0', description: 'Zero capacity', isHidden: true },
        { input: 'weights = [1,2,3,4,5], values = [1,2,3,4,5], capacity = 10', output: '10', description: 'Equal weights and values', isHidden: true }
      ];

    case '46': // Longest Common Subsequence
      return [
        // Visible test cases
        { input: 'text1 = "abcde", text2 = "ace"', output: '3', description: 'Standard LCS', isHidden: false },
        { input: 'text1 = "abc", text2 = "abc"', output: '3', description: 'Identical strings', isHidden: false },
        { input: 'text1 = "abc", text2 = "def"', output: '0', description: 'No common subsequence', isHidden: false },

        // Hidden test cases
        { input: 'text1 = "abcba", text2 = "abcbcba"', output: '5', description: 'Complex LCS', isHidden: true },
        { input: 'text1 = "", text2 = "abc"', output: '0', description: 'Empty first string', isHidden: true },
        { input: 'text1 = "abc", text2 = ""', output: '0', description: 'Empty second string', isHidden: true },
        { input: 'text1 = "abcdefghij", text2 = "acegik"', output: '4', description: 'Long strings', isHidden: true }
      ];

    case '47': // Coin Change Problem
      return [
        // Visible test cases
        { input: 'coins = [1,2,5], amount = 11', output: '3', description: 'Standard coin change', isHidden: false },
        { input: 'coins = [2], amount = 3', output: '-1', description: 'Impossible amount', isHidden: false },
        { input: 'coins = [1], amount = 0', output: '0', description: 'Zero amount', isHidden: false },

        // Hidden test cases
        { input: 'coins = [1,2,5], amount = 6', output: '2', description: 'Multiple solutions', isHidden: true },
        { input: 'coins = [1], amount = 10', output: '10', description: 'Single coin type', isHidden: true },
        { input: 'coins = [2,5,10], amount = 1', output: '-1', description: 'Cannot make amount', isHidden: true },
        { input: 'coins = [1,3,4], amount = 6', output: '2', description: 'Optimal solution', isHidden: true }
      ];

    case '48': // Climbing Stairs
      return [
        // Visible test cases
        { input: 'n = 2', output: '2', description: 'Two stairs', isHidden: false },
        { input: 'n = 3', output: '3', description: 'Three stairs', isHidden: false },
        { input: 'n = 4', output: '5', description: 'Four stairs', isHidden: false },

        // Hidden test cases
        { input: 'n = 1', output: '1', description: 'One stair', isHidden: true },
        { input: 'n = 5', output: '8', description: 'Five stairs', isHidden: true },
        { input: 'n = 10', output: '89', description: 'Ten stairs', isHidden: true },
        { input: 'n = 0', output: '1', description: 'Zero stairs', isHidden: true }
      ];

    case '49': // House Robber
      return [
        // Visible test cases
        { input: 'nums = [1,2,3,1]', output: '4', description: 'Standard robbery', isHidden: false },
        { input: 'nums = [2,7,9,3,1]', output: '12', description: 'Optimal selection', isHidden: false },
        { input: 'nums = [2,1,1,2]', output: '4', description: 'Alternating houses', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1]', output: '1', description: 'Single house', isHidden: true },
        { input: 'nums = [1,2]', output: '2', description: 'Two houses', isHidden: true },
        { input: 'nums = [1,2,3,4,5]', output: '9', description: 'Five houses', isHidden: true },
        { input: 'nums = [0,0,0,0,0]', output: '0', description: 'Zero values', isHidden: true }
      ];

    case '50': // Word Break
      return [
        // Visible test cases
        { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', description: 'Standard word break', isHidden: false },
        { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true', description: 'Repeated words', isHidden: false },
        { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false', description: 'Cannot break', isHidden: false },

        // Hidden test cases
        { input: 's = "a", wordDict = ["a"]', output: 'true', description: 'Single character', isHidden: true },
        { input: 's = "abc", wordDict = ["a","b","c"]', output: 'true', description: 'Individual characters', isHidden: true },
        { input: 's = "aaaaaaa", wordDict = ["aaaa","aaa"]', output: 'true', description: 'Multiple ways', isHidden: true },
        { input: 's = "", wordDict = ["a","b","c"]', output: 'true', description: 'Empty string', isHidden: true }
      ];

    case '51': // Regular Expression Matching
      return [
        // Visible test cases
        { input: 's = "aa", p = "a"', output: 'false', description: 'No match', isHidden: false },
        { input: 's = "aa", p = "a*"', output: 'true', description: 'Star pattern', isHidden: false },
        { input: 's = "ab", p = ".*"', output: 'true', description: 'Dot star pattern', isHidden: false },

        // Hidden test cases
        { input: 's = "aab", p = "c*a*b"', output: 'true', description: 'Complex pattern', isHidden: true },
        { input: 's = "mississippi", p = "mis*is*p*."', output: 'false', description: 'Long string', isHidden: true },
        { input: 's = "", p = ".*"', output: 'true', description: 'Empty string', isHidden: true },
        { input: 's = "a", p = ".*..a*"', output: 'false', description: 'Complex pattern no match', isHidden: true }
      ];

    case '52': // Wildcard Matching
      return [
        // Visible test cases
        { input: 's = "aa", p = "a"', output: 'false', description: 'No match', isHidden: false },
        { input: 's = "aa", p = "*"', output: 'true', description: 'Star wildcard', isHidden: false },
        { input: 's = "cb", p = "?a"', output: 'false', description: 'Question mark', isHidden: false },

        // Hidden test cases
        { input: 's = "adceb", p = "*a*b"', output: 'true', description: 'Complex wildcard', isHidden: true },
        { input: 's = "acdcb", p = "a*c?b"', output: 'false', description: 'Question mark mismatch', isHidden: true },
        { input: 's = "", p = "*"', output: 'true', description: 'Empty string star', isHidden: true },
        { input: 's = "ho", p = "ho**"', output: 'true', description: 'Multiple stars', isHidden: true }
      ];

    case '53': // Trapping Rain Water
      return [
        // Visible test cases
        { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', description: 'Standard trapping', isHidden: false },
        { input: 'height = [4,2,0,3,2,5]', output: '9', description: 'Complex trapping', isHidden: false },
        { input: 'height = [2,0,2]', output: '2', description: 'Simple trapping', isHidden: false },

        // Hidden test cases
        { input: 'height = [1]', output: '0', description: 'Single bar', isHidden: true },
        { input: 'height = [1,2,3,4,5]', output: '0', description: 'Increasing heights', isHidden: true },
        { input: 'height = [5,4,3,2,1]', output: '0', description: 'Decreasing heights', isHidden: true },
        { input: 'height = [1,2,1,2,1,2,1]', output: '3', description: 'Alternating heights', isHidden: true }
      ];

    case '54': // Sliding Window Maximum
      return [
        // Visible test cases
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', description: 'Standard sliding window', isHidden: false },
        { input: 'nums = [1], k = 1', output: '[1]', description: 'Single element', isHidden: false },
        { input: 'nums = [1,-1], k = 1', output: '[1,-1]', description: 'Two elements', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 1', output: '[1,3,-1,-3,5,3,6,7]', description: 'Window size 1', isHidden: true },
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 8', output: '[7]', description: 'Window size equals array', isHidden: true },
        { input: 'nums = [9,8,7,6,5,4,3,2,1], k = 3', output: '[9,8,7,6,5,4,3]', description: 'Decreasing sequence', isHidden: true },
        { input: 'nums = [1,2,3,4,5,6,7,8,9], k = 3', output: '[3,4,5,6,7,8,9]', description: 'Increasing sequence', isHidden: true }
      ];

    case '55': // Median of Two Sorted Arrays
      return [
        // Visible test cases
        { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', description: 'Odd total length', isHidden: false },
        { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5', description: 'Even total length', isHidden: false },
        { input: 'nums1 = [0,0], nums2 = [0,0]', output: '0.0', description: 'All zeros', isHidden: false },

        // Hidden test cases
        { input: 'nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]', output: '5.5', description: 'Separate ranges', isHidden: true },
        { input: 'nums1 = [], nums2 = [1]', output: '1.0', description: 'Empty first array', isHidden: true },
        { input: 'nums1 = [1], nums2 = []', output: '1.0', description: 'Empty second array', isHidden: true },
        { input: 'nums1 = [1,2,3], nums2 = [4,5,6,7,8,9]', output: '5.0', description: 'Different lengths', isHidden: true }
      ];

    case '56': // Reverse Words in String
      return [
        // Visible test cases
        { input: 's = "the sky is blue"', output: '"blue is sky the"', description: 'Standard reverse', isHidden: false },
        { input: 's = "  hello world  "', output: '"world hello"', description: 'Extra spaces', isHidden: false },
        { input: 's = "a good   example"', output: '"example good a"', description: 'Multiple spaces', isHidden: false },

        // Hidden test cases
        { input: 's = "a"', output: '"a"', description: 'Single word', isHidden: true },
        { input: 's = "a b c"', output: '"c b a"', description: 'Single letters', isHidden: true },
        { input: 's = ""', output: '""', description: 'Empty string', isHidden: true },
        { input: 's = "   "', output: '""', description: 'Only spaces', isHidden: true }
      ];

    case '57': // Valid Anagram
      return [
        // Visible test cases
        { input: 's = "anagram", t = "nagaram"', output: 'true', description: 'Valid anagram', isHidden: false },
        { input: 's = "rat", t = "car"', output: 'false', description: 'Not anagram', isHidden: false },
        { input: 's = "", t = ""', output: 'true', description: 'Empty strings', isHidden: false },

        // Hidden test cases
        { input: 's = "a", t = "a"', output: 'true', description: 'Single character', isHidden: true },
        { input: 's = "a", t = "b"', output: 'false', description: 'Different characters', isHidden: true },
        { input: 's = "abcdefghijklmnopqrstuvwxyz", t = "zyxwvutsrqponmlkjihgfedcba"', output: 'true', description: 'Long strings', isHidden: true },
        { input: 's = "aacc", t = "ccac"', output: 'false', description: 'Different frequencies', isHidden: true }
      ];

    case '58': // Group Anagrams
      return [
        // Visible test cases
        { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', description: 'Standard grouping', isHidden: false },
        { input: 'strs = [""]', output: '[[""]]', description: 'Empty string', isHidden: false },
        { input: 'strs = ["a"]', output: '[["a"]]', description: 'Single string', isHidden: false },

        // Hidden test cases
        { input: 'strs = ["abc","cba","bac","cab","acb","bca"]', output: '[["abc","cba","bac","cab","acb","bca"]]', description: 'All anagrams', isHidden: true },
        { input: 'strs = ["abc","def","ghi"]', output: '[["abc"],["def"],["ghi"]]', description: 'No anagrams', isHidden: true },
        { input: 'strs = []', output: '[]', description: 'Empty array', isHidden: true },
        { input: 'strs = ["a","b","c","d"]', output: '[["a"],["b"],["c"],["d"]]', description: 'Single characters', isHidden: true }
      ];

    case '59': // Valid Palindrome
      return [
        // Visible test cases
        { input: 's = "A man, a plan, a canal: Panama"', output: 'true', description: 'Valid palindrome', isHidden: false },
        { input: 's = "race a car"', output: 'false', description: 'Not palindrome', isHidden: false },
        { input: 's = " "', output: 'true', description: 'Single space', isHidden: false },

        // Hidden test cases
        { input: 's = "a"', output: 'true', description: 'Single character', isHidden: true },
        { input: 's = "ab"', output: 'false', description: 'Two different characters', isHidden: true },
        { input: 's = "racecar"', output: 'true', description: 'Simple palindrome', isHidden: true },
        { input: 's = "0P"', output: 'false', description: 'Case sensitive', isHidden: true }
      ];

    case '60': // Longest Palindromic Substring
      return [
        // Visible test cases
        { input: 's = "babad"', output: '"bab"', description: 'Standard palindrome', isHidden: false },
        { input: 's = "cbbd"', output: '"bb"', description: 'Even length palindrome', isHidden: false },
        { input: 's = "a"', output: '"a"', description: 'Single character', isHidden: false },

        // Hidden test cases
        { input: 's = "ac"', output: '"a"', description: 'No palindrome', isHidden: true },
        { input: 's = "aaaa"', output: '"aaaa"', description: 'All same characters', isHidden: true },
        { input: 's = "abcba"', output: '"abcba"', description: 'Full string palindrome', isHidden: true },
        { input: 's = ""', output: '""', description: 'Empty string', isHidden: true }
      ];

    case '61': // Implement Trie (Prefix Tree)
      return [
        // Visible test cases
        { input: 'trie = Trie(), trie.insert("apple"), trie.search("apple")', output: 'true', description: 'Insert and search', isHidden: false },
        { input: 'trie = Trie(), trie.insert("apple"), trie.search("app")', output: 'false', description: 'Search prefix', isHidden: false },
        { input: 'trie = Trie(), trie.insert("apple"), trie.startsWith("app")', output: 'true', description: 'Starts with', isHidden: false },

        // Hidden test cases
        { input: 'trie = Trie(), trie.insert(""), trie.search("")', output: 'true', description: 'Empty string', isHidden: true },
        { input: 'trie = Trie(), trie.insert("a"), trie.insert("ab"), trie.search("a")', output: 'true', description: 'Multiple inserts', isHidden: true },
        { input: 'trie = Trie(), trie.startsWith("a")', output: 'false', description: 'Empty trie', isHidden: true },
        { input: 'trie = Trie(), trie.insert("apple"), trie.insert("app"), trie.search("app")', output: 'true', description: 'Prefix as word', isHidden: true }
      ];

    case '62': // Word Search
      return [
        // Visible test cases
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true', description: 'Standard search', isHidden: false },
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true', description: 'Find word', isHidden: false },
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false', description: 'Not found', isHidden: false },

        // Hidden test cases
        { input: 'board = [["A"]], word = "A"', output: 'true', description: 'Single cell', isHidden: true },
        { input: 'board = [["A","B"],["C","D"]], word = "ABCD"', output: 'false', description: 'No path', isHidden: true },
        { input: 'board = [["A","A","A"],["A","A","A"],["A","A","A"]], word = "AAAA"', output: 'true', description: 'All same', isHidden: true },
        { input: 'board = [["A","B"],["C","D"]], word = "AB"', output: 'true', description: 'Simple path', isHidden: true }
      ];

    case '63': // Sudoku Solver
      return [
        // Visible test cases
        { input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: 'solved board', description: 'Standard sudoku', isHidden: false },
        { input: 'board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: 'solved board', description: 'Another sudoku', isHidden: false },
        { input: 'board = [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]', output: 'solved board', description: 'Already solved', isHidden: false },

        // Hidden test cases
        { input: 'board = [["."]]', output: 'solved board', description: '1x1 board', isHidden: true },
        { input: 'board = [["1","2","3","4"],["3","4","1","2"],["2","1","4","3"],["4","3","2","1"]]', output: 'solved board', description: '4x4 board', isHidden: true },
        { input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: 'solved board', description: 'Complex sudoku', isHidden: true },
        { input: 'board = [["1","2","3","4","5","6","7","8","9"],["4","5","6","7","8","9","1","2","3"],["7","8","9","1","2","3","4","5","6"],["2","3","4","5","6","7","8","9","1"],["5","6","7","8","9","1","2","3","4"],["8","9","1","2","3","4","5","6","7"],["3","4","5","6","7","8","9","1","2"],["6","7","8","9","1","2","3","4","5"],["9","1","2","3","4","5","6","7","8"]]', output: 'solved board', description: 'Invalid sudoku', isHidden: true }
      ];

    case '64': // N-Queens
      return [
        // Visible test cases
        { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', description: '4 queens', isHidden: false },
        { input: 'n = 1', output: '[["Q"]]', description: 'Single queen', isHidden: false },
        { input: 'n = 2', output: '[]', description: 'No solution', isHidden: false },

        // Hidden test cases
        { input: 'n = 3', output: '[]', description: 'No solution for 3', isHidden: true },
        { input: 'n = 5', output: '10 solutions', description: '5 queens', isHidden: true },
        { input: 'n = 6', output: '4 solutions', description: '6 queens', isHidden: true },
        { input: 'n = 8', output: '92 solutions', description: '8 queens', isHidden: true }
      ];

    case '65': // Permutations
      return [
        // Visible test cases
        { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', description: 'Standard permutations', isHidden: false },
        { input: 'nums = [0,1]', output: '[[0,1],[1,0]]', description: 'Two numbers', isHidden: false },
        { input: 'nums = [1]', output: '[[1]]', description: 'Single number', isHidden: false },

        // Hidden test cases
        { input: 'nums = []', output: '[[]]', description: 'Empty array', isHidden: true },
        { input: 'nums = [1,1,2]', output: '[[1,1,2],[1,2,1],[2,1,1]]', description: 'With duplicates', isHidden: true },
        { input: 'nums = [1,2,3,4]', output: '24 permutations', description: 'Four numbers', isHidden: true },
        { input: 'nums = [5]', output: '[[5]]', description: 'Single element', isHidden: true }
      ];

    case '66': // Combinations
      return [
        // Visible test cases
        { input: 'n = 4, k = 2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', description: 'Standard combinations', isHidden: false },
        { input: 'n = 1, k = 1', output: '[[1]]', description: 'Single combination', isHidden: false },
        { input: 'n = 4, k = 4', output: '[[1,2,3,4]]', description: 'All elements', isHidden: false },

        // Hidden test cases
        { input: 'n = 5, k = 3', output: '10 combinations', description: '5 choose 3', isHidden: true },
        { input: 'n = 3, k = 1', output: '[[1],[2],[3]]', description: 'Single element each', isHidden: true },
        { input: 'n = 6, k = 2', output: '15 combinations', description: '6 choose 2', isHidden: true },
        { input: 'n = 2, k = 2', output: '[[1,2]]', description: 'Two elements', isHidden: true }
      ];

    case '67': // Subsets
      return [
        // Visible test cases
        { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', description: 'Standard subsets', isHidden: false },
        { input: 'nums = [0]', output: '[[],[0]]', description: 'Single element', isHidden: false },
        { input: 'nums = []', output: '[[]]', description: 'Empty array', isHidden: false },

        // Hidden test cases
        { input: 'nums = [1,2]', output: '[[],[1],[2],[1,2]]', description: 'Two elements', isHidden: true },
        { input: 'nums = [1,1,2]', output: '[[],[1],[1,1],[2],[1,2],[1,1,2]]', description: 'With duplicates', isHidden: true },
        { input: 'nums = [1,2,3,4]', output: '16 subsets', description: 'Four elements', isHidden: true },
        { input: 'nums = [5]', output: '[[],[5]]', description: 'Single element', isHidden: true }
      ];

    case '68': // Generate Parentheses
      return [
        // Visible test cases
        { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', description: 'Three pairs', isHidden: false },
        { input: 'n = 1', output: '["()"]', description: 'Single pair', isHidden: false },
        { input: 'n = 2', output: '["(())","()()"]', description: 'Two pairs', isHidden: false },

        // Hidden test cases
        { input: 'n = 0', output: '[""]', description: 'Zero pairs', isHidden: true },
        { input: 'n = 4', output: '14 combinations', description: 'Four pairs', isHidden: true },
        { input: 'n = 5', output: '42 combinations', description: 'Five pairs', isHidden: true },
        { input: 'n = 6', output: '132 combinations', description: 'Six pairs', isHidden: true }
      ];

    case '69': // Letter Combinations of a Phone Number
      return [
        // Visible test cases
        { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', description: 'Standard combinations', isHidden: false },
        { input: 'digits = ""', output: '[]', description: 'Empty string', isHidden: false },
        { input: 'digits = "2"', output: '["a","b","c"]', description: 'Single digit', isHidden: false },

        // Hidden test cases
        { input: 'digits = "9"', output: '["w","x","y","z"]', description: 'Digit 9', isHidden: true },
        { input: 'digits = "234"', output: '27 combinations', description: 'Three digits', isHidden: true },
        { input: 'digits = "7"', output: '["p","q","r","s"]', description: 'Digit 7', isHidden: true },
        { input: 'digits = "22"', output: '["aa","ab","ac","ba","bb","bc","ca","cb","cc"]', description: 'Same digit twice', isHidden: true }
      ];

    case '70': // Combination Sum
      return [
        // Visible test cases
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]', description: 'Standard combination', isHidden: false },
        { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', description: 'Multiple combinations', isHidden: false },
        { input: 'candidates = [2], target = 1', output: '[]', description: 'No solution', isHidden: false },

        // Hidden test cases
        { input: 'candidates = [1], target = 1', output: '[[1]]', description: 'Single candidate', isHidden: true },
        { input: 'candidates = [1], target = 2', output: '[[1,1]]', description: 'Repeated candidate', isHidden: true },
        { input: 'candidates = [2,3,5], target = 10', output: '[[2,2,2,2,2],[2,2,3,3],[2,3,5],[5,5]]', description: 'Larger target', isHidden: true },
        { input: 'candidates = [], target = 7', output: '[]', description: 'Empty candidates', isHidden: true }
      ];

    case '71': // LRU Cache
      return [
        // Visible test cases
        { input: 'cache = LRUCache(2), cache.put(1,1), cache.put(2,2), cache.get(1)', output: '1', description: 'Basic operations', isHidden: false },
        { input: 'cache = LRUCache(2), cache.put(1,1), cache.put(2,2), cache.put(3,3), cache.get(1)', output: '-1', description: 'LRU eviction', isHidden: false },
        { input: 'cache = LRUCache(1), cache.put(1,1), cache.put(2,2), cache.get(1)', output: '-1', description: 'Single capacity', isHidden: false },

        // Hidden test cases
        { input: 'cache = LRUCache(3), cache.put(1,1), cache.put(2,2), cache.put(3,3), cache.get(1), cache.put(4,4)', output: '1', description: 'Update access order', isHidden: true },
        { input: 'cache = LRUCache(2), cache.put(1,1), cache.put(1,2), cache.get(1)', output: '2', description: 'Update existing key', isHidden: true },
        { input: 'cache = LRUCache(0), cache.put(1,1)', output: 'capacity 0', description: 'Zero capacity', isHidden: true },
        { input: 'cache = LRUCache(1), cache.get(1)', output: '-1', description: 'Get non-existent', isHidden: true }
      ];

    case '72': // LFU Cache
      return [
        // Visible test cases
        { input: 'cache = LFUCache(2), cache.put(1,1), cache.put(2,2), cache.get(1), cache.put(3,3), cache.get(2)', output: '-1', description: 'LFU eviction', isHidden: false },
        { input: 'cache = LFUCache(3), cache.put(1,1), cache.put(2,2), cache.put(3,3), cache.get(1), cache.put(4,4)', output: '1', description: 'Frequency update', isHidden: false },
        { input: 'cache = LFUCache(1), cache.put(1,1), cache.put(2,2), cache.get(1)', output: '-1', description: 'Single capacity', isHidden: false },

        // Hidden test cases
        { input: 'cache = LFUCache(2), cache.put(1,1), cache.put(2,2), cache.get(1), cache.get(1), cache.put(3,3)', output: '1', description: 'Multiple accesses', isHidden: true },
        { input: 'cache = LFUCache(2), cache.put(1,1), cache.put(1,2), cache.get(1)', output: '2', description: 'Update existing key', isHidden: true },
        { input: 'cache = LFUCache(0), cache.put(1,1)', output: 'capacity 0', description: 'Zero capacity', isHidden: true },
        { input: 'cache = LFUCache(1), cache.get(1)', output: '-1', description: 'Get non-existent', isHidden: true }
      ];

    case '73': // All O(1) Data Structure
      return [
        // Visible test cases
        { input: 'allOne = AllOne(), allOne.inc("hello"), allOne.inc("hello"), allOne.getMaxKey()', output: '"hello"', description: 'Basic operations', isHidden: false },
        { input: 'allOne = AllOne(), allOne.inc("hello"), allOne.inc("world"), allOne.getMaxKey()', output: '"hello" or "world"', description: 'Multiple keys', isHidden: false },
        { input: 'allOne = AllOne(), allOne.getMaxKey()', output: '""', description: 'Empty structure', isHidden: false },

        // Hidden test cases
        { input: 'allOne = AllOne(), allOne.inc("a"), allOne.inc("a"), allOne.dec("a"), allOne.getMaxKey()', output: '"a"', description: 'Decrement operation', isHidden: true },
        { input: 'allOne = AllOne(), allOne.inc("a"), allOne.inc("b"), allOne.inc("a"), allOne.getMinKey()', output: '"b"', description: 'Get minimum key', isHidden: true },
        { input: 'allOne = AllOne(), allOne.inc("a"), allOne.dec("a"), allOne.getMaxKey()', output: '""', description: 'Remove all keys', isHidden: true },
        { input: 'allOne = AllOne(), allOne.inc("a"), allOne.inc("a"), allOne.inc("b"), allOne.getMaxKey()', output: '"a"', description: 'Multiple increments', isHidden: true }
      ];

    case '74': // Min Stack
      return [
        // Visible test cases
        { input: 'stack = MinStack(), stack.push(-2), stack.push(0), stack.push(-3), stack.getMin()', output: '-3', description: 'Basic operations', isHidden: false },
        { input: 'stack = MinStack(), stack.push(1), stack.push(2), stack.top(), stack.pop(), stack.getMin()', output: '1', description: 'Pop operation', isHidden: false },
        { input: 'stack = MinStack(), stack.push(5), stack.getMin()', output: '5', description: 'Single element', isHidden: false },

        // Hidden test cases
        { input: 'stack = MinStack(), stack.push(3), stack.push(1), stack.push(2), stack.getMin()', output: '1', description: 'Multiple elements', isHidden: true },
        { input: 'stack = MinStack(), stack.push(1), stack.push(1), stack.push(1), stack.getMin()', output: '1', description: 'All same values', isHidden: true },
        { input: 'stack = MinStack(), stack.getMin()', output: 'error', description: 'Empty stack', isHidden: true },
        { input: 'stack = MinStack(), stack.push(5), stack.push(3), stack.pop(), stack.getMin()', output: '5', description: 'Pop minimum', isHidden: true }
      ];

    case '75': // Max Stack
      return [
        // Visible test cases
        { input: 'stack = MaxStack(), stack.push(5), stack.push(1), stack.push(5), stack.top(), stack.popMax(), stack.top()', output: '1', description: 'Basic operations', isHidden: false },
        { input: 'stack = MaxStack(), stack.push(1), stack.push(2), stack.peekMax()', output: '2', description: 'Peek maximum', isHidden: false },
        { input: 'stack = MaxStack(), stack.push(1), stack.popMax()', output: '1', description: 'Single element', isHidden: false },

        // Hidden test cases
        { input: 'stack = MaxStack(), stack.push(3), stack.push(1), stack.push(2), stack.peekMax()', output: '3', description: 'Multiple elements', isHidden: true },
        { input: 'stack = MaxStack(), stack.push(1), stack.push(1), stack.push(1), stack.peekMax()', output: '1', description: 'All same values', isHidden: true },
        { input: 'stack = MaxStack(), stack.peekMax()', output: 'error', description: 'Empty stack', isHidden: true },
        { input: 'stack = MaxStack(), stack.push(5), stack.push(3), stack.popMax(), stack.top()', output: '3', description: 'Pop maximum', isHidden: true }
      ];

    case '76': // Implement Stack using Queues
      return [
        // Visible test cases
        { input: 'stack = MyStack(), stack.push(1), stack.push(2), stack.top(), stack.pop(), stack.empty()', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'stack = MyStack(), stack.push(1), stack.pop(), stack.empty()', output: 'true', description: 'Push and pop', isHidden: false },
        { input: 'stack = MyStack(), stack.empty()', output: 'true', description: 'Empty stack', isHidden: false },

        // Hidden test cases
        { input: 'stack = MyStack(), stack.push(1), stack.push(2), stack.push(3), stack.pop(), stack.top()', output: '2', description: 'Multiple operations', isHidden: true },
        { input: 'stack = MyStack(), stack.push(5), stack.top()', output: '5', description: 'Single element', isHidden: true },
        { input: 'stack = MyStack(), stack.pop()', output: 'error', description: 'Pop empty', isHidden: true },
        { input: 'stack = MyStack(), stack.top()', output: 'error', description: 'Top empty', isHidden: true }
      ];

    case '77': // Implement Queue using Stacks
      return [
        // Visible test cases
        { input: 'queue = MyQueue(), queue.push(1), queue.push(2), queue.peek(), queue.pop(), queue.empty()', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'queue = MyQueue(), queue.push(1), queue.pop(), queue.empty()', output: 'true', description: 'Push and pop', isHidden: false },
        { input: 'queue = MyQueue(), queue.empty()', output: 'true', description: 'Empty queue', isHidden: false },

        // Hidden test cases
        { input: 'queue = MyQueue(), queue.push(1), queue.push(2), queue.push(3), queue.pop(), queue.peek()', output: '2', description: 'Multiple operations', isHidden: true },
        { input: 'queue = MyQueue(), queue.push(5), queue.peek()', output: '5', description: 'Single element', isHidden: true },
        { input: 'queue = MyQueue(), queue.pop()', output: 'error', description: 'Pop empty', isHidden: true },
        { input: 'queue = MyQueue(), queue.peek()', output: 'error', description: 'Peek empty', isHidden: true }
      ];

    case '78': // Design Circular Queue
      return [
        // Visible test cases
        { input: 'queue = MyCircularQueue(3), queue.enQueue(1), queue.enQueue(2), queue.enQueue(3), queue.enQueue(4)', output: 'false', description: 'Full queue', isHidden: false },
        { input: 'queue = MyCircularQueue(3), queue.enQueue(1), queue.enQueue(2), queue.enQueue(3), queue.Rear()', output: '3', description: 'Get rear', isHidden: false },
        { input: 'queue = MyCircularQueue(3), queue.enQueue(1), queue.enQueue(2), queue.deQueue(), queue.Front()', output: '2', description: 'Dequeue operation', isHidden: false },

        // Hidden test cases
        { input: 'queue = MyCircularQueue(1), queue.enQueue(1), queue.enQueue(2)', output: 'false', description: 'Single capacity', isHidden: true },
        { input: 'queue = MyCircularQueue(2), queue.enQueue(1), queue.enQueue(2), queue.deQueue(), queue.enQueue(3)', output: 'true', description: 'Circular behavior', isHidden: true },
        { input: 'queue = MyCircularQueue(3), queue.Front()', output: '-1', description: 'Empty queue front', isHidden: true },
        { input: 'queue = MyCircularQueue(3), queue.Rear()', output: '-1', description: 'Empty queue rear', isHidden: true }
      ];

    case '79': // Design HashMap
      return [
        // Visible test cases
        { input: 'map = MyHashMap(), map.put(1,1), map.put(2,2), map.get(1)', output: '1', description: 'Basic operations', isHidden: false },
        { input: 'map = MyHashMap(), map.put(1,1), map.put(1,2), map.get(1)', output: '2', description: 'Update value', isHidden: false },
        { input: 'map = MyHashMap(), map.put(1,1), map.remove(1), map.get(1)', output: '-1', description: 'Remove operation', isHidden: false },

        // Hidden test cases
        { input: 'map = MyHashMap(), map.get(1)', output: '-1', description: 'Get non-existent', isHidden: true },
        { input: 'map = MyHashMap(), map.remove(1)', output: 'no effect', description: 'Remove non-existent', isHidden: true },
        { input: 'map = MyHashMap(), map.put(0,0), map.put(1000,1000), map.get(0)', output: '0', description: 'Edge values', isHidden: true },
        { input: 'map = MyHashMap(), map.put(1,1), map.put(2,2), map.put(3,3), map.get(2)', output: '2', description: 'Multiple entries', isHidden: true }
      ];

    case '80': // Design HashSet
      return [
        // Visible test cases
        { input: 'set = MyHashSet(), set.add(1), set.add(2), set.contains(1)', output: 'true', description: 'Basic operations', isHidden: false },
        { input: 'set = MyHashSet(), set.add(1), set.remove(1), set.contains(1)', output: 'false', description: 'Remove operation', isHidden: false },
        { input: 'set = MyHashSet(), set.contains(1)', output: 'false', description: 'Empty set', isHidden: false },

        // Hidden test cases
        { input: 'set = MyHashSet(), set.add(1), set.add(1), set.contains(1)', output: 'true', description: 'Duplicate add', isHidden: true },
        { input: 'set = MyHashSet(), set.remove(1)', output: 'no effect', description: 'Remove non-existent', isHidden: true },
        { input: 'set = MyHashSet(), set.add(0), set.add(1000), set.contains(0)', output: 'true', description: 'Edge values', isHidden: true },
        { input: 'set = MyHashSet(), set.add(1), set.add(2), set.add(3), set.contains(2)', output: 'true', description: 'Multiple elements', isHidden: true }
      ];

    case '81': // Design Linked List
      return [
        // Visible test cases
        { input: 'list = MyLinkedList(), list.addAtHead(1), list.addAtTail(3), list.addAtIndex(1,2), list.get(1)', output: '2', description: 'Basic operations', isHidden: false },
        { input: 'list = MyLinkedList(), list.addAtHead(1), list.deleteAtIndex(0)', output: 'empty list', description: 'Delete operation', isHidden: false },
        { input: 'list = MyLinkedList(), list.get(0)', output: '-1', description: 'Empty list', isHidden: false },

        // Hidden test cases
        { input: 'list = MyLinkedList(), list.addAtHead(1), list.addAtHead(2), list.get(0)', output: '2', description: 'Multiple head adds', isHidden: true },
        { input: 'list = MyLinkedList(), list.addAtTail(1), list.addAtTail(2), list.get(1)', output: '2', description: 'Multiple tail adds', isHidden: true },
        { input: 'list = MyLinkedList(), list.addAtIndex(0,1), list.get(0)', output: '1', description: 'Add at index 0', isHidden: true },
        { input: 'list = MyLinkedList(), list.addAtHead(1), list.deleteAtIndex(1)', output: 'no effect', description: 'Delete invalid index', isHidden: true }
      ];

    case '82': // Design Browser History
      return [
        // Visible test cases
        { input: 'history = BrowserHistory("leetcode.com"), history.visit("google.com"), history.visit("facebook.com"), history.visit("youtube.com"), history.back(1)', output: '"facebook.com"', description: 'Basic operations', isHidden: false },
        { input: 'history = BrowserHistory("leetcode.com"), history.visit("google.com"), history.back(1), history.forward(1)', output: '"google.com"', description: 'Forward operation', isHidden: false },
        { input: 'history = BrowserHistory("leetcode.com"), history.back(1)', output: '"leetcode.com"', description: 'Back from start', isHidden: false },

        // Hidden test cases
        { input: 'history = BrowserHistory("a.com"), history.visit("b.com"), history.visit("c.com"), history.back(2)', output: '"a.com"', description: 'Multiple back steps', isHidden: true },
        { input: 'history = BrowserHistory("a.com"), history.forward(1)', output: '"a.com"', description: 'Forward from start', isHidden: true },
        { input: 'history = BrowserHistory("a.com"), history.visit("b.com"), history.visit("c.com"), history.back(1), history.visit("d.com")', output: '"d.com"', description: 'Visit after back', isHidden: true },
        { input: 'history = BrowserHistory("a.com"), history.back(10)', output: '"a.com"', description: 'Excessive back steps', isHidden: true }
      ];

    case '83': // Design Underground System
      return [
        // Visible test cases
        { input: 'system = UndergroundSystem(), system.checkIn(45,"Leyton",3), system.checkIn(32,"Paradise",8), system.checkIn(27,"Leyton",10), system.checkOut(45,"Waterloo",15), system.checkOut(27,"Waterloo",20), system.checkOut(32,"Cambridge",22), system.getAverageTime("Paradise","Cambridge")', output: '14.0', description: 'Basic operations', isHidden: false },
        { input: 'system = UndergroundSystem(), system.checkIn(10,"Leyton",3), system.checkOut(10,"Paradise",8), system.getAverageTime("Leyton","Paradise")', output: '5.0', description: 'Single journey', isHidden: false },
        { input: 'system = UndergroundSystem(), system.getAverageTime("Leyton","Paradise")', output: '0.0', description: 'No journeys', isHidden: false },

        // Hidden test cases
        { input: 'system = UndergroundSystem(), system.checkIn(1,"A",1), system.checkOut(1,"B",5), system.checkIn(1,"A",10), system.checkOut(1,"B",15), system.getAverageTime("A","B")', output: '4.5', description: 'Multiple journeys', isHidden: true },
        { input: 'system = UndergroundSystem(), system.checkIn(1,"A",1), system.checkIn(2,"A",2), system.checkOut(1,"B",5), system.checkOut(2,"B",6), system.getAverageTime("A","B")', output: '4.0', description: 'Multiple customers', isHidden: true },
        { input: 'system = UndergroundSystem(), system.checkIn(1,"A",1)', output: 'no return', description: 'Check in only', isHidden: true },
        { input: 'system = UndergroundSystem(), system.checkOut(1,"B",5)', output: 'no effect', description: 'Check out without check in', isHidden: true }
      ];

    case '84': // Design Authentication Manager
      return [
        // Visible test cases
        { input: 'auth = AuthenticationManager(5), auth.generate("aaa",1), auth.generate("bbb",2), auth.renew("aaa",6), auth.countUnexpiredTokens(6)', output: '1', description: 'Basic operations', isHidden: false },
        { input: 'auth = AuthenticationManager(3), auth.generate("aaa",1), auth.generate("bbb",2), auth.generate("ccc",3), auth.countUnexpiredTokens(4)', output: '3', description: 'All tokens valid', isHidden: false },
        { input: 'auth = AuthenticationManager(1), auth.generate("aaa",1), auth.countUnexpiredTokens(3)', output: '0', description: 'Expired token', isHidden: false },

        // Hidden test cases
        { input: 'auth = AuthenticationManager(5), auth.generate("aaa",1), auth.renew("aaa",3), auth.countUnexpiredTokens(3)', output: '1', description: 'Renew valid token', isHidden: true },
        { input: 'auth = AuthenticationManager(5), auth.generate("aaa",1), auth.renew("aaa",7)', output: 'no effect', description: 'Renew expired token', isHidden: true },
        { input: 'auth = AuthenticationManager(5), auth.renew("aaa",1)', output: 'no effect', description: 'Renew non-existent token', isHidden: true },
        { input: 'auth = AuthenticationManager(5), auth.countUnexpiredTokens(1)', output: '0', description: 'Empty manager', isHidden: true }
      ];

    case '85': // Design Leaderboard
      return [
        // Visible test cases
        { input: 'board = Leaderboard(), board.addScore(1,73), board.addScore(2,56), board.addScore(3,39), board.addScore(4,51), board.addScore(5,4), board.top(1)', output: '73', description: 'Basic operations', isHidden: false },
        { input: 'board = Leaderboard(), board.addScore(1,73), board.addScore(2,56), board.addScore(3,39), board.reset(1), board.top(1)', output: '56', description: 'Reset operation', isHidden: false },
        { input: 'board = Leaderboard(), board.addScore(1,73), board.addScore(1,76), board.top(1)', output: '149', description: 'Add to existing score', isHidden: false },

        // Hidden test cases
        { input: 'board = Leaderboard(), board.top(1)', output: '0', description: 'Empty leaderboard', isHidden: true },
        { input: 'board = Leaderboard(), board.addScore(1,10), board.addScore(2,20), board.addScore(3,30), board.top(2)', output: '50', description: 'Top 2 scores', isHidden: true },
        { input: 'board = Leaderboard(), board.addScore(1,100), board.reset(1), board.addScore(1,50), board.top(1)', output: '50', description: 'Reset and re-add', isHidden: true },
        { input: 'board = Leaderboard(), board.reset(1)', output: 'no effect', description: 'Reset non-existent player', isHidden: true }
      ];

    case '86': // Design Parking System
      return [
        // Visible test cases
        { input: 'parking = ParkingSystem(1,1,0), parking.addCar(1), parking.addCar(2), parking.addCar(3), parking.addCar(1)', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'parking = ParkingSystem(1,1,1), parking.addCar(1), parking.addCar(2), parking.addCar(3)', output: 'true', description: 'All car types', isHidden: false },
        { input: 'parking = ParkingSystem(0,0,0), parking.addCar(1)', output: 'false', description: 'No spaces', isHidden: false },

        // Hidden test cases
        { input: 'parking = ParkingSystem(2,1,1), parking.addCar(1), parking.addCar(1), parking.addCar(1)', output: 'false', description: 'Multiple big cars', isHidden: true },
        { input: 'parking = ParkingSystem(1,1,1), parking.addCar(4)', output: 'false', description: 'Invalid car type', isHidden: true },
        { input: 'parking = ParkingSystem(1,1,1), parking.addCar(1), parking.addCar(1)', output: 'false', description: 'Exceed capacity', isHidden: true },
        { input: 'parking = ParkingSystem(0,0,0), parking.addCar(2)', output: 'false', description: 'No medium spaces', isHidden: true }
      ];

    case '87': // Design Ordered Stream
      return [
        // Visible test cases
        { input: 'stream = OrderedStream(5), stream.insert(3,"ccccc"), stream.insert(1,"aaaaa"), stream.insert(2,"bbbbb"), stream.insert(5,"eeeee"), stream.insert(4,"ddddd")', output: '["aaaaa","bbbbb","ccccc"]', description: 'Basic operations', isHidden: false },
        { input: 'stream = OrderedStream(1), stream.insert(1,"a")', output: '["a"]', description: 'Single element', isHidden: false },
        { input: 'stream = OrderedStream(2), stream.insert(2,"b")', output: '[]', description: 'Gap in sequence', isHidden: false },

        // Hidden test cases
        { input: 'stream = OrderedStream(3), stream.insert(1,"a"), stream.insert(3,"c"), stream.insert(2,"b")', output: '["a","b","c"]', description: 'Out of order insertion', isHidden: true },
        { input: 'stream = OrderedStream(2), stream.insert(1,"a"), stream.insert(1,"b")', output: '["b"]', description: 'Update existing key', isHidden: true },
        { input: 'stream = OrderedStream(1), stream.insert(2,"a")', output: '[]', description: 'Invalid key', isHidden: true },
        { input: 'stream = OrderedStream(3), stream.insert(3,"c")', output: '[]', description: 'Gap at end', isHidden: true }
      ];

    case '88': // Design Recent Counter
      return [
        // Visible test cases
        { input: 'counter = RecentCounter(), counter.ping(1), counter.ping(100), counter.ping(3001), counter.ping(3002)', output: '3', description: 'Basic operations', isHidden: false },
        { input: 'counter = RecentCounter(), counter.ping(1)', output: '1', description: 'Single ping', isHidden: false },
        { input: 'counter = RecentCounter(), counter.ping(1), counter.ping(100), counter.ping(3001)', output: '2', description: 'Expired ping', isHidden: false },

        // Hidden test cases
        { input: 'counter = RecentCounter(), counter.ping(1), counter.ping(2), counter.ping(3)', output: '3', description: 'All recent pings', isHidden: true },
        { input: 'counter = RecentCounter(), counter.ping(3000), counter.ping(3001), counter.ping(3002)', output: '3', description: 'Boundary pings', isHidden: true },
        { input: 'counter = RecentCounter(), counter.ping(1), counter.ping(3002)', output: '1', description: 'Expired first ping', isHidden: true },
        { input: 'counter = RecentCounter(), counter.ping(0)', output: '1', description: 'Zero timestamp', isHidden: true }
      ];

    case '89': // Design Logger Rate Limiter
      return [
        // Visible test cases
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo"), logger.shouldPrintMessage(2,"bar"), logger.shouldPrintMessage(3,"foo")', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo"), logger.shouldPrintMessage(11,"foo")', output: 'true', description: 'After 10 seconds', isHidden: false },
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo")', output: 'true', description: 'First message', isHidden: false },

        // Hidden test cases
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo"), logger.shouldPrintMessage(1,"bar")', output: 'true', description: 'Different messages', isHidden: true },
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo"), logger.shouldPrintMessage(10,"foo")', output: 'false', description: 'Exactly 9 seconds', isHidden: true },
        { input: 'logger = Logger(), logger.shouldPrintMessage(1,"foo"), logger.shouldPrintMessage(11,"foo"), logger.shouldPrintMessage(12,"foo")', output: 'false', description: 'Multiple prints', isHidden: true },
        { input: 'logger = Logger(), logger.shouldPrintMessage(0,"foo")', output: 'true', description: 'Zero timestamp', isHidden: true }
      ];

    case '90': // Design Hit Counter
      return [
        // Visible test cases
        { input: 'counter = HitCounter(), counter.hit(1), counter.hit(2), counter.hit(3), counter.getHits(4)', output: '3', description: 'Basic operations', isHidden: false },
        { input: 'counter = HitCounter(), counter.hit(1), counter.hit(2), counter.hit(3), counter.getHits(300)', output: '0', description: 'Expired hits', isHidden: false },
        { input: 'counter = HitCounter(), counter.getHits(1)', output: '0', description: 'No hits', isHidden: false },

        // Hidden test cases
        { input: 'counter = HitCounter(), counter.hit(1), counter.hit(1), counter.hit(1), counter.getHits(1)', output: '3', description: 'Multiple hits same time', isHidden: true },
        { input: 'counter = HitCounter(), counter.hit(1), counter.hit(301), counter.getHits(301)', output: '1', description: 'Boundary time', isHidden: true },
        { input: 'counter = HitCounter(), counter.hit(1), counter.hit(2), counter.hit(3), counter.getHits(2)', output: '2', description: 'Partial range', isHidden: true },
        { input: 'counter = HitCounter(), counter.hit(0), counter.getHits(0)', output: '1', description: 'Zero timestamp', isHidden: true }
      ];

    case '91': // Design Snake Game
      return [
        // Visible test cases
        { input: 'game = SnakeGame(3,2,[[1,2],[0,1]]), game.move("R"), game.move("D"), game.move("R"), game.move("U"), game.move("L"), game.move("U")', output: '3', description: 'Basic game', isHidden: false },
        { input: 'game = SnakeGame(2,2,[[0,1]]), game.move("R"), game.move("D")', output: '1', description: 'Simple game', isHidden: false },
        { input: 'game = SnakeGame(1,1,[]), game.move("R")', output: '-1', description: 'Hit wall', isHidden: false },

        // Hidden test cases
        { input: 'game = SnakeGame(3,3,[[2,0],[0,0],[0,2],[2,2]]), game.move("D"), game.move("D"), game.move("L"), game.move("L")', output: '4', description: 'Complex path', isHidden: true },
        { input: 'game = SnakeGame(2,2,[[1,1]]), game.move("R"), game.move("D"), game.move("L")', output: '-1', description: 'Hit self', isHidden: true },
        { input: 'game = SnakeGame(1,1,[[0,0]]), game.move("R")', output: '1', description: 'Eat food', isHidden: true },
        { input: 'game = SnakeGame(3,3,[]), game.move("U")', output: '-1', description: 'Move up from top', isHidden: true }
      ];

    case '92': // Design Tic-Tac-Toe
      return [
        // Visible test cases
        { input: 'game = TicTacToe(3), game.move(0,0,1), game.move(0,2,2), game.move(2,2,1), game.move(1,1,2), game.move(2,0,1), game.move(1,0,2), game.move(2,1,1)', output: '1', description: 'Player 1 wins', isHidden: false },
        { input: 'game = TicTacToe(3), game.move(0,0,1), game.move(0,2,2), game.move(2,2,1), game.move(1,1,2), game.move(2,0,1), game.move(1,0,2)', output: '0', description: 'No winner yet', isHidden: false },
        { input: 'game = TicTacToe(1), game.move(0,0,1)', output: '1', description: 'Single cell', isHidden: false },

        // Hidden test cases
        { input: 'game = TicTacToe(2), game.move(0,0,1), game.move(0,1,2), game.move(1,0,1), game.move(1,1,2)', output: '2', description: 'Player 2 wins', isHidden: true },
        { input: 'game = TicTacToe(3), game.move(0,0,1), game.move(1,1,1), game.move(2,2,1)', output: '1', description: 'Diagonal win', isHidden: true },
        { input: 'game = TicTacToe(3), game.move(0,0,1), game.move(0,1,1), game.move(0,2,1)', output: '1', description: 'Row win', isHidden: true },
        { input: 'game = TicTacToe(3), game.move(0,0,1), game.move(1,0,1), game.move(2,0,1)', output: '1', description: 'Column win', isHidden: true }
      ];

    case '93': // Design Connect Four
      return [
        // Visible test cases
        { input: 'game = ConnectFour(6,7), game.drop(3,1), game.drop(3,2), game.drop(3,1), game.drop(3,2), game.drop(3,1), game.drop(3,2)', output: '1', description: 'Player 1 wins', isHidden: false },
        { input: 'game = ConnectFour(3,3), game.drop(0,1), game.drop(1,2), game.drop(2,1)', output: '-1', description: 'No winner yet', isHidden: false },
        { input: 'game = ConnectFour(1,1), game.drop(0,1)', output: '1', description: 'Single cell', isHidden: false },

        // Hidden test cases
        { input: 'game = ConnectFour(6,7), game.drop(0,1), game.drop(1,1), game.drop(2,1), game.drop(3,1)', output: '1', description: 'Horizontal win', isHidden: true },
        { input: 'game = ConnectFour(6,7), game.drop(3,1), game.drop(3,2), game.drop(3,1), game.drop(3,2), game.drop(3,1), game.drop(3,2), game.drop(3,1)', output: '1', description: 'Vertical win', isHidden: true },
        { input: 'game = ConnectFour(6,7), game.drop(3,1), game.drop(4,2), game.drop(5,1), game.drop(6,2), game.drop(6,1)', output: '-1', description: 'Diagonal check', isHidden: true },
        { input: 'game = ConnectFour(6,7), game.drop(0,1), game.drop(0,1), game.drop(0,1), game.drop(0,1), game.drop(0,1), game.drop(0,1), game.drop(0,2)', output: '-1', description: 'Full column', isHidden: true }
      ];

    case '94': // Design Minesweeper
      return [
        // Visible test cases
        { input: 'board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]', output: '[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]', description: 'Basic reveal', isHidden: false },
        { input: 'board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]', output: '[["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]', description: 'Hit mine', isHidden: false },
        { input: 'board = [["E"]], click = [0,0]', output: '[["B"]]', description: 'Single cell', isHidden: false },

        // Hidden test cases
        { input: 'board = [["M","E","E"],["E","E","E"],["E","E","E"]], click = [0,1]', output: '[["M","1","E"],["1","1","E"],["E","E","E"]]', description: 'Adjacent to mine', isHidden: true },
        { input: 'board = [["E","E","E"],["E","M","E"],["E","E","E"]], click = [1,1]', output: '[["E","E","E"],["E","X","E"],["E","E","E"]]', description: 'Click on mine', isHidden: true },
        { input: 'board = [["E","E","E","E","E"],["E","E","E","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [0,0]', output: 'all revealed', description: 'No mines', isHidden: true },
        { input: 'board = [["M","M","M"],["M","M","M"],["M","M","M"]], click = [0,0]', output: '[["X","M","M"],["M","M","M"],["M","M","M"]]', description: 'All mines', isHidden: true }
      ];

    case '95': // Design Excel Sum Formula
      return [
        // Visible test cases
        { input: 'excel = Excel(3,"C"), excel.set(1,"A",2), excel.sum(3,"C",["A1","A1:B2"]), excel.get(3,"C")', output: '4', description: 'Basic operations', isHidden: false },
        { input: 'excel = Excel(3,"C"), excel.set(1,"A",2), excel.get(1,"A")', output: '2', description: 'Set and get', isHidden: false },
        { input: 'excel = Excel(3,"C"), excel.sum(1,"A",["A2"]), excel.get(1,"A")', output: '0', description: 'Sum empty cells', isHidden: false },

        // Hidden test cases
        { input: 'excel = Excel(2,"B"), excel.set(1,"A",5), excel.set(1,"B",3), excel.sum(2,"A",["A1","B1"]), excel.get(2,"A")', output: '8', description: 'Sum multiple cells', isHidden: true },
        { input: 'excel = Excel(3,"C"), excel.set(1,"A",1), excel.set(2,"A",2), excel.sum(3,"A",["A1:A2"]), excel.get(3,"A")', output: '3', description: 'Sum range', isHidden: true },
        { input: 'excel = Excel(2,"B"), excel.sum(1,"A",["A1"]), excel.get(1,"A")', output: '0', description: 'Circular reference', isHidden: true },
        { input: 'excel = Excel(1,"A"), excel.set(1,"A",10), excel.get(1,"A")', output: '10', description: 'Single cell', isHidden: true }
      ];

    case '96': // Design File System
      return [
        // Visible test cases
        { input: 'fs = FileSystem(), fs.createPath("/a",1), fs.get("/a")', output: '1', description: 'Basic operations', isHidden: false },
        { input: 'fs = FileSystem(), fs.createPath("/leet",1), fs.createPath("/leet/code",2), fs.get("/leet/code")', output: '2', description: 'Nested paths', isHidden: false },
        { input: 'fs = FileSystem(), fs.createPath("/c/d",1), fs.get("/c")', output: '-1', description: 'Parent not exists', isHidden: false },

        // Hidden test cases
        { input: 'fs = FileSystem(), fs.createPath("/a",1), fs.createPath("/a",2)', output: 'false', description: 'Path already exists', isHidden: true },
        { input: 'fs = FileSystem(), fs.get("/a")', output: '-1', description: 'Path not exists', isHidden: true },
        { input: 'fs = FileSystem(), fs.createPath("/a/b/c",1)', output: 'false', description: 'Parent not exists', isHidden: true },
        { input: 'fs = FileSystem(), fs.createPath("/",1)', output: 'false', description: 'Root path', isHidden: true }
      ];

    case '97': // Design Search Autocomplete System
      return [
        // Visible test cases
        { input: 'system = AutocompleteSystem(["i love you","island","iroman","i love leetcode"],[5,3,2,2]), system.input("i"), system.input(" "), system.input("a"), system.input("#")', output: '["i love you","island","i love leetcode"]', description: 'Basic autocomplete', isHidden: false },
        { input: 'system = AutocompleteSystem(["abc","abbc","a"],[3,3,3]), system.input("a"), system.input("b"), system.input("c"), system.input("#")', output: '["abc","abbc"]', description: 'Multiple matches', isHidden: false },
        { input: 'system = AutocompleteSystem(["abc","abbc","a"],[3,3,3]), system.input("a"), system.input("b"), system.input("b"), system.input("c"), system.input("#")', output: '["abbc"]', description: 'Exact match', isHidden: false },

        // Hidden test cases
        { input: 'system = AutocompleteSystem(["i love you","island","iroman"],[5,3,2]), system.input("i"), system.input(" "), system.input("l"), system.input("o"), system.input("v"), system.input("e"), system.input(" "), system.input("y"), system.input("o"), system.input("u"), system.input("#")', output: '["i love you"]', description: 'Complete word', isHidden: true },
        { input: 'system = AutocompleteSystem(["abc","def"],[1,1]), system.input("x"), system.input("#")', output: '[]', description: 'No matches', isHidden: true },
        { input: 'system = AutocompleteSystem(["a","aa","aaa"],[1,1,1]), system.input("a"), system.input("#")', output: '["a","aa","aaa"]', description: 'Prefix matches', isHidden: true },
        { input: 'system = AutocompleteSystem([],[], system.input("a")', output: '[]', description: 'Empty dictionary', isHidden: true }
      ];

    case '98': // Design Word Dictionary
      return [
        // Visible test cases
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search("pad")', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search("bad")', output: 'true', description: 'Exact match', isHidden: false },
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search(".ad")', output: 'true', description: 'Wildcard match', isHidden: false },

        // Hidden test cases
        { input: 'dict = WordDictionary(), dict.addWord("a"), dict.search(".")', output: 'true', description: 'Single character', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search("a.")', output: 'true', description: 'Wildcard at end', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search(".t")', output: 'true', description: 'Wildcard at start', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search("..")', output: 'true', description: 'Two wildcards', isHidden: true }
      ];

    case '99': // Design Magic Dictionary
      return [
        // Visible test cases
        { input: 'dict = MagicDictionary(), dict.buildDict(["hello","leetcode"]), dict.search("hello")', output: 'false', description: 'Exact match', isHidden: false },
        { input: 'dict = MagicDictionary(), dict.buildDict(["hello","leetcode"]), dict.search("hhllo")', output: 'true', description: 'One character different', isHidden: false },
        { input: 'dict = MagicDictionary(), dict.buildDict(["hello","leetcode"]), dict.search("hell")', output: 'false', description: 'Different length', isHidden: false },

        // Hidden test cases
        { input: 'dict = MagicDictionary(), dict.buildDict(["hello","hallo","leetcode"]), dict.search("hello")', output: 'true', description: 'Multiple matches', isHidden: true },
        { input: 'dict = MagicDictionary(), dict.buildDict(["a","b","c"]), dict.search("d")', output: 'false', description: 'No matches', isHidden: true },
        { input: 'dict = MagicDictionary(), dict.buildDict(["hello"]), dict.search("hello")', output: 'false', description: 'Exact match only', isHidden: true },
        { input: 'dict = MagicDictionary(), dict.search("hello")', output: 'false', description: 'Empty dictionary', isHidden: true }
      ];

    case '100': // Design Add and Search Words
      return [
        // Visible test cases
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search("pad")', output: 'false', description: 'Basic operations', isHidden: false },
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search("bad")', output: 'true', description: 'Exact match', isHidden: false },
        { input: 'dict = WordDictionary(), dict.addWord("bad"), dict.addWord("dad"), dict.addWord("mad"), dict.search(".ad")', output: 'true', description: 'Wildcard match', isHidden: false },

        // Hidden test cases
        { input: 'dict = WordDictionary(), dict.addWord("a"), dict.search(".")', output: 'true', description: 'Single character', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search("a.")', output: 'true', description: 'Wildcard at end', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search(".t")', output: 'true', description: 'Wildcard at start', isHidden: true },
        { input: 'dict = WordDictionary(), dict.addWord("at"), dict.search("..")', output: 'true', description: 'Two wildcards', isHidden: true }
      ];

    default:
      return [ { input: 'Test input 1', output: 'Expected output 1', description: 'Basic test', isHidden: false } ];
  }
};

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
      isHidden: tc.isHidden ?? false,
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

