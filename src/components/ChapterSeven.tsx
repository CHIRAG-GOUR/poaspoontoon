import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, HelpCircle } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';

function TypeRevealText({ text }: { text: string }) {
    return (
        <h1 className="text-5xl md:text-7xl font-extrabold font-outfit drop-shadow-sm mb-4 flex justify-center tracking-tight text-center flex-wrap gap-x-4 md:gap-x-6">
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500"
                            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: (wordIndex * 5 + i) * 0.05,
                                ease: "easeOut",
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </h1>
    );
}

const RIDDLES = [
    {
        q: "I help babies eat their food,\nSoft and gentle, never rude.\nShort and round so they stay safe,\nWhat am I in the feeding space?",
        a: "Baby spoon / Baby Toon spoon"
    },
    {
        q: "I see a problem big or small,\nThen I create a fix for all.\nIdeas, drawings, plans I make,\nWhat am I for goodness sake?",
        a: "An Inventor"
    },
    {
        q: "I'm not a toy, I'm not a game,\nBut solving problems is my aim.\nKids can do it, adults too,\nTurning ideas into something new.",
        a: "Innovation / Invention"
    },
    {
        q: "I hold your books and travel far,\nBut sometimes I feel heavy like a car.\nInvent something to make me light,\nWhat everyday item am I?",
        a: "School bag"
    },
    {
        q: "I keep your drink safe for the day,\nBut sometimes I leak along the way.\nInventors may improve my design,\nWhat school item am I?",
        a: "Water bottle"
    },
    {
        q: "Bonus Fun Riddle:\n\nI start as a tiny thought in your head,\nWith drawings and colors I'm carefully spread.\nI solve a problem people face,\nSoon I might be sold in every place.\nWhat am I?",
        a: "An invention / product idea"
    }
];

function RiddleCard({ riddle, index }: { riddle: {q: string, a: string}, index: number }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <motion.div
            className="p-8 rounded-[2rem] bg-white border-4 border-purple-100 shadow-lg relative overflow-hidden group cursor-default flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 text-purple-50 opacity-50 rotate-12 scale-150 pointer-events-none">
                <HelpCircle size={120} />
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-purple-100 text-purple-700 font-black px-4 py-2 rounded-xl text-lg border-2 border-purple-200">
                        {index === RIDDLES.length - 1 ? "BONUS" : `#${index + 1}`}
                    </span>
                </div>
                <p className="text-2xl text-gray-800 font-bold leading-relaxed whitespace-pre-line mb-8">
                    {riddle.q}
                </p>
            </div>

            <div className="relative z-10 mt-auto pointer-events-auto">
                <AnimatePresence mode="wait">
                    {!revealed ? (
                        <motion.button
                            key="btn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setRevealed(true)}
                            className="w-full py-4 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xl transition-colors border-2 border-purple-300 border-dashed flex items-center justify-center gap-2"
                        >
                            <Sparkles size={24} /> Reveal Answer
                        </motion.button>
                    ) : (
                        <motion.div
                            key="ans"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-4"
                        >
                            <div className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-extrabold text-2xl text-center shadow-inner border-2 border-purple-600">
                                {riddle.a}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function ChapterSeven() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic synced with ChapterOne
    const headerY = useTransform(scrollY, [0, 400], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headerScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    return (
        <div className="w-full max-w-5xl mx-auto px-6" ref={containerRef}>      

            {/* Parallax Header */}
            <motion.header
                style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
                className="h-[60vh] flex flex-col justify-center items-center text-center pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white/40 backdrop-blur-2xl px-12 py-12 rounded-[3.5rem] border-[4px] border-white/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] min-w-[300px] flex flex-col items-center"
                >
                    <span className="text-xl font-bold text-gray-700 tracking-[0.2em] uppercase mb-4 block opacity-70">Chapter 2.4</span>
                    <TypeRevealText text="MIND-BOGGLING RIDDLES" />
                    <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                        Time to put your thinking caps on! Can you guess the answers to these inventor riddles?
                    </p>
                </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="flex flex-col gap-16 pb-32 mt-[-5vh]">

                <FluidGlass>
                      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                          <div className="flex items-center gap-4 flex-1">
                              <div className="bg-purple-100 p-4 rounded-3xl flex-shrink-0">
                                  <Brain size={40} className="text-purple-600" />
                              </div>
                              <h2 className="text-4xl font-extrabold text-purple-900">Riddle Time!</h2>
                          </div>
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {RIDDLES.map((riddle, idx) => (
                            <RiddleCard key={idx} riddle={riddle} index={idx} />
                        ))}
                    </div>
                </FluidGlass>

            </div>
            <ChapterFooter chapterName="2.4 — Mind-Boggling Riddles" />       
        </div>
    );
}