'use client';

import type React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';
import dynamic from 'next/dynamic';

const SlotMachine = dynamic(() => import('./SlotMachine'), {
  ssr: false,
});

export default function ContactSection() {
  const tCon = useTranslations('ContactSection');
  const [formData, setFormData] = useState({
    tel: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  // Ukrainian phone number formatting
  const formatPhoneNumber = useCallback((value: string) => {
    // Remove all non-digits except +
    const cleaned = value.replace(/[^\d+]/g, '');

    // Handle different input scenarios
    let formatted = cleaned;

    // If starts with +380 or 380
    if (formatted.startsWith('+380')) {
      const digits = formatted.slice(4);
      if (digits.length <= 2) {
        formatted = `+380 ${digits}`;
      } else if (digits.length <= 5) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 7) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
      }
    } else if (formatted.startsWith('380')) {
      const digits = formatted.slice(3);
      if (digits.length <= 2) {
        formatted = `+380 ${digits}`;
      } else if (digits.length <= 5) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 7) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
      }
    } else if (formatted.startsWith('0')) {
      // Ukrainian local format (0XX XXX XX XX)
      const digits = formatted.slice(1);
      if (digits.length <= 2) {
        formatted = `+380 ${digits}`;
      } else if (digits.length <= 5) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 7) {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else {
        formatted = `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
      }
    } else if (formatted.length > 0 && !formatted.startsWith('+')) {
      // If just digits, assume Ukrainian mobile
      if (formatted.length <= 2) {
        formatted = `+380 ${formatted}`;
      } else if (formatted.length <= 5) {
        formatted = `+380 ${formatted.slice(0, 2)} ${formatted.slice(2)}`;
      } else if (formatted.length <= 7) {
        formatted = `+380 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5)}`;
      } else {
        formatted = `+380 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5, 7)} ${formatted.slice(7, 9)}`;
      }
    }

    return formatted;
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setFormData((prev) => ({ ...prev, tel: formatted }));
    },
    [formatPhoneNumber]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tel = formData.tel.trim();
    const message = formData.message.trim();

    if (!tel && !message) {
      setStatus('error');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tel, message }),
      });

      const data = await res.json().catch(() => ({}) as any);
      if (!res.ok) {
        setStatus('error');
        throw new Error((data as any)?.error || 'Failed to send');
      }

      setStatus('success');
      setFormData({ tel: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  // Retrowave references for placeholders - mix of global and local
  const retroMessages = [
    'messages.1', // Miami Vice reference
    'messages.2', // Synthwave nostalgia
    'messages.3', // Outrun game reference
    'messages.4', // General retrowave
    'messages.5', // Driving aesthetic
    'messages.6', // Terminator reference
    'messages.7', // VHS aesthetic
    'messages.8', // Futuristic date
  ];

  // Fixed placeholder - no hydration mismatch
  const [messagePlaceholder, setMessagePlaceholder] = useState('messages.1');

  // Set random placeholder after hydration
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * retroMessages.length);
    setMessagePlaceholder(retroMessages[randomIndex]);
  }, []);

  // Auto-clear status after 5 seconds for success/error
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <section
      id="contactUs"
      className="py-20 px-4 fade-edge fade-edge-bottom fade-edge-top fade-edge-sm fade-edge-cyberpunk"
    >
      <div className="mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-mono font-bold text-center text-white mb-16 glitch"
          data-text={tCon('connectUs')}
        >
          {tCon('connectUs')}
        </motion.h2>

        <AnimatePresence mode={'wait'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-10 px-4 xl:px-10">
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
                    {tCon('tel')}
                    <span className="text-pink-400/60 text-xs ml-2 font-mono">
                      *{tCon('autoFormat')}
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={formData.tel}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 bg-black/50 border border-pink-500/50 rounded-lg text-white placeholder-white/50 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 font-mono"
                    placeholder="+380 97 123 45 67"
                    maxLength={19} // Max length for formatted Ukrainian number
                  />
                  <div className="text-xs text-white/40 mt-1 font-mono">
                    {tCon('example')}: 0971234567 → +380 97 123 45 67
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    {tCon('message')}
                    <span className="text-cyan-400/60 text-xs ml-2 font-mono">
                      *retrowave mode ON
                    </span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-pink-500/50 rounded-lg text-white placeholder-white/50 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 resize-none"
                    placeholder={tCon(`${messagePlaceholder}`)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    status === 'sending' || !formData.tel || !formData.message
                  }
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg neon-glow transition-all duration-300 font-mono tracking-wider"
                >
                  {status === 'sending'
                    ? `${tCon('sending')}`
                    : `${tCon('send')}`}
                </Button>
              </form>
              {status === 'success' && (
                <div className="text-xs text-emerald-400/80 font-mono mt-2">
                  {tCon('success')}
                </div>
              )}
              {status === 'error' && (
                <div className="text-xs text-red-400/80 font-mono mt-2">
                  {tCon('fail')}
                </div>
              )}

              {/* Easter egg - hidden Kung Fury reference */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-4"
              >
                <div className="text-xs text-cyan-400/30 font-mono">
                  "Hack the mainframe, smoke the ONYX" - Kung Fury
                </div>
              </motion.div>
            </motion.div>

            {/* Interactive Slot Machine */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center w-full"
            >
              <SlotMachine />
            </motion.div>
          </div>
        </AnimatePresence>

        {/* Hidden retrowave references footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16 space-y-2"
        >
          <div className="text-xs text-white/20 font-mono">
            Powered by neon dreams and analog memories
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-white/15 font-mono">
            <span>EST. 1985</span>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <span className="w-1 h-1 bg-pink-400/50 rounded-full"></span>
              <span>HOTLINE MIAMI APPROVED</span>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <span className="w-1 h-1 bg-cyan-400/50 rounded-full"></span>
              <span>HACKERMAN CERTIFIED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
