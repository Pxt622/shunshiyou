'use client';

declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const isLowEndDevice = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return (memory && memory < 4) || (cores && cores < 4) || isMobile;
  }, []);

  useEffect(() => {
    if (!containerRef.current || isLowEndDevice()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, 
      powerPreference: "low-power" 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particles: THREE.Mesh[] = [];
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x2563EB, 
      transparent: true, 
      opacity: 0.6 
    });

    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      scene.add(particle);
      particles.push(particle);
    }

    camera.position.z = 5;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      particles.forEach((particle, i) => {
        const dx = particle.position.x - mouseRef.current.x * 5;
        const dy = particle.position.y - mouseRef.current.y * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) {
          particle.position.x += dx * 0.02;
          particle.position.y += dy * 0.02;
        }
        if (i % 10 === 0) {
          particle.rotation.x += 0.01;
          particle.rotation.y += 0.01;
        }
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current.domElement.remove();
      }
      geometry.dispose();
      material.dispose();
    };
  }, [isLowEndDevice]);

  if (isLowEndDevice()) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}