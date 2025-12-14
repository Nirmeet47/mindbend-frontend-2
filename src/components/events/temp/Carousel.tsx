import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { IMAGES, TOTAL_WIDTH } from '@/components/events/constants';
import CarouselItem from './CarouselItem';
import * as THREE from 'three';

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

const Carousel: React.FC = () => {
  const { viewport } = useThree();
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  // Handle wheel for desktop
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Horizontal scrolling often maps to deltaX, but mouse wheels are deltaY
      // Let's support both for convenience
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      scrollTarget.current -= d * 0.003;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Simple touch/drag support
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      startX.current = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      startScroll.current = scrollTarget.current;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const diff = (x - startX.current) * 0.01; // Sensitivity
      scrollTarget.current = startScroll.current + diff;
    };

    const onUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  useFrame((state, delta) => {
    // Smooth scroll inertia using standard lerp formula for frame independence-ish
    // damp(current, target, lambda, dt) -> lerp(current, target, 1 - exp(-lambda * dt))
    const lambda = 5;
    const t = 1 - Math.exp(-lambda * delta);
    scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, t);
  });

  return (
    <group>
      {IMAGES.map((item, i) => (
        <WrappedItem
          key={item.id}
          item={item}
          index={i}
          scrollCurrent={scrollCurrent}
          totalItems={IMAGES.length}
        />
      ))}
    </group>
  );
};

// Responsible for positioning itself based on scroll
const WrappedItem = ({ item, index, scrollCurrent, totalItems }: any) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const totalWidthAll = TOTAL_WIDTH * totalItems;
    const offset = index * TOTAL_WIDTH;
    const currentScroll = scrollCurrent.current * 4; // Scroll speed multiplier

    // Calculate infinite wrapping position
    // (offset + scroll) modulo totalWidth
    let x = (offset + currentScroll) % totalWidthAll;

    // Adjust x to center 0
    // Standard modulo returns [0, totalWidthAll], we want [-totalWidthAll/2, totalWidthAll/2]
    // Actually we want them to wrap around the camera view.

    // Centering correction
    if (x < 0) x += totalWidthAll;
    if (x > totalWidthAll / 2) x -= totalWidthAll;

    // Additional wrap check for smoother edge cases
    if (x < -totalWidthAll / 2) x += totalWidthAll;

    groupRef.current.position.x = x;

    // Dynamic Opacity for text based on x position
    // The groupRef contains the CarouselItem component's result.
    // CarouselItem returns a <group>, so groupRef.current.children[0] is that group.
    // Inside that group: children[0] is mesh, children[1] is the text group.

    const innerGroup = groupRef.current.children[0];
    if (innerGroup && innerGroup.children.length > 1) {
      const textGroup = innerGroup.children[1];
      // Fade out text as it moves away from center x=0
      const dist = Math.abs(x);
      const opacity = 1.0 - Math.min(dist / 2.5, 1.0);

      textGroup.visible = opacity > 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <CarouselItem
        index={index}
        image={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.description}
        eventId={item.id}
      />
    </group>
  );
};

export default Carousel;