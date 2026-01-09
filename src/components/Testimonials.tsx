'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/LanguageContext';

export default function Testimonials() {
    const { t } = useLanguage();

    return (
        <section className="relative py-32 container px-4 md:px-6 z-20">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)]">
                    {t.testimonials.title}<span className="text-gradient">{t.testimonials.titleAccent}</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {t.testimonials.list.map((item: any, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="relative p-8 rounded-[var(--radius-card)] bg-[var(--color-bg-light)]/5 border border-white/5 hover:border-[var(--color-primary)]/20 transition-all group"
                    >
                        {/* Quote Icon Shadow */}
                        <div className="absolute top-6 right-8 text-white/[0.03] group-hover:text-[var(--color-primary)]/10 transition-colors pointer-events-none">
                            <Quote size={80} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + i * 0.1 }}
                                        className="text-cyan-400 text-lg"
                                    >
                                        ★
                                    </motion.span>
                                ))}
                            </div>

                            <p className="text-lg italic text-[var(--color-text-dim)] leading-relaxed group-hover:text-white transition-colors">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-[1px]">
                                    <div className="w-full h-full rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center text-sm font-bold">
                                        {item.author[0]}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white">{item.author}</div>
                                    <div className="text-xs text-[var(--color-text-dim)] uppercase tracking-widest">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
