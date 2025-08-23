'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'use-intl';

export default function OrderSection() {
  const tOrd = useTranslations('OrderSection');
  const [mounted, setMounted] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(pointer: coarse), (hover: none)');
      const update = () => setIsCoarse(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    }
  }, []);

  const particleCount = isCoarse ? 14 : 30;

  const particles = useMemo(() => {
    if (!mounted)
      return [] as {
        id: number;
        left: string;
        top: string;
        dur: number;
        delay: number;
      }[];
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dur: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
  }, [mounted, particleCount]);

  return (
    <section className="py-32 px-4 relative bg-gradient-to-b from-purple-900/20 via-black/80 to-purple-900/20 overflow-hidden fade-edge fade-edge-bottom fade-edge-top fade-edge-lg fade-edge-cyberpunk">
      {/* Decorative background layers */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* Neon grid background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(oklch(0.7 0.25 320 / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, oklch(0.7 0.25 320 / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Holographic layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-400/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.7_0.25_320_/_0.4)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,oklch(0.6_0.3_180_/_0.4)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,oklch(0.8_0.25_60_/_0.3)_0%,transparent_60%)]" />

        {/* Animated neon particles (hydration-safe) */}
        {mounted && (
          <div className="absolute inset-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-pink-400 rounded-full shadow-[0_0_10px_currentColor]"
                style={{ left: p.left, top: p.top }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: p.dur,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: p.delay,
                }}
              />
            ))}
          </div>
        )}

        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-10 left-0 md:top-20 md:left-20 xl:left-52 w-40 h-40 border-2 border-cyan-400/40 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          aria-hidden
        />
        <motion.div
          className="absolute bottom-10 right-5 md:bottom-20 md:right-20 w-32 h-32 border-2 border-pink-400/40 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          aria-hidden
        />
        <motion.div
          className="absolute top-3/4 md:top-2/3 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          aria-hidden
        />

        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-4"
          animate={{ y: ['-100%', '100vh'] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="relative">
            {/* Holographic button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-50 animate-pulse scale-150" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse scale-125"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse scale-110"
              style={{ animationDelay: '1s' }}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-200 text-black font-bold px-6 sm:px-20 py-2 md:py-4 text-3xl rounded-full neon-glow transition-colors duration-500 transform shadow-2xl border-4 border-yellow-300 group"
              aria-label="Перейти до каталогу товарів для замовлення"
            >
              <span className="drop-shadow-2xl font-mono tracking-wider group-hover:tracking-widest transition-all duration-300">
                {tOrd('order')}
              </span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p
              className="text-white/80 text-xl font-mono glitch"
              data-text={tOrd('uReady')}
            >
              {tOrd('uReady')}
            </p>
            <p className="text-pink-400/70 text-lg font-mono">
              {tOrd('joinUs')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
