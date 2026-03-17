import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function TopProgressBar() {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const progressPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed top-0 left-0 right-16 h-1.5 z-50 pointer-events-none">
            {/* Progress bar fill */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 z-10 overflow-hidden shadow-[0_2px_10px_rgba(34,197,94,0.5)] rounded-r-full bg-green-400"
                style={{ width: progressPercent }}
            >
                <motion.div
                    className="absolute inset-0 w-[200vw] bg-gradient-to-r from-emerald-300 via-green-500 to-teal-400 opacity-90"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
            </motion.div>

            {/* Spoon icon at progress tip */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center"
                style={{ left: progressPercent }}
            >
                    {/* Running Kid SVG */}
                <svg
                    viewBox="0 0 36 36"
                    className="w-9 h-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] z-30 -ml-4"
                >
                    {/* Head */}
                    <circle cx="18" cy="7" r="5.5" fill="#FDDCB5" />
                    {/* Hair */}
                    <path d="M12.5,5.5 Q18,0 23.5,5.5" fill="#92400E" />
                    {/* Eyes */}
                    <circle cx="16" cy="6.5" r="1" fill="#1f2937" />
                    <circle cx="20" cy="6.5" r="1" fill="#1f2937" />
                    {/* Smile */}
                    <path d="M15.5,9 Q18,11.5 20.5,9" stroke="#ef4444" strokeWidth="1" fill="none" strokeLinecap="round" />
                    {/* Body */}
                    <rect x="14" y="12.5" width="8" height="9" rx="4" fill="#3b82f6" />
                    {/* Arms - running pose */}
                    <line x1="14" y1="15" x2="9" y2="19" stroke="#FDDCB5" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="22" y1="15" x2="27" y2="12" stroke="#FDDCB5" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Legs - running pose */}
                    <line x1="15.5" y1="21.5" x2="11" y2="29" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="20.5" y1="21.5" x2="26" y2="27" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Shoes */}
                    <ellipse cx="10" cy="30" rx="2.5" ry="1.8" fill="#ef4444" />
                    <ellipse cx="27" cy="28" rx="2.5" ry="1.8" fill="#ef4444" />
                </svg>
            </motion.div>
        </div>
    );
}
