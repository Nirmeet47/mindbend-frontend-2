'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Seeded random number generator
const seed = 123456;
const mulberry32 = (a: number) => {
    return () => {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

const BuildingShader = {
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uHeight;
    
    void main() {
      // Create a grid pattern for windows
      vec2 grid = fract(vUv * vec2(4.0, uHeight * 2.0));
      float lineThickness = 0.1;
      
      // Window light pattern
      float window = step(lineThickness, grid.x) * step(lineThickness, grid.y);
      
      // Randomly turn off some windows
      float noise = fract(sin(dot(floor(vUv * vec2(4.0, uHeight * 2.0)), vec2(12.9898, 78.233))) * 43758.5453);
      float lightOn = step(0.6, noise); 
      
      // Glow gradient from bottom
      float glow = 1.0 - smoothstep(0.0, 0.4, vUv.y);
      
      vec3 finalColor = uColor * (window * lightOn * 2.0); // Lit windows
      finalColor += uColor * 0.1; // Darker Base
      finalColor += vec3(0.0, 0.5, 1.0) * glow * 0.5; // Bottom glow
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `
};

const Building = ({ position, args, color }: { position: [number, number, number]; args: [number, number, number]; color: string }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const uniformRef = useRef({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uHeight: { value: args[1] }
    });

    useFrame((state) => {
        if (uniformRef.current) {
            uniformRef.current.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            <boxGeometry args={args} />
            <shaderMaterial
                uniforms={uniformRef.current}
                vertexShader={BuildingShader.vertexShader}
                fragmentShader={BuildingShader.fragmentShader}
                transparent
            />
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...args)]} />
                <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
            </lineSegments>
        </mesh>
    );
};

const City = () => {
    const buildings = useMemo(() => {
        const items = [];
        const rng = mulberry32(seed); // Deterministic RNG

        // Generate a fixed city layout
        const count = 60;

        for (let i = 0; i < count; i++) {
            // Distribute buildings
            const x = (rng() - 0.5) * 120;

            // Clear center
            if (Math.abs(x) < 8) continue;

            let z = (rng() - 0.5) * 60 - 15;

            const width = 3 + rng() * 4;
            const depth = 3 + rng() * 4;
            // Taller buildings on the periphery
            const height = 15 + rng() * 35;

            items.push({
                position: [x, height / 2 - 8, z] as [number, number, number],
                args: [width, height, depth] as [number, number, number],
                color: '#0066cc'
            });
        }
        return items;
    }, []);

    return (
        <group>
            {buildings.map((b, i) => (
                <Building key={i} {...b} />
            ))}
        </group>
    );
};

const FloatingSymbol = ({ symbol, position, color = "#00d2ff" }: { symbol: string, position: [number, number, number], color?: string }) => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
            <Text
                fontSize={3}
                position={position}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                {symbol}
                <meshBasicMaterial color={color} toneMapped={false} />
            </Text>
        </Float>
    )
}

const CustomGrid = () => {
    return (
        <group position={[0, -8, 0]}>
            <gridHelper args={[200, 40, 0x00ffff, 0x001133]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshBasicMaterial color="#00020a" transparent opacity={0.95} />
            </mesh>
        </group>
    )
}

const Symbols = () => {
    const symbols = useMemo(() => {
        const rng = mulberry32(seed + 999); // Deterministic RNG for symbols
        const chars = ['$', '€', '¥', '₿', '%', '₹'];
        const items = [];
        for (let i = 0; i < 60; i++) {
            items.push({
                char: chars[Math.floor(rng() * chars.length)],
                pos: [(rng() - 0.5) * 80, rng() * 30 - 5, (rng() - 0.5) * 40 - 10] as [number, number, number],
                color: rng() > 0.5 ? '#00ffff' : '#0077ff'
            })
        }
        return items;
    }, []);

    return (
        <group>
            {symbols.map((s, i) => (
                <FloatingSymbol key={i} symbol={s.char} position={s.pos} color={s.color} />
            ))}
        </group>
    )
}

const Rig = () => {
    useFrame((state) => {
        // Parallax effect: Move camera slightly based on pointer position
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 5, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 5 + state.pointer.y * 2, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

const InteractiveLight = () => {
    const light = useRef<THREE.PointLight>(null);
    useFrame((state) => {
        if (light.current) {
            // Move light based on pointer, projected roughly to the scene center depth
            light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, state.pointer.x * 40, 0.1);
            light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, state.pointer.y * 20, 0.1);
            light.current.position.z = 10; // In front of the city
        }
    });

    return (
        <pointLight ref={light} distance={40} intensity={5} color="#00ffff" decay={2} />
    )
}

export default function ManagerialBackground() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-[#000510] overflow-hidden">
            <Canvas camera={{ position: [0, 5, 50], fov: 45 }}>
                <fog attach="fog" args={['#000510', 20, 90]} />
                <ambientLight intensity={0.2} />

                {/* Cinematic Lighting */}
                <spotLight position={[100, 100, 50]} angle={0.5} penumbra={1} intensity={2} color="#0044ff" />
                <spotLight position={[-100, 50, 50]} angle={0.5} penumbra={1} intensity={2} color="#00ffff" />

                {/* Interactive Elements */}
                <Rig />
                <InteractiveLight />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, -5, 0]}>
                    <City />
                    <Symbols />
                    <CustomGrid />
                </group>

            </Canvas>

            {/* Vignette & Color Grading Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000510] via-transparent to-[#000510]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-60 pointer-events-none" />
        </div>
    );
}
