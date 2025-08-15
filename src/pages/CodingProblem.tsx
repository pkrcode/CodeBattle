import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Code, 
  Terminal,
  ArrowLeft,
  Trophy,
  Zap,
  Save,
  RotateCcw,
  Send,
  AlertCircle,
  GripVertical
} from 'lucide-react';
import { Problem } from '../types';
import { getProblemById } from '../data/problemBank';
import Editor from '@monaco-editor/react';
import { codeExecutionService, TestResult } from '../utils/codeExecutionService';
import About from '../components/About';

// Add custom styles for Monaco Editor scrolling
const editorStyles = `
  .monaco-editor {
    overflow: auto !important;
  }
  .monaco-editor .overflow-guard {
    overflow: auto !important;
  }
  .monaco-editor .monaco-scrollable-element {
    overflow: auto !important;
  }
  .monaco-editor .monaco-scrollable-element .monaco-editor-background {
    overflow: auto !important;
  }
  .monaco-editor .monaco-scrollable-element .monaco-editor-background .monaco-editor-background {
    overflow: auto !important;
  }
`;

interface TestCase {
  input: string;
  output: string;
  description: string;
}

const CodingProblem: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'python' | 'javascript' | 'java'>('cpp');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [output, setOutput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [firebaseStatus, setFirebaseStatus] = useState<'online' | 'offline'>('online');
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProblem = getProblemById(problemId || '');
    if (foundProblem) {
      setProblem(foundProblem);
      setCode(foundProblem.starterCode[selectedLanguage]);
    }
  }, [problemId, selectedLanguage]);

  useEffect(() => {
    // Check backend status on component mount
    const checkBackendStatus = async () => {
      setBackendStatus('checking');
      const isHealthy = await codeExecutionService.checkHealth();
      setBackendStatus(isHealthy ? 'online' : 'offline');
    };
    
    // Check Firebase status
    const checkFirebaseStatus = () => {
      setFirebaseStatus(navigator.onLine ? 'online' : 'offline');
    };
    
    checkBackendStatus();
    checkFirebaseStatus();
    
    // Listen for online/offline events
    window.addEventListener('online', checkFirebaseStatus);
    window.addEventListener('offline', checkFirebaseStatus);
    
    return () => {
      window.removeEventListener('online', checkFirebaseStatus);
      window.removeEventListener('offline', checkFirebaseStatus);
    };
  }, []);

  // Periodically re-check backend health to keep status fresh
  useEffect(() => {
    let isMounted = true;
    const intervalId = window.setInterval(async () => {
      try {
        const isHealthy = await codeExecutionService.checkHealth();
        if (isMounted) {
          setBackendStatus(isHealthy ? 'online' : 'offline');
        }
      } catch {
        if (isMounted) {
          setBackendStatus('offline');
        }
      }
    }, 8000); // every 8 seconds

    // Also refresh when window regains focus
    const handleFocus = async () => {
      const isHealthy = await codeExecutionService.checkHealth();
      if (isMounted) {
        setBackendStatus(isHealthy ? 'online' : 'offline');
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Handle panel resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const container = resizeRef.current?.parentElement;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Limit the width between 20% and 80%
      const clampedWidth = Math.max(20, Math.min(80, newWidth));
      setLeftPanelWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Auto-scroll terminal to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Smoothly jump to the terminal output panel
  const scrollToTerminal = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // When terminal can't scroll further, let the page scroll
  const handleTerminalWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atTop = el.scrollTop <= 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
      e.preventDefault();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const runCode = async () => {
    if (!problem) return;
    
    setIsRunning(true);
    setOutput('Running test cases...\n');
    
    try {
      // Check if backend is available
      const isHealthy = await codeExecutionService.checkHealth();
      if (!isHealthy) {
        setOutput('❌ Code execution service is not available. Please make sure the backend is running.\n');
        setIsRunning(false);
        return;
      }
      
      const response = await codeExecutionService.executeCode({
        code,
        language: selectedLanguage,
        testCases: problem.testCases,
        problemId: problem.id
      });
      
      if (!response.success) {
        setOutput(`❌ Code execution failed: ${response.error}\n`);
        setIsRunning(false);
        return;
      }
      
      if (!response.results) {
        setOutput('❌ No results received from code execution service.\n');
        setIsRunning(false);
        return;
      }
      
      const { results, allPassed, totalTests, passedTests } = response.results;
      
      setTestResults(results);
      
      // Update output with results
      let outputText = '';
      results.forEach((result, index) => {
        outputText += `Test case ${index + 1}: ${result.passed ? 'PASSED' : 'FAILED'}\n`;
        if (!result.passed) {
          outputText += `  Expected: ${result.expected}\n`;
          outputText += `  Actual: ${result.actual}\n`;
          if (result.error) {
            outputText += `  Error: ${result.error}\n`;
          }
        }
        outputText += `  Time: ${result.executionTime}ms\n\n`;
      });
      
      outputText += `\n${passedTests}/${totalTests} test cases passed.\n`;
      
      if (allPassed) {
        outputText += '🎉 All test cases passed! Problem solved!\n';
        if (!user) {
          outputText += '💡 Sign up or log in to earn XP and track your progress!\n';
        }
      } else {
        outputText += '❌ Some test cases failed. Try again!\n';
      }
      
      setOutput(outputText);
      
      // Scroll terminal to bottom after output is updated
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 100);
      
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`❌ Code execution error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    setOutput('Submitting solution...\n');
    
    // First run the code to check if it passes all tests
    await runCode();
    
    // Wait a bit for the run to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if all tests passed
    const allPassed = testResults.every(result => result.passed);
    
    if (allPassed) {
      setIsSolved(true);
      
      // Award XP
      if (user && !user.achievements.some(a => a.id === `problem_${problem.id}`)) {
        const xpGained = problem.points;
        const newXp = user.xp + xpGained;
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        await updateUserProfile({
          xp: newXp,
          level: newLevel,
          stats: {
            ...user.stats,
            totalProblemsSolved: user.stats.totalProblemsSolved + 1
          }
        });
        
        setOutput(prev => prev + `\n💰 +${xpGained} XP earned! (Total: ${newXp} XP)\n`);
        setOutput(prev => prev + `\n🏆 Problem submitted successfully!\n`);
      }
    } else {
      setOutput(prev => prev + '\n❌ Cannot submit: Some test cases failed. Fix your code and try again!\n');
    }
    
    setIsSubmitting(false);
  };

  const resetCode = () => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage]);
    }
  };

  if (!problem) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problem not found</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Add custom styles for Monaco Editor */}
      <style>{editorStyles}</style>
      
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm border-b p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{problem.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBg(problem.difficulty)} ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty.toUpperCase()}
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{problem.category}</span>
                <span className="text-gold-400 text-sm flex items-center">
                  <Trophy className="w-4 h-4 mr-1" />
                  {problem.points} XP
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Language:</span>
              <div className="flex space-x-1">
                {(['cpp', 'python', 'javascript', 'java'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-primary-600 text-white'
                        : theme === 'dark' 
                          ? 'bg-slate-700 text-gray-300 hover:text-white' 
                          : 'bg-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
            
            <div className="flex items-center space-x-2">
              {/* Backend Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'online' ? 'bg-green-400' :
                  backendStatus === 'offline' ? 'bg-red-400' :
                  'bg-yellow-400 animate-pulse'
                }`}></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {backendStatus === 'online' ? 'Backend Online' :
                   backendStatus === 'offline' ? 'Backend Offline' :
                   'Checking...'}
                </span>
              </div>
              
              <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

              {/* Firebase Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  firebaseStatus === 'online' ? 'bg-blue-400' : 'bg-orange-400'
                }`}></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {firebaseStatus === 'online' ? 'Firebase Online' : 'Firebase Offline'}
                </span>
              </div>
              
              <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

              {/* Login Prompt for Non-logged Users */}
              {!user && (
                <>
                  <div className={`text-xs ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    💡 Sign in to earn XP and track progress
                  </div>
                  <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
                </>
              )}
              
              <button
                onClick={scrollToTerminal}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Output</span>
              </button>
              <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

              <button
                onClick={resetCode}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={runCode}
                disabled={isRunning || isSubmitting || backendStatus !== 'online'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title={backendStatus !== 'online' ? 'Backend is offline. Please start the backend server.' : ''}
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run</span>
                  </>
                )}
              </button>
              {user && (
                <button
                  onClick={submitSolution}
                  disabled={isRunning || isSubmitting || isSolved || backendStatus !== 'online'}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title={backendStatus !== 'online' ? 'Backend is offline. Please start the backend server.' : ''}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 h-screen overflow-hidden">
        <div className="flex h-full gap-4" ref={resizeRef}>
          {/* Problem Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 overflow-y-auto pr-2 flex flex-col h-full"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
              <h2 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Code className="w-5 h-5 mr-2 text-primary-400" />
                Problem Description
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {problem.description}
                </pre>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Test Cases</h3>
              <div className="space-y-4">
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Test Case {index + 1}</div>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{testCase.description}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className={`mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Input:</div>
                        <div className={`p-2 rounded font-mono ${theme === 'dark' ? 'bg-slate-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                          {testCase.input}
                        </div>
                      </div>
                      <div>
                        <div className={`mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expected Output:</div>
                        <div className={`p-2 rounded font-mono ${theme === 'dark' ? 'bg-slate-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                          {testCase.output}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resize Handle */}
          <div
            className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors flex items-center justify-center"
            onMouseDown={handleMouseDown}
          >
            <GripVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Code Editor and Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 overflow-y-auto pr-2 flex-1 flex flex-col h-full"
          >

            {/* Code Editor */}
            <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl border overflow-hidden flex flex-col`}>
              <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'} flex-shrink-0`}>
                <div className="flex items-center space-x-2">
                  <Code className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Code Editor</span>
                </div>
              </div>
              <div 
                className="flex-1 min-h-0" 
                style={{ 
                  minHeight: '500px',
                  position: 'relative'
                }}
              >
                <Editor
                  height="500px"
                  value={code}
                  onChange={(v) => setCode(v || '')}
                  language={selectedLanguage === 'javascript' ? 'javascript' : selectedLanguage}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    lineNumbers: 'on',
                    scrollBeyondLastLine: true,
                    automaticLayout: true,
                    wordWrap: 'on',
                    folding: true,
                    showFoldingControls: 'always',
                    scrollbar: {
                      vertical: 'visible',
                      horizontal: 'visible',
                      verticalScrollbarSize: 14,
                      horizontalScrollbarSize: 14
                    },
                    mouseWheelScrollSensitivity: 1,
                    fastScrollSensitivity: 5,
                    fixedOverflowWidgets: true,
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    overviewRulerLanes: 0
                  }}
                />
              </div>
            </div>

            {/* Output Terminal */}
            <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl border overflow-hidden flex flex-col`}>
              <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'} flex-shrink-0`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Output</span>
                  </div>
                  <button
                    onClick={() => setOutput('')}
                    className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div 
                ref={terminalRef}
                onWheel={handleTerminalWheel}
                className={`flex-1 p-4 overflow-y-auto ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} min-h-64 max-h-96`}
              >
                <pre className={`text-sm font-mono whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {output || 'Run your code to see the output here...'}
                </pre>
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 border`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Test Results</h3>
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.passed ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <div>
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Test Case {index + 1}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {result.executionTime}ms
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Expected: {result.expected}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Actual: {result.actual}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* About Section */}
      <About />
    </div>
  );
};

export default CodingProblem;
