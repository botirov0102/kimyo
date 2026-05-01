import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Beaker, TestTube, Microscope } from 'lucide-react';

export const LabBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {/* Floating Flasks */}
      <motion.div 
        className="absolute top-20 left-[10%]"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FlaskConical className="w-16 h-16 text-brand-300" />
      </motion.div>

      <motion.div 
        className="absolute bottom-40 right-[5%]"
        animate={{ 
          y: [0, 40, 0],
          rotate: [0, -15, 15, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Beaker className="w-24 h-24 text-emerald-300" />
      </motion.div>

      <motion.div 
        className="absolute top-1/2 left-[-2%]"
        animate={{ 
          x: [0, 20, 0],
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <TestTube className="w-12 h-12 text-brand-400" />
      </motion.div>

      <motion.div 
        className="absolute top-40 right-[15%]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Microscope className="w-32 h-32 text-slate-200" />
      </motion.div>

      {/* Bubbling bubbles in background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand-400/20"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            width: Math.random() * 20 + 5, 
            height: Math.random() * 20 + 5 
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
