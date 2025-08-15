# Code Execution Backend

This backend service provides code execution capabilities for multiple programming languages, similar to LeetCode's execution environment.

## Features

- **Multi-language Support**: Python, C++, JavaScript, Java
- **Test Case Validation**: Automatic validation of code output against expected results
- **Problem-specific Handlers**: Custom validation logic for different problem types
- **Security**: Sandboxed execution with timeouts and memory limits
- **Real-time Results**: Detailed execution results with timing information

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **Python** (for Python code execution)
- **GCC/G++** (for C++ code execution)
- **Java JDK** (for Java code execution)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10mb
TIMEOUT=10000
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Code Execution
```
POST /api/execute
```

**Request Body:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "testCases": [
    {
      "input": "",
      "output": "Hello, World!"
    }
  ],
  "problemId": "1"
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "allPassed": true,
    "results": [
      {
        "passed": true,
        "input": "",
        "expected": "Hello, World!",
        "actual": "Hello, World!",
        "executionTime": 45,
        "testCaseIndex": 1
      }
    ],
    "totalTests": 1,
    "passedTests": 1
  }
}
```

## Supported Languages

### Python
- Command: `python`
- Extension: `.py`
- Timeout: 10 seconds

### C++
- Command: `g++` (compile) + `./` (run)
- Extension: `.cpp`
- Timeout: 10 seconds

### JavaScript
- Command: `node`
- Extension: `.js`
- Timeout: 10 seconds

### Java
- Command: `javac` (compile) + `java` (run)
- Extension: `.java`
- Timeout: 10 seconds

## Security Features

- **Temporary File System**: Code is executed in isolated temporary directories
- **Timeouts**: All executions have configurable timeouts
- **Memory Limits**: Buffer size limits prevent memory exhaustion
- **Automatic Cleanup**: Temporary files are automatically deleted after execution

## Error Handling

The service provides detailed error messages for:
- Compilation errors
- Runtime errors
- Timeout errors
- Memory limit exceeded
- Invalid language specifications

## Testing

To test the code execution service:

```bash
node -e "require('./services/codeExecutor').testCodeExecution()"
```

## Integration with Frontend

The frontend can integrate with this backend by making HTTP requests to the `/api/execute` endpoint. The service is designed to work seamlessly with the CodeBattle frontend application.
