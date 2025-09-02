'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function LearnUsBetterSection() {
  const tLearn = useTranslations('LearnUsBetterSection');
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const matrixChars = isMobile
    ? ['1', '0', '1', '0', '1', '0']
    : [
        '1',
        '0',
        '1',
        '1',
        '0',
        '1',
        '0',
        '0',
        '1',
        '1',
        '0',
        '1',
        '0',
        '1',
        '1',
        '0',
        '1',
        '0',
        '1',
        '1',
        '0',
        '0',
        '1',
        '0',
        '1',
        '1',
        '0',
        '1',
        '0',
        '1',
      ];

  useEffect(() => {
    const cardInterval = setInterval(
      () => {
        setActiveCard((prev) => (prev + 1) % 4);
      },
      isMobile ? 6000 : 5000
    );
    return () => clearInterval(cardInterval);
  }, [isMobile]);

  const brandPillars = [
    {
      title: tLearn('missionTitle'),
      description: tLearn('missionDesc'),
      color: 'from-cyan-400 to-blue-600',
      glowColor: 'shadow-cyan-400/50',
    },
    {
      title: tLearn('visionTitle'),
      description: tLearn('visionDesc'),
      color: 'from-purple-500 to-pink-600',
      glowColor: 'shadow-purple-500/50',
    },
    {
      title: tLearn('innovationTitle'),
      description: tLearn('innovationDesc'),
      color: 'from-pink-500 to-orange-500',
      glowColor: 'shadow-pink-500/50',
    },
    {
      title: tLearn('communityTitle'),
      description: tLearn('communityDesc'),
      color: 'from-green-400 to-cyan-500',
      glowColor: 'shadow-green-400/50',
    },
  ];

  return (
    <section
      id="about"
      title={tLearn('header')}
      className="py-16 md:py-32 px-4 relative bg-gradient-to-b from-black/85 via-purple-950/10 to-purple-950/30 overflow-hidden fade-edge fade-edge-bottom fade-edge-sm fade-edge-cyberpunk"
    >
      {/* Animated Circuit Background - Simplified on mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
        {!isMobile && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_48%,rgba(0,255,255,0.2)_49%,rgba(0,255,255,0.2)_51%,transparent_52%)] bg-[length:100px_100px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_48%,rgba(255,0,128,0.2)_49%,rgba(255,0,128,0.2)_51%,transparent_52%)] bg-[length:100px_100px]"></div>
          </>
        )}
      </div>

      {/* Data Stream Lines - Disabled on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Holographic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl font-mono font-bold text-center text-white mb-8 glitch"
            data-text={tLearn('header')}
          >
            {tLearn('header')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-white/80 font-mono tracking-wide mb-8"
          >
            {tLearn('subheader')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center">
              <span className="text-cyan-400 font-mono text-sm tracking-widest">
                {tLearn('dataProcessing')}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Left Column - Static Description */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col justify-center min-h-[500px]"
          >
            {/* Cyberpunk Corner Indicators */}
            <div className="absolute -top-3 -left-3 z-30 pointer-events-none">
              <div className="relative w-6 h-6">
                <div className="absolute top-0 left-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                <div className="absolute top-0 left-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 z-30 pointer-events-none">
              <div className="relative w-6 h-6">
                <div className="absolute top-0 right-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                <div className="absolute top-0 right-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
              </div>
            </div>

            <div className="neon-border backdrop-blur-sm p-6 md:p-8 rounded-xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute inset-0 opacity-20">
                {[...Array(isMobile ? 3 : 8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    style={{ top: `${i * (isMobile ? 33.33 : 12.5)}%` }}
                    animate={
                      !isMobile
                        ? {
                            opacity: [0, 0.8, 0],
                            scaleX: [0, 1, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 opacity-10 overflow-hidden">
                {matrixChars.slice(0, isMobile ? 2 : 5).map((char, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${(i * (isMobile ? 50 : 20)) % 100}%`,
                      top: '-20px',
                    }}
                    animate={
                      !isMobile
                        ? {
                            y: ['0px', '600px'],
                            opacity: [0, 1, 0],
                          }
                        : {
                            y: ['0px', '400px'],
                            opacity: [0, 0.3, 0],
                          }
                    }
                    transition={{
                      duration: isMobile ? 10 : 8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * (isMobile ? 2 : 1.5),
                      ease: 'linear',
                    }}
                  >
                    {char}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-6 leading-tight">
                  ONYX PROTOCOL
                </h3>

                <div className="text-white/90 leading-relaxed text-base md:text-lg space-y-4 text-pretty">
                  {tLearn('description')
                    .split('. ')
                    .map((sentence, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {sentence}
                        {index < tLearn('description').split('. ').length - 1
                          ? '.'
                          : ''}
                      </motion.p>
                    ))}
                </div>
              </div>

              {/* Interactive Hover Lines - Simplified on mobile */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
              {!isMobile && (
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-pulse delay-1000"></div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Smooth Vertical Auto-sliding Brand Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative min-h-[500px] order-1 lg:order-2 flex flex-col justify-center"
          >
            <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{
                    y: '100%',
                    opacity: 0,
                    rotateX: isMobile ? 0 : 45,
                  }}
                  animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                  exit={{ y: '-100%', opacity: 0, rotateX: isMobile ? 0 : -45 }}
                  transition={{
                    duration: isMobile ? 0.8 : 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: isMobile ? 0.4 : 0.5 },
                  }}
                  className="absolute inset-0 w-full h-full"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Cyberpunk Corner Indicators */}
                  <div className="absolute -top-3 -left-3 z-30 pointer-events-none">
                    <div className="relative w-6 h-6">
                      <div className="absolute top-0 left-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                      <div className="absolute top-0 left-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 z-30 pointer-events-none">
                    <div className="relative w-6 h-6">
                      <div className="absolute top-0 right-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                      <div className="absolute top-0 right-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                    </div>
                  </div>

                  <div className="neon-border backdrop-blur-sm neon-glow h-full p-6 md:p-8 rounded-xl relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 opacity-30">
                      {[...Array(isMobile ? 2 : 6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
                          style={{ top: `${i * (isMobile ? 50 : 16.67)}%` }}
                          animate={
                            !isMobile
                              ? {
                                  opacity: [0, 1, 0],
                                  x: ['-100%', '100%'],
                                }
                              : {}
                          }
                          transition={{
                            duration: 3,
                            delay: i * 0.15,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4 md:mb-6 leading-tight"
                      >
                        {brandPillars[activeCard].title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90 leading-relaxed text-base md:text-lg text-pretty"
                      >
                        {brandPillars[activeCard].description}
                      </motion.p>
                    </div>

                    {/* Enhanced Border Effects - Simplified on mobile */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2"
                      animate={
                        !isMobile
                          ? {
                              borderColor: [
                                'rgba(0, 255, 255, 0.3)',
                                'rgba(255, 0, 128, 0.6)',
                                'rgba(0, 255, 255, 0.3)',
                              ],
                            }
                          : {
                              borderColor: 'rgba(0, 255, 255, 0.3)',
                            }
                      }
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-6 md:left-8 right-6 md:right-8 z-20">
                <div className="flex gap-2">
                  {brandPillars.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 bg-gray-600 rounded-full flex-1 relative overflow-hidden"
                      animate={{
                        backgroundColor:
                          i === activeCard ? '#00ffff' : '#374151',
                        boxShadow:
                          i === activeCard ? '0 0 8px #00ffff' : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {i === activeCard && !isMobile && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center relative"
        >
          <div className="inline-block relative">
            <div className="neon-border backdrop-blur-sm p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-15">
                {matrixChars.slice(0, isMobile ? 3 : 8).map((char, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${(i * (isMobile ? 33.33 : 12.5)) % 100}%`,
                      top: '-20px',
                    }}
                    animate={
                      !isMobile
                        ? {
                            y: ['0px', '500px'],
                            opacity: [0, 1, 0],
                          }
                        : {
                            y: ['0px', '300px'],
                            opacity: [0, 0.3, 0],
                          }
                    }
                    transition={{
                      duration: isMobile ? 8 : 6,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * (isMobile ? 0.5 : 0.3),
                      ease: 'linear',
                    }}
                  >
                    {char}
                  </motion.div>
                ))}
              </div>

              {/* Brand Logo */}
              <motion.div
                className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 mb-6"
                animate={
                  !isMobile
                    ? {
                        textShadow: [
                          '0 0 20px rgba(0, 255, 255, 0.8)',
                          '0 0 40px rgba(0, 255, 255, 1)',
                          '0 0 20px rgba(0, 255, 255, 0.8)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              >
                ONYX
              </motion.div>

              {/* Brand Info */}
              <div className="space-y-2 text-cyan-400 font-mono text-xs md:text-sm tracking-widest">
                <div>{tLearn('brandMatrix')}</div>
                <div className="flex justify-center gap-4 md:gap-8 text-xs">
                  <span>{tLearn('established')}</span>
                  <span>•</span>
                  <span>{tLearn('location')}</span>
                </div>
                <div className="text-pink-400">{tLearn('philosophy')}</div>
              </div>

              {/* Pulsing Border Effect - Simplified on mobile */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30"
                animate={
                  !isMobile
                    ? {
                        borderColor: [
                          'rgba(0, 255, 255, 0.3)',
                          'rgba(255, 0, 128, 0.6)',
                          'rgba(0, 255, 255, 0.3)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
