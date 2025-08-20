import React, { useState } from 'react';
import { X, Trophy, Play, CheckCircle, Clock, Star } from 'lucide-react';
import { VideoContent } from '../../types';

interface CompleteSeriesPageProps {
  availableSeries: VideoContent[];
  completedSeries: string[];
  onCompleteSeries: (seriesId: string) => void;
  onClose: () => void;
}

const CompleteSeriesPage: React.FC<CompleteSeriesPageProps> = ({
  availableSeries,
  completedSeries,
  onCompleteSeries,
  onClose,
}) => {
  const [selectedSeries, setSelectedSeries] = useState<VideoContent | null>(null);
  const [simulatedProgress, setSimulatedProgress] = useState<Record<string, number>>({});

  // Filter to only show series (not movies)
  const seriesOnly = availableSeries.filter(content => 
    content.genre !== 'MOVIE' && !completedSeries.includes(content.id)
  );

  const handleStartWatching = (series: VideoContent) => {
    // Simulate watching progress
    const currentProgress = simulatedProgress[series.id] || 0;
    const newProgress = Math.min(currentProgress + 25, 100);
    
    setSimulatedProgress(prev => ({
      ...prev,
      [series.id]: newProgress
    }));

    if (newProgress >= 90) {
      // Complete the series
      setTimeout(() => {
        onCompleteSeries(series.id);
      }, 1000);
    }
  };

  const getProgressText = (seriesId: string) => {
    const progress = simulatedProgress[seriesId] || 0;
    if (progress === 0) return 'Not Started';
    if (progress < 90) return `${progress}% Complete`;
    return 'Ready to Complete!';
  };

  const getProgressColor = (seriesId: string) => {
    const progress = simulatedProgress[seriesId] || 0;
    if (progress === 0) return 'text-white/60';
    if (progress < 90) return 'text-blue-400';
    return 'text-green-400';
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
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">Complete a Series</h1>
              <p className="text-white/70 text-lg">Watch 90% of episodes and finish the final episode</p>
            </div>
          </div>

          {/* Challenge Info */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-yellow-400 font-semibold text-lg mb-1">Challenge Reward</h3>
                <p className="text-white/80">Complete any series to earn the highest point reward</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-2xl">+300</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {seriesOnly.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-white text-xl font-semibold mb-4">How It Works</h2>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Start Watching</h3>
                      <p className="text-white/70 text-sm">Begin any series and track your progress</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Watch 90%</h3>
                      <p className="text-white/70 text-sm">Complete at least 90% of all episodes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Finish Series</h3>
                      <p className="text-white/70 text-sm">Watch the final episode to complete</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-white text-xl font-semibold mb-6">
                Available Series ({seriesOnly.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesOnly.map((series) => {
                  const progress = simulatedProgress[series.id] || 0;
                  const canComplete = progress >= 90;
                  
                  return (
                    <div
                      key={series.id}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/50 hover:bg-gradient-to-br hover:from-yellow-900/20 hover:to-orange-900/20 transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={series.thumbnailUrl}
                          alt={series.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Progress Indicator */}
                        {progress > 0 && (
                          <div className="absolute top-3 left-3 right-3">
                            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    canComplete ? 'bg-green-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                            {series.title}
                          </h3>
                          <p className="text-white/70 text-sm">{series.genre}</p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {series.rating}
                          </span>
                          <span>{series.year}</span>
                          <span>Multiple Episodes</span>
                        </div>
                        
                        <p className="text-white/80 text-sm line-clamp-2 mb-4">
                          {series.description}
                        </p>
                        
                        {/* Progress Status */}
                        <div className={`text-sm font-semibold mb-4 ${getProgressColor(series.id)}`}>
                          {getProgressText(series.id)}
                        </div>
                        
                        {canComplete ? (
                          <button
                            onClick={() => handleStartWatching(series)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Trophy className="w-4 h-4" />
                            Complete Series (+300 Points)
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartWatching(series)}
                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            {progress === 0 ? 'Start Watching' : 'Continue Watching'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">All Series Completed</h3>
              <p className="text-white/60 mb-6">You've completed all available series. Great job!</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Back to Challenge Hub
              </button>
            </div>
          )}
        </div>

        {/* Completed Series Preview */}
        {completedSeries.length > 0 && (
          <div className="border-t border-white/10 p-8">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Completed Series ({completedSeries.length})
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {completedSeries.slice(0, 6).map(seriesId => {
                const series = availableSeries.find(c => c.id === seriesId);
                if (!series) return null;
                
                return (
                  <div key={seriesId} className="flex-shrink-0 w-32 relative">
                    <img
                      src={series.thumbnailUrl}
                      alt={series.title}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-white/80 text-xs mt-1 line-clamp-1">{series.title}</p>
                  </div>
                );
              })}
              {completedSeries.length > 6 && (
                <div className="flex-shrink-0 w-32 h-20 bg-green-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">+{completedSeries.length - 6} more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteSeriesPage;