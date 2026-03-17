import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Baby, Lightbulb, Shield, Palette, Shapes, PawPrint } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';

/* Typewriter-then-blur-in heading animation */
function TypeRevealText({ text }: { text: string }) {
    return (
        <h1 className="text-6xl md:text-8xl font-extrabold font-outfit drop-shadow-sm mb-4 flex justify-center tracking-tight text-center flex-wrap gap-x-4 md:gap-x-6">
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-amber-700 via-orange-500 to-rose-500"
                            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: (wordIndex * 5 + i) * 0.07,
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

export default function ChapterOne() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const headerY = useTransform(scrollY, [0, 400], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headerScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    // Simulation state
    const [simMaterial, setSimMaterial] = useState<string | null>(null);
    const [simShape, setSimShape] = useState<string | null>(null);
    const [simFeature, setSimFeature] = useState<string | null>(null);
    const simComplete = simMaterial && simShape && simFeature;

    const materialOptions = [
        { id: "silicone", label: "Soft Silicone", emoji: "🧴", safe: true },
        { id: "metal", label: "Hard Metal", emoji: "🔩", safe: false },
        { id: "wood", label: "Plain Wood", emoji: "🪵", safe: false },
    ];
    const shapeOptions = [
        { id: "short-round", label: "Short & Rounded", emoji: "🥄", safe: true },
        { id: "long-thin", label: "Long & Thin", emoji: "📏", safe: false },
        { id: "sharp-edge", label: "Sharp Edges", emoji: "🔪", safe: false },
    ];
    const featureOptions = [
        { id: "animal-handle", label: "Fun Animal Handle", emoji: "🐻", safe: true },
        { id: "no-grip", label: "No Grip", emoji: "❌", safe: false },
        { id: "bright-colors", label: "Bright Colors", emoji: "🌈", safe: true },
    ];

    const safeCount = [
        materialOptions.find(m => m.id === simMaterial)?.safe,
        shapeOptions.find(s => s.id === simShape)?.safe,
        featureOptions.find(f => f.id === simFeature)?.safe,
    ].filter(Boolean).length;

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
                    className="bg-white/40 backdrop-blur-2xl px-12 py-12 rounded-[3.5rem] border-[4px] border-white/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] min-w-[300px]"
                >
                    <span className="text-xl font-bold text-gray-700 tracking-[0.2em] uppercase mb-4 block opacity-70">Chapter 1.1</span>
                    <TypeRevealText text="INTRODUCTION" />
                    <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                        Discover the inspiring story behind the Baby Toon Spoon and how simple observations can lead to amazing inventions.
                    </p>
                </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="flex flex-col gap-16 pb-32 mt-[-5vh]">

                {/* Discussion Starter */}
                <FluidGlass>
                    <motion.h2
                        className="text-4xl font-extrabold text-green-900 mb-8 flex items-center gap-4 cursor-default"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        <span className="text-5xl">💬</span> Let's Start a Discussion!
                    </motion.h2>
                    <p className="text-gray-800 text-2xl font-medium mb-8 leading-relaxed">
                        The session begins with a short discussion about babies and feeding time. Think about these questions:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { emoji: "👶", q: "Have you ever seen a baby eating with a spoon?", color: "pink" },
                            { emoji: "⚠️", q: "Are regular spoons always safe for babies?", color: "amber" },
                            { emoji: "🤔", q: "What could happen if a spoon is too big for a baby?", color: "red" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={`p-8 rounded-[2.5rem] bg-white border-4 border-${item.color}-200 shadow-[0_10px_0_0_rgba(0,0,0,0.05)] flex flex-col gap-4 cursor-default`}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-5xl">{item.emoji}</span>
                                <p className="text-gray-800 text-xl font-bold leading-relaxed">{item.q}</p>
                            </motion.div>
                        ))}
                    </div>
                </FluidGlass>

                {/* Cassidy's Story */}
                <motion.div
                    className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-amber-50/50 border-4 border-dashed border-amber-300 shadow-xl shadow-amber-100/50 relative overflow-hidden group cursor-default"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-pastel-orange rounded-[40%_60%_70%_30%] blur-3xl opacity-50 animate-[spin_10s_linear_infinite] group-hover:scale-125 transition-transform duration-700"></div>

                    <motion.h2
                        className="text-4xl font-extrabold text-amber-900 mb-8 inline-block bg-pastel-yellow px-8 py-3 rounded-[2rem] border-4 border-amber-300 shadow-sm relative z-10"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        🌟 The Story of Cassidy Crowley
                    </motion.h2>

                    <p className="text-gray-700 text-2xl mb-10 leading-relaxed font-medium relative z-10 transform transition-transform group-hover:translate-x-2">
                        This discussion introduces the inspiring story of <span className="font-extrabold text-amber-700 bg-amber-50 px-2 rounded-lg">Cassidy Crowley</span>, a young innovator who noticed that traditional baby spoons could go too far into a baby's mouth and might not always be safe.
                    </p>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-10 rounded-[2.5rem] border-4 border-amber-200 shadow-inner relative z-10 mb-8">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="bg-amber-100 p-5 rounded-[1.5rem] border-4 border-amber-300">
                                <Lightbulb className="text-amber-600" size={48} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-amber-900">A 7-Year-Old Inventor!</h3>
                                <p className="text-xl text-gray-600 font-medium mt-2">At just 7 years old, Cassidy created a special spoon called the <span className="font-extrabold text-orange-600">Baby Toon Spoon</span> to make feeding babies safer and easier.</p>
                            </div>
                        </div>
                    </div>

                    {/* Cassidy Photo */}
                      <div className="flex flex-col md:flex-row items-center gap-8 z-10 relative">
                          <div className="rounded-[2rem] overflow-hidden border-4 border-amber-200 shadow-lg flex-1">
                              <img
                                  src="https://login.skillizee.io/s/articles/69b795b44bf983c9eab75c3a/images/Baby toon spoon.jpg"
                                  alt="Cassidy Crowley - Young Inventor"
                                  className="w-full h-auto object-cover mx-auto"
                              />
                          </div>
                      </div>
                </motion.div>

                {/* Baby Toon Spoon Features */}
                <motion.div
                    className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-green-50/50 border-4 border-dashed border-green-300 shadow-xl shadow-green-100/50 relative overflow-hidden group cursor-default"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <motion.h2
                        className="text-4xl font-extrabold text-green-900 mb-10 flex items-center gap-4"
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <span className="bg-white text-green-600 px-4 py-2 rounded-xl shadow-sm border-2 border-green-200">🥄</span>
                        The Baby Toon Spoon
                    </motion.h2>

                    {/* Spoon Image */}
                    <div className="rounded-[2.5rem] overflow-hidden mb-10 border-[8px] border-gray-100 shadow-xl transform group-hover:rotate-1 transition-transform group-hover:scale-[1.02] duration-500">
                        <img
                            src="https://login.skillizee.io/s/articles/69b795b44bf983c9eab75c3a/images/image-20260316110134-1.png"
                            alt="Baby Toon Spoon"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Baby Toon Spoon Close-up Photo */}
                    <div className="w-64 h-64 mx-auto overflow-hidden border-4 border-green-200 shadow-lg mb-10 rounded-xl">
                        <img
                            src="https://login.skillizee.io/s/articles/69b795b44bf983c9eab75c3a/images/Baby toon spoon2.jpg"
                            alt="Baby Toon Spoon Close-up"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <Shield className="text-blue-600" size={40} />,
                                title: "Soft FDA-Grade Silicone",
                                desc: "Made from safe, food-grade silicone that's gentle and non-toxic.",
                                borderColor: "border-blue-200",
                                shadowColor: "rgba(147,197,253,1)",
                                bgColor: "bg-blue-50"
                            },
                            {
                                icon: <Baby className="text-pink-600" size={40} />,
                                title: "Short & Rounded Design",
                                desc: "Prevents the spoon from going too far into a baby's mouth.",
                                borderColor: "border-pink-200",
                                shadowColor: "rgba(251,207,232,1)",
                                bgColor: "bg-pink-50"
                            },
                            {
                                icon: <Lightbulb className="text-amber-600" size={40} />,
                                title: "Gentle on Gums",
                                desc: "The soft material is gentle and comfortable for babies' sensitive gums.",
                                borderColor: "border-amber-200",
                                shadowColor: "rgba(252,211,77,1)",
                                bgColor: "bg-amber-50"
                            },
                            {
                                icon: <Shield className="text-green-600" size={40} />,
                                title: "Safety First",
                                desc: "Prevents the spoon from going too far into a baby's mouth — keeping baby safe.",
                                borderColor: "border-green-200",
                                shadowColor: "rgba(134,239,172,1)",
                                bgColor: "bg-green-50"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                    className={`p-8 rounded-[2.5rem] bg-white border-4 ${feature.borderColor} shadow-lg flex flex-col gap-4`}
                                whileHover={{ y: -5, scale: 1.02 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={`${feature.bgColor} p-4 rounded-[1.5rem] w-max border-2 ${feature.borderColor}`}>
                                    {feature.icon}
                                </div>
                                <h4 className="font-extrabold text-2xl text-gray-800">{feature.title}</h4>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Fun & Educational Section */}
                <motion.div
                    className="p-12 rounded-[2rem] bg-gradient-to-br from-white to-purple-50/50 border-4 border-dashed border-purple-300 shadow-xl shadow-purple-100/50 relative overflow-hidden group cursor-default"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-pastel-purple rounded-[40%_60%_70%_30%] blur-3xl opacity-40 animate-[spin_12s_linear_infinite] group-hover:scale-125 transition-transform duration-700"></div>

                    <motion.h2
                        className="text-4xl font-extrabold text-purple-900 mb-8 relative z-10"
                        whileHover={{ scale: 1.05, rotate: -1 }}
                    >
                        🎓 Fun & Educational Too!
                    </motion.h2>

                    <p className="text-gray-700 text-2xl mb-10 leading-relaxed font-medium relative z-10">
                        The spoon is also designed to make feeding fun and educational by introducing babies to:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {[
                            { icon: <Palette size={48} className="text-pink-500" />, label: "Colors", bg: "bg-pink-50", border: "border-pink-300", shadow: "shadow-[0_8px_0_0_rgba(249,168,212,1)]" },
                            { icon: <Shapes size={48} className="text-blue-500" />, label: "Shapes", bg: "bg-blue-50", border: "border-blue-300", shadow: "shadow-[0_8px_0_0_rgba(147,197,253,1)]" },
                            { icon: <PawPrint size={48} className="text-amber-500" />, label: "Animals", bg: "bg-amber-50", border: "border-amber-300", shadow: "shadow-[0_8px_0_0_rgba(252,211,77,1)]" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={`p-10 rounded-[2.5rem] bg-white border-4 ${item.border} ${item.shadow} flex flex-col items-center gap-5 cursor-default`}
                                whileHover={{ y: -8, scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, type: "spring" }}
                            >
                                <div className={`${item.bg} p-5 rounded-[1.5rem] border-2 ${item.border}`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-extrabold text-3xl text-gray-800">{item.label}</h4>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 🎮 Simulation: Design Your Own Safe Spoon */}
                <motion.div
                    className="p-12 rounded-[3rem] bg-gradient-to-br from-teal-50 to-cyan-50 border-8 border-teal-200 shadow-[0_16px_0_0_rgba(94,234,212,1)] relative overflow-hidden group cursor-default"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-40"></div>
                    <motion.h2
                        className="text-4xl font-extrabold text-teal-900 mb-4 relative z-10"
                        whileHover={{ scale: 1.05 }}
                    >
                        🎮 Design Your Own Safe Spoon!
                    </motion.h2>
                    <p className="text-gray-700 text-2xl mb-10 font-medium relative z-10">
                        Pick the best choices for a baby-safe spoon. Can you make it as safe as Cassidy's design?
                    </p>

                    {/* Material */}
                    <div className="mb-8 relative z-10">
                        <h3 className="text-2xl font-extrabold text-teal-800 mb-4">1. Choose Material</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {materialOptions.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    onClick={() => setSimMaterial(opt.id)}
                                    className={`p-6 rounded-[2rem] border-4 font-bold text-xl transition-all ${simMaterial === opt.id
                                        ? opt.safe
                                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]'
                                            : 'bg-red-100 border-red-400 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300'
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="text-3xl block mb-2">{opt.emoji}</span>
                                    {opt.label}
                                    {simMaterial === opt.id && (
                                        <span className="block text-sm mt-1">{opt.safe ? '✅ Safe!' : '⚠️ Not safe for babies'}</span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Shape */}
                    <div className="mb-8 relative z-10">
                        <h3 className="text-2xl font-extrabold text-teal-800 mb-4">2. Choose Shape</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {shapeOptions.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    onClick={() => setSimShape(opt.id)}
                                    className={`p-6 rounded-[2rem] border-4 font-bold text-xl transition-all ${simShape === opt.id
                                        ? opt.safe
                                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]'
                                            : 'bg-red-100 border-red-400 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300'
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="text-3xl block mb-2">{opt.emoji}</span>
                                    {opt.label}
                                    {simShape === opt.id && (
                                        <span className="block text-sm mt-1">{opt.safe ? '✅ Safe!' : '⚠️ Not safe for babies'}</span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Feature */}
                    <div className="mb-8 relative z-10">
                        <h3 className="text-2xl font-extrabold text-teal-800 mb-4">3. Choose a Feature</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {featureOptions.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    onClick={() => setSimFeature(opt.id)}
                                    className={`p-6 rounded-[2rem] border-4 font-bold text-xl transition-all ${simFeature === opt.id
                                        ? opt.safe
                                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-[0_6px_0_0_rgba(16,185,129,1)]'
                                            : 'bg-red-100 border-red-400 text-red-800 shadow-[0_6px_0_0_rgba(239,68,68,1)]'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300'
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="text-3xl block mb-2">{opt.emoji}</span>
                                    {opt.label}
                                    {simFeature === opt.id && (
                                        <span className="block text-sm mt-1">{opt.safe ? '✅ Great choice!' : '⚠️ Not the best'}</span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Result */}
                    {simComplete && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-8 rounded-[2rem] border-4 relative z-10 text-center ${safeCount === 3
                                ? 'bg-emerald-100 border-emerald-400'
                                : safeCount >= 2
                                    ? 'bg-amber-100 border-amber-400'
                                    : 'bg-red-100 border-red-400'
                            }`}
                        >
                            <p className="text-3xl font-extrabold mb-2">
                                {safeCount === 3 ? '🏆 Perfect Design!' : safeCount >= 2 ? '👍 Almost There!' : '🔄 Try Again!'}
                            </p>
                            <p className="text-xl font-medium text-gray-700">
                                Your spoon scored {safeCount}/3 safety points.
                                {safeCount === 3 && ' You designed a spoon just like Cassidy!'}
                                {safeCount < 3 && ' Tap different options to make it safer.'}
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Summary Insight */}
                <motion.div
                    className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-10 rounded-[2rem] border-4 border-gray-600/50 text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden cursor-default"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <Lightbulb size={260} />
                    </div>
                    <h3 className="text-3xl font-extrabold mb-6 flex items-center gap-4 text-amber-300">✨ Key Takeaway</h3>
                    <p className="text-gray-200 text-2xl leading-relaxed relative z-10 font-medium">
                        This example highlights how <span className="text-amber-300 font-extrabold">simple observations</span> can lead to <span className="text-green-300 font-extrabold">meaningful inventions</span>. Great ideas often come from noticing everyday problems — just like Cassidy did at the age of 7!
                    </p>
                </motion.div>

                <ChapterFooter chapterName="1.1 — Introduction of the Activity" />
            </div>
        </div>
    );
}
