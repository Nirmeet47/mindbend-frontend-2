import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMB = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(containerRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      // Create scroll-triggered animation
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className='min-h-screen relative flex flex-col justify-center items-center overflow-hidden py-16 md:py-24'
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      {/* SVG Pattern Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <pattern id="brickPattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="60" height="30" fill="rgba(34, 211, 238, 0.05)" />
            <rect x="1" y="1" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
            <rect x="31" y="1" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
            <rect x="16" y="16" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
          </pattern>
        </defs>
      </svg>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12 md:space-y-16 text-white px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="relative trapezoid-container p-12 md:p-20 shadow-2xl">
          {/* Outer Border */}
          <div className="outer-border"></div>

          {/* Brick Pattern Layer */}
          <div className="brick-layer"></div>

          {/* Inner Border */}
          <div className="inner-border"></div>

          {/* Background Content */}
          <div className="trapezoid-content bg-black/40 backdrop-blur-md"></div>

          {/* Text Content */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbi font-medium text-center mb-6 md:mb-8 text-cyan-300 thin-glow max-w-xl mx-auto wrap-break-word">
              ABOUT MINDBEND
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-gray-200 font-bruno max-w-2xl mx-auto wrap-break-word overflow-wrap-anywhere px-4">
              Mindbend is <span className="text-cyan-400 font-semibold">Gujarat's largest Techno-Managerial fest</span>, hosted annually by <span className="text-cyan-400 font-semibold">SVNIT, Surat</span>. The <span className="text-cyan-400 font-semibold">2025 edition</span>, themed <span className="text-cyan-400 font-semibold">"SYMBIONT: The Cognitive Genesis"</span> celebrates India's cultural heritage and technological progress. Attracting over <span className="text-cyan-400 font-semibold">15,000 participants</span>, it features <span className="text-cyan-400 font-semibold">workshops</span>, <span className="text-cyan-400 font-semibold">competitions</span>, and <span className="text-cyan-400 font-semibold">engaging activities</span>. Past guest lectures have included notable figures like <span className="text-cyan-400 font-semibold">Dr. G. Satheesh Reddy</span>(Ex-Chairman, DRDO) and <span className="text-cyan-400 font-semibold">Captain Yogendra Singh Yadav (Param Vir Chakra)</span>. The fest has also featured influential speakers like <span className="text-cyan-400 font-semibold">Aman Dhattarwal</span>, <span className="text-cyan-400 font-semibold">Shradha Khapra</span>, and <span className="text-cyan-400 font-semibold">Sandeep Jain</span>, who have inspired and educated attendees.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace:wght@400..900&family=Orbitron&display=swap');

        .font-bruno {
          font-family: 'Bruno Ace';
        }
        .font-orbi {
          font-family: 'Orbitron', sans-serif;
        }

        .trapezoid-container {
          position: relative;
        }

        .outer-border {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          border: 2px solid rgba(34, 211, 238, 0.6);
          clip-path: polygon(
            10% 1%, 12% 0.5%, 88% 0.5%, 90% 1%,
            90% 1%, 99% 99%, 98.5% 99.5%, 1.5% 99.5%, 1% 99%, 10% 1%
          );
          z-index: 1;
          border-radius: 4px;
        }

        .brick-layer {
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="30"><rect width="60" height="30" fill="rgba(34, 211, 238, 0.05)"/><rect x="1" y="1" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="0.5"/><rect x="31" y="1" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="0.5"/><rect x="16" y="16" width="27" height="12" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="0.5"/></svg>');
          clip-path: polygon(
            11% 1.5%, 12.5% 1%, 87.5% 1%, 89% 1.5%,
            89% 1.5%, 98.5% 98.5%, 98% 99%, 2% 99%, 1.5% 98.5%, 11% 1.5%
          );
          z-index: 2;
          border-radius: 4px;
          animation: brickGlow 4s ease-in-out infinite;
        }

        .inner-border {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          background: transparent;
          border: 2px solid rgba(34, 211, 238, 0.6);
          clip-path: polygon(
            12% 2%, 14% 1%, 86% 1%, 88% 2%,
            88% 2%, 97% 98%, 96% 99%, 4% 99%, 3% 98%, 12% 2%
          );
          z-index: 3;
          border-radius: 3px;
        }

        .trapezoid-content {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          bottom: 14px;
          clip-path: polygon(
            15% 2.5%, 17% 1.5%, 83% 1.5%, 85% 2.5%,
            85% 2.5%, 96.5% 97.5%, 96% 98.5%, 4% 98.5%, 3.5% 97.5%, 15% 2.5%
          );
          z-index: 4;
          border-radius: 3px;
        }

        @keyframes brickGlow {
          0%, 100% {
            filter: brightness(1) saturate(1);
            transform: scale(1);
          }
          50% {
            filter: brightness(1.2) saturate(1.3);
            transform: scale(1.005);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMB;