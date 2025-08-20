import React from 'react';
import { NotificationItemProps } from '../../types';
import { Bell, CheckCircle, AlertTriangle, XCircle, Play, Plus, Settings } from 'lucide-react';

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onNotificationClick,
  onClearNotification,
  className = '',
}) => {
  const getTypeIcon = () => {
    switch (notification.type) {
      case 'new_content':
        return <Play className="w-4 h-4" />;
      case 'watchlist':
        return <Plus className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'new_content':
        return 'text-blue-400';
      case 'watchlist':
        return 'text-green-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      case 'system':
        return 'text-purple-400';
      default:
        return 'text-white/70';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    onNotificationClick(notification);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClearNotification(notification.id);
  };

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 
        hover:bg-white/5 transition-colors duration-200 cursor-pointer
        border-b border-white/10 last:border-b-0
        ${!notification.isRead ? 'bg-blue-500/5' : ''}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute left-2 top-6 w-2 h-2 bg-blue-500 rounded-full" />
      )}

      {/* Thumbnail or Icon */}
      <div className="flex-shrink-0 ml-2">
        {notification.thumbnailUrl ? (
          <img
            src={notification.thumbnailUrl}
            alt=""
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <div className={`w-12 h-12 rounded bg-white/10 flex items-center justify-center ${getTypeColor()}`}>
            {getTypeIcon()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4
              className={`font-semibold text-sm leading-tight mb-1 ${
                !notification.isRead ? 'text-white' : 'text-white/80'
              }`}
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
              }}
            >
              {notification.title}
            </h4>
            <p
              className={`text-sm leading-relaxed line-clamp-2 ${
                !notification.isRead ? 'text-white/90' : 'text-white/60'
              }`}
              style={{
                fontFamily: '"Proxima Nova Regular", sans-serif',
              }}
            >
              {notification.message}
            </p>
          </div>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="flex-shrink-0 text-white/40 hover:text-white/70 transition-colors duration-200 p-1"
            aria-label="Clear notification"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Timestamp */}
        <div className="mt-2">
          <span
            className="text-xs text-white/50"
            style={{
              fontFamily: '"Proxima Nova Regular", sans-serif',
            }}
          >
            {formatTimestamp(notification.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;