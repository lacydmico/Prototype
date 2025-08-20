import React from 'react';
import { NotificationBadgeProps } from '../../types';

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  className = '',
}) => {
  if (count === 0) return null;

  return (
    <div
      className={`
        absolute -top-1 -right-1 min-w-[18px] h-[18px] 
        bg-gradient-to-r from-red-500 to-red-600
        text-white text-xs font-bold
        rounded-full flex items-center justify-center
        border-2 border-black
        ${className}
      `}
      style={{
        fontFamily: '"Proxima Nova SemiBold", sans-serif',
        fontSize: '11px',
        lineHeight: '1',
      }}
    >
      {count > 99 ? '99+' : count}
    </div>
  );
};

export default NotificationBadge;