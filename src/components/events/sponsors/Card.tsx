"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Interactive3DCardProps {
  className?: string;
  scaleOnHover?: boolean;
  image: string;
  imageAlt: string;
  sponsorName?: string;
}

export default function Interactive3DCard({
  className = "",
  scaleOnHover = true,
  image,
  imageAlt,
  sponsorName = "Sponsor",
}: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const size = `clamp(160px, 22vw, 220px)`;

  return (
    <>
      <style>{`
        :root {
          --electric-main: #6ed3ff;
          --electric-light: #9fe5ff;
        }

        .main-card {
          width: 100%;
          height: 100%;
          background: #0e0e0e;
          border-radius: 24px;
          border: 2px solid rgba(80,160,255,0.25);
          
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding-bottom: 20px; /* Add padding for name */
        }

        .card-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--electric-main);
          text-shadow: 0 0 6px var(--electric-main);
          opacity: 1; /* Changed from 0 to 1 */
          transform: translateY(0px); /* Changed from translateY(6px) */
          transition: all 0.25s ease-out;
          pointer-events: none;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 5px;
        }

        /* Remove the .visible class since it's always visible now */
        .card-label.enhanced {
          color: var(--electric-light);
          text-shadow: 0 0 10px var(--electric-light);
        }  .card-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--electric-main);
          text-shadow: 0 0 6px var(--electric-main);
          opacity: 1; /* Changed from 0 to 1 */
          transform: translateY(0px); /* Changed from translateY(6px) */
          transition: all 0.25s ease-out;
          pointer-events: none;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 5px;
        }

        /* Remove the .visible class since it's always visible now */
        .card-label.enhanced {
          color: var(--electric-light);
          text-shadow: 0 0 10px var(--electric-light);
        }

        .electric-border {
          position: absolute;
          inset: -3px;
          border-radius: 24px;
          border: 2px solid var(--electric-main);
          filter:
            url(#moving-electricity)
            drop-shadow(0 0 6px var(--electric-main));
          transition: all 0.25s ease-out;
          pointer-events: none;
          z-index: 10;
        }

        .electric-border.intense {
          border-color: var(--electric-light);
          filter:
            url(#moving-electricity-strong)
            drop-shadow(0 0 14px var(--electric-light));
        }

        .image-container {
          width: 70%;
          height: 70%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sponsor-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>

      {/* ELECTRIC FILTERS */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter
            id="moving-electricity"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015"
              numOctaves="3"
              seed="3"
              result="turb"
            />
            <feOffset in="turb" dx="0" dy="0" result="moveX">
              <animate
                attributeName="dx"
                dur="6s"
                values="0; 12; -12; 0"
                repeatCount="indefinite"
              />
            </feOffset>
            <feOffset in="moveX" dx="0" dy="0" result="moveXY">
              <animate
                attributeName="dy"
                dur="7s"
                values="0; -10; 10; 0"
                repeatCount="indefinite"
              />
            </feOffset>
            <feDisplacementMap in="SourceGraphic" in2="moveXY" scale="18" />
          </filter>

          <filter
            id="moving-electricity-strong"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="4"
              seed="3"
              result="turb"
            />
            <feOffset in="turb" dx="0" dy="0" result="moveX">
              <animate
                attributeName="dx"
                dur="4s"
                values="0; 18; -18; 0"
                repeatCount="indefinite"
              />
            </feOffset>
            <feOffset in="moveX" dx="0" dy="0" result="moveXY">
              <animate
                attributeName="dy"
                dur="4.2s"
                values="0; -15; 15; 0"
                repeatCount="indefinite"
              />
            </feOffset>
            <feDisplacementMap in="SourceGraphic" in2="moveXY" scale="28" />
          </filter>
        </defs>
      </svg>

      {/* CARD */}
      <motion.div
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: size,
          height: size,
          scale: isHovered && scaleOnHover ? 1.05 : 1,
          transition: "all 0.25s ease-out",
        }}
      >
        <div className="main-card">
          <div className={`electric-border ${isHovered ? "intense" : ""}`} />

          {/* Image container */}
          <div className="image-container">
            <img src={image} alt={imageAlt} className="sponsor-logo" />
          </div>

          {/* Sponsor Name - ALWAYS VISIBLE */}
          <div className={`card-label ${isHovered ? "enhanced" : ""}`}>
            {sponsorName}
          </div>
        </div>
      </motion.div>
    </>
  );
}
