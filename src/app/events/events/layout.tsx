'use client';

import React from 'react';
import { LayoutGroup } from 'framer-motion';
import { TransitionProvider } from '@/components/events/temp/TransitionContext';
import TransitionOverlay from '@/components/events/temp/TransitionOverlay';
import CustomCursor from '@/components/events/temp/CustomCursor';

export default function ManagerialLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TransitionProvider>
            <LayoutGroup>
                <div className="relative w-full min-h-screen bg-black cursor-none">
                    <CustomCursor />
                    <TransitionOverlay />
                    {children}
                </div>
            </LayoutGroup>
        </TransitionProvider>
    );
}
