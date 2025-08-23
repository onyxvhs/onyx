'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname as useI18nPathname } from '@/i18n/navigation';
import { LanguageSwitchers } from '@/components/LanguageSwitchers';
import { useTranslations } from 'use-intl';

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

              <div className="flex justify-center relative w-fit self-center">
                <Image
                  src="/age-verif-img.png"
                  alt="Cyberpunk Character"
                  width={530}
                  height={370}
                  className="w-60 h-48 object-cover rounded-lg drop-shadow-xl drop-shadow-pink-500"
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
                data-text={tModal('ageSubmit')}
              >
                {tModal('ageSubmit')}
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                {tModal('productPlaced')}
                <br />
                {tModal('toContinue')}
              </p>
            </div>

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
                transition={{
                  duration: 0.4,
                }}
                className="flex-1 p-2 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold rounded-xl text-lg transition-colors duration-400 bg-transparent cursor-pointer"
              >
                {tModal('no')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
