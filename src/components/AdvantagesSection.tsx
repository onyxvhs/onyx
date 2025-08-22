'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function TV({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`absolute -z-10 pointer-events-none ${className}`}>
      <Image
        src="/TV-asset.png"
        alt="Retro TV"
        width={232}
        height={202}
        className="block w-full h-auto select-none opacity-80"
        priority={false}
      />
      {/* Screen area */}
      <div className="absolute inset-[12%] flex items-center justify-center text-[10px] md:text-xs text-white/80 font-mono">
        {children}
      </div>
    </div>
  );
}

export default function AdvantagesSection() {
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
      title: 'Палкий характер',
      description:
        'ONYX залюбки приймає три вугілля. Жару хочеш? Жару отримаєш.',
      frontImage: '/card-1-front.png',
      backImage: '/card-1-back.png',
    },
    {
      title: 'Написано "МАНГО"? Буде манго',
      description:
        'Без сюрпризів. Те, що на етикетці — саме те, що ти відчуєш.',
      frontImage: '/card-2-front.png',
      backImage: '/card-2-back.png',
    },
    {
      title: 'Сесія, яка не закінчується',
      description: 'До 2 годин стабільного вайбу. Перезабивати не доведеться.',
      frontImage: '/card-3-front.png',
      backImage: '/card-3-back.png',
    },
    {
      title: 'Не хімія — Естетика',
      description:
        'Фрукти — як фрукти. Ягоди — як із лісу. Природність звучить краще.',
      frontImage: '/card-4-front.png',
      backImage: '/card-4-back.png',
    },
    {
      title: "Багато - це ще м'яко сказано",
      description:
        'ONYX заповнює простір паром так щільно, що стає його частиною.',
      frontImage: '/card-5-front.png',
      backImage: '/card-5-back.png',
    },
    {
      title: 'Кальян, який не вимагає догляду',
      description:
        'ONYX жаростійкий, стабільний і не потребує уваги. Ідеально для кальянщиків і НоRеСа.',
      frontImage: '/card-6-front.png',
      backImage: '/card-6-back.png',
    },
  ];

  return (
    <section className="py-32 px-4 relative bg-gradient-to-b from-purple-900/30 via-black/50 to-purple-900/30 fade-edge fade-edge-bottom fade-edge-top fade-edge-sm fade-edge-cyberpunk">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-mono font-bold text-center text-white mb-20 glitch"
          data-text="Пікантні переваги"
        >
          Пікантні переваги
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
                    <div className="w-full h-full neon-border backdrop-blur-sm hover:neon-glow transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden">
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
                          justifySelf: 'center',
                          placeSelf: 'center',
                        }}
                      />
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="card-flip-back"
                    aria-hidden={isTouch ? !flipped.has(index) : true}
                  >
                    <div className="w-full h-full neon-border backdrop-blur-sm hover:neon-glow transition-all duration-800 group cursor-pointer rounded-xl overflow-hidden relative">
                      <Image
                        src={advantage.frontImage || '/placeholder.svg'}
                        alt={`${advantage.title} - Front`}
                        width={320}
                        height={300}
                        className="w-full h-full object-contain"
                        draggable={false}
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-4 text-center">
                        <h3 className="text-xl lg:text-lg font-bold text-white mb-3 transition-colors leading-tight">
                          {advantage.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {advantage.description}
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
      <TV className="hidden lg:block top-4 left-8 w-40 tv-screen">
        <span className="uppercase tracking-widest">ONYX FM</span>
      </TV>

      <TV className="hidden lg:block top-16 right-32 w-44 tv-screen">
        <span className="uppercase tracking-widest">LIVE 24/7</span>
      </TV>

      <TV className="hidden md:block bottom-0 xl:bottom-12 left-12 w-36 tv-screen">
        <span className="uppercase tracking-widest">NEWS</span>
      </TV>

      <TV className="hidden md:block bottom-5 xl:bottom-20 right-12 w-40 tv-screen">
        <span className="uppercase tracking-widest">VIBES</span>
      </TV>

      <TV className="hidden xl:block top-1/2 left-4 w-32 -translate-y-1/2 tv-screen">
        <span className="uppercase tracking-widest">ON AIR</span>
      </TV>

      <TV className="hidden xl:block top-1/3 right-4 w-40 -translate-y-1/3 tv-screen">
        <span className="uppercase tracking-widest">RETROWAVE</span>
      </TV>
    </section>
  );
}
