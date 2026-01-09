'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleSystem from '@/components/ParticleSystem';
import { useLanguage } from '@/LanguageContext';
import { Target, Eye } from 'lucide-react';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[var(--color-bg-dark)]">
            <Navigation />
            <ParticleSystem />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="container relative z-20 px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="text-sm font-medium text-[var(--color-primary-light)]">
                                {t.about.badge}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)]">
                            {t.about.title} <br />
                            <span className="text-gradient">{t.about.titleAccent}</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-dim)] leading-relaxed">
                            {t.about.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative py-20 z-20">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 rounded-[var(--radius-card)] bg-white/5 border border-white/10 relative group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target size={120} />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Target className="text-[var(--color-primary)]" />
                                {t.about.missionTitle}
                            </h2>
                            <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                                {t.about.missionDesc}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 rounded-[var(--radius-card)] bg-white/5 border border-white/10 relative group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Eye size={120} />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Eye className="text-[var(--color-primary)]" />
                                {t.about.visionTitle}
                            </h2>
                            <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                                {t.about.visionDesc}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
