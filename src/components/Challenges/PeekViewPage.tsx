import React, { useState } from 'react';
import { X, Eye, Play, Info, Volume2, VolumeX } from 'lucide-react';
import { VideoContent } from '../../types';

interface PeekViewPageProps {
  availableContent: VideoContent[];
  onUsePeekView: (contentId: string) => void;
  onClose: () => void;
}

const PeekViewPage: React.FC<PeekViewPageProps> = ({
  availableContent,
  onUsePeekView,
  onClose,
}) => {
  const [selectedContent, setSelectedContent] = useState<VideoContent | null>(null);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [peekUsed, setPeekUsed] = useState(false);

  const handlePeekView = (content: VideoContent) => {
    setSelectedContent(content);
    setIsPeeking(true);
    setPeekUsed(true);
    onUsePeekView(content.id);
    
    // Auto-close peek after 10 seconds
    setTimeout(() => {
      setIsPeeking(false);
    }, 10000);
  };

  const closePeek = () => {
    setIsPeeking(false);
    setSelectedContent(null);
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
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">Try Peek View</h1>
              <p className="text-white/70 text-lg">Preview content with our new Peek View feature</p>
            </div>
          </div>

          {/* Challenge Info */}
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-cyan-400 font-semibold text-lg mb-1">Challenge Reward</h3>
                <p className="text-white/80">Use Peek View to preview any content</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-2xl">+250</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {!peekUsed ? (
            <>
              <div className="mb-8">
                <h2 className="text-white text-xl font-semibold mb-4">What is Peek View?</h2>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Quick Preview</h3>
                      <p className="text-white/70 text-sm">Get a 10-second preview of any movie or show</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Info className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Smart Details</h3>
                      <p className="text-white/70 text-sm">See key information and ratings instantly</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Seamless Watching</h3>
                      <p className="text-white/70 text-sm">Jump right into full playback if you like it</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-white text-xl font-semibold mb-6">
                Choose Content to Peek ({availableContent.length} available)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableContent.map((content) => (
                  <div
                    key={content.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-cyan-900/20 hover:to-blue-900/20 transition-all duration-300 cursor-pointer group"
                    onClick={() => handlePeekView(content)}
                  >
                    <div className="relative">
                      <img
                        src={content.thumbnailUrl}
                        alt={content.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Peek Button Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-cyan-500 text-white p-4 rounded-full">
                          <Eye className="w-8 h-8" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                          {content.title}
                        </h3>
                        <p className="text-white/70 text-sm">{content.genre}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        <span>{content.rating}</span>
                        <span>•</span>
                        <span>{content.year}</span>
                        <span>•</span>
                        <span>{content.duration}</span>
                      </div>
                      
                      <p className="text-white/80 text-sm line-clamp-2 mb-4">
                        {content.description}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePeekView(content);
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Peek View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-green-400 text-2xl font-bold mb-2">Challenge Complete!</h3>
              <p className="text-white/80 text-lg mb-6">You've successfully used Peek View and earned 250 points!</p>
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto mb-6">
                <div className="text-yellow-400 font-bold text-3xl mb-2">+250 Points</div>
                <p className="text-white/70">Added to your challenge progress</p>
              </div>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Back to Challenge Hub
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Peek View Modal */}
      {isPeeking && selectedContent && (
        <div className="fixed inset-0 bg-black z-60 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-3xl">
            {/* Close Button */}
            <button
              onClick={closePeek}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-6 left-6 z-10 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            {/* Video Preview */}
            <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
              {selectedContent.videoUrl ? (
                <video
                  src={selectedContent.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                />
              ) : (
                <img
                  src={selectedContent.thumbnailUrl}
                  alt={selectedContent.title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Content Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <div className="max-w-2xl">
                  <h2 className="text-white text-3xl font-bold mb-4">{selectedContent.title}</h2>
                  <div className="flex items-center gap-4 mb-4 text-white/80">
                    <span>{selectedContent.genre}</span>
                    <span>•</span>
                    <span>{selectedContent.year}</span>
                    <span>•</span>
                    <span>{selectedContent.rating}</span>
                    <span>•</span>
                    <span>{selectedContent.duration}</span>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-6 line-clamp-3">
                    {selectedContent.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Watch Now
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                      + My List
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-100"
                  style={{ 
                    width: `${((Date.now() % 10000) / 10000) * 100}%`,
                    animation: 'progress 10s linear forwards'
                  }}
                />
              </div>

              {/* Challenge Complete Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg animate-pulse">
                250 Points Earned!
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PeekViewPage;