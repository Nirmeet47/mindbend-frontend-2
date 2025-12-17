"use client"

import { useState } from 'react';
import NavigationButton from '@/components/home/navigation/NavigationButton';
import AboutSection from '@/components/home/AboutSection';
import AboutHero from '@/components/home/about/AboutHero';
import InspiringWords from '@/components/home/inspiring-words/InspiringWords';
import TimerSection from '@/components/home/TimerSection';
import MechanicalTransition from '@/components/home/navigation/MechanicalTransition';
import FuturisticGearAnimation from '@/components/home/navigation/GearMenu';

export default function Home() {
  const [showGearMenu, setShowGearMenu] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleNavigation = () => {
    if (!showTransition && !showGearMenu) {
      setShowTransition(true);
    }
  };

  const handleTransitionStart = () => {
    // Switch to gear menu when gates start opening (during transition)
    setShowGearMenu(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  const handleCloseGearMenu = () => {
    setShowGearMenu(false);
  };

  return (
    <>
      {/* Always show navigation button when not in gear menu */}
      {!showGearMenu && (
        <NavigationButton onClick={handleNavigation} />
      )}
      
      {/* Main content area */}
      {showGearMenu ? (
        <FuturisticGearAnimation onClose={handleCloseGearMenu} />
      ) : (
        <>
          <AboutSection />
          <AboutHero />
          <TimerSection />
          <InspiringWords />
        </>
      )}
      
      {/* Transition overlay */}
      <MechanicalTransition
        isActive={showTransition}
        onTransitionStart={handleTransitionStart}
        onTransitionComplete={handleTransitionComplete}
      />
    </>
  );
}