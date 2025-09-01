import React, { useEffect, useState } from 'react';
import { RANK_ORDER, getRankStyle, getNextRank } from '../utils/rank';
import { X } from 'lucide-react';

type Props = {
  currentRank?: string;
  xp?: number;
  level?: number;
  onClose?: () => void;
};

const LS_KEY = 'rank_modal_seen_v1';

const RankModal: React.FC<Props> = ({ currentRank = 'Bronze', xp = 0, level = 1, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(LS_KEY);
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem(LS_KEY, '1');
    }
  }, []);

  if (!visible) return null;

  const style = getRankStyle(currentRank);
  const next = getNextRank(currentRank);
  const nextStyle = next ? getRankStyle(next) : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-[92%] max-w-3xl rounded-2xl border ${style.border} bg-slate-900 text-white relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-20`} />
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className={`inline-flex items-center px-3 py-1.5 rounded-xl border ${style.border} bg-black/30`}> 
                <span className={`font-bold ${style.text}`}>{style.name}</span>
              </div>
              <h2 className="text-2xl font-bold mt-3">Welcome back! Your Rank</h2>
              <p className="text-slate-300 mt-1">Ranks unlock themed colors and flair across the app.</p>
            </div>
            <button onClick={() => { setVisible(false); onClose?.(); }} className="p-2 rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="rounded-xl bg-black/30 p-4 border border-white/10">
              <h3 className="font-semibold mb-2">Your Progress</h3>
              <div className="text-sm text-slate-300">Level {level} • {xp} XP</div>
              <div className="mt-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border ${style.border} bg-gradient-to-br ${style.gradient}`} />
                <div className="text-sm text-slate-300">Current: <span className={`font-semibold ${style.text}`}>{style.name}</span></div>
              </div>
              {next && nextStyle && (
                <div className="mt-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg border ${nextStyle.border} bg-gradient-to-br ${nextStyle.gradient}`} />
                  <div className="text-sm text-slate-300">Next: <span className={`font-semibold ${nextStyle.text}`}>{nextStyle.name}</span></div>
                </div>
              )}
            </div>
            <div className="rounded-xl bg-black/30 p-4 border border-white/10">
              <h3 className="font-semibold mb-2">Rank Ladder</h3>
              <div className="grid grid-cols-2 gap-2">
                {RANK_ORDER.map(r => {
                  const s = getRankStyle(r);
                  return (
                    <div key={r} className={`flex items-center gap-2 p-2 rounded-lg border ${s.border} bg-gradient-to-r ${s.gradient} bg-opacity-30`}>
                      <div className={`w-8 h-8 rounded-md border ${s.border} bg-black/20`} />
                      <div className={`text-sm font-semibold ${s.text}`}>{s.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankModal;
