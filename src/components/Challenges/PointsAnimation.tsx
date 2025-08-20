import React, { useEffect, useState } from 'react';
import { PointsAnimationProps } from '../../types/challenges';

const PointsAnimation: React.FC<PointsAnimationProps> = ({
  points,
  visible,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setTimeout(() => setAnimate(true), 100);
      
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 300);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <div
        className={`
          bg-gradient-to-r from-green-500 to-green-600 text-white
          px-8 py-4 rounded-full shadow-2xl border-2 border-green-400
          font-bold text-2xl tracking-wide
          transition-all duration-500 ease-out
          ${animate 
            ? 'opacity-100 scale-110 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-8'
          }
        `}
      >
        {points} Points Earned!
      </div>
      
      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 bg-yellow-400 rounded-full
              transition-all duration-1000 ease-out
              ${animate ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              left: `${45 + Math.random() * 10}%`,
              top: `${45 + Math.random() * 10}%`,
              transform: animate 
                ? `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`
                : 'translate(0, 0) scale(1)',
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PointsAnimation;