import React, { useEffect, useRef } from 'react';

interface RainbowBorderProps {
    children: React.ReactNode;
    width: number;
    speed?: number;
}

const RainbowBorder: React.FC<RainbowBorderProps> = ({ children, width, speed = 1 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let hue = 0;
        let animationFrameId: number;

        const animate = () => {
            hue = (hue + speed) % 360;
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
            gradient.addColorStop(0.33, `hsl(${(hue + 120) % 360}, 100%, 50%)`);
            gradient.addColorStop(0.66, `hsl(${(hue + 240) % 360}, 100%, 50%)`);
            gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = width;
            ctx.strokeRect(width / 2, width / 2, canvas.width - width, canvas.height - width);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [width, speed]);

    return (
        <div ref={containerRef} className="relative inline-block w-full">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: -1 }}
            />
            {children}
        </div>
    );
};

export default RainbowBorder;

