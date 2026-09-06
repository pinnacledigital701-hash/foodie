import React from 'react';

interface HandDrawnLoopProps {
  children?: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const HandDrawnLoop: React.FC<HandDrawnLoopProps> = ({
  children,
  className = '',
  strokeColor = '#F5B83F',
}) => {
  if (children) {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        {/* Energetic playful hand-drawn food accent circle loop */}
        <svg
          className="pointer-events-none absolute -bottom-2 -left-2.5 w-[calc(100%+20px)] h-8 opacity-90"
          viewBox="0 0 260 70"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M8 38C45 8 219 7 252 32C265 48 213 62 132 62C59 62 -5 52 10 38Z"
            stroke={strokeColor}
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  // Standalone SVG overlay mode
  return (
    <svg
      className={`pointer-events-none absolute opacity-90 ${className}`}
      viewBox="0 0 260 70"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M8 38C45 8 219 7 252 32C265 48 213 62 132 62C59 62 -5 52 10 38Z"
        stroke={strokeColor}
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
};
