import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KeyRound, Sparkles, Lightbulb, Puzzle, Rocket, Users2, MessageSquareText } from 'lucide-react';
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

export default function ChapterSix() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic synced with ChapterOne
    const headerY = useTransform(scrollY, [0, 400], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headerScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    const learnings = [
        { icon: <Lightbulb size={32} className="text-yellow-500" />, title: "Creative Thinking", desc: "Thinking of new ideas and inventions.", color: "yellow" },
        { icon: <Puzzle size={32} className="text-blue-500" />, title: "Problem Solving", desc: "Finding solutions to everyday problems.", color: "blue" },
        { icon: <Rocket size={32} className="text-purple-500" />, title: "Entrepreneurial Mindset", desc: "Understanding how ideas can become products.", color: "purple" },
        { icon: <MessageSquareText size={32} className="text-rose-500" />, title: "Communication Skills", desc: "Presenting ideas confidently.", color: "rose" },
        { icon: <Users2 size={32} className="text-emerald-500" />, title: "Collaboration", desc: "Working with teammates and listening to others.", color: "emerald" }
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
                    <span className="text-xl font-bold text-teal-700 tracking-[0.2em] uppercase mb-4 block opacity-70">Chapter 2.3</span>
                    <TypeRevealText text="KEY TAKEAWAYS" />
                    <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                        What did we learn from Cassidy and our own inventions?  
                    </p>
                </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="flex flex-col gap-16 pb-32 mt-[-5vh]">

                {/* Powerful Innovations */}
                <FluidGlass>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="bg-purple-100 p-4 rounded-3xl flex-shrink-0">
                            <KeyRound size={40} className="text-purple-600" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-purple-900">The Power of Small Ideas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border-4 border-fuchsia-200 shadow-sm flex flex-col gap-4"
                        >
                            <span className="text-5xl">👀</span>
                            <p className="text-xl font-bold text-gray-800 leading-relaxed">
                                Great inventions often begin with simple observations.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-[2rem] border-4 border-purple-200 shadow-sm flex flex-col gap-4"
                        >
                            <span className="text-5xl">🥄</span>
                            <p className="text-xl font-bold text-gray-800 leading-relaxed">
                                The story of Cassidy Crowley shows how noticing a small everyday problem can lead to a creative and successful product like the Baby Toon Spoon.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-[2rem] border-4 border-pink-200 shadow-sm flex flex-col gap-4"
                        >
                            <span className="text-5xl">🌱</span>
                            <p className="text-xl font-bold text-gray-800 leading-relaxed">
                                Even small ideas can grow into powerful innovations that improve everyday life.
                            </p>
                        </motion.div>
                    </div>
                </FluidGlass>

                {/* What Students Learn */}
                <FluidGlass>
                      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                          <div className="flex items-center gap-4 flex-1">
                              <div className="bg-teal-100 p-4 rounded-3xl flex-shrink-0">
                                  <Sparkles size={40} className="text-teal-600" />
                              </div>
                              <h2 className="text-4xl font-extrabold text-teal-900">What We Learned</h2>
                          </div>
                      </div>

                    <div className="flex flex-col gap-6">
                        {learnings.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-${item.color}-50 border-4 border-${item.color}-200 p-6 rounded-[2rem] flex items-center gap-6 hover:scale-[1.01] transition-transform`}
                            >
                                <div className={`p-4 bg-white rounded-2xl shadow-sm border-2 border-${item.color}-100`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-extrabold text-${item.color}-900 mb-1`}>{item.title}</h3>
                                    <p className="text-lg font-medium text-gray-700">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-white p-8 rounded-[2.5rem] border-[6px] border-emerald-300 shadow-xl text-center relative overflow-hidden"
                    >
                        <div className="absolute -right-10 -top-10 opacity-20"><Sparkles size={120} className="text-emerald-500" /></div>
                        <p className="text-2xl font-black text-emerald-950 leading-relaxed relative z-10">
                            This activity helps students realize that even small ideas can grow into big innovations. Just like Cassidy, they can become young inventors who make the world a little better! 🌍
                        </p>
                    </motion.div>
                </FluidGlass>

            </div>
            <ChapterFooter chapterName="2.3 — Key Takeaways" />       
        </div>
    );
}