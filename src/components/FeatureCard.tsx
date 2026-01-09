'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import clsx from 'clsx';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    delay?: number;
}

export default function FeatureCard({ title, description, icon, className, delay = 0 }: FeatureCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Tilt math
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);

        // Glow math for var(--mouse-x/y)
        const mouseX = clientX - left;
        const mouseY = clientY - top;
        ref.current.style.setProperty("--mouse-x", `${mouseX}px`);
        ref.current.style.setProperty("--mouse-y", `${mouseY}px`);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={clsx(
                "relative rounded-[var(--radius-card)] p-8 overflow-hidden",
                "bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20",
                "hover:border-black/20 dark:hover:border-white/40 hover:shadow-[0_0_50px_-15px_rgba(0,0,0,0.5)]",
                "transition-colors duration-300",
                className
            )}
        >
            {/* Glossy overlay effect (Source Logic) */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
                }}
            />

            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col h-full">
                {icon && (
                    <div className="mb-6 inline-flex p-3 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] w-fit">
                        {icon}
                    </div>
                )}
                <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-space)]">
                    {title}
                </h3>
                <p className="text-[var(--color-text-dim)] leading-relaxed flex-grow">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
