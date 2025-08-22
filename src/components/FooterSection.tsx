'use client';

import { motion } from 'framer-motion';

export default function FooterSection() {
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
          <h4 className="text-lg font-semibold text-white mb-3">Контакти</h4>
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
          <h4 className="text-lg font-semibold text-white mb-3">Замовлення</h4>
          <p className="text-white/70 text-sm">t.me/onyxshop</p>
          <div className="flex justify-center md:justify-start gap-3 mt-3">
            <a
              href="#"
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-all duration-300"
            >
              <span className="text-white text-xs">T</span>
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-all duration-300"
            >
              <span className="text-white text-xs">I</span>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full hover:bg-blue-500/30 transition-colors duration-400 neon-border group"
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
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-2 py-1 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-full hover:bg-red-500/30 transition-colors duration-400 neon-border group"
            >
              <div className="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="text-white font-mono text-xs group-hover:text-red-300">
                EN
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
