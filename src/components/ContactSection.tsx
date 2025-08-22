'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-mono font-bold text-center text-white mb-16 glitch"
          data-text="CONTACT US"
        >
          CONTACT US
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20 items-center">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-pink-500/50 rounded-lg text-white placeholder-white/50 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-pink-500/50 rounded-lg text-white placeholder-white/50 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 resize-none"
                  placeholder="Ваше повідомлення..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg neon-glow transition-all duration-300"
              >
                Відправити
              </Button>
            </form>
          </motion.div>

          {/* Arcade machine */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center p-4 xl:p-0"
          >
            <div className="relative">
              <Image
                src="/arcade-v2.png"
                alt="Neon Arcade Machine"
                width={500}
                height={500}
                className="w-full md:max-w-full rounded-xl neon-glow"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -left-4 w-16 h-16"
              >
                <Image
                  src="/coin-img.png"
                  alt="Coin"
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 -right-4 w-12 h-12"
              >
                <Image
                  src="/coin-img.png"
                  alt="Coin"
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
