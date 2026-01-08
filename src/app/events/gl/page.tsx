'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as d3 from 'd3';
import { 
  Clock, Calendar, ChevronRight, Activity, 
  Archive, ArrowRight, Globe, Mic, X, Zap 
} from 'lucide-react';

// --- TYPES ---

export enum SpeakerCategory {
  IAS = 'IAS',
  TECH = 'TECH',
  MOTIVATION = 'MOTIVATION'
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  category: SpeakerCategory;
  impactStatement: string;
  imageUrl: string;
  topic: string;
  description: string;
  day: number;
  time: string;
}

export interface PastSpeaker {
  id: string;
  name: string;
  role: string;
  year: string;
  imageUrl: string;
}

// --- CONSTANTS ---

export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: "Dr. Arjun Verma",
    role: "IAS Officer & Policy Architect",
    category: SpeakerCategory.IAS,
    impactStatement: "Architect of Digital Governance in India",
    imageUrl: "https://picsum.photos/200/200?random=1",
    topic: "Policy in the Age of AI",
    description: "Driving the framework that allows innovation to flourish while maintaining ethical boundaries in digital governance.",
    day: 1,
    time: "10:00 AM"
  },
  {
    id: '4',
    name: "Priya Singh",
    role: "District Magistrate",
    category: SpeakerCategory.IAS,
    impactStatement: "Digitizing Rural Infrastructure",
    imageUrl: "https://picsum.photos/200/200?random=4",
    topic: "The Last Mile Connectivity",
    description: "Bridging the digital divide through aggressive, tech-first administrative reforms.",
    day: 1,
    time: "02:00 PM"
  },
  {
    id: '2',
    name: "Sarah Chen",
    role: "AI Research Lead",
    category: SpeakerCategory.TECH,
    impactStatement: "Building the Neural Networks of Tomorrow",
    imageUrl: "https://picsum.photos/200/200?random=2",
    topic: "Symbiotic Intelligence",
    description: "Exploring how human cognition and machine learning can merge to solve complex planetary problems.",
    day: 2,
    time: "11:00 AM"
  },
  {
    id: '5',
    name: "Elon Reeve",
    role: "Tech Entrepreneur",
    category: SpeakerCategory.TECH,
    impactStatement: "Disrupting Traditional Systems",
    imageUrl: "https://picsum.photos/200/200?random=5",
    topic: "Decentralized Future",
    description: "Why the future of tech belongs to the decentralized web and autonomous agents.",
    day: 2,
    time: "03:00 PM"
  },
  {
    id: '3',
    name: "Marcus Thorne",
    role: "Futurist & Speaker",
    category: SpeakerCategory.MOTIVATION,
    impactStatement: "Unlocking the Human Code",
    imageUrl: "https://picsum.photos/200/200?random=3",
    topic: "Mindset over Machine",
    description: "Technology is a tool; the human will is the engine. Learn to harness digital power for personal evolution.",
    day: 3,
    time: "09:00 AM"
  },
  {
    id: '6',
    name: "David Goggins-esque",
    role: "Performance Coach",
    category: SpeakerCategory.MOTIVATION,
    impactStatement: "Callus Your Mind",
    imageUrl: "https://picsum.photos/200/200?random=6",
    topic: "The Algorithms of Grit",
    description: "Applying the relentless consistency of computer code to human discipline and physical endurance.",
    day: 3,
    time: "01:00 PM"
  }
];

export const PAST_SPEAKERS: PastSpeaker[] = [
  { id: 'p1', name: "Dr. Aditi Gupta", role: "Quantum Computing Pioneer", year: "2024", imageUrl: "https://picsum.photos/200/200?random=10" },
  { id: 'p2', name: "Rajiv Malhotra", role: "Ethical AI Advocate", year: "2023", imageUrl: "https://picsum.photos/200/200?random=11" },
  { id: 'p3', name: "Sita Ram", role: "Sustainable Tech Architect", year: "2023", imageUrl: "https://picsum.photos/200/200?random=12" },
  { id: 'p4', name: "Kenji Sato", role: "Robotics Engineer", year: "2022", imageUrl: "https://picsum.photos/200/200?random=13" },
  { id: 'p5', name: "Elena Vos", role: "Cybersecurity Analyst", year: "2022", imageUrl: "https://picsum.photos/200/200?random=14" },
  { id: 'p6', name: "Michael Chang", role: "Blockchain Strategist", year: "2021", imageUrl: "https://picsum.photos/200/200?random=15" },
];

export const COLORS = {
  [SpeakerCategory.IAS]: '#00A8FF', // Electric Blue
  [SpeakerCategory.TECH]: '#00FF9C', // Neon Green
  [SpeakerCategory.MOTIVATION]: '#00E5FF', // Cyan
};

// --- COMPONENTS ---

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-neon-green rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2.5 : 1,
          opacity: 0.8
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-electric-blue rounded-full pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 0.5
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
    </>
  );
};

const Typewriter: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (currentText.length < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(text.slice(0, currentText.length + 1));
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        }
    }, [currentText, started, text]);

    return <span>{currentText}<span className="animate-pulse">_</span></span>;
};

const Hero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll("*").remove();

    const nodes = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '#00A8FF' : '#00FF9C'
    }));

    const linkGroup = svg.append('g').attr('class', 'links');
    const nodeGroup = svg.append('g').attr('class', 'nodes');

    const simulation = d3.forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(20));

    simulation.on('tick', () => {
        linkGroup.selectAll('line').remove();
        
        nodes.forEach((nodeA: any, i) => {
            nodes.forEach((nodeB: any, j) => {
                if (i <= j) return;
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    linkGroup.append('line')
                        .attr('x1', nodeA.x)
                        .attr('y1', nodeA.y)
                        .attr('x2', nodeB.x)
                        .attr('y2', nodeB.y)
                        .attr('stroke', '#00A8FF')
                        .attr('stroke-opacity', (1 - dist / 150) * 0.3)
                        .attr('stroke-width', 1);
                }
            });
        });

        const circles = nodeGroup.selectAll('circle')
            .data(nodes);

        circles.enter()
            .append('circle')
            .attr('r', (d: any) => d.r)
            .attr('fill', (d: any) => d.color)
            .attr('opacity', 0.8)
            .merge(circles as any)
            .attr('cx', (d: any) => d.x)
            .attr('cy', (d: any) => d.y);
            
        circles.exit().remove();
    });

    const handleMouseMove = (event: MouseEvent) => {
        const [mx, my] = d3.pointer(event, svg.node());
        simulation.alpha(0.3).restart();
        simulation.force('attract', d3.forceRadial(100, mx, my).strength(0.1));
    };

    const currentSvg = svgRef.current;
    currentSvg.addEventListener('mousemove', handleMouseMove);

    return () => {
        simulation.stop();
        currentSvg.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-40">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>

      <div className="relative z-10 w-full md:w-1/2 space-y-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-electric-blue font-display tracking-widest text-sm uppercase mb-2">
            Guest Lecturers
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
            Voices That <br />
            <span className="text-neon-green">Shape the Future</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="space-y-4"
        >
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-md">
             Where Governance, Innovation & Human Potential Converge.
          </p>
          <div className="flex flex-col space-y-2 font-display text-sm md:text-base text-electric-blue/80">
             <Typewriter text="Policy meets Code." delay={1000} />
             <Typewriter text="Motivation meets Machine." delay={2500} />
             <Typewriter text="Humans and Tech. Together." delay={4000} />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full md:w-1/2 h-full hidden md:flex items-center justify-center pointer-events-none">
         <motion.div 
            animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-96 h-96 rounded-full border border-electric-blue/20 flex items-center justify-center relative backdrop-blur-sm"
         >
             <div className="absolute inset-0 rounded-full border border-neon-green/30 animate-ping opacity-20"></div>
             <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-electric-blue/10 to-neon-green/10 border border-white/10 backdrop-blur-md flex items-center justify-center">
                 <div className="text-center">
                    <span className="text-4xl font-display font-bold text-white">2025</span>
                    <p className="text-neon-green text-xs tracking-[0.3em] uppercase mt-2">Symposium</p>
                 </div>
             </div>
         </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Initialize</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-electric-blue to-transparent"></div>
      </motion.div>
    </section>
  );
};

interface HologramCardProps {
  speaker: Speaker | null;
  onClose: () => void;
}

const HologramCard: React.FC<HologramCardProps> = ({ speaker, onClose }) => {
  if (!speaker) return null;

  const color = COLORS[speaker.category];

  return (
    <AnimatePresence>
      {speaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl"
            style={{ boxShadow: `0 0 40px ${color}20` }}
          >
             <div className="h-1 w-full bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: color, opacity: 0.8 }} />
             
             <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20"></div>
             <div className="absolute inset-0 pointer-events-none opacity-5 animate-scanline bg-gradient-to-b from-transparent via-white to-transparent h-[20%] z-20"></div>

             <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white z-30 interactive p-2 hover:bg-white/10 rounded-full transition-colors"
             >
                 <X size={24} />
             </button>

             <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 relative z-30">
                 <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 border-2 border-dashed" style={{ borderColor: color }}>
                        <img 
                            src={speaker.imageUrl} 
                            alt={speaker.name} 
                            className="w-full h-full rounded-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                        />
                         <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/50 to-transparent mix-blend-overlay"></div>
                    </div>
                    <span 
                        className="mt-4 px-3 py-1 rounded-full text-xs font-display tracking-widest font-bold border"
                        style={{ borderColor: color, color: color, backgroundColor: `${color}10` }}
                    >
                        {speaker.category}
                    </span>
                 </div>

                 <div className="flex-1 space-y-4">
                     <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-1">{speaker.name}</h2>
                        <p className="text-gray-400 font-light">{speaker.role}</p>
                     </div>

                     <div className="p-4 rounded-lg bg-white/5 border-l-2" style={{ borderColor: color }}>
                         <p className="text-lg italic text-white/90">"{speaker.impactStatement}"</p>
                     </div>

                     <div className="space-y-2">
                         <h3 className="text-sm uppercase tracking-wider text-gray-500 font-display">Session Topic</h3>
                         <p className="text-white font-medium">{speaker.topic}</p>
                         <p className="text-gray-400 text-sm leading-relaxed">{speaker.description}</p>
                     </div>

                     <div className="pt-6 flex flex-wrap gap-4">
                        <button className="interactive flex items-center gap-2 px-6 py-3 bg-white text-black font-bold font-display uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors clip-path-slant">
                            <Calendar size={14} /> Reserve Spot
                        </button>
                        <button 
                            className="interactive flex items-center gap-2 px-6 py-3 border font-bold font-display uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
                            style={{ borderColor: color, color: color }}
                        >
                            <Zap size={14} /> Live Interaction
                        </button>
                     </div>
                 </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SymbioticGrid: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [activeDay, setActiveDay] = useState(1);

  const days = [
    { id: 1, label: '01', title: 'Governance', subtitle: 'Policy & Structure', color: '#00A8FF' },
    { id: 2, label: '02', title: 'Innovation', subtitle: 'Tech & AI', color: '#00FF9C' },
    { id: 3, label: '03', title: 'Evolution', subtitle: 'Human Potential', color: '#00E5FF' },
  ];

  const filteredSpeakers = SPEAKERS.filter(s => s.day === activeDay);

  return (
    <section className="relative w-full py-24 px-6 md:px-20 bg-deep-black overflow-hidden min-h-screen flex flex-col justify-center">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[90vw] h-[90vw] border border-electric-blue/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[60vw] h-[60vw] border border-neon-green/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 mb-16 text-center">
        <h2 className="text-electric-blue font-display tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">System Schedule</h2>
        <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Event <span className="text-neon-green">Timeline</span></h3>
        <p className="text-gray-500 font-light max-w-lg mx-auto">Select a module to view the symbiotic connections for that phase.</p>
      </div>

      <div className="relative z-20 flex flex-wrap justify-center gap-6 mb-20">
        {days.map((day) => (
            <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`group relative min-w-[140px] md:min-w-[180px] p-1 transition-all duration-300 outline-none`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${activeDay === day.id ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: activeDay === day.id ? `${day.color}20` : 'transparent' }}></div>
                
                <div 
                    className={`relative h-full px-6 py-4 border backdrop-blur-sm transition-all duration-300 flex flex-col items-center gap-1 clip-path-slant ${activeDay === day.id ? 'bg-white/5 border-white/40' : 'bg-black/40 border-white/10 hover:border-white/20'}`}
                    style={{ borderColor: activeDay === day.id ? day.color : undefined }}
                >
                    <span className={`text-4xl font-display font-bold transition-colors duration-300 ${activeDay === day.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>
                        {day.label}
                    </span>
                    <span className={`text-xs uppercase tracking-widest font-bold ${activeDay === day.id ? 'text-white' : 'text-gray-500'}`} style={{ color: activeDay === day.id ? day.color : undefined }}>
                        {day.title}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider hidden md:block">{day.subtitle}</span>
                    
                    {activeDay === day.id && (
                        <motion.div 
                            layoutId="activeTabDot"
                            className="absolute bottom-2 w-1 h-1 rounded-full shadow-[0_0_10px_currentColor]"
                            style={{ backgroundColor: day.color, color: day.color }}
                        />
                    )}
                </div>
            </button>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full min-h-[500px]">
        <AnimatePresence mode='wait'>
            <motion.div
                key={activeDay}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {filteredSpeakers.map((speaker, index) => {
                    const color = COLORS[speaker.category];
                    return (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative interactive cursor-pointer perspective-1000"
                            onClick={() => setSelectedSpeaker(speaker)}
                        >
                            <div className="relative h-full min-h-[300px] bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden shadow-2xl group-hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
                                
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: color }}></div>

                                <div className="flex flex-col md:flex-row h-full">
                                    
                                    <div className="relative w-full md:w-2/5 min-h-[250px] md:min-h-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-900">
                                            <img 
                                                src={speaker.imageUrl} 
                                                alt={speaker.name} 
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                                        
                                        <div className="absolute top-4 left-4">
                                            <span 
                                                className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md"
                                                style={{ color: color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                                            >
                                                {speaker.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                                        
                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white">
                                                <path d="M0 0 L100 0 L100 100" strokeWidth="0.5"/>
                                                <path d="M20 20 L80 20 L80 80" strokeWidth="0.5"/>
                                                <circle cx="50" cy="50" r="2" fill="currentColor"/>
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 mb-2 text-gray-500 text-xs font-mono">
                                                 <div className="flex items-center gap-1">
                                                    <Clock size={12} style={{ color: color }} /> 
                                                    <span>{speaker.time}</span>
                                                 </div>
                                                 <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                                                 <span className="uppercase tracking-wider">Session {speaker.id.padStart(2, '0')}</span>
                                            </div>

                                            <h4 className="text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 mb-1">
                                                {speaker.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-4">{speaker.role}</p>

                                            <div className="mb-4">
                                                <p className="text-sm text-electric-blue font-bold mb-1">Topic Protocol:</p>
                                                <p className="text-white text-lg leading-tight font-display">{speaker.topic}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-2">
                                                <Activity size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`} style={{ color: color }} />
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Live Node</span>
                                            </div>
                                            
                                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform duration-300">
                                                Initialize <ChevronRight size={14} style={{ color: color }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <span className="absolute top-0 left-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-in-out"></span>
                                <span className="absolute bottom-0 right-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-in-out"></span>
                                
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </AnimatePresence>
      </div>

      <HologramCard speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
    </section>
  );
};

const Timeline: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-deep-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <div className="absolute top-10 left-10 md:left-20 z-20">
             <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Symbiosis <span className="text-electric-blue">in Action</span></h2>
             <p className="text-gray-400">Scroll to explore the evolution</p>
        </div>

        <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20 md:pl-40">
          
          <div className="relative w-[80vw] md:w-[60vw] h-[60vh] flex-shrink-0 bg-dim-gray/30 border border-electric-blue/20 rounded-3xl p-10 flex flex-col justify-end overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
             <div className="absolute top-10 left-10 text-9xl font-display font-bold text-white/5 group-hover:text-electric-blue/10 transition-colors duration-500">01</div>
             <div className="relative z-10">
                 <h3 className="text-3xl font-display font-bold text-electric-blue mb-4">Governance</h3>
                 <p className="text-xl text-white max-w-lg">IAS Officers lay the digital foundation. Policy becomes the operating system upon which society runs.</p>
             </div>
             <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-electric-blue/10 to-transparent"></div>
          </div>

          <div className="relative w-[80vw] md:w-[60vw] h-[60vh] flex-shrink-0 bg-dim-gray/30 border border-neon-green/20 rounded-3xl p-10 flex flex-col justify-end overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
             <div className="absolute top-10 left-10 text-9xl font-display font-bold text-white/5 group-hover:text-neon-green/10 transition-colors duration-500">02</div>
             <div className="relative z-10">
                 <h3 className="text-3xl font-display font-bold text-neon-green mb-4">Innovation</h3>
                 <p className="text-xl text-white max-w-lg">Tech Influencers build the applications. They push the boundaries of what the system can handle.</p>
             </div>
             <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-neon-green/10 to-transparent"></div>
          </div>

          <div className="relative w-[80vw] md:w-[60vw] h-[60vh] flex-shrink-0 bg-dim-gray/30 border border-cyan-400/20 rounded-3xl p-10 flex flex-col justify-end overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
             <div className="absolute top-10 left-10 text-9xl font-display font-bold text-white/5 group-hover:text-cyan-400/10 transition-colors duration-500">03</div>
             <div className="relative z-10">
                 <h3 className="text-3xl font-display font-bold text-cyan-400 mb-4">Execution</h3>
                 <p className="text-xl text-white max-w-lg">Motivational Speakers provide the user energy. A perfect system is useless without the human will to use it.</p>
             </div>
             <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/10 to-transparent"></div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

const PastSpeakers: React.FC = () => {
  return (
    <section className="relative py-24 bg-deep-black overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-20 mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2 text-electric-blue">
              <Archive size={16} />
              <h2 className="font-display tracking-[0.2em] text-sm uppercase">System Archives</h2>
           </div>
           <h3 className="text-3xl md:text-5xl font-display font-bold text-white">Past <span className="text-gray-600">Visionaries</span></h3>
        </div>
        <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-8 mb-4"></div>
        <p className="text-xs text-gray-500 font-mono hidden md:block mb-3">
            LOADING_LEGACY_DATA... [COMPLETE]
        </p>
      </div>

      <div className="relative w-full">
         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep-black to-transparent z-10 pointer-events-none"></div>
         
         <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] py-8">
            {[...PAST_SPEAKERS, ...PAST_SPEAKERS, ...PAST_SPEAKERS].map((speaker, idx) => (
                <div 
                    key={`${speaker.id}-${idx}`} 
                    className="group relative w-72 h-96 flex-shrink-0 bg-dim-gray/20 border border-white/5 hover:border-neon-green/30 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer"
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    
                    <div className="h-60 w-full overflow-hidden relative">
                         <img 
                            src={speaker.imageUrl} 
                            alt={speaker.name} 
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    </div>

                    <div className="p-5 relative z-20 -mt-10">
                        <div className="flex justify-end mb-1">
                            <span className="text-5xl font-display font-bold text-white/5 group-hover:text-neon-green/10 transition-colors">{speaker.year}</span>
                        </div>
                        <h4 className="text-lg font-display font-bold text-white group-hover:text-neon-green transition-colors leading-tight mb-1">{speaker.name}</h4>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{speaker.role}</p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-1 h-1 bg-neon-green rounded-full"></span>
                        <span className="w-1 h-1 bg-neon-green rounded-full delay-75"></span>
                        <span className="w-1 h-1 bg-neon-green rounded-full delay-150"></span>
                    </div>

                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay"></div>
                </div>
            ))}
         </div>
      </div>
    </section>
  );
};

const Signature: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      
      const width = canvas.width;
      const height = canvas.height;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const color = i === 0 ? '#00A8FF' : i === 1 ? '#00FF9C' : '#FFFFFF';
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;

        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.01 + time + i) * (50 + i * 20) * Math.sin(time * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative py-32 bg-deep-black text-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-8">
            “Technology without direction is chaos.<br />
            Direction without vision is stagnation.<br />
            <span className="text-neon-green text-glow">Together, they build the future.</span>”
            </h2>
        </motion.div>
      </div>

      <canvas ref={canvasRef} className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen"></canvas>
    </section>
  );
};

const CTA: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const cols = Math.floor(width / 20) + 1;
    const ypos = Array(cols).fill(0);

    const matrix = () => {
      ctx.fillStyle = '#05050510'; // fade to black for trail
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00FF9C'; // neon green text
      ctx.font = '15pt monospace';

      ypos.forEach((y, index) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = index * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[index] = 0;
        else ypos[index] = y + 20;
      });
    };

    const interval = setInterval(matrix, 50);
    
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-deep-black flex items-center justify-center min-h-[60vh]">
       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"></canvas>

       <div className="relative z-10 text-center px-6">
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="text-5xl md:text-7xl font-display font-bold text-white mb-8"
           >
               Sync With <span className="text-electric-blue">The Future</span>
           </motion.h2>

           <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <button className="group interactive relative px-8 py-4 bg-neon-green text-black font-bold font-display uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform">
                   <span className="relative z-10 flex items-center gap-2">Reserve Your Spot <ArrowRight size={18} /></span>
                   <div className="absolute inset-0 bg-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               </button>

               <button className="group interactive px-8 py-4 border border-white/20 text-white font-bold font-display uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
                   <Mic size={18} className="text-electric-blue" /> Explore Sessions
               </button>
               
               <button className="group interactive px-8 py-4 border border-white/20 text-white font-bold font-display uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
                   <Globe size={18} className="text-cyan-400" /> Join Network
               </button>
           </div>
       </div>
    </section>
  );
};

// --- MAIN PAGE ---

export default function Page() {
  return (
    <div className="bg-deep-black min-h-screen text-white cursor-none selection:bg-neon-green selection:text-black">
      <CustomCursor />
      
      <main>
        <Hero />
        <SymbioticGrid />
        <Timeline />
        <PastSpeakers />
        <Signature />
        <CTA />
      </main>

      <footer className="py-8 text-center text-gray-600 text-sm font-display uppercase tracking-widest border-t border-white/5">
        © 2025 The Minds Behind the Movement. All Systems Operational.
      </footer>
    </div>
  );
}