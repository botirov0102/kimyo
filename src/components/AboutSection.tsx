import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Clock, Award, BookOpen, Microscope, FlaskConical, Atom } from 'lucide-react';
import { cn } from '../lib/utils';
import aboutImage from '../assets/images/regenerated_image_1777635809394.png';

const STATS = [
  { label: 'Yillik tajriba', value: '12+', icon: Clock },
  { label: "O'qitilgan o'quvchilar", value: '2,500+', icon: Users },
  { label: 'Ilmiy maqolalar', value: '15', icon: Award },
  { label: 'Muvaffaqiyat darajasi', value: '98%', icon: GraduationCap },
];

const METHODS = [
  {
    title: 'Visual Ta\'lim',
    desc: 'Murakkab kimyoviy tushunchalar interaktiv 3D simulyatsiyalar orqali vizuallashtiriladi.',
    icon: FlaskConical,
    color: 'text-brand-500'
  },
  {
    title: 'Faol Xotira',
    desc: 'Doimiy bilim uchun strategik fikr-mulohaza va takrorlash usullaridan foydalanamiz.',
    icon: BookOpen,
    color: 'text-emerald-500'
  },
  {
    title: 'Amaliy Tatbiq',
    desc: 'Nazariyani sanoat va biologik kimyodagi real dunyo bilan bog\'laymiz.',
    icon: Microscope,
    color: 'text-amber-500'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Core Info */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase mx-auto lg:mx-0">
              <Atom className="w-3 h-3" />
              O'qitish falsafasi
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
              Fan bu yodlash emas. Fan bu <span className="text-brand-600">tushunish</span> demakdir.
            </h2>
            <div className="space-y-4 text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                Mening kimyo olamidagi sayohatim ilmiy-tadqiqot laboratoriyalarida boshlangan, lekin haqiqiy ishtiyoqimni reaksiyalar orqasidagi "nima uchun" degan savolga javob berishda topdim.
              </p>
              <p className="hidden md:block">
                O'n yildan ortiq vaqt davomida uchta turli qit'ada dars berish orqali men mavhum tenglamalar va fizik haqiqat o'rtasidagi tafovutni bartaraf etadigan usulni takomillashtirdim. Maqsadim - har bir talaba kimyoni shunchaki o'rganadigan odam emas, balki o'zini haqiqiy kimyogar kabi his qilishiga erishishdir.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-slate-200">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xl md:text-2xl font-bold font-display text-brand-700">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src={aboutImage} 
                alt="Chemistry Laboratory" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[110%] h-[110%] border border-brand-200 rounded-[3rem] opacity-50" />
            </div>
          </motion.div>
        </div>

        {/* Methods */}
        <div className="grid md:grid-cols-3 gap-8">
          {METHODS.map((method, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={cn("w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6", method.color)}>
                <method.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">{method.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{method.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
