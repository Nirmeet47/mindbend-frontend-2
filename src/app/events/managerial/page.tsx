"use client";

import dynamic from 'next/dynamic';
import UIOverlay from '@/components/events/managerial/UIOverlay';
import { useContextBridge } from '@react-three/drei';
import { TransitionContext } from '@/components/events/managerial/TransitionContext'; // We need to export the context itself to bridge it
import React from 'react';

// Lazy load the 3D scene to avoid SSR issues with Three.js (window is undefined)
const Scene = dynamic(() => import('@/components/events/managerial/Scene'), {
    ssr: false,
    loading: () => <div className="bg-black w-full h-screen" />,
});

// Helper to bridge context into Canvas
const SceneWrapper = () => {
    // @ts-ignore - ContextBridge is not perfectly typed in some versions
    const ContextBridge = useContextBridge(TransitionContext);
    return <Scene ContextBridge={ContextBridge} />;
};

export default function EventsManagerialPage() {
    return (
        <main className="w-full h-screen bg-black overflow-hidden relative">
            <UIOverlay />
            <div className="absolute inset-0 z-0">
                <SceneWrapper />
            </div>
        </main>
    );
}
