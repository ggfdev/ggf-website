'use client';

import { motion } from 'framer-motion';
import { Palette, Code2, Music, Microscope, Layout, Sparkles, MousePointer2 } from 'lucide-react';

const agentsList = [
    { name: 'The Artist', role: 'Visuals & Sprites', icon: Palette, color: 'text-pink-400' },
    { name: 'The Architect', role: 'Layout & UX', icon: Layout, color: 'text-blue-400' },
    { name: 'The Coder', role: 'Logic & Physics', icon: Code2, color: 'text-green-400' },
    { name: 'The Maestro', role: 'Sound & Music', icon: Music, color: 'text-purple-400' },
    { name: 'The Tester', role: 'QA & Balance', icon: Microscope, color: 'text-yellow-400' },
    { name: 'The Muse', role: 'AI Generation', icon: Sparkles, color: 'text-cyan-400' },
];

import { useLanguage } from '@/LanguageContext';

export default function AgentGrid() {
    const { t } = useLanguage();

    const agents = [
        { id: 'artist', name: t.agents.artist.name, role: t.agents.artist.role, icon: Palette, color: 'text-pink-400', glow: 'rgba(236, 72, 153, 0.2)', quote: t.agents.quotes.artist },
        { id: 'architect', name: t.agents.architect.name, role: t.agents.architect.role, icon: Layout, color: 'text-blue-400', glow: 'rgba(59, 130, 246, 0.2)', quote: t.agents.quotes.architect },
        { id: 'coder', name: t.agents.coder.name, role: t.agents.coder.role, icon: Code2, color: 'text-green-400', glow: 'rgba(34, 197, 94, 0.2)', quote: t.agents.quotes.coder },
        { id: 'maestro', name: t.agents.maestro.name, role: t.agents.maestro.role, icon: Music, color: 'text-purple-400', glow: 'rgba(168, 85, 247, 0.2)', quote: t.agents.quotes.maestro },
        { id: 'tester', name: t.agents.tester.name, role: t.agents.tester.role, icon: Microscope, color: 'text-yellow-400', glow: 'rgba(234, 179, 8, 0.2)', quote: t.agents.quotes.tester },
        { id: 'muse', name: t.agents.muse.name, role: t.agents.muse.role, icon: Sparkles, color: 'text-cyan-400', glow: 'rgba(6, 182, 212, 0.2)', quote: t.agents.quotes.muse },
    ];

    return (
        <section id="studio" className="relative py-16 container px-4 md:px-6 z-20 overflow-hidden">
            {/* Animated SVG Connections Background - More Complex */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 100 200 C 400 100 600 500 900 300 S 1200 100 1400 400"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.circle
                    r="3"
                    fill="var(--color-primary)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: "path('M 100 200 C 400 100 600 500 900 300 S 1200 100 1400 400')" }}
                />
            </svg>

            <div className="text-center mb-16 space-y-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)]">
                    {t.agents.title}<span className="text-gradient">{t.agents.titleAccent}</span>
                </h2>
                <div className="flex items-center justify-center gap-2 text-[var(--color-text-dim)]">
                    <p className="max-w-xl">
                        {t.agents.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {agents.map((agent, index) => {
                    const Icon = agent.icon;
                    return (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 rounded-[var(--radius-card)] bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 hover:border-black/20 dark:hover:border-white/40 transition-colors cursor-default"
                        >
                            {/* Inner Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[var(--radius-card)] pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at center, ${agent.glow}, transparent 70%)`
                                }}
                            />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-4 rounded-2xl bg-black/5 dark:bg-white/20 mb-6 group-hover:scale-110 group-hover:bg-black/10 transition-all duration-500 ${agent.color}`}>
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">{agent.name}</h3>
                                <p className="text-sm text-black dark:text-white transition-colors uppercase tracking-widest font-medium">{agent.role}</p>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute bottom-4 right-4 text-black/5 group-hover:text-[var(--color-primary)]/20 transition-colors">
                                <Sparkles size={40} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
