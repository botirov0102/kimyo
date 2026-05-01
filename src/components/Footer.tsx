import React from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center font-bold text-xl">M</div>
              <span className="text-2xl font-display font-bold">Mominjon Raximov</span>
            </div>
            <p className="max-w-md text-slate-400 mb-8 leading-relaxed">
              Mominjon Raximov — Kimyoni oddiy va interaktiv usullar bilan o'rgatuvchi professional repetitor. 
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/MS_kimyo1" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all shadow-lg">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://t.me/Mominjon_Raximov" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all shadow-lg">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-6">Tezkor havolalar</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-brand-400 transition-colors">Men haqimda</a></li>
              <li><a href="#booking" className="hover:text-brand-400 transition-colors">Dars band qilish</a></li>
              <li><a href="#animations" className="hover:text-brand-400 transition-colors">Vizual laboratoriya</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">O'quvchilar logi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-6">Telegram ijtimoiy tarmoqlari</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://t.me/MS_kimyo1" target="_blank" rel="noreferrer" className="flex items-center gap-2 group hover:text-brand-400 transition-colors">
                  <Send className="w-4 h-4 text-brand-500" />
                  <span>Telegram kanalimiz</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://t.me/Mominjon_Raximov" target="_blank" rel="noreferrer" className="flex items-center gap-2 group hover:text-brand-400 transition-colors">
                  <UserCircle className="w-4 h-4 text-brand-500" />
                  <span>Shaxsiy aloqa</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500" />
                <span>+998 (99) 102-14-57</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2024 Mominjon Raximov • Mominjon Raximov Ta'lim. 2012-yildan beri.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-300">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-slate-300">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Internal icon for the footer list
const UserCircle = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);
