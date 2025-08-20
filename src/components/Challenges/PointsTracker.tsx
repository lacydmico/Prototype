import React, { useEffect, useState } from 'react';
import { PointsTrackerProps } from '../../types/challenges';

const PointsTracker: React.FC<PointsTrackerProps> = ({
  currentPoints,
  goalPoints,
  visible,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!isVisible) return null;

  const progressPercentage = Math.min((currentPoints / goalPoints) * 100, 100);

  return (
    <div
      className={`
        fixed top-24 right-6 z-50 bg-black/90 backdrop-blur-sm
        border border-white/20 rounded-lg p-4 min-w-[200px]
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold text-sm uppercase tracking-wide">
          Challenge Progress
        </span>
        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className="text-white/60 hover:text-white text-sm"
        >
          ×
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/80 text-sm">
          {currentPoints} / {goalPoints}
        </span>
        <span className="text-blue-400 text-sm font-semibold">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {currentPoints >= goalPoints && (
        <div className="mt-2 text-green-400 text-xs font-semibold uppercase tracking-wide">
          Goal Achieved! 🎉
        </div>
      )}
    </div>
  );
};

export default PointsTracker;