'use client';

import { motion } from 'framer-motion';

export default function HeaderSection() {
  return (
    <header className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cyberpunk-retrowave-neon-city.png"
          alt="Cyberpunk background"
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
    </header>
  );
}
