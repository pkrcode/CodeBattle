import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { aptitudeTopics, sampleAptitudeQuestions } from '../utils/aptitudeData';
import { AptitudeDifficulty, AptitudeSessionRecord } from '../types';
import { createPracticeSet, saveAptitudeSession } from '../utils/aptitudeService';
import AIHelper from '../components/AIHelper';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';

const Aptitude: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'practice' | 'library'>('practice');
  
  // Practice state
  const [difficulty, setDifficulty] = useState<AptitudeDifficulty | 'all'>('all');
  const [topics, setTopics] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<'easy' | 'medium' | 'hard' | 'expert'>('medium');
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Practice mode configuration
  const practiceConfig = {
    easy: { questions: 8, timeLimit: 480, description: "Perfect for beginners - 8 questions in 8 minutes" },
    medium: { questions: 12, timeLimit: 720, description: "Balanced challenge - 12 questions in 12 minutes" },
    hard: { questions: 15, timeLimit: 900, description: "Advanced level - 15 questions in 15 minutes" },
    expert: { questions: 20, timeLimit: 1200, description: "Expert challenge - 20 questions in 20 minutes" }
  };

  // Library state
  const [libraryDifficulty, setLibraryDifficulty] = useState<AptitudeDifficulty | 'all'>('all');
  const [libraryTopics, setLibraryTopics] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const libraryList = useMemo(() => {
    let arr = [...sampleAptitudeQuestions];
    if (libraryDifficulty !== 'all') arr = arr.filter(q => q.difficulty === libraryDifficulty);
    if (libraryTopics.length) {
      const s = new Set(libraryTopics);
      arr = arr.filter(q => s.has(q.topic));
    }
    return arr;
  }, [libraryDifficulty, libraryTopics]);

  useEffect(() => {
    if (!started || finished) return;
    const config = practiceConfig[practiceMode];
    setSecondsLeft(config.timeLimit);
    const t = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished, practiceMode]);

  const start = () => {
    const config = practiceConfig[practiceMode];
    setQuestions(createPracticeSet({ 
      topics, 
      difficulty: practiceMode === 'expert' ? 'hard' : practiceMode, 
      count: config.questions, 
      randomizeEachRun: true 
    }));
    setStarted(true);
    setFinished(false);
    setIndex(0);
    setScore(0);
    setWrong(0);
    setPicked(null);
    setSecondsLeft(config.timeLimit);
  };

  const onPick = (i: number) => {
    if (picked !== null || finished) return;
    setPicked(i);
    const correct = i === questions[index].correctIndex;
    setScore(s => s + (correct ? 1 : 0));
    setWrong(w => w + (correct ? 0 : 1));
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        setFinished(true);
      } else {
        setIndex(idx => idx + 1);
        setPicked(null);
      }
    }, 500);
  };

  const endAndSave = () => {
    if (!user) return;
    const config = practiceConfig[practiceMode];
    const now = new Date();
    const startedAt = new Date(now.getTime() - (config.timeLimit - secondsLeft) * 1000);
    const record: AptitudeSessionRecord = {
      id: `practice-${now.getTime()}`,
      uid: user.uid,
      topics: topics.length ? topics : ['All'],
      difficulty: practiceMode === 'expert' ? 'hard' : practiceMode,
      questionCount: questions.length,
      correct: score,
      wrong,
      startedAt,
      endedAt: now,
      durationSec: config.timeLimit - secondsLeft,
      timed: true,
      timeLimitSec: config.timeLimit,
      passed: score / Math.max(1, questions.length) >= 0.7,
      score,
    };
    saveAptitudeSession(user.uid, record);
  };

  useEffect(() => {
    if (finished && user) {
      endAndSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const cardBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const border = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  const toggleLibraryTopic = (t: string) => {
    setLibraryTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
    setShowExplanation(true);
  };

  const closeExplanation = () => {
    setShowExplanation(false);
    setSelectedQuestion(null);
  };

  const toggleQuestionExpansion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleFilters = () => {
    setExpandedFilters(!expandedFilters);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-1 ${textMain}`}>Aptitude Training</h1>
        <p className={textSub}>Practice topic-wise or browse all available MCQ questions.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'practice'
              ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'library'
              ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Library</span>
        </button>
      </div>

      {/* Practice Tab */}
      {activeTab === 'practice' && (
        <>
          {!started && (
            <div className={`${cardBg} border ${border} rounded-xl p-6 mb-6`}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className={`text-sm ${textSub} mb-2`}>Topics</div>
                  <div className="flex gap-2 flex-wrap">
                    {aptitudeTopics.map(t => (
                      <button key={t} onClick={() => setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])} className={`px-3 py-1.5 rounded-full text-sm border ${topics.includes(t) ? 'bg-primary-600 text-white border-primary-600' : theme==='dark'?'border-slate-600 text-gray-300':'border-gray-300 text-gray-700'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={`text-sm ${textSub} mb-2`}>Practice Mode</div>
                  <div className="space-y-3">
                    {(['easy', 'medium', 'hard', 'expert'] as const).map(mode => {
                      const config = practiceConfig[mode];
                      return (
                        <button
                          key={mode}
                          onClick={() => setPracticeMode(mode)}
                          className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                            practiceMode === mode 
                              ? 'bg-primary-600 text-white border-primary-600 shadow-lg' 
                              : theme==='dark'
                                ? 'bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold capitalize">{mode}</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              practiceMode === mode 
                                ? 'bg-white/20 text-white' 
                                : theme==='dark'
                                  ? 'bg-slate-600 text-gray-300'
                                  : 'bg-gray-100 text-gray-600'
                            }`}>
                              {config.questions} questions
                            </span>
                          </div>
                          <div className={`text-sm ${
                            practiceMode === mode 
                              ? 'text-white/80' 
                              : theme==='dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {config.description}
                          </div>
                          <div className={`text-xs mt-2 ${
                            practiceMode === mode 
                              ? 'text-white/60' 
                              : theme==='dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            ⏱ {Math.floor(config.timeLimit / 60)} minutes
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={start} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">Start Practice</button>
              </div>
            </div>
          )}

          {started && !finished && (
            <div className={`${cardBg} border ${border} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`text-sm ${textSub}`}>Question {index+1} / {questions.length}</div>
                <div className="flex items-center gap-4">
                  <div className={`text-sm font-semibold ${textMain}`}>⏱ {Math.floor(secondsLeft/60)}:{String(secondsLeft%60).padStart(2,'0')}</div>
                  <div className={`text-sm ${textSub}`}>Score: {score} | Wrong: {wrong}</div>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div className={`text-lg font-semibold ${textMain} min-w-0 flex-1`}>{questions[index].question}</div>
                <AIHelper
                  type="aptitude"
                  getParams={() => ({
                    problemStatement: `Topic: ${questions[index].topic} | Difficulty: ${questions[index].difficulty}\n\n${questions[index].question}`,
                  })}
                  label="Hint"
                />
              </div>
              <div className="grid gap-3">
                {questions[index].options.map((opt: string, i: number) => {
                  const isCorrect = i === questions[index].correctIndex;
                  const active = picked !== null;
                  const bg = !active
                    ? theme==='dark'?'bg-slate-700/50':'bg-gray-100'
                    : picked===i && isCorrect ? 'bg-green-600 text-white'
                    : picked===i && !isCorrect ? 'bg-red-600 text-white'
                    : isCorrect ? (theme==='dark'?'bg-green-500/20 text-green-300':'bg-green-100 text-green-700')
                    : (theme==='dark'?'bg-slate-700/50':'bg-gray-100');
                  return (
                    <button key={i} onClick={() => onPick(i)} disabled={picked!==null} className={`text-left px-4 py-3 rounded-lg border ${theme==='dark'?'border-slate-600':'border-gray-300'} ${bg}`}>{opt}</button>
                  );
                })}
              </div>
            </div>
          )}

          {started && finished && (
            <div className={`${cardBg} border ${border} rounded-xl p-8 text-center`}>
              <h3 className={`text-2xl font-bold mb-2 ${textMain}`}>Practice Complete</h3>
              <p className={`${textSub} mb-6`}>Score: {score}/{questions.length} • Wrong: {wrong}</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setStarted(false)} className="px-4 py-2 border rounded-lg ${border}">Setup Again</button>
                <button onClick={start} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">Retry Same</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <>
          {/* Expandable Filters */}
          <div className={`${cardBg} border ${border} rounded-xl p-4 mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${textMain}`}>Filters</h3>
              <button 
                onClick={toggleFilters}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 ${
                  expandedFilters 
                    ? 'bg-primary-600 text-white border-primary-600' 
                    : theme==='dark'?'border-slate-600 text-gray-300 hover:bg-slate-700':'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{expandedFilters ? 'Collapse' : 'Expand'}</span>
                <span className={`transform transition-transform duration-200 ${expandedFilters ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
            
            {expandedFilters && (
              <div className="space-y-4">
                {/* Difficulty Filter */}
                <div>
                  <div className={`text-sm font-medium ${textSub} mb-2`}>Difficulty:</div>
                  <div className="flex flex-wrap gap-2">
                    {(['all','easy','medium','hard'] as const).map(d => (
                      <button 
                        key={d} 
                        onClick={() => setLibraryDifficulty(d)} 
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                          libraryDifficulty===d 
                            ? 'bg-primary-600 text-white border-primary-600' 
                            : theme==='dark'?'border-slate-600 text-gray-300 hover:bg-slate-700':'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {d.toString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics Filter */}
                <div>
                  <div className={`text-sm font-medium ${textSub} mb-2`}>Topics:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {aptitudeTopics.map(t => (
                      <button 
                        key={t} 
                        onClick={() => toggleLibraryTopic(t)} 
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 text-left ${
                          libraryTopics.includes(t) 
                            ? 'bg-primary-600 text-white border-primary-600' 
                            : theme==='dark'?'border-slate-600 text-gray-300 hover:bg-slate-700':'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {libraryList.map(q => {
              const isExpanded = expandedQuestions.has(q.id);
              return (
                <div 
                  key={q.id} 
                  className={`${cardBg} border ${border} rounded-xl p-4 transition-all duration-200 hover:shadow-lg`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`text-xs uppercase tracking-wide ${textSub}`}>{q.topic}</div>
                        <div className={`text-xs px-2 py-0.5 rounded ${
                          q.difficulty==='easy'?'bg-green-500/20 text-green-300':
                          q.difficulty==='medium'?'bg-yellow-500/20 text-yellow-300':
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {q.difficulty}
                        </div>
                      </div>
                      <div className={`font-medium ${textMain} line-clamp-2 ${isExpanded ? '' : 'cursor-pointer'}`} onClick={() => !isExpanded && toggleQuestionExpansion(q.id)}>
                        {q.question}
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleQuestionExpansion(q.id)}
                      className={`ml-4 p-2 rounded-lg transition-all duration-200 ${
                        theme==='dark'?'hover:bg-slate-700':'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      {/* Options */}
                      <div>
                        <div className={`text-sm font-medium ${textSub} mb-2`}>Options:</div>
                        <div className="space-y-2">
                          {q.options.map((opt: string, i: number) => (
                            <div 
                              key={i} 
                              className={`p-3 rounded-lg border ${
                                i === q.correctIndex 
                                  ? 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200' 
                                  : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                  i === q.correctIndex 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
                                }`}>
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span className={i === q.correctIndex ? 'font-medium' : ''}>
                                  {opt}
                                </span>
                                {i === q.correctIndex && (
                                  <span className="text-green-600 dark:text-green-400 text-sm">✓ Correct Answer</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div>
                        <div className={`text-sm font-medium ${textSub} mb-2`}>Explanation:</div>
                        <div className={`bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg ${textSub}`}>
                          {q.explanation || 
                            `The correct answer is option ${String.fromCharCode(65 + q.correctIndex)}. This question tests your understanding of ${q.topic.toLowerCase()} concepts.`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {libraryList.length === 0 && (
              <div className="text-center py-12">
                <div className={textSub}>No questions match the filters.</div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Explanation Modal */}
      {showExplanation && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} border ${border} rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`text-xs px-2 py-1 rounded ${selectedQuestion.difficulty==='easy'?'bg-green-500/20 text-green-300':selectedQuestion.difficulty==='medium'?'bg-yellow-500/20 text-yellow-300':'bg-red-500/20 text-red-300'}`}>
                  {selectedQuestion.difficulty}
                </div>
                <div className={`text-xs uppercase tracking-wide ${textSub}`}>{selectedQuestion.topic}</div>
              </div>
              <button 
                onClick={closeExplanation}
                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${textSub}`}
              >
                ✕
              </button>
            </div>
            
            <div className={`text-lg font-semibold ${textMain} mb-4`}>
              {selectedQuestion.question}
            </div>
            
            <div className="space-y-3 mb-6">
              {selectedQuestion.options.map((opt: string, i: number) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg border ${
                    i === selectedQuestion.correctIndex 
                      ? 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200' 
                      : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      i === selectedQuestion.correctIndex 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className={i === selectedQuestion.correctIndex ? 'font-medium' : ''}>
                      {opt}
                    </span>
                    {i === selectedQuestion.correctIndex && (
                      <span className="text-green-600 dark:text-green-400 text-sm">✓ Correct Answer</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`${textSub} mb-4`}>
              <div className="font-medium text-gray-900 dark:text-white mb-2">Explanation:</div>
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
                {selectedQuestion.explanation || 
                  `The correct answer is option ${String.fromCharCode(65 + selectedQuestion.correctIndex)}. This question tests your understanding of ${selectedQuestion.topic.toLowerCase()} concepts.`}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={closeExplanation}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aptitude; 