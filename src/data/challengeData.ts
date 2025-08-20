import { Challenge, TriviaQuestion } from '../types/challenges';

export const defaultChallenges: Challenge[] = [
  {
    id: 'start-new-show',
    title: 'Start a New Show',
    description: 'Finish Episode 1 of any show you haven\'t watched before',
    points: 200,
    type: 'watching',
    status: 'available',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'weekly-trivia',
    title: 'Answer Weekly Trivia',
    description: 'Test your knowledge with our weekly trivia question',
    points: 150,
    type: 'trivia',
    status: 'available',
    weeklyReset: true,
  },
  {
    id: 'complete-series',
    title: 'Complete a Series',
    description: 'Watch 90% of episodes and finish the final episode of any series',
    points: 300,
    type: 'watching',
    status: 'available',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'add-to-list',
    title: 'Add to My List',
    description: 'Add any title to your "My List" for easy access later',
    points: 100,
    type: 'list',
    status: 'available',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'try-peek-view',
    title: 'Try Peek View',
    description: 'Preview content using the Peek View feature',
    points: 250,
    type: 'peek',
    status: 'available',
    progress: 0,
    maxProgress: 1,
  },
];

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 'week1-2025',
    question: 'Which Star Trek series features Captain Christopher Pike as the main character?',
    options: [
      'Star Trek: The Original Series',
      'Star Trek: Strange New Worlds',
      'Star Trek: Discovery',
      'Star Trek: The Next Generation'
    ],
    correctAnswer: 1,
    explanation: 'Star Trek: Strange New Worlds follows Captain Pike and his crew aboard the USS Enterprise.'
  },
  {
    id: 'week2-2025',
    question: 'In which year was the movie "Interstellar" released?',
    options: ['2013', '2014', '2015', '2016'],
    correctAnswer: 1,
    explanation: 'Interstellar was released in 2014 and directed by Christopher Nolan.'
  },
  {
    id: 'week3-2025',
    question: 'What is the main character\'s profession in the TV series "Dexter"?',
    options: [
      'Police Detective',
      'Forensics Expert',
      'FBI Agent',
      'Crime Scene Photographer'
    ],
    correctAnswer: 1,
    explanation: 'Dexter Morgan works as a forensics expert specializing in blood spatter analysis.'
  }
];

export const getCurrentTriviaQuestion = (): TriviaQuestion => {
  // For demo purposes, cycle through questions based on week
  const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % triviaQuestions.length;
  return triviaQuestions[weekNumber];
};