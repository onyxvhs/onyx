'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Coins,
  Crown,
  Gamepad2,
  Gem,
  Heart,
  Music,
  Sparkles,
  Star,
  Trophy,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { useTranslations } from 'use-intl';

export default function SlotMachine() {
  const tCon = useTranslations('ContactSection');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([0, 1, 2]);
  const [credits, setCredits] = useState(0);
  const [lastWin, setLastWin] = useState(0);
  const [showLastWin, setShowLastWin] = useState(false);
  const [message, setMessage] = useState(tCon('slot.init.pressToStart'));
  const [nextRefill, setNextRefill] = useState('');
  const [hasPromocode, setHasPromocode] = useState(false);
  const [showPromocode, setShowPromocode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Static promocode - simpler approach
  const PROMOCODE = 'ONYX2077';
  const COST_PER_SPIN = 3;
  const DOUBLE_MULTIPLIER = 2;
  const TRIPLE_MULTIPLIER = 8;

  // Retrowave-themed symbols with adjusted values for better balance
  const symbols = [
    {
      icon: Zap,
      color: 'text-yellow-400',
      name: 'Lightning',
      value: 8,
      weight: 15,
    },
    {
      icon: Crown,
      color: 'text-purple-400',
      name: 'Crown',
      value: 50,
      weight: 4,
    },
    { icon: Gem, color: 'text-cyan-400', name: 'Gem', value: 12, weight: 12 },
    { icon: Star, color: 'text-pink-400', name: 'Star', value: 15, weight: 10 },
    { icon: Heart, color: 'text-red-400', name: 'Heart', value: 5, weight: 20 },
    {
      icon: Coins,
      color: 'text-yellow-300',
      name: 'Coins',
      value: 25,
      weight: 6,
    },
    {
      icon: Trophy,
      color: 'text-orange-400',
      name: 'Trophy',
      value: 100,
      weight: 3,
    },
    {
      icon: Gamepad2,
      color: 'text-green-400',
      name: 'Gamepad',
      value: 6,
      weight: 18,
    },
    {
      icon: Sparkles,
      color: 'text-blue-400',
      name: 'Sparkles',
      value: 10,
      weight: 13,
    },
    {
      icon: Music,
      color: 'text-indigo-400',
      name: 'Music',
      value: 18,
      weight: 5,
    },
  ];
  const symbolKeys = [
    'lightning',
    'crown',
    'gem',
    'star',
    'heart',
    'coins',
    'trophy',
    'gamepad',
    'sparkles',
    'music',
  ] as const;
  const getSymbolName = (idx: number) =>
    tCon(`slot.symbols.${symbolKeys[idx]}`);

  // Weighted random symbol selection
  const getWeightedRandomSymbol = () => {
    const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < symbols.length; i++) {
      random -= symbols[i].weight;
      if (random <= 0) return i;
    }
    return 0;
  };

  // One place to update credits and persist the exact next value
  const updateCredits = (compute: (prev: number) => number) => {
    setCredits((prev) => {
      const next = compute(prev);
      try {
        localStorage.setItem('slotMachine_credits', String(next));
      } catch (e) {
        console.warn('Could not save to localStorage:', e);
      }
      return next;
    });
  };

  // Centralized promocode unlock helper
  const unlockPromocode = (msg: string, durationMs: number) => {
    if (hasPromocode) return;

    try {
      localStorage.setItem('slotMachine_hasPromocode', 'true');
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    setHasPromocode(true);
    setShowPromocode(true);
    setMessage(msg);
    setTimeout(() => setShowPromocode(false), durationMs);
  };

  const checkWin = (newReels: number[]) => {
    const [a, b, c] = newReels;

    // Three of a kind (jackpot)
    if (a === b && b === c) {
      const baseWin = symbols[a].value * TRIPLE_MULTIPLIER;
      updateCredits((prev) => prev + baseWin);
      setLastWin(baseWin);
      setShowLastWin(true);

      // Hide last win after 10 seconds
      setTimeout(() => {
        setLastWin(0);
        setShowLastWin(false);
      }, 10000);

      // Any triple unlocks a promocode. Mega for Crown/Trophy.
      const isMega = a === 1 || a === 6;

      if (hasPromocode) {
        setMessage(
          isMega
            ? tCon('slot.runtime.megaJackpot', {
                symbol: getSymbolName(a),
                amount: baseWin,
              })
            : tCon('slot.runtime.jackpot', {
                symbol: getSymbolName(a),
                amount: baseWin,
              })
        );
      } else {
        const baseMsg = isMega
          ? tCon('slot.runtime.megaJackpot', {
              symbol: getSymbolName(a),
              amount: baseWin,
            })
          : tCon('slot.runtime.jackpot', {
              symbol: getSymbolName(a),
              amount: baseWin,
            });
        unlockPromocode(
          `${baseMsg} ${tCon('slot.ui.promocodeUnlocked')}`,
          isMega ? 30000 : 20000
        );
      }
      return;
    }

    // Two of a kind
    if (a === b || b === c || a === c) {
      const matchSymbol = a === b ? a : b === c ? b : c;
      const baseWin = symbols[matchSymbol].value * DOUBLE_MULTIPLIER;
      updateCredits((prev) => prev + baseWin);
      setLastWin(baseWin);
      setShowLastWin(true);

      // Hide last win after 10 seconds
      setTimeout(() => {
        setLastWin(0);
        setShowLastWin(false);
      }, 10000);

      setMessage(
        tCon('slot.runtime.doubleWin', {
          symbol: getSymbolName(matchSymbol),
          amount: baseWin,
        })
      );

      // Small chance for promocode on double high-value symbols
      // Small chance for promocode on any double
      if (!hasPromocode && Math.random() < 0.1) {
        unlockPromocode(
          tCon('slot.runtime.bonusPrize', {
            symbol: getSymbolName(matchSymbol),
          }),
          15000
        );
      }
      return;
    }

    // No win
    setLastWin(0);
    setShowLastWin(false);
    const loseMessages = [
      tCon('slot.loseMessages.0'),
      tCon('slot.loseMessages.1'),
      tCon('slot.loseMessages.2'),
      tCon('slot.loseMessages.3'),
      tCon('slot.loseMessages.4'),
      tCon('slot.loseMessages.5'),
    ];
    if (credits >= COST_PER_SPIN)
      setMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
  };

  const spin = useCallback(() => {
    if (isSpinning || credits < COST_PER_SPIN) return;

    setIsSpinning(true);
    updateCredits((prev) => prev - COST_PER_SPIN);
    setMessage(tCon('slot.runtime.spinningMsg'));
    setLastWin(0);
    setShowLastWin(false);

    // Generate final results
    const finalReels = [
      getWeightedRandomSymbol(),
      getWeightedRandomSymbol(),
      getWeightedRandomSymbol(),
    ];

    // Simulate spinning duration
    setTimeout(() => {
      setIsSpinning(false);
      setReels(finalReels);
      checkWin(finalReels);
    }, 2000);
  }, [isSpinning, credits, hasPromocode]);

  // Initialize credits and check for existing data
  useEffect(() => {
    const now = new Date();
    let lastRefill = null;
    let savedCredits = null;
    let savedHasPromocode = null;

    try {
      lastRefill = localStorage.getItem('slotMachine_lastRefill');
      savedCredits = localStorage.getItem('slotMachine_credits');
      savedHasPromocode = localStorage.getItem('slotMachine_hasPromocode');
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }

    // Check if 24 hours have passed
    if (lastRefill) {
      const refillTime = new Date(lastRefill);
      const hoursElapsed =
        (now.getTime() - refillTime.getTime()) / (1000 * 60 * 60);

      if (hoursElapsed >= 24) {
        // Refill credits
        setCredits(15);
        try {
          localStorage.setItem('slotMachine_credits', '15');
          localStorage.setItem('slotMachine_lastRefill', now.toISOString());
        } catch (e) {
          console.warn('Could not save to localStorage:', e);
        }
        setMessage(tCon('slot.init.dailyRefillWelcome'));
      } else {
        // Load existing credits
        setCredits(parseInt(savedCredits || '0'));
        // Calculate next refill time
        const nextRefillTime = new Date(
          refillTime.getTime() + 24 * 60 * 60 * 1000
        );
        setNextRefill(nextRefillTime.toLocaleString());
      }
    } else {
      // First time user
      setCredits(15);
      try {
        localStorage.setItem('slotMachine_credits', '15');
        localStorage.setItem('slotMachine_lastRefill', now.toISOString());
      } catch (e) {
        console.warn('Could not save to localStorage:', e);
      }
      setMessage(tCon('slot.init.welcome'));
    }

    // Load promocode status
    if (savedHasPromocode === 'true') {
      setHasPromocode(true);
    }
    setHydrated(true);
  }, []);

  // Update next refill time
  useEffect(() => {
    // Avoid running on the initial 0-credits render before we hydrate from localStorage
    if (!hydrated || isSpinning) return;

    // If we have credits, ensure any stale countdown is cleared and exit
    if (credits >= COST_PER_SPIN) {
      if (nextRefill) setNextRefill('');
      return;
    }

    // Only when credits are actually zero, compute the next refill time
    let lastRefill = null;
    try {
      lastRefill = localStorage.getItem('slotMachine_lastRefill');
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }

    if (!lastRefill) return;

    const refillTime = new Date(lastRefill);
    const nextRefillTime = new Date(refillTime.getTime() + 24 * 60 * 60 * 1000);

    // If the refill time has already passed, don't show a countdown
    if (Date.now() >= nextRefillTime.getTime()) {
      if (nextRefill) setNextRefill('');
      return;
    }

    const nextStr = nextRefillTime.toLocaleString();
    setNextRefill(nextStr);
    setMessage(tCon('slot.info.nextRefill', { datetime: nextStr }));
  }, [credits, hydrated, isSpinning, nextRefill]);

  const handleCopyPromocode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROMOCODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.warn('Clipboard copy failed:', e);
    }
  }, []);

  const WinParticles = ({ show }: { show: boolean }) => {
    if (!show) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"
            style={{
              transform: `translate(-50%, -50%) translate(${
                (i % 2 === 0 ? 1 : -1) * (30 + i * 15)
              }px, ${-40 - i * 10}px)`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1.2s',
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-900/40 via-black/90 to-cyan-900/30 rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-pink-500/30 shadow-2xl backdrop-blur-sm sm:max-w-xl w-full mx-auto overflow-hidden">
      {/* Enhanced neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-cyan-500/10 rounded-3xl blur-xl -z-10"></div>

      {/* Slot Machine Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h3
          className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-2 animate-pulse"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient 4s ease-in-out infinite',
          }}
        >
          NEON SLOTS
        </h3>
        <div className="text-xs lg:text-sm text-white/60 font-mono">
          SYNTHWAVE EDITION • CYBER ENHANCED
        </div>
      </div>

      {/* Credits and Status Display - Fixed Height Container */}
      <div className="mb-4 sm:mb-6 min-h-[60px] sm:min-h-[70px] lg:min-h-[80px]">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 h-full">
          {/* Credits Display - Always visible */}
          <div className="bg-black/60 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-cyan-400/50 backdrop-blur-sm min-w-[100px] sm:min-w-[120px]">
            <div className="text-xs text-cyan-400 font-mono text-center">
              {tCon('slot.ui.credits')}
            </div>
            <motion.div
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono text-center"
              animate={lastWin > 0 ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {credits}
            </motion.div>
            {credits === 0 && (
              <div className="text-xs text-yellow-400/80 font-mono text-center mt-1">
                {tCon('slot.ui.refillsDaily')}
              </div>
            )}
          </div>

          {/* Last Win Display - Animated presence */}
          <AnimatePresence>
            {showLastWin && lastWin > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-yellow-400/50 backdrop-blur-sm"
              >
                <div className="text-xs text-yellow-400 font-mono text-center">
                  {tCon('slot.ui.lastWin')}
                </div>
                <motion.div
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 font-mono text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  +{lastWin}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Promocode Display - Fixed height container to prevent layout shifts */}
      <div className="mb-4 sm:mb-6 min-h-0">
        <AnimatePresence mode="wait">
          {showPromocode && (
            <motion.div
              key="promocode-active"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="p-3 sm:p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border-2 border-pink-400/50 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="text-sm text-pink-400 font-mono mb-2">
                  {tCon('slot.ui.promocodeUnlocked')}
                </div>

                {/* Relative wrapper so absolute copy UI doesn't shift layout */}
                <div className="relative inline-block">
                  {/* The visible code pill (click to copy as well) */}
                  <div
                    onClick={handleCopyPromocode}
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono bg-black/50 px-3 sm:px-4 py-2 rounded-lg inline-block break-all select-text"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCopyPromocode();
                      }
                    }}
                    aria-label={tCon('slot.ui.ariaCopyPromocode')}
                  >
                    {PROMOCODE}
                  </div>

                  {/* Absolute floating copy button */}
                  <motion.button
                    type="button"
                    onClick={handleCopyPromocode}
                    aria-label={tCon('slot.ui.copy')}
                    className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 rounded-full border border-white/20 bg-black/60 backdrop-blur px-2 py-2 shadow-md"
                    initial={{ opacity: 0, scale: 0.8, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -4 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied-icon"
                          initial={{ opacity: 0, rotate: -15 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 15 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center justify-center"
                        >
                          <Check size={16} className="text-emerald-300" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy-icon"
                          initial={{ opacity: 0, rotate: -15 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 15 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center justify-center"
                        >
                          <Copy size={16} className="text-white/80" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Floating "Copied!" chip – absolute, not affecting layout */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        key="copied-chip"
                        initial={{ opacity: 0, y: -6, x: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: -12, x: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, x: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-none absolute -right-2 -top-10 sm:-right-3 sm:-top-12 whitespace-nowrap rounded-md border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-mono text-emerald-200 shadow"
                      >
                        {tCon('slot.ui.copied')}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-xs text-white/60 font-mono mt-2">
                  {tCon('slot.ui.saveCodeHint')}
                </div>

                {/* SR-only polite region to announce copy for screen readers */}
                <span className="sr-only" aria-live="polite">
                  {copied ? tCon('slot.ui.srCopied') : ''}
                </span>
              </div>
            </motion.div>
          )}

          {hasPromocode && !showPromocode && (
            <motion.div
              key="promocode-earned"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-3 bg-green-500/20 rounded-xl border border-green-400/50 backdrop-blur-sm cursor-pointer hover:bg-green-500/30 transition-colors duration-200"
              onClick={() => setShowPromocode(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-sm text-green-400 font-mono">
                  {tCon('slot.ui.promocodeEarned')}
                </div>
                <div className="text-xs text-white/60 font-mono">
                  {tCon('slot.ui.clickToView')}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Slot Reels */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="bg-black/80 p-3 sm:p-4 lg:p-6 rounded-2xl border-2 border-pink-500/40 shadow-inner backdrop-blur-sm">
          <div className="flex gap-2 sm:gap-3 lg:gap-4">
            {reels.map((symbolIndex, reelIndex) => {
              const Symbol = symbols[symbolIndex].icon;
              return (
                <div
                  key={reelIndex}
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border-2 border-white/20 flex items-center justify-center relative overflow-hidden shadow-lg"
                >
                  <motion.div
                    animate={
                      isSpinning
                        ? {
                            rotateY: [0, 360],
                            scale: [1, 0.75, 1],
                          }
                        : lastWin > 0
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }
                          : { scale: 1, rotate: 0 }
                    }
                    transition={{
                      duration: isSpinning ? 2 : 0.8,
                      delay: isSpinning ? reelIndex * 0.1 : 0,
                      repeat: isSpinning ? Infinity : 0,
                    }}
                  >
                    <Symbol
                      size={24}
                      className={`${symbols[symbolIndex].color} drop-shadow-[0_0_8px_currentColor] z-10`}
                    />
                  </motion.div>

                  {/* Spinning effect overlay */}
                  {isSpinning && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 100, opacity: [0, 0.8, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: reelIndex * 0.05,
                      }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent h-4"
                    />
                  )}

                  {/* Win glow effect */}
                  <AnimatePresence>
                    {lastWin > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, repeat: 3 }}
                        className="absolute inset-0 bg-yellow-400/20 rounded-xl"
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Spin Button */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <motion.button
          onClick={spin}
          disabled={isSpinning || credits < COST_PER_SPIN}
          whileHover={{ scale: isSpinning ? 1 : 1.05 }}
          whileTap={{ scale: isSpinning ? 1 : 0.95 }}
          animate={isSpinning ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.2 }}
          className={`bg-gradient-to-br from-red-500 via-red-600 to-red-800 hover:from-red-400 hover:via-red-500 hover:to-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-full border-4 border-red-300/50 shadow-2xl relative overflow-hidden backdrop-blur-sm transition-all duration-200`}
        >
          <div className="flex items-center gap-2 lg:gap-3 relative z-10">
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{
                duration: 1,
                repeat: isSpinning ? Infinity : 0,
                ease: 'linear',
              }}
            >
              {isSpinning ? (
                <Sparkles size={18} className="text-yellow-300" />
              ) : (
                <Gamepad2 size={18} />
              )}
            </motion.div>
            <span className="font-mono text-sm lg:text-base">
              {isSpinning
                ? tCon('slot.ui.buttonSpinning')
                : tCon('slot.ui.buttonPull')}
            </span>
          </div>

          {/* Button shine effect */}
          {!isSpinning && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                animation: 'shine 2s infinite',
                animationDelay: '1s',
              }}
            />
          )}
        </motion.button>
      </div>

      {/* Fixed Message Display - Consistent height */}
      <div className="text-center mb-4 sm:mb-6 min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm lg:text-base text-white/90 font-mono text-center bg-black/30 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white/10 backdrop-blur-sm w-full max-w-xs sm:max-w-sm lg:max-w-md break-words text-pretty whitespace-pre-wrap"
          >
            {message}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Game Info - Fixed height container */}
      <div className="text-center space-y-2 sm:space-y-3 min-h-[40px] sm:min-h-[50px]">
        <div className="text-xs lg:text-sm text-white/50 font-mono text-pretty whitespace-pre-wrap">
          {tCon('slot.info.costInfo', {
            cost: COST_PER_SPIN,
            refill: 15,
          })}
        </div>
        <AnimatePresence>
          {credits === 0 && nextRefill ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-yellow-400/80 font-mono bg-black/40 px-2 sm:px-3 py-1 sm:py-2 rounded-lg break-words overflow-hidden"
            >
              {tCon('slot.info.nextRefill', {
                datetime: nextRefill,
              })}
            </motion.div>
          ) : credits > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-green-400/70 font-mono overflow-hidden"
            >
              {tCon('slot.info.keepPlaying')}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Win celebration particles */}
      <WinParticles show={lastWin > 0} />

      {/* Floating decorative elements */}
      <div
        className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-sm opacity-60 pointer-events-none"
        style={{
          animation: 'float 4s ease-in-out infinite',
        }}
      />

      <div
        className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-sm opacity-50 pointer-events-none"
        style={{
          animation: 'float 3.5s ease-in-out infinite reverse',
        }}
      />

      <div
        className="absolute top-1/4 -right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-40 pointer-events-none"
        style={{
          animation: 'orbit 5s linear infinite',
        }}
      />

      {/* Ambient scan line effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/3 to-transparent h-8 pointer-events-none rounded-3xl overflow-hidden opacity-60"
        style={{
          animation: 'scan 7s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(10deg);
          }
          66% {
            transform: translateY(8px) rotate(-10deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-6px) translateX(3px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(0px) translateX(6px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(6px) translateX(3px) rotate(270deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
            opacity: 0.2;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
