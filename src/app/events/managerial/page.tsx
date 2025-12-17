'use client';

import ManagerialBackground from '@/components/managerial/ManagerialBackground';
import EventCard from '@/components/managerial/EventCard';
import { IMAGES } from '@/components/events/constants'; // Import real data
import Link from 'next/link';
import SymbolFalling from '@/components/managerial/SymbolFalling';

// Helper to generate slug consistent with the detail page logic
const generateSlug = (item: any) => {
    return `${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.subtitle.toLowerCase().replace(/\s+/g, '-')}`;
};

export default function ManagerialPage() {
    return (
        <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                {/* <ManagerialBackground /> */}
                <SymbolFalling
                    density={350}
                    backgroundColor="#000000"
                    fontSize={25}
                    speed={1}
                    opacity={0.8}
                />
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 w-full min-h-screen">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(0,100,255,0.5)]">
                        MANAGERIAL
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-blue-200/80 leading-relaxed font-light">
                        Events & Leadership
                    </p>
                </div>

                {/* Event Grid */}
                <div className="container mx-auto px-18 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-20 gap-y-6">
                        {IMAGES.map((event, index) => {
                            const slug = generateSlug(event);
                            return (
                                <Link href={`/events/events/${slug}`} key={event.id} className="block">
                                    <EventCard
                                        title={`${event.title} ${event.subtitle}`}
                                        description={event.description.substring(0, 100) + "..."}
                                        date={`March ${15 + (index % 3)}th`}
                                        prize={`₹${(index + 1) * 5000}`}
                                        delay={index * 0.05} // Staggered animation
                                        image={event.image}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
