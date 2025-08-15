const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5111';

export interface TestCase {
  input: string;
  output: string;
  description: string;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  executionTime: number;
  testCaseIndex: number;
  error?: string;
}

export interface ExecutionResult {
  success: boolean;
  allPassed: boolean;
  results: TestResult[];
  totalTests: number;
  passedTests: number;
}

export interface CodeExecutionRequest {
  code: string;
  language: 'cpp' | 'python' | 'javascript' | 'java';
  testCases: TestCase[];
  problemId: string;
}

export interface CodeExecutionResponse {
  success: boolean;
  results?: ExecutionResult;
  error?: string;
}

class CodeExecutionService {
  private baseUrl: string;

  constructor(baseUrl: string = BACKEND_URL) {
    this.baseUrl = baseUrl;
  }

  async executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Code execution failed');
      }

      return data;
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      });

      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const codeExecutionService = new CodeExecutionService();

// Export the class for testing purposes
export default CodeExecutionService;
