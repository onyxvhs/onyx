'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname as useI18nPathname } from '@/i18n/navigation';
import { LanguageSwitchers } from '@/components/LanguageSwitchers';
import { useTranslations } from 'use-intl';
import { useState } from 'react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: () => void;
}

export default function AgeVerificationModal({
  isOpen,
  onVerify,
}: AgeVerificationModalProps) {
  const pathname = useI18nPathname();
  const tModal = useTranslations('Modals');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleNoClick = () => {
    setShowEasterEgg(true);

    // Optional: Reset after a few seconds to allow multiple clicks
    setTimeout(() => {
      setShowEasterEgg(false);
    }, 10000);
  };

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
            className="max-w-md w-full mx-4 p-6 rounded-3xl cyber-gradient max-h-screen overflow-y-auto"
          >
            {/* Character image placeholder */}
            <div className="flex flex-col justify-center">
              {/* Language selector */}
              <div className="flex items-center gap-4 self-end pb-10">
                <div className="flex justify-center md:justify-end items-center gap-2 mt-3">
                  <LanguageSwitchers pathname={pathname} />
                </div>
              </div>

              <div className="flex justify-center relative w-fit self-center pb-2">
                <AnimatePresence mode="wait">
                  {showEasterEgg ? (
                    <motion.div
                      key="easter-egg"
                      initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateY: -180 }}
                      transition={{
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="w-60 h-48 rounded-lg overflow-hidden drop-shadow-xl drop-shadow-pink-500 relative"
                    >
                      <Image
                        src="/easter-egg.gif"
                        alt="Easter Egg Animation"
                        width={530}
                        height={370}
                        className="w-full h-full object-cover"
                        unoptimized // Important for GIFs to animate properly
                      />
                      {/* Glitch effect overlay for easter egg */}
                      <motion.div
                        animate={{
                          opacity: [0, 1, 0],
                          x: [-2, 2, -2, 0],
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: 3,
                          repeatType: 'reverse',
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-500/20 mix-blend-screen"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="original"
                      initial={{ scale: 1, opacity: 1, rotateY: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                      transition={{
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <Image
                        src="/age-verif-img.png"
                        alt="Cyberpunk Character"
                        width={530}
                        height={370}
                        className="w-60 h-48 object-cover rounded-lg drop-shadow-xl drop-shadow-pink-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 18+ badge - animate when easter egg is shown */}
                <motion.div
                  animate={
                    showEasterEgg
                      ? {
                          scale: [1, 1.2, 0.8, 1.1, 1],
                          rotate: [0, 15, -15, 10, 0],
                          backgroundColor: [
                            '#ffffff',
                            '#ff0080',
                            '#00ffff',
                            '#ffffff',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 0.8 }}
                  className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg"
                >
                  {showEasterEgg ? '🎉' : '18+'}
                </motion.div>
              </div>
            </div>

            {/* Main text - also animate when easter egg is active */}
            <motion.div
              className="text-center mb-8"
              animate={
                showEasterEgg
                  ? {
                      y: [0, -5, 0],
                      scale: [1, 1.02, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-3xl font-bold text-white mb-4 glitch"
                data-text={tModal('ageSubmit')}
              >
                {tModal('ageSubmit')}
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                {tModal('productPlaced')}
                <br />
                {tModal('toContinue')}
              </p>
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.4,
                }}
                onClick={onVerify}
                className="flex-1 p-2 bg-yellow-400 hover:bg-transparent text-black hover:text-yellow-400 hover:border-2 hover:border-yellow-400 font-bold rounded-xl text-lg transition-colors duration-400 cursor-pointer"
              >
                {tModal('yes')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  showEasterEgg
                    ? {
                        boxShadow: [
                          '0 0 0 rgba(255, 0, 128, 0)',
                          '0 0 20px rgba(255, 0, 128, 0.5)',
                          '0 0 40px rgba(255, 0, 128, 0.3)',
                          '0 0 20px rgba(255, 0, 128, 0.5)',
                          '0 0 0 rgba(255, 0, 128, 0)',
                        ],
                        borderColor: [
                          '#ec4899',
                          '#ff0080',
                          '#00ffff',
                          '#ec4899',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.4,
                  boxShadow: {
                    duration: 1.2,
                    repeat: showEasterEgg ? Number.POSITIVE_INFINITY : 0,
                  },
                  borderColor: { duration: 0.8 },
                }}
                onClick={handleNoClick}
                disabled={showEasterEgg}
                className="flex-1 p-2 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold rounded-xl text-lg transition-colors duration-400 bg-transparent cursor-pointer"
              >
                {showEasterEgg ? '🎊' : tModal('no')}
              </motion.button>
            </div>

            {/* Easter egg message */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center mt-4 p-3 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg border border-pink-500/30"
                >
                  <p className="text-cyan-300 text-sm font-mono">
                    🎮 {tModal('easterEgg')} 🎮
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    {tModal('foundSecret')} 😉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
