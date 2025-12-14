'use client';

import ManagerialBackground from '@/components/managerial/ManagerialBackground';
import EventCard from '@/components/managerial/EventCard';

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

// Dummy Data Generator
const EVENTS = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    title: `Managerial Event ${i + 1}`,
    description: "Experience the ultimate test of leadership and strategy. Compete with the best minds and showcase your managerial prowess in this high-stakes challenge.",
    date: `March ${15 + (i % 5)}th, 2025`,
    prize: `₹${(10 + (i % 5)) * 1000}`,
    // Assign images round-robin or random
    image: images[i % images.length]
}));

export default function ManagerialPage() {
    return (
        <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                <ManagerialBackground />
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
                <div className="container mx-auto px-4 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {EVENTS.map((event, index) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                prize={event.prize}
                                delay={index * 0.05} // Staggered animation
                                image={event.image.src} // Pass the src string
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
