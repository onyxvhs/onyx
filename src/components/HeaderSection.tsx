'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'use-intl';

export default function HeaderSection() {
  const tHead = useTranslations('HeaderSection');
  return (
    <header className="relative h-screen overflow-x-hidden fade-edge fade-edge-bottom fade-edge-cyberpunk fade-edge-lg">
      <div className="absolute inset-0">
        <Image
          src="/cyberpunk-retrowave-neon-city.png"
          alt="Cyberpunk background"
          width={1024}
          height={681}
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-8xl md:text-9xl font-mono font-bold text-white glitch mb-8"
          data-text="ONYX"
        >
          ONYX
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl px-4"
        >
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-4">
            {tHead('title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {tHead('subTitle')}
          </p>
        </motion.div>
      </div>

      {/* Decorative elements - responsive positioning */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute z-20 left-0 bottom-0 w-32 sm:w-48 md:w-64 lg:w-72"
        style={{ maxWidth: '20vw' }}
      >
        <Image
          src="/star-img.png"
          alt="Декоративна зірка"
          width={275}
          height={373}
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute z-20 right-0 bottom-32 sm:bottom-40 md:bottom-48 lg:bottom-60 w-24 sm:w-32 md:w-40 lg:w-48"
        style={{ maxWidth: '15vw' }}
      >
        <Image
          src="/angle-img.png"
          alt="Декоративний кут"
          width={195}
          height={302}
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </motion.div>
    </header>
  );
}
