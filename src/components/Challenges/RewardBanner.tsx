import React, { useEffect, useState } from 'react';
import { RewardBannerProps } from '../../types/challenges';
import { Trophy, Gift, Lock, AlertCircle } from 'lucide-react';

const RewardBanner: React.FC<RewardBannerProps> = ({
  rewardStatus,
  points,
  userRank,
  visible,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      
      // Auto-close after 5 seconds for unlocked/claimed, 3 seconds for others
      const timeout = rewardStatus === 'unlocked' || rewardStatus === 'claimed' ? 5000 : 3000;
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [visible, rewardStatus, onClose]);

  if (!isVisible) return null;

  const getContent = () => {
    switch (rewardStatus) {
      case 'unlocked':
        return {
          icon: <Gift className="w-16 h-16 text-yellow-400" />,
          title: 'Reward Unlocked!',
          message: 'You\'ve earned a Free Month of Paramount+',
          subtitle: `Congratulations! You're user #${userRank} of 1,000`,
          bgColor: 'from-green-600 to-emerald-700',
          textColor: 'text-green-100',
        };
      
      case 'claimed':
        return {
          icon: <Trophy className="w-16 h-16 text-yellow-400" />,
          title: 'Free Month Applied!',
          message: 'Your reward has been applied to your account',
          subtitle: 'Enjoy your free month of premium content',
          bgColor: 'from-blue-600 to-purple-700',
          textColor: 'text-blue-100',
        };
      
      case 'cap_reached':
        return {
          icon: <Lock className="w-16 h-16 text-gray-400" />,
          title: 'Challenge Complete',
          message: 'Reward Cap Reached',
          subtitle: 'Stay tuned for next month\'s challenge!',
          bgColor: 'from-gray-600 to-gray-700',
          textColor: 'text-gray-300',
        };
      
      case 'shortfall':
        return {
          icon: <AlertCircle className="w-16 h-16 text-orange-400" />,
          title: `You earned ${points} Points`,
          message: 'Try again next month!',
          subtitle: 'You were close - keep watching to earn more points',
          bgColor: 'from-orange-600 to-red-600',
          textColor: 'text-orange-100',
        };
      
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div
        className={`
          relative max-w-2xl w-full bg-gradient-to-br ${content.bgColor}
          rounded-2xl p-12 text-center transform transition-all duration-500
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          border border-white/20 shadow-2xl
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            {content.icon}
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-4xl font-bold mb-4 ${content.textColor}`}>
          {content.title}
        </h1>

        {/* Message */}
        <p className={`text-xl mb-6 ${content.textColor}`}>
          {content.message}
        </p>

        {/* Subtitle */}
        <p className={`text-lg opacity-80 mb-8 ${content.textColor}`}>
          {content.subtitle}
        </p>

        {/* Points Display */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <div className="text-3xl font-bold text-white mb-2">
            {points} / 1,000 Points
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Sparkle Animation for Success States */}
        {(rewardStatus === 'unlocked' || rewardStatus === 'claimed') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${10 + (i * 7)}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardBanner;