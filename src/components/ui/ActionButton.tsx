import React from 'react';
import { ActionButtonProps } from '../../types';

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold text-sm uppercase tracking-wide
    transition-all duration-300 ease-in-out
    border-0 cursor-pointer
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700
      hover:from-blue-500 hover:to-blue-600
      text-white px-5 py-3 rounded-md
      min-h-[46px] flex-grow-2
    `,
    secondary: `
      bg-black/20 backdrop-blur-sm
      border border-white rounded-full
      text-white w-12 h-12
      hover:bg-black/30 transition-colors duration-150
    `,
    icon: `
      bg-transparent text-white
      hover:bg-white/10 rounded-md
      p-2 min-w-[46px] min-h-[46px]
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-400 rounded-md" />
      )}
      <div className="relative flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

export default ActionButton;