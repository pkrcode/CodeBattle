import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Users, Swords, X, Check, Loader2 } from 'lucide-react';
import { AptitudeChallenge, AptitudeDifficulty, AptitudeQuestion } from '../types';
import { createLocalChallenge, scoreAnswer } from '../utils/aptitudeService';
import AIHelper from '../components/AIHelper';

const difficultyOptions: { label: string; value: AptitudeDifficulty }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const AptitudeChallengePage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [difficulty, setDifficulty] = useState<AptitudeDifficulty>('easy');
  const [isMatching, setIsMatching] = useState(false);
  const [challenge, setChallenge] = useState<AptitudeChallenge | null>(null);
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = questions[index];

  // Initialize difficulty from URL (e.g., /challenge/aptitude?difficulty=medium)
  useEffect(() => {
    const d = (searchParams.get('difficulty') || '').toLowerCase();
    if (d === 'easy' || d === 'medium' || d === 'hard') {
      setDifficulty(d as AptitudeDifficulty);
    }
  }, [searchParams]);

  const startSolo = async () => {
    if (!user) return;
    setLoading(true);
    const { challenge, questions } = await createLocalChallenge({
      createdBy: user.uid,
      mode: 'solo',
      difficulty,
      rules: { maxWrong: 3 },
      numQuestions: 20,
    });
    setChallenge(challenge);
    setQuestions(questions);
    setIndex(0);
    setScore(0);
    setWrong(0);
    setFinished(false);
    setAnsweredIndex(null);
    setLoading(false);
  };

  const startMatchmaking = async () => {
    if (!user) return;
    setIsMatching(true);
    // Simulate a short matching animation
    setTimeout(async () => {
      await startSolo(); // For MVP, start solo but show animation
      setIsMatching(false);
    }, 1800);
  };

  const onAnswer = (choice: number) => {
    if (!challenge || !current || answeredIndex !== null) return;
    setAnsweredIndex(choice);
    const isCorrect = choice === current.correctIndex;
    const res = scoreAnswer({
      challenge,
      currentScore: score,
      currentWrong: wrong,
      isCorrect,
    });
    setScore(res.newScore);
    setWrong(res.wrong);
    const proceed = () => {
      if (index + 1 >= questions.length || res.finished) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
        setAnsweredIndex(null);
      }
    };
    // Small delay to show feedback color
    setTimeout(proceed, 600);
  };

  const reset = () => {
    setChallenge(null);
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setWrong(0);
    setFinished(false);
    setAnsweredIndex(null);
  };

  const cardBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold mb-1 ${textMain}`}>Aptitude Challenge</h1>
          <p className={textSub}>Fast MCQ battles. 3 wrong and you are out. Highest score wins.</p>
        </div>
      </div>

      {/* Setup panel when no challenge */}
      {!challenge && (
        <div className={`${cardBg} border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} rounded-xl p-6 mb-8`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className={`font-medium ${textMain}`}>Select Difficulty</div>
              <div className="mt-2 flex gap-2">
                {difficultyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDifficulty(opt.value)}
                    className={`px-3 py-1.5 rounded-md border text-sm ${
                      difficulty === opt.value
                        ? 'bg-primary-600 text-white border-primary-600'
                        : theme === 'dark'
                          ? 'border-slate-700 text-gray-300 hover:bg-slate-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

      <div className="flex gap-3 flex-wrap justify-start">
              <button
                onClick={startSolo}
                disabled={loading}
        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-60"
              >
                {loading ? 'Loading...' : 'Start Solo'}
              </button>
              <button
                onClick={startMatchmaking}
        className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold"
              >
                Matchmaking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge in progress */}
      {challenge && !finished && current && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className={`md:col-span-2 ${cardBg} border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`text-sm ${textSub}`}>Question {index + 1} / {questions.length}</div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${textSub}`}>Wrong: {wrong} / {challenge.rules.maxWrong}</span>
                <span className={`text-sm font-semibold ${textMain}`}>Score: {score}</span>
              </div>
            </div>
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <h2 className={`text-lg font-semibold ${textMain} min-w-0 flex-1`}>{current.question}</h2>
              <AIHelper
                type="aptitude"
                getParams={() => ({
                  problemStatement: `Topic: ${current.topic} | Difficulty: ${current.difficulty}\n\n${current.question}`,
                })}
                label="Hint"
              />
            </div>

            <div className="grid gap-3">
              {current.options.map((opt, i) => {
                const picked = answeredIndex === i;
                const isCorrect = i === current.correctIndex;
                const show = answeredIndex !== null;
                const bg = !show
                  ? theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'
                  : picked && isCorrect
                    ? 'bg-green-600 text-white'
                    : picked && !isCorrect
                      ? 'bg-red-600 text-white'
                      : isCorrect
                        ? theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                        : theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100';
                return (
                  <button
                    key={i}
                    onClick={() => onAnswer(i)}
                    disabled={answeredIndex !== null}
                    className={`text-left px-4 py-3 rounded-lg border ${
                      theme === 'dark' ? 'border-slate-600' : 'border-gray-300'
                    } ${bg}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`${cardBg} border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} rounded-xl p-6`}> 
            <div className="flex items-center gap-2 mb-3">
              <Swords className="w-5 h-5 text-primary-400" />
              <div className={`font-semibold ${textMain}`}>Live Status</div>
            </div>
            <div className={`text-sm ${textSub}`}>Mode: Solo</div>
            <div className={`text-sm ${textSub}`}>Difficulty: {challenge.difficulty}</div>
            <div className={`text-sm ${textSub}`}>Questions: {questions.length}</div>
            <div className={`text-sm ${textSub}`}>Max Wrong: {challenge.rules.maxWrong}</div>
          </div>
        </div>
      )}

      {/* Finished */}
      {challenge && finished && (
        <div className={`${cardBg} border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} rounded-xl p-8 text-center`}>
          <div className="mx-auto w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${textMain}`}>Challenge Complete</h3>
          <p className={`mb-6 ${textSub}`}>Score: {score} | Wrong: {wrong}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={reset} className="px-4 py-2 rounded-lg border border-transparent bg-primary-600 hover:bg-primary-700 text-white font-semibold">Play Again</button>
          </div>
        </div>
      )}

      {/* Matching overlay */}
      <AnimatePresence>
        {isMatching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`rounded-xl p-8 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} text-center w-[90%] max-w-md`}
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center mb-4">
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              </div>
              <div className={`text-xl font-semibold mb-1 ${textMain}`}>Finding Opponent...</div>
              <div className={`${textSub} mb-6`}>Difficulty: {difficulty.toUpperCase()}</div>
              <div className={`${textSub} text-sm`}>Tip: You are out after 3 wrong answers.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AptitudeChallengePage;
