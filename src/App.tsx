import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ChemistryLab, ChemistryGame } from './components/ChemistryLab';
import { ReactionVisualizer } from './components/ReactionVisualizer';
import { BookingSection } from './components/BookingForm';
import { Footer } from './components/Footer';
import { LabBackground } from './components/LabBackground';
import { Atom, Menu, X, Rocket, Sparkles, BrainCircuit, FlaskConical } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Men haqimda" },
    { href: "#animations", label: "Laboratoriya" },
    { href: "#games", label: "O'yinlar" },
    { href: "#booking", label: "Dars band qilish" },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <LabBackground />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6 md:py-8'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand-500/30 group-hover:rotate-12 transition-transform">M</div>
            <span className="text-lg md:text-xl font-display font-bold tracking-tight">Mominjon Raximov</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-500 transition-colors">{link.label}</a>
            ))}
            <a 
              href="#booking" 
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-brand-600 shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Boshlash
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-8 flex flex-col gap-6 font-bold uppercase tracking-widest text-sm text-center">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-brand-500 py-2 border-b border-slate-50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <HeroSection />
        
        <AboutSection />

        {/* Labs Section */}
        <section id="animations" className="py-24 bg-white scientific-grid">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                <Rocket className="w-3 h-3" />
                Interaktiv Vizualizatsiya
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                Kimyoviy <span className="text-brand-500">Sandbox</span> Laboratoriyasi
              </h2>
              <p className="text-slate-600 text-lg">
                Molekulalarni boshqaring, haroratni o'zgartiring va atomlar darajasida reaksiyalarni kuzating. O'zingizni haqiqiy olimdek his eting.
              </p>
            </div>
            
            <ChemistryLab />
            
            <div className="mt-24">
               <ReactionVisualizer />
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section id="games" className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#0ea5e9,transparent_70%)]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3" />
                    Bilimni Sinash
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                    O'yin orqali <br />
                    <span className="text-brand-400 font-mono">O'rganing.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Davriy jadvalni yodlash endi zerikarli emas. Bizning interaktiv o'yinlarimiz sizga elementlarni tez va oson o'rganishga yordam beradi. Yuqori ball to'plang va rekord o'rnating!
                  </p>
                  <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white font-bold text-xl">1</div>
                    <div>
                      <h4 className="text-white font-bold">Elementni aniqlang</h4>
                      <p className="text-slate-500 text-sm">Berilgan belgi bo'yicha to'g'ri nomni tanlang.</p>
                    </div>
                  </div>
               </div>

               <div className="lg:w-1/2 w-full">
                  <ChemistryGame />
               </div>
            </div>
          </div>
        </section>

        <BookingSection />
      </main>

      <Footer />
    </div>
  );
}
