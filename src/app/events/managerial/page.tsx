"use client";

import dynamic from 'next/dynamic';
import UIOverlay from '@/components/events/managerial/UIOverlay';
import CustomCursor from '@/components/events/managerial/CustomCursor';

// Lazy load the 3D scene to avoid SSR issues with Three.js (window is undefined)
const Scene = dynamic(() => import('@/components/events/managerial/Scene'), {
    ssr: false,
    loading: () => <div className="bg-black w-full h-screen" />,
});

export default function EventsManagerialPage() {
    return (
        <main className="w-full h-screen bg-black overflow-hidden relative cursor-none">
            <CustomCursor />
            <UIOverlay />
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>
        </main>
    );
}
