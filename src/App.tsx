import React from 'react';
import { useState } from 'react';
import { TopNavigation } from './components/Navigation';
import { VideoCardWithHover, FavCard } from './components/VideoCard';
import { ListingPage } from './components/ListingPage';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoDetailsPage } from './components/VideoDetailsPage';
import { ChallengeHub, PointsTracker, PointsAnimation, RewardBanner, ChallengeCarousel, AttentionDrawer, ChallengeInstructionsModal } from './components/Challenges';
import { mockVideoContent } from './data/mockData';
import { useChallenges } from './hooks/useChallenges';
import { VideoContent } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'listing' | 'detail' | 'player'>('home');
  const [selectedContent, setSelectedContent] = useState(mockVideoContent[0]);
  const [listingData, setListingData] = useState<{ title: string; content: VideoContent[] }>({
    title: 'Movies',
    content: mockVideoContent
  });
  const [showChallengeHub, setShowChallengeHub] = useState(false);
  const [initialChallengeId, setInitialChallengeId] = useState<string | null>(null);
  const [showPointsTracker, setShowPointsTracker] = useState(false);
  const [hasScrolledFromTop, setHasScrolledFromTop] = useState(false);
  
  const {
    userProgress,
    completeChallenge,
    trackAction,
    resetProgress,
    showPointsAnimation,
    animationPoints,
    showRewardBanner,
    setShowRewardBanner,
    claimReward,
    simulateChallengePeriodEnd,
  } = useChallenges();

  // Make trackAction available globally for demo purposes
  React.useEffect(() => {
    (window as any).trackAction = trackAction;
    
    // Track scroll position for attention drawer
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setHasScrolledFromTop(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackAction]);

  const handleShowDetail = (id: string) => {
    const content = mockVideoContent.find(item => item.id === id);
    if (content) {
      setSelectedContent(content);
      setCurrentView('detail');
    }
  };

  const handleWatch = (id: string) => {
    const content = mockVideoContent.find(item => item.id === id);
    if (content) {
      setSelectedContent(content);
      setCurrentView('player');
    }
  };

  const handleShowListing = (title: string, content: VideoContent[]) => {
    setListingData({ title, content });
    setCurrentView('listing');
  };

  const handleToggleWatchlist = (id: string) => {
    // In a real app, this would update the backend
    const contentIndex = mockVideoContent.findIndex(item => item.id === id);
    if (contentIndex !== -1) {
      mockVideoContent[contentIndex].isInWatchlist = !mockVideoContent[contentIndex].isInWatchlist;
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleChallengeHubOpen = (challengeId?: string) => {
    setInitialChallengeId(challengeId || null);
    setShowChallengeHub(true);
  };

  const handleChallengeSelect = (challengeId: string) => {
    handleChallengeHubOpen(challengeId);
  };

  const handleShowPointsTracker = () => {
    setShowPointsTracker(true);
  };
  // Create different content sections
  const featuredContent = mockVideoContent.slice(0, 6);
  const newReleases = [...mockVideoContent].reverse().slice(0, 5);
  const myListContent = mockVideoContent.filter(content => content.isInWatchlist);

  // Render different views based on current state
  if (currentView === 'detail') {
    return (
      <div className="min-h-screen bg-black">
        <TopNavigation 
          userProgress={userProgress}
          onOpenChallengeHub={handleChallengeHubOpen}
        />
        <div className="absolute top-24 left-6 z-50">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-200 bg-black/50 backdrop-blur-sm px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>
        <VideoDetailsPage
          content={selectedContent}
          onWatch={handleWatch}
          onToggleWatchlist={handleToggleWatchlist}
          className="pt-20"
        />
        
        {/* Challenge Components */}
        <PointsTracker
          currentPoints={userProgress.totalPoints}
          goalPoints={userProgress.monthlyGoal}
          visible={showPointsTracker}
          onDismiss={() => setShowPointsTracker(false)}
        />
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
        
        {/* Challenge Components */}
        <PointsTracker
          currentPoints={userProgress.totalPoints}
          goalPoints={userProgress.monthlyGoal}
          visible={showPointsTracker}
          onDismiss={() => setShowPointsTracker(false)}
        />
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
      </div>
    );
  }

  if (currentView === 'player') {
    return (
      <div className="min-h-screen bg-black">
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-200 bg-black/50 backdrop-blur-sm px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>
        <VideoPlayer
          src={selectedContent.videoUrl}
          title={selectedContent.title}
          className="w-full h-screen"
        />
        
        {/* Challenge Components */}
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
        
        {/* Challenge Components */}
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
      </div>
    );
  }

  if (currentView === 'listing') {
    return (
      <div className="min-h-screen bg-black">
        <TopNavigation 
          userProgress={userProgress}
          onOpenChallengeHub={handleChallengeHubOpen}
        />
        <div className="absolute top-24 left-6 z-50">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-200 bg-black/50 backdrop-blur-sm px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>
        <ListingPage
          title={listingData.title}
          content={listingData.content}
          onShowDetail={handleShowDetail}
          onWatch={handleWatch}
          onToggleWatchlist={handleToggleWatchlist}
        />
        
        {/* Challenge Components */}
        <PointsTracker
          currentPoints={userProgress.totalPoints}
          goalPoints={userProgress.monthlyGoal}
          visible={showPointsTracker}
          onDismiss={() => setShowPointsTracker(false)}
        />
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
        
        {/* Challenge Components */}
        <PointsTracker
          currentPoints={userProgress.totalPoints}
          goalPoints={userProgress.monthlyGoal}
          visible={showPointsTracker}
          onDismiss={() => setShowPointsTracker(false)}
        />
        <PointsAnimation
          points={animationPoints}
          visible={showPointsAnimation}
          onComplete={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(18,18,18)]">
      <TopNavigation 
        userProgress={userProgress}
        onOpenChallengeHub={handleChallengeHubOpen}
      />
      
      {/* Hero Section */}
      <div className="pt-20 mb-16">
        
        <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
          {/* Hero Background */}
          <div className="absolute inset-0">
            <img
              src={featuredContent[0]?.thumbnailUrl}
              alt={featuredContent[0]?.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-16 pb-24">
            <div className="max-w-4xl">
              <h1 className="text-white font-bold text-6xl mb-6 leading-tight">
                {featuredContent[0]?.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-white/90 uppercase font-semibold text-sm tracking-wide">
                  {featuredContent[0]?.genre}
                </span>
                <span className="text-white/90 uppercase font-semibold text-sm tracking-wide">
                  {featuredContent[0]?.year}
                </span>
                <span className="text-white/90 uppercase font-semibold text-sm tracking-wide">
                  {featuredContent[0]?.duration}
                </span>
              </div>

              <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl">
                {featuredContent[0]?.description}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleShowDetail(featuredContent[0]?.id || '')}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold uppercase tracking-wide rounded-md transition-all duration-200"
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-1">
                    <path d="M5.004 3.003v14.001l12.003-7.002z" fill="currentColor" fillRule="evenodd" transform="translate(-5 -3)" />
                  </svg>
                  Watch Now
                </button>
                
                <button
                  onClick={() => handleToggleWatchlist(featuredContent[0]?.id || '')}
                  className="flex items-center gap-3 px-6 py-4 bg-black/20 backdrop-blur-sm border border-white/30 text-white font-semibold uppercase tracking-wide rounded-md hover:bg-black/30 transition-all duration-200"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path fill="currentColor" fillRule="evenodd" d="M13.252 4.247a1.25 1.25 0 1 0-2.5 0v6.5H4.248a1.25 1.25 0 0 0 0 2.5h6.504v6.506a1.25 1.25 0 0 0 2.5 0v-6.506h6.5a1.25 1.25 0 0 0 0-2.5h-6.5z" clipRule="evenodd" />
                  </svg>
                  My List
                </button>

                <button
                  onClick={() => handleShowListing('Featured Movies', featuredContent)}
                  className="text-white/80 hover:text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-200"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section with Challenge Card */}
      <div className="mb-16">
        <div className="px-16 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white text-2xl font-semibold uppercase tracking-wide mb-2">
                Earn Rewards While You Watch
              </h2>
              <p className="text-white/70 text-lg">
                Complete simple activities to unlock a free month of Paramount+ • First 1,000 users only
              </p>
            </div>
          </div>
          <ChallengeCarousel
            userProgress={userProgress}
            onOpenChallengeHub={handleChallengeHubOpen}
            onChallengeSelect={handleChallengeSelect}
            onChallengeComplete={completeChallenge}
            availableContent={mockVideoContent}
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-16 pb-16 space-y-16">
        {/* My List Section */}
        {myListContent.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
                My List
              </h2>
              <button
                onClick={() => handleShowListing('My List', myListContent)}
                className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
              >
                View All →
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {myListContent.map((content) => (
                <div key={content.id} className="flex-shrink-0">
                  <FavCard
                    content={content}
                    size="medium"
                    onWatch={handleShowDetail}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Movies Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
              Featured Movies
            </h2>
            <button
              onClick={() => handleShowListing('Featured Movies', featuredContent)}
              className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {featuredContent.map((content) => (
              <VideoCardWithHover
                key={content.id}
                content={content}
                size="medium"
                onWatch={handleShowDetail}
                onToggleWatchlist={handleToggleWatchlist}
              />
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
              New Releases
            </h2>
            <button
              onClick={() => handleShowListing('New Releases', newReleases)}
              className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            >
              View All →
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {newReleases.map((content) => (
              <div key={content.id} className="flex-shrink-0">
                <VideoCardWithHover
                  content={content}
                  size="medium"
                  onWatch={handleShowDetail}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Sci-Fi & Fantasy Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
              Sci-Fi & Fantasy
            </h2>
            <button
              onClick={() => handleShowListing('Sci-Fi & Fantasy', mockVideoContent.filter(content => content.genre === 'SCI-FI & FANTASY'))}
              className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            >
              View All →
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {mockVideoContent
              .filter(content => content.genre === 'SCI-FI & FANTASY')
              .map((content) => (
                <div key={content.id} className="flex-shrink-0">
                  <VideoCardWithHover
                    content={content}
                    size="medium"
                    onWatch={handleShowDetail}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </div>
              ))}
          </div>
        </section>

        {/* Action & Adventure Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
              Action & Adventure
            </h2>
            <button
              onClick={() => handleShowListing('Action & Adventure', mockVideoContent.filter(content => content.genre === 'ACTION & ADVENTURE'))}
              className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            >
              View All →
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {mockVideoContent
              .filter(content => content.genre === 'ACTION & ADVENTURE')
              .map((content) => (
                <div key={content.id} className="flex-shrink-0">
                  <VideoCardWithHover
                    content={content}
                    size="medium"
                    onWatch={handleShowDetail}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </div>
              ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">System Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                Connect
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Facebook</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Twitter</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 Paramount+. All rights reserved.
            </p>
            
            {/* Debug Controls */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleChallengeHubOpen}
                className="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-wide"
              >
                Open Challenge Hub
              </button>
              <button
                onClick={handleShowPointsTracker}
                className="text-green-400 hover:text-green-300 text-xs uppercase tracking-wide"
              >
                Show Points Tracker
              </button>
              <button
                onClick={resetProgress}
                className="text-red-400 hover:text-red-300 text-xs uppercase tracking-wide"
              >
                Reset Progress
              </button>
            </div>
            
            {/* Debug Controls */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleChallengeHubOpen}
                className="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-wide"
              >
                Challenge Hub
              </button>
              <button
                onClick={handleShowPointsTracker}
                className="text-green-400 hover:text-green-300 text-xs uppercase tracking-wide"
              >
                Points Tracker
              </button>
              <button
                onClick={resetProgress}
                className="text-red-400 hover:text-red-300 text-xs uppercase tracking-wide"
              >
                Reset
              </button>
              <button
                onClick={simulateChallengePeriodEnd}
                className="text-purple-400 hover:text-purple-300 text-xs uppercase tracking-wide"
              >
                End Period
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Challenge Hub Modal */}
      {showChallengeHub && (
        <ChallengeHub
          userProgress={userProgress}
          initialChallengeId={initialChallengeId}
          onChallengeComplete={completeChallenge}
          onClaimReward={claimReward}
          onClose={() => setShowChallengeHub(false)}
        />
      )}
      
      {/* Points Tracker */}
      <PointsTracker
        currentPoints={userProgress.totalPoints}
        goalPoints={userProgress.monthlyGoal}
        visible={showPointsTracker}
        onDismiss={() => setShowPointsTracker(false)}
      />
      
      {/* Points Animation */}
      <PointsAnimation
        points={animationPoints}
        visible={showPointsAnimation}
        onComplete={() => {}}
      />
      
      {/* Reward Banner */}
      <RewardBanner
        rewardStatus={userProgress.rewardStatus}
        points={userProgress.totalPoints}
        userRank={userProgress.userRank}
        visible={showRewardBanner}
        onClose={() => setShowRewardBanner(false)}
      />
      
      {/* Challenge Hub Modal */}
      {showChallengeHub && (
        <ChallengeHub
          userProgress={userProgress}
          initialChallengeId={initialChallengeId}
          onChallengeComplete={completeChallenge}
          onClaimReward={claimReward}
          onClose={() => setShowChallengeHub(false)}
        />
      )}
      
      {/* Points Tracker */}
      <PointsTracker
        currentPoints={userProgress.totalPoints}
        goalPoints={userProgress.monthlyGoal}
        visible={showPointsTracker}
        onDismiss={() => setShowPointsTracker(false)}
      />
      
      {/* Points Animation */}
      <PointsAnimation
        points={animationPoints}
        visible={showPointsAnimation}
        onComplete={() => {}}
      />
      
      {/* Reward Banner */}
      <RewardBanner
        rewardStatus={userProgress.rewardStatus}
        points={userProgress.totalPoints}
        userRank={userProgress.userRank}
        visible={showRewardBanner}
        onClose={() => setShowRewardBanner(false)}
      />
      
      {/* Attention Drawer - Floating Challenge Button */}
    </div>
  );
}

export default App;