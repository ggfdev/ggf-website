'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Gradient Mesh (Original Source) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(11,25,46,0.5)] to-[var(--color-bg-dark)] pointer-events-none z-10" />

            {/* Horizontal White Band - Dark Mode Only (Decorative) */}
            <div className="hidden dark:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-[40vh] bg-white/5 blur-[120px] pointer-events-none z-10 opacity-80" />

            <div className="container relative z-20 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >


                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-[family-name:var(--font-space)]">
                        <span className="text-white">{t.hero.title1}</span> <br />
                        <span className="text-gradient">{t.hero.title2}</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text-dim)] leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#waitlist"
                            className="group relative px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-[var(--radius-button)] font-bold shadow-lg overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t.waitlist.button} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>


                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/30 dark:text-white/30"
            >
                <div className="w-6 h-10 border-2 border-black/20 dark:border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-black/50 dark:bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
