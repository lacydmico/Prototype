import React from 'react';
import { VideoDetailsPageProps } from '../../types';
import ActionButton from '../ui/ActionButton';
import PlayIcon from '../ui/PlayIcon';
import PlusIcon from '../ui/PlusIcon';

const VideoDetailsPage: React.FC<VideoDetailsPageProps> = ({
  content,
  onWatch,
  onToggleWatchlist,
  className = '',
}) => {
  const handleWatch = () => {
    if (onWatch) {
      onWatch(content.id);
    }
  };

  const handleToggleWatchlist = () => {
    if (onToggleWatchlist) {
      onToggleWatchlist(content.id);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Hero Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        {/* Left to right black fade for text contrast */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)'
          }}
        />
        {/* Bottom gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(transparent 0%, transparent 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.8) 100%)'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-16 pb-20">
        <div className="max-w-4xl">
          {/* Title */}
          <h1 
            className="text-white font-bold mb-8"
            style={{
              fontSize: '72px',
              lineHeight: '72px',
              fontFamily: '"Proxima Nova Regular", sans-serif',
              fontWeight: 700,
            }}
          >
            {content.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-8 mb-10">
            {/* Rating Badge */}
            <div className="flex items-center">
              <img
                src={`https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w100-q80/cbs_page_attribute/${content.rating.toLowerCase()}_4.png?format=webp`}
                alt={content.rating}
                className="h-6 w-auto"
              />
            </div>
            
            {/* Genre */}
            <span 
              className="text-white uppercase font-semibold"
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.5px'
              }}
            >
              {content.genre}
            </span>

            {/* Year */}
            <span 
              className="text-white uppercase font-semibold"
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.5px'
              }}
            >
              {content.year}
            </span>

            {/* Duration */}
            <span 
              className="text-white uppercase font-semibold"
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.5px'
              }}
            >
              {content.duration}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 mb-12">
            {/* Watch Now Button */}
            <button
              onClick={handleWatch}
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wide rounded-md transition-colors duration-200"
              style={{
                background: 'linear-gradient(-225deg, rgb(0, 55, 197), rgb(0, 100, 255))',
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
                fontSize: '16px',
                letterSpacing: '0.4px',
              }}
            >
              <PlayIcon className="w-3 h-4" />
              <span>Watch Now</span>
            </button>

            {/* My List Button */}
            <button
              onClick={handleToggleWatchlist}
              className="flex items-center gap-3 text-white font-semibold uppercase tracking-wide"
              style={{
                fontFamily: '"Proxima Nova SemiBold", sans-serif',
                fontSize: '16px',
                letterSpacing: '0.4px',
              }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition-colors duration-150">
                <PlusIcon className="w-6 h-6" />
              </div>
              <span>My List</span>
            </button>

            {/* Additional Info Section */}
            <div className="ml-8 text-white/70">
              <p className="text-sm uppercase tracking-wide font-semibold mb-2">Also Available</p>
              <div className="flex items-center gap-4 text-sm">
                <span>HD</span>
                <span>•</span>
                <span>4K UHD</span>
                <span>•</span>
                <span>Dolby Atmos</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p 
              className="text-white leading-relaxed"
              style={{
                fontFamily: '"Proxima Nova Regular", sans-serif',
                fontSize: '18px',
                lineHeight: '28px',
                maxWidth: '700px',
              }}
            >
              {content.description}
            </p>
          </div>

          {/* Cast */}
          <div>
            <p 
              className="text-white/90"
              style={{
                fontFamily: '"Proxima Nova Regular", sans-serif',
                fontSize: '16px',
                lineHeight: '24px',
                maxWidth: '700px',
              }}
            >
              <span className="text-white">Starring: </span>
              {content.starring.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;