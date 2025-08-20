export interface VideoContent {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl?: string;
  starring: string[];
  isInWatchlist?: boolean;
}

export interface VideoCardProps {
  content: VideoContent;
  size?: 'small' | 'medium' | 'large';
  showMetadata?: boolean;
  onWatch?: (id: string) => void;
  onToggleWatchlist?: (id: string) => void;
  className?: string;
}

export interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface VideoDetailsPageProps {
  content: VideoContent;
  onWatch?: (id: string) => void;
  onToggleWatchlist?: (id: string) => void;
  className?: string;
}

export interface MetadataProps {
  genre: string;
  year: number;
  rating: string;
  duration: string;
  starring: string[];
  description: string;
}

export interface VideoPlayerProps {
  src?: string;
  title?: string;
  className?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'new_content' | 'watchlist' | 'system';
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  thumbnailUrl?: string;
  contentId?: string;
}

export interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: Notification) => void;
  onClearNotification: (id: string) => void;
  className?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onNotificationClick: (notification: Notification) => void;
  onClearNotification: (id: string) => void;
  className?: string;
}

export interface NotificationBadgeProps {
  count: number;
  className?: string;
}