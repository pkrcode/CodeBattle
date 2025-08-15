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
  javascript: {
    extension: '.js',
    command: 'node',
    timeout: 10000,
    memoryLimit: '100m'
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

// Problem-specific test case handlers
const PROBLEM_HANDLERS = {
  '1': { // Reverse a Singly Linked List
    handler: (input, output) => {
      // Parse input as array and reverse it
      try {
        const arr = JSON.parse(input);
        const reversed = arr.reverse();
        // Normalize array formatting by removing spaces
        const normalizedOutput = output.replace(/\s+/g, '');
        const normalizedReversed = JSON.stringify(reversed).replace(/\s+/g, '');
        return normalizedReversed === normalizedOutput;
      } catch (e) {
        return false;
      }
    }
  },
  '2': { // Valid Parentheses
    handler: (input, output) => {
      // Remove quotes from input
      const str = input.replace(/"/g, '');
      const expected = output === 'true';
      
      // Simple parentheses validation
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
  '3': { // Find Missing Number
    handler: (input, output) => {
      try {
        const arr = JSON.parse(input);
        const n = arr.length;
        const expectedSum = (n * (n + 1)) / 2;
        const actualSum = arr.reduce((sum, num) => sum + num, 0);
        const missing = expectedSum - actualSum;
        return missing.toString() === output;
      } catch (e) {
        return false;
      }
    }
  },
  '4': { // Maximum Subarray Sum (Kadane)
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
  '5': { // Binary Search
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
async function writeCodeToFile(tempDir, code, language) {
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
      command = `${config.command} "${filepath}" -o "${executable}" && "${executable}"`;
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
  
  // Try problem-specific validation
  if (PROBLEM_HANDLERS[problemId]) {
    return PROBLEM_HANDLERS[problemId].handler(cleanActual, cleanExpected);
  }
  
  // Try parsing as JSON and comparing
  try {
    const actual = JSON.parse(cleanActual);
    const expected = JSON.parse(cleanExpected);
    // Normalize JSON formatting by removing spaces
    const normalizedActual = JSON.stringify(actual).replace(/\s+/g, '');
    const normalizedExpected = JSON.stringify(expected).replace(/\s+/g, '');
    return normalizedActual === normalizedExpected;
  } catch (e) {
    // If not JSON, try case-insensitive comparison
    return cleanActual.toLowerCase() === cleanExpected.toLowerCase();
  }
}

// Main code execution function
async function executeCode(code, language, testCases, problemId) {
  const tempDir = await createTempDir();
  
  try {
    const { filename, filepath } = await writeCodeToFile(tempDir, code, language);
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
    cpp: `#include <iostream>\nint main() { std::cout << "Hello, World!" << std::endl; return 0; }`,
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
