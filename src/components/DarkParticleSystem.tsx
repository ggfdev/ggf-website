'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    targetAlpha: number;
}

export default function DarkParticleSystem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;

        const resize = () => {
            // Use parent dimensions since this is absolute positioned in a section
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Density based on width
            const particleCount = Math.floor(canvas.width / 8);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.4 + 0.1,
                    targetAlpha: Math.random() * 0.5 + 0.2,
                });
            }
        };

        const update = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouseRadiusSq = 250 * 250;
            const connectionRadiusSq = 100 * 100;

            // Calculate rect once per frame for correct relative mouse position
            const rect = canvas.getBoundingClientRect();
            const relativeMouseX = mouseX - rect.left;
            const relativeMouseY = mouseY - rect.top;

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const dx = p.x - relativeMouseX;
                const dy = p.y - relativeMouseY;
                const distSq = dx * dx + dy * dy;

                if (distSq < mouseRadiusSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (250 - dist) / 250;

                    // Reactive Field
                    p.x += (dx / (dist || 1)) * force * 2.0; // Increased force
                    p.y += (dy / (dist || 1)) * force * 2.0;
                }

                // Dark particles for White Background
                const shade = Math.floor(p.alpha * 100); // 0-100 range (Black to Dark Gray)
                ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${p.alpha * 0.8})`;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                // Connections (Black/Dark Gray lines)
                for (let j = index + 1; j < Math.min(index + 6, particles.length); j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const distSq2 = dx2 * dx2 + dy2 * dy2;

                    if (distSq2 < connectionRadiusSq) {
                        const alpha = 0.15 * (1 - Math.sqrt(distSq2) / 100);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(update);
        };

        const handleResize = () => {
            resize();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initial setup
        resize();
        update();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.5 }}
        />
    );
}
