'use client';

import React from 'react';
import { LayoutGroup } from 'framer-motion';
import { TransitionProvider } from '@/components/events/managerial/TransitionContext';
import TransitionOverlay from '@/components/events/managerial/TransitionOverlay';
import CustomCursor from '@/components/events/managerial/CustomCursor';

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
