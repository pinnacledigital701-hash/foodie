'use client';

import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  id?: string;
  variant?: 'default' | 'light' | 'dark';
  emblemOnly?: boolean;
}

/**
 * Authentic vector Logo component for Foodie Restaurant.
 * Recreated with exact proportions, responsive scaling, aspect-ratio preservation,
 * and true alpha transparency from the brand asset.
 */
export const Logo: React.FC<LogoProps> = ({
  className = 'h-9 w-auto',
  id = 'foodie-brand-logo',
  variant = 'default',
  emblemOnly = false,
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const maskId = `foodie-mask-${uniqueId}`;

  // Color mappings
  const emblemColor = '#D13E27'; // Brand terracotta / crimson-orange
  const textColor = variant === 'light' ? '#FFFFFF' : '#1A1A1A'; // Charcoal or crisp white

  if (emblemOnly) {
    return (
      <svg
        id={id}
        viewBox="0 0 100 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid meet"
        aria-label="Foodie Emblem"
        role="img"
        className={className}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100" height="88" fill="white" />
            {/* Cloche Knob */}
            <circle cx="53" cy="21" r="3.6" fill="black" />
            {/* Cloche Dome */}
            <path d="M37 38 C37 27 44 23 53 23 C62 23 69 27 69 38 Z" fill="black" />
            {/* Cloche Platter Tray */}
            <rect x="32" y="39.5" width="45" height="4.2" rx="2.1" fill="black" />
            {/* Dynamic Sweep Cut slicing left stem */}
            <path d="M12 52.5 C21 52.5 28 47.5 36 42.5 L36 38 C28 43 20 48 12 48 Z" fill="black" />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {/* Upper arch / wing of F */}
          <path
            d="M13 47.5 C13 27 23 15 42 15 H73 C84 15 92 21 92 31 C92 40 85 45 76 45 H36 C28 45 20 46.5 13 49.5 Z"
            fill={emblemColor}
          />
          {/* Lower stem & middle bar of F */}
          <path
            d="M13 52.5 C22 47.5 31 44.5 42 44.5 H74 C80 44.5 84 48.5 84 54.5 C84 60.5 80 64.5 74 64.5 H38 C35 64.5 34 65.5 34 69 V78 C34 82 31 85 27 85 H19 C15 85 13 82 13 78 Z"
            fill={emblemColor}
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      id={id}
      viewBox="0 0 316 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      aria-label="Foodie Restaurant"
      role="img"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          {/* White retains full opacity */}
          <rect width="316" height="88" fill="white" />

          {/* Cloche Knob (cutout to transparent) */}
          <circle cx="53" cy="21" r="3.6" fill="black" />

          {/* Cloche Dome (cutout to transparent) */}
          <path d="M37 38 C37 27 44 23 53 23 C62 23 69 27 69 38 Z" fill="black" />

          {/* Cloche Platter Tray (cutout to transparent) */}
          <rect x="32" y="39.5" width="45" height="4.2" rx="2.1" fill="black" />

          {/* Dynamic Sweep Cut slicing through left stem */}
          <path d="M12 52.5 C21 52.5 28 47.5 36 42.5 L36 38 C28 43 20 48 12 48 Z" fill="black" />
        </mask>
      </defs>

      {/* Stylized F Emblem with Cloche (Burnt Terracotta / Vermilion) */}
      <g mask={`url(#${maskId})`}>
        {/* Upper wing of F */}
        <path
          d="M13 47.5 C13 27 23 15 42 15 H73 C84 15 92 21 92 31 C92 40 85 45 76 45 H36 C28 45 20 46.5 13 49.5 Z"
          fill={emblemColor}
        />
        {/* Lower stem & middle bar of F */}
        <path
          d="M13 52.5 C22 47.5 31 44.5 42 44.5 H74 C80 44.5 84 48.5 84 54.5 C84 60.5 80 64.5 74 64.5 H38 C35 64.5 34 65.5 34 69 V78 C34 82 31 85 27 85 H19 C15 85 13 82 13 78 Z"
          fill={emblemColor}
        />
      </g>

      {/* FOODIE Wordmark (Bold Geometric Sans Vector Glyphs) */}
      <g fill={textColor}>
        {/* F */}
        <path d="M112 28 H134 V35.5 H119.5 V43.5 H130.5 V50.5 H119.5 V66 H112 Z" />

        {/* O */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158 28 C168.5 28 177 36.5 177 47 C177 57.5 168.5 66 158 66 C147.5 66 139 57.5 139 47 C139 36.5 147.5 28 158 28 Z M158 35.5 C151.6 35.5 146.5 40.6 146.5 47 C146.5 53.4 151.6 58.5 158 58.5 C164.4 58.5 169.5 53.4 169.5 47 C169.5 40.6 164.4 35.5 158 35.5 Z"
        />

        {/* O */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202 28 C212.5 28 221 36.5 221 47 C221 57.5 212.5 66 202 66 C191.5 66 183 57.5 183 47 C183 36.5 191.5 28 202 28 Z M202 35.5 C195.6 35.5 190.5 40.6 190.5 47 C190.5 53.4 195.6 58.5 202 58.5 C208.4 58.5 213.5 53.4 213.5 47 C213.5 40.6 208.4 35.5 202 35.5 Z"
        />

        {/* D */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M227 28 H241 C252 28 260.5 36.5 260.5 47 C260.5 57.5 252 66 241 66 H227 Z M234.5 35.5 H241 C247.5 35.5 253 40.6 253 47 C253 53.4 247.5 58.5 241 58.5 H234.5 Z"
        />

        {/* I */}
        <path d="M267 28 H274.5 V66 H267 Z" />

        {/* E */}
        <path d="M281 28 H303 V35.5 H288.5 V43.5 H299.5 V50.5 H288.5 V58.5 H303 V66 H281 Z" />
      </g>
    </svg>
  );
};
export default Logo;
