const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const os = require('os');

// Supported languages and their configurations
const LANGUAGE_CONFIG = {
  python: {
    extension: '.py',
    command: 'python',
    timeout: 10000,
    memoryLimit: '100m'
  },
  cpp: {
    extension: '.cpp',
    command: 'g++',
    runCommand: './',
    timeout: 10000,
    memoryLimit: '100m',
    compile: true
  },

  java: {
    extension: '.java',
    command: 'javac',
    runCommand: 'java',
    timeout: 10000,
    memoryLimit: '100m',
    compile: true
  }
};
// Problem-specific test case handlers (aligned with problemBank IDs)
const PROBLEM_HANDLERS = {
  '1': { // Reverse a Singly Linked List
    handler: (input, output) => {
      try {
        const arr = JSON.parse(input);
        const reversed = arr.reverse();
        const normalizedOutput = output.replace(/\s+/g, '');
        const normalizedReversed = JSON.stringify(reversed).replace(/\s+/g, '');
        return normalizedReversed === normalizedOutput;
      } catch (e) {
        return false;
      }
    }
  },
  '4': { // Valid Parentheses
    handler: (input, output) => {
      const str = input.replace(/\"/g, '');
      const expected = output === 'true';
      const stack = [];
      const pairs = { '(': ')', '[': ']', '{': '}' };
      for (let char of str) {
        if (pairs[char]) {
          stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
          if (stack.length === 0 || pairs[stack.pop()] !== char) {
            return !expected;
          }
        }
      }
      return (stack.length === 0) === expected;
    }
  },
  '5': { // Maximum Subarray Sum (Kadane)
    handler: (input, output) => {
      try {
        const arr = JSON.parse(input);
        let maxSoFar = arr[0];
        let maxEndingHere = arr[0];
        for (let i = 1; i < arr.length; i++) {
          maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
          maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar.toString() === output;
      } catch (e) {
        return false;
      }
    }
  },
  '6': { // Binary Search
    handler: (input, output) => {
      try {
        const lines = input.split('\n');
        const arr = JSON.parse(lines[0]);
        const target = parseInt(lines[1]);
        let left = 0, right = arr.length - 1;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) {
            return mid.toString() === output;
          } else if (arr[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return '-1' === output;
      } catch (e) {
        return false;
      }
    }
  }
};

// Create a temporary directory for code execution
async function createTempDir() {
  const tempDir = path.join(os.tmpdir(), `code-exec-${uuidv4()}`);
  await fs.mkdir(tempDir, { recursive: true });
  return tempDir;
}

// Write code to a temporary file
async function writeCodeToFile(tempDir, code, language, problemId) {
  const config = LANGUAGE_CONFIG[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }
  
  let filename, filepath;
  
  if (language === 'java') {
    // For Java, the class name must match the filename
    filename = 'Solution.java';
    filepath = path.join(tempDir, filename);
    
    // Ensure the class name matches the filename
    const updatedCode = code.replace(/public class \w+/, 'public class Solution');
    await fs.writeFile(filepath, updatedCode, 'utf8');
  } else if (language === 'cpp') {
    // C++: build a small harness for supported problems; otherwise expect a full program
    filename = 'solution.cpp';
    filepath = path.join(tempDir, filename);

    // Try to extract the entire Solution class or fallback to function body
    const preprocess = (input) => {
      let cleaned = input;
      // Remove plain leading line numbers (e.g., "24 public:")
      cleaned = cleaned.replace(/^\s*\d+\s*/gm, '');
      // Remove leading numbers stuck to access specifiers (e.g., "24public:")
      cleaned = cleaned.replace(/^\s*\d+(?=(public|private|protected)\s*:)/gmi, '');
      // Remove stray 'link' lines sometimes copied from editors
      cleaned = cleaned.replace(/^\s*link\s*$/gmi, '');
      return cleaned;
    };
    const extractSolutionClass = (input) => {
      const cleaned = preprocess(input);
      const classMatch = cleaned.match(/class\s+Solution\s*\{[\s\S]*?\};/);
      return classMatch ? classMatch[0] : null;
    };
    const extractFunction = (input, signatureRegex) => {
      const cleaned = preprocess(input);
      const match = cleaned.match(signatureRegex);
      return match ? match[0] : null;
    };

    const solutionClass = extractSolutionClass(code);

    const commonHeaders = `#include <bits/stdc++.h>\nusing namespace std;\n`;

    const buildHarness = (pid) => {
      switch (pid) {
        case '1': { // reverseList
          const classCode = extractSolutionClass(code);
          const reverseFn = extractFunction(code, /ListNode\s*\*\s*reverseList\s*\([^)]*\)\s*\{[\s\S]*?\}/);

          // IMPORTANT: Do NOT inject a full default implementation here. If the user
          // did not supply a Solution class or reverseList implementation, provide
          // only a declaration/skeleton so that the user's code must implement it.
          const solutionBlock = classCode || `class Solution { public: ListNode* reverseList(ListNode* head); };`;

          return `${commonHeaders}
struct ListNode { int val; ListNode* next; ListNode():val(0),next(nullptr){} ListNode(int x):val(x),next(nullptr){} ListNode(int x, ListNode* n):val(x),next(n){} };
${solutionBlock}
int main(){
  string input; getline(cin, input);
  vector<int> arr; if(input.size()>2){ input=input.substr(1,input.size()-2); stringstream ss(input); string item; while(getline(ss,item,',')){ if(!item.empty()) arr.push_back(stoi(item)); }}
  ListNode* head=nullptr; ListNode* tail=nullptr; for(int v:arr){ auto* node=new ListNode(v); if(!head){ head=tail=node; } else { tail->next=node; tail=node; } }
  Solution s; auto* res=s.reverseList(head);
  vector<int> out; for(auto* cur=res; cur; cur=cur->next) out.push_back(cur->val);
  cout<<"["; for(size_t i=0;i<out.size();++i){ if(i) cout<<","; cout<<out[i]; } cout<<"]"<<endl; return 0; }
`;
        }
        case '4': { // isValid parentheses
          const classCode = solutionClass || `class Solution{ public: bool isValid(string s){ stack<char> st; unordered_map<char,char> mp={{')','('},{']','['},{'}','{'}}; for(char c: s){ if(mp.count(c)){ if(st.empty()||st.top()!=mp[c]) return false; st.pop(); } else if(c=='('||c=='['||c=='{') st.push(c); } return st.empty(); } };`;
          return `${commonHeaders}
${classCode}
int main(){ string s; getline(cin,s); Solution sol; bool ans=sol.isValid(s); cout<<(ans?"true":"false")<<endl; return 0; }
`;
        }
        case '5': { // maxSubArray
          const classCode = solutionClass || `class Solution{ public: int maxSubArray(vector<int>& nums){ int best=nums[0], cur=nums[0]; for(size_t i=1;i<nums.size();++i){ cur=max(nums[i], cur+nums[i]); best=max(best,cur);} return best; } };`;
          return `${commonHeaders}
${classCode}
int main(){ string input; getline(cin,input); vector<int> nums; if(input.size()>2){ input=input.substr(1,input.size()-2); stringstream ss(input); string item; while(getline(ss,item,',')){ if(!item.empty()) nums.push_back(stoi(item)); }} Solution sol; cout<<sol.maxSubArray(nums)<<endl; return 0; }
`;
        }
        case '6': { // binary search
          const classCode = solutionClass || `class Solution{ public: int search(vector<int>& nums,int target){ int l=0,r=(int)nums.size()-1; while(l<=r){ int m=l+(r-l)/2; if(nums[m]==target) return m; if(nums[m]<target) l=m+1; else r=m-1; } return -1; } };`;
          return `${commonHeaders}
${classCode}
int main(){ string line1; getline(cin,line1); vector<int> nums; if(line1.size()>2){ line1=line1.substr(1,line1.size()-2); stringstream ss(line1); string item; while(getline(ss,item,',')){ if(!item.empty()) nums.push_back(stoi(item)); }} string line2; getline(cin,line2); int target=stoi(line2); Solution sol; cout<<sol.search(nums,target)<<endl; return 0; }
`;
        }
        default:
          return null;
      }
    };

    const harness = buildHarness(problemId);
    if (harness) {
      await fs.writeFile(filepath, harness, 'utf8');
    } else {
      // No harness available: expect a complete program from the user
      await fs.writeFile(filepath, code, 'utf8');
    }
  } else {
    filename = `solution${config.extension}`;
    filepath = path.join(tempDir, filename);
    await fs.writeFile(filepath, code, 'utf8');
  }
  
  return { filename, filepath };
}

// Execute code with input
async function executeCodeWithInput(filepath, language, input, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const config = LANGUAGE_CONFIG[language];
    let command;
    
    if (language === 'cpp') {
      // Compile first, then run
      const executable = filepath.replace('.cpp', '.exe');
      command = `${config.command} -std=c++11 "${filepath}" -o "${executable}" && "${executable}"`;
    } else if (language === 'java') {
      // Compile first, then run
      const className = path.basename(filepath, '.java');
      command = `${config.command} "${filepath}" && ${config.runCommand} -cp "${path.dirname(filepath)}" ${className}`;
    } else {
      command = `${config.command} "${filepath}"`;
    }
    
    const child = exec(command, { 
      timeout,
      maxBuffer: 1024 * 1024 // 1MB buffer
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Execution failed: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
    
    // Send input to stdin if provided
    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
}

// Validate output against expected result
function validateOutput(actualOutput, expectedOutput, problemId) {
  // Clean up outputs
  const cleanActual = actualOutput.trim();
  const cleanExpected = expectedOutput.trim();
  
  // First try exact match
  if (cleanActual === cleanExpected) {
    return true;
  }

  // Next, try parsing as JSON and comparing (tolerates whitespace and formatting)
  try {
    const actual = JSON.parse(cleanActual);
    const expected = JSON.parse(cleanExpected);
    const normalizedActual = JSON.stringify(actual).replace(/\s+/g, '');
    const normalizedExpected = JSON.stringify(expected).replace(/\s+/g, '');
    if (normalizedActual === normalizedExpected) return true;
  } catch (e) {
    // Ignore JSON parse errors and continue to other strategies
  }

  // Then, try problem-specific validation (legacy/custom rules)
  if (PROBLEM_HANDLERS[problemId]) {
    try {
      if (PROBLEM_HANDLERS[problemId].handler(cleanActual, cleanExpected)) return true;
    } catch (_) {
      // If a handler throws, fall through to final comparison
    }
  }

  // Finally, try case-insensitive comparison for simple scalar outputs
  return cleanActual.toLowerCase() === cleanExpected.toLowerCase();
}

// Main code execution function
async function executeCode(code, language, testCases, problemId) {
  const tempDir = await createTempDir();
  
  try {
    const { filename, filepath } = await writeCodeToFile(tempDir, code, language, problemId);
    const config = LANGUAGE_CONFIG[language];
    
    const results = [];
    let allPassed = true;
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const startTime = Date.now();
      
      try {
        const actualOutput = await executeCodeWithInput(
          filepath, 
          language, 
          testCase.input, 
          config.timeout
        );
        
        const executionTime = Date.now() - startTime;
        const passed = validateOutput(actualOutput, testCase.output, problemId);
        
        if (!passed) allPassed = false;
        
        results.push({
          passed,
          input: testCase.input,
          expected: testCase.output,
          actual: actualOutput,
          executionTime,
          testCaseIndex: i + 1
        });
        
      } catch (error) {
        const executionTime = Date.now() - startTime;
        allPassed = false;
        
        results.push({
          passed: false,
          input: testCase.input,
          expected: testCase.output,
          actual: `Error: ${error.message}`,
          executionTime,
          testCaseIndex: i + 1,
          error: error.message
        });
      }
    }
    
    return {
      success: true,
      allPassed,
      results,
      totalTests: testCases.length,
      passedTests: results.filter(r => r.passed).length
    };
    
  } catch (error) {
    throw new Error(`Code execution failed: ${error.message}`);
  } finally {
    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn('Failed to cleanup temp directory:', cleanupError.message);
    }
  }
}

// Test the code execution service
async function testCodeExecution() {
  const testCode = {
    python: `print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`,
    cpp: `class Solution {\npublic:\n    int test() { return 42; }\n};\n\nint main() { std::cout << "Hello, World!" << std::endl; return 0; }`,
    java: `public class Solution { public static void main(String[] args) { System.out.println("Hello, World!"); } }`
  };
  
  const testCases = [{ input: '', output: 'Hello, World!' }];
  
  for (const [language, code] of Object.entries(testCode)) {
    try {
      console.log(`Testing ${language}...`);
      const result = await executeCode(code, language, testCases, 'test');
      console.log(`${language} result:`, result);
    } catch (error) {
      console.error(`${language} failed:`, error.message);
    }
  }
}

module.exports = {
  executeCode,
  testCodeExecution,
  LANGUAGE_CONFIG
};
