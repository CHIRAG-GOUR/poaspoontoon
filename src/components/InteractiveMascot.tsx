import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function InteractiveMascot() {
    const mascotRef = useRef<HTMLDivElement>(null);
    const [factIndex, setFactIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    let funFacts: string[] = [];
    let gradientStyle = "";
    let mascotFace = "😊";

    if (location.pathname.includes("chapter-1.1")) {
        funFacts = [
            "Did you know? Cassidy was only 7 when she invented the Baby Toon! 🍼",
            "Simple observations can lead to amazing inventions! 💡",
            "The best ideas come from everyday problems! 🌟"
        ];
        gradientStyle = "from-orange-400 to-amber-400";
        mascotFace = "🍼";
    } else if (location.pathname.includes("chapter-1.2")) {
        funFacts = [
            "Cassidy pitched on Shark Tank at just 10 years old! 🦈",
            "Great inventions start with noticing a problem! 👀",
            "FDA-grade silicone is used in many baby products! 🧪"
        ];
        gradientStyle = "from-pink-500 to-rose-400";
        mascotFace = "🎬";
    } else if (location.pathname.includes("chapter-1.3")) {
        funFacts = [
            "Quiz time! Test what you've learned! 🧠",
            "Every wrong answer teaches you something new! 📚",
            "Inventors never stop asking questions! ❓"
        ];
        gradientStyle = "from-violet-500 to-purple-400";
        mascotFace = "🧩";
    } else if (location.pathname.includes("chapter-2.1")) {
        funFacts = [
            "The best inventions solve real everyday problems! 🔧",
            "Every invention starts with asking 'Why doesn\'t this exist?' 🤔",
            "Post-it Notes were invented by accident! Keep experimenting! 🗒️"
        ];
        gradientStyle = "from-lime-500 to-emerald-400";
        mascotFace = "💡";
    } else if (location.pathname.includes("chapter-2.2")) {
        funFacts = [
            "A great pitch is short, clear and exciting! ⚡",
            "Steve Jobs practised his presentations for weeks! 🍎",
            "Pitching your idea helps you understand it better! 🎤"
        ];
        gradientStyle = "from-sky-500 to-blue-400";
        mascotFace = "🎤";
    } else if (location.pathname.includes("chapter-2.3")) {
        funFacts = [
            "Velcro was inspired by burr seeds sticking to clothing! 🌱",
            "The youngest patent holder was 4 years old! 🏅",
            "Great inventors never stop learning and observing! 🌍"
        ];
        gradientStyle = "from-violet-500 to-purple-400";
        mascotFace = "🏆";
    } else {
        funFacts = ["Innovation starts with curiosity! 🔍"];
        gradientStyle = "from-green-500 to-emerald-400";
        mascotFace = "🥄";
    }

    useEffect(() => {
        setFactIndex(0);
    }, [location.pathname]);

    useEffect(() => {
        if (mascotRef.current) {
            gsap.to(mascotRef.current, {
                y: -15,
                rotation: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    const handleClick = () => {
        if (mascotRef.current) {
            gsap.fromTo(mascotRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            );
        }
        setFactIndex((prev) => (prev + 1) % funFacts.length);
    };

    return (
        <div className="fixed bottom-[10%] left-8 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20, y: 20 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                    x: isHovered ? 0 : -20,
                    y: isHovered ? 0 : 20
                }}
                className="absolute bottom-full left-full mb-4 w-64 bg-white p-4 rounded-3xl rounded-bl-sm shadow-xl border-4 border-amber-200 pointer-events-none origin-bottom-left"
            >
                <p className="text-gray-700 font-bold text-sm">{funFacts[factIndex]}</p>
                <p className="text-xs text-amber-400 mt-2 font-medium">Click me for another fact!</p>
            </motion.div>

            <div
                ref={mascotRef}
                className="cursor-pointer relative drop-shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <div className={`w-24 h-24 bg-gradient-to-tr ${gradientStyle} rounded-[40%_60%_70%_30%] flex flex-col items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group transition-all duration-700`}>
                    <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform duration-300">{mascotFace}</span>
                </div>
                <div className="w-16 h-4 bg-black/10 rounded-[100%] mx-auto mt-4 blur-md" />
            </div>
        </div>
    );
}
