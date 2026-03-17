import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Users, Shuffle, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';

/* Slide-up reveal heading */
function SlideUpText({ text }: { text: string }) {
    const words = text.split(' ');
    return (
        <h1 className="text-5xl md:text-7xl font-extrabold font-outfit drop-shadow-md leading-tight text-center overflow-hidden flex flex-wrap justify-center gap-3">
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </h1>
    );
}

const everydayProblems = [
    { emoji: '🎒', title: 'School bag too heavy', img: 'https://share.google/5vPrG2lRThrG50Cux', color: 'from-orange-100 to-amber-50', border: 'border-orange-300' },
    { emoji: '💧', title: 'Water bottle leaking', img: 'https://share.google/Uii6RTZnjaXy7zSoY', color: 'from-blue-100 to-sky-50', border: 'border-blue-300' },
    { emoji: '🧸', title: 'Toys getting lost', img: 'https://share.google/v5vkQnHNqO0hJThzu', color: 'from-pink-100 to-rose-50', border: 'border-pink-300' },
    { emoji: '✏️', title: 'Pencils breaking easily', img: 'https://share.google/C7ME9n673rQbssLfN', color: 'from-yellow-100 to-amber-50', border: 'border-yellow-300' },
];

const moreProblemIdeas = [
    'Lunch box food gets cold or messy in the bag',
    'Erasers keep getting lost in the pencil box',
    'Water bottles are hard to open for small kids',
    'Books get wet during rainy days',
    'Socks always get lost after washing',
    'School ID cards keep falling off or getting lost',
    'Headphones get tangled in the bag',
    'Crayons break easily inside the pencil box',
    'Children forget to water plants at home',
    'Kids forget their homework at home',
    'Toys make a mess and are hard to organise',
    'Shoes get dirty quickly during playtime',
    'Kids forget to drink water during school',
    'Lunch boxes sometimes leak into school bags',
    'Children forget where they kept their favourite toy',
];

const kidInventorProblems = [
    { image: '/2.1 - 1.png', text: 'A toy that reminds kids to clean their room', color: 'text-indigo-600' },
    { image: '/2.1 - 2.png', text: 'A pencil that never gets lost', color: 'text-rose-600' },
    { image: '/2.1 - 3.png', text: 'A smart lunch box that keeps food warm', color: 'text-emerald-600' },
    { image: '/2.1 - 4.png', text: 'Shoes that clean themselves after playing', color: 'text-amber-600' },
    { image: '/2.1 - 5.png', text: 'A bag that becomes lighter automatically', color: 'text-sky-600' },
];

const mysteryCards = [
    { emoji: '🍼', problem: 'Baby dropping food', color: 'bg-rose-100 border-rose-300' },
    { emoji: '📚', problem: 'Kids forgetting homework', color: 'bg-amber-100 border-amber-300' },
    { emoji: '🥾', problem: 'Shoes getting muddy', color: 'bg-emerald-100 border-emerald-300' },
    { emoji: '🪀', problem: 'Toys breaking easily', color: 'bg-violet-100 border-violet-300' },
];

/* ── Inventor's Lab Activity ── */
function InventorsLab() {
    const [answers, setAnswers] = useState({ problem: '', invention: '', solution: '', special: '' });
    const [submitted, setSubmitted] = useState(false);

    const fields = [
        { key: 'problem', label: 'What is the problem?', emoji: '❓', placeholder: 'e.g. My school bag is too heavy every day...' },
        { key: 'invention', label: 'What is your invention?', emoji: '💡', placeholder: 'e.g. A lightweight backpack with motorised wheels...' },
        { key: 'solution', label: 'How does it solve the problem?', emoji: '🛠️', placeholder: 'e.g. The wheels carry the weight instead of my back...' },
        { key: 'special', label: 'What makes it special?', emoji: '✨', placeholder: 'e.g. It folds small enough to fit in a locker...' },
    ] as const;

    return (
        <motion.div
            className="p-10 rounded-[2rem] bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-dashed border-amber-300 shadow-xl shadow-amber-100/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl font-extrabold text-amber-900 mb-2 flex items-center gap-3">
                <Pencil size={32} className="text-amber-600" /> Inventor's Lab 🔬
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-8">Fill in your invention idea — be as creative as you like!</p>

            {!submitted ? (
                <div className="flex flex-col gap-6">
                    {fields.map((f) => (
                        <div key={f.key}>
                            <label className="block text-xl font-extrabold text-amber-800 mb-2">
                                {f.emoji} {f.label}
                            </label>
                            <textarea
                                className="w-full p-4 rounded-2xl border-4 border-amber-200 bg-white text-gray-800 font-medium text-lg focus:outline-none focus:border-amber-400 resize-none min-h-[80px] placeholder-gray-400"
                                placeholder={f.placeholder}
                                value={answers[f.key]}
                                onChange={(e) => setAnswers(prev => ({ ...prev, [f.key]: e.target.value }))}
                            />
                        </div>
                    ))}
                    <motion.button
                        onClick={() => { if (Object.values(answers).every(v => v.trim())) setSubmitted(true); }}
                        className={`mt-4 px-8 py-4 rounded-2xl font-extrabold text-xl text-white shadow-lg transition-all ${Object.values(answers).every(v => v.trim())
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 cursor-pointer'
                            : 'bg-gray-300 cursor-not-allowed opacity-60'}`}
                        whileHover={Object.values(answers).every(v => v.trim()) ? { scale: 1.04 } : {}}
                        whileTap={Object.values(answers).every(v => v.trim()) ? { scale: 0.97 } : {}}
                    >
                        🚀 Submit My Invention!
                    </motion.button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[1.5rem] border-4 border-amber-300 p-8 shadow-inner"
                >
                    <h4 className="text-2xl font-extrabold text-amber-700 mb-6">🏆 Your Invention Card!</h4>
                    {fields.map((f) => (
                        <div key={f.key} className="mb-4">
                            <span className="text-lg font-extrabold text-amber-600">{f.emoji} {f.label}</span>
                            <p className="mt-1 text-xl text-gray-800 font-medium bg-amber-50 rounded-xl p-3 border-2 border-amber-200">{answers[f.key]}</p>
                        </div>
                    ))}
                    <motion.button
                        onClick={() => { setAnswers({ problem: '', invention: '', solution: '', special: '' }); setSubmitted(false); }}
                        className="mt-4 px-6 py-3 bg-white rounded-2xl border-4 border-amber-300 font-bold text-amber-700 shadow-sm hover:bg-amber-50"
                        whileHover={{ scale: 1.04 }}
                    >
                        ✏️ Edit My Invention
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}

/* ── Mystery Card Flipper ── */
function MysteryCardGame() {
    const [drawnCard, setDrawnCard] = useState<typeof mysteryCards[0] | null>(null);
    const [invention, setInvention] = useState('');
    const [locked, setLocked] = useState(false);

    const draw = () => {
        const card = mysteryCards[Math.floor(Math.random() * mysteryCards.length)];
        setDrawnCard(card);
        setInvention('');
        setLocked(false);
    };

    return (
        <motion.div
            className="p-10 rounded-[2rem] bg-gradient-to-br from-violet-50 to-purple-50 border-4 border-dashed border-violet-300 shadow-xl shadow-violet-100/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl font-extrabold text-violet-900 mb-2 flex items-center gap-3">
                <Shuffle size={32} className="text-violet-600" /> Mystery Problem Cards 🃏
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-6">
                Draw a random problem card and quickly invent a solution! Boosts quick thinking and creativity.
            </p>

            <motion.button
                onClick={draw}
                className="px-8 py-4 rounded-2xl font-extrabold text-xl text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg mb-6"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
            >
                🎲 Draw a Mystery Card!
            </motion.button>

            <AnimatePresence mode="wait">
                {drawnCard && (
                    <motion.div
                        key={drawnCard.problem}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`p-8 rounded-[1.5rem] border-4 ${drawnCard.color} mb-6`}
                    >
                        <span className="text-5xl block mb-3">{drawnCard.emoji}</span>
                        <p className="text-2xl font-extrabold text-gray-800">Problem: <span className="text-violet-800">{drawnCard.problem}</span></p>
                    </motion.div>
                )}
            </AnimatePresence>

            {drawnCard && !locked && (
                <div className="flex flex-col gap-4">
                    <label className="text-xl font-extrabold text-violet-800">⚡ Your Quick Invention Idea:</label>
                    <textarea
                        className="w-full p-4 rounded-2xl border-4 border-violet-200 bg-white text-gray-800 font-medium text-lg focus:outline-none focus:border-violet-400 resize-none min-h-[80px]"
                        placeholder="Think fast! What would you invent to solve this?"
                        value={invention}
                        onChange={(e) => setInvention(e.target.value)}
                    />
                    <motion.button
                        onClick={() => { if (invention.trim()) setLocked(true); }}
                        className="px-6 py-3 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-violet-400 to-pink-500 w-fit shadow-md"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        🔒 Lock In My Answer!
                    </motion.button>
                </div>
            )}

            {drawnCard && locked && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[1.5rem] border-4 border-violet-300 p-6 shadow-inner"
                >
                    <p className="text-2xl font-extrabold text-violet-700 mb-1">🎉 Your invention:</p>
                    <p className="text-xl text-gray-800 font-medium">{invention}</p>
                    <motion.button
                        onClick={draw}
                        className="mt-4 px-6 py-3 bg-violet-100 border-4 border-violet-300 rounded-2xl font-bold text-violet-700"
                        whileHover={{ scale: 1.04 }}
                    >
                        🔄 Draw Another Card
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function ChapterFour() {
    const [showMoreProblems, setShowMoreProblems] = useState(false);

    return (
        <div className="max-w-5xl mx-auto px-6 pb-40">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <motion.div
                        className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <div className="relative z-10 text-center">
                        <span className="text-6xl text-emerald-600 font-extrabold px-6 py-2 bg-emerald-100/80 rounded-3xl border-4 border-emerald-200 shadow-sm drop-shadow-md inline-block mb-6">
                            2.1
                        </span>
                        <SlideUpText text="Problem Statement" />
                        <p className="text-2xl text-gray-700 font-bold mt-6 max-w-3xl mx-auto">
                            "Cassidy solved a problem she saw at home. Now it's your turn to think like inventors!" 💡
                        </p>
                    </div>
                </FluidGlass>
            </motion.div>

            {/* Challenge */}
            <motion.div
                className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-emerald-50/50 border-4 border-dashed border-emerald-300 shadow-xl shadow-emerald-100/50 relative overflow-hidden group cursor-default flex flex-col md:flex-row gap-8 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
            >
                <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-emerald-900 mb-6 flex items-center gap-4">
                        <span className="text-5xl">🎯</span> Your Challenge
                    </h2>
                    <p className="text-2xl text-gray-800 font-bold leading-relaxed mb-4">Find a small problem in everyday life and imagine a creative product that could solve it.</p>
                    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-4 border-emerald-200 shadow-inner mt-4">
                        <Users size={36} className="text-emerald-600 flex-shrink-0" />
                        <p className="text-xl text-gray-700 font-medium">Work in groups of <span className="font-extrabold text-emerald-700">3–4 members</span>. Each group identifies a problem, thinks of a solution, and draws their invention!</p>
                    </div>
                </div>
            </motion.div>
            {/* Examples of everyday problems */}
            <motion.div
                className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-amber-50/50 border-4 border-dashed border-amber-300 shadow-xl shadow-amber-100/50 mt-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-extrabold text-amber-900 mb-8 flex items-center gap-4">
                    <span className="text-5xl">🌍</span> Examples of Everyday Problems
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {everydayProblems.map((p, i) => (
                        <motion.div
                            key={i}
                            className={`p-8 rounded-[2rem] bg-gradient-to-br ${p.color} border-4 ${p.border} flex items-center gap-5 cursor-default`}
                            whileHover={{ y: -5, scale: 1.02 }}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="text-5xl flex-shrink-0">{p.emoji}</span>
                            <p className="text-xl font-extrabold text-gray-800">{p.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* More ideas accordion */}
                <motion.button
                    onClick={() => setShowMoreProblems(v => !v)}
                    className="flex items-center gap-3 text-amber-700 font-bold text-xl bg-amber-100 px-6 py-3 rounded-2xl border-4 border-amber-200"
                    whileHover={{ scale: 1.03 }}
                >
                    {showMoreProblems ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    {showMoreProblems ? 'Show Less' : 'More Problem Ideas'}
                </motion.button>

                <AnimatePresence>
                    {showMoreProblems && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {moreProblemIdeas.map((idea, i) => (
                                    <motion.p
                                        key={i}
                                        className="flex items-start gap-3 p-4 bg-white rounded-2xl border-2 border-amber-200 text-gray-700 font-medium text-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                    >
                                        <span className="text-amber-500 font-extrabold mt-0.5">•</span> {idea}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Kid Inventor Problems */}
            <motion.div
                className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-pink-50/50 border-4 border-dashed border-pink-300 shadow-xl shadow-pink-100/50 mt-10 flex flex-col md:flex-row gap-8 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex-1 w-full">
                    <h2 className="text-4xl font-extrabold text-pink-900 mb-8 flex items-center gap-4">
                        <Lightbulb size={40} className="text-pink-600" /> Fun "Kid Inventor" Problems
                    </h2>
                    <div className="flex flex-col gap-4">
                        {kidInventorProblems.map((p, i) => (
                            <motion.div
                                key={i}
                                className="p-6 rounded-[1.5rem] bg-white border-4 border-pink-200 flex items-center gap-6"
                                whileHover={{ x: 8, scale: 1.01 }}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <img src={p.image} alt={p.text} className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl border-4 border-pink-100 flex-shrink-0" />
                                <p className={`text-2xl md:text-3xl font-extrabold ${p.color}`}>{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Inventor's Lab Activity */}
            <div className="mt-10">
                <InventorsLab />
            </div>

            {/* Mystery Card Game */}
            <div className="mt-10">
                <MysteryCardGame />
            </div>

            <ChapterFooter chapterName="2.1 — Problem Statement" />
        </div>
    );
}
