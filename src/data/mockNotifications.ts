import { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Episode Available',
    message: 'Star Trek: Strange New Worlds - Episode 8 "Under the Cloak of War" is now streaming',
    type: 'new_content',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    actionUrl: '/series/star-trek-strange-new-worlds',
    thumbnailUrl: 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w600-q80/show_asset/55/60/14/show_asset_900ba790-3837-46a8-b7fb-7c79d7bac115.jpg?format=webp',
    contentId: 'star-trek-strange-new-worlds'
  },
  {
    id: 'notif-2',
    title: 'Added to My List',
    message: 'Interstellar has been added to your watchlist',
    type: 'watchlist',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    actionUrl: '/my-list',
    thumbnailUrl: 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w600-q80/movie_asset/12/81/80/movie_asset_c972f136-f1f5-4780-b06e-e41a1547f6a6.jpg?format=webp',
    contentId: '99Iu4FLZEe_R7OorL6fORrs8m_6S4tN9'
  },
  {
    id: 'notif-3',
    title: 'Continue Watching',
    message: 'You left off at 42:15 in Dexter - Season 1, Episode 3',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    isRead: true,
    actionUrl: '/series/dexter',
    thumbnailUrl: 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w370-q80/show_asset/14/45/10/show_asset_fc961046-dc4b-4cf3-8c74-1018335cd5ea.jpg?format=webp',
    contentId: 'dexter'
  },
  {
    id: 'notif-4',
    title: 'System Update',
    message: 'Paramount+ has been updated with new features and improvements',
    type: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    actionUrl: '/help/whats-new'
  },
  {
    id: 'notif-5',
    title: 'New Movies Added',
    message: '15 new blockbuster movies have been added to your library',
    type: 'new_content',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
    actionUrl: '/movies/new-releases'
  },
  {
    id: 'notif-6',
    title: 'Download Complete',
    message: 'Ridiculousness - Season 34 episodes are ready for offline viewing',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
    actionUrl: '/downloads',
    thumbnailUrl: 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w600-q80/show_asset/38/88/98/show_asset_b53c824a-9b44-4a9e-9e2b-bf3ec2cc1225.jpg?format=webp',
    contentId: 'ridiculousness'
  }
];