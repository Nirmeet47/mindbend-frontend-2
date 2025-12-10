import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './style.module.css';

const BackgroundParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let scene: THREE.Scene;
        let camera: THREE.OrthographicCamera;
        let renderer: THREE.WebGLRenderer;
        let particles: THREE.Points;
        let velocities: Float32Array;
        let alphas: Float32Array;
        let animationId: number;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(
                -window.innerWidth / 2,
                window.innerWidth / 2,
                125,
                -125,
                1,
                1000
            );
            camera.position.z = 100;

            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true,
            });
            renderer.setSize(window.innerWidth, 250);
            renderer.setClearColor(0x000000, 0);

            createParticles();
            animate();
            window.addEventListener('resize', onWindowResize);
        };

        const createParticles = () => {
            const particleCount = 400;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            velocities = new Float32Array(particleCount);
            alphas = new Float32Array(particleCount);

            const texCanvas = document.createElement("canvas");
            texCanvas.width = 100;
            texCanvas.height = 100;
            const ctx = texCanvas.getContext("2d");
            if (ctx) {
                const half = texCanvas.width / 2;
                const hue = 217;
                const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
                gradient.addColorStop(0.025, "#fff");
                gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
                gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(half, half, half, 0, Math.PI * 2);
                ctx.fill();
            }

            const texture = new THREE.CanvasTexture(texCanvas);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                positions[i * 3 + 2] = 0;

                colors[i * 3] = 1;
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 1;

                const orbitRadius = Math.random() * 200 + 100;
                sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8;

                velocities[i] = Math.random() * 60 + 30;
                alphas[i] = (Math.random() * 8 + 2) / 10;
            }

            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    pointTexture: { value: texture },
                    size: { value: 15.0 },
                },
                vertexShader: `
            attribute float alpha;
            varying float vAlpha;
            varying vec3 vColor;
            uniform float size;
            
            void main() {
              vAlpha = alpha;
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size;
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
                fragmentShader: `
            uniform sampler2D pointTexture;
            varying float vAlpha;
            varying vec3 vColor;
            
            void main() {
              gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
            }
          `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                vertexColors: true,
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
        };

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            if (particles) {
                const positions = particles.geometry.attributes.position.array as Float32Array;
                const alphaAttr = particles.geometry.attributes.alpha.array as Float32Array;
                const time = Date.now() * 0.001;

                for (let i = 0; i < 400; i++) {
                    positions[i * 3] += velocities[i] * 0.016;

                    if (positions[i * 3] > window.innerWidth / 2 + 100) {
                        positions[i * 3] = -window.innerWidth / 2 - 100;
                        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                    }

                    positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

                    const twinkle = Math.floor(Math.random() * 10);
                    if (twinkle === 1 && alphaAttr[i] > 0) {
                        alphaAttr[i] -= 0.05;
                    } else if (twinkle === 2 && alphaAttr[i] < 1) {
                        alphaAttr[i] += 0.05;
                    }

                    alphaAttr[i] = Math.max(0, Math.min(1, alphaAttr[i]));
                }

                particles.geometry.attributes.position.needsUpdate = true;
                particles.geometry.attributes.alpha.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        const onWindowResize = () => {
            camera.left = -window.innerWidth / 2;
            camera.right = window.innerWidth / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, 250);
        };

        init();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationId);
            if (renderer) renderer.dispose();
            if (particles) {
                scene.remove(particles);
                particles.geometry.dispose();
                (particles.material as THREE.Material).dispose();
            }
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particleCanvas} />;
};

export default BackgroundParticles;
