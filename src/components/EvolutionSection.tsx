'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/LanguageContext';

export default function EvolutionSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            title: t.evolution.step1.title,
            description: t.evolution.step1.description,
            code: `// Traditional Setup
const game = new Phaser.Game(config);

function preload() {
  this.load.image('hero', 'assets/hero.png');
  this.load.audio('jump', 'assets/jump.wav');
}

function create() {
  this.player = this.physics.add.sprite(
    100, 450, 'hero'
  );
}`
        },
        {
            title: t.evolution.step2.title,
            description: t.evolution.step2.description,
            code: `// Agent-Assisted Flow
const ggf = new GGFStudio();

const agents = {
  artist: ggf.spawn('The Artist'),
  coder: ggf.spawn('The Coder')
};

// Agents handle resources
agents.artist.draw('hero', 'retro-style');
agents.coder.implement('physics');`
        },
        {
            title: t.evolution.step3.title,
            description: t.evolution.step3.description,
            code: `// GGF Autonomous Flow
await ggf.generate({
  vision: "Retro platformer in space",
  complexity: "Intermediate",
  target: ["Web", "Mobile"]
});

// Autonomous Evolution
ggf.studio.optimizeAll();
ggf.studio.deploy();`
        }
    ];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative min-h-[300vh] bg-[var(--color-bg-dark)] transition-colors duration-1000">
            {/* Sticky Background Title */}


            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 pt-[50vh] pb-[10vh]">
                    {/* Left: Content Steps */}
                    <div className="space-y-[60vh] py-[20vh]">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-20%" }}
                                className="space-y-6"
                            >
                                <div className="inline-flex px-4 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-bold tracking-widest uppercase">
                                    Step 0{i + 1}
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)] text-[var(--color-text-light)]">
                                    {step.title}
                                </h3>
                                <p className="text-xl text-[var(--color-text-dim)] leading-relaxed max-w-md">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Sticky Code Editor */}
                    <div className="sticky top-[20vh] h-[60vh] hidden lg:block">
                        <motion.div
                            className="h-full rounded-2xl bg-[#070b14] border border-white/10 overflow-hidden shadow-2xl relative transition-colors duration-500"
                            style={{
                                perspective: 1000
                            }}
                        >
                            {/* Window Header */}
                            <div className="h-10 border-b border-black/5 bg-black/5 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                <div className="ml-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                    ggf-studio --evolution
                                </div>
                            </div>

                            {/* Code Content & Image Preview */}
                            <div className="relative h-full overflow-hidden">
                                {steps.map((step, i) => {
                                    const start = i / steps.length;
                                    const end = (i + 1) / steps.length;
                                    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                                    const translateY = useTransform(scrollYProgress, [start, end], [20, -20]);
                                    const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.95, 1]);

                                    const stepImage = i === 1 ? '/pixel_assets.jpg' : i === 2 ? '/fantasy_battle.jpg' : null;

                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-x-8 top-16 bottom-8 flex flex-col"
                                            style={{ opacity, y: translateY }}
                                        >
                                            <div className="flex-1 font-mono text-sm leading-relaxed overflow-hidden flex flex-col">
                                                <code className="text-gray-300 block mb-6 shrink-0">
                                                    {step.code}
                                                </code>

                                                {stepImage && (
                                                    <motion.div
                                                        style={{ scale }}
                                                        className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl mt-4"
                                                    >
                                                        <Image
                                                            src={stepImage}
                                                            alt="Evolution Preview"
                                                            fill
                                                            unoptimized
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-40" />
                                                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white/50 font-mono tracking-tighter">
                                                            RENDER_RESULT_V2.0
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Overlay Glow */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-60 z-20" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
