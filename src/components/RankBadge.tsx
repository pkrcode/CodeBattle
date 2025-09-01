import React from 'react';
import { getRankStyle } from '../utils/rank';

type Props = {
  rank?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { pad: 'px-2 py-1', text: 'text-xs', icon: 14 },
  md: { pad: 'px-3 py-1.5', text: 'text-sm', icon: 16 },
  lg: { pad: 'px-4 py-2', text: 'text-base', icon: 18 },
};

export const RankBadge: React.FC<Props> = ({ rank, size = 'md', showLabel = true, className = '' }) => {
  const style = getRankStyle(rank);
  const s = sizeMap[size];
  const Icon = style.icon;
  return (
    <div className={`inline-flex items-center ${s.pad} rounded-xl border ${style.border} bg-gradient-to-r ${style.gradient} ${style.glow} ${className}`}>
      <Icon size={s.icon} className={`${style.text} drop-shadow`} />
      {showLabel && <span className={`ml-2 font-semibold ${style.text}`}>{style.name}</span>}
    </div>
  );
};

export default RankBadge;
