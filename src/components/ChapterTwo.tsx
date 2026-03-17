import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, HelpCircle } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';

function VideoFrame({ url, title }: { url: string; title?: string }) {
    const videoId = url.split('/').pop()?.split('?')[0] || url;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {title && (
                <h3 className="text-2xl font-extrabold text-gray-700 text-center mb-4">{title}</h3>
            )}
            <div className="w-[800px] max-w-full aspect-video rounded-[3rem] overflow-hidden bg-white p-4 border-[6px] border-gray-200 shadow-[0_16px_0_0_rgba(229,231,235,1)] my-8 mx-auto transform transition-transform hover:-translate-y-2">
                <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative bg-black shadow-inner">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0"
                    />
                </div>
            </div>
        </motion.div>
    );
}

/* Flip-reveal heading animation */
function FlipRevealText({ text, colorFrom, colorTo }: { text: string; colorFrom: string; colorTo: string }) {
    const words = text.split(" ");
    return (
        <h1 className="text-5xl md:text-7xl font-extrabold font-outfit drop-shadow-md leading-tight text-center flex flex-wrap justify-center gap-4">
            {words.map((word, wordIndex) => (
                <motion.span
                    key={wordIndex}
                    className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${colorFrom} ${colorTo}`}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 150,
                        delay: wordIndex * 0.25,
                    }}
                    style={{ perspective: 600 }}
                    whileHover={{
                        scale: 1.1,
                        rotateY: 15,
                        transition: { duration: 0.3 }
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </h1>
    );
}

export default function ChapterTwo() {
    // Simulation: match problems to solutions
    const [matches, setMatches] = useState<Record<number, number | null>>({ 0: null, 1: null, 2: null });
    const problems = [
        { id: 0, text: "Spoon goes too deep into baby's mouth", emoji: "😰" },
        { id: 1, text: "Hard metal hurts baby's gums", emoji: "😢" },
        { id: 2, text: "Baby doesn't want to eat", emoji: "😤" },
    ];
    const solutions = [
        { id: 0, text: "Short rounded design", emoji: "🥄" },
        { id: 1, text: "Soft silicone material", emoji: "🧴" },
        { id: 2, text: "Fun animal shapes & colors", emoji: "🐻" },
    ];
    const correctMatches: Record<number, number> = { 0: 0, 1: 1, 2: 2 };
    const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

    const handleSolutionClick = (solId: number) => {
        if (selectedProblem !== null) {
            setMatches(prev => ({ ...prev, [selectedProblem]: solId }));
            setSelectedProblem(null);
        }
    };

    const allMatched = Object.values(matches).every(v => v !== null);
    const matchScore = Object.entries(matches).filter(
        ([probId, solId]) => correctMatches[Number(probId)] === solId
    ).length;

    return (
        <div className="max-w-6xl mx-auto px-6 pb-40">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <motion.div
                        className="absolute -top-32 -left-32 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <div className="relative z-10">
                          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                  <span className="text-6xl text-rose-600 font-extrabold px-6 py-2 bg-rose-100/80 rounded-3xl border-4 border-rose-200 shadow-sm drop-shadow-md">
                                      1.2
                                  </span>
                                  <div className="flex-1 max-w-4xl pt-4">
                                      <FlipRevealText text="Watch & Learn" colorFrom="from-rose-600" colorTo="to-amber-500" />
                                  </div>
                              </div>

                        </div>
                        <p className="text-2xl md:text-3xl text-gray-700 font-bold text-center mt-6 tracking-wide drop-shadow-sm">
                            Watch Cassidy tell her own story — then reflect on what you see!
                        </p>
                    </div>
                </FluidGlass>
            </motion.div>

            {/* Videos */}
            <VideoFrame url="8RO70HUkNcA" title="🎬 Cassidy Crowley Talks About Inventing The Baby Toon" />
            <VideoFrame url="BaUkuszb7dg" title="🦈 Shark Tank US | 10-Year-Old Entrepreneur Wows Sharks" />

            {/* Instructions Section */}
            <motion.div
                className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-sky-50/50 border-4 border-dashed border-sky-300 shadow-xl shadow-sky-100/50 relative overflow-hidden group cursor-default mt-16"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-60 group-hover:scale-125 transition-transform duration-700"></div>

                <motion.h2
                    className="text-4xl font-extrabold text-sky-900 mb-8 inline-block bg-sky-50 px-8 py-3 rounded-[2rem] border-4 border-sky-300 shadow-sm relative z-10"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                >
                    <Eye className="inline mr-3 mb-1" size={32} /> While Watching, Observe...
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {[
                        { emoji: "🔍", text: "What problem Cassidy noticed", color: "rose" },
                        { emoji: "🛠️", text: "How the solution was developed", color: "amber" },
                        { emoji: "✨", text: "What makes the Baby Toon spoon different from regular spoons", color: "emerald" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className={`p-8 rounded-[2.5rem] bg-${item.color}-50 border-4 border-${item.color}-200 shadow-lg flex flex-col items-center gap-4 text-center`}
                            whileHover={{ y: -5, scale: 1.03 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <span className="text-5xl">{item.emoji}</span>
                            <p className={`text-xl font-bold text-${item.color}-900`}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* 🎮 Simulation: Problem-Solution Matching */}
            <motion.div
                className="p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 to-blue-50 border-8 border-indigo-200 shadow-[0_16px_0_0_rgba(165,180,252,1)] relative overflow-hidden group cursor-default mt-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute -left-16 -top-16 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
                <motion.h2
                    className="text-4xl font-extrabold text-indigo-900 mb-4 relative z-10"
                    whileHover={{ scale: 1.05 }}
                >
                    🎮 Match the Problem to the Solution!
                </motion.h2>
                <p className="text-gray-700 text-2xl mb-8 font-medium relative z-10">
                    Tap a problem on the left, then tap its matching solution on the right.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Problems */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-extrabold text-indigo-700 uppercase tracking-wider">Problems</h3>
                        {problems.map((prob) => (
                            <motion.button
                                key={prob.id}
                                onClick={() => setSelectedProblem(prob.id)}
                                className={`p-6 rounded-[2rem] border-4 font-bold text-lg text-left transition-all ${
                                    selectedProblem === prob.id
                                        ? 'bg-indigo-200 border-indigo-500 scale-[1.02]'
                                        : matches[prob.id] !== null
                                            ? matches[prob.id] === correctMatches[prob.id]
                                                ? 'bg-emerald-100 border-emerald-400'
                                                : 'bg-red-100 border-red-300'
                                            : 'bg-white border-gray-200 hover:border-indigo-300'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-2xl mr-3">{prob.emoji}</span>
                                {prob.text}
                                {matches[prob.id] !== null && (
                                    <span className="block text-sm mt-1">
                                        → {solutions.find(s => s.id === matches[prob.id])?.text}
                                        {matches[prob.id] === correctMatches[prob.id] ? ' ✅' : ' ❌'}
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Solutions */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-extrabold text-indigo-700 uppercase tracking-wider">Solutions</h3>
                        {solutions.map((sol) => (
                            <motion.button
                                key={sol.id}
                                onClick={() => handleSolutionClick(sol.id)}
                                className={`p-6 rounded-[2rem] border-4 font-bold text-lg text-left transition-all ${
                                    selectedProblem !== null
                                        ? 'bg-white border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                                        : 'bg-white border-gray-200 opacity-70 cursor-default'
                                }`}
                                whileHover={selectedProblem !== null ? { scale: 1.02 } : {}}
                                whileTap={selectedProblem !== null ? { scale: 0.98 } : {}}
                            >
                                <span className="text-2xl mr-3">{sol.emoji}</span>
                                {sol.text}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Result */}
                {allMatched && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-8 p-8 rounded-[2rem] border-4 text-center relative z-10 ${
                            matchScore === 3
                                ? 'bg-emerald-100 border-emerald-400'
                                : 'bg-amber-100 border-amber-400'
                        }`}
                    >
                        <p className="text-3xl font-extrabold mb-2">
                            {matchScore === 3 ? '🏆 Perfect Matching!' : `👍 ${matchScore}/3 Correct!`}
                        </p>
                        <p className="text-xl font-medium text-gray-700">
                            {matchScore === 3
                                ? 'You understand how the Baby Toon Spoon solves each problem!'
                                : 'Tap problems again to try different matches.'}
                        </p>
                        {matchScore < 3 && (
                            <motion.button
                                onClick={() => { setMatches({ 0: null, 1: null, 2: null }); setSelectedProblem(null); }}
                                className="mt-4 px-6 py-3 bg-white rounded-2xl border-4 border-gray-200 font-bold text-gray-700 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🔄 Reset & Try Again
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </motion.div>

            {/* Reflection Questions */}
            <motion.div
                className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-violet-50/50 border-4 border-dashed border-violet-300 shadow-xl shadow-violet-100/50 relative overflow-hidden group cursor-default mt-16"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-60 group-hover:scale-125 transition-transform duration-700"></div>

                <motion.h2
                    className="text-4xl font-extrabold text-violet-900 mb-10 flex items-center gap-4 relative z-10"
                    whileHover={{ scale: 1.05, x: 10 }}
                >
                    <HelpCircle size={40} className="text-violet-600" /> Reflection Questions
                </motion.h2>

                <div className="flex flex-col gap-6 relative z-10">
                    {[
                        { q: "What inspired the invention?", emoji: "💡" },
                        { q: "How does the product help babies and parents?", emoji: "👨‍👩‍👧" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="p-8 rounded-[2.5rem] bg-violet-50 border-4 border-violet-200 shadow-sm flex items-center gap-6"
                            whileHover={{ x: 10, scale: 1.01 }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <span className="text-5xl flex-shrink-0">{item.emoji}</span>
                            <p className="text-2xl text-violet-900 font-bold">{item.q}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-10 p-8 bg-gradient-to-r from-violet-100 to-pink-100 rounded-[2rem] border-4 border-violet-200 shadow-inner relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-800 text-xl font-medium leading-relaxed">
                        <span className="font-extrabold text-violet-700">💡 Remember:</span> This part demonstrates how successful products often begin by solving a <span className="font-extrabold text-rose-600">real-life problem</span>.
                    </p>
                </motion.div>
            </motion.div>

            <ChapterFooter chapterName="1.2 — Watch & Learn" />
        </div>
    );
}
