import React from 'react';
import { CarouselChallengeCardProps } from '../../types/challenges';
import { Trophy, Star, Target } from 'lucide-react';

const CarouselChallengeCard: React.FC<CarouselChallengeCardProps> = ({
  userProgress,
  onOpenChallengeHub,
}) => {
  const progressPercentage = Math.min((userProgress.totalPoints / userProgress.monthlyGoal) * 100, 100);
  const activeChallenges = Object.values(userProgress.challenges).filter(c => c.status === 'available').length;

  const getStatusMessage = () => {
    switch (userProgress.rewardStatus) {
      case 'unlocked':
        return {
          title: 'Reward Unlocked!',
          subtitle: 'Claim your free month',
          color: 'from-green-500 to-emerald-600',
          icon: <Trophy className="w-8 h-8 text-yellow-400" />,
        };
      case 'claimed':
        return {
          title: 'Free Month Applied',
          subtitle: 'Enjoy your reward!',
          color: 'from-blue-500 to-purple-600',
          icon: <Star className="w-8 h-8 text-yellow-400" />,
        };
      case 'cap_reached':
        return {
          title: 'Challenge Complete',
          subtitle: 'Reward cap reached',
          color: 'from-gray-500 to-gray-600',
          icon: <Target className="w-8 h-8 text-gray-400" />,
        };
      case 'shortfall':
        return {
          title: `You earned ${userProgress.totalPoints} Points`,
          subtitle: 'Try again next month!',
          color: 'from-orange-500 to-red-500',
          icon: <Target className="w-8 h-8 text-orange-400" />,
        };
      default:
        return {
          title: 'Get a Free Month',
          subtitle: 'First 1,000 users only',
          color: 'from-purple-600 via-blue-600 to-green-500',
          icon: <Trophy className="w-8 h-8 text-yellow-400" />,
        };
    }
  };

  const status = getStatusMessage();

  return (
    <div
      onClick={onOpenChallengeHub}
      className={`
        relative bg-gradient-to-r ${status.color} rounded-2xl p-8 cursor-pointer 
        hover:scale-105 transition-all duration-300 overflow-hidden
        min-h-[200px] flex flex-col justify-between
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              {status.icon}
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-1">{status.title}</h2>
              <p className="text-white/90 text-lg">{status.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold text-lg">
              {userProgress.totalPoints} / 1,000 Points
            </span>
            <span className="text-white/80 text-sm">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Challenge Info */}
        <div className="flex items-center justify-between">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <span className="text-white font-semibold text-sm">
              {activeChallenges} Active Challenge{activeChallenges !== 1 ? 's' : ''}
            </span>
          </div>
          
          <button className="text-white/80 hover:text-white text-sm uppercase tracking-wide font-semibold transition-colors">
            {userProgress.rewardStatus === 'unlocked' ? 'Claim Reward' : 
             userProgress.rewardStatus === 'claimed' ? 'View Details' :
             userProgress.rewardStatus === 'cap_reached' || userProgress.rewardStatus === 'shortfall' ? 'View Results' :
             'Start Challenges'} →
          </button>
        </div>
      </div>

      {/* Reward Status Indicator */}
      {userProgress.rewardStatus === 'unlocked' && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
          REWARD READY!
        </div>
      )}
      
      {userProgress.rewardStatus === 'claimed' && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">
          ✓ CLAIMED
        </div>
      )}
    </div>
  );
};

export default CarouselChallengeCard;