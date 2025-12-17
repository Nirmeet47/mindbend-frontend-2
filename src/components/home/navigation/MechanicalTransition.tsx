'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface MechanicalTransitionProps {
  isActive: boolean;
  onTransitionComplete: () => void;
  onTransitionStart: () => void;
}

interface PanelSegment {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  type: 'primary' | 'secondary' | 'tertiary';
}

const MechanicalTransition: React.FC<MechanicalTransitionProps> = ({
  isActive,
  onTransitionComplete,
  onTransitionStart
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const circuitLinesRef = useRef<HTMLDivElement[]>([]);
  const dataPulsesRef = useRef<HTMLDivElement[]>([]);
  const [topSegments, setTopSegments] = useState<PanelSegment[]>([]);
  const [bottomSegments, setBottomSegments] = useState<PanelSegment[]>([]);

  // Generate layered panel segments
  useEffect(() => {
    const generateSegments = (isTop: boolean): PanelSegment[] => {
      const segments: PanelSegment[] = [];
      const baseY = isTop ? 0 : 50;
      const panelHeight = 50;

      // Primary layer (main panel)
      segments.push({
        id: 0,
        x: 0,
        y: baseY,
        width: 100,
        height: panelHeight,
        depth: 0,
        type: 'primary'
      });

      // Secondary layers (mechanical details)
      for (let i = 0; i < 3; i++) {
        const segmentWidth = 25 + i * 5;
        const segmentX = 10 + i * 20;
        segments.push({
          id: i + 1,
          x: segmentX,
          y: baseY + (isTop ? panelHeight - 8 : 2),
          width: segmentWidth,
          height: 6,
          depth: i + 1,
          type: 'secondary'
        });
      }

      // Tertiary layers (circuit details)
      for (let i = 0; i < 5; i++) {
        segments.push({
          id: i + 4,
          x: 5 + i * 18,
          y: baseY + (isTop ? panelHeight - 3 : panelHeight - 3),
          width: 12,
          height: 2,
          depth: 2,
          type: 'tertiary'
        });
      }

      return segments;
    };

    setTopSegments(generateSegments(true));
    setBottomSegments(generateSegments(false));
  }, []);

  // Animation logic
  useEffect(() => {
    if (!isActive || topSegments.length === 0) return;

    const animateTransition = async () => {

      // Set initial states
      if (topPanelRef.current && bottomPanelRef.current) {
        gsap.set(topPanelRef.current, {
          y: '-100%',
          opacity: 0
        });
        
        gsap.set(bottomPanelRef.current, {
          y: '100%',
          opacity: 0
        });
      }

      // Circuit lines and data pulses initial state
      circuitLinesRef.current.forEach(line => {
        if (line) gsap.set(line, { scaleX: 0, opacity: 0 });
      });

      dataPulsesRef.current.forEach(pulse => {
        if (pulse) gsap.set(pulse, { x: '-100%', opacity: 0 });
      });

      // Phase 1: Vault doors close (panels slide to center)
      const tl1 = gsap.timeline();
      
      if (topPanelRef.current && bottomPanelRef.current) {
        tl1.to([topPanelRef.current, bottomPanelRef.current], {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });

        tl1.to(topPanelRef.current, {
          y: '0%',
          duration: 1.2,
          ease: "power3.out"
        }, 0.1);

        tl1.to(bottomPanelRef.current, {
          y: '0%',
          duration: 1.2,
          ease: "power3.out"
        }, 0.1);
      }

      await tl1;

      // Phase 2: Circuit activation
      const tl2 = gsap.timeline();
      
      // Activate circuit lines
      circuitLinesRef.current.forEach((line, index) => {
        if (line) {
          tl2.to(line, {
            scaleX: 1,
            opacity: 0.8,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1
          }, 0);
        }
      });

      // Data pulses
      dataPulsesRef.current.forEach((pulse, index) => {
        if (pulse) {
          tl2.to(pulse, {
            x: '100%',
            opacity: 1,
            duration: 1.5,
            ease: "power1.inOut",
            delay: index * 0.05
          }, 0.3);
        }
      });

      await tl2;


      // System lock pause
      await new Promise(resolve => setTimeout(resolve, 800));

      // Phase 3: Vault doors open (panels retract)
      const tl3 = gsap.timeline();

      // Switch to new component when gates start opening
      onTransitionStart();

      // Fade out effects first
      tl3.to([...circuitLinesRef.current, ...dataPulsesRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });

      // Retract panels
      if (topPanelRef.current && bottomPanelRef.current) {
        tl3.to(topPanelRef.current, {
          y: '-100%',
          duration: 1.0,
          ease: "power3.in"
        }, 0.2);

        tl3.to(bottomPanelRef.current, {
          y: '100%',
          duration: 1.0,
          ease: "power3.in"
        }, 0.2);

        tl3.to([topPanelRef.current, bottomPanelRef.current], {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, 0.8);
      }

      await tl3;
      
      onTransitionComplete();
    };

    animateTransition();
  }, [isActive, topSegments, bottomSegments, onTransitionComplete, onTransitionStart]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Top Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ transformOrigin: 'center bottom' }}
      >
        {/* Primary Panel Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 border-b-2 border-gray-600">
          {/* Brushed Metal Texture */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                linear-gradient(90deg, 
                  rgba(75, 85, 99, 0.8) 0%, 
                  rgba(55, 65, 81, 0.9) 25%,
                  rgba(75, 85, 99, 0.8) 50%,
                  rgba(55, 65, 81, 0.9) 75%,
                  rgba(75, 85, 99, 0.8) 100%
                )
              `,
              backgroundSize: '4px 100%'
            }}
          />

          {/* Circuit Etching Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                  linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Secondary Mechanical Segments */}
          {topSegments.filter(s => s.type === 'secondary').map(segment => (
            <div
              key={segment.id}
              className="absolute bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 border border-gray-500/50 shadow-lg"
              style={{
                left: `${segment.x}%`,
                bottom: `${100 - segment.y - segment.height}%`,
                width: `${segment.width}%`,
                height: `${segment.height}%`,
                transform: `translateZ(${segment.depth * 2}px)`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Segment Details */}
              <div className="absolute inset-1 bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-sm" />
              <div className="absolute top-1 right-1 w-2 h-1 bg-orange-400/60 rounded-full" />
            </div>
          ))}

          {/* Tertiary Circuit Details */}
          {topSegments.filter(s => s.type === 'tertiary').map(segment => (
            <div
              key={segment.id}
              className="absolute bg-gradient-to-r from-blue-500/30 to-blue-400/30 border border-blue-400/50"
              style={{
                left: `${segment.x}%`,
                bottom: `0%`,
                width: `${segment.width}%`,
                height: `${segment.height}%`
              }}
            />
          ))}

          {/* Main Circuit Lines */}
          <div
            ref={el => { if (el) circuitLinesRef.current[0] = el; }}
            className="absolute bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-sm shadow-blue-400/50"
            style={{ transformOrigin: 'left center' }}
          />
          <div
            ref={el => { if (el) circuitLinesRef.current[1] = el; }}
            className="absolute bottom-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Data Pulses */}
          <div
            ref={el => { if (el) dataPulsesRef.current[0] = el; }}
            className="absolute bottom-4 left-0 w-8 h-px bg-gradient-to-r from-blue-400 via-white to-blue-400 shadow-lg shadow-blue-400/80"
            style={{ transformOrigin: 'left center' }}
          />
          <div
            ref={el => { if (el) dataPulsesRef.current[1] = el; }}
            className="absolute bottom-8 left-0 w-6 h-px bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-lg shadow-cyan-400/80"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Corner Reinforcements */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-orange-400/60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-400/60" />
          
          {/* Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
      </div>

      {/* Bottom Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ transformOrigin: 'center top' }}
      >
        {/* Primary Panel Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-900 to-gray-800 border-t-2 border-gray-600">
          {/* Brushed Metal Texture */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                linear-gradient(90deg, 
                  rgba(75, 85, 99, 0.8) 0%, 
                  rgba(55, 65, 81, 0.9) 25%,
                  rgba(75, 85, 99, 0.8) 50%,
                  rgba(55, 65, 81, 0.9) 75%,
                  rgba(75, 85, 99, 0.8) 100%
                )
              `,
              backgroundSize: '4px 100%'
            }}
          />

          {/* Circuit Etching Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                  linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Secondary Mechanical Segments */}
          {bottomSegments.filter(s => s.type === 'secondary').map(segment => (
            <div
              key={segment.id}
              className="absolute bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 border border-gray-500/50 shadow-lg"
              style={{
                left: `${segment.x}%`,
                top: `${segment.y - 50}%`,
                width: `${segment.width}%`,
                height: `${segment.height}%`,
                transform: `translateZ(${segment.depth * 2}px)`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Segment Details */}
              <div className="absolute inset-1 bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-sm" />
              <div className="absolute bottom-1 left-1 w-2 h-1 bg-orange-400/60 rounded-full" />
            </div>
          ))}

          {/* Tertiary Circuit Details */}
          {bottomSegments.filter(s => s.type === 'tertiary').map(segment => (
            <div
              key={segment.id}
              className="absolute bg-gradient-to-r from-blue-500/30 to-blue-400/30 border border-blue-400/50"
              style={{
                left: `${segment.x}%`,
                top: `0%`,
                width: `${segment.width}%`,
                height: `${segment.height}%`
              }}
            />
          ))}

          {/* Main Circuit Lines */}
          <div
            ref={el => { if (el) circuitLinesRef.current[2] = el; }}
            className="absolute top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-sm shadow-blue-400/50"
            style={{ transformOrigin: 'left center' }}
          />
          <div
            ref={el => { if (el) circuitLinesRef.current[3] = el; }}
            className="absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Data Pulses */}
          <div
            ref={el => { if (el) dataPulsesRef.current[2] = el; }}
            className="absolute top-4 left-0 w-8 h-px bg-gradient-to-r from-blue-400 via-white to-blue-400 shadow-lg shadow-blue-400/80"
            style={{ transformOrigin: 'left center' }}
          />
          <div
            ref={el => { if (el) dataPulsesRef.current[3] = el; }}
            className="absolute top-8 left-0 w-6 h-px bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-lg shadow-cyan-400/80"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Corner Reinforcements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-400/60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-orange-400/60" />
          
          {/* Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
        </div>
      </div>

      {/* Center Seam Effect */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent transform -translate-y-1/2 shadow-lg shadow-blue-400/50" />
    </div>
  );
};

export default MechanicalTransition;