import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { UserProgress } from '../../types/challenges';

interface AttentionDrawerProps {
  userProgress: UserProgress;
  onOpenChallengeHub: () => void;
  visible: boolean;
}

const AttentionDrawer: React.FC<AttentionDrawerProps> = ({
  userProgress,
  onOpenChallengeHub,
  visible,
}) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (visible) {
      // Start subtle glow animation
      const glowInterval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 3000);

      // Occasional pulse for attention
      const pulseInterval = setInterval(() => {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 1000);
      }, 15000);

      return () => {
        clearInterval(glowInterval);
        clearInterval(pulseInterval);
      };
    }
  }, [visible]);

  if (!visible) return null;

  const activeChallenges = Object.values(userProgress.challenges).filter(c => c.status === 'available').length;
  const progressPercentage = Math.min((userProgress.totalPoints / userProgress.monthlyGoal) * 100, 100);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onOpenChallengeHub}
        className={`
          relative bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 
          text-white p-4 rounded-full shadow-2xl
          transition-all duration-500 ease-in-out
          hover:scale-110 hover:shadow-3xl
          ${isGlowing ? 'shadow-purple-500/50 shadow-2xl' : 'shadow-xl'}
          ${showPulse ? 'animate-pulse scale-110' : ''}
        `}
        style={{
          boxShadow: isGlowing 
            ? '0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 90px rgba(34, 197, 94, 0.3)'
            : '0 10px 25px rgba(0, 0, 0, 0.3)',
        }}
        aria-label="Open Challenge Hub"
      >
        {/* Floating sparkles */}
        <div className="absolute -top-2 -right-2">
          <Sparkles className={`w-4 h-4 text-yellow-400 ${isGlowing ? 'animate-spin' : ''}`} />
        </div>
        <div className="absolute -bottom-1 -left-1">
          <Sparkles className={`w-3 h-3 text-yellow-300 ${isGlowing ? 'animate-bounce' : ''}`} />
        </div>

        {/* Main icon */}
        <Trophy className="w-8 h-8" />

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeDasharray={`${progressPercentage * 2.83} 283`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Badge for active challenges */}
        {activeChallenges > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            {activeChallenges}
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {userProgress.totalPoints} / 1,000 Points
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default AttentionDrawer;