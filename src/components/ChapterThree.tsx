import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, Star } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';

interface Question {
    id: number;
    question: string;
    options: { label: string; text: string }[];
    correctAnswer: string;
    emoji: string;
}

const questions: Question[] = [
    {
        id: 1,
        question: "Why did Cassidy create the Baby Toon spoon?",
        options: [
            { label: "A", text: "To make spoons colorful" },
            { label: "B", text: "To make feeding babies safer" },
            { label: "C", text: "To make spoons longer" }
        ],
        correctAnswer: "B",
        emoji: "🥄"
    },
    {
        id: 2,
        question: "What material is the Baby Toon spoon made from?",
        options: [
            { label: "A", text: "Metal" },
            { label: "B", text: "Plastic" },
            { label: "C", text: "Soft silicone" }
        ],
        correctAnswer: "C",
        emoji: "🧪"
    },
    {
        id: 3,
        question: "What makes the Baby Toon spoon safer?",
        options: [
            { label: "A", text: "It is very long" },
            { label: "B", text: "It has a short rounded design" },
            { label: "C", text: "It is heavy" }
        ],
        correctAnswer: "B",
        emoji: "🛡️"
    },
    {
        id: 4,
        question: "What quality helped Cassidy become an inventor?",
        options: [
            { label: "A", text: "Curiosity" },
            { label: "B", text: "Ignoring problems" },
            { label: "C", text: "Waiting for others to fix things" }
        ],
        correctAnswer: "A",
        emoji: "🔍"
    },
    {
        id: 5,
        question: "If you see a problem and create something to fix it, what are you acting like?",
        options: [
            { label: "A", text: "A chef" },
            { label: "B", text: "An inventor" },
            { label: "C", text: "A magician" }
        ],
        correctAnswer: "B",
        emoji: "🛠️"
    },
    {
        id: 6,
        question: "What is a pitch?",
        options: [
            { label: "A", text: "A type of game" },
            { label: "B", text: "A presentation to explain an idea" },
            { label: "C", text: "A drawing competition" }
        ],
        correctAnswer: "B",
        emoji: "🎤"
    },
    {
        id: 7,
        question: "In the process of inventing, what comes first?",
        options: [
            { label: "A", text: "The Invention" },
            { label: "B", text: "The Problem" },
            { label: "C", text: "The Money" }
        ],
        correctAnswer: "B",
        emoji: "🤔"
    },
    {
        id: 8,
        question: "What helps inventions succeed the most?",
        options: [
            { label: "A", text: "Solving real problems" },
            { label: "B", text: "Looking very fancy" },
            { label: "C", text: "Being super expensive" }
        ],
        correctAnswer: "A",
        emoji: "🌟"
    }
];

function QuizCard({ question, onAnswer, answered, selectedAnswer }: {
    question: Question;
    onAnswer: (label: string) => void;
    answered: boolean;
    selectedAnswer: string | null;
}) {
    // Shuffle options once on mount so correct answer is at a random position each time
    const [shuffledOptions] = useState(() => {
        const opts = [...question.options];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        return opts.map((opt, idx) => ({ ...opt, displayLabel: ['A', 'B', 'C'][idx] }));
    });

    const isCorrect = selectedAnswer === question.correctAnswer;

    const optionColors: Record<string, { base: string; hover: string; selected: string; correct: string; wrong: string }> = {
        A: {
            base: "bg-rose-50 border-rose-200 text-rose-800",
            hover: "hover:bg-rose-100 hover:border-rose-400 hover:shadow-[0_6px_0_0_rgba(251,113,133,1)]",
            selected: "bg-rose-100 border-rose-400",
            correct: "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]",
            wrong: "bg-red-100 border-red-500 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]"
        },
        B: {
            base: "bg-amber-50 border-amber-200 text-amber-800",
            hover: "hover:bg-amber-100 hover:border-amber-400 hover:shadow-[0_6px_0_0_rgba(251,191,36,1)]",
            selected: "bg-amber-100 border-amber-400",
            correct: "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]",
            wrong: "bg-red-100 border-red-500 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]"
        },
        C: {
            base: "bg-sky-50 border-sky-200 text-sky-800",
            hover: "hover:bg-sky-100 hover:border-sky-400 hover:shadow-[0_6px_0_0_rgba(56,189,248,1)]",
            selected: "bg-sky-100 border-sky-400",
            correct: "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]",
            wrong: "bg-red-100 border-red-500 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]"
        }
    };

    const getOptionClass = (opt: typeof shuffledOptions[0]) => {
        const colors = optionColors[opt.displayLabel];
        if (!answered) return `${colors.base} ${colors.hover} cursor-pointer`;
        if (opt.label === question.correctAnswer) return colors.correct;
        if (opt.label === selectedAnswer && opt.label !== question.correctAnswer) return colors.wrong;
        return `${colors.base} opacity-50`;
    };

    return (
        <motion.div
            className="p-10 rounded-[3rem] bg-white border-8 border-gray-100 shadow-[0_16px_0_0_rgba(229,231,235,1)] relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-start gap-6 mb-8">
                <span className="text-5xl flex-shrink-0 mt-1">{question.emoji}</span>
                <div>
                    <span className="text-sm font-extrabold text-gray-400 tracking-widest uppercase">Question {question.id}</span>
                    <h3 className="text-3xl font-extrabold text-gray-800 mt-2">{question.question}</h3>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {shuffledOptions.map((option) => (
                    <motion.button
                        key={option.label}
                        onClick={() => !answered && onAnswer(option.label)}
                        className={`w-full text-left p-6 rounded-[2rem] border-4 font-bold text-xl transition-all duration-200 shadow-[0_4px_0_0_rgba(0,0,0,0.05)] ${getOptionClass(option)}`}
                        whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
                        whileTap={!answered ? { scale: 0.98 } : {}}
                        disabled={answered}
                    >
                        <span className="inline-flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center font-extrabold text-lg border-2 border-gray-200 flex-shrink-0">
                                {option.displayLabel}
                            </span>
                            <span>{option.text}</span>
                            {answered && option.label === question.correctAnswer && (
                                <CheckCircle2 className="text-emerald-500 ml-auto flex-shrink-0" size={28} />
                            )}
                            {answered && option.label === selectedAnswer && option.label !== question.correctAnswer && (
                                <XCircle className="text-red-500 ml-auto flex-shrink-0" size={28} />
                            )}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Answer feedback */}
            <AnimatePresence>
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className={`mt-8 p-6 rounded-[2rem] border-4 ${isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-red-50 border-red-300 text-red-800'
                        }`}
                    >
                        <p className="text-xl font-bold flex items-center gap-3">
                            {isCorrect ? (
                                <><CheckCircle2 size={28} /> 🎉 Correct! Amazing job!</>
                            ) : (
                                <><XCircle size={28} /> Not quite! The correct answer is <span className="bg-white px-3 py-1 rounded-xl font-extrabold">{question.correctAnswer}</span></>
                            )}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function ChapterThree() {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [browniePoints, setBrowniePoints] = useState<number>(() => {
        const saved = localStorage.getItem('poa-spoon-brownie-points');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [pointsAwarded, setPointsAwarded] = useState(false);

    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const correctCount = Object.entries(answers).filter(
        ([id, ans]) => questions.find(q => q.id === Number(id))?.correctAnswer === ans
    ).length;
    const allAnswered = answeredCount === totalQuestions;

    // Award brownie points when quiz is completed
    useEffect(() => {
        if (allAnswered && !pointsAwarded) {
            const newTotal = browniePoints + correctCount;
            setBrowniePoints(newTotal);
            localStorage.setItem('poa-spoon-brownie-points', String(newTotal));
            setPointsAwarded(true);
        }
    }, [allAnswered, correctCount, pointsAwarded, browniePoints]);

    const handleAnswer = (questionId: number, label: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: label }));
    };

    return (
        <div className="max-w-5xl mx-auto px-6 pb-40">

            {/* Brownie Points Banner */}
            <motion.div
                className="fixed top-4 right-20 z-50 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-2.5 rounded-2xl shadow-lg border-2 border-amber-300 flex items-center gap-2 font-extrabold text-lg"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <Star size={20} fill="white" /> {browniePoints} Brownie Points
            </motion.div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <motion.div
                        className="absolute -top-32 -right-32 w-64 h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                      <div className="relative z-10 text-center flex flex-col md:flex-row items-center justify-center gap-8">
                          <div>
                              <span className="text-6xl text-violet-600 font-extrabold px-6 py-2 bg-violet-100/80 rounded-3xl border-4 border-violet-200 shadow-sm drop-shadow-md inline-block mb-6">
                                  1.3
                              </span>
                              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-pink-500 leading-tight mb-4">
                                  Interactive Quiz
                              </h1>
                              <p className="text-2xl text-gray-700 font-bold mt-4">
                                  Test your knowledge about inventions and problem-solving! 🧠
                              </p>
                          </div>
                      </div>

                </FluidGlass>
            </motion.div>

            {/* Intro */}
            <motion.p
                className="text-center text-2xl text-gray-600 font-medium mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                A quick quiz to reinforce your understanding of inventions and problem-solving. Choose the best answer for each question!
            </motion.p>

            {/* Quiz Cards */}
            <div className="flex flex-col gap-12">
                {questions.map((q) => (
                    <QuizCard
                        key={q.id}
                        question={q}
                        onAnswer={(label) => handleAnswer(q.id, label)}
                        answered={q.id in answers}
                        selectedAnswer={answers[q.id] || null}
                    />
                ))}
            </div>

            {/* Score Card */}
            <AnimatePresence>
                {allAnswered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mt-16"
                    >
                          <div className={`p-12 rounded-[3rem] border-8 text-center relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 ${
                              correctCount === totalQuestions
                                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 shadow-[0_16px_0_0_rgba(16,185,129,1)]'
                                  : correctCount >= totalQuestions / 2
                                      ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-[0_16px_0_0_rgba(251,191,36,1)]'
                                      : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300 shadow-[0_16px_0_0_rgba(244,63,94,1)]'
                          }`}>
                              <div className="flex-1">
                                  <motion.div
                                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                      transition={{ duration: 0.6 }}
                                  >
                                      <Trophy size={80} className={`mx-auto mb-6 ${
                                          correctCount === totalQuestions ? 'text-emerald-500' : correctCount >= totalQuestions / 2 ? 'text-amber-500' : 'text-rose-400'
                                      }`} />
                                  </motion.div>

                                  <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                                      {correctCount === totalQuestions
                                          ? "🎉 Perfect Score!"
                                          : correctCount >= totalQuestions / 2
                                              ? "👏 Good Job!"
                                              : "💪 Keep Trying!"}
                                  </h2>

                                  <p className="text-3xl font-bold text-gray-600 mb-4">
                                      You got <span className="text-4xl font-extrabold text-green-600">{correctCount}</span> out of <span className="text-4xl font-extrabold">{totalQuestions}</span> correct!
                                  </p>

                                  <motion.div
                                      className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-2xl border-4 border-amber-300 font-extrabold text-xl mb-8"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                  >
                                      <Star size={24} fill="#f59e0b" className="text-amber-500" />
                                      +{correctCount} Brownie Points Earned!
                                      <span className="text-sm font-bold text-amber-600 ml-2">(Total: {browniePoints})</span>
                                  </motion.div>
                                </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>

              <ChapterFooter chapterName="1.3 � Interactive Quiz" />
          </div>
      );
  }
