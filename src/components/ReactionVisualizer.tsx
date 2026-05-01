import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Thermometer, Zap } from 'lucide-react';

export const ReactionVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group">
      {/* Background light effects */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-brand-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative z-10 text-center lg:text-left">
        <div className="lg:w-1/2 space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
            <Zap className="w-3 h-3 md:w-4 md:h-4" /> Eksotermik Reaksiya
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
            2H₂ + O₂ → 2H₂O <br />
            <span className="text-lg md:text-xl font-mono text-slate-500">+ Energiya (⚡)</span>
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            Vodorod va kislorod molekulalarining to'qnashuvi natijasida suv hosil bo'lishi va katta miqdorda energiya ajralib chiqishi jarayoni. Bu jarayonni vizual o'rganish reaksion kinetikani tushunishga yordam beradi.
          </p>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4">
             <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl">
               <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mb-1">Entalpiya (ΔH)</div>
               <div className="text-xs md:text-emerald-400 font-mono">-286 kJ/mol</div>
             </div>
             <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl">
               <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mb-1">Aktivlanish</div>
               <div className="text-xs md:text-brand-400 font-mono">Past (Katalizator)</div>
             </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center p-4">
          <div className="relative scale-90 md:scale-100">
            {/* The Beaker / Flask Visual */}
            <div className="w-64 h-80 relative">
               <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                 {/* Liquid */}
                 <motion.path
                   d="M20 100 L80 100 L75 40 L25 40 Z"
                   fill="rgba(14, 165, 233, 0.4)"
                   animate={{ 
                     d: [
                       "M20 105 L80 105 L75 45 L25 45 Z",
                       "M20 100 L80 100 L75 40 L25 40 Z",
                       "M20 105 L80 105 L75 45 L25 45 Z"
                     ]
                   }}
                   transition={{ duration: 4, repeat: Infinity }}
                 />
                 {/* Bubbles inside liquid */}
                 {[...Array(8)].map((_, i) => (
                   <motion.circle
                     key={i}
                     r={Math.random() * 2 + 1}
                     fill="white"
                     opacity="0.6"
                     initial={{ cx: 30 + Math.random() * 40, cy: 90 }}
                     animate={{ 
                       cy: [90, 45],
                       opacity: [0, 0.6, 0]
                     }}
                     transition={{ 
                       duration: 2 + Math.random() * 2, 
                       repeat: Infinity, 
                       delay: Math.random() * 3 
                     }}
                   />
                 ))}
                 {/* Flask glass */}
                 <path
                   d="M20 110 L80 110 L70 30 L65 10 L35 10 L30 30 Z"
                   fill="none"
                   stroke="white"
                   strokeWidth="1.5"
                   strokeOpacity="0.3"
                 />
               </svg>
            </div>
            
            {/* Sparkles/Reaction bits */}
            <AnimatePresence>
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute bg-yellow-400 rounded-full"
                   style={{ 
                     width: 4, height: 4,
                     top: '40%', left: '50%'
                   }}
                   animate={{ 
                     x: (Math.random() - 0.5) * 300,
                     y: (Math.random() - 0.5) * 300,
                     opacity: [0, 1, 0],
                     scale: [0, 1.5, 0]
                   }}
                   transition={{ 
                     duration: 1 + Math.random() * 1, 
                     repeat: Infinity, 
                     delay: Math.random() * 2 
                   }}
                 />
               ))}
            </AnimatePresence>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-3 bg-white shadow-xl rounded-2xl flex items-center gap-3">
               <Thermometer className="w-5 h-5 text-red-500" />
               <div className="text-xs font-bold font-display text-slate-900">1,250 °C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
