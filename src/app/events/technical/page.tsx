'use client';

import React from 'react';
import TechnicalBackground from '../../../components/events/technical/Background';
import TechnicalEventCard from '@/components/events/technical/TechnicalEventCard';
import { IMAGES } from '@/components/events/constants'; // Import real data
import Link from 'next/link';

// Helper to generate slug consistent with the detail page logic
const generateSlug = (item: any) => {
    return `${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.subtitle.toLowerCase().replace(/\s+/g, '-')}`;
};

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
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-[#33ABB9] to-[#184344] mb-4 drop-shadow-[0_0_10px_rgba(51,171,185,0.5)] font-['Orbitron']">
                        TECHNICAL
                    </h1>
                    <p className="max-w-xl text-lg text-[#33ABB9]/80 font-mono tracking-widest">
                        SYSTEM.INIT(EVENTS)
                    </p>
                </div>

                {/* Event Grid */}
                <div className="container mx-auto px-4 pb-20 pointer-events-auto">
                    {/* 3 columns with decreased gap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {IMAGES.map((event, index) => {
                            const slug = generateSlug(event);
                            return (
                                <Link href={`/events/events/${slug}?from=technical`} key={event.id} className="block">
                                    <TechnicalEventCard
                                        title={`${event.title} ${event.subtitle}`}
                                        description={event.description.substring(0, 100) + "..."}
                                        date={`March ${15 + (index % 3)}th`}
                                        prize={`₹${(index + 1) * 5000}`}
                                        delay={index * 0.05}
                                        image={event.image}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Technical
