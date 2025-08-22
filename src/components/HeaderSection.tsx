'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeaderSection() {
  return (
    <header className="relative h-screen overflow-x-hidden fade-edge fade-edge-bottom fade-edge-cyberpunk fade-edge-lg">
      <div className="absolute inset-0">
        <Image
          src="/cyberpunk-retrowave-neon-city.png"
          alt="Cyberpunk background"
          width={1024}
          height={681}
          className="w-full h-full object-cover"
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
            ONYX — це вайб
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Новий стиль атмосфери. Ми не стоїмо на місці — і ти теж.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute z-20 left-0 bottom-0"
      >
        <Image src={'/star-img.png'} alt={'star'} width={275} height={373} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute z-20 right-0 bottom-60"
      >
        <Image src={'/angle-img.png'} alt={'angle'} width={195} height={302} />
      </motion.div>
    </header>
  );
}
