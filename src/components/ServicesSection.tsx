'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/LanguageContext';
import { Layers, Box, PenTool, ChevronRight } from 'lucide-react';

export default function ServicesSection() {
    const { t } = useLanguage();

    const services = [
        {
            icon: Layers,
            title: t.services.item1.title,
            desc: t.services.item1.description,
            features: ['Character Sprites', 'Environment Tiles', 'Combat Mechanics', 'Inventory Systems'],
            color: 'from-gray-500/10 to-gray-600/10',
            border: 'hover:border-gray-400',
            image: '/fantasy_battle.jpg'
        },
        {
            icon: Box,
            title: t.services.item2.title,
            desc: t.services.item2.description,
            features: ['3D Mesh Generation', 'PBR Textures', 'Unity/Unreal Export', 'Dynamic Physics'],
            color: 'from-gray-500/10 to-gray-600/10',
            border: 'hover:border-gray-400',
            image: '/topdown_demo.jpg'
        },
        {
            icon: PenTool,
            title: t.services.item3.title,
            desc: t.services.item3.description,
            features: ['UI/UX Kits', 'Icon Sets', 'Background Art', 'Animation Frames'],
            color: 'from-gray-500/10 to-gray-600/10',
            border: 'hover:border-gray-400',
            image: '/pixel_assets.jpg'
        }
    ];

    return (
        <section id="services" className="relative py-20 overflow-hidden">
            {/* Header Content */}
            <div className="container px-4 md:px-6 relative z-20 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >

                    <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-space)]">
                        {t.services.title} <br />
                        <span className="text-gradient">{t.services.titleAccent}</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-dim)]">
                        {t.services.description}
                    </p>
                </motion.div>
            </div>

            {/* Services Grid */}
            <div className="container px-4 md:px-6 z-20 relative">
                <div className="grid lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group relative p-8 rounded-[var(--radius-card)] bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 hover:border-black/20 dark:hover:border-white/40 transition-colors duration-500 overflow-hidden`}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${service.color} transition-opacity duration-500`} />

                            <div className="relative z-10 space-y-6">
                                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/20 w-fit group-hover:scale-110 group-hover:bg-black/10 transition-all">
                                    <service.icon size={32} className="text-[var(--color-primary)]" />
                                </div>

                                <h3 className="text-2xl font-bold">{service.title}</h3>
                                <p className="text-[var(--color-text-dim)] group-hover:text-black/80 dark:group-hover:text-white/90 transition-colors">
                                    {service.desc}
                                </p>

                                <ul className="space-y-3 pt-4">
                                    {service.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
                                            <ChevronRight size={14} className="text-[var(--color-primary)]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {service.image && (
                                    <div className="mt-8 relative aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg group-hover:border-black/20 dark:hover:border-white/30 transition-colors">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats / Call to Action */}

        </section>
    );
}
