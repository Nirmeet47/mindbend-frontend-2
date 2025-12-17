"use client";
import Image from "next/image";

interface Sponsor {
  id: number;
  name: string;
  displayName: string;
  logoUrl?: string;
}

export default function PastSponsors() {
  const sponsors: Sponsor[] = [
    {
      id: 1,
      name: "Amul",
      displayName: "Amul",
      logoUrl: "/amul.png",
    },
    {
      id: 2,
      name: "pepsi",
      displayName: "pepsi",
      logoUrl: "/pepsi.png",
    },
    {
      id: 3,
      name: "redbull",
      displayName: "Red Bull",
      logoUrl: "/redbull.png",
    },
    {
      id: 4,
      name: "tea_post",
      displayName: "Tea Post",
      logoUrl: "/tea_post.png",
    },
    {
      id: 5,
      name: "monster",
      displayName: "Monster Energy",
      logoUrl: "/monster.png",
    },
  ];

  // Create enough duplicates for seamless infinite scroll
  const sponsorGroups = Array(6).fill(sponsors).flat();

  return (
    <>
      <style jsx global>{`
        .infiniteSlider {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 3rem 0;
          /* Background removed */
        }

        .sliderTrack {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        /* Slower, smoother animation */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .logoItem {
          flex: 0 0 auto;
          padding: 0 1.5rem;
          transition: transform 0.3s ease;
        }

        .logoItem:hover {
          transform: translateY(-5px);
        }

        .logoContainer {
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(4px);
        }

        .logoItem:hover .logoContainer {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 8px 32px rgba(30, 58, 138, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          transform: scale(1.05);
          backdrop-filter: blur(8px);
        }

        .logoImage {
          object-fit: contain;
          filter: grayscale(25%) brightness(0.95);
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .logoItem:hover .logoImage {
          filter: grayscale(0%) brightness(1.1);
          opacity: 1;
          transform: scale(1.08);
        }

        /* Blue pulse effect on hover */
        @keyframes pulse {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        .logoGlow {
          position: absolute;
          inset: -5px;
          background: radial-gradient(
            circle at center,
            rgba(59, 130, 246, 0.4) 0%,
            transparent 70%
          );
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .logoItem:hover .logoGlow {
          opacity: 0.6;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Gradient edges for seamless infinite effect - made transparent */
        .sliderOverlay {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 5%,
            transparent 95%,
            transparent 100%
          );
          z-index: 2;
        }

        /* Pause animation on hover */
        .infiniteSlider:hover .sliderTrack {
          animation-play-state: paused;
        }

        /* Additional subtle movement for depth */
        .logoItem:nth-child(odd) {
          margin-top: 10px;
        }

        .logoItem:nth-child(even) {
          margin-bottom: 10px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .logoContainer {
            width: 120px;
            height: 120px;
          }

          .logoItem {
            padding: 0 1.25rem;
          }

          .sliderTrack {
            animation-duration: 35s;
          }
        }

        @media (max-width: 768px) {
          .infiniteSlider {
            padding: 2rem 0;
          }

          .logoContainer {
            width: 100px;
            height: 100px;
            border-radius: 12px;
          }

          .logoItem {
            padding: 0 1rem;
          }

          .sliderTrack {
            animation-duration: 30s;
          }
        }

        @media (max-width: 480px) {
          .logoContainer {
            width: 80px;
            height: 80px;
            border-radius: 10px;
          }

          .logoItem {
            padding: 0 0.75rem;
          }

          .sliderTrack {
            animation-duration: 25s;
          }

          .logoItem:nth-child(odd) {
            margin-top: 5px;
          }

          .logoItem:nth-child(even) {
            margin-bottom: 5px;
          }
        }

        /* Smooth transition */
        .sliderTrack {
          transition: animation-play-state 0.3s ease;
        }
      `}</style>

      <div className="infiniteSlider">
        <div className="sliderTrack">
          {sponsorGroups.map((sponsor, index) => (
            <div key={`${sponsor.id}-${index}`} className="logoItem">
              <div className="logoGlow" />
              <div className="logoContainer">
                <Image
                  src={sponsor.logoUrl || `/${sponsor.name}.svg`}
                  alt={`${sponsor.displayName} logo`}
                  width={120}
                  height={120}
                  className="logoImage"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="sliderOverlay" />
      </div>
    </>
  );
}
