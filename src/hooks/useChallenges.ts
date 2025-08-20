import { useState, useEffect } from 'react';
import { UserProgress, Challenge } from '../types/challenges';
import { defaultChallenges } from '../data/challengeData';

const STORAGE_KEY = 'paramount-challenges-progress';

const getInitialProgress = (): UserProgress => {
  // Always start fresh for demo purposes - no localStorage persistence
  // const stored = localStorage.getItem(STORAGE_KEY);
  
  const challengesMap: Record<string, Challenge> = {};
  defaultChallenges.forEach(challenge => {
    challengesMap[challenge.id] = { ...challenge };
  });
  
  return {
    totalPoints: 0,
    monthlyGoal: 1000,
    rewardStatus: 'none',
    challenges: challengesMap,
    completedActions: [],
    startedShows: [],
    completedSeries: [],
    myListItems: [],
    peekViewUsed: false,
  };
};

export const useChallenges = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [animationPoints, setAnimationPoints] = useState(0);
  const [showRewardBanner, setShowRewardBanner] = useState(false);

  // Save to localStorage whenever progress changes
  // Disabled for demo - no persistence
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  // }, [userProgress]);

  // Check for reward unlock when points change
  useEffect(() => {
    if (userProgress.totalPoints >= 1000 && userProgress.rewardStatus === 'none') {
      // Simulate checking if user is in first 1000
      const userRank = Math.floor(Math.random() * 1200) + 1; // Random rank for demo
      
      setUserProgress(prev => ({
        ...prev,
        userRank,
        rewardStatus: userRank <= 1000 ? 'unlocked' : 'cap_reached'
      }));
      
      setShowRewardBanner(true);
    }
  }, [userProgress.totalPoints, userProgress.rewardStatus]);

  // Check for weekly trivia reset
  useEffect(() => {
    const checkTriviaReset = () => {
      const now = new Date();
      const lastCompleted = userProgress.lastTriviaCompleted;
      
      if (lastCompleted) {
        const weeksSinceCompleted = Math.floor((now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24 * 7));
        if (weeksSinceCompleted >= 1) {
          setUserProgress(prev => ({
            ...prev,
            challenges: {
              ...prev.challenges,
              'weekly-trivia': {
                ...prev.challenges['weekly-trivia'],
                status: 'available'
              }
            }
          }));
        }
      }
    };

    checkTriviaReset();
  }, [userProgress.lastTriviaCompleted]);

  const completeChallenge = (challengeId: string, points: number) => {
    console.log(`Completing challenge ${challengeId} with ${points} points`);
    
    setUserProgress(prev => {
      console.log('Previous total points:', prev.totalPoints);
      const updatedChallenges = { ...prev.challenges };
      const challenge = updatedChallenges[challengeId];
      
      if (challenge && challenge.status === 'available') {
        updatedChallenges[challengeId] = {
          ...challenge,
          status: 'completed',
          progress: challenge.maxProgress || 1,
        };

        const newTotalPoints = prev.totalPoints + points;
        console.log('New total points will be:', newTotalPoints);

        const newState = challengeId === 'weekly-trivia' ? {
          ...prev,
          totalPoints: newTotalPoints,
          challenges: updatedChallenges,
          lastTriviaCompleted: new Date(),
        } : {
          ...prev,
          totalPoints: newTotalPoints,
          challenges: updatedChallenges,
        };
        
        console.log('Challenge completion - returning state:', newState);
        return newState;
      }
      
      console.log('Challenge not available or not found, returning previous state');
      return prev;
    });

    // Show points animation
    if (points > 0) {
      setAnimationPoints(points);
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);
    }
  };

  const claimReward = () => {
    setUserProgress(prev => ({
      ...prev,
      rewardStatus: 'claimed'
    }));
    setShowRewardBanner(true);
  };

  const simulateChallengePeriodEnd = () => {
    setUserProgress(prev => ({
      ...prev,
      rewardStatus: prev.totalPoints >= 1000 
        ? (prev.userRank && prev.userRank <= 1000 ? 'unlocked' : 'cap_reached')
        : 'shortfall',
      challengeEndDate: new Date()
    }));
    setShowRewardBanner(true);
  };

  const trackAction = (action: string, contentId?: string) => {
    // Handle tracking without interfering with point accumulation
    // Points are handled directly in completeChallenge function
    switch (action) {
      case 'start-show':
        if (contentId && !userProgress.startedShows.includes(contentId)) {
          setUserProgress(prev => ({
            ...prev,
            startedShows: [...prev.startedShows, contentId]
          }));
          if (userProgress.challenges['start-new-show']?.status === 'available') {
            completeChallenge('start-new-show', 200);
          }
        }
        break;
        
      case 'complete-series':
        if (contentId && !userProgress.completedSeries.includes(contentId)) {
          setUserProgress(prev => ({
            ...prev,
            completedSeries: [...prev.completedSeries, contentId]
          }));
          if (userProgress.challenges['complete-series']?.status === 'available') {
            completeChallenge('complete-series', 300);
          }
        }
        break;
        
      case 'add-to-list':
        if (contentId && !userProgress.myListItems.includes(contentId)) {
          setUserProgress(prev => ({
            ...prev,
            myListItems: [...prev.myListItems, contentId]
          }));
          if (userProgress.challenges['add-to-list']?.status === 'available') {
            completeChallenge('add-to-list', 100);
          }
        }
        break;
        
      case 'peek-view':
        if (!userProgress.peekViewUsed) {
          setUserProgress(prev => ({
            ...prev,
            peekViewUsed: true
          }));
          if (userProgress.challenges['try-peek-view']?.status === 'available') {
            completeChallenge('try-peek-view', 250);
          }
        }
        break;
    }
  };

  const resetProgress = () => {
    const challengesMap: Record<string, Challenge> = {};
    defaultChallenges.forEach(challenge => {
      challengesMap[challenge.id] = { ...challenge };
    });
    
    const resetProgress: UserProgress = {
      totalPoints: 0,
      monthlyGoal: 1000,
      rewardStatus: 'none',
      challenges: challengesMap,
      completedActions: [],
      startedShows: [],
      completedSeries: [],
      myListItems: [],
      peekViewUsed: false,
    };
    
    setUserProgress(resetProgress);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(resetProgress));
  };

  return {
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
  };
};