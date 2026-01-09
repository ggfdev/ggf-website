'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/ThemeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    targetAlpha: number;
}

export default function ParticleSystem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;

        const initParticles = () => {
            particles = [];
            // Optimized density
            const particleCount = Math.floor(window.innerWidth / 5);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.4 + 0.1,
                    targetAlpha: Math.random() * 0.5 + 0.2, // Higher target alpha for visibility
                });
            }
        };

        const update = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouseRadiusSq = 250 * 250;
            const connectionRadiusSq = 100 * 100;

            const groups: { [key: string]: Particle[] } = {
                cyan: [],
                blue: [],
                white: []
            };

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distSq = dx * dx + dy * dy;

                if (distSq < mouseRadiusSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (250 - dist) / 250;
                    p.x += (dx / (dist || 1)) * force * 1.5;
                    p.y += (dy / (dist || 1)) * force * 1.5;
                    p.alpha = Math.min(0.8, p.alpha + force * 0.1);
                } else {
                    p.alpha += (p.targetAlpha - p.alpha) * 0.03;
                }

                // Grouping
                const colorVar = Math.sin(index);
                if (colorVar > 0.7) groups.cyan.push(p);
                else if (colorVar > 0.4) groups.blue.push(p);
                else groups.white.push(p);

                // Connections
                for (let j = index + 1; j < Math.min(index + 6, particles.length); j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const distSq2 = dx2 * dx2 + dy2 * dy2;

                    if (distSq2 < connectionRadiusSq) {
                        const alpha = 0.5 * (1 - Math.sqrt(distSq2) / 100);
                        ctx.beginPath();
                        ctx.strokeStyle = theme === 'light' ? `rgba(0, 0, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            // Drawing
            const styles = getComputedStyle(document.documentElement);
            const colors = {
                cyan: styles.getPropertyValue('--color-particle-1').trim() || '129, 140, 248',
                blue: styles.getPropertyValue('--color-particle-2').trim() || '192, 132, 252',
                white: styles.getPropertyValue('--color-particle-3').trim() || '255, 255, 255'
            };

            Object.entries(groups).forEach(([color, pts]) => {
                const colorKey = color as keyof typeof colors;
                pts.forEach(p => {
                    ctx.fillStyle = `rgba(${colors[colorKey]}, ${Math.min(1, p.alpha * 2)})`;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });
            });

            animationFrameId = requestAnimationFrame(update);
        };

        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 200);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        update();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Add theme as dependency to re-fetch variables or just use variables properly in update loop

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ opacity: 0.6 }}
        />
    );
}
