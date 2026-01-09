'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/LanguageContext';

export default function UseCaseTabs() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('pro');

    const cases = [
        {
            id: 'pro',
            title: t.useCases.pro.title,
            description: t.useCases.pro.description,
            icon: Briefcase,
            stats: ['5x Deployment Speed', '90% Less Manual QA'],
            image: '/pixel_assets.jpg'
        },
        {
            id: 'indie',
            title: t.useCases.indie.title,
            description: t.useCases.indie.description,
            icon: User,
            stats: ['Rapid Prototyping', 'No-code logic'],
            image: '/topdown_demo.jpg'
        },
        {
            id: 'creative',
            title: t.useCases.creative.title,
            description: t.useCases.creative.description,
            icon: Sparkles,
            stats: ['Text-to-World', 'AI Social Agents'],
            image: '/platformer_demo.jpg'
        }
    ];

    const activeCase = cases.find(c => c.id === activeTab)!;

    return (
        <section id="features" className="py-32 container px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h3 className="text-thin-wide text-sm text-[var(--color-primary-light)]">{t.useCases.tag}</h3>
                <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-space)]">
                    {t.useCases.title}<span className="text-gradient">{t.useCases.titleAccent}</span>
                </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
                {/* Content Card */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="group grid md:grid-cols-2 gap-12 items-center p-8 md:p-16 rounded-[var(--radius-card)] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl overflow-hidden transition-colors duration-500"
                        >
                            <div className="space-y-6">
                                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary-light)] group-hover:scale-110 transition-transform duration-500">
                                    <activeCase.icon size={32} />
                                </div>
                                <h3 className="text-3xl font-bold">{activeCase.title}</h3>
                                <p className="text-lg text-[var(--color-text-dim)] leading-relaxed">
                                    {activeCase.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {activeCase.stats.map(stat => (
                                        <span key={stat} className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-medium">
                                            {stat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden border border-black/10 shadow-2xl">
                                <Image
                                    src={activeCase.image}
                                    alt={activeCase.title}
                                    fill
                                    unoptimized
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pill Navigation */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md transition-colors duration-500">
                        {cases.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setActiveTab(c.id)}
                                className={`
                                  relative px-6 py-2.5 rounded-full text-sm font-bold transition-all
                                  ${activeTab === c.id ? 'text-white dark:text-black bg-black dark:bg-white' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'}
                                `}
                            >
                                {activeTab === c.id && (
                                    <motion.div
                                        layoutId="activePill"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{c.title.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
