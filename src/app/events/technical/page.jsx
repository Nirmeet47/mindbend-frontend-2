'use client';

import React from 'react';
import TechnicalBackground from '../../../components/events/technical/Background';
import TechnicalEventCard from '@/components/events/technical/TechnicalEventCard';

// Imports from static folder
import img1 from '@/static/1.png';
import img2 from '@/static/2.png';
import img3 from '@/static/3.png';
import img4 from '@/static/4.png';
import img5 from '@/static/5.png';
import img6 from '@/static/6.png';
import img7 from '@/static/7.png';
import img8 from '@/static/8.png';
import img9 from '@/static/9.png';
import img10 from '@/static/10.png';
import img11 from '@/static/11.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

// Dummy Data Generator for Technical Events
const TECHNICAL_EVENTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: `Tech Event ${i + 1}`,
  description: "Dive into the world of algorithms, coding errors and hardware hacks.",
  date: `March ${15 + (i % 5)}th`,
  prize: `₹${(15 + (i % 5)) * 1000}`,
  image: images[i % images.length].src
}));

function Technical() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#33ABB9]/30">

      {/* Background Component handles its own Fixed positioning per layer now */}
      <TechnicalBackground />

      {/* Scrollable Content */}
      <div className="relative z-10 w-full min-h-screen pointer-events-none">
        {/* Pointer events none on wrapper to let background clicks through if needed? 
                 Actually, we need pointer-events-auto for cards. 
                 The header doesn't have interactive elements, but the grid does.
             */}

        {/* Hero Section */}
        <div className="flex flex-col items-center min-h-[50vh] -px-4 pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-[#33ABB9] to-[#184344] mb-4 drop-shadow-[0_0_10px_rgba(51,171,185,0.5)] font-['Orbitron']">
            TECHNICAL
          </h1>
          <p className="max-w-xl text-lg text-[#33ABB9]/80 font-mono tracking-widest">
            SYSTEM.INIT(EVENTS)
          </p>
        </div>

        {/* Event Grid */}
        <div className="container mx-auto px-4 pb-20 pointer-events-auto">
          {/* Reverting to 3 columns as requested for more space */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {TECHNICAL_EVENTS.map((event, index) => (
              <TechnicalEventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                prize={event.prize}
                delay={index * 0.05}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Technical