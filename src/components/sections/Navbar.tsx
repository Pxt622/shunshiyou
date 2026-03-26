'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: '功能', href: '#features' },
  { name: '技术', href: '#tech' },
  { name: '故事', href: '#stories' },
  { name: '校园大使', href: '#campus' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              瞬时游
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-600 hover:text-brand-blue transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
              </button>
            ))}
            <Link
              href="/plan"
              className="px-6 py-2 bg-brand-blue text-white rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              立即规划
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  {item.name}
                </button>
              ))}
              <Link
                href="/plan"
                className="block w-full text-center px-4 py-2 bg-brand-blue text-white rounded-full"
              >
                立即规划
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}