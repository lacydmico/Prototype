import React from 'react';
import { Trophy, Star, Play, Plus, Eye, CheckCircle } from 'lucide-react';
import { UserProgress } from '../../types/challenges';
import { VideoContent } from '../../types';

interface ChallengeCarouselProps {
  userProgress: UserProgress;
  onOpenChallengeHub: () => void;
  onChallengeSelect: (challengeId: string) => void;
  onChallengeComplete: (challengeId: string, points: number) => void;
  availableContent: VideoContent[];
}

const ChallengeCarousel: React.FC<ChallengeCarouselProps> = ({
  userProgress,
  onOpenChallengeHub,
  onChallengeSelect,
  onChallengeComplete,
  availableContent,
}) => {
  const progressPercentage = Math.min((userProgress.totalPoints / userProgress.monthlyGoal) * 100, 100);
  const activeChallenges = Object.values(userProgress.challenges).filter(c => c.status === 'available');
  const completedChallenges = Object.values(userProgress.challenges).filter(c => c.status === 'completed');

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

  const getRewardStatus = () => {
    switch (userProgress.rewardStatus) {
      case 'unlocked':
        return {
          title: 'Free Month Unlocked!',
          subtitle: 'You\'re in the first 1,000 users',
          color: 'from-green-500 to-emerald-600',
          textColor: 'text-green-100',
        };
      case 'claimed':
        return {
          title: 'Free Month Applied',
          subtitle: 'Enjoy your reward!',
          color: 'from-blue-500 to-purple-600',
          textColor: 'text-blue-100',
        };
      case 'cap_reached':
        return {
          title: 'Challenge Complete',
          subtitle: 'Reward cap reached',
          color: 'from-gray-500 to-gray-600',
          textColor: 'text-gray-300',
        };
      case 'shortfall':
        return {
          title: `${userProgress.totalPoints} Points Earned`,
          subtitle: 'Try again next month!',
          color: 'from-orange-500 to-red-500',
          textColor: 'text-orange-100',
        };
      default:
        return {
          title: 'Earn a Free Month',
          subtitle: 'Complete challenges to unlock rewards',
          color: 'from-purple-600 via-blue-600 to-green-500',
          textColor: 'text-white',
        };
    }
  };

  const rewardStatus = getRewardStatus();

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {/* Main Reward Progress Card */}
      <div className="flex-shrink-0 w-80">
        <div
          className={`
            relative bg-transparent p-6 h-64
            cursor-pointer hover:scale-105 
            transition-all duration-300 overflow-hidden
          `}
          onClick={onOpenChallengeHub}
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Challenge Hub
                  </h3>
                  <p className="text-sm text-white/70">View all challenges & rewards</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">
                    {userProgress.totalPoints} / 1,000 Points
                  </span>
                  <span className="text-sm text-white/80">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="bg-white/10 rounded-lg px-3 py-1">
                <span className="text-sm font-semibold text-white/80">
                  {activeChallenges.length} Active
                </span>
              </div>
              <span className="text-sm font-semibold text-white/70">
                View All →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Challenge Cards */}
      {activeChallenges.map(challenge => (
        <div key={challenge.id} className="flex-shrink-0 w-80">
          <div
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6 h-64 cursor-pointer hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300"
            onClick={() => onChallengeSelect(challenge.id)}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {getChallengeIcon(challenge.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{challenge.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 font-bold">{challenge.points}</span>
                      <span className="text-white/60 text-sm">Points</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {challenge.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-blue-400 text-sm font-semibold uppercase tracking-wide">
                  {challenge.type === 'trivia' ? 'Answer Now' : 'Start Now'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Completed Challenges Summary (if any) */}
      {completedChallenges.length > 0 && (
        <div className="flex-shrink-0 w-80">
          <div
            className="bg-gradient-to-br from-green-800/80 to-green-900/80 border border-green-500/30 rounded-2xl p-6 h-64 cursor-pointer hover:border-green-400/50 transition-all duration-300"
            onClick={onOpenChallengeHub}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-green-100 font-semibold text-lg">Completed Challenges</h3>
                    <p className="text-green-200/80 text-sm">Great progress!</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {completedChallenges.slice(0, 3).map(challenge => (
                    <div key={challenge.id} className="flex items-center justify-between bg-green-900/30 rounded-lg p-2">
                      <span className="text-green-100 text-sm">{challenge.title}</span>
                      <span className="text-yellow-400 text-sm font-bold">{challenge.points}</span>
                    </div>
                  ))}
                  {completedChallenges.length > 3 && (
                    <div className="text-green-200/60 text-sm text-center">
                      +{completedChallenges.length - 3} more completed
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-green-300 text-sm font-semibold uppercase tracking-wide">
                View All →
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCarousel;