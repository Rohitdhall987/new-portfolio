// MatrixRain.jsx
import React, { useEffect, useRef } from "react";
import "./MatrixRain.css"; // We’ll define mask animation here

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const binary = "01";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#dadada";
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, index) => {
                const text = binary[Math.floor(Math.random() * binary.length)];
                const x = index * fontSize;
                ctx.fillText(text, x, y * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[index] = 0;
                }
                drops[index]++;
            });
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="matrix-mask-wrapper">
            <canvas
                ref={canvasRef}
                className="matrix-canvas"
            />
        </div>
    );
};

export default MatrixRain;
