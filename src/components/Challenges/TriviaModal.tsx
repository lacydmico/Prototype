import React, { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { getCurrentTriviaQuestion } from '../../data/challengeData';

interface TriviaModalProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

const TriviaModal: React.FC<TriviaModalProps> = ({ onClose, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const question = getCurrentTriviaQuestion();

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      if (correct) {
        onComplete(150);
      } else {
        onComplete(0);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">?</span>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Weekly Trivia</h2>
              <p className="text-white/70 text-sm">Answer correctly to earn 150 points</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResult ? (
            <>
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-white text-lg font-semibold mb-4 leading-relaxed">
                  {question.question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                      ${selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                        ${selectedAnswer === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-white/40'}
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg uppercase tracking-wide transition-all duration-200
                  ${selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Submit Answer
              </button>
            </>
          ) : (
            /* Result */
            <div className="text-center py-8">
              <div className="mb-6">
                {isCorrect ? (
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                
                <p className="text-white/70 text-lg mb-4">
                  {isCorrect 
                    ? 'You earned 150 points!' 
                    : 'Better luck next week!'
                  }
                </p>
              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-6">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}

              <p className="text-white/60 text-sm">
                {isCorrect 
                  ? 'Come back next week for another trivia question!'
                  : 'Don\'t worry - you can try again next week for another chance to earn points!'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TriviaModal;