'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CircuitNode {
  x: number;
  y: number;
  label: string;
  connections: number[];
  isCore?: boolean;
  pulsePhase: number;
  glowIntensity: number;
}

interface DataPulse {
  pathIndex: number;
  progress: number;
  speed: number;
  intensity: number;
}

const AboutSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Enhanced GSAP Animations with delayed hero entrance
  useEffect(() => {
    if (!isVisible) return;

    // Set minimal initial states
    gsap.set([heroContainerRef.current, titleRef.current, subtitleRef.current, taglineRef.current], {
      opacity: 0,
      y: 30
    });

    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p');
      gsap.set(paragraphs, {
        opacity: 0,
        y: 20
      });
    }

    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      gsap.set(statCards, {
        opacity: 0,
        y: 20,
        scale: 0.9
      });
    }

    // Smoother, minimal timeline with shorter delay
    const masterTL = gsap.timeline({ delay: 1.5 }); // Reduced delay

    // Animation 1: Smooth Container Entrance
    masterTL.to(heroContainerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Animation 2: Title Smooth Reveal
    masterTL.to(titleRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Animation 3: Subtitle Flow
    masterTL.to([subtitleRef.current, taglineRef.current], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");

    // Animation 4: Content Fade-In
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p');
      masterTL.to(paragraphs, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Animation 5: Stats Smooth Entrance
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      masterTL.to(statCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Subtle floating animation
    gsap.to(heroContainerRef.current, {
      y: "+=8",
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTL.kill();
    };
  }, [isVisible]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let progress = 0;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Circuit network nodes with Indian Intelligence concepts
    const nodes: CircuitNode[] = [
      // Central core - SYMBIONT
      { x: 0.5, y: 0.5, label: 'SYMBIONT', connections: [1, 2, 3, 4, 5, 6], isCore: true, pulsePhase: 0, glowIntensity: 1 },
      
      // Primary concepts
      { x: 0.2, y: 0.25, label: 'ETHICS', connections: [0, 2, 7], isCore: false, pulsePhase: 0.5, glowIntensity: 0.8 },
      { x: 0.8, y: 0.25, label: 'INNOVATION', connections: [0, 1, 8], isCore: false, pulsePhase: 1.0, glowIntensity: 0.8 },
      { x: 0.15, y: 0.75, label: 'INDIGENOUS TECH', connections: [0, 4, 9], isCore: false, pulsePhase: 1.5, glowIntensity: 0.8 },
      { x: 0.85, y: 0.75, label: 'HUMAN INSIGHT', connections: [0, 3, 10], isCore: false, pulsePhase: 2.0, glowIntensity: 0.8 },
      { x: 0.3, y: 0.1, label: 'MACHINE PRECISION', connections: [0, 6, 11], isCore: false, pulsePhase: 2.5, glowIntensity: 0.8 },
      { x: 0.7, y: 0.9, label: 'BHARAT INTELLIGENCE', connections: [0, 5, 12], isCore: false, pulsePhase: 3.0, glowIntensity: 0.8 },
      
      // Secondary nodes
      { x: 0.05, y: 0.4, label: 'CONSCIOUSNESS', connections: [1], isCore: false, pulsePhase: 3.5, glowIntensity: 0.6 },
      { x: 0.95, y: 0.4, label: 'LEARNING', connections: [2], isCore: false, pulsePhase: 4.0, glowIntensity: 0.6 },
      { x: 0.1, y: 0.9, label: 'SOVEREIGNTY', connections: [3], isCore: false, pulsePhase: 4.5, glowIntensity: 0.6 },
      { x: 0.9, y: 0.6, label: 'INTUITION', connections: [4], isCore: false, pulsePhase: 5.0, glowIntensity: 0.6 },
      { x: 0.4, y: 0.05, label: 'ALGORITHMS', connections: [5], isCore: false, pulsePhase: 5.5, glowIntensity: 0.6 },
      { x: 0.6, y: 0.95, label: 'HERITAGE', connections: [6], isCore: false, pulsePhase: 6.0, glowIntensity: 0.6 }
    ];

    const dataPulses: DataPulse[] = [];

    // Initialize data pulses
    const initializePulses = () => {
      for (let i = 0; i < 20; i++) {
        dataPulses.push({
          pathIndex: Math.floor(Math.random() * nodes.length),
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
          intensity: 0.5 + Math.random() * 0.5
        });
      }
    };

    initializePulses();

    const drawCircuitNetwork = (progress: number, time: number) => {
      // Premium dark background with subtle gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(8, 12, 25, 1)');
      gradient.addColorStop(0.5, 'rgba(4, 8, 18, 1)');
      gradient.addColorStop(1, 'rgba(2, 4, 12, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update hover detection
      updateHoverDetection();

      // Draw circuit connections
      drawConnections(progress, time);

      // Draw data pulses
      drawDataPulses(time);

      // Draw nodes
      drawNodes(progress, time);

      // Draw labels
      drawLabels(progress);
    };

    const updateHoverDetection = () => {
      let closestNode = null;
      let minDistance = Infinity;

      nodes.forEach((node, index) => {
        const nodeX = node.x * canvas.width;
        const nodeY = node.y * canvas.height;
        const distance = Math.sqrt(
          Math.pow(mousePos.current.x - nodeX, 2) + 
          Math.pow(mousePos.current.y - nodeY, 2)
        );

        if (distance < 60 && distance < minDistance) {
          minDistance = distance;
          closestNode = index;
        }
      });

      setHoveredNode(closestNode);
    };

    const drawConnections = (progress: number, time: number) => {
      nodes.forEach((node, nodeIndex) => {
        if (nodeIndex * 0.1 > progress) return;

        node.connections.forEach(connectionIndex => {
          if (connectionIndex >= nodes.length) return;

          const startNode = node;
          const endNode = nodes[connectionIndex];
          
          const startX = startNode.x * canvas.width;
          const startY = startNode.y * canvas.height;
          const endX = endNode.x * canvas.width;
          const endY = endNode.y * canvas.height;

          drawCircuitPath(startX, startY, endX, endY, nodeIndex, time);
        });
      });
    };

    const drawCircuitPath = (
      startX: number, 
      startY: number, 
      endX: number, 
      endY: number, 
      nodeIndex: number,
      time: number
    ) => {
      const isHovered = hoveredNode === nodeIndex || 
                       (hoveredNode !== null && nodes[nodeIndex].connections.includes(hoveredNode));
      
      // Create organic circuit path with control points
      const midX = (startX + endX) / 2 + Math.sin(time * 0.001 + nodeIndex) * 20;
      const midY = (startY + endY) / 2 + Math.cos(time * 0.001 + nodeIndex) * 20;

      // Base circuit glow
      const baseAlpha = isHovered ? 0.8 : 0.4;
      const glowSize = isHovered ? 8 : 4;

      // Outer glow
      ctx.shadowColor = '#1e40af';
      ctx.shadowBlur = glowSize;
      ctx.strokeStyle = `rgba(30, 64, 175, ${baseAlpha * 0.3})`;
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.stroke();

      // Main circuit line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isHovered 
        ? `rgba(34, 197, 94, ${baseAlpha})` 
        : `rgba(59, 130, 246, ${baseAlpha})`;
      ctx.lineWidth = isHovered ? 2.5 : 1.5;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.stroke();

      // Circuit segments
      drawCircuitSegments(startX, startY, midX, midY, endX, endY, isHovered, time + nodeIndex);
    };

    const drawCircuitSegments = (
      startX: number, startY: number, 
      midX: number, midY: number, 
      endX: number, endY: number, 
      isHovered: boolean, 
      timeOffset: number
    ) => {
      const segments = 8;
      const pulseIntensity = 0.5 + 0.5 * Math.sin(timeOffset * 0.002);

      for (let i = 0; i < segments; i++) {
        const t1 = i / segments;
        const t2 = (i + 0.3) / segments;

        // Quadratic bezier interpolation
        const x1 = Math.pow(1-t1, 2) * startX + 2*(1-t1)*t1 * midX + Math.pow(t1, 2) * endX;
        const y1 = Math.pow(1-t1, 2) * startY + 2*(1-t1)*t1 * midY + Math.pow(t1, 2) * endY;
        const x2 = Math.pow(1-t2, 2) * startX + 2*(1-t2)*t2 * midX + Math.pow(t2, 2) * endX;
        const y2 = Math.pow(1-t2, 2) * startY + 2*(1-t2)*t2 * midY + Math.pow(t2, 2) * endY;

        // Circuit segment
        ctx.strokeStyle = isHovered 
          ? `rgba(251, 191, 36, ${pulseIntensity * 0.8})` 
          : `rgba(34, 197, 94, ${pulseIntensity * 0.4})`;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Circuit nodes
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.arc(x1, y1, isHovered ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isHovered 
            ? `rgba(251, 191, 36, ${pulseIntensity})` 
            : `rgba(59, 130, 246, ${pulseIntensity * 0.6})`;
          ctx.fill();
        }
      }
    };

    const drawDataPulses = (time: number) => {
      dataPulses.forEach((pulse, index) => {
        if (pulse.pathIndex >= nodes.length) return;

        const node = nodes[pulse.pathIndex];
        if (node.connections.length === 0) return;

        const targetIndex = node.connections[0];
        if (targetIndex >= nodes.length) return;

        const startNode = node;
        const endNode = nodes[targetIndex];
        
        const startX = startNode.x * canvas.width;
        const startY = startNode.y * canvas.height;
        const endX = endNode.x * canvas.width;
        const endY = endNode.y * canvas.height;

        // Calculate pulse position along path
        const t = pulse.progress;
        const pulseX = startX + (endX - startX) * t;
        const pulseY = startY + (endY - startY) * t;

        // Accelerate as approaching core
        const distanceToCore = Math.sqrt(
          Math.pow(pulseX - canvas.width * 0.5, 2) + 
          Math.pow(pulseY - canvas.height * 0.5, 2)
        );
        const acceleration = 1 + (1 - distanceToCore / (Math.max(canvas.width, canvas.height) * 0.5));

        // Draw pulse
        const pulseSize = 3 + pulse.intensity * 4;
        const pulseAlpha = pulse.intensity * 0.8;

        // Outer glow
        ctx.shadowColor = endNode.isCore ? '#f59e0b' : '#22d3ee';
        ctx.shadowBlur = pulseSize * 2;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = endNode.isCore 
          ? `rgba(245, 158, 11, ${pulseAlpha})` 
          : `rgba(34, 211, 238, ${pulseAlpha})`;
        ctx.fill();

        // Inner core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Update pulse
        pulse.progress += pulse.speed * acceleration;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.pathIndex = Math.floor(Math.random() * nodes.length);
          pulse.intensity = 0.5 + Math.random() * 0.5;
        }
      });
    };

    const drawNodes = (progress: number, time: number) => {
      nodes.forEach((node, index) => {
        if (index * 0.08 > progress) return;

        const nodeX = node.x * canvas.width;
        const nodeY = node.y * canvas.height;
        const isHovered = hoveredNode === index;
        const pulsePhase = time * 0.002 + node.pulsePhase;
        const pulseIntensity = 0.6 + 0.4 * Math.sin(pulsePhase);

        if (node.isCore) {
          drawCoreNode(nodeX, nodeY, isHovered, pulseIntensity, time);
        } else {
          drawConceptNode(nodeX, nodeY, isHovered, pulseIntensity, node.glowIntensity);
        }
      });
    };

    const drawCoreNode = (
      x: number, 
      y: number, 
      isHovered: boolean, 
      pulseIntensity: number, 
      time: number
    ) => {
      const baseSize = isHovered ? 35 : 28;
      const glowSize = baseSize * (1 + pulseIntensity * 0.3);

      // Outer energy ring
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = isHovered ? 25 : 15;
      ctx.strokeStyle = `rgba(245, 158, 11, ${pulseIntensity * 0.8})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating inner rings
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 0.001 * (i + 1) * (i % 2 === 0 ? 1 : -1));
        
        const ringRadius = baseSize * (0.4 + i * 0.15);
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.6 - i * 0.15})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.restore();
      }

      // Core center
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, baseSize * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = isHovered 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(251, 191, 36, 0.9)';
      ctx.fill();
    };

    const drawConceptNode = (
      x: number, 
      y: number, 
      isHovered: boolean, 
      pulseIntensity: number, 
      glowIntensity: number
    ) => {
      const baseSize = isHovered ? 18 : 14;
      const nodeAlpha = glowIntensity * pulseIntensity;

      // Outer glow
      ctx.shadowColor = isHovered ? '#22d3ee' : '#1e40af';
      ctx.shadowBlur = isHovered ? 20 : 10;
      ctx.beginPath();
      ctx.arc(x, y, baseSize, 0, Math.PI * 2);
      ctx.fillStyle = isHovered 
        ? `rgba(34, 211, 238, ${nodeAlpha})` 
        : `rgba(30, 64, 175, ${nodeAlpha * 0.7})`;
      ctx.fill();

      // Inner core
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, baseSize * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = isHovered 
        ? 'rgba(255, 255, 255, 0.9)' 
        : 'rgba(59, 130, 246, 0.8)';
      ctx.fill();

      // Circuit details
      if (isHovered) {
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - baseSize * 0.7, y);
        ctx.lineTo(x + baseSize * 0.7, y);
        ctx.moveTo(x, y - baseSize * 0.7);
        ctx.lineTo(x, y + baseSize * 0.7);
        ctx.stroke();
      }
    };

    const drawLabels = (progress: number) => {
      nodes.forEach((node, index) => {
        if (index * 0.1 > progress) return;

        const nodeX = node.x * canvas.width;
        const nodeY = node.y * canvas.height;
        const isHovered = hoveredNode === index;

        // Label styling
        ctx.font = node.isCore 
          ? (isHovered ? 'bold 24px "Inter", sans-serif' : 'bold 20px "Inter", sans-serif')
          : (isHovered ? 'bold 16px "Inter", sans-serif' : 'bold 12px "Inter", sans-serif');
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Label positioning
        const labelOffset = node.isCore ? 50 : 35;
        const labelY = nodeY + labelOffset;

        // Label background (circuit-integrated)
        if (isHovered || node.isCore) {
          const textMetrics = ctx.measureText(node.label);
          const bgWidth = textMetrics.width + 20;
          const bgHeight = node.isCore ? 30 : 20;

          // Circuit-style background
          ctx.fillStyle = node.isCore 
            ? 'rgba(245, 158, 11, 0.15)' 
            : 'rgba(30, 64, 175, 0.15)';
          ctx.fillRect(nodeX - bgWidth/2, labelY - bgHeight/2, bgWidth, bgHeight);

          // Border
          ctx.strokeStyle = node.isCore 
            ? 'rgba(245, 158, 11, 0.4)' 
            : 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 1;
          ctx.strokeRect(nodeX - bgWidth/2, labelY - bgHeight/2, bgWidth, bgHeight);
        }

        // Label text with glow
        if (isHovered) {
          ctx.shadowColor = node.isCore ? '#f59e0b' : '#22d3ee';
          ctx.shadowBlur = 8;
        }

        ctx.fillStyle = node.isCore 
          ? (isHovered ? '#fbbf24' : '#f59e0b')
          : (isHovered ? '#22d3ee' : '#60a5fa');
        
        ctx.fillText(node.label, nodeX, labelY);
        ctx.shadowBlur = 0;
      });
    };



    const animate = () => {
      if (isVisible && progress < 1) {
        progress += 0.01;
        setAnimationProgress(progress);
      }
      
      time += 16; // Approximate 60fps
      drawCircuitNetwork(progress, time);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ zIndex: 1 }}
        onMouseMove={handleMouseMove}
      />

      {/* Minimal Center-Aligned Content */}
      <div className="relative z-10 flex items-center justify-center h-screen px-4 lg:px-6">
        <div 
          ref={heroContainerRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Minimal Glass Container */}
          <div 
            className="relative p-6 lg:p-8 rounded-3xl backdrop-blur-xl bg-white/8 border border-white/15 shadow-xl"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Content */}
            <div className="relative space-y-6">
              
              {/* Title Section */}
              <div className="space-y-3">
                <h1 
                  ref={titleRef}
                  className="text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 leading-tight"
                >
                  SYMBIONT
                </h1>
                
                <p 
                  ref={subtitleRef}
                  className="text-lg lg:text-xl text-cyan-300 font-semibold"
                >
                  The Cognitive Genesis
                </p>
                
                <p 
                  ref={taglineRef}
                  className="text-base lg:text-lg text-green-400 italic"
                >
                  "Forging the Future of Indian Intelligence."
                </p>
              </div>

              {/* Condensed Content */}
              <div ref={contentRef} className="space-y-4 max-w-3xl mx-auto">
                <p className="text-sm lg:text-base text-gray-200 leading-relaxed">
                  <span className="text-cyan-400 font-semibold">"SYMBIONT"</span> marks a new chapter where humans and AI coexist as partners in progress.
                </p>
                
                <p className="text-sm lg:text-base text-gray-200 leading-relaxed">
                  An AI revolution rooted in <span className="text-yellow-400 font-semibold">Bharat</span>, where innovation and ethics rise from our own soil.
                </p>
                
                <p className="text-sm lg:text-base text-gray-200 leading-relaxed">
                  Celebrating collaboration between <span className="text-green-400 font-semibold">human insight</span> and <span className="text-cyan-400 font-semibold">machine precision</span> for technological independence.
                </p>
              </div>

              {/* Compact Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
                <div className="stat-card text-center p-4 rounded-2xl backdrop-blur-md bg-cyan-500/15 border border-cyan-400/30">
                  <div className="text-2xl lg:text-3xl font-bold text-cyan-400">AI</div>
                  <div className="text-xs text-cyan-300">Innovation</div>
                </div>
                
                <div className="stat-card text-center p-4 rounded-2xl backdrop-blur-md bg-green-500/15 border border-green-400/30">
                  <div className="text-2xl lg:text-3xl font-bold text-green-400">Human</div>
                  <div className="text-xs text-green-300">Insight</div>
                </div>
                
                <div className="stat-card text-center p-4 rounded-2xl backdrop-blur-md bg-yellow-500/15 border border-yellow-400/30">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400">Bharat</div>
                  <div className="text-xs text-yellow-300">Heritage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Atmospheric Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Subtle ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-cyan-400/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-radial from-green-400/6 to-transparent rounded-full blur-2xl"></div>
        
        {/* Minimal grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;