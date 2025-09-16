import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/AppContext';

export const HumanVerification = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Research-focused challenges
  const challenges = [
    {
      question: "What is the primary purpose of a control group in scientific research?",
      options: ["To provide a baseline for comparison", "To speed up experiments", "To reduce costs", "To increase sample size"],
      correct: 0
    },
    {
      question: "Which statistical measure indicates the strength of a relationship between variables?",
      options: ["Mean", "Standard deviation", "Correlation coefficient", "Variance"],
      correct: 2
    },
    {
      question: "What does 'p < 0.05' typically indicate in research?",
      options: ["The study is invalid", "Statistical significance", "Large sample size", "High correlation"],
      correct: 1
    },
    {
      question: "Which research method is best for establishing cause-and-effect relationships?",
      options: ["Observational study", "Case study", "Experimental study", "Survey research"],
      correct: 2
    },
    {
      question: "What is the primary goal of peer review in academic research?",
      options: ["To increase publication speed", "To ensure quality and validity", "To reduce costs", "To increase citations"],
      correct: 1
    }
  ];

  useEffect(() => {
    // Show verification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      setChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (answerIndex) => {
    setUserAnswer(answerIndex);
    if (answerIndex === challenge.correct) {
      setIsVerified(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  };

  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const bgColorClass = isDarkMode ? 'bg-black/95' : 'bg-white/95';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBgClass = isDarkMode ? 'bg-black/80' : 'bg-white/80';
  const hoverBgClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';

  if (!isVisible || isVerified) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`} />
      
      {/* Verification Modal */}
      <div className={`relative ${bgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-2xl p-8 max-w-md mx-4 shadow-2xl`}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center`}>
            <svg className={`w-6 h-6 ${textColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-xl font-mono font-bold ${textColorClass} mb-2`}>
            Research Access Verification
          </h2>
          <p className={`text-sm ${mutedTextColorClass} font-mono`}>
            Please verify your research background to access PRAXIS
          </p>
        </div>

        {/* Challenge */}
        {challenge && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${cardBgClass} border ${borderColorClass}`}>
              <h3 className={`font-mono text-sm font-semibold ${textColorClass} mb-3`}>
                {challenge.question}
              </h3>
              <div className="space-y-2">
                {challenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-3 rounded-lg font-mono text-sm transition-all duration-200 ${hoverBgClass} ${
                      userAnswer === index 
                        ? (index === challenge.correct ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600')
                        : `${mutedTextColorClass} hover:${textColorClass}`
                    }`}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                This helps us maintain research integrity and prevent automated access
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
