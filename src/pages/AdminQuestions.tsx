import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search
} from 'lucide-react';
import { Question } from '../types';
import { getAllProblems } from '../data/problemBank';

const AdminQuestions: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [form, setForm] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Load questions from shared problem bank
  useEffect(() => {
    const loadQuestions = () => {
      const allProblems = getAllProblems();
      // Convert Problem type to Question type for admin interface
      const convertedQuestions: Question[] = allProblems.map(problem => ({
        id: problem.id,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        category: problem.category,
        tags: [problem.category.toLowerCase()],
        testCases: problem.testCases.map((tc, index) => ({
          id: (index + 1).toString(),
          input: tc.input,
          expectedOutput: tc.output,
          isHidden: false,
          description: tc.description
        })),
        solution: `// Solution for ${problem.title}\n// Implement your solution here`,
        hints: ['Read the problem description carefully', 'Consider edge cases'],
        points: problem.points,
        timeLimit: 30,
        memoryLimit: 64,
        createdBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }));
      setQuestions(convertedQuestions);
    };

    loadQuestions();
  }, []);

  // Helpers to open editor
  const openAddEditor = () => {
    const now = new Date();
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      title: '',
      description: '',
      difficulty: 'easy',
      category: 'General',
      tags: [],
      testCases: [
        { id: '1', input: '', expectedOutput: '', isHidden: false, description: '' }
      ],
      solution: '',
      hints: [],
      points: 10,
      timeLimit: 30,
      memoryLimit: 64,
      createdBy: adminUser?.displayName || 'admin',
      createdAt: now,
      updatedAt: now,
      isActive: true
    };
    setEditorMode('add');
    setForm(newQuestion);
    setIsEditorOpen(true);
  };

  const openEditEditor = (q: Question) => {
    setEditorMode('edit');
    // Deep clone to avoid mutating original until save
    setForm(JSON.parse(JSON.stringify(q)) as Question);
    setIsEditorOpen(true);
  };

  const updateFormField = (field: keyof Question, value: any) => {
    if (!form) return;
    setForm({ ...form, [field]: value, updatedAt: new Date() });
  };

  const addFormTag = (tag: string) => {
    if (!form || !tag.trim()) return;
    updateFormField('tags', Array.from(new Set([...(form.tags || []), tag.trim()])));
  };

  const removeFormTag = (tag: string) => {
    if (!form) return;
    updateFormField('tags', (form.tags || []).filter(t => t !== tag));
  };

  const addTestCase = () => {
    if (!form) return;
    const nextId = (form.testCases.length + 1).toString();
    updateFormField('testCases', [...form.testCases, { id: nextId, input: '', expectedOutput: '', isHidden: false, description: '' }]);
  };

  const updateTestCase = (id: string, key: 'input' | 'expectedOutput' | 'isHidden' | 'description', value: any) => {
    if (!form) return;
    updateFormField('testCases', form.testCases.map(tc => tc.id === id ? { ...tc, [key]: value } : tc));
  };

  const removeTestCase = (id: string) => {
    if (!form) return;
    updateFormField('testCases', form.testCases.filter(tc => tc.id !== id));
  };

  const saveQuestion = () => {
    if (!form) return;
    if (!form.title.trim() || !form.description.trim()) {
      alert('Title and description are required.');
      return;
    }
    if (form.testCases.length === 0) {
      alert('Please add at least one test case.');
      return;
    }

    if (editorMode === 'add') {
      setQuestions(prev => [...prev, form]);
    } else {
      setQuestions(prev => prev.map(q => q.id === form.id ? form : q));
    }
    setIsEditorOpen(false);
    setForm(null);
  };

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-slate-900'} mx-auto mb-4`}></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading admin questions...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className={`min-h-screen p-6 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center space-y-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          <h1 className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Question Management{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>📝</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Create, edit, and manage coding questions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{questions.length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Questions</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{questions.filter(q => q.isActive).length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Active Questions</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{questions.filter(q => q.difficulty === 'medium').length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Medium Difficulty</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{questions.filter(q => q.difficulty === 'hard').length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Hard Difficulty</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          } mb-8`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white border border-slate-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
                             <select
                 value={filterDifficulty}
                 onChange={(e) => setFilterDifficulty(e.target.value)}
                 className={`px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                   theme === 'dark' 
                     ? 'bg-slate-700 border border-slate-600 text-white' 
                     : 'bg-white border border-slate-300 text-gray-900'
                 }`}
               >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button onClick={openAddEditor} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Questions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          } overflow-hidden`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                                                               <td className="px-6 py-4">
                        <div>
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{question.title}</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'} truncate max-w-xs`}>{question.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        {question.category}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        {question.points} pts
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${question.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {question.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowQuestionModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEditEditor(question)} className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Question Details Modal */}
        {showQuestionModal && selectedQuestion && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Question Details</h2>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Question Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedQuestion.title}</h3>
                  <p className="text-gray-400 mb-4">{selectedQuestion.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Test Cases */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Test Cases</h4>
                  <div className="space-y-3">
                    {selectedQuestion.testCases.map((testCase, index) => (
                      <div key={testCase.id} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-300 mb-1">Input:</div>
                            <pre className="text-sm text-white bg-slate-800 p-2 rounded">{testCase.input}</pre>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-300 mb-1">Expected Output:</div>
                            <pre className="text-sm text-white bg-slate-800 p-2 rounded">{testCase.expectedOutput}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Solution</h4>
                  <pre className="text-sm text-white bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    {selectedQuestion.solution}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {/* Question Editor Modal (Add/Edit) */}
        {isEditorOpen && form && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-xl font-semibold`}>
                  {editorMode === 'add' ? 'Add Question' : 'Edit Question'}
                </h2>
                <button onClick={() => setIsEditorOpen(false)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>✕</button>
              </div>

              <div className="space-y-4">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => updateFormField('title', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`}
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Difficulty</label>
                    <select
                      value={form.difficulty}
                      onChange={(e) => updateFormField('difficulty', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => updateFormField('category', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`}
                    placeholder="e.g. Arrays, Strings"
                  />
                </div>

                <div>
                  <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateFormField('description', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg min-h-28 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`}
                    placeholder="Problem statement..."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Tags</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {(form.tags || []).map((tag, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-slate-700'}`}>
                        {tag}
                        <button className="ml-2" onClick={() => removeFormTag(tag)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input id="admin-tag-input" className={`flex-1 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} placeholder="Add tag and press Add" />
                    <button
                      onClick={() => {
                        const el = document.getElementById('admin-tag-input') as HTMLInputElement;
                        if (el?.value) { addFormTag(el.value); el.value=''; }
                      }}
                      className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                    >Add</button>
                  </div>
                </div>

                {/* Points & Limits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Points</label>
                    <input type="number" value={form.points} onChange={(e)=>updateFormField('points', Number(e.target.value))} className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Time Limit (sec)</label>
                    <input type="number" value={form.timeLimit} onChange={(e)=>updateFormField('timeLimit', Number(e.target.value))} className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Memory Limit (MB)</label>
                    <input type="number" value={form.memoryLimit} onChange={(e)=>updateFormField('memoryLimit', Number(e.target.value))} className={`w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                  </div>
                </div>

                {/* Test Cases with Hidden toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-semibold`}>Test Cases</h3>
                    <button onClick={addTestCase} className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">Add Test Case</button>
                  </div>
                  <div className="space-y-3">
                    {form.testCases.map(tc => (
                      <div key={tc.id} className={`rounded-lg p-4 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Input</label>
                            <textarea value={tc.input} onChange={(e)=>updateTestCase(tc.id,'input',e.target.value)} className={`w-full px-3 py-2 rounded ${theme === 'dark' ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                          </div>
                          <div>
                            <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Expected Output</label>
                            <textarea value={tc.expectedOutput} onChange={(e)=>updateTestCase(tc.id,'expectedOutput',e.target.value)} className={`w-full px-3 py-2 rounded ${theme === 'dark' ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 items-center">
                          <div>
                            <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Description (optional)</label>
                            <input value={tc.description || ''} onChange={(e)=>updateTestCase(tc.id,'description',e.target.value)} className={`w-full px-3 py-2 rounded ${theme === 'dark' ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900'}`} />
                          </div>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={tc.isHidden} onChange={(e)=>updateTestCase(tc.id,'isHidden',e.target.checked)} />
                            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Hidden (only revealed on failure)</span>
                          </label>
                          <button onClick={()=>removeTestCase(tc.id)} className="justify-self-end px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setIsEditorOpen(false)} className={`${theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'} px-4 py-2 rounded-lg`}>Cancel</button>
                  <button onClick={saveQuestion} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">Save</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuestions;
