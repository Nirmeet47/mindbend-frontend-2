'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Instance, Instances, Points, PointMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- VISUAL CONSTANTS ---
const THEME_BLUE = '#00BFFF'; // Electric Blue
const THEME_CYAN = '#00d9ff'; // Cyber Cyan
const THEME_NAVY = '#0a0e27'; // Deep Tech Navy
const THEME_VOID = '#020617'; // Almost Black

// COMMON CANVAS SETTINGS FOR PERFORMANCE
// Removed 'camera' from here to avoid overwrites
const CANVAS_SETTINGS = {
    dpr: [1, 1.5] as [number, number],
    frameloop: "always" as const,
    gl: { antialias: false, powerPreference: "high-performance" as const, alpha: true },
    style: { position: 'absolute' as const, inset: 0, zIndex: 0, pointerEvents: 'none' as const, background: 'transparent' }
};

// ==============================================
// 1. WORKSHOPS: BLUEPRINT GRID (Schematic/Foundation)
// ==============================================
const BlueprintGrid = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.z += delta * 0.05; // Very slow, precision rotation
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[80, 80, 60, 60]} />
            <meshBasicMaterial
                color={THEME_BLUE}
                wireframe
                transparent
                opacity={0.08} // Very subtle
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export const WorkshopsBG = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: THEME_NAVY }}>
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }} {...CANVAS_SETTINGS}>
                <fog attach="fog" args={[THEME_NAVY, 5, 25]} />
                <BlueprintGrid />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
                    <planeGeometry args={[120, 120, 20, 20]} />
                    <meshBasicMaterial color={THEME_CYAN} wireframe transparent opacity={0.03} />
                </mesh>
            </Canvas>
            {/* Seamless gradient: Only fade slightly at top/bottom, keep core clear */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${THEME_NAVY} 0%, transparent 20%, transparent 80%, ${THEME_NAVY} 100%)` }} />
        </div>
    );
};

// ==============================================
// 2. SPONSORS: TECH POLYGONS (Structure/Network)
// ==============================================
const PolygonInstances = () => {
    const count = 40;
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const data = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: 0.5 + Math.random() * 0.5,
            speed: 0.1 + Math.random() * 0.2
        }));
    }, []);

    useFrame((state, delta) => {
        data.forEach((d, i) => {
            d.rotation[0] += d.speed * delta;
            d.rotation[1] += d.speed * delta;

            dummy.position.set(d.position[0], d.position[1], d.position[2]);
            dummy.rotation.set(d.rotation[0], d.rotation[1], d.rotation[2]);
            dummy.scale.set(d.scale, d.scale, d.scale);
            dummy.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
        });
        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color={THEME_BLUE} wireframe transparent opacity={0.15} />
            </instancedMesh>
        </Float>
    );
};

export const SponsorsBG = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: THEME_NAVY }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} {...CANVAS_SETTINGS}>
                <PolygonInstances />
                <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
            </Canvas>
            {/* Seamless gradient: Only fade slightly at top/bottom, keep core clear */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${THEME_NAVY} 0%, transparent 20%, transparent 80%, ${THEME_NAVY} 100%)` }} />
        </div>
    );
};

// ==============================================
// 3. LECTURES: DATA STREAM (Flow/Information)
// ==============================================
const DataStreamInstances = () => {
    const count = 100;
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 30,
            z: (Math.random() - 0.5) * 15,
            speed: 2 + Math.random() * 3,
            len: 1 + Math.random() * 2
        }));
    }, []);

    useFrame((state, delta) => {
        particles.forEach((p, i) => {
            p.y -= p.speed * delta;
            if (p.y < -15) p.y = 15;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(0.1, p.len, 0.1);
            dummy.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
        });
        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={THEME_CYAN} transparent opacity={0.4} />
        </instancedMesh>
    );
};

export const LecturesBG = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: THEME_NAVY }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} {...CANVAS_SETTINGS}>
                <group rotation={[0, 0, Math.PI / 8]}>
                    <DataStreamInstances />
                </group>
                <fog attach="fog" args={[THEME_NAVY, 5, 30]} />
            </Canvas>
            {/* Seamless gradient: Only fade slightly at top/bottom, keep core clear */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${THEME_NAVY} 0%, transparent 20%, transparent 80%, ${THEME_NAVY} 100%)` }} />
        </div>
    );
};

// ==============================================
// 4. COMMITTEE: STRATEGIC NETWORK (Connection/Leadership)
// ==============================================
const NetworkGlobe = () => {
    const pointsRef = useRef<THREE.Points>(null!);

    useFrame((state, delta) => {
        pointsRef.current.rotation.y += delta * 0.1;
    });

    // Generate points
    const points = useMemo(() => {
        const p = new Float32Array(3000);
        for (let i = 0; i < 3000; i++) {
            p[i] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, []);

    return (
        <group scale={1.2}>
            <Points ref={pointsRef} positions={points} stride={3}>
                <PointMaterial transparent color={THEME_BLUE} size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
            </Points>
            <mesh>
                <sphereGeometry args={[3.8, 32, 32]} />
                <meshBasicMaterial color={THEME_NAVY} transparent opacity={0.9} />
            </mesh>
            <mesh>
                <sphereGeometry args={[4.2, 32, 32]} />
                <meshBasicMaterial color={THEME_CYAN} wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    );
};

export const CommitteeBG = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: THEME_NAVY }}>
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} {...CANVAS_SETTINGS}>
                <NetworkGlobe />
                <Stars radius={80} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
            </Canvas>
            {/* Seamless gradient: Only fade slightly at top/bottom, keep core clear */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${THEME_NAVY} 0%, transparent 20%, transparent 80%, ${THEME_NAVY} 100%)` }} />
        </div>
    );
};

// ==============================================
// 5. LATEST UPDATES: COMMAND CENTER RADAR (Monitoring/News)
// ==============================================
const RadarSweep = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.z -= delta * 0.5; // Radar sweep
    });

    return (
        <group rotation={[-Math.PI / 3, 0, 0]}>
            {/* Grid Base */}
            <mesh>
                <planeGeometry args={[30, 30, 40, 40]} />
                <meshBasicMaterial color={THEME_BLUE} wireframe transparent opacity={0.1} />
            </mesh>
            {/* Radar Line */}
            <mesh ref={meshRef} position={[0, 0, 0.1]}>
                <circleGeometry args={[14, 64, 0, 0.5]} />
                <meshBasicMaterial color={THEME_CYAN} transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
            {/* Ring 1 */}
            <mesh>
                <ringGeometry args={[13.8, 14, 64]} />
                <meshBasicMaterial color={THEME_BLUE} transparent opacity={0.3} />
            </mesh>
            {/* Ring 2 */}
            <mesh>
                <ringGeometry args={[9.8, 10, 64]} />
                <meshBasicMaterial color={THEME_CYAN} transparent opacity={0.2} />
            </mesh>
            {/* Ring 3 */}
            <mesh>
                <ringGeometry args={[4.8, 5, 64]} />
                <meshBasicMaterial color={THEME_NAVY} transparent opacity={0.5} />
            </mesh>
        </group>
    );
};

export const LatestUpdatesBG = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: THEME_NAVY }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} {...CANVAS_SETTINGS} frameloop="always">
                <RadarSweep />
                <Stars radius={60} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={[THEME_NAVY, 10, 40]} />
            </Canvas>
            {/* Seamless gradient */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${THEME_NAVY} 0%, transparent 20%, transparent 80%, ${THEME_NAVY} 100%)` }} />
        </div>
    );
};
