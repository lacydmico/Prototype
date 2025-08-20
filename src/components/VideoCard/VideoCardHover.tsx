import React, { useState } from 'react';
import { VideoCardProps } from '../../types';
import ActionButton from '../ui/ActionButton';
import PlayIcon from '../ui/PlayIcon';
import PlusIcon from '../ui/PlusIcon';
import Tooltip from '../ui/Tooltip';
import MetadataDisplay from './MetadataDisplay';

const VideoCardHover: React.FC<VideoCardProps> = ({
  content,
  onWatch,
  onToggleWatchlist,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <a
      href={`/movies/video/${content.id}/`}
      className={`
        block absolute text-white no-underline bg-black
        shadow-[0_5px_20px_0_rgba(0,0,0,0.75)]
        transition-all duration-300 cubic-bezier(0.165,0.84,0.44,1)
        z-[100005] overflow-hidden rounded-lg
        ${isHovered ? 'scale-105' : 'scale-100'}
        ${className}
      `}
      style={{
        width: '513.672px',
        height: '508.359px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        handleWatch();
      }}
    >
      {/* Video/Image Section */}
      <div className="relative z-[1] min-h-[288.584px]">
        <div className="bg-black h-[289.359px] min-h-[100px] overflow-hidden relative w-full">
          {/* Video Player Container */}
          <div className="box-border h-full absolute w-full z-[1]">
            <div className="box-border block h-full relative w-full z-[3] bg-black overflow-hidden p-0 m-0">
              <div className="box-border absolute w-full h-full overflow-hidden p-0 m-0">
                {content.videoUrl ? (
                  <video
                    src={content.videoUrl}
                    className="box-border h-full w-full bg-black"
                    playsInline
                    muted
                    autoPlay={isHovered}
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-white/50">Video Preview</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Image */}
          <div className="box-border relative transition-all duration-300 ease-in-out z-[2]">
            <img
              src={content.thumbnailUrl}
              alt={content.title}
              className="max-w-full transition-all duration-300 ease-in-out box-border block h-[289.359px] object-cover w-full"
            />
          </div>

          {/* Gradient Overlay */}
          <div
            className="box-border absolute bottom-0 w-full z-[3] pointer-events-none"
            style={{
              background: 'linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0))',
              height: '144.672px',
            }}
          />

          {/* Title Overlay */}
          <div
            className={`
              box-border flex items-end absolute bottom-0 text-white
              font-semibold text-xl gap-6 h-[120px] justify-between
              leading-6 pointer-events-none w-full z-[4] p-6
              transition-all duration-300 ease-in-out
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <p className="box-border line-clamp-2 overflow-hidden text-ellipsis m-0">
              {content.title}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between items-start bg-black pointer-events-none relative transition-all duration-300 cubic-bezier(0.165,0.84,0.44,1) w-full z-[10] p-6 pb-6">
        <MetadataDisplay
          genre={content.genre}
          year={content.year}
          rating={content.rating}
          duration={content.duration}
          starring={content.starring}
          description={content.description}
        />

        {/* Action Buttons */}
        <div className="w-full">
          <div className="inline-flex h-[46px] mb-0 pointer-events-auto w-full mt-4">
            <ActionButton
              variant="primary"
              onClick={handleWatch}
              ariaLabel="WATCH NOW"
              className="flex-grow mr-4"
            >
              <PlayIcon className="w-2 h-3.5 mr-2" />
              <span className="overflow-hidden text-ellipsis line-clamp-1 break-all">
                WATCH NOW
              </span>
            </ActionButton>

            <div className="flex">
              <Tooltip content={content.isInWatchlist ? "Remove from My List" : "Add to My List"}>
                <ActionButton
                  variant="secondary"
                  onClick={handleToggleWatchlist}
                  ariaLabel="My List Toggle"
                  className="relative"
                >
                  <PlusIcon className="w-6 h-6" />
                </ActionButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCardHover;