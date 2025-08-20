import React from 'react';
import { VideoCardProps } from '../../types';

const VideoCard: React.FC<VideoCardProps> = ({
  content,
  size = 'medium',
  showMetadata = false,
  onWatch,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-40',
    medium: 'w-48',
    large: 'w-64',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
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
        <div className="relative pb-[150%] rounded-lg overflow-hidden mb-0">
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="absolute top-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out"
          />
        </div>
        
        {showMetadata && (
          <div className="mt-2 w-full">
            <div className="overflow-hidden whitespace-nowrap text-white/60 block text-ellipsis">
              <span className="text-sm font-normal leading-[18px]" />
            </div>
            <span className="text-white/60 text-sm font-normal leading-[18px] mr-1">
              <time />
            </span>
          </div>
        )}
      </a>
    </div>
  );
};

export default VideoCard;