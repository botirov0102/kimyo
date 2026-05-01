import React from 'react';
import { motion } from 'motion/react';

const AtomAnimation: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <motion.g animate={{ x, y, scale }}>
    {/* Nucleus */}
    <motion.circle 
      r="15" 
      fill="#ef4444" 
      animate={{ scale: [1, 1.1, 1] }} 
      transition={{ duration: 0.8, repeat: Infinity }} 
    />
    <circle r="12" fill="#ef4444" opacity="0.5" />
    
    {/* Electron Orbits */}
    <ellipse rx="50" ry="20" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" transform="rotate(0)" />
    <ellipse rx="50" ry="20" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" transform="rotate(60)" />
    <ellipse rx="50" ry="20" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" transform="rotate(-60)" />

    {/* Electrons */}
    {[0, 120, 240].map((angle, i) => (
      <motion.circle
        key={i}
        r="4"
        fill="#0ea5e9"
        animate={{
          cx: [50 * Math.cos(0), 50 * Math.cos(2 * Math.PI)],
          cy: [20 * Math.sin(0), 20 * Math.sin(2 * Math.PI)],
        }}
        transition={{
          duration: 2 + i,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          rotate: `${angle}deg`,
          transformOrigin: "center"
        }}
      />
    ))}
  </motion.g>
);

const Molecule: React.FC<{ x: number; y: number; delay?: number; label?: string }> = ({ x, y, delay = 0, label = "H₂O" }) => (
  <motion.g
    initial={{ x, y, opacity: 0, scale: 0.8 }}
    animate={{ 
      x: [x - 5, x + 5, x],
      y: [y - 5, y + 5, y],
      opacity: 1, 
      scale: 1 
    }}
    transition={{ 
      duration: 3 + Math.random() * 2, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {/* Bonds */}
    <line x1="0" y1="0" x2="30" y2="20" stroke="currentColor" strokeWidth="2" className="text-brand-300" />
    <line x1="0" y1="0" x2="-20" y2="40" stroke="currentColor" strokeWidth="2" className="text-brand-300" />
    
    {/* Atoms */}
    <circle r="12" fill="currentColor" className="text-brand-500 shadow-lg" stroke="white" strokeWidth="2" />
    <text x="-5" y="5" fontSize="8" fill="white" fontWeight="bold">O</text>
    <circle cx="30" cy="20" r="8" fill="currentColor" className="text-brand-400" />
    <text x="27" y="23" fontSize="6" fill="white">H</text>
    <circle cx="-20" cy="40" r="8" fill="currentColor" className="text-brand-300" />
    <text x="-23" y="43" fontSize="6" fill="white">H</text>
  </motion.g>
);

export const ChemistryCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-3xl overflow-hidden border border-brand-100 scientific-grid">
      <svg width="100%" height="100%" viewBox="0 0 800 500" className="opacity-90">
        <AtomAnimation x={400} y={250} scale={1.5} />
        
        <Molecule x={150} y={100} delay={0} />
        <Molecule x={650} y={150} delay={0.5} />
        <Molecule x={200} y={400} delay={1} />
        <Molecule x={600} y={400} delay={1.5} />
        
        {/* Particle flow lines */}
        <motion.path
          d="M0 250 Q 200 150 400 250 T 800 250"
          fill="none"
          stroke="rgba(14, 165, 233, 0.1)"
          strokeWidth="40"
          strokeLinecap="round"
        />
        
        {/* Floating chemical symbols */}
        {['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'].map((sym, i) => (
          <motion.text
            key={i}
            x={Math.random() * 800}
            y={Math.random() * 500}
            fill="rgba(255,255,255,0.05)"
            fontSize="40"
            fontWeight="bold"
            animate={{ 
              y: [null, Math.random() * 500],
              opacity: [0.02, 0.1, 0.02]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity }}
          >
            {sym}
          </motion.text>
        ))}
      </svg>
      
      <div className="absolute top-6 left-6 flex gap-4">
        <div className="px-4 py-2 glass rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-100">MAGNIT MAYDON: AKTIV</span>
        </div>
        <div className="px-4 py-2 glass rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-mono text-slate-100">TEMP: 273.15 K</span>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-10 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10 text-center max-w-sm"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          <h3 className="font-display font-bold text-white mb-2 text-xl">Atomik Vizualizatsiya</h3>
          <p className="text-sm text-slate-300">Elektronlar harakati va molekulyar to'qnashuvlarni real vaqt rejimida kuzating.</p>
        </motion.div>
      </div>
    </div>
  );
};
