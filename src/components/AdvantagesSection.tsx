'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TV_Screen } from '@/components/TV_Screen';
import { useTranslations } from 'use-intl';

export default function AdvantagesSection() {
  const tAdv = useTranslations('AdvantageSection');
  const [isTouch, setIsTouch] = useState(false);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

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

  const advantages = [
    {
      title: '1.title',
      description: '1.description',
      frontImage: '/card-1-front.png',
      backImage: '/card-1-back.png',
    },
    {
      title: '2.title',
      description: '2.description',
      frontImage: '/card-2-front.png',
      backImage: '/card-2-back.png',
    },
    {
      title: '3.title',
      description: '3.description',
      frontImage: '/card-3-front.png',
      backImage: '/card-3-back.png',
    },
    {
      title: '4.title',
      description: '4.description',
      frontImage: '/card-4-front.png',
      backImage: '/card-4-back.png',
    },
    {
      title: '5.title',
      description: '5.description',
      frontImage: '/card-5-front.png',
      backImage: '/card-5-back.png',
    },
    {
      title: '6.title',
      description: '6.description',
      frontImage: '/card-6-front.png',
      backImage: '/card-6-back.png',
    },
  ];

  return (
    <section className="py-44 md:py-32 px-4 relative bg-gradient-to-b from-purple-950/30 via-black/50 to-purple-800/30 fade-edge fade-edge-bottom fade-edge-top fade-edge-sm fade-edge-cyberpunk">
      <div className="max-w-md sm:max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-mono font-bold text-center text-white mb-20 glitch"
          data-text={tAdv('header')}
        >
          {tAdv('header')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-20 justify-items-center p-4 md:p-0 md:my-10">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-80 lg:w-64 relative z-20"
            >
              <div
                className={`card-flip-container ${isTouch && flipped.has(index) ? 'is-flipped' : ''}`}
                onClick={() => toggleFlip(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleFlip(index);
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isTouch && flipped.has(index)}
                aria-label={`${advantage.title}. ${isTouch || flipped ? advantage.description : 'Натисніть, щоб перевернути картку'}`}
              >
                <div
                  className="card-flip-inner"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="card-flip-front"
                    aria-hidden={isTouch ? !!flipped.has(index) : false}
                  >
                    <div className="w-full h-full neon-border backdrop-blur-sm hover:neon-glow transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={advantage.backImage || '/placeholder.svg'}
                        alt={`${advantage.title} - Back`}
                        width={320}
                        height={300}
                        className="w-4/5 object-center sm:w-full h-full object-contain"
                        draggable={false}
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                        sizes="(min-width: 1024px) 256px, (min-width: 768px) 320px, 100vw"
                      />
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative TVs (responsive, behind content) */}
      <TV_Screen className="block top-6 left-8 w-40 tv-screen rotate-12">
        <span className="uppercase tracking-widest">ONYX FM</span>
      </TV_Screen>

      <TV_Screen className="hidden lg:block top-16 right-32 w-44 tv-screen -rotate-12">
        <span className="uppercase tracking-widest">LIVE 24/7</span>
      </TV_Screen>

      <TV_Screen className="hidden lg:block bottom-0 xl:bottom-12 left-12 w-36 tv-screen -rotate-6">
        <span className="uppercase tracking-widest">NEWS</span>
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
