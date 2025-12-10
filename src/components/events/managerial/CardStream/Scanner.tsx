import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';

interface ScannerProps {
    active: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeRef = useRef(active);

    // Keep ref in sync with prop for the loop
    useEffect(() => {
        activeRef.current = active;
        if (active) {
            console.log("Scanner Active");
        } else {
            console.log("Scanner Inactive");
        }
    }, [active]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let w = window.innerWidth;
        const h = 300;

        // Configuration
        let intensity = 0.8;
        let maxParticles = 800;
        let fadeZone = 60;
        let currentIntensity = intensity;
        let currentMaxParticles = maxParticles;
        let currentFadeZone = fadeZone;
        let currentGlowIntensity = 1;

        const baseIntensity = 0.8;
        const baseMaxParticles = 800;
        const baseFadeZone = 60;

        const scanTargetIntensity = 1.8;
        const scanTargetParticles = 2500;
        const scanTargetFadeZone = 35;
        const transitionSpeed = 0.05;

        // Particles
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            alpha: number;
            decay: number;
            originalAlpha: number;
            life: number;
            time: number;
            startX: number;
            twinkleSpeed: number;
            twinkleAmount: number;
        }

        const particles: Particle[] = [];
        let count = 0;

        // Gradient Cache
        const gradientCanvas = document.createElement('canvas');
        gradientCanvas.width = 16;
        gradientCanvas.height = 16;
        const gCtx = gradientCanvas.getContext('2d');
        if (gCtx) {
            const half = 8;
            const grad = gCtx.createRadialGradient(half, half, 0, half, half, half);
            grad.addColorStop(0, "rgba(255, 255, 255, 1)");
            grad.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
            grad.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
            grad.addColorStop(1, "transparent");
            gCtx.fillStyle = grad;
            gCtx.beginPath();
            gCtx.arc(half, half, half, 0, Math.PI * 2);
            gCtx.fill();
        }

        const resize = () => {
            w = window.innerWidth;
            canvas.width = w;
            canvas.height = h;
            // Clear usually happens in loop
        };

        const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

        const createParticle = (): Particle => {
            const lightBarX = w / 2;
            const lightBarWidth = 3;
            const intensityRatio = currentIntensity / baseIntensity;
            const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
            const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

            return {
                x: lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2),
                y: randomFloat(0, h),
                vx: randomFloat(0.2, 1.0) * speedMultiplier,
                vy: randomFloat(-0.15, 0.15) * speedMultiplier,
                radius: randomFloat(0.4, 1) * sizeMultiplier,
                alpha: randomFloat(0.6, 1),
                decay: randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
                originalAlpha: 0,
                life: 1.0,
                time: 0,
                startX: 0,
                twinkleSpeed: randomFloat(0.02, 0.08) * speedMultiplier,
                twinkleAmount: randomFloat(0.1, 0.25),
            };
        };

        const initParticles = () => {
            for (let i = 0; i < maxParticles; i++) {
                const p = createParticle();
                p.originalAlpha = p.alpha;
                p.startX = p.x;
                particles.push(p);
                count++;
            }
        };

        const updateParticle = (p: Particle) => {
            p.x += p.vx;
            p.y += p.vy;
            p.time++;

            p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
            p.life -= p.decay;

            if (p.x > w + 10 || p.life <= 0) {
                // Reset
                const newP = createParticle();
                // Copy props to existing object to avoid GC
                p.x = newP.x;
                p.y = newP.y;
                p.vx = newP.vx;
                p.vy = newP.vy;
                p.alpha = newP.alpha;
                p.originalAlpha = newP.alpha;
                p.life = 1.0;
                p.time = 0;
            }
        };

        const drawParticle = (p: Particle) => {
            if (p.life <= 0) return;
            let fadeAlpha = 1;

            if (p.y < currentFadeZone) {
                fadeAlpha = p.y / currentFadeZone;
            } else if (p.y > h - currentFadeZone) {
                fadeAlpha = (h - p.y) / currentFadeZone;
            }

            fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));
            ctx.globalAlpha = p.alpha * fadeAlpha;
            ctx.drawImage(gradientCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
        };

        const drawLightBar = () => {
            const lightBarX = w / 2;
            const lightBarWidth = 3;

            // Vertical gradient for mask
            const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
            verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            verticalGradient.addColorStop(currentFadeZone / h, "rgba(255, 255, 255, 1)");
            verticalGradient.addColorStop(1 - currentFadeZone / h, "rgba(255, 255, 255, 1)");
            verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.globalCompositeOperation = "lighter";

            const targetGlow = activeRef.current ? 3.5 : 1;
            currentGlowIntensity += (targetGlow - currentGlowIntensity) * transitionSpeed;

            const glowIntensity = currentGlowIntensity;
            const glow1Alpha = activeRef.current ? 1.0 : 0.8;
            const glow2Alpha = activeRef.current ? 0.8 : 0.6;
            const glow3Alpha = activeRef.current ? 0.6 : 0.4; // Corrected

            // Core
            const coreGrad = ctx.createLinearGradient(lightBarX - lightBarWidth / 2, 0, lightBarX + lightBarWidth / 2, 0);
            coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
            coreGrad.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
            coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
            coreGrad.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
            coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.globalAlpha = 1;
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.roundRect(lightBarX - lightBarWidth / 2, 0, lightBarWidth, h, 15);
            ctx.fill();

            // Glows
            const drawGlow = (widthMult: number, alpha: number, radius: number) => {
                const g = ctx.createLinearGradient(lightBarX - lightBarWidth * widthMult, 0, lightBarX + lightBarWidth * widthMult, 0);
                g.addColorStop(0, "rgba(139, 92, 246, 0)");
                g.addColorStop(0.5, `rgba(196, 181, 253, ${alpha * glowIntensity})`);
                g.addColorStop(1, "rgba(139, 92, 246, 0)");
                ctx.globalAlpha = alpha;
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.roundRect(lightBarX - lightBarWidth * widthMult, 0, lightBarWidth * widthMult * 2, h, radius);
                ctx.fill();
            }

            drawGlow(2, glow1Alpha, 25);
            drawGlow(4, glow2Alpha, 35);
            if (activeRef.current) {
                drawGlow(8, glow3Alpha, 45);
            }

            // Masking
            ctx.globalCompositeOperation = "destination-in";
            ctx.globalAlpha = 1;
            ctx.fillStyle = verticalGradient;
            ctx.fillRect(0, 0, w, h);
        };

        const render = () => {
            const targetIntensity = activeRef.current ? scanTargetIntensity : baseIntensity;
            const targetMaxParticles = activeRef.current ? scanTargetParticles : baseMaxParticles;
            const targetFadeZone = activeRef.current ? scanTargetFadeZone : baseFadeZone;

            currentIntensity += (targetIntensity - currentIntensity) * transitionSpeed;
            currentMaxParticles += (targetMaxParticles - currentMaxParticles) * transitionSpeed;
            currentFadeZone += (targetFadeZone - currentFadeZone) * transitionSpeed;

            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, w, h);

            drawLightBar();

            ctx.globalCompositeOperation = "lighter";
            particles.forEach(p => {
                updateParticle(p);
                drawParticle(p);
            });

            // Add new particles if needed
            const particleLimit = Math.floor(currentMaxParticles);
            if (Math.random() < currentIntensity && particles.length < particleLimit) {
                particles.push(createParticle());
            }

            // Extra emission based on intensity
            const ratio = currentIntensity / baseIntensity;
            if (ratio > 1.1 && Math.random() < (ratio - 1.0) * 1.2) particles.push(createParticle());
            if (ratio > 1.3 && Math.random() < (ratio - 1.3) * 1.4) particles.push(createParticle());
            if (ratio > 2.0 && Math.random() < (ratio - 2.0) * 2.0) particles.push(createParticle());

            // Remove excess roughly
            if (particles.length > particleLimit + 200) {
                particles.splice(0, Math.min(15, particles.length - particleLimit));
            }

            animationId = requestAnimationFrame(render);
        };

        resize();
        initParticles();
        render();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.scannerCanvas} />;
};

export default Scanner;
