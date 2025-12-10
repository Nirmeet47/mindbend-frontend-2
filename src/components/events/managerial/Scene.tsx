import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Carousel from './Carousel';
import ParticleSystem from './Particles';

const Scene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]} // Handle high DPI screens
    >
      <color attach="background" args={['#000000']} />

      {/* Lighting - subtle, mostly for standard materials if used */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Background Particles */}
      <ParticleSystem />

      {/* Main Content */}
      <Suspense fallback={null}>
        <Carousel />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
