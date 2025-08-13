import React from 'react';

interface CrossSwordsProps {
  className?: string;
  size?: number;
}

const CrossSwords: React.FC<CrossSwordsProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* First sword */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16h4v4" />
      
      {/* Second sword (crossed) */}
      <path d="M9.5 6.5L21 18v3h-3L6.5 9.5" />
      <path d="M11 4l-6 6" />
      <path d="M8 8H4V4" />
    </svg>
  );
};

export default CrossSwords;
