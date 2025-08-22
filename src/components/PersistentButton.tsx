'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const PersistentButton = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded
  const [showButton, setShowButton] = useState(true); // Show immediately
  const [showTooltip, setShowTooltip] = useState(true); // Show tooltip initially

  useEffect(() => {
    // Collapse after 5 seconds
    const collapseTimer = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);

    // Hide tooltip after 10 seconds on larger screens
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(collapseTimer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    // Scroll to OrderSection or handle flavor exploration
    const orderSection =
      document.querySelector('[data-section="product"]') ||
      document.querySelector(
        'section[class*="bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50"]'
      );
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    // Show tooltip again when manually toggled
    if (!isExpanded) {
      setShowTooltip(true);
      // Hide it again after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  if (!showButton) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50"
      >
        <motion.div
          className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer"
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          layout
        >
          {/* Background layers similar to OrderSection */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-black/95 to-purple-900/90" />

          {/* Neon grid background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(oklch(0.7 0.25 320 / 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, oklch(0.7 0.25 320 / 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '12px 12px',
              }}
            />
          </div>

          {/* Holographic layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-400/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.7_0.25_320_/_0.25)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.6_0.3_180_/_0.25)_0%,transparent_70%)]" />

          {/* Animated scanning line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent w-full h-0.5 sm:h-1"
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/8 via-orange-400/8 to-yellow-400/8 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg" />

          {/* Content */}
          <motion.div
            className="relative z-10 p-3 md:p-4 flex items-center gap-1.5 sm:gap-2 md:gap-3"
            layout
          >
            {/* Tree icon */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/tree-img.png"
                alt="tree"
                width={20}
                height={20}
                className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 drop-shadow-[0_0_6px_rgba(0,255,255,0.4)] sm:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
              />
            </motion.div>

            {/* Expandable text */}
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-white font-mono text-sm whitespace-nowrap overflow-hidden glitch"
                  data-text="Ознайомитись зі смаками"
                >
                  <span className="sm:hidden">Смаки</span>
                  <span className="hidden sm:inline">
                    Ознайомитись зі смаками
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
              onClick={toggleExpanded}
              className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  width="12"
                  height="12"
                  className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Neon border */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-400/25 sm:border-cyan-400/30 shadow-[0_0_10px_rgba(0,255,255,0.15)] sm:shadow-[0_0_15px_rgba(0,255,255,0.2)] md:shadow-[0_0_20px_rgba(0,255,255,0.3)]" />

          {/* Animated particles - responsive count and size */}
          <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-pink-400 rounded-full"
                style={{
                  left: `${30 + i * 35}%`,
                  top: `${40 + i * 20}%`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tooltip for collapsed state - hidden on mobile, auto-hide after 10s on larger screens */}
        <AnimatePresence>
          {!isExpanded && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-1.5 sm:mb-2 px-2 sm:px-3 py-1 bg-black/90 text-white text-xs rounded-md sm:rounded-lg whitespace-nowrap font-mono border border-cyan-400/30 hidden sm:block"
            >
              Ознайомитись зі смаками
              <div className="absolute top-full right-2 sm:right-3 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
