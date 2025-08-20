export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'trivia' | 'watching' | 'list' | 'peek';
  status: 'available' | 'completed' | 'locked';
  progress?: number;
  maxProgress?: number;
  weeklyReset?: boolean;
  lastCompleted?: Date;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UserProgress {
  totalPoints: number;
  monthlyGoal: number;
  rewardStatus: 'none' | 'unlocked' | 'claimed' | 'cap_reached' | 'shortfall';
  userRank?: number; // Position in the 1000 user cap
  challengeEndDate?: Date;
  challenges: Record<string, Challenge>;
  completedActions: string[];
  startedShows: string[];
  completedSeries: string[];
  myListItems: string[];
  peekViewUsed: boolean;
  lastTriviaCompleted?: Date;
}

export interface ChallengeHubProps {
  userProgress: UserProgress;
  initialChallengeId?: string | null;
  onChallengeComplete: (challengeId: string, points: number) => void;
  onClaimReward?: () => void;
  onClose: () => void;
}

export interface PointsTrackerProps {
  currentPoints: number;
  goalPoints: number;
  visible: boolean;
  onDismiss: () => void;
}

export interface PointsAnimationProps {
  points: number;
  visible: boolean;
  onComplete: () => void;
}

export interface RewardBannerProps {
  rewardStatus: 'unlocked' | 'claimed' | 'cap_reached' | 'shortfall';
  points: number;
  userRank?: number;
  visible: boolean;
  onClose: () => void;
}

export interface CarouselChallengeCardProps {
  userProgress: UserProgress;
  onOpenChallengeHub: () => void;
}