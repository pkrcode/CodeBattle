import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Check, AlertTriangle, TerminalSquare, Loader2, ChevronLeft, FileText, Code as CodeIcon, RotateCcw } from 'lucide-react';
import { Trophy } from 'lucide-react';
import Editor from '@monaco-editor/react';

import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getProblemById } from '../data/problemBank';
import type { Problem } from '../types';

import {
  loadDraftFromLocal,
  saveDraftToLocal,
  loadDraftFromCloud,
  saveDraftToCloud,
  migrateGuestDraftsForProblem,
  type LangKey,
} from '../utils/codeStorage';

import {
  codeExecutionService,
  type CodeExecutionRequest,
  type TestResult,
  type CodeExecutionResponse,
} from '../utils/codeExecutionService';

import {
  addSubmission,
  listSubmissions,
  type SubmissionRecord,
  type SubmissionStatus,
} from '../utils/submissions';

import AIHelper from '../components/AIHelper';

// Monaco editor custom styles
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
  /* Fix scrolling when reaching the end of editor */
  .monaco-editor .monaco-scrollable-element .monaco-editor-background .monaco-editor-background .monaco-editor-background {
    overflow: auto !important;
  }
`;

function getDifficultyBg(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'bg-green-500/20 border-green-500/30';
    case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
    case 'hard': return 'bg-red-500/20 border-red-500/30';
    default: return 'bg-gray-500/20 border-gray-500/30';
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'hard': return 'text-red-400';
    default: return 'text-gray-400';
  }
}

// Supported languages mapping
const LANGUAGES: ReadonlyArray<{ key: LangKey; label: string; monaco: 'cpp' | 'python' | 'java' }> = [
  { key: 'cpp', label: 'C++', monaco: 'cpp' },
  { key: 'python', label: 'Python', monaco: 'python' },
  { key: 'java', label: 'Java', monaco: 'java' },
] as const;

type MobileTab = 'desc' | 'code';

function useBackendHealth() {
  const [healthy, setHealthy] = useState<boolean | null>(null);

  const ping = useCallback(async () => {
    try {
  const ok = await codeExecutionService.checkHealth();
      setHealthy(ok);
      return ok;
    } catch {
      setHealthy(false);
      return false;
    }
  }, []);

  useEffect(() => {
    ping();
    const id = setInterval(ping, 30000);
    return () => clearInterval(id);
  }, [ping]);

  return { healthy, ping } as const;
}

export default function CodingProblem() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [lang, setLang] = useState<LangKey>('cpp');
  const [code, setCode] = useState<string>('');

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [execError, setExecError] = useState<string | null>(null);
  const [terminal, setTerminal] = useState<string[]>([]);
  const [customTestCases, setCustomTestCases] = useState<Array<{input: string, output: string}>>([]);
  const [showCustomTest, setShowCustomTest] = useState(false);
  const [terminalPosition, setTerminalPosition] = useState<'above' | 'below'>('below');
  const [terminalBorderStyle, setTerminalBorderStyle] = useState<'rounded' | 'sharp' | 'dashed'>('rounded');

  const toggleTerminalPosition = useCallback(() => {
    setTerminalPosition(prev => prev === 'above' ? 'below' : 'above' as const);
  }, []);

  const clearTerm = useCallback(() => setTerminal([]), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [history, setHistory] = useState<SubmissionRecord[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSolved, setIsSolved] = useState(false);

  const [mobileTab, setMobileTab] = useState<MobileTab>('desc');

  const termRef = useRef<HTMLDivElement | null>(null);

  const { healthy } = useBackendHealth();

  // Load problem and initial code
  useEffect(() => {
    if (!problemId) return;
    const p = getProblemById(problemId);
    if (!p) {
      navigate('/problems');
      return;
    }
    setProblem(p);

  const firstAvailable = LANGUAGES.find((l) => p.starterCode[l.key]);
  setLang((firstAvailable?.key as LangKey) ?? 'cpp');
  }, [problemId, navigate]);

  // Load code draft when problem or language changes
  useEffect(() => {
    if (!problem) return;
    const load = async () => {
  if (user) await migrateGuestDraftsForProblem(user.uid, problem.id);

  const cloud = user ? await loadDraftFromCloud({ uid: user.uid, problemId: problem.id, language: lang }) : null;
  const local = loadDraftFromLocal({ problemId: problem.id, language: lang });
      const starter = problem.starterCode[lang] || '';
  // Prefer non-empty cloud/local drafts. If a draft is an empty string,
  // fall back to the starter scaffold so editor is not blank on refresh.
  const cloudNonEmpty = cloud != null && String(cloud).trim() !== '' ? cloud : null;
  const localNonEmpty = local != null && String(local).trim() !== '' ? local : null;
  const initial = cloudNonEmpty ?? localNonEmpty ?? starter;
      setCode(initial);
    };
    load();
  }, [problem, lang, user]);

  // Handle language change - update code with new starter code if no draft exists
  const handleLanguageChange = (newLang: LangKey) => {
    setLang(newLang);
    
    // If there's no saved draft for the new language, use starter code
    if (problem) {
      const local = loadDraftFromLocal({ problemId: problem.id, language: newLang });
      if (!local) {
        const starter = problem.starterCode[newLang] || '';
        setCode(starter);
      }
    }
  };

  // Reset code to default starter code for current language
  const handleResetCode = () => {
    if (problem) {
      const starter = problem.starterCode[lang] || '';
      setCode(starter);
    }
  };

  // Save draft locally on change
  useEffect(() => {
    if (!problem) return;
    const handle = setTimeout(async () => {
      saveDraftToLocal({ problemId: problem.id, language: lang, code });
      if (user) {
        try {
          await saveDraftToCloud({ uid: user.uid, problemId: problem.id, language: lang, code });
        } catch (error) {
          console.warn('Failed to save to cloud:', error);
        }
      }
    }, 1000);
    return () => clearTimeout(handle);
  }, [code, problem, lang, user]);

  // Load submission history
  useEffect(() => {
    if (!problem || !user) return;
    const loadHistory = async () => {
      try {
        const submissions = await listSubmissions({ uid: user.uid, problemId: problem.id });
        setHistory(submissions);
        const solved = submissions.some(s => s.status === 'Accepted');
        setIsSolved(solved);
      } catch (error) {
        console.warn('Failed to load submission history:', error);
      }
    };
    loadHistory();
  }, [problem, user]);

  // Auto-scroll terminal
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [terminal]);

  const runCode = useCallback(async () => {
    console.log('Run code clicked!', { problem: !!problem, code: code?.length, lang });
    
    if (!problem) {
      console.log('No problem loaded');
      return;
    }
    
    if (!code || !code.trim()) {
      console.log('No code to run');
      setExecError('Please write some code first');
      return;
    }

    // Prevent running if editor content is unchanged from starter scaffold
    const starter = problem.starterCode[lang] || '';
    if (code.trim() === starter.trim()) {
      console.log('Code unchanged from starter');
      setExecError('Please implement the solution before running.');
      return;
    }

    setIsRunning(true);
    setExecError(null);
    setTestResults(null);
    setTerminal([]);
    setTerminalPosition('above'); // Move terminal above when code is run

    try {
      // For "Run Code", only use non-hidden test cases
      const visibleTestCases = (problem.testCases || []).filter(tc => !tc.isHidden);
      const allTestCases = visibleTestCases;

      const request: CodeExecutionRequest = {
        code,
        language: lang as 'cpp' | 'python' | 'java',
        testCases: allTestCases,
        problemId: problem.id,
      };

      console.log('Sending request:', request);
      
      // Check if backend is healthy first
      const isHealthy = await codeExecutionService.checkHealth();
      if (!isHealthy) {
        setExecError('Backend service is not available. Please try again later.');
        return;
      }
      
      const response: CodeExecutionResponse = await codeExecutionService.executeCode(request);
      console.log('Received response:', response);

      if (response.success && response.results) {
        setTestResults(response.results.results || []);
        
        // For run code, we don't save submissions automatically
        // Only show results for visible test cases
      } else {
        setExecError(response.error || 'Execution failed');
      }
    } catch (error) {
      console.error('Run code error:', error);
      setExecError(error instanceof Error ? error.message : 'Execution failed');
    } finally {
      setIsRunning(false);
    }
  }, [problem, code, lang]);

  const submitCode = useCallback(async () => {
    console.log('Submit code clicked!', { problem: !!problem, code: code?.length, user: !!user });
    
    if (!problem) {
      console.log('No problem loaded');
      return;
    }
    
    if (!code || !code.trim()) {
      console.log('No code to submit');
      setExecError('Please write some code first');
      return;
    }

    // Prevent submitting if editor content is unchanged from starter scaffold
    const starter = problem.starterCode[lang] || '';
    if (code.trim() === starter.trim()) {
      console.log('Code unchanged from starter');
      setExecError('Please implement the solution before submitting.');
      return;
    }
    
    if (!user) {
      console.log('No user logged in');
      setExecError('Please log in to submit solutions');
      return;
    }

    setIsSubmitting(true);
    setExecError(null);

    try {
      // For "Submit Solution", use ALL test cases including hidden ones
      const allTestCases = problem.testCases || [];

      const request: CodeExecutionRequest = {
        code,
        language: lang as 'cpp' | 'python' | 'java',
        testCases: allTestCases,
        problemId: problem.id,
      };

      console.log('Submitting request:', request);
      
      // Check if backend is healthy first
      const isHealthy = await codeExecutionService.checkHealth();
      if (!isHealthy) {
        setExecError('Backend service is not available. Please try again later.');
        return;
      }
      
      const response: CodeExecutionResponse = await codeExecutionService.executeCode(request);
      console.log('Submit response:', response);

      if (response.success && response.results) {
        const results = response.results.results || [];
        setTestResults(results);
        
        // Check if all test cases passed
        const allPassed = response.results.allPassed;
        const status: SubmissionStatus = allPassed ? 'Accepted' : 'Failed';

        // Save submission
        await addSubmission({
          uid: user.uid,
          problemId: problem.id,
          language: lang,
          code,
          status,
          passedTests: response.results.passedTests,
          totalTests: response.results.totalTests,
          executionTimeMs: results.reduce((sum, t) => sum + t.executionTime, 0),
        });

        setIsSolved(status === 'Accepted');

        // If some test cases failed, show detailed error with hidden test case info
        if (!allPassed) {
          const failedTests = results.filter(r => !r.passed);
          const hiddenFailedTests = failedTests.filter((_, index) => {
            const originalTestCases = problem.testCases || [];
            return originalTestCases[index]?.isHidden;
          });
          
          if (hiddenFailedTests.length > 0) {
            const errorMessage = `Submission failed! ${response.results.passedTests}/${response.results.totalTests} test cases passed.\n\nFailed hidden test cases:\n${hiddenFailedTests.map((test, idx) => 
              `Test Case ${test.testCaseIndex + 1}: Expected "${test.expected}", Got "${test.actual}"`
            ).join('\n')}`;
            setExecError(errorMessage);
          } else {
            setExecError(`Submission failed! ${response.results.passedTests}/${response.results.totalTests} test cases passed.`);
          }
        }

        // Update submission history
        const submissions = await listSubmissions({ uid: user.uid, problemId: problem.id });
        setHistory(submissions);

      } else {
        setExecError(response.error || 'Submission failed');
      }

    } catch (error) {
      console.error('Submit code error:', error);
      setExecError(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  }, [problem, code, lang, user]);

    if (!problem) return null;

    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <style>{editorStyles}</style>
        <div className="max-w-7xl mx-auto p-4">
          {/* Header */}
          <div className={`mb-8 p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => navigate('/problems')}
                  className={`flex items-center space-x-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Problems</span>
                </button>
              <div className={`hidden sm:block h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-bold`}>{problem.title}</h1>
                <div className="flex items-center gap-2">
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
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${healthy ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {healthy ? 'Backend Online' : 'Checking...'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6">
          <div className={`flex rounded-lg p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`}>
            <button
              onClick={() => setMobileTab('desc')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mobileTab === 'desc'
                  ? `${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 shadow-sm'}`
                  : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </button>
            <button
              onClick={() => setMobileTab('code')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mobileTab === 'code'
                  ? `${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 shadow-sm'}`
                  : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <CodeIcon className="w-4 h-4" />
              <span>Code Editor</span>
            </button>
          </div>
        </div>

        {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel: Description & Test Cases */}
          <div className={`flex-1 space-y-6 ${mobileTab === 'code' ? 'hidden lg:block' : ''}`}>
              <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}> 
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Play className="w-5 h-5 mr-2 text-primary-400" />
                  Problem Description
                </h2>
                  <AIHelper
                    type="dsa"
                    getParams={() => ({
                      problemStatement: problem.description,
                      code: code,
                      constraints: `Difficulty: ${problem.difficulty}, Category: ${problem.category}`
                    })}
                    label="Get Hint"
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors text-sm"
                  />
                </div>
                <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {problem.description}
                </pre>
              </div>

              {/* Test Cases */}
              {Array.isArray(problem.testCases) && problem.testCases.length > 0 && (
                <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Test Cases</h3>
                  <div className="space-y-4">
                  {problem.testCases.filter(tc => !tc.isHidden).map((tc, i) => (
                      <div key={i} className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                        <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Test Case {i + 1}</div>
                        {tc.description && (
                          <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{tc.description}</div>
                        )}
                        <div className="mb-1 text-xs font-medium">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Input:</span>
                        </div>
                        <div className={`p-2 rounded font-mono text-xs mb-2 ${theme === 'dark' ? 'bg-slate-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                          {tc.input}
                        </div>
                        <div className="mb-1 text-xs font-medium">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expected Output:</span>
                        </div>
                      <div className={`p-2 rounded font-mono text-xs ${theme === 'dark' ? 'bg-slate-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                        {tc.output}
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Editor & Output */}
          <div className={`flex-1 space-y-6 ${mobileTab === 'desc' ? 'hidden lg:block' : ''}`}>
              {/* Output Terminal - Above Editor when terminalPosition is 'above' */}
              {terminalPosition === 'above' && (
                <div className={`${terminalBorderStyle === 'rounded' ? 'rounded-xl' : terminalBorderStyle === 'sharp' ? 'rounded-none' : 'rounded-xl border-dashed'} border overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}> 
                  <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'} flex-shrink-0`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TerminalSquare className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Output</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleTerminalPosition}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          title="Toggle terminal position"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => setTerminalBorderStyle(terminalBorderStyle === 'rounded' ? 'sharp' : terminalBorderStyle === 'sharp' ? 'dashed' : 'rounded')}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          title="Change border style"
                        >
                          {terminalBorderStyle === 'rounded' ? '◯' : terminalBorderStyle === 'sharp' ? '□' : '◊'}
                        </button>
                        <button
                          onClick={clearTerm}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  <div 
                    ref={termRef}
                  className={`flex-1 p-4 overflow-y-auto ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} min-h-48 max-h-64`}
                  >
                  <pre className={`text-sm font-mono whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {terminal.length ? terminal.join('\n') : 'Run your code to see the output here...'}
                  </pre>
                </div>
              </div>
              )}

              {/* Code Editor */}
              <div className={`rounded-xl border overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}> 
                <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'} flex-shrink-0`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Play className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Code Editor</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.key}
                        onClick={() => handleLanguageChange(l.key)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          lang === l.key 
                            ? 'bg-primary-600 text-white' 
                            : theme === 'dark' 
                              ? 'bg-slate-600 text-gray-200 hover:bg-slate-500' 
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              <div className="flex-1 min-h-0" style={{ minHeight: '500px', position: 'relative' }}>
                  <Editor
                    height="500px"
                    value={code}
                    onChange={(v) => setCode(v || '')}
                    language={lang === 'java' ? 'java' : lang}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    onMount={(editor, monaco) => {
                      // Monaco editor mounted successfully
                    }}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: true,
                      smoothScrolling: true,
                      automaticLayout: true,
                      // … keep your other options
                    }}
                  />
                </div>
              </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
              
              {user && (
                <button
                  onClick={submitCode}
                  disabled={isSubmitting}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Solution'}</span>
                </button>
              )}
              
              <button
                onClick={handleResetCode}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors bg-gray-600 hover:bg-gray-700 text-white"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

              {/* Output Terminal - Below Editor when terminalPosition is 'below' */}
              {terminalPosition === 'below' && (
                <div className={`${terminalBorderStyle === 'rounded' ? 'rounded-xl' : terminalBorderStyle === 'sharp' ? 'rounded-none' : 'rounded-xl border-dashed'} border overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}> 
                  <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'} flex-shrink-0`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TerminalSquare className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Output</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleTerminalPosition}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          title="Toggle terminal position"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => setTerminalBorderStyle(terminalBorderStyle === 'rounded' ? 'sharp' : terminalBorderStyle === 'sharp' ? 'dashed' : 'rounded')}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          title="Change border style"
                        >
                          {terminalBorderStyle === 'rounded' ? '◯' : terminalBorderStyle === 'sharp' ? '□' : '◊'}
                        </button>
                        <button
                          onClick={clearTerm}
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  <div 
                    ref={termRef}
                  className={`flex-1 p-4 overflow-y-auto ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} min-h-48 max-h-64`}
                  >
                  <pre className={`text-sm font-mono whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {terminal.length ? terminal.join('\n') : 'Run your code to see the output here...'}
                  </pre>
                </div>
              </div>
              )}

              {/* Test Results */}
              {testResults && testResults.length > 0 && (
                <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}> 
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Test Results</h3>
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.passed 
                          ? 'bg-green-500/20 border border-green-500/30' 
                          : 'bg-red-500/20 border border-red-500/30'
                      }`}
                      >
                        <div className="flex items-center space-x-3">
                          {result.passed ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-400" />
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
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Expected: {result.expected}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Actual: {result.actual}
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Test Cases */}
              <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Custom Test Cases</h3>
                  <button
                    onClick={() => setShowCustomTest(!showCustomTest)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      showCustomTest 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {showCustomTest ? 'Hide' : 'Add Custom Test'}
                  </button>
                </div>

                {showCustomTest && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Input
                        </label>
                        <textarea
                          placeholder="Enter test input..."
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark' 
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          rows={3}
                          value={customTestCases.length > 0 ? customTestCases[customTestCases.length - 1]?.input || '' : ''}
                          onChange={(e) => {
                            const newTestCases = [...customTestCases];
                            if (newTestCases.length === 0) {
                              newTestCases.push({ input: e.target.value, output: '' });
                            } else {
                              newTestCases[newTestCases.length - 1].input = e.target.value;
                            }
                            setCustomTestCases(newTestCases);
                          }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Expected Output
                        </label>
                        <textarea
                          placeholder="Enter expected output..."
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark' 
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          rows={3}
                          value={customTestCases.length > 0 ? customTestCases[customTestCases.length - 1]?.output || '' : ''}
                          onChange={(e) => {
                            const newTestCases = [...customTestCases];
                            if (newTestCases.length === 0) {
                              newTestCases.push({ input: '', output: e.target.value });
                            } else {
                              newTestCases[newTestCases.length - 1].output = e.target.value;
                            }
                            setCustomTestCases(newTestCases);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const newTestCases = [...customTestCases];
                          if (newTestCases.length > 0 && newTestCases[newTestCases.length - 1].input && newTestCases[newTestCases.length - 1].output) {
                            newTestCases.push({ input: '', output: '' });
                            setCustomTestCases(newTestCases);
                          }
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Add Test Case
                      </button>
                      <button
                        onClick={() => {
                          const newTestCases = customTestCases.filter(tc => tc.input && tc.output);
                          setCustomTestCases(newTestCases);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Run Custom Tests
                      </button>
                      <button
                        onClick={() => setCustomTestCases([])}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}

                {customTestCases.length > 0 && (
                  <div className="mt-4">
                    <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Saved Custom Test Cases ({customTestCases.filter(tc => tc.input && tc.output).length})
                    </h4>
                    <div className="space-y-2">
                      {customTestCases.filter(tc => tc.input && tc.output).map((tc, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Input:</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{tc.input}</span>
                            </div>
                            <div>
                              <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expected:</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{tc.output}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            {/* Error Display */}
            {execError && (
              <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'bg-red-500/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                    Execution Error
                  </span>
                </div>
                <pre className={`mt-2 text-sm font-mono whitespace-pre-wrap ${theme === 'dark' ? 'text-red-200' : 'text-red-600'}`}>
                  {execError}
                </pre>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
  );
}
