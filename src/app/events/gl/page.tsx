"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  MeshReflectorMaterial,
  Text,
  useTexture,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";

// --- Data ---
const GL_EVENTS = [
  {
    id: 1,
    name: "Dr. Richard Feynman",
    role: "Nobel Laureate, Physics",
    topic: "The Pleasure of Finding Things Out",
    date: "March 15, 2025",
    time: "10:00 AM",
    venue: "Main Auditorium",
    image: "/director-image.png",
    color: "#00ffff", // Cyan
  },
  {
    id: 2,
    name: "Ada Lovelace",
    role: "Computer Scientist",
    topic: "The Future of Artificial Intelligence",
    date: "March 16, 2025",
    time: "2:00 PM",
    venue: "Virtual Hall A",
    image: "/director-image.png",
    color: "#ff00ff", // Magenta
  },
  {
    id: 3,
    name: "Nikola Tesla",
    role: "Inventor & Engineer",
    topic: "Wireless Energy Transmission",
    date: "March 17, 2025",
    time: "11:00 AM",
    venue: "Tesla Lab",
    image: "/director-image.png",
    color: "#00ff88", // Green
  },
];

// --- 3D Components ---

function Microphone(props: any) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Subtle floating animation separate from the Float component for more control if needed
      // group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Mic Head - Mesh Grille texture simulated with wireframe */}
      <mesh position={[0, 2.8, 0]}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#222"
          metalness={0.9}
          roughness={0.3}
          emissive="#111"
        />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <icosahedronGeometry args={[0.82, 1]} />
        <meshStandardMaterial
          color="#444"
          wireframe
          metalness={1}
          roughness={0}
          emissive="#333"
        />
      </mesh>

      {/* Mic Ring */}
      <mesh position={[0, 2.0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        <meshStandardMaterial metalness={1} roughness={0.1} color={"#ffd700"} />
      </mesh>

      {/* Mic Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Mic Body/Handle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 2.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Stand Connector */}
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>

      {/* Stand Vertical */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.5, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -4.8, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.2, 32]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glowing Ring on Base */}
      <mesh position={[0, -4.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.5, 64]} />
        <meshBasicMaterial color="cyan" toneMapped={false} />
      </mesh>

    </group>
  );
}

function Stage() {
  return (
    <>
      {/* Reflective Dark Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.4}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#020202"
          metalness={0.5}
          mirror={0.8}
        />
      </mesh>

      {/* Background Ambience - Replaced simple Stars with a more volumetric feel via fog and scattered lights */}
      <ambientLight intensity={0.2} />

      {/* Main Spotlights targeting the center */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={20}
        color="#00ffff"
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        position={[-10, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={20}
        color="#d000ff"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Rim light for the mic */}
      <pointLight position={[0, 5, -5]} intensity={5} color="white" />

    </>
  );
}

function Experience() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
      <fog attach="fog" args={['#050505', 8, 30]} />

      <Stage />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Microphone position={[0, 0.5, 0]} />
      </Float>

      {/* Volumetric Light Beams (Simulated completely with cones for performance/style) */}
      <mesh position={[5, 5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[2, 15, 32, 1, true]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-5, 5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <coneGeometry args={[2, 15, 32, 1, true]} />
        <meshBasicMaterial color="#d000ff" transparent opacity={0.03} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

    </>
  )
}


// --- UI Components ---

const DetailCard = ({ event, active, onClick }: { event: any, active: boolean, onClick: () => void }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 ease-out border overflow-hidden backdrop-blur-md relative
                ${active ? 'w-[400px] h-[500px] border-cyan-400 bg-white/10 z-20 shadow-[0_0_50px_rgba(0,255,255,0.2)]' : 'w-[100px] h-[400px] border-white/5 bg-white/5 z-10 hover:bg-white/10 grayscale hover:grayscale-0'}
            `}
      style={{ borderRadius: '20px' }}
    >
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Vertical Title for inactive state */}
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white/50 whitespace-nowrap -rotate-90 tracking-widest uppercase origin-center transform translate-y-12">
            {event.name.split(' ').pop()}
          </h3>
        </div>
      )}

      {/* Active Content */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 h-full flex flex-col justify-end p-8"
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono tracking-widest uppercase rounded">
                    Guest Lecture
                  </span>
                  <span className="text-cyan-500/50 text-[10px] font-mono">
                                        // 0{event.id}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-white leading-none font-kanit uppercase drop-shadow-lg">
                  {event.name}
                </h2>
                <p className="text-lg text-gray-300 font-light mt-1">{event.role}</p>
              </div>

              <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

              <p className="text-sm text-gray-400 italic">"{event.topic}"</p>

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-300 font-mono pt-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-cyan-400" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-purple-400" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin size={14} className="text-green-400" />
                  {event.venue}
                </div>
              </div>

              <button className="w-full mt-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider text-sm rounded transition-colors flex items-center justify-center gap-2 group">
                Register Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export default function GLPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center">

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Experience />
        </Canvas>
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none pb-12 pt-24 px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter uppercase font-orbitron drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Guest Lectures
          </h1>
          <p className="text-cyan-400/60 tracking-[0.5em] text-sm md:text-base font-light mt-2 uppercase">
            The Virtual Stage
          </p>
        </motion.div>

        {/* Floating Gallery */}
        <div className="flex items-center justify-center gap-4 pointer-events-auto h-[550px]">
          {GL_EVENTS.map((event, index) => (
            <DetailCard
              key={event.id}
              event={event}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Footer / Controls Hint */}
        <div className="text-center opacity-30 text-xs font-mono text-white">
          SELECT A SPEAKER TO VIEW DETAILS
        </div>

      </div>
    </div>
  );
}
