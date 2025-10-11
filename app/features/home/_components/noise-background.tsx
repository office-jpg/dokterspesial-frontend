import { useEffect, useRef } from "react";

export default function NoiseBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasDimensions();
        window.addEventListener("resize", setCanvasDimensions);

        const createNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            const isDark = document.documentElement.classList.contains('dark');
            const greenTint = isDark ? 0.3 : 0.2;
            const baseOpacity = 0.05;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255 * baseOpacity;

                data[i] = value * (1 - greenTint);
                data[i + 1] = value * (1 + greenTint * 0.5);
                data[i + 2] = value * (1 - greenTint * 0.5);
                data[i + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
        };

        let animationFrameId: number;
        const render = () => {
            createNoise();
            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", setCanvasDimensions);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 -z-10 h-full w-full opacity-5"
        />
    );
}
