import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, FlaskConical, Atom, Beaker, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import heroPortrait from '../assets/images/input_file_0.png';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden scientific-grid hero-gradient">
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-500/10 blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-3/5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-[10px] md:text-sm font-bold tracking-wider uppercase mb-6 mx-auto lg:mx-0">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-brand-500" />
              Kimyo Ta'limida Mukammallik
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-slate-900 mb-6 leading-[1.1] md:leading-[0.9] tracking-tight">
              Muvaffaqiyat <br />
              <span className="text-brand-500">Elementlarini</span> Egallang.
            </h1>
            
            <p className="text-base md:text-xl text-slate-600 mb-8 md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Molekulyar darajadagi chuqur bilim va interaktiv vizual tizimlarni birlashtirgan professional kimyo repetitori. 9-sinfdan to ilg'or tadqiqotlargacha.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="#booking"
                className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-1 transition-all active:scale-95"
              >
                Bepul darsni band qilish
                <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="#animations"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Vizual laboratoriya
              </a>
            </div>
            
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-6 md:gap-8 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white overflow-hidden bg-slate-200 shadow-sm">
                    <img src={`https://picsum.photos/seed/student-${i}/100/100`} alt="Student" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-[10px] md:text-xs">
                  +2k
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-500 text-center sm:text-left">
                Bu yil <span className="text-slate-900 font-bold">2,500+</span> o'quvchiga yordam berildi
              </div>
            </div>
          </motion.div>

          {/* Photo Section */}
          <motion.div 
            className="lg:w-2/5 relative w-full"
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? y1 : 0 }}
          >
            <div className="relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white/50 backdrop-blur-sm">
                <img 
                  src={heroPortrait} 
                  alt="Mominjon Raximov Portrait" 
                  className="w-full h-auto object-contain grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge (Year Teacher) - Positioned relative to the whole photo block */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 right-4 md:top-10 md:-right-4 glass p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl flex items-center gap-2 md:gap-3 backdrop-blur-xl z-20"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center">
                  <GraduationCapIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">Yil o'qituvchisi</div>
                  <div className="text-xs md:text-sm font-bold text-slate-900">Mominjon Raximov</div>
                </div>
              </motion.div>

              {/* Secondary Badge (Laboratory) */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 left-4 md:bottom-10 md:-left-6 glass p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 z-20"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                  <Beaker className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-900">Laboratoriya tajribalari</div>
              </motion.div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-brand-200 rounded-full blur-[100px] opacity-40" />
            <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-emerald-100 rounded-full blur-[100px] opacity-40" />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tanishish uchun aylantiring</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};

const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10L12 5L2 10l10 5l10-5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
