import React from 'react';

const PlayIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5.004 3.003v14.001l12.003-7.002z"
      fill="currentColor"
      fillRule="evenodd"
      transform="translate(-5 -3)"
    />
  </svg>
);

export default PlayIcon;