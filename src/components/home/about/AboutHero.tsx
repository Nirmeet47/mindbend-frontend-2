"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for the triangle on scroll
    if (triangleRef.current) {
      gsap.fromTo(
        triangleRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triangleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Subtle glow animation
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        '--glow-intensity': '1',
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(0, 20, 40, 0.8) 0%, rgba(0, 0, 0, 1) 100%),
          linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 50%, rgba(255, 255, 0, 0.1) 100%)
        `,
        '--glow-intensity': '0.5',
      } as React.CSSProperties}
    >
      {/* Cosmic background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Main triangular prism */}
      <motion.div
        ref={triangleRef}
        className="relative w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="relative mx-auto"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            aspectRatio: '1 / 0.866', // Equilateral triangle ratio
            filter: 'drop-shadow(0 0 50px rgba(0, 255, 255, var(--glow-intensity)))',
          }}
        >
          {/* Glass morphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-yellow-900/20 backdrop-blur-sm border border-cyan-400/30"></div>

          {/* Inner glow layers */}
          <div className="absolute inset-2 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-sm"></div>
          <div className="absolute inset-4 bg-gradient-to-tl from-yellow-500/5 via-transparent to-cyan-500/5 rounded-sm"></div>

          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 sm:p-8 md:p-12 text-center">
            {/* Main heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 tracking-wider"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              ABOUT MINDBEND
            </motion.h1>

            {/* Mission description */}
            <motion.div
              className="max-w-2xl mb-8 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="mb-4">
                Gujarat's largest Techno-Managerial fest, hosted annually by SVNIT Surat, brings together innovation and culture in spectacular harmony.
              </p>
              <p className="text-cyan-300 font-semibold text-base sm:text-lg">
                2025 Theme: "Ecogenesis: Bharat's Journey from Roots to Revolution"
              </p>
              <p className="mt-2 text-sm sm:text-base">
                Celebrating India's rich cultural heritage while embracing technological progress through workshops, competitions, and inspiring sessions that attract 15,000+ participants.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 w-full max-w-3xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="bg-black/30 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-orbitron font-bold text-cyan-300 mb-1">15K+</div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Participants</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-purple-400/20 rounded-lg p-4">
                <div className="text-lg sm:text-xl font-orbitron font-bold text-purple-300 mb-1">Techno-Managerial</div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Workshops & Competitions</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-yellow-400/20 rounded-lg p-4">
                <div className="text-sm sm:text-base font-orbitron font-bold text-yellow-300 mb-1">Renowned Speakers</div>
                <div className="text-xs text-gray-400 leading-tight">
                  Dr. G. Satheesh Reddy • Capt. Yogendra Singh Yadav • Aman Dhattarwal • Shradha Khapra • Sandeep Jain
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 rounded-full text-cyan-300 hover:text-white hover:border-cyan-300 transition-all duration-300 backdrop-blur-sm font-orbitron text-sm sm:text-base tracking-wide"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE THE LEGACY →
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
    </section>
  );
};

export default AboutHero;