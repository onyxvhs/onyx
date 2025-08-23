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
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center justify-center md:pl-16 md:pr-32">
        {/* Column 1: ONYX Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
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
          className="text-center md:text-left space-y-2"
        >
          <h4 className="text-lg font-semibold text-white mb-3">
            {tFot('contacts')}
          </h4>
          <p className="text-white/70 text-sm">+380970000000</p>
          <p className="text-white/70 text-sm">onyx@onyx.ua</p>
          <p className="text-white/70 text-sm">TG: @onyxshop</p>
        </motion.div>

        {/* Column 3: Замовлення */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center md:text-left space-y-2"
        >
          <h4 className="text-lg font-semibold text-white mb-2">
            {tFot('orders')}
          </h4>
          <p className="text-white/70 text-sm">t.me/onyxshop</p>
          <h4 className="text-lg font-semibold text-white mb-3">
            {tFot('socials')}{' '}
          </h4>
          <div className="flex flex-row items-center justify-center sm:justify-start gap-2">
            <a
              href="#"
              className="rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-all duration-300"
            >
              <Image
                src={'/insta-img.png'}
                alt="Instagram"
                width={24}
                height={24}
                className="w-4 h-4"
              />
            </a>
          </div>
        </motion.div>

        {/* Column 4: Copyright and Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center md:items-start md:justify-start text-center md:text-left"
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
