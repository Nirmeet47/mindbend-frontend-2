"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { EncryptedText } from '@/components/ui/encrypted-text';

gsap.registerPlugin(ScrollTrigger);

const InspiringWords: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading on scroll
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate testimonials grid on scroll
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate individual testimonial cards with stagger
    const cards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <AuroraBackground className="py-12 sm:py-16 md:py-24 flex-col items-start justify-start min-h-0">
      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 text-white px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-medium text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 thin-glow"
        >
          <EncryptedText
            text="INSPIRING WORDS FOR MINDBEND"
            duration={1400}
            // keep heading gradient color for revealed letters
            revealedColor="inherit"
            // scrambled letters: 2 colors
            scrambleColorA="rgb(34 211 238)" /* cyan-400 */
            scrambleColorB="rgb(110 231 183)" /* emerald-300 */
          />
        </motion.h2>


        {/* Testimonials Grid */}
        <div ref={testimonialsRef} className="grid gap-8 sm:gap-12 md:gap-16">
          {/* First Testimonial - Improved glass effect */}
          <div className="testimonial-card group rounded-2xl border border-amber-300/80 shadow-[0_18px_60px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(245,158,11,0.25)]">
            <div
              className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 rounded-2xl p-4 sm:p-6 md:p-8
                         bg-black/20 overflow-hidden
                         [background-image:repeating-linear-gradient(100deg,rgba(0,255,255,0.15)_0%,rgba(0,255,136,0.12)_20%,rgba(0,132,255,0.18)_40%,rgba(0,255,255,0.15)_60%)]
                         [background-size:300%_200%]
                         [background-position:50%_50%]
                         animate-aurora
                         saturate-150"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 shrink-0">
                {/* Neon glow behind image */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-amber-300/10 blur-3xl" />
                <img
                  src="/cm-image.jpg"
                  alt="Honorable Chief Minister"
                  className="relative rounded-full object-cover w-full h-full border-2 border-cyan-300 shadow-[0_0_26px_rgba(0,255,255,0.25)]"
                />
              </div>
              <div className="space-y-5 text-center md:text-left">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bruno leading-relaxed tracking-wide text-slate-100/90">
                  "In today's rapidly advancing world, acquiring practical skills is essential for enhancing productivity and achieving success. India's emergence as the third-largest startup hub globally reflects the strength of our talented youth and increasing access to technology. I extend my best wishes for the success of <span className="text-cyan-300">Mindbend 2024</span> at SVNIT, Surat, under the theme "<span className="text-cyan-300">TechVolution</span>: Navigating the Evolution of Innovation," which will further contribute to the progress of our nation."
                </p>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-orbi font-semibold text-emerald-200">
                    - Shri Bhupendrabhai Patel
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base font-bruno uppercase tracking-[0.18em] text-cyan-200/85">
                    Honourable Chief Minister of Gujarat
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Testimonial - Improved glass effect */}
          <div className="testimonial-card group rounded-2xl border border-amber-300/80 shadow-[0_18px_60px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(245,158,11,0.25)]">
            <div
              className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 rounded-2xl p-4 sm:p-6 md:p-8
                         bg-black/20 overflow-hidden
                         [background-image:repeating-linear-gradient(100deg,rgba(0,255,255,0.15)_0%,rgba(0,255,136,0.12)_20%,rgba(0,132,255,0.18)_40%,rgba(0,255,255,0.15)_60%)]
                         [background-size:300%_200%]
                         [background-position:50%_50%]
                         animate-aurora
                         saturate-150"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 shrink-0">
                {/* Neon glow behind image */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-amber-300/10 blur-3xl" />
                <img
                  src="/director-image.png"
                  alt="SVNIT Director"
                  className="relative rounded-full object-cover w-full h-full border-2 border-cyan-300 shadow-[0_0_26px_rgba(0,255,255,0.25)]"
                />
              </div>
              <div className="space-y-5 text-center md:text-left">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bruno leading-relaxed tracking-wide text-slate-100/90">
                  "Our students have been successfully organizing <span className="text-cyan-300">MINDBEND, Gujarat's largest techno-managerial fest</span>, which has grown far beyond our expectations. The <span className="text-cyan-300">participation of international attendees</span>, including from Russia last year, marks a great success for the event and a proud achievement for the college, showcasing its global reach and excellence."
                </p>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-orbi font-semibold text-emerald-200">
                    - Prof. (Dr.) Anupam Shukla
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base font-bruno uppercase tracking-[0.18em] text-cyan-200/85">
                    Director, SVNIT Surat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};
export default InspiringWords;