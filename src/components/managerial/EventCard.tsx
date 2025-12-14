'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    prize: string;
    delay?: number;
}

const TechDecorationTopLeft = () => (
    <svg className="absolute -top-[1px] -left-[1px] w-16 h-16 pointer-events-none" viewBox="0 0 64 64" fill="none">
        <path d="M0 64V16L16 0H64" stroke="url(#blue-grad)" strokeWidth="1.5" strokeOpacity="1" />
        <path d="M0 16L16 0" fill="url(#blue-fill)" fillOpacity="0.2" />
        <circle cx="16" cy="16" r="2" fill="#60a5fa" />
        <path d="M6 16H26" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M16 6V26" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
);

const TechDecorationBottomRight = () => (
    <svg className="absolute -bottom-[1px] -right-[1px] w-20 h-20 pointer-events-none" viewBox="0 0 80 80" fill="none">
        <path d="M80 0V48L64 64H48L32 80H0" stroke="url(#blue-grad)" strokeWidth="1.5" strokeOpacity="1" />
        <path d="M64 64L32 80V64H64Z" fill="url(#blue-fill)" fillOpacity="0.1" />
        {/* Tech Circles */}
        <g transform="translate(60, 60)">
            <circle cx="0" cy="0" r="12" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.8" strokeDasharray="10 5" />
            <circle cx="0" cy="0" r="6" stroke="#60a5fa" strokeWidth="1" fill="#60a5fa" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>
    </svg>
);

const TechDecorationTopRight = () => (
    <svg className="absolute -top-[1px] -right-[1px] w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M0 0H32L48 16V32" stroke="url(#blue-grad)" strokeWidth="1.5" />
        <rect x="42" y="6" width="3" height="3" fill="#60a5fa" />
        <rect x="38" y="6" width="3" height="3" fill="#60a5fa" fillOpacity="0.5" />
    </svg>
)

const TechDecorationBottomLeft = () => (
    <svg className="absolute -bottom-[1px] -left-[1px] w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M0 32V48H16" stroke="url(#blue-grad)" strokeWidth="1.5" />
        <path d="M0 32L16 48" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
)

const GlobalGradients = () => (
    <svg width="0" height="0">
        <defs>
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
            <linearGradient id="blue-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>
    </svg>
)

const EventCard: React.FC<EventCardProps & { image?: string }> = ({ title, date, prize, delay = 0, image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="relative group min-h-[350px]"
        >
            <div className="absolute inset-0 z-0">
                <GlobalGradients />
            </div>

            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl border-[0px] border-white/5 shadow-xl transition-all duration-300 group-hover:bg-blue-950/90"
                style={{
                    clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 32px) 100%, 0 100%, 0 16px)'
                }}
            />

            {/* Decorative Overlays */}
            <TechDecorationTopLeft />
            <TechDecorationTopRight />
            <TechDecorationBottomRight />
            <TechDecorationBottomLeft />

            <div className="absolute top-0 left-16 right-12 h-[1.5px] bg-gradient-to-r from-blue-500/50 to-blue-400/20" />
            <div className="absolute top-12 bottom-16 right-0 w-[1.5px] bg-gradient-to-b from-blue-400/20 to-blue-500/50" />
            <div className="absolute bottom-0 left-0 right-32 h-[1.5px] bg-gradient-to-r from-blue-500/50 to-blue-400/20" />
            <div className="absolute top-16 bottom-0 left-0 w-[1.5px] bg-gradient-to-b from-blue-400/20 to-blue-500/50" />


            {/* Internal Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-4 pl-2 border-l-2 border-blue-500/50">
                    <span className="block text-xs font-mono text-blue-400 mb-1 tracking-widest uppercase">Event_ID // 0{Math.floor(Math.random() * 99)}</span>
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-200 transition-colors uppercase">{title}</h3>
                    <div className="mt-2 flex items-center space-x-2">
                        <div className="h-1 w-1 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-blue-300/80 bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/30">
                            {date}
                        </span>
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/10 bg-black/50 group-hover:border-blue-500/30 transition-colors">
                    {image ? (
                        // Using a simple img tag or Next Image if preferred, but simpler for now with arbitrary URLs
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-500/20 font-mono text-xs uppercase tracking-widest">
                            [ Image Data Missing ]
                        </div>
                    )}

                    {/* Image Overlay Texture */}
                    <div className="absolute inset-0 bg-[url('/grid-pixel.png')] opacity-20 pointer-events-none mix-blend-overlay" />
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">Total Prize</span>
                        <span className="text-xl font-bold text-white font-mono">{prize}</span>
                    </div>

                    <button className="group/btn relative px-6 py-2 bg-blue-600/20 hover:bg-blue-500/40 border border-blue-500/50 text-blue-100 text-sm font-medium tracking-wider uppercase transition-all overflow-hidden opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <span className="relative z-10">Initiate</span>
                        <div className="absolute inset-0 bg-blue-500/20 transform -skew-x-12 translate-x-[-150%] group-hover/btn:translate-x-full transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
