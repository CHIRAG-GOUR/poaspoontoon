import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Presentation, MessageCircle, Star, Target, Users, Megaphone, Plus, Award } from 'lucide-react';
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
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400"
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

export default function ChapterFive() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic synced with ChapterOne
    const headerY = useTransform(scrollY, [0, 400], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headerScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    const presentationPoints = [
        { icon: <Target className="text-red-500" />, text: "The problem identified", color: "red" },
        { icon: <Star className="text-yellow-500" />, text: "The creative product idea", color: "yellow" },
        { icon: <Users className="text-emerald-500" />, text: "How the invention helps people", color: "emerald" }
    ];

    const discussionQuestions = [
        "How does the invention work?",
        "Why was this problem chosen?",
        "How could the idea be improved?"
    ];

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
                    <span className="text-xl font-bold text-gray-700 tracking-[0.2em] uppercase mb-4 block opacity-70">Chapter 2.2</span>
                    <TypeRevealText text="DISCUSSION & PRESENTATION" />
                    <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                        Share your ideas with the group and learn to pitch your invention!  
                    </p>
                </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="flex flex-col gap-16 pb-32 mt-[-5vh]">

                {/* Team Presentation Section */}
                <FluidGlass>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-blue-100 p-4 rounded-3xl flex-shrink-0">
                            <Presentation size={40} className="text-blue-600" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-blue-900">Present Your Invention</h2>
                    </div>

                    <p className="text-2xl text-gray-800 font-bold mb-8">
                        Each team will present its invention to the group.
                    </p>

                    <h3 className="text-xl font-extrabold text-gray-500 uppercase tracking-wider mb-4">Presentations must include:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {presentationPoints.map((pt, idx) => (
                            <motion.div 
                                key={idx}
                                className={`bg-${pt.color}-50 border-4 border-${pt.color}-200 p-6 rounded-3xl flex flex-col items-center text-center gap-4 shadow-sm hover:scale-105 transition-transform`}
                            >
                                <div className="p-3 bg-white rounded-full shadow-sm">
                                    {pt.icon}
                                </div>
                                <p className="text-lg font-bold text-gray-800">{pt.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image from Prompt */}
                    <div className="rounded-[2.5rem] overflow-hidden mb-10 border-[8px] border-blue-50 shadow-xl transform hover:scale-[1.01] transition-transform duration-500">
                        <img
                            src="https://login.skillizee.io/s/articles/69b9024a2b4a4362e4c8f0a7/images/image-20260317125725-1.png"
                            alt="Discussion Time"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </FluidGlass>

                {/* The Pitch & Discussion */}
                <FluidGlass>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-sky-100 p-4 rounded-3xl flex-shrink-0">
                            <Megaphone size={40} className="text-sky-600" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-sky-900">What is a Pitch?</h2>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className="flex-1 bg-white/60 p-8 rounded-3xl border-4 border-sky-200 shadow-inner h-full flex flex-col justify-center">
                            <p className="text-2xl text-gray-800 font-bold mb-4">
                                A pitch is a short and convincing explanation of a product idea.
                            </p>
                            <p className="text-xl text-gray-600 font-medium">
                                Each team shares a short pitch explaining why their invention is useful and innovative!
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <MessageCircle size={24} /> Discussion Questions
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                        {discussionQuestions.map((q, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4 bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm"
                            >
                                <div className="bg-sky-100 text-sky-700 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    ?
                                </div>
                                <p className="text-xl font-bold text-gray-800">{q}</p>
                            </motion.div>
                        ))}
                    </div>
                </FluidGlass>

                {/* Bonus Brownie Points System */}
                <FluidGlass>
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-amber-100 p-4 rounded-3xl flex-shrink-0">
                                    <Award size={40} className="text-amber-600" />
                                </div>
                                <h2 className="text-4xl font-extrabold text-amber-900">Bonus Brownie Points</h2>
                            </div>
                            <p className="text-2xl text-gray-800 font-bold">
                                Participation is encouraged through a Brownie Points system!
                            </p>

                        </div>                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-orange-50 border-4 border-orange-200 p-8 rounded-3xl flex items-start gap-4 hover:shadow-md transition-shadow">
                            <Plus size={32} className="text-orange-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-2xl font-extrabold text-orange-800 mb-2">1 Point</h4>
                                <p className="text-lg font-medium text-gray-700">Earned for each thoughtful question asked during presentations.</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border-4 border-amber-200 p-8 rounded-3xl flex items-start gap-4 hover:shadow-md transition-shadow">
                            <Award size={32} className="text-amber-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-2xl font-extrabold text-amber-800 mb-2">Special Reward</h4>
                                <p className="text-lg font-medium text-gray-700">Collect 5 Brownie Points to earn a special reward or certificate!</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-50 border-2 border-stone-200 p-8 rounded-3xl">
                        <h3 className="text-lg font-extrabold text-gray-500 uppercase tracking-wider mb-6 text-center">This system encourages</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Curiosity', 'Confidence', 'Active Listening'].map((skill, idx) => (
                                <span key={idx} className="bg-white px-6 py-3 rounded-full font-bold text-xl text-amber-700 shadow-sm border border-stone-200 flex items-center gap-2">
                                    <Star size={20} className="text-amber-400" fill="currentColor" />
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </FluidGlass>

            </div>
            <ChapterFooter chapterName="2.2 — Discussion Time & Presentation" />       
        </div>
    );
}