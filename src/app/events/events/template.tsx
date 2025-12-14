'use client';

import { AnimatePresence } from 'framer-motion';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            {children}
        </AnimatePresence>
    );
}
