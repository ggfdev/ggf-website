'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/LanguageContext';

export default function FAQSection() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative py-16 container px-4 md:px-6 z-20">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)]">
                        {t.faq.title}<span className="text-gradient">{t.faq.titleAccent}</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {t.faq.questions.map((faq: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl border border-black/5 dark:border-white/20 bg-black/5 dark:bg-white/10 overflow-hidden transition-colors hover:border-black/10 dark:hover:border-white/40"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 dark:bg-white/20 text-[var(--color-primary-light)] group-hover:scale-110 transition-transform">
                                        <HelpCircle size={20} />
                                    </div>
                                    <span className="font-bold text-lg md:text-xl">{faq.q}</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    className="text-[var(--color-text-dim)]"
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-[var(--color-text-dim)] leading-relaxed border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
