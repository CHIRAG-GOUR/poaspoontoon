import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function BottomProgressRing() {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const pathLength = 251.2;
    const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);
    const angleRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

    return (
        <div className="fixed bottom-8 right-8 z-50 pointer-events-none flex items-center justify-center w-24 h-24">
            {/* Pulsing glow */}
            <motion.div
                className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Track ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-amber-900/30" strokeWidth="8" fill="none" />
                <motion.circle
                    cx="50" cy="50" r="40"
                    className="stroke-amber-400"
                    strokeWidth="8" strokeLinecap="round" fill="none"
                    strokeDasharray={pathLength}
                    style={{ strokeDashoffset }}
                />
            </svg>

            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center flex-col drop-shadow-md">
                <motion.span className="text-amber-600 font-extrabold text-xl ml-1">
                    {useTransform(smoothProgress, p => Math.round(p * 100))}
                </motion.span>
                <span className="text-amber-800 text-[10px] font-bold -mt-1">%</span>
            </div>

            {/* Orbiting spoon */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0"
                style={{ rotate: angleRotation }}
            >
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <motion.div
                        className="absolute -left-1 w-3 h-1.5 bg-amber-300 rounded-full blur-[2px]"
                        animate={{ width: ["8px", "14px", "8px"], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    />
                    <svg viewBox="0 0 30 30" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(251,191,36,1)] z-10 rotate-90">
                        <ellipse cx="15" cy="10" rx="8" ry="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
                        <rect x="13" y="16" width="4" height="12" rx="2" fill="#F59E0B" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
