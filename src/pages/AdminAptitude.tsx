import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { aptitudeTopics, sampleAptitudeQuestions } from '../utils/aptitudeData';
import { AptitudeDifficulty, AptitudeQuestion } from '../types';
import { BookOpen, Filter, Lightbulb, RefreshCw, Copy, Wand2 } from 'lucide-react';
import { fetchAptitudeVariants } from '../utils/aiClient';

const AdminAptitude: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [difficulty, setDifficulty] = useState<AptitudeDifficulty | 'all'>('all');
  const [topics, setTopics] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AptitudeQuestion | null>(null);
  const [variants, setVariants] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [variantCount, setVariantCount] = useState(3);

  const filtered = useMemo(() => {
    let arr = [...sampleAptitudeQuestions];
    if (difficulty !== 'all') arr = arr.filter(q => q.difficulty === difficulty);
    if (topics.length) {
      const t = new Set(topics);
      arr = arr.filter(q => t.has(q.topic));
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      arr = arr.filter(q => q.question.toLowerCase().includes(s));
    }
    return arr;
  }, [difficulty, topics, search]);

  const countsByDifficulty = useMemo(() => {
    return {
      easy: sampleAptitudeQuestions.filter(q => q.difficulty === 'easy').length,
      medium: sampleAptitudeQuestions.filter(q => q.difficulty === 'medium').length,
      hard: sampleAptitudeQuestions.filter(q => q.difficulty === 'hard').length,
    };
  }, []);

  const toggleTopic = (t: string) => {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const runVariants = async (q: AptitudeQuestion) => {
    setSelected(q);
    setLoading(true);
    setVariants(null);
    try {
      const res = await fetchAptitudeVariants({
        question: { question: q.question, options: q.options, correctIndex: q.correctIndex, topic: q.topic, difficulty: q.difficulty },
        count: Math.max(1, Math.min(10, variantCount)),
      });
      setVariants(res.variants);
    } catch (e) {
      console.error(e);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  const copyJSON = async (data: unknown) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert('Copied to clipboard');
    } catch {
      // ignore
    }
  };

  // Loading/Admin guards
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-slate-900'} mx-auto mb-4`}></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading admin aptitude...</p>
        </div>
      </div>
    );
  }
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const cardBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/80';
  const border = theme === 'dark' ? 'border-slate-700' : 'border-slate-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-center space-y-4 ${textMain}`}>
          <h1 className="text-4xl font-bold">Aptitude Management <span className={theme==='dark'?'text-purple-400':'text-purple-600'}>📚</span></h1>
          <p className={textSub}>Review the local aptitude bank, filter by topic/difficulty, and generate safe variants via AI.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${textSub}`}>Total Questions</div>
                <div className="text-2xl font-bold text-blue-500">{sampleAptitudeQuestions.length}</div>
              </div>
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${textSub}`}>Easy</div>
                <div className="text-2xl font-bold text-green-500">{countsByDifficulty.easy}</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-green-500/20" />
            </div>
          </div>
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${textSub}`}>Medium</div>
                <div className="text-2xl font-bold text-yellow-500">{countsByDifficulty.medium}</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-yellow-500/20" />
            </div>
          </div>
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${textSub}`}>Hard</div>
                <div className="text-2xl font-bold text-red-500">{countsByDifficulty.hard}</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-red-500/20" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className={`p-4 rounded-xl border ${border} ${cardBg} flex flex-wrap items-center gap-3`}>
          <div className={`text-sm ${textSub} flex items-center gap-2`}><Filter className="w-4 h-4" /> Filters:</div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search question text..." className={`px-3 py-2 rounded-lg text-sm ${theme==='dark'?'bg-slate-700 text-white border border-slate-600':'bg-white text-slate-900 border border-slate-300'}`} />
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value as any)} className={`px-3 py-2 rounded-lg text-sm ${theme==='dark'?'bg-slate-700 text-white border border-slate-600':'bg-white text-slate-900 border border-slate-300'}`}>
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <div className={`text-sm ${textSub}`}>Topics:</div>
          <div className="flex flex-wrap gap-2">
            {aptitudeTopics.map(t => (
              <button key={t} onClick={()=>toggleTopic(t)} className={`px-3 py-1.5 rounded-full text-sm border ${topics.includes(t) ? 'bg-primary-600 text-white border-primary-600' : theme==='dark'?'border-slate-600 text-gray-300':'border-slate-300 text-slate-700'}`}>{t}</button>
            ))}
          </div>
          {!!topics.length && (
            <button onClick={()=>setTopics([])} className="ml-auto text-sm px-3 py-1.5 rounded-lg border border-slate-500/50 text-slate-400 hover:text-white hover:bg-slate-600/40">Clear</button>
          )}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(q => (
            <div key={q.id} className={`p-4 rounded-xl border ${border} ${cardBg}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`text-xs uppercase tracking-wide ${textSub}`}>{q.topic}</div>
                <div className={`text-xs px-2 py-0.5 rounded ${q.difficulty==='easy'?'bg-green-500/20 text-green-400':q.difficulty==='medium'?'bg-yellow-500/20 text-yellow-400':'bg-red-500/20 text-red-400'}`}>{q.difficulty}</div>
              </div>
              <div className={`font-medium ${textMain} mb-3`}>{q.question}</div>
              <ol className={`list-decimal ml-5 space-y-1 text-sm ${textSub}`}>
                {q.options.map((o,i)=>(
                  <li key={i} className={i===q.correctIndex? 'text-green-400' : ''}>{o}</li>
                ))}
              </ol>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={()=>runVariants(q)} className="px-3 py-1.5 text-sm rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"><Wand2 className="w-4 h-4"/> Variants</button>
                {q.explanation && <span className={`inline-flex items-center gap-1 text-xs ${textSub}`}><Lightbulb className="w-3 h-3"/>Hint</span>}
              </div>
            </div>
          ))}
          {filtered.length===0 && (
            <div className="col-span-full text-center py-12">
              <div className={textSub}>No questions match the filters.</div>
            </div>
          )}
        </div>

        {/* Variants Modal */}
        {(selected) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full max-w-3xl rounded-2xl border ${border} ${cardBg} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-semibold ${textMain} flex items-center gap-2`}><Wand2 className="w-5 h-5"/> Generate Variants</h3>
                <button onClick={()=>{ setSelected(null); setVariants(null); }} className={`${textSub} hover:opacity-80`}>✕</button>
              </div>
              <div className={`text-sm mb-3 ${textSub}`}>Base question:</div>
              <div className={`text-sm mb-4 ${textMain}`}>{selected.question}</div>
              <div className="flex items-center gap-3 mb-4">
                <label className={`text-sm ${textSub}`}>Count</label>
                <input type="number" min={1} max={10} value={variantCount} onChange={(e)=>setVariantCount(Number(e.target.value)||3)} className={`w-20 px-2 py-1 rounded border ${theme==='dark'?'bg-slate-700 text-white border-slate-600':'bg-white text-slate-900 border-slate-300'}`} />
                <button disabled={loading} onClick={()=>runVariants(selected)} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${loading?'bg-slate-500/50 cursor-not-allowed':'bg-primary-600 hover:bg-primary-700'} text-white`}>
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Wand2 className="w-4 h-4"/>}
                  <span>{loading ? 'Generating...' : 'Generate'}</span>
                </button>
              </div>
              {variants && (
                <div className="space-y-3 max-h-[50vh] overflow-auto">
                  {variants.length===0 && (
                    <div className={textSub}>No variants returned. Ensure the AI key is configured on the server.</div>
                  )}
                  {variants.map((v, idx)=> (
                    <div key={idx} className={`p-3 rounded-lg border ${border} ${theme==='dark'?'bg-slate-900/40':'bg-white'}`}>
                      <div className={`text-sm mb-2 ${textMain}`}>{v.question}</div>
                      <ol className={`list-decimal ml-5 text-xs ${textSub}`}>
                        {v.options?.map((o:string,i:number)=> (
                          <li key={i} className={i===v.correctIndex? 'text-green-500' : ''}>{o}</li>
                        ))}
                      </ol>
                      {v.explanation && <div className={`mt-2 text-xs ${textSub}`}>Why: {v.explanation}</div>}
                    </div>
                  ))}
                </div>
              )}
              {variants && variants.length>0 && (
                <div className="flex justify-end mt-4">
                  <button onClick={()=>copyJSON(variants)} className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 border hover:bg-slate-700/30">
                    <Copy className="w-4 h-4"/> Copy JSON
                  </button>
                </div>
              )}
              <div className={`mt-4 text-xs ${textSub}`}>Note: Saving to Firestore and bulk import tools are planned. For now, copy JSON and curate offline.</div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAptitude;
