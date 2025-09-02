'use client';

import { motion } from 'framer-motion';
import { usePathname as useI18nPathname } from '@/i18n/navigation';
import { LanguageSwitchers } from '@/components/LanguageSwitchers';
import Image from 'next/image';
import { useTranslations } from 'use-intl';

export default function FooterSection() {
  const tFot = useTranslations('FooterSection');
  const pathname = useI18nPathname();
  return (
    <footer className="py-8 px-4 border-t border-white/10" data-nosnippet>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-2 md:gap-8 items-center justify-center">
        {/* Column 1: ONYX Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 flex flex-col items-center justify-center col-span-1 md:col-span-2"
        >
          <h3
            className="text-3xl font-mono font-bold text-white glitch"
            data-text="ONYX"
          >
            ONYX
          </h3>
        </motion.div>

        {/* Column 2: Контакти */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2 flex flex-col items-center justify-center col-span-1 md:col-span-2"
        >
          <h4 className="text-lg font-semibold text-white mb-3">
            {tFot('contacts')}
          </h4>
          <a
            href="tel:+380777000775"
            className="text-white/70 text-sm hover:text-pink-400 transition-colors duration-300"
          >
            +38 (077) 700 07 75{''}
          </a>
          <a
            href="mailto:info@onyx-wave.com"
            className="text-white/70 text-sm hover:text-pink-400 transition-colors duration-300"
          >
            info@onyx-wave.com{''}
          </a>
          <a
            href="https://t.me/get_onyx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 text-sm hover:text-pink-400 transition-colors duration-300"
          >
            @get_onyx{''}
          </a>
        </motion.div>

        {/* Column 3: Замовлення */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2 flex flex-col items-center justify-center col-span-1 md:col-span-2"
        >
          <h4 className="text-lg font-semibold text-white">{tFot('orders')}</h4>
          <a
            href="https://t.me/onyxua_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 text-sm hover:text-pink-400 transition-colors duration-300"
          >
            @onyxua_bot{''}
          </a>
          <h4 className="text-lg font-semibold text-white">
            {tFot('socials')}{' '}
          </h4>
          <div className="flex flex-row items-center justify-center md:justify-start gap-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://instagram.com/onyx_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-colors duration-300"
            >
              <Image
                src={'/insta-img.png'}
                alt="Instagram"
                width={24}
                height={24}
                className="w-4 h-4"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://tiktok.com/@onyx_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-colors duration-300"
            >
              <Image
                src={'/tik-tok-img.png'}
                alt="Tik-Tok"
                width={24}
                height={24}
                className="w-4 h-4"
              />
            </motion.a>
          </div>
        </motion.div>

        {/* Column 4: Copyright and Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2 flex flex-col items-center justify-center col-span-1 md:col-span-2"
        >
          <p className="text-white/50 text-xs leading-relaxed text-pretty">
            © 2025 ONYX.
            <br />
            All rights reserved.
            <br />
            Made with love in Kyiv.
          </p>
          <div className="flex flex-row items-center gap-2 mt-3">
            <LanguageSwitchers pathname={pathname} />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
