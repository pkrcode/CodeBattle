import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { fetchHint } from '../utils/aiClient';
import { Lightbulb, RefreshCw, Copy } from 'lucide-react';

type AIType = 'dsa' | 'aptitude';

export default function AIHelper(props: {
  type: AIType;
  getParams: () => { problemStatement?: string; code?: string; constraints?: string };
  label?: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const { type, getParams, label = 'AI Hint', className } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadHint = async () => {
    setLoading(true);
    setError(null);
    setHint(null);
    try {
      const res = await fetchHint({ type, ...getParams() });
      setHint(res.hint);
    } catch (e: any) {
      setError(e?.message || 'Failed to load hint');
    } finally {
      setLoading(false);
    }
  };

  const onOpen = async () => {
    setOpen(true);
    await loadHint();
  };

  const copy = async () => {
    try { if (hint) await navigator.clipboard.writeText(hint); } catch {}
  };

  const cardBg = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const border = theme === 'dark' ? 'border-slate-700' : 'border-slate-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';

  return (
    <>
      <button
        onClick={onOpen}
        className={
          className ||
          'flex items-center space-x-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors'
        }
        title="Get an AI-powered hint"
      >
        <Lightbulb className="w-4 h-4" />
        <span>{label}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-2xl border ${border} ${cardBg} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`font-semibold ${textMain} flex items-center gap-2`}>
                <Lightbulb className="w-5 h-5 text-amber-400" /> AI Hint
              </div>
              <button onClick={() => setOpen(false)} className={`${textSub} hover:opacity-80`}>✕</button>
            </div>

            {loading && (
              <div className={`text-sm ${textSub} flex items-center gap-2`}>
                <RefreshCw className="w-4 h-4 animate-spin" /> Generating hint...
              </div>
            )}
            {!loading && error && (
              <div className="text-sm text-red-400">{error}</div>
            )}
            {!loading && !error && (
              <div className={`text-sm whitespace-pre-wrap ${textMain}`}>{hint || 'No hint available.'}</div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className={`text-xs ${textSub}`}>Hints are concise and avoid full solutions.</div>
              <div className="flex items-center gap-2">
                <button onClick={loadHint} className={`px-3 py-1.5 rounded-lg text-sm ${theme==='dark'?'bg-slate-800 hover:bg-slate-700 text-white':'bg-slate-100 hover:bg-slate-200 text-slate-900'} flex items-center gap-1`}>
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
                <button onClick={copy} className={`px-3 py-1.5 rounded-lg text-sm border ${border} ${textMain} flex items-center gap-1`}>
                  <Copy className="w-4 h-4" /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
