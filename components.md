# Video Card Component Library - Components Documentation

## Overview
This document outlines all the components available in the Video Card Component Library, a comprehensive React component system for video streaming platforms.

## Component Architecture

### 📁 Navigation Components

#### `TopNavigation`
**Location**: `src/components/Navigation/TopNavigation.tsx`

A responsive navigation bar component featuring the Paramount+ branding, notifications, and user interface.

**Features**:
- Official Paramount+ SVG logo
- Left-aligned navigation items with active/inactive states
- Search functionality
- Notification center with badge indicator
- User profile section with avatar and dropdown
- Responsive design with hover effects

**Props**: 
- `className?: string` - Optional CSS classes

**Usage**:
```tsx
<TopNavigation />
```

---

### 📁 Notification Components

#### `NotificationCenter`
**Location**: `src/components/Notifications/NotificationCenter.tsx`

A comprehensive notification system with dropdown panel and badge indicator.

**Features**:
- Bell icon with unread count badge
- Dropdown panel with notification list
- Mark all as read functionality
- Auto-close on outside click
- Scrollable notification list
- Empty state handling

**Props**:
- `notifications: Notification[]` - Array of notifications
- `onMarkAsRead: (id: string) => void` - Mark single notification as read
- `onMarkAllAsRead: () => void` - Mark all notifications as read
- `onNotificationClick: (notification: Notification) => void` - Handle notification click
- `onClearNotification: (id: string) => void` - Clear/remove notification
- `className?: string` - Optional CSS classes

#### `NotificationItem`
**Location**: `src/components/Notifications/NotificationItem.tsx`

Individual notification component with rich content display.

**Features**:
- Type-based icons and colors
- Thumbnail image support
- Unread indicator dot
- Timestamp formatting (relative time)
- Clear/dismiss button
- Click-to-action functionality
- Hover states and transitions

**Props**:
- `notification: Notification` - Notification data object
- `onMarkAsRead: (id: string) => void` - Mark as read callback
- `onNotificationClick: (notification: Notification) => void` - Click callback
- `onClearNotification: (id: string) => void` - Clear callback
- `className?: string` - Optional CSS classes

#### `NotificationBadge`
**Location**: `src/components/Notifications/NotificationBadge.tsx`

Badge component for displaying unread notification count.

**Features**:
- Red gradient background
- Auto-hide when count is 0
- 99+ cap for large numbers
- Positioned absolutely for overlay
- Border for contrast

**Props**:
- `count: number` - Number of unread notifications
- `className?: string` - Optional CSS classes

---

### 📁 Video Card Components

#### `VideoCard`
**Location**: `src/components/VideoCard/VideoCard.tsx`

Basic video card component for displaying movie/show thumbnails.

**Features**:
- Responsive sizing (small, medium, large)
- Click-to-watch functionality
- Optional metadata display
- Smooth hover transitions

**Props**:
- `content: VideoContent` - Video data object
- `size?: 'small' | 'medium' | 'large'` - Card size
- `showMetadata?: boolean` - Show/hide metadata
- `onWatch?: (id: string) => void` - Watch callback
- `className?: string` - Optional CSS classes

#### `VideoCardWithHover`
**Location**: `src/components/VideoCard/VideoCardWithHover.tsx`

Enhanced video card with hover state expansion and detailed information overlay.

**Features**:
- Hover expansion with scale animation
- Video preview on hover
- Detailed metadata display
- Action buttons (Watch Now, Add to List)
- Gradient overlays and backdrop effects

**Props**:
- `content: VideoContent` - Video data object
- `size?: 'small' | 'medium' | 'large'` - Card size
- `onWatch?: (id: string) => void` - Watch callback
- `onToggleWatchlist?: (id: string) => void` - Watchlist callback
- `className?: string` - Optional CSS classes

#### `FavCard`
**Location**: `src/components/VideoCard/FavCard.tsx`

Specialized card component for favorite/watchlist sections with bottom-positioned plus button.

**Features**:
- Hover scale animation (110% growth)
- Circular plus button at bottom
- Gradient overlay on hover
- Elevated shadow effects
- Backdrop blur for button visibility

**Props**:
- `content: VideoContent` - Video data object
- `size?: 'small' | 'medium' | 'large'` - Card size
- `onWatch?: (id: string) => void` - Watch callback
- `onToggleWatchlist?: (id: string) => void` - Watchlist callback
- `className?: string` - Optional CSS classes

#### `MetadataDisplay`
**Location**: `src/components/VideoCard/MetadataDisplay.tsx`

Component for displaying detailed movie/show information.

**Features**:
- Genre, year, rating, duration display
- Cast information
- Description with line clamping
- Responsive typography

**Props**:
- `genre: string` - Content genre
- `year: number` - Release year
- `rating: string` - Content rating
- `duration: string` - Runtime duration
- `starring: string[]` - Cast members
- `description: string` - Content description

---

### 📁 Video Player Components

#### `VideoPlayer`
**Location**: `src/components/VideoPlayer/VideoPlayer.tsx`

Full-featured video player with comprehensive controls and professional UI.

**Features**:
- Play/pause controls with center overlay
- Progress bar with seek functionality
- Volume control with mute toggle
- Skip forward/backward (10 seconds)
- Fullscreen support
- Auto-hiding controls
- Time display
- Settings and menu buttons

**Props**:
- `src?: string` - Video source URL
- `title?: string` - Video title
- `className?: string` - Optional CSS classes

---

### 📁 Video Details Components

#### `VideoDetailsPage`
**Location**: `src/components/VideoDetailsPage/VideoDetailsPage.tsx`

Hero-style page component for displaying detailed video information with background imagery.

**Features**:
- Full-screen hero layout
- Background image with gradient overlays
- Large title typography
- Metadata badges and information
- Action buttons (Watch Now, My List)
- Cast and description display
- Responsive design

**Props**:
- `content: VideoContent` - Video data object
- `onWatch?: (id: string) => void` - Watch callback
- `onToggleWatchlist?: (id: string) => void` - Watchlist callback
- `className?: string` - Optional CSS classes

---

### 📁 Listing Page Components

#### `ListingPage`
**Location**: `src/components/ListingPage/ListingPage.tsx`

Grid-based listing page for displaying collections of video content.

**Features**:
- Responsive grid layout
- Section headers with content counts
- Empty state handling
- About section with contextual descriptions
- Back navigation support

**Props**:
- `title: string` - Page title
- `content: VideoContent[]` - Array of video content
- `onShowDetail?: (id: string) => void` - Detail view callback
- `onWatch?: (id: string) => void` - Watch callback
- `onToggleWatchlist?: (id: string) => void` - Watchlist callback
- `className?: string` - Optional CSS classes

---

### 📁 UI Components

#### `ActionButton`
**Location**: `src/components/ui/ActionButton.tsx`

Reusable button component with multiple variants for different use cases.

**Variants**:
- `primary` - Blue gradient button for main actions
- `secondary` - Circular button with border for secondary actions
- `icon` - Transparent button for icon-only actions

**Props**:
- `variant: 'primary' | 'secondary' | 'icon'` - Button style
- `children: React.ReactNode` - Button content
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state
- `className?: string` - Optional CSS classes
- `ariaLabel?: string` - Accessibility label

#### `PlayIcon`
**Location**: `src/components/ui/PlayIcon.tsx`

SVG play icon component with consistent styling.

**Props**:
- `className?: string` - Optional CSS classes

#### `PlusIcon`
**Location**: `src/components/ui/PlusIcon.tsx`

SVG plus icon component for add/remove actions.

**Props**:
- `className?: string` - Optional CSS classes

#### `Tooltip`
**Location**: `src/components/ui/Tooltip.tsx`

Tooltip component for providing additional context on hover.

**Features**:
- Multiple positioning options
- Smooth show/hide animations
- Accessible implementation

**Props**:
- `content: string` - Tooltip text
- `children: React.ReactNode` - Element to wrap
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position

---

## Type Definitions

### `VideoContent`
**Location**: `src/types/index.ts`

Core data structure for video content.

```typescript
interface VideoContent {
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
```

### `Notification`
**Location**: `src/types/index.ts`

Core data structure for notifications.

```typescript
interface Notification {
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
```

### Component Props Interfaces
- `VideoCardProps` - Props for video card components
- `ActionButtonProps` - Props for action buttons
- `VideoDetailsPageProps` - Props for video details page
- `MetadataProps` - Props for metadata display
- `VideoPlayerProps` - Props for video player
- `NotificationCenterProps` - Props for notification center
- `NotificationItemProps` - Props for notification items
- `NotificationBadgeProps` - Props for notification badge

---

## Design System

### Colors
- **Background**: `rgb(18, 18, 18)` - Primary dark background
- **Card Background**: `rgb(0, 0, 0)` - Card backgrounds
- **Accent**: Blue gradient (`rgb(0, 100, 255)` to `rgb(0, 55, 197)`)
- **Text**: White with various opacity levels

### Typography
- **Font Family**: Proxima Nova (Regular & SemiBold)
- **Responsive sizing**: 14px to 72px range
- **Line heights**: Optimized for readability

### Animations
- **Duration**: 300ms standard, 400ms for complex transitions
- **Easing**: `cubic-bezier(0.165, 0.84, 0.44, 1)` for bounce effects
- **Hover states**: Scale, opacity, and shadow transitions

### Spacing
- **Grid System**: 8px base unit
- **Component spacing**: Consistent padding and margins
- **Responsive breakpoints**: Mobile-first approach

---

## Usage Examples

### Basic Video Grid
```tsx
<div className="grid grid-cols-4 gap-6">
  {videos.map(video => (
    <VideoCardWithHover
      key={video.id}
      content={video}
      onWatch={handleWatch}
      onToggleWatchlist={handleWatchlist}
    />
  ))}
</div>
```

### Favorites Section
```tsx
<div className="flex gap-4">
  {favoriteVideos.map(video => (
    <FavCard
      key={video.id}
      content={video}
      size="medium"
      onWatch={handleWatch}
      onToggleWatchlist={handleWatchlist}
    />
  ))}
</div>
import { NotificationCenter } from './components/Notifications';
import { mockNotifications } from './data/mockNotifications';

<NotificationCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onNotificationClick={handleNotificationClick}
  onClearNotification={handleClearNotification}
/>
```

### Custom Notification Types
```tsx
const customNotification: Notification = {
  id: 'custom-1',
  title: 'Custom Notification',
  message: 'This is a custom notification message',
  type: 'new_content',
  timestamp: new Date(),
  isRead: false,
  actionUrl: '/custom-action',
  thumbnailUrl: 'https://example.com/thumbnail.jpg'
};
```

### Video Player Implementation
```tsx
<VideoPlayer
  src="https://example.com/video.mp4"
  title="Movie Title"
  className="w-full h-screen"
/>
```

### Listing Page Usage
```tsx
<ListingPage
  title="Featured Movies"
  content={movieList}
  onShowDetail={handleShowDetail}
  onWatch={handleWatch}
  onToggleWatchlist={handleToggleWatchlist}
/>
```

---

## File Structure

```
src/
├── components/
│   ├── Navigation/
│   │   ├── TopNavigation.tsx
│   │   └── index.ts
│   ├── Notifications/
│   │   ├── NotificationCenter.tsx
│   │   ├── NotificationItem.tsx
│   │   ├── NotificationBadge.tsx
│   │   └── index.ts
│   ├── VideoCard/
│   │   ├── VideoCard.tsx
│   │   ├── VideoCardWithHover.tsx
│   │   ├── FavCard.tsx
│   │   ├── MetadataDisplay.tsx
│   │   └── index.ts
│   ├── VideoPlayer/
│   │   ├── VideoPlayer.tsx
│   │   └── index.ts
│   ├── VideoDetailsPage/
│   │   ├── VideoDetailsPage.tsx
│   │   └── index.ts
│   ├── ListingPage/
│   │   ├── ListingPage.tsx
│   │   └── index.ts
│   └── ui/
│       ├── ActionButton.tsx
│       ├── PlayIcon.tsx
│       ├── PlusIcon.tsx
│       ├── Tooltip.tsx
│       └── index.ts
├── types/
│   └── index.ts
├── data/
│   ├── mockData.ts
│   └── mockNotifications.ts
└── styles/
    └── tokens.ts
```

---

## Development Notes

- All components are built with TypeScript for type safety
- Tailwind CSS is used for styling with custom design tokens
- Components follow React best practices with proper prop validation
- Accessibility features are implemented throughout
- Responsive design is mobile-first
- All animations use CSS transitions for optimal performance

---

## State Management

The application uses React's built-in state management with the following patterns:

### Main App State
- `currentView` - Controls which page/view is displayed
- `selectedContent` - Currently selected video content
- `listingData` - Data for listing pages

### Component State
- Hover states for interactive elements
- Video player controls and progress
- Form inputs and user interactions

### Event Handlers
- `handleShowDetail` - Navigate to detail view
- `handleWatch` - Start video playback
- `handleShowListing` - Navigate to listing view
- `handleToggleWatchlist` - Add/remove from watchlist
- `handleBackToHome` - Return to home view

---

## Accessibility Features

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly markup
- High contrast ratios for text
- Focus indicators for keyboard users
- Semantic HTML structure

---

## Performance Optimizations

- Lazy loading of video content
- Optimized image loading with WebP format
- CSS transitions instead of JavaScript animations
- Efficient re-rendering with React keys
- Minimal bundle size with tree shaking