'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send, Users, Gamepad2, Stars } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function Counter({ value, label, icon: Icon, suffix = '+' }: { value: number, label: string, icon: any, suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center space-y-2 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors duration-500">
            <div className="flex justify-center text-[var(--color-primary-light)] mb-2">
                <Icon size={32} />
            </div>
            <div className="text-4xl font-bold font-[family-name:var(--font-space)] text-black dark:text-white">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-[var(--color-text-dim)] uppercase tracking-widest font-medium">
                {label}
            </div>
        </div>
    );
}

import { useLanguage } from '@/LanguageContext';

export default function BetaSignup() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique constraint violation
                    alert('This email is already in the waitlist! 😎');
                } else {
                    console.error('Supabase error:', error);
                    console.error('Error details:', {
                        message: error.message,
                        code: error.code,
                        details: error.details,
                        hint: error.hint
                    });
                    alert(`An error occurred: ${error.message}`);
                }
                setStatus('idle');
                return;
            }

            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error('Submit error:', err);
            alert('A connection error occurred.');
            setStatus('idle');
        }
    };

    return (
        <section id="waitlist" className="relative py-32 container px-4 md:px-6 z-20">

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Side: Stats & Text */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)] leading-tight">
                            {t.waitlist.title}<span className="text-gradient">{t.waitlist.titleAccent}</span>
                        </h2>
                        <p className="text-lg text-[var(--color-text-dim)] leading-relaxed">
                            {t.waitlist.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Counter value={10} suffix="K+" label={t.waitlist.gamesLabel} icon={Gamepad2} />
                    </div>
                </div>

                {/* Right Side: Signup Box */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="relative p-8 md:p-12 rounded-[var(--radius-card)] bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 space-y-8 transition-colors duration-500">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-black dark:text-white">{t.waitlist.cardTitle}</h3>
                            <p className="text-[var(--color-text-dim)]">{t.waitlist.cardSubtitle}</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center space-y-4"
                                >
                                    <Stars className="mx-auto text-green-600" size={48} />
                                    <p className="font-bold text-green-800">{t.waitlist.success}</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            placeholder={t.waitlist.placeholder}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:border-black/30 dark:focus:border-white/50 outline-none transition-all text-black dark:text-white placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-200 transition-all group disabled:opacity-50"
                                    >
                                        <span>{status === 'loading' ? '...' : t.waitlist.button}</span>
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                    <p className="text-[10px] text-center text-[var(--color-text-dim)] uppercase tracking-widest">
                                        {t.waitlist.footer}
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
