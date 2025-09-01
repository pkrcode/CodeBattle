import { Crown, Shield, Star, Gem, Medal } from 'lucide-react';
import type React from 'react';

export type RankTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Grandmaster';

export type RankStyle = {
  name: RankTier;
  short: string;
  gradient: string; // tailwind gradient classes
  border: string;
  text: string;
  glow: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
};

export const RANK_ORDER: RankTier[] = ['Bronze','Silver','Gold','Platinum','Diamond','Master','Grandmaster'];

export const rankStyles: Record<RankTier, RankStyle> = {
  Bronze: {
    name: 'Bronze', short: 'BRZ',
    gradient: 'from-amber-700 to-amber-600',
    border: 'border-amber-500/40',
    text: 'text-amber-100',
    glow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',
    icon: Shield,
  },
  Silver: {
    name: 'Silver', short: 'SLV',
    gradient: 'from-slate-400 to-slate-500',
    border: 'border-slate-300/40',
    text: 'text-slate-50',
    glow: 'shadow-[0_0_24px_rgba(148,163,184,0.35)]',
    icon: Shield,
  },
  Gold: {
    name: 'Gold', short: 'GLD',
    gradient: 'from-yellow-400 to-yellow-500',
    border: 'border-yellow-300/50',
    text: 'text-yellow-50',
    glow: 'shadow-[0_0_28px_rgba(234,179,8,0.5)]',
    icon: Crown,
  },
  Platinum: {
    name: 'Platinum', short: 'PLT',
    gradient: 'from-cyan-400 to-teal-500',
    border: 'border-cyan-300/50',
    text: 'text-cyan-50',
    glow: 'shadow-[0_0_28px_rgba(34,211,238,0.45)]',
    icon: Gem,
  },
  Diamond: {
    name: 'Diamond', short: 'DMD',
    gradient: 'from-indigo-400 to-fuchsia-500',
    border: 'border-indigo-300/50',
    text: 'text-indigo-50',
    glow: 'shadow-[0_0_32px_rgba(99,102,241,0.5)]',
    icon: Gem,
  },
  Master: {
    name: 'Master', short: 'MST',
    gradient: 'from-rose-400 to-orange-500',
    border: 'border-rose-300/50',
    text: 'text-rose-50',
    glow: 'shadow-[0_0_32px_rgba(244,63,94,0.5)]',
    icon: Star,
  },
  Grandmaster: {
    name: 'Grandmaster', short: 'GM',
    gradient: 'from-purple-500 to-amber-400',
    border: 'border-purple-300/60',
    text: 'text-purple-50',
    glow: 'shadow-[0_0_36px_rgba(168,85,247,0.6)]',
    icon: Medal,
  },
};

export function getRankStyle(rank?: string): RankStyle {
  const key = (rank || 'Bronze') as RankTier;
  return rankStyles[key] ?? rankStyles.Bronze;
}

export function getNextRank(rank?: string): RankTier | null {
  const idx = RANK_ORDER.indexOf((rank || 'Bronze') as RankTier);
  if (idx < 0 || idx >= RANK_ORDER.length - 1) return null;
  return RANK_ORDER[idx + 1];
}
