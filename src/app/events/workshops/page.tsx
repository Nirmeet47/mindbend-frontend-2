'use client';

import React from 'react';
import Link from 'next/link';
import WorkshopBackground from '@/components/events/workshops/WorkshopBackground';
import WorkshopEventCard from '@/components/events/workshops/WorkshopEventCard';
import { WORKSHOPS } from '@/components/events/workshops/constants';

function Workshops() {
    return (
        <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#8B5CF6]/30 bg-[#0f0e13]">

            {/* Background Component */}
            <WorkshopBackground />

            {/* Main Content Wrapper */}
            <div className="relative z-10 w-full min-h-screen pointer-events-none">

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 pointer-events-auto pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#8B5CF6] to-[#4c1d95] mb-4 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] font-['Orbitron'] text-center">
                        WORKSHOPS
                    </h1>
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="h-[1px] w-12 bg-[#8B5CF6]/50"></div>
                        <p className="text-sm md:text-base text-[#8B5CF6]/80 font-mono tracking-[0.3em] uppercase">
                            Building_The_Future
                        </p>
                        <div className="h-[1px] w-12 bg-[#8B5CF6]/50"></div>
                    </div>
                </div>

                {/* Workshop Grid */}
                <div className="container mx-auto px-4 pb-24 pointer-events-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {WORKSHOPS.map((workshop, index) => (
                            <Link href={`/events/events/workshop-${workshop.id}?from=workshops`} key={workshop.id} className="block group">
                                <WorkshopEventCard
                                    title={workshop.title + " " + workshop.subtitle}
                                    description={workshop.description}
                                    date={workshop.date}
                                    prize={workshop.fee}
                                    delay={index * 0.1}
                                    image={workshop.image}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Text */}
                <div className="absolute bottom-4 w-full text-center pointer-events-none">
                    <p className="text-[10px] text-white/20 font-mono">
                        SYSTEMStatus: ONLINE // NODES: {WORKSHOPS.length}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Workshops;
