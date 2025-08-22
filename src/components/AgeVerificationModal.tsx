'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: () => void;
}

export default function AgeVerificationModal({
  isOpen,
  onVerify,
}: AgeVerificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-md w-full mx-4 p-8 rounded-3xl cyber-gradient"
          >
            {/* Language selector */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="flex justify-center md:justify-end items-center gap-2 mt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full hover:bg-blue-500/30 transition-all duration-300 neon-border-cyan group"
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 border border-yellow-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <span className="text-white font-mono text-xs group-hover:text-cyan-300">
                    UA
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-2 py-1 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-full hover:bg-red-500/30 transition-all duration-300 neon-border group"
                >
                  <div className="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-white font-mono text-xs group-hover:text-red-300">
                    EN
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Character image placeholder */}
            <div className="flex justify-center md:justify-start mb-6 mt-10 md:mt-4">
              <div className="relative">
                <Image
                  src="/age-verif-img.png"
                  alt="Cyberpunk Character"
                  width={530}
                  height={370}
                  className="w-60 h-48 object-cover rounded-lg neon-glow"
                />
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                  18+
                </div>
              </div>
            </div>

            {/* Main text */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-bold text-white mb-4 glitch"
                data-text="Чи є тобі 18+ років?"
              >
                Чи є тобі 18+ років?
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                Цей інтернет-магазин містить товари для повнолітніх.
                <br />
                Для того, щоб продовжити, підтвердіть свій вік.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={onVerify}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 neon-glow"
              >
                Так, є
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold py-4 rounded-full text-lg transition-all duration-300 bg-transparent"
              >
                Ні, немає
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
