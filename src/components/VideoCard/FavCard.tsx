import React, { useState } from 'react';
import { VideoCardProps } from '../../types';
import PlusIcon from '../ui/PlusIcon';

const FavCard: React.FC<VideoCardProps> = ({
  content,
  size = 'medium',
  onWatch,
  onToggleWatchlist,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-40',
    medium: 'w-48',
    large: 'w-64',
  };

  const handleWatch = () => {
    if (onWatch) {
      onWatch(content.id);
    }
  };

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWatchlist) {
      onToggleWatchlist(content.id);
    }
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`/movies/video/${content.id}/`}
        className="block text-white no-underline"
        aria-label={content.title}
        onClick={(e) => {
          if (onWatch) {
            e.preventDefault();
            onWatch(content.id);
          }
        }}
      >
        <div 
          className={`
            relative pb-[150%] rounded-lg overflow-hidden mb-0
            transition-all duration-300 ease-out
            ${isHovered ? 'scale-110 shadow-elevated' : 'scale-100'}
          `}
        >
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="absolute top-0 w-full h-full object-cover transition-all duration-300 ease-out"
          />
          
          {/* Gradient overlay for better contrast */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Plus button at bottom */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleToggleWatchlist}
              className={`
                w-12 h-12 rounded-full border-2 border-white
                bg-black/40 backdrop-blur-sm
                flex items-center justify-center
                text-white hover:bg-black/60
                transition-all duration-300 ease-out
                ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}
              `}
              aria-label={content.isInWatchlist ? "Remove from My List" : "Add to My List"}
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FavCard;