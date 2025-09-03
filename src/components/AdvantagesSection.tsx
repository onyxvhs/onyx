'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TV_Screen } from '@/components/TV_Screen';
import { useTranslations } from 'use-intl';
import { ADVANTAGES } from '@/constants/ADVATAGES.constant';

export default function AdvantagesSection() {
  const tAdv = useTranslations('AdvantageSection');
  const [isTouch, setIsTouch] = useState(false);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [discoveredCards, setDiscoveredCards] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const toggleFlip = (idx: number) => {
    if (!isTouch) return; // only toggle on touch devices
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Track discovered cards (both hover and flip)
  const markAsDiscovered = (idx: number) => {
    setDiscoveredCards((prev) => new Set([...prev, idx]));
  };

  const handleCardInteraction = (idx: number) => {
    markAsDiscovered(idx);
    if (isTouch) {
      toggleFlip(idx);
    }
  };

  const handleCardHover = (idx: number) => {
    if (!isTouch) {
      setHoveredCard(idx);
      markAsDiscovered(idx);
    }
  };

  return (
    <section
      id="advantages"
      className="py-44 md:py-32 px-4 relative bg-gradient-to-b from-purple-950/30 via-black/50 to-purple-800/30 fade-edge fade-edge-bottom fade-edge-sm fade-edge-cyberpunk"
    >
      <div className="max-w-md sm:max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-mono font-bold text-center text-white mb-8 glitch"
          data-text={tAdv('header')}
        >
          {tAdv('header')}
        </motion.h2>

        {/* Interactive Hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400"></div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 font-mono text-sm tracking-wide">
              {isTouch ? `${tAdv('tapTo')}` : `${tAdv('hoverTo')}`}
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-20 justify-items-center p-4 md:p-0 md:my-10">
          {ADVANTAGES.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-80 lg:w-64 relative z-20"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => !isTouch && setHoveredCard(null)}
            >
              {/* Cyberpunk Corner Indicators */}
              <div className="absolute -top-2 -left-2 z-30 pointer-events-none">
                <div className="relative w-5 h-5">
                  <div className="absolute top-0 left-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 z-30 pointer-events-none">
                <div className="relative w-5 h-5">
                  <div className="absolute top-0 right-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 z-30 pointer-events-none">
                <div className="relative w-5 h-5">
                  <div className="absolute bottom-0 left-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 z-30 pointer-events-none">
                <div className="relative w-5 h-5">
                  <div className="absolute bottom-0 right-0 w-3 h-0.5 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                </div>
              </div>

              {/* Card Container */}
              <div
                className={`card-flip-container transition-all duration-300 ${
                  isTouch && flipped.has(index) ? 'is-flipped' : ''
                } ${hoveredCard === index ? 'transform -translate-y-1' : ''}`}
                onClick={() => handleCardInteraction(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    handleCardInteraction(index);
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isTouch && flipped.has(index)}
                aria-label={`${advantage.title}. ${isTouch ? 'Tap to reveal details' : 'Hover to reveal details'}`}
              >
                <div className="card-flip-inner">
                  {/* Front of card */}
                  <div
                    className="card-flip-front"
                    aria-hidden={isTouch ? !!flipped.has(index) : false}
                  >
                    <div className="w-full h-full neon-border backdrop-blur-sm hover:neon-glow transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden flex items-center justify-center relative">
                      {/* Interactive Status Indicator - Inside front face */}
                      <div className="absolute top-4 right-4 z-30 pointer-events-none">
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            discoveredCards.has(index)
                              ? 'bg-cyan-400 shadow-lg shadow-pink-500/50 animate-pulse'
                              : 'bg-gray-500 shadow-sm shadow-gray-500/50'
                          }`}
                        ></div>
                      </div>

                      {/* Scanning Line Effect */}
                      {/*<div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-20 [animation:scan_1.5s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />*/}

                      <Image
                        src={advantage.backImage || '/placeholder.svg'}
                        alt={`${advantage.title} - Back`}
                        width={320}
                        height={300}
                        className="w-4/5 object-center sm:w-full h-full object-contain relative z-10"
                        draggable={false}
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                        sizes="(min-width: 1024px) 256px, (min-width: 768px) 320px, 100vw"
                      />

                      {/* Interactive Overlay - Show before hover starts */}
                      {!discoveredCards.has(index) && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl flex items-end justify-center pb-2 transition-opacity duration-500">
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                              {isTouch
                                ? `${tAdv('tapTo')}`
                                : `${tAdv('hoverTo')}`}
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="card-flip-back"
                    aria-hidden={isTouch ? !flipped.has(index) : true}
                  >
                    <div className="w-full h-full neon-border backdrop-blur-sm hover:neon-glow transition-all duration-800 group cursor-pointer rounded-xl overflow-hidden relative flex items-center justify-center">
                      <Image
                        src={advantage.frontImage || '/placeholder.svg'}
                        alt={`${advantage.title} - Front`}
                        width={320}
                        height={300}
                        className="w-1/2 h-1/2 object-contain"
                        draggable={false}
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                        sizes="(min-width: 1024px) 256px, (min-width: 768px) 320px, 100vw"
                      />
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center tv-screen bg-gradient-to-r from-purple-900/80 via-black/60 to-purple-800/80 backdrop-blur-md rounded-xl shadow-lg">
                        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-fuchsia-500 mb-3 leading-tight drop-shadow-md transition-colors text-pretty">
                          {tAdv(`${advantage.title}`)}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm text-pretty">
                          {tAdv(`${advantage.description}`)}
                        </p>

                        {/* Data Stream Effect */}
                        <div className="absolute top-2 right-2 opacity-40">
                          <div className="text-cyan-400 text-xs font-mono animate-pulse">
                            ◯◯◯
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discovery Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-lg mx-auto"
        >
          <div className="text-center mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 font-mono text-sm tracking-wide">
              {tAdv('data')}: {discoveredCards.size}/{ADVANTAGES.length}
            </span>
          </div>

          <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-400/20">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-cyan-400/20 rounded-full"></div>

            {/* Progress fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{
                width: `${(discoveredCards.size / ADVANTAGES.length) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse duration-2000"></div>
            </motion.div>

            {/* Completion pulse */}
            {discoveredCards.size === ADVANTAGES.length && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(168, 85, 247, 0.4)',
                    '0 0 20px rgba(168, 85, 247, 0.8)',
                    '0 0 0px rgba(168, 85, 247, 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Progress Messages */}
          <motion.div
            key={discoveredCards.size} // Re-animate when score changes
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 font-mono text-sm tracking-wide">
              {(() => {
                switch (discoveredCards.size) {
                  case 0:
                    return '🌐 ENTERING THE MATRIX...';
                  case 1:
                    return 'FIRST CONNECTION ESTABLISHED';
                  case 2:
                    return 'LOADING VHS TAPE...';
                  case 3:
                    return 'NEURAL LINK STABILIZING';
                  case 4:
                    return 'TUNING SYNTHWAVE FREQUENCY';
                  case 5:
                    return 'FINAL LEVEL APPROACHING';
                  case 6:
                    return 'WELCOME, RIDER OF THE NEON WAVE!';
                  default:
                    return '🌐 ENTERING THE MATRIX...';
                }
              })()}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative TVs (responsive, behind content) */}
      <TV_Screen className="block top-6 left-8 w-40 tv-screen rotate-12">
        <span className="uppercase tracking-widest">ONYX FM</span>
      </TV_Screen>

      <TV_Screen className="hidden lg:block top-16 md:right-4 xl:right-32 w-44 tv-screen -rotate-12">
        <span className="uppercase tracking-widest">LIVE 24/7</span>
      </TV_Screen>

      <TV_Screen className="hidden lg:block bottom-0 xl:bottom-12 left-12 w-36 tv-screen -rotate-6">
        <span className="uppercase tracking-widest">Chill</span>
      </TV_Screen>

      <TV_Screen className="block bottom-5 xl:bottom-20 right-12 w-40 tv-screen rotate-12">
        <span className="uppercase tracking-widest">VIBES</span>
      </TV_Screen>

      <TV_Screen className="hidden xl:block top-1/2 left-4 w-32 -translate-y-1/2 tv-screen rotate-6">
        <span className="uppercase tracking-widest">ON AIR</span>
      </TV_Screen>

      <TV_Screen className="hidden xl:block top-1/3 right-4 w-40 -translate-y-1/3 tv-screen -rotate-6">
        <span className="uppercase tracking-widest">RETROWAVE</span>
      </TV_Screen>
    </section>
  );
}
