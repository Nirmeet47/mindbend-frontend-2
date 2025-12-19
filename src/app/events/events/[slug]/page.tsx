'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/components/events/constants';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { useTransition } from '@/components/events/temp/TransitionContext';

// Lazy load the background scene
const BackgroundScene = dynamic(() => import('@/components/events/temp/BackgroundScene'), {
  ssr: false,
});

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = params.slug as string;
  const containerRef = useRef(null);
  const { setIsTransitioning, setActiveItem } = useTransition();

  // Get the source page from query params or default to managerial
  const source = searchParams.get('from') || 'managerial';

  // Clear transition state when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // Match the transition duration

    return () => clearTimeout(timer);
  }, [setIsTransitioning]);

  // Handle back navigation with transition
  const handleBack = () => {
    setActiveItem(null);
    setIsTransitioning(false);
    // Navigate back to the source page
    router.push(`/events/${source}`);
  };

  // Find the event by ID or slug
  const event = IMAGES.find(
    (img) => img.id.toString() === eventId ||
      `${img.title.toLowerCase().replace(/\s+/g, '-')}-${img.subtitle.toLowerCase().replace(/\s+/g, '-')}` === eventId
  );

  if (!event) {
    return null; // Or a 404 component
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-white font-sans"
      ref={containerRef}
    >
      {/* Background 3D Scene - Preserved */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <BackgroundScene />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between mix-blend-difference"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-wider hidden md:block">BACK</span>
        </button>
        <div className="font-bold tracking-widest">MINDBEND 2025</div>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4">

        {/* Massive Title Overlay - BEHIND the card - Marquee Effect */}
        <div className="absolute inset-0 flex items-center pointer-events-none z-0 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(4)].map((_, i) => (
              <h1
                key={i}
                className="text-[22vw] leading-[0.75] font-black text-white text-center tracking-tighter uppercase whitespace-nowrap px-4"
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                }}
              >
                {event.title}
              </h1>
            ))}
          </motion.div>
        </div>

        {/* Main Image with Transition - IN FRONT */}
        <motion.div
          layoutId={`event-image-${event.id}`}
          className="relative z-10 w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm shadow-2xl"
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          }}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover grayscale-[0.2] contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Blue glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-blue-400/10 mix-blend-overlay" />
          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.3) 2px, rgba(59, 130, 246, 0.3) 4px)',
            }}
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Subtitle / Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 left-4 md:left-10 z-20"
        >
          <motion.h2
            layoutId={`event-subtitle-${event.id}`}
            className="text-xl md:text-3xl font-bold uppercase tracking-widest text-blue-400"
          >
            {event.subtitle}
          </motion.h2>
        </motion.div>
      </section >

      {/* INFO BAR */}
      < div className="sticky top-0 z-40 bg-[#050505] border-y border-white/10 backdrop-blur-md" >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { label: "DATE", value: event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA" },
            { label: "LOCATION", value: event.venue || "TBA" },
            { label: "TYPE", value: event.type?.toUpperCase() || "MANAGERIAL" },
            { label: "STATUS", value: event.stopRegistration ? "CLOSED" : "OPEN" },
          ].map((item, i) => (
            <div key={i} className="p-4 text-center">
              <span className="block text-[10px] text-gray-500 tracking-[0.2em] mb-1">{item.label}</span>
              <span className="block text-sm md:text-base font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div >

      {/* CONTENT SECTION */}
      < div className="relative z-10 bg-[#050505]" >

        {/* The Challenge */}
        < section className="max-w-7xl mx-auto px-4 py-24 md:py-32" >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm font-bold text-blue-400 mb-6 tracking-[0.2em] uppercase">About The Event</h3>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight max-w-5xl mb-8">
              {event.description}
            </p>
            {event.isTeamEvent !== undefined && (
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Team Event</p>
                    <p className="text-lg font-bold">{event.isTeamEvent ? 'Yes' : 'Solo'}</p>
                  </div>
                </div>
                {event.isTeamEvent && event.minTeamSize && event.maxTeamSize && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Team Size</p>
                      <p className="text-lg font-bold">{event.minTeamSize}-{event.maxTeamSize} Members</p>
                    </div>
                  </div>
                )}
                {event.entryFee !== undefined && event.entryFee > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Entry Fee</p>
                      <p className="text-lg font-bold">₹{event.entryFee}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </section >

        {/* Welcome Banner */}
        < section className="w-full bg-white text-black py-20 overflow-hidden relative" >
          <div className="absolute inset-0 opacity-10">
            <Image src={event.image} alt="texture" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-[10vw] leading-none font-black tracking-tighter uppercase">
              WELCOME TO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{event.title}</span>
            </h2>
          </div>
        </section >

        {/* GRID LAYOUT */}
        < section className="max-w-7xl mx-auto px-4 py-24" >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

            {/* Card 1: Orange - Prize Pool */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' }}
              className="aspect-square bg-blue-500 p-8 flex flex-col justify-between group cursor-pointer hover:bg-blue-600 transition-all relative overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowUpRight className="w-8 h-8 text-white group-hover:rotate-45 transition-transform relative z-10" />
              <div className="relative z-10">
                <h4 className="text-4xl font-black uppercase leading-none mb-2">PRIZE<br />POOL</h4>
                <p className="text-xl font-medium opacity-80">₹{event.prizeMoney?.toLocaleString() || '0'} INR</p>
                {event.prizeDistribution && (
                  <div className="mt-4 text-sm space-y-1">
                    <p>1st: ₹{event.prizeDistribution.first.toLocaleString()}</p>
                    <p>2nd: ₹{event.prizeDistribution.second.toLocaleString()}</p>
                    <p>3rd: ₹{event.prizeDistribution.third.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Card 2: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' }}
              className="aspect-square relative overflow-hidden group"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
              }}
            >
              <Image
                src={event.image}
                alt="Event Detail"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              {/* Blue overlay on hover */}
              <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors" />

              {/* Animated Scanner Line */}
              <motion.div
                className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent pointer-events-none"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                }}
              />
            </motion.div>

            {/* Card 3: Cream/Pink - Rules/Reg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)' }}
              className="aspect-square bg-blue-50 text-black p-8 flex flex-col justify-between group cursor-pointer hover:bg-blue-100 transition-all relative overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full flex justify-end relative z-10">
                <motion.div
                  className="w-3 h-3 bg-black rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: ['0 0 0 rgba(0, 0, 0, 0)', '0 0 10px rgba(0, 0, 0, 0.5)', '0 0 0 rgba(0, 0, 0, 0)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <div className="relative z-10">
                <h4 className="text-3xl font-black uppercase leading-tight mb-2">
                  READY TO<br />DOMINATE?
                </h4>
                {event.isTeamEvent && event.minTeamSize && event.maxTeamSize && (
                  <p className="text-sm mb-2 opacity-80">
                    Team: {event.minTeamSize}-{event.maxTeamSize} Members
                  </p>
                )}
                {event.entryFee !== undefined && event.entryFee > 0 && (
                  <p className="text-sm mb-3 font-bold">
                    Entry Fee: ₹{event.entryFee}
                  </p>
                )}
                {event.registrationDeadline && (
                  <p className="text-xs mb-3 opacity-70">
                    Deadline: {new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
                <div className="space-y-2">
                  {/* Primary Registration Button */}
                  {event.unstopLink ? (
                    <a href={event.unstopLink} target="_blank" rel="noopener noreferrer" className="block px-5 py-3 bg-blue-500 text-white font-bold rounded-full hover:scale-105 hover:bg-blue-600 transition-all w-full shadow-lg text-center">
                      ⚡ REGISTER NOW
                    </a>
                  ) : (
                    <button className="px-5 py-3 bg-blue-500 text-white font-bold rounded-full hover:scale-105 hover:bg-blue-600 transition-all w-full shadow-lg">
                      ⚡ REGISTER NOW
                    </button>
                  )}
                  
                  {/* Secondary Links */}
                  {event.psLink && (
                    <a href={event.psLink} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 bg-black/80 text-white font-semibold rounded-full hover:scale-105 hover:bg-black transition-all w-full shadow-lg text-center text-sm">
                      📄 Problem Statement
                    </a>
                  )}
                  {event.whatsappGrpLink && (
                    <a href={event.whatsappGrpLink} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:scale-105 hover:bg-green-500 transition-all w-full shadow-lg text-center text-sm">
                      💬 Join WhatsApp Group
                    </a>
                  )}
                  {event.whatsappNo && (
                    <a href={`https://wa.me/${event.whatsappNo.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:scale-105 hover:bg-green-500 transition-all w-full shadow-lg text-center text-sm">
                      📞 Contact on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </section >

        {/* TIMELINE & RULES */}
        < section className="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16" >

          {/* Timeline */}
          < div >
            <h3 className="text-sm font-bold text-blue-400 mb-8 tracking-[0.2em] uppercase">Event Timeline</h3>
            <div className="space-y-8">
              {[
                { 
                  time: event.registrationDeadline ? new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA", 
                  label: "REGISTRATION DEADLINE", 
                  desc: "Last date to register" 
                },
                { 
                  time: event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA", 
                  label: "EVENT DAY", 
                  desc: event.venue || "Venue TBA" 
                },
                { time: "10:00", label: "BRIEFING", desc: "Main Auditorium" },
                { time: "11:30", label: "ROUND 1 START", desc: "Strategy Phase" },
                { time: "14:00", label: "LUNCH BREAK", desc: "Cafeteria" },
                { time: "15:00", label: "ROUND 2 START", desc: "Execution Phase" },
                { time: "17:00", label: "CLOSING", desc: "Submission" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <span className="text-4xl md:text-5xl font-black text-white/20 group-hover:text-white transition-colors" style={{ fontFamily: 'Impact, sans-serif' }}>
                    {item.time}
                  </span>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold uppercase">{item.label}</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div >

          {/* Rules */}
          < div >
            <h3 className="text-sm font-bold text-blue-400 mb-8 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }} />
              Protocols
            </h3>
            <div className="space-y-6">
              {(event.rules && event.rules.length > 0 ? event.rules : [
                "SQUAD SIZE: 2-4 OPERATIVES REQUIRED.",
                "NO EXTERNAL COMMS DEVICES ALLOWED IN SECURE ZONES.",
                "ALL DECISIONS BY THE HIGH COUNCIL (JUDGES) ARE FINAL.",
                "LATE ARRIVALS WILL BE DISQUALIFIED IMMEDIATELY."
              ]).map((rule, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 border border-blue-400/30 p-6 hover:bg-white/10 hover:border-blue-400/60 transition-all relative group overflow-hidden"
                  whileHover={{ x: 4 }}
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="block text-xs text-blue-400 mb-2 font-mono relative z-10">0{i + 1} // PROTOCOL</span>
                  <p className="text-lg md:text-xl font-bold uppercase leading-tight relative z-10">{rule}</p>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all" />
                </motion.div>
              ))}
            </div>
          </div >

        </section >

        {/* Footer Text */}
        < section className="py-24 text-center border-t border-white/10" >
          <p className="text-sm text-gray-500 uppercase tracking-widest">MindBend 2025 / {event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Event'} Events</p>
        </section >

      </div >
    </motion.div >
  );
}
