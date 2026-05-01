import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Calendar, Clock, CheckCircle2, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import axios from 'axios';

type Step = 'info' | 'time' | 'success';

const TIME_SLOTS = [
  '09:00 AM - 10:30 AM',
  '11:00 AM - 12:30 PM',
  '02:00 PM - 03:30 PM',
  '04:00 PM - 05:30 PM',
  '06:00 PM - 07:30 PM',
];

export const BookingSection: React.FC = () => {
  const [step, setStep] = useState<Step>('info');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setStep('time');
    }
  };

  const handleConfirm = async () => {
    if (!formData.time) return;
    setLoading(true);
    try {
      await axios.post('/api/book', formData);
      setStep('success');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-900 mb-4"
          >
            Kimyoni O'rganishga Tayyormisiz?
          </motion.h2>
          <p className="text-slate-600 text-lg">Bugundan darsingizni band qiling va ilmiy sayohatingizni boshlang.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-brand-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side: Illustration or Context */}
          <div className="lg:w-1/3 bg-brand-600 p-6 md:p-8 lg:p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Dars Tafsilotlari</h3>
              <ul className="space-y-3 md:space-y-4 opacity-90">
                <li className="flex items-start gap-3">
                  <div className="mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-xs md:text-sm">90 daqiqalik intensiv dars</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-xs md:text-sm">Shaxsiy o'quv materiallari</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-xs md:text-sm">Interaktiv simulyatsiyalar</span>
                </li>
              </ul>
            </div>
            
            <div className="hidden lg:block">
              <p className="text-[10px] opacity-70">© 2024 Mominjon Raximov. Barcha huquqlar himoyalangan.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 'info' && (
                <motion.form 
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block">Ism va Familiya</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Azizov Alisher"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block">Telefon raqami</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998 (90) 123-4567"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
                  >
                    Keyingi qadam
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
              )}

              {step === 'time' && (
                <motion.div 
                  key="time"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button 
                    onClick={() => setStep('info')}
                    className="text-slate-500 hover:text-brand-600 flex items-center gap-2 text-sm font-medium transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" /> Ma'lumotlarga qaytish
                  </button>
                  
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Dars vaqtini tanlang</label>
                    <div className="grid gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={cn(
                            "w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between",
                            formData.time === slot 
                              ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm" 
                              : "border-slate-100 bg-slate-50 text-slate-600 hover:border-brand-200"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Clock className={cn("w-4 h-4", formData.time === slot ? "text-brand-500" : "text-slate-400")} />
                            <span className="font-medium">{slot}</span>
                          </div>
                          {formData.time === slot && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    disabled={!formData.time || loading}
                    className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Band qilishni tasdiqlash"}
                  </button>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-bold text-slate-900">Muvaffaqiyatli band qilindi!</h3>
                    <p className="text-slate-600">Rahmat, <span className="font-bold text-brand-600">{formData.name}</span>. Arizangiz yuborildi. O'qituvchi tez orada siz bilan bog'lanadi.</p>
                  </div>
                  <div className="bg-brand-50 rounded-2xl p-4 text-sm text-brand-700 border border-brand-100 flex items-center gap-3 justify-center">
                    <Calendar className="w-4 h-4" />
                    <span>{formData.time}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setStep('info');
                      setFormData({ name: '', phone: '', time: '' });
                    }}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Yana bir dars band qilish
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
