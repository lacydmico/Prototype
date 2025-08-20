import React, { useState } from 'react';
import { X, Plus, Check, Star, Clock, Search } from 'lucide-react';
import { VideoContent } from '../../types';

interface AddToListPageProps {
  availableContent: VideoContent[];
  myListItems: string[];
  onAddToList: (contentId: string) => void;
  onClose: () => void;
}

const AddToListPage: React.FC<AddToListPageProps> = ({
  availableContent,
  myListItems,
  onAddToList,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);

  // Filter content based on search and category
  const filteredContent = availableContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique genres for filter
  const genres = ['all', ...Array.from(new Set(availableContent.map(content => content.genre)))];

  const handleAddToList = (contentId: string) => {
    onAddToList(contentId);
    setRecentlyAdded(prev => [...prev, contentId]);
    
    // Auto-close after adding if this completes the challenge
    if (!myListItems.length) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const isInList = (contentId: string) => myListItems.includes(contentId);
  const wasRecentlyAdded = (contentId: string) => recentlyAdded.includes(contentId);

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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">Add to My List</h1>
              <p className="text-white/70 text-lg">Save content to watch later and earn 100 points</p>
            </div>
          </div>

          {/* Challenge Info */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-purple-400 font-semibold text-lg mb-1">Challenge Reward</h3>
                <p className="text-white/80">Add any title to your "My List" for easy access</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-2xl">+100</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies and shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-gray-900">
                  {genre === 'all' ? 'All Categories' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-8">
          {filteredContent.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl font-semibold">
                  Available Content ({filteredContent.length})
                </h2>
                <span className="text-white/60">
                  {myListItems.length} items in your list
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContent.map((content) => (
                  <div
                    key={content.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={content.thumbnailUrl}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Add/Remove Button */}
                      <button
                        onClick={() => handleAddToList(content.id)}
                        disabled={isInList(content.id)}
                        className={`
                          absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                          ${isInList(content.id)
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : wasRecentlyAdded(content.id)
                            ? 'bg-green-500 text-white animate-pulse'
                            : 'bg-black/50 backdrop-blur-sm text-white hover:bg-purple-500'
                          }
                        `}
                      >
                        {isInList(content.id) || wasRecentlyAdded(content.id) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </button>
                      
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                          {content.title}
                        </h3>
                        <p className="text-white/70 text-sm">{content.genre}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {content.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {content.duration}
                        </span>
                        <span>{content.year}</span>
                      </div>
                      
                      <p className="text-white/80 text-sm line-clamp-2 mb-4">
                        {content.description}
                      </p>
                      
                      {isInList(content.id) ? (
                        <div className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          In My List
                        </div>
                      ) : wasRecentlyAdded(content.id) ? (
                        <div className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                          <Check className="w-4 h-4" />
                          Added! +100 Points
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToList(content.id)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add to My List
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">No Content Found</h3>
              <p className="text-white/60 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* My List Preview */}
        {myListItems.length > 0 && (
          <div className="border-t border-white/10 p-8">
            <h3 className="text-white text-lg font-semibold mb-4">
              My List ({myListItems.length} items)
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {myListItems.slice(0, 6).map(itemId => {
                const item = availableContent.find(c => c.id === itemId);
                if (!item) return null;
                
                return (
                  <div key={itemId} className="flex-shrink-0 w-32">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <p className="text-white/80 text-xs mt-1 line-clamp-1">{item.title}</p>
                  </div>
                );
              })}
              {myListItems.length > 6 && (
                <div className="flex-shrink-0 w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/60 text-sm">+{myListItems.length - 6} more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToListPage;