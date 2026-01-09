'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const CODE_PREVIEW = `// AI Generated Player Controller
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hero_idle');
        
        // Physics setup
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        
        // Abilities initialized by AI
        this.jumpStrength = -400;
        this.speed = 160;
    }

    update() {
        // Real-time input handling
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.anims.play('run', true);
        }
    }
}`;

import { useLanguage } from '@/LanguageContext';


export default function DemoSection() {
    const { t } = useLanguage();

    return (
        <section id="showcase" className="relative py-16 bg-[var(--color-bg-light)] transition-colors duration-500 overflow-hidden">


            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 z-10">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-space)] text-[var(--color-text-light)]">
                            {t.demo.title}<br />
                            <span className="text-[var(--color-primary)]">{t.demo.titleAccent}</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium transition-colors duration-500">
                            {t.demo.description}
                        </p>
                    </div>

                    {/* Code Window Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 w-full"
                    >
                        {/* Premium Code Window */}
                        <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-black/10 dark:border-white/10">
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700 dark:border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-xs text-gray-400 font-mono">Player.js</span>
                            </div>

                            {/* Editor Area */}
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
                                <TypeAnimation
                                    sequence={[CODE_PREVIEW, 1000]}
                                    wrapper="div"
                                    speed={75}
                                    style={{ display: 'block', color: 'inherit', whiteSpace: 'pre' }}
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom Gradient Removed for Sharp Transition */}
        </section>
    );
}
