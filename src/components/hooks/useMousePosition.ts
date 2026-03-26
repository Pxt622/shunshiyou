'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useMousePosition(throttleMs: number = 16) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);
  const frameRef = useRef<number>();

  const updatePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < throttleMs) return;
    lastUpdateRef.current = now;
    
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, [throttleMs]);

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [updatePosition]);

  return position;
}