'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TimeUnit {
  value: number;
  label: string;
}

interface CircuitNode {
  x: number;
  y: number;
  type: 'junction' | 'processor' | 'data';
  pulse: number;
  connections: number[];
}

const TimerSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'DAYS' },
    { value: 0, label: 'HOURS' },
    { value: 0, label: 'MINUTES' },
    { value: 0, label: 'SECONDS' }
  ]);

  // Target date: February 22, 2026
  const targetDate = new Date('2026-02-26T00:00:00').getTime();

  // Circuit board animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Circuit board elements
    const circuitNodes: CircuitNode[] = [];
    const circuitPaths: Array<{ 
      points: { x: number; y: number }[]; 
      type: 'data' | 'power' | 'signal';
      pulse: number;
      active: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Generate circuit nodes
      circuitNodes.length = 0;
      const nodeCount = Math.floor((canvas.width * canvas.height) / 30000);
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeType = Math.random() < 0.6 ? 'junction' : Math.random() < 0.8 ? 'processor' : 'data';
        circuitNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          type: nodeType,
          pulse: Math.random() * Math.PI * 2,
          connections: []
        });
      }

      // Generate circuit paths (more structured than neural networks)
      circuitPaths.length = 0;
      
      // Horizontal traces
      for (let y = 100; y < canvas.height; y += 120) {
        const points = [];
        for (let x = 0; x <= canvas.width; x += 80) {
          points.push({ 
            x: x + (Math.random() - 0.5) * 20, 
            y: y + (Math.random() - 0.5) * 10 
          });
        }
        circuitPaths.push({
          points,
          type: Math.random() < 0.4 ? 'power' : Math.random() < 0.7 ? 'data' : 'signal',
          pulse: Math.random() * Math.PI * 2,
          active: Math.random() < 0.3
        });
      }

      // Vertical traces
      for (let x = 100; x < canvas.width; x += 150) {
        const points = [];
        for (let y = 0; y <= canvas.height; y += 100) {
          points.push({ 
            x: x + (Math.random() - 0.5) * 15, 
            y: y + (Math.random() - 0.5) * 20 
          });
        }
        circuitPaths.push({
          points,
          type: Math.random() < 0.5 ? 'data' : 'signal',
          pulse: Math.random() * Math.PI * 2,
          active: Math.random() < 0.2
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const drawCircuitNode = (node: CircuitNode) => {
      const pulseIntensity = (Math.sin(node.pulse + time * 3) + 1) * 0.5;
      
      switch (node.type) {
        case 'junction':
          // Simple junction point
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${0.4 + pulseIntensity * 0.3})`;
          ctx.fill();
          break;
          
        case 'processor':
          // Microchip-like processor
          const size = 8;
          ctx.fillStyle = `rgba(100, 100, 100, 0.6)`;
          ctx.fillRect(node.x - size/2, node.y - size/2, size, size);
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + pulseIntensity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - size/2, node.y - size/2, size, size);
          
          // Processor pins
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const pinX = node.x + Math.cos(angle) * (size/2 + 3);
            const pinY = node.y + Math.sin(angle) * (size/2 + 3);
            
            ctx.beginPath();
            ctx.arc(pinX, pinY, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${0.6 + pulseIntensity * 0.3})`;
            ctx.fill();
          }
          break;
          
        case 'data':
          // Data storage element
          ctx.fillStyle = `rgba(100, 150, 200, ${0.3 + pulseIntensity * 0.4})`;
          ctx.fillRect(node.x - 3, node.y - 6, 6, 12);
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.6 + pulseIntensity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - 3, node.y - 6, 6, 12);
          break;
      }
    };

    const drawCircuitPath = (path: typeof circuitPaths[0]) => {
      if (path.points.length < 2) return;
      
      const baseAlpha = path.active ? 0.4 : 0.15;
      const pulseIntensity = (Math.sin(path.pulse + time * 2) + 1) * 0.5;
      
      let strokeStyle: string;
      let lineWidth: number;
      
      switch (path.type) {
        case 'power':
          strokeStyle = `rgba(100, 150, 200, ${baseAlpha + pulseIntensity * 0.2})`;
          lineWidth = 2;
          break;
        case 'data':
          strokeStyle = `rgba(0, 255, 255, ${baseAlpha + pulseIntensity * 0.3})`;
          lineWidth = 1.5;
          break;
        case 'signal':
          strokeStyle = `rgba(150, 200, 255, ${baseAlpha + pulseIntensity * 0.25})`;
          lineWidth = 1;
          break;
      }
      
      // Draw main trace
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      
      // Draw signal pulse if active
      if (path.active && Math.sin(time * 4 + path.pulse) > 0.7) {
        const pulseProgress = (Math.sin(time * 6 + path.pulse) + 1) * 0.5;
        const totalPoints = path.points.length - 1;
        const currentSegment = Math.floor(pulseProgress * totalPoints);
        const segmentProgress = (pulseProgress * totalPoints) % 1;
        
        if (currentSegment < totalPoints) {
          const startPoint = path.points[currentSegment];
          const endPoint = path.points[currentSegment + 1];
          
          const pulseX = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
          const pulseY = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;
          
          // Draw pulse
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = path.type === 'power' ? 'rgba(200, 220, 255, 0.9)' : 
                         path.type === 'data' ? 'rgba(255, 255, 255, 0.9)' : 
                         'rgba(150, 200, 255, 0.9)';
          ctx.fill();
          
          // Pulse trail
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
          ctx.fillStyle = path.type === 'power' ? 'rgba(200, 220, 255, 0.2)' : 
                         path.type === 'data' ? 'rgba(255, 255, 255, 0.2)' : 
                         'rgba(150, 200, 255, 0.2)';
          ctx.fill();
        }
      }
    };

    const animate = () => {
      time += 0.01;
      
      // Clear canvas with subtle grid pattern
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = 'rgba(50, 50, 50, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw circuit paths
      circuitPaths.forEach(path => {
        path.pulse += 0.02;
        drawCircuitPath(path);
      });
      
      // Draw circuit nodes
      circuitNodes.forEach(node => {
        node.pulse += 0.03;
        drawCircuitNode(node);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Countdown calculation
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: 'DAYS' },
          { value: hours, label: 'HOURS' },
          { value: minutes, label: 'MINUTES' },
          { value: seconds, label: 'SECONDS' }
        ]);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Circuit Board Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Timer Content */}
      <div className="relative z-10 text-center">
        {/* Circuit Frame */}
        <div className="relative p-12 border border-cyan-400/30 bg-black/40 backdrop-blur-sm rounded-lg">
          {/* Corner Circuit Elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60">
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60">
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>

          {/* Title with Circuit Lines */}
          <div className="mb-12 relative">
            <h2 className="text-2xl font-light text-gray-300 tracking-[0.2em] mb-4">
              SYSTEM INITIALIZATION
            </h2>
            
            {/* Circuit trace under title */}
            <div className="relative w-64 h-px mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>

          {/* Countdown Display with Circuit Integration */}
          <div className="flex items-center justify-center space-x-8 md:space-x-12 mb-12">
            {timeLeft.map((unit, index) => (
              <div key={unit.label} className="flex flex-col items-center relative">
                {/* Circuit Housing */}
                <div className="relative p-6 border border-gray-600/50 bg-gray-900/60 rounded-lg backdrop-blur-sm">
                  
                  {/* Time Value */}
                  <div className="relative">
                    <div 
                      className="text-4xl md:text-6xl font-mono font-light text-white tracking-wider transition-all duration-300 ease-out"
                      style={{
                        fontFamily: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    
                    {/* Glow effect on change */}
                    <div 
                      className="absolute inset-0 text-4xl md:text-6xl font-mono font-light text-cyan-400 tracking-wider opacity-0 transition-opacity duration-150"
                      style={{
                        fontFamily: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                        textShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                        animation: unit.label === 'SECONDS' ? 'digitGlow 1s ease-out' : 'none'
                      }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Unit Label with Circuit Trace */}
                <div className="mt-4 relative">
                  <div className="text-xs font-medium text-gray-400 tracking-[0.3em] mb-2">
                    {unit.label}
                  </div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
                </div>

                {/* Circuit Connection to Next Unit */}
                {index < timeLeft.length - 1 && (
                  <div className="absolute right-0 top-1/2 transform translate-x-6 md:translate-x-8 -translate-y-1/2 z-20">
                    <div className="w-8 md:w-12 h-px bg-gradient-to-r from-cyan-400/60 to-cyan-400/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Download Brochure Section */}
          <div className="mt-8 relative">
            <div className="text-sm text-gray-500 tracking-[0.2em] mb-4">
              SYSTEM DOCUMENTATION
            </div>
            
            <button 
              onClick={() => {
                // Create a dummy PDF download
                const link = document.createElement('a');
                link.href = '#'; // Replace with actual brochure URL
                link.download = 'SYMBIONT_Brochure_2026.pdf';
                link.click();
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 border border-yellow-400/50 rounded-lg hover:border-yellow-400/80 transition-all duration-300 transform hover:scale-105"
            >
              {/* Circuit pattern on button */}
              <div className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <div 
                  className="w-full h-full rounded-lg"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, rgba(255, 193, 7, 0.3) 1px, transparent 1px),
                      linear-gradient(rgba(255, 193, 7, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '8px 8px'
                  }}
                />
              </div>
              
              <div className="relative flex items-center space-x-3">
                {/* Download Icon */}
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-sm" />
                  <div className="absolute top-2 left-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-yellow-400 transform -translate-x-1/2" />
                  <div className="absolute bottom-1 left-1/2 w-px h-2 bg-yellow-400 transform -translate-x-1/2" />
                </div>
                
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-yellow-400 tracking-wider">
                    DOWNLOAD BROCHURE
                  </span>
                  <span className="text-xs text-gray-400 tracking-wide">
                    Complete System Specifications
                  </span>
                </div>
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Status Indicator */}
          <div className="mt-8 flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="text-xs text-gray-400 tracking-[0.2em]">
              COUNTDOWN ACTIVE FOR MINDBEND
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for digit glow */}
      <style jsx>{`
        @keyframes digitGlow {
          0% { opacity: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default TimerSection;