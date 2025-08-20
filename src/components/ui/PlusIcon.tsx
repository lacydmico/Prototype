import React from 'react';

const PlusIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.252 4.247a1.25 1.25 0 1 0-2.5 0v6.5H4.248a1.25 1.25 0 0 0 0 2.5h6.504v6.506a1.25 1.25 0 0 0 2.5 0v-6.506h6.5a1.25 1.25 0 0 0 0-2.5h-6.5z"
      clipRule="evenodd"
    />
  </svg>
);

export default PlusIcon;