'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TransitionItem {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  rect: DOMRect; // Screen coordinates of the card
}

interface TransitionContextType {
  activeItem: TransitionItem | null;
  setActiveItem: (item: TransitionItem | null) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<TransitionItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ activeItem, setActiveItem, isTransitioning, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
