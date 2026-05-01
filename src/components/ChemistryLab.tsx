import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Zap, Thermometer, Wind, RefreshCw, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

// --- ELEMENT DATA ---
const ELEMENTS = [
  { symbol: 'H', name: 'Vodorod', mass: 1.008, color: 'bg-slate-200' },
  { symbol: 'He', name: 'Geliy', mass: 4.002, color: 'bg-blue-200' },
  { symbol: 'Li', name: 'Litiy', mass: 6.941, color: 'bg-red-300' },
  { symbol: 'Be', name: 'Berilliy', mass: 9.012, color: 'bg-emerald-300' },
  { symbol: 'B', name: 'Bor', mass: 10.81, color: 'bg-amber-300' },
  { symbol: 'C', name: 'Uglerod', mass: 12.011, color: 'bg-slate-700 text-white' },
  { symbol: 'N', name: 'Azot', mass: 14.007, color: 'bg-blue-500 text-white' },
  { symbol: 'O', name: 'Kislorod', mass: 15.999, color: 'bg-red-500 text-white' },
];

export const ChemistryLab: React.FC = () => {
  const [temp, setTemp] = useState(298); // Kelvin
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number; type: string }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        let nx = p.x + p.vx * (temp / 100);
        let ny = p.y + p.vy * (temp / 100);
        let nvx = p.vx;
        let nvy = p.vy;

        // Wall collisions
        if (nx < 5 || nx > 95) {
          nvx *= -1;
          nx = nx < 5 ? 5 : 95;
        }
        if (ny < 5 || ny > 95) {
          nvy *= -1;
          ny = ny < 5 ? 5 : 95;
        }

        return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [temp]);

  const addParticle = (type: string) => {
    if (particles.length > 25) return;
    const newP = {
      id: Math.random(),
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      type
    };
    setParticles([...particles, newP]);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
      {/* Simulation Box */}
      <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] md:rounded-3xl p-4 md:p-6 border border-slate-700 shadow-2xl relative overflow-hidden group">
        <div className="flex justify-between items-center mb-4 md:mb-6 relative z-10">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-white font-display font-bold uppercase tracking-widest text-[10px] md:text-sm">Molekulyar Dinamika</h3>
          </div>
          <div className="flex gap-2 md:gap-4">
             <div className="text-[10px] md:text-xs font-mono text-brand-400 bg-brand-500/10 px-2 md:px-3 py-1 rounded-full border border-brand-500/20">
               P: 1.01 atm
             </div>
             <div className="text-[10px] md:text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 md:px-3 py-1 rounded-full border border-emerald-500/20">
               T: {temp}K
             </div>
          </div>
        </div>

        <div className="h-[300px] md:h-[400px] bg-slate-950/50 rounded-xl md:rounded-2xl relative border border-white/5 scientific-grid" ref={canvasRef}>
          {particles.map(p => (
            <motion.div
              key={p.id}
              className={cn(
                "absolute w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border-2 border-white/20",
                p.type === 'H' ? 'bg-slate-300' : p.type === 'O' ? 'bg-red-500 text-white' : 'bg-brand-500 text-white'
              )}
              animate={{ left: `${p.x}%`, top: `${p.y}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              {p.type}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-sm animate-pulse" />
            </motion.div>
          ))}

          {particles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-display italic text-xs md:text-sm px-6 text-center">
              Laboratoriya bo'sh. Elementlarni qo'shing...
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-4 items-center relative z-10">
          <div className="w-full flex-1 space-y-2">
             <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tighter">
               <span>Haroratni nazorat qilish</span>
               <span>{temp} K</span>
             </div>
             <input 
               type="range" min="100" max="1000" value={temp} 
               onChange={(e) => setTemp(Number(e.target.value))}
               className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
             />
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <button 
              onClick={() => addParticle('H')}
              className="flex-1 md:flex-none px-4 py-3 md:py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-[10px] md:text-xs font-bold border border-white/10 transition-all active:scale-95"
            >
              + H
            </button>
            <button 
              onClick={() => addParticle('O')}
              className="flex-1 md:flex-none px-4 py-3 md:py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[10px] md:text-xs font-bold border border-white/10 transition-all active:scale-95"
            >
              + O
            </button>
            <button 
              onClick={() => setParticles([])}
              className="p-3 md:p-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors shrink-0"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lab Stats & Elements Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 w-full">
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-xl">
           <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
             <FlaskConical className="w-5 h-5 text-brand-500" />
             Reaksiya Ma'lumotlari
           </h4>
           <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kinetik Energiya</div>
                <div className="text-lg md:text-xl font-display font-bold text-slate-900">{(temp * particles.length * 0.01).toFixed(2)} eV</div>
              </div>
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Zarrachalar soni</div>
                <div className="text-lg md:text-xl font-display font-bold text-slate-900">{particles.length} mol</div>
              </div>
           </div>
        </div>

        <div className="bg-brand-600 rounded-3xl p-5 md:p-6 text-white shadow-xl shadow-brand-500/20 relative overflow-hidden flex flex-col justify-center">
           <Zap className="absolute top-4 right-4 w-10 md:w-12 h-10 md:h-12 opacity-10" />
           <h4 className="font-display font-bold mb-2 md:mb-3 text-sm md:text-base">Bilasizmi?</h4>
           <p className="text-xs md:text-sm opacity-90 leading-relaxed italic">
             "Harorat ko'tarilganda, molekulalarning kinetik energiyasi ortadi, bu esa reaksiyalarning tezlashishiga olib keladi."
           </p>
        </div>
      </div>
    </div>
  );
};

export const ChemistryGame: React.FC = () => {
  const [currentElement, setCurrentElement] = useState(ELEMENTS[0]);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState(false);
  const [streak, setStreak] = useState(0);

  const generateRound = () => {
    const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    setCurrentElement(el);
    
    const others = ELEMENTS.filter(e => e.symbol !== el.symbol)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(e => e.name);
    
    setOptions([...others, el.name].sort(() => Math.random() - 0.5));
    setIsWrong(false);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleAnswer = (name: string) => {
    if (name === currentElement.name) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      generateRound();
    } else {
      setIsWrong(true);
      setStreak(0);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden max-w-2xl mx-auto">
      <div className="bg-brand-500 p-6 md:p-8 text-white relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
            <span className="font-bold text-sm md:text-base tracking-wider">{score} ball</span>
          </div>
          <div className="px-2 md:px-3 py-1 bg-white/20 rounded-full text-[10px] md:text-xs font-bold ring-1 ring-white/30 backdrop-blur-sm">
            STREAK: {streak} 🔥
          </div>
        </div>

        <div className="flex flex-col items-center">
          <motion.div 
            key={currentElement.symbol}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "w-24 h-32 md:w-32 md:h-40 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center shadow-2xl border-4 border-white/30",
              currentElement.color
            )}
          >
            <span className="text-4xl md:text-5xl font-display font-black">{currentElement.symbol}</span>
            <span className="text-[8px] md:text-[10px] mt-1 md:mt-2 opacity-70 font-mono tracking-widest">{currentElement.mass}</span>
          </motion.div>
          <div className="mt-4 md:mt-6 text-center">
             <p className="text-white/70 text-[10px] md:text-sm font-medium mb-1 uppercase tracking-widest">Bu qaysi element?</p>
             <h3 className="text-xl md:text-2xl font-display font-bold px-4">Davriy Jadval Sinovi</h3>
          </div>
        </div>
      </div>

      <div className={cn(
        "p-6 md:p-8 grid grid-cols-2 gap-3 md:gap-4 transition-colors duration-300",
        isWrong ? "bg-red-50" : "bg-white"
      )}>
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="py-3 md:py-4 px-3 md:px-6 bg-slate-50 hover:bg-brand-50 hover:border-brand-500 border-2 border-slate-100 rounded-xl md:rounded-2xl font-bold text-slate-700 transition-all active:scale-95 text-xs md:text-sm"
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="p-3 md:p-4 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Kimyoviy elementlarni o'rganish va o'z bilimingizni sinab ko'ring
        </p>
      </div>
    </div>
  );
};
