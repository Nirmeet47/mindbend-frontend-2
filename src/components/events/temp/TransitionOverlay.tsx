'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from './TransitionContext';
import Image from 'next/image';

const TransitionOverlay: React.FC = () => {
    const { activeItem, isTransitioning } = useTransition();

    return (
        <AnimatePresence>
            {activeItem && isTransitioning && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    {/* 
            We use layoutId to connect this element to the one in the details page.
            The initial position is determined by the 'rect' we captured from the 3D scene.
          */}
                    <motion.div
                        layoutId={`event-image-${activeItem.id}`}
                        initial={{
                            position: 'absolute',
                            top: activeItem.rect.top,
                            left: activeItem.rect.left,
                            width: activeItem.rect.width,
                            height: activeItem.rect.height,
                            borderRadius: '20px', // Match card rounded corners
                            opacity: 1,
                        }}
                        animate={{
                            // The destination is handled by the layoutId matching on the destination page.
                            // However, for the exit animation (when coming back), we need this to be here.
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3 }
                        }}
                        transition={{
                            duration: 0.75,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        className="overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={activeItem.image}
                            alt={activeItem.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay Gradient similar to the card */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

                        {/* Text Content - We can also animate this if we want seamless text transition */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <motion.h2
                                layoutId={`event-title-${activeItem.id}`}
                                className="text-white font-bold text-2xl mb-1"
                            >
                                {activeItem.title}
                            </motion.h2>
                            <motion.p
                                layoutId={`event-subtitle-${activeItem.id}`}
                                className="text-white/80 text-sm"
                            >
                                {activeItem.subtitle}
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransitionOverlay;
