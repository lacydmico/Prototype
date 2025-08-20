import React, { useState } from 'react';
import { X, Play, Star, Clock } from 'lucide-react';
import { VideoContent } from '../../types';

interface StartNewShowPageProps {
  availableShows: VideoContent[];
  startedShows: string[];
  onStartShow: (showId: string) => void;
  onClose: () => void;
}

const StartNewShowPage: React.FC<StartNewShowPageProps> = ({
  availableShows,
  startedShows,
  onStartShow,
  onClose,
}) => {
  const [selectedShow, setSelectedShow] = useState<VideoContent | null>(null);

  // Filter out shows that have already been started
  const newShows = availableShows.filter(show => !startedShows.includes(show.id));

  const handleStartShow = (show: VideoContent) => {
    onStartShow(show.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-8 pb-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">Start a New Show</h1>
              <p className="text-white/70 text-lg">Choose a show you haven't watched before to earn 100 points</p>
            </div>
          </div>

          {/* Challenge Info */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-green-400 font-semibold text-lg mb-1">Challenge Reward</h3>
                <p className="text-white/80">Choose a show you haven't watched before to earn 200 points</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-2xl">200</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {newShows.length > 0 ? (
            <>
              <h2 className="text-white text-xl font-semibold mb-6">
                Available New Shows ({newShows.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newShows.map((show) => (
                  <div
                    key={show.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/50 hover:bg-gradient-to-br hover:from-green-900/20 hover:to-blue-900/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedShow(show)}
                  >
                    <div className="relative">
                      <img
                        src={show.thumbnailUrl}
                        alt={show.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                          {show.title}
                        </h3>
                        <p className="text-white/70 text-sm">{show.genre}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {show.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {show.duration}
                        </span>
                        <span>{show.year}</span>
                      </div>
                      
                      <p className="text-white/80 text-sm line-clamp-2 mb-4">
                        {show.description}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartShow(show.id);
                          onClose();
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Watching
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">No New Shows Available</h3>
              <p className="text-white/60 mb-6">You've already started watching all available shows.</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Back to Challenge Hub
              </button>
            </div>
          )}
        </div>

        {/* Selected Show Modal */}
        {selectedShow && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full">
              <div className="relative">
                <img
                  src={selectedShow.thumbnailUrl}
                  alt={selectedShow.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-t-2xl" />
                <button
                  onClick={() => setSelectedShow(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-white text-2xl font-bold mb-2">{selectedShow.title}</h2>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span>{selectedShow.genre}</span>
                    <span>•</span>
                    <span>{selectedShow.year}</span>
                    <span>•</span>
                    <span>{selectedShow.rating}</span>
                    <span>•</span>
                    <span>{selectedShow.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {selectedShow.description}
                </p>
                
                <div className="mb-6">
                  <p className="text-white/70 text-sm mb-2">Starring:</p>
                  <p className="text-white">{selectedShow.starring.join(', ')}</p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onStartShow(selectedShow.id);
                      onClose();
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Watching & Earn 200 Points
                  </button>
                  <button
                    onClick={() => setSelectedShow(null)}
                    className="px-6 py-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartNewShowPage;