import React from 'react';
import { VideoContent } from '../../types';
import { VideoCardWithHover } from '../VideoCard';

interface ListingPageProps {
  title: string;
  content: VideoContent[];
  onShowDetail?: (id: string) => void;
  onWatch?: (id: string) => void;
  onToggleWatchlist?: (id: string) => void;
  className?: string;
}

const ListingPage: React.FC<ListingPageProps> = ({
  title,
  content,
  onShowDetail,
  onWatch,
  onToggleWatchlist,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-[rgb(18,18,18)] pt-20 ${className}`}>
      {/* Header Section */}
      <div className="px-16 py-12">
        <h1 className="text-white text-4xl font-bold mb-2 uppercase tracking-wide">
          {title}
        </h1>
        <p className="text-white/70 text-lg">
          {content.length} {content.length === 1 ? 'title' : 'titles'} available
        </p>
      </div>

      {/* Content Grid */}
      <div className="px-16 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {content.map((item) => (
            <VideoCardWithHover
              key={item.id}
              content={item}
              size="medium"
              onWatch={onShowDetail}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>

        {/* Empty State */}
        {content.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/50 text-xl mb-4">No content available</div>
            <p className="text-white/30">Check back later for new additions</p>
          </div>
        )}
      </div>

      {/* Additional Info Section */}
      <div className="px-16 pb-16">
        <div className="bg-black/30 rounded-lg p-8">
          <h2 className="text-white text-2xl font-semibold mb-4 uppercase tracking-wide">
            About {title}
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-4xl">
            {title === 'Movies' && 
              'Discover blockbuster movies, indie films, and exclusive Paramount+ originals. From action-packed adventures to heartwarming dramas, find your next favorite film.'
            }
            {title === 'Sci-Fi & Fantasy' && 
              'Explore otherworldly adventures, futuristic tales, and magical realms. Dive into stories that push the boundaries of imagination and take you to places beyond reality.'
            }
            {title === 'Action & Adventure' && 
              'Get your adrenaline pumping with high-octane action sequences, thrilling adventures, and edge-of-your-seat excitement. Perfect for when you need an action-packed escape.'
            }
            {title === 'My List' && 
              'Your personal collection of saved content. Add movies and shows you want to watch later, and they\'ll appear here for easy access anytime.'
            }
            {!['Movies', 'Sci-Fi & Fantasy', 'Action & Adventure', 'My List'].includes(title) &&
              'Explore our curated collection of premium content, featuring the best in entertainment from Paramount+ and our partner studios.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;