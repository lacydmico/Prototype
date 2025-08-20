import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { NotificationCenterProps } from '../../types';
import NotificationItem from './NotificationItem';
import NotificationBadge from './NotificationBadge';

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
  onClearNotification,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 10); // Show last 10 notifications

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative text-white/70 hover:text-white transition-colors duration-200 p-2"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell className="w-5 h-5" />
        <NotificationBadge count={unreadCount} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-96 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-elevated z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3
              className="text-white font-semibold text-lg"
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
              }}
            >
              Notifications
            </h3>
            
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold uppercase tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: '"Proxima Nova SemiBold", sans-serif',
                }}
              >
                <Check className="w-4 h-4" />
                Mark All Read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  onNotificationClick={onNotificationClick}
                  onClearNotification={onClearNotification}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily: '"Proxima Nova Regular", sans-serif',
                  }}
                >
                  No notifications yet
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {recentNotifications.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-black/50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Could navigate to full notifications page
                }}
                className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-semibold uppercase tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: '"Proxima Nova SemiBold", sans-serif',
                }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;