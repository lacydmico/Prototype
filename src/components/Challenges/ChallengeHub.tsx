import React, { useState } from 'react';
import { useEffect } from 'react';
import { X, Trophy, Star, Play, Plus, Eye, Gift, Lock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ChallengeHubProps } from '../../types/challenges';
import TriviaModal from './TriviaModal';
import StartNewShowPage from './StartNewShowPage';
import AddToListPage from './AddToListPage';
import PeekViewPage from './PeekViewPage';
import CompleteSeriesPage from './CompleteSeriesPage';
import { mockVideoContent } from '../../data/mockData';

const ChallengeHub: React.FC<ChallengeHubProps> = ({
  userProgress,
  initialChallengeId,
  onChallengeComplete,
  onClaimReward,
  onClose,
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showTriviaModal, setShowTriviaModal] = useState(false);
  const [showStartNewShowPage, setShowStartNewShowPage] = useState(false);
  const [showAddToListPage, setShowAddToListPage] = useState(false);
  const [showPeekViewPage, setShowPeekViewPage] = useState(false);
  const [showCompleteSeriesPage, setShowCompleteSeriesPage] = useState(false);

  // Debug logging to check points
  console.log('Challenge Hub - Current Points:', userProgress.totalPoints);
  console.log('Challenge Hub - Monthly Goal:', userProgress.monthlyGoal);
  console.log('Challenge Hub - Challenges:', userProgress.challenges);

  useEffect(() => {
    if (initialChallengeId) {
      handleChallengeClick(initialChallengeId);
    }
  }, [initialChallengeId, userProgress]);

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'trivia':
        return <Star className="w-6 h-6" />;
      case 'watching':
        return <Play className="w-6 h-6" />;
      case 'list':
        return <Plus className="w-6 h-6" />;
      case 'peek':
        return <Eye className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  const handleChallengeClick = (challengeId: string) => {
    const challenge = userProgress.challenges[challengeId];
    
    if (!challenge || challenge.status !== 'available') return;
    
    switch (challengeId) {
      case 'weekly-trivia':
        setShowTriviaModal(true);
        break;
      case 'start-new-show':
        setShowStartNewShowPage(true);
        break;
      case 'complete-series':
        setShowCompleteSeriesPage(true);
        break;
      case 'add-to-list':
        setShowAddToListPage(true);
        break;
      case 'try-peek-view':
        setShowPeekViewPage(true);
        break;
      default:
        console.log('Unknown challenge:', challengeId);
    }
  };

  const progressPercentage = Math.min((userProgress.totalPoints / userProgress.monthlyGoal) * 100, 100);
  const challengeArray = Object.values(userProgress.challenges);

  // Calculate expected total points from completed challenges
  const expectedPoints = challengeArray.reduce((total, challenge) => {
    return total + (challenge.status === 'completed' ? challenge.points : 0);
  }, 0);

  console.log('Challenge Hub Debug:', {
    displayedPoints: userProgress.totalPoints,
    expectedPoints,
    completedChallenges: challengeArray.filter(c => c.status === 'completed').length,
    progressPercentage
  });
  const getRewardDisplay = () => {
    switch (userProgress.rewardStatus) {
      case 'unlocked':
        return {
          icon: <Gift className="w-12 h-12 text-yellow-400" />,
          title: 'Reward Unlocked!',
          subtitle: 'Click to claim your free month',
          bgColor: 'from-green-600 to-emerald-700',
          clickable: true,
        };
      case 'claimed':
        return {
          icon: <Trophy className="w-12 h-12 text-yellow-400" />,
          title: 'Free Month Applied',
          subtitle: 'Reward has been added to your account',
          bgColor: 'from-blue-600 to-purple-700',
          clickable: false,
        };
      case 'cap_reached':
        return {
          icon: <Lock className="w-12 h-12 text-gray-400" />,
          title: 'Reward Cap Reached',
          subtitle: 'Stay tuned for next month\'s challenge',
          bgColor: 'from-gray-600 to-gray-700',
          clickable: false,
        };
      case 'shortfall':
        return {
          icon: <Lock className="w-12 h-12 text-gray-400" />,
          title: 'Reward Locked',
          subtitle: `You earned ${userProgress.totalPoints} points - try again next month!`,
          bgColor: 'from-gray-600 to-gray-700',
          clickable: false,
        };
      default:
        return null;
    }
  };

  const rewardDisplay = getRewardDisplay();

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative p-8 pb-6">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold mb-2">Challenge Hub</h1>
                <p className="text-white/70 text-lg">Earn 1,000 Points this month</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">How It Works</span>
                  {showHowItWorks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* How It Works Section */}
            {showHowItWorks && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-6 animate-in slide-in-from-top duration-300">
                <h3 className="text-blue-400 font-semibold text-xl mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  How the Challenge Program Works
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">🎯 Monthly Goal</h4>
                    <ul className="text-white/80 space-y-2 text-sm">
                      <li>• Earn 1,000 points each month to unlock rewards</li>
                      <li>• Points reset at the beginning of each month</li>
                      <li>• Track your progress in real-time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">🏆 Exclusive Rewards</h4>
                    <ul className="text-white/80 space-y-2 text-sm">
                      <li>• First 1,000 users to reach the goal get a free month</li>
                      <li>• Rewards are applied automatically to your account</li>
                      <li>• New rewards available each month</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-blue-500/20 pt-4">
                  <h4 className="text-white font-semibold mb-3">📋 Challenge Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-purple-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-medium text-sm">Trivia</span>
                      </div>
                      <p className="text-white/70 text-xs">Answer weekly questions about your favorite shows</p>
                    </div>
                    
                    <div className="bg-green-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium text-sm">Watching</span>
                      </div>
                      <p className="text-white/70 text-xs">Start new shows or complete series</p>
                    </div>
                    
                    <div className="bg-blue-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium text-sm">My List</span>
                      </div>
                      <p className="text-white/70 text-xs">Save content for later viewing</p>
                    </div>
                    
                    <div className="bg-cyan-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span className="text-white font-medium text-sm">Features</span>
                      </div>
                      <p className="text-white/70 text-xs">Try new platform features like Peek View</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Important Notes</h5>
                      <ul className="text-yellow-200/80 text-xs space-y-1">
                        <li>• Some challenges can only be completed once per month</li>
                        <li>• Trivia questions reset weekly for multiple attempts</li>
                        <li>• Points are awarded instantly upon completion</li>
                        <li>• Rewards are limited and awarded on a first-come, first-served basis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Section */}
            <div className="bg-black/40 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">Monthly Goal</h2>
                <span className="text-blue-400 text-lg font-bold">
                  {userProgress.totalPoints} / {userProgress.monthlyGoal} Points
                </span>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              <p className="text-white/60 text-sm">
                {progressPercentage >= 100 
                  ? "🎉 Congratulations! You've reached your monthly goal!" 
                  : `${Math.round(progressPercentage)}% complete - Keep going!`
                }
              </p>
              
              {/* Debug info */}
              <p className="text-yellow-400 text-xs mt-2 space-y-1">
                <div>Debug: Displayed={userProgress.totalPoints}, Expected={expectedPoints}</div>
                <div>Completed: {challengeArray.filter(c => c.status === 'completed').length}/5 challenges</div>
                <div>Progress: {Math.round(progressPercentage)}%</div>
              </p>
            </div>

            {/* Reward Section */}
            {rewardDisplay && (
              <div 
                className={`
                  bg-gradient-to-r ${rewardDisplay.bgColor} rounded-xl p-6 mb-6
                  ${rewardDisplay.clickable ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}
                `}
                onClick={rewardDisplay.clickable ? onClaimReward : undefined}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {rewardDisplay.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-bold mb-1">{rewardDisplay.title}</h3>
                    <p className="text-white/90">{rewardDisplay.subtitle}</p>
                    {userProgress.userRank && userProgress.rewardStatus === 'unlocked' && (
                      <p className="text-white/70 text-sm mt-1">
                        You're user #{userProgress.userRank} of 1,000
                      </p>
                    )}
                  </div>
                  {rewardDisplay.clickable && (
                    <div className="text-white/80 text-sm uppercase tracking-wide font-semibold">
                      Claim Now →
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Challenges Grid */}
          <div className="px-8 pb-8">
            <h3 className="text-white text-xl font-semibold mb-6">Active Challenges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challengeArray.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`
                    relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                    border border-white/10 rounded-xl p-6 transition-all duration-300
                    ${challenge.status === 'available' 
                      ? 'hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-blue-900/20 hover:to-purple-900/20 cursor-pointer' 
                      : 'opacity-60'
                    }
                  `}
                  onClick={() => handleChallengeClick(challenge.id)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {challenge.status === 'completed' && (
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        ✓ COMPLETED
                      </div>
                    )}
                    {challenge.status === 'locked' && (
                      <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        🔒 LOCKED
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${challenge.status === 'completed' 
                        ? 'bg-green-500' 
                        : challenge.status === 'available'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-gray-600'
                      }
                    `}>
                      {getChallengeIcon(challenge.type)}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {challenge.title}
                      </h4>
                      <p className="text-white/70 text-sm mb-3 leading-relaxed">
                        {challenge.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold text-lg">
                            {challenge.points}
                          </span>
                          <span className="text-white/60 text-sm">Points</span>
                        </div>
                        
                        {challenge.status === 'available' && (
                          <div className="text-blue-400 text-sm font-semibold uppercase tracking-wide">
                            {challenge.type === 'trivia' ? 'Answer Now' : 'Start Challenge'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trivia Modal */}
      {showTriviaModal && (
        <TriviaModal
          onClose={() => setShowTriviaModal(false)}
          onComplete={(points) => {
            onChallengeComplete('weekly-trivia', points);
            setShowTriviaModal(false);
          }}
        />
      )}

      {/* Challenge Pages */}
      {showStartNewShowPage && (
        <StartNewShowPage
          availableShows={mockVideoContent}
          startedShows={userProgress.startedShows}
          onStartShow={(showId) => {
            onChallengeComplete('start-new-show', 200);
            setShowStartNewShowPage(false);
          }}
          onClose={() => setShowStartNewShowPage(false)}
        />
      )}

      {showAddToListPage && (
        <AddToListPage
          availableContent={mockVideoContent}
          myListItems={userProgress.myListItems}
          onAddToList={(contentId) => {
            onChallengeComplete('add-to-list', 100);
            setShowAddToListPage(false);
          }}
          onClose={() => setShowAddToListPage(false)}
        />
      )}

      {showPeekViewPage && (
        <PeekViewPage
          availableContent={mockVideoContent}
          onUsePeekView={(contentId) => {
            onChallengeComplete('try-peek-view', 250);
            setShowPeekViewPage(false);
          }}
          onClose={() => setShowPeekViewPage(false)}
        />
      )}

      {showCompleteSeriesPage && (
        <CompleteSeriesPage
          availableSeries={mockVideoContent}
          completedSeries={userProgress.completedSeries}
          onCompleteSeries={(seriesId) => {
            onChallengeComplete('complete-series', 300);
            setShowCompleteSeriesPage(false);
          }}
          onClose={() => setShowCompleteSeriesPage(false)}
        />
      )}
    </>
  );
};

export default ChallengeHub;