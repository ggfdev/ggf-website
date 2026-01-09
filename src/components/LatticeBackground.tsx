'use client';

import { useEffect, useRef } from 'react';

export default function LatticeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width: number;
        let height: number;

        // Grid settings
        const spacing = 40;
        const points: { x: number; y: number; originX: number; originY: number; noiseOffset: number }[] = [];

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;

            points.length = 0;
            for (let x = 0; x < width + spacing; x += spacing) {
                for (let y = 0; y < height + spacing; y += spacing) {
                    points.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        noiseOffset: Math.random() * 1000
                    });
                }
            }
        };

        const render = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            // Update points with a subtle drift
            points.forEach(p => {
                const drift = 8;
                p.x = p.originX + Math.sin(time * 0.001 + p.noiseOffset) * drift;
                p.y = p.originY + Math.cos(time * 0.0012 + p.noiseOffset) * drift;
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(196, 250, 255, 0.15)'; // var(--color-primary) with low opacity
            ctx.lineWidth = 0.5;

            const threshold = spacing * 1.5;

            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];

                // Only check a few neighbors to keep performance high
                for (let j = i + 1; j < Math.min(i + 15, points.length); j++) {
                    const p2 = points[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < threshold * threshold) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw points
            ctx.fillStyle = 'rgba(0, 245, 255, 0.4)';
            points.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
