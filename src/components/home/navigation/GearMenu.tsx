import React, { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const FuturisticGearAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  
  // URL mappings for each label
  const labelUrls: { [key: string]: string } = {
    'CONTACT': '/contact',
    'ACCOMMODATION': '/accommodation',
    'EVENTS': '/events',
    'SPONSERS': '/sponsors',
    'CAMPUS AMBASSADOR': '/campus-ambassador',
    'LOGIN': '/login',
    'SIGNUP': '/signup',
    'ABOUT US': '/about'
  };

  // Store clickable areas for each node
  const clickableAreas = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    label: string;
    url: string;
  }>>([]);

  // Track hover state
  const hoveredNode = useRef<string | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is within any clickable area
    for (const area of clickableAreas.current) {
      const distance = Math.sqrt((x - area.x) ** 2 + (y - area.y) ** 2);
      if (distance <= area.radius + 25) { // Add some padding for easier clicking
        router.push(area.url);
        return;
      }
    }
  }, [router]);

  const handleCanvasMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mousePosition.current = { x, y };

    // Check if mouse is over any clickable area
    let newHoveredNode: string | null = null;
    for (const area of clickableAreas.current) {
      const distance = Math.sqrt((x - area.x) ** 2 + (y - area.y) ** 2);
      if (distance <= area.radius + 25) {
        newHoveredNode = area.label;
        break;
      }
    }

    hoveredNode.current = newHoveredNode;
    canvas.style.cursor = newHoveredNode ? 'pointer' : 'default';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawGear = (
      x: number,
      y: number,
      radius: number,
      teeth: number,
      rotation: number,
      innerRadius: number = 0.7
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const toothHeight = radius * 0.2;
      const toothWidth = (2 * Math.PI * radius * innerRadius) / teeth / 2;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle1 = (i / teeth) * Math.PI * 2;
        const angle2 = ((i + 0.4) / teeth) * Math.PI * 2;
        const angle3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const angle4 = ((i + 1) / teeth) * Math.PI * 2;

        const innerX1 = Math.cos(angle1) * (radius * innerRadius);
        const innerY1 = Math.sin(angle1) * (radius * innerRadius);
        const innerX2 = Math.cos(angle2) * (radius * innerRadius);
        const innerY2 = Math.sin(angle2) * (radius * innerRadius);

        const outerX1 = Math.cos(angle2) * radius;
        const outerY1 = Math.sin(angle2) * radius;
        const outerX2 = Math.cos(angle3) * radius;
        const outerY2 = Math.sin(angle3) * radius;

        const innerX3 = Math.cos(angle3) * (radius * innerRadius);
        const innerY3 = Math.sin(angle3) * (radius * innerRadius);
        const innerX4 = Math.cos(angle4) * (radius * innerRadius);
        const innerY4 = Math.sin(angle4) * (radius * innerRadius);

        if (i === 0) ctx.moveTo(innerX1, innerY1);

        ctx.lineTo(innerX2, innerY2);
        ctx.lineTo(outerX1, outerY1);
        ctx.lineTo(outerX2, outerY2);
        ctx.lineTo(innerX3, innerY3);
        ctx.lineTo(innerX4, innerY4);
      }

      ctx.closePath();
      ctx.fillStyle = 'rgba(180, 180, 180, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      const innerCircleRadius = radius * innerRadius * 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, innerCircleRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 120, 120, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const holeCount = Math.floor(teeth / 2);
      for (let i = 0; i < holeCount; i++) {
        const angle = (i / holeCount) * Math.PI * 2;
        const holeX = Math.cos(angle) * innerCircleRadius * 0.6;
        const holeY = Math.sin(angle) * innerCircleRadius * 0.6;

        ctx.beginPath();
        ctx.arc(holeX, holeY, radius * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fill();
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 80, 80, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawOrbitNode = (
      x: number,
      y: number,
      radius: number,
      label: string,
      isSmall: boolean = false,
      isHovered: boolean = false
    ) => {
      // Hover effects
      const hoverScale = isHovered ? 1.2 : 1;
      const hoverRadius = radius * hoverScale;
      const glowIntensity = isHovered ? 0.8 : 0.3;
      
      // Add glow effect when hovered
      if (isHovered) {
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      ctx.beginPath();
      ctx.arc(x, y, hoverRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? '#00ff88' : '#00ffff';
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, hoverRadius - 6, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(0, 255, 136, 0.2)' : 'rgba(40, 40, 40, 0.8)';
      ctx.fill();
      ctx.strokeStyle = isHovered ? '#00ff88' : '#00ffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 3 * hoverScale, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#00ff88' : '#00ffff';
      ctx.fill();

      ctx.strokeStyle = isHovered ? '#00ff88' : '#00ffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 8 * hoverScale, y);
      ctx.lineTo(x + 8 * hoverScale, y);
      ctx.moveTo(x, y - 8 * hoverScale);
      ctx.lineTo(x, y + 8 * hoverScale);
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Enhanced text styling for hover
      ctx.fillStyle = isHovered ? '#00ff88' : '#ffffff';
      ctx.font = isSmall 
        ? `bold ${16 * hoverScale}px Arial` 
        : `bold ${22 * hoverScale}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text glow effect when hovered
      if (isHovered) {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
      }
      
      ctx.fillText(label, x, y + hoverRadius + (isSmall ? 18 : 25) * hoverScale);
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };

    const drawConnectionLine = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      rotation += 0.008;

      const orbits = [
        {
          radius: Math.min(canvas.width, canvas.height) * 0.165,
          speed: 0.5,
          nodes: [{ angle: 0, label: 'CONTACT', isSmall: true }],
        },
        {
          radius: Math.min(canvas.width, canvas.height) * 0.26,
          speed: -0.3,
          nodes: [
            { angle: 0, label: 'ACCOMMODATION', isSmall: false },
            { angle: Math.PI, label: 'EVENTS', isSmall: false },
          ],
        },
        {
          radius: Math.min(canvas.width, canvas.height) * 0.35,
          speed: 0.4,
          nodes: [
            { angle: Math.PI / 3, label: 'SPONSERS', isSmall: false },
            { angle: -Math.PI / 3, label: 'CAMPUS AMBASSADOR', isSmall: false },
          ],
        },
        {
          radius: Math.min(canvas.width, canvas.height) * 0.42,
          speed: -0.2,
          nodes: [
            { angle: 0, label: 'LOGIN', isSmall: true },
            { angle: (2 * Math.PI) / 3, label: 'SIGNUP', isSmall: true },
            { angle: (4 * Math.PI) / 3, label: 'ABOUT US', isSmall: true },
          ],
        },
      ];

      orbits.forEach((orbit) => {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      const allNodes: { x: number; y: number; label: string; isSmall: boolean }[] = [];

      orbits.forEach((orbit) => {
        orbit.nodes.forEach((node) => {
          const angle = node.angle + rotation * orbit.speed;
          const x = centerX + Math.cos(angle) * orbit.radius;
          const y = centerY + Math.sin(angle) * orbit.radius;
          allNodes.push({ x, y, label: node.label, isSmall: node.isSmall });
        });
      });

      // Update clickable areas for current frame
      clickableAreas.current = allNodes.map(node => ({
        x: node.x,
        y: node.y,
        radius: node.isSmall ? 15 : 22,
        label: node.label,
        url: labelUrls[node.label] || '/'
      }));

      allNodes.forEach((node) => {
        drawConnectionLine(centerX, centerY, node.x, node.y);
      });

      drawGear(centerX, centerY, 70, 20, rotation * 1.5);
      drawGear(centerX - 60, centerY - 45, 30, 12, -rotation * 2.5);
      drawGear(centerX + 50, centerY - 50, 25, 10, rotation * 3);
      drawGear(centerX + 45, centerY + 55, 28, 11, -rotation * 2);

      allNodes.forEach((node) => {
        const nodeRadius = node.isSmall ? 15 : 22;
        const isHovered = hoveredNode.current === node.label;
        drawOrbitNode(node.x, node.y, nodeRadius, node.label, node.isSmall, isHovered);
      });

      allNodes.forEach((node, i) => {
        if (!node.isSmall) {
          const gearSize = 12;
          drawGear(node.x, node.y, gearSize, 8, rotation * (1.8 + i * 0.4));
        }
      });

      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation * 0.15;
        const innerR = Math.min(canvas.width, canvas.height) * 0.05;
        const outerR = Math.min(canvas.width, canvas.height) * 0.48;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * innerR, centerY + Math.sin(angle) * innerR);
        ctx.lineTo(centerX + Math.cos(angle) * outerR, centerY + Math.sin(angle) * outerR);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Add event listeners
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.style.cursor = 'default';

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, [handleCanvasClick, handleCanvasMouseMove]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

export default FuturisticGearAnimation;
