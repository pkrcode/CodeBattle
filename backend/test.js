const { executeCode } = require('./services/codeExecutor');

async function testCodeExecution() {
  console.log('🧪 Testing Code Execution Service...\n');

  // Test cases for different languages
  const testCases = [
    {
      name: 'Python Hello World',
      code: 'print("Hello, World!")',
      language: 'python',
      testCases: [{ input: '', output: 'Hello, World!' }],
      problemId: 'test'
    },
    {
      name: 'JavaScript Hello World',
      code: 'console.log("Hello, World!");',
      language: 'javascript',
      testCases: [{ input: '', output: 'Hello, World!' }],
      problemId: 'test'
    },
    {
      name: 'C++ Hello World',
      code: `#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
      language: 'cpp',
      testCases: [{ input: '', output: 'Hello, World!' }],
      problemId: 'test'
    },
    {
      name: 'Java Hello World',
      code: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      language: 'java',
      testCases: [{ input: '', output: 'Hello, World!' }],
      problemId: 'test'
    }
  ];

  for (const test of testCases) {
    console.log(`📝 Testing ${test.name}...`);
    try {
      const result = await executeCode(test.code, test.language, test.testCases, test.problemId);
      console.log(`✅ ${test.name}: ${result.allPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Results: ${result.passedTests}/${result.totalTests} tests passed`);
      if (result.results.length > 0) {
        const firstResult = result.results[0];
        console.log(`   Execution time: ${firstResult.executionTime}ms`);
        if (!firstResult.passed) {
          console.log(`   Error: ${firstResult.actual}`);
        }
      }
    } catch (error) {
      console.log(`❌ ${test.name}: FAILED`);
      console.log(`   Error: ${error.message}`);
    }
    console.log('');
  }

  // Test problem-specific handlers
  console.log('🧪 Testing Problem-Specific Handlers...\n');

  const problemTests = [
    {
      name: 'Reverse Linked List C++ (Problem 1)',
      code: `/**
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
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
      language: 'cpp',
      testCases: [
        { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
        { input: '[1,2]', output: '[2,1]' },
        { input: '[]', output: '[]' }
      ],
      problemId: '1'
    },
    {
      name: 'Reverse Array (Problem 1)',
      code: `def reverse_array(arr):
    return arr[::-1]

# Test
arr = [1, 2, 3, 4, 5]
result = reverse_array(arr)
print(str(result).replace(' ', ''))`,
      language: 'python',
      testCases: [{ input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }],
      problemId: '1'
    },
    {
      name: 'Valid Parentheses (Problem 2)',
      code: `def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    
    for char in s:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0

# Test
print(str(is_valid("()")).lower())`,
      language: 'python',
      testCases: [{ input: '"()"', output: 'true' }],
      problemId: '2'
    }
  ];

  for (const test of problemTests) {
    console.log(`📝 Testing ${test.name}...`);
    try {
      const result = await executeCode(test.code, test.language, test.testCases, test.problemId);
      console.log(`✅ ${test.name}: ${result.allPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Results: ${result.passedTests}/${result.totalTests} tests passed`);
      if (result.results.length > 0) {
        const firstResult = result.results[0];
        console.log(`   Execution time: ${firstResult.executionTime}ms`);
        if (!firstResult.passed) {
          console.log(`   Expected: ${firstResult.expected}`);
          console.log(`   Actual: ${firstResult.actual}`);
        }
      }
    } catch (error) {
      console.log(`❌ ${test.name}: FAILED`);
      console.log(`   Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('🎉 Testing completed!');
}

// Run the tests
testCodeExecution().catch(console.error);
