"use client";
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        // Higher lerp = faster response (0.1 is soup, 0.15 is snappy)
        lerp: 0.12, 
        // Lower duration = less "floaty" feeling
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1, 
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}