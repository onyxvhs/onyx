'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
} from 'lucide-react';

export default function SlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([0, 1, 2]);
  const [credits, setCredits] = useState(0);
  const [lastWin, setLastWin] = useState(0);
  const [message, setMessage] = useState('Press the button to start');
  const [nextRefill, setNextRefill] = useState('');
  const [hasPromocode, setHasPromocode] = useState(false);
  const [showPromocode, setShowPromocode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Static promocode - simpler approach
  const PROMOCODE = 'NEON2077WAVE';
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
      weight: 3,
    },
    { icon: Gem, color: 'text-cyan-400', name: 'Gem', value: 12, weight: 12 },
    { icon: Star, color: 'text-pink-400', name: 'Star', value: 15, weight: 10 },
    { icon: Heart, color: 'text-red-400', name: 'Heart', value: 5, weight: 20 },
    {
      icon: Coins,
      color: 'text-yellow-300',
      name: 'Coins',
      value: 25,
      weight: 5,
    },
    {
      icon: Trophy,
      color: 'text-orange-400',
      name: 'Trophy',
      value: 100,
      weight: 2,
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
      weight: 4,
    },
  ];

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
      localStorage.setItem('slotMachine_credits', String(next));
      return next;
    });
  };

  // Centralized promocode unlock helper
  const unlockPromocode = (msg: string, durationMs: number) => {
    if (
      hasPromocode ||
      localStorage.getItem('slotMachine_hasPromocode') === 'true'
    )
      return;
    localStorage.setItem('slotMachine_hasPromocode', 'true');
    setHasPromocode(true);
    setShowPromocode(true);
    setMessage(msg);
    setTimeout(() => setShowPromocode(false), durationMs);
    console.info('[SlotMachine]', 'Promocode unlocked:', msg);
  };

  const checkWin = (newReels: number[]) => {
    const [a, b, c] = newReels;

    // Three of a kind (jackpot)
    if (a === b && b === c) {
      const baseWin = symbols[a].value * TRIPLE_MULTIPLIER;
      updateCredits((prev) => prev + baseWin);
      setLastWin(baseWin);

      // Any triple unlocks a promocode. Mega for Crown/Trophy.
      const isMega = a === 1 || a === 6;
      const hadPromo =
        hasPromocode ||
        localStorage.getItem('slotMachine_hasPromocode') === 'true';

      if (hadPromo) {
        // Already have promo: show standard jackpot message only
        setMessage(
          `🎰 JACKPOT! Triple ${symbols[a].name}! +${baseWin} credits!`
        );
      } else {
        const promoMsg = isMega
          ? `🏆 MEGA JACKPOT! Triple ${symbols[a].name}! +${baseWin} credits! PROMOCODE UNLOCKED!`
          : `🎰 JACKPOT! Triple ${symbols[a].name}! +${baseWin} credits! PROMOCODE UNLOCKED!`;
        unlockPromocode(promoMsg, isMega ? 30000 : 20000);
      }
      return;
    }

    // Two of a kind
    if (a === b || b === c || a === c) {
      const matchSymbol = a === b ? a : b === c ? b : c;
      const baseWin = symbols[matchSymbol].value * DOUBLE_MULTIPLIER;
      updateCredits((prev) => prev + baseWin);
      setLastWin(baseWin);
      setMessage(
        `✨ Nice! Double ${symbols[matchSymbol].name}! +${baseWin} credits!`
      );

      // Small chance for promocode on double high-value symbols
      if (
        (matchSymbol === 1 ||
          matchSymbol === 5 ||
          matchSymbol === 6 ||
          matchSymbol === 9) &&
        Math.random() < 0.1
      ) {
        unlockPromocode(
          `🎁 BONUS PRIZE! Double ${symbols[matchSymbol].name} + PROMOCODE!`,
          15000
        );
      }
      return;
    }

    // No win
    setLastWin(0);
    const loseMessages = [
      '🎮 Try again, cyber warrior!',
      '⚡ The neon gods smile elsewhere...',
      '🌆 Not this time, but keep trying!',
      '💫 The synthwave flows different today...',
      '🎯 Recalibrating luck algorithms...',
    ];
    if (credits < COST_PER_SPIN)
      setMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
  };

  const spin = useCallback(() => {
    if (isSpinning || credits < COST_PER_SPIN) return;

    setIsSpinning(true);
    updateCredits((prev) => prev - COST_PER_SPIN);
    setMessage('🎲 Spinning the neon reels...');
    setLastWin(0);

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
  }, [isSpinning, credits]);

  // Initialize credits and check for existing data
  useEffect(() => {
    const now = new Date();
    const lastRefill = localStorage.getItem('slotMachine_lastRefill');
    const savedCredits = localStorage.getItem('slotMachine_credits');
    const savedHasPromocode = localStorage.getItem('slotMachine_hasPromocode');

    // Check if 24 hours have passed
    if (lastRefill) {
      const refillTime = new Date(lastRefill);
      const hoursElapsed =
        (now.getTime() - refillTime.getTime()) / (1000 * 60 * 60);

      if (hoursElapsed >= 24) {
        // Refill credits
        setCredits(15);
        localStorage.setItem('slotMachine_credits', '15');
        localStorage.setItem('slotMachine_lastRefill', now.toISOString());
        setMessage('🎁 Daily credits refilled! Welcome back, cyber warrior!');
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
      localStorage.setItem('slotMachine_credits', '15');
      localStorage.setItem('slotMachine_lastRefill', now.toISOString());
      setMessage('🚀 Welcome to NEON SLOTS! 15 free credits to start!');
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
    const lastRefill = localStorage.getItem('slotMachine_lastRefill');
    if (!lastRefill) return;

    const refillTime = new Date(lastRefill);
    const nextRefillTime = new Date(refillTime.getTime() + 24 * 60 * 60 * 1000);

    // If the refill time has already passed, don't show a countdown
    if (Date.now() >= nextRefillTime.getTime()) {
      if (nextRefill) setNextRefill('');
      return;
    }

    setNextRefill(nextRefillTime.toLocaleString());
    setMessage(`⏰ Credits refill in: ${nextRefillTime.toLocaleString()}`);
  }, [credits, hydrated, isSpinning]);

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
    <div className="relative bg-gradient-to-br from-purple-900/40 via-black/90 to-cyan-900/30 rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-pink-500/30 shadow-2xl backdrop-blur-sm max-w-lg mx-auto">
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

      {/* Credits and Status Display */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-black/60 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-cyan-400/50 backdrop-blur-sm min-w-[100px] sm:min-w-[120px]">
          <div className="text-xs text-cyan-400 font-mono text-center">
            CREDITS
          </div>
          <div
            className={`text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono text-center transition-transform duration-300 ${
              lastWin > 0 ? 'scale-110' : 'scale-100'
            }`}
          >
            {credits}
          </div>
          {credits === 0 && (
            <div className="text-xs text-yellow-400/80 font-mono text-center mt-1">
              Refills daily
            </div>
          )}
        </div>

        {lastWin > 0 && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-yellow-400/50 backdrop-blur-sm animate-bounce">
            <div className="text-xs text-yellow-400 font-mono text-center">
              LAST WIN
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 font-mono text-center">
              +{lastWin}
            </div>
          </div>
        )}
      </div>

      {/* Promocode Display */}
      {showPromocode && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border-2 border-pink-400/50 backdrop-blur-sm transform scale-100 opacity-100 transition-all duration-500">
          <div className="text-center">
            <div className="text-sm text-pink-400 font-mono mb-2">
              🎁 PROMOCODE UNLOCKED!
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono bg-black/50 px-3 sm:px-4 py-2 rounded-lg inline-block break-all">
              {PROMOCODE}
            </div>
            <div className="text-xs text-white/60 font-mono mt-2">
              Save this code for exclusive discount!
            </div>
          </div>
        </div>
      )}

      {hasPromocode && !showPromocode && (
        <div
          className="mb-4 sm:mb-6 p-3 bg-green-500/20 rounded-xl border border-green-400/50 backdrop-blur-sm cursor-pointer hover:bg-green-500/30 transition-colors duration-200"
          onClick={() => setShowPromocode(true)}
        >
          <div className="text-center">
            <div className="text-sm text-green-400 font-mono">
              ✅ PROMOCODE EARNED
            </div>
            <div className="text-xs text-white/60 font-mono">
              Click to view your code
            </div>
          </div>
        </div>
      )}

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
                  <div
                    className={`transition-all duration-200 ${
                      isSpinning
                        ? 'animate-spin scale-75 opacity-70'
                        : lastWin > 0
                          ? 'animate-pulse scale-110'
                          : 'scale-100'
                    }`}
                    style={{
                      animationDelay: isSpinning ? `${reelIndex * 0.1}s` : '0s',
                    }}
                  >
                    <Symbol
                      size={24}
                      className={`${symbols[symbolIndex].color} drop-shadow-[0_0_8px_currentColor] z-10`}
                    />
                  </div>

                  {/* Spinning effect overlay */}
                  {isSpinning && (
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent h-4 animate-pulse opacity-80"
                      style={{
                        animationDelay: `${reelIndex * 0.05}s`,
                        animationDuration: '0.3s',
                      }}
                    />
                  )}

                  {/* Win glow effect */}
                  {lastWin > 0 && (
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-xl animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Spin Button */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <button
          onClick={spin}
          disabled={isSpinning || credits < COST_PER_SPIN}
          className={`bg-gradient-to-br from-red-500 via-red-600 to-red-800 hover:from-red-400 hover:via-red-500 hover:to-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-full border-4 border-red-300/50 shadow-2xl relative overflow-hidden backdrop-blur-sm transition-all duration-200 ${
            isSpinning ? 'animate-pulse' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <div className="flex items-center gap-2 lg:gap-3 relative z-10">
            {isSpinning ? (
              <Sparkles size={18} className="text-yellow-300 animate-spin" />
            ) : (
              <Gamepad2 size={18} />
            )}
            <span className="font-mono text-sm lg:text-base">
              {isSpinning ? 'SPINNING' : `PULL (${COST_PER_SPIN})`}
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
        </button>
      </div>

      {/* Fixed Message Display */}
      <div className="text-center mb-4 sm:mb-6 min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
        <div
          className="text-sm lg:text-base text-white/90 font-mono text-center bg-black/30 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white/10 backdrop-blur-sm w-full max-w-xs sm:max-w-sm lg:max-w-md break-words transition-all duration-300 text-pretty"
          key={message}
        >
          {message}
        </div>
      </div>

      {/* Game Info */}
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="text-xs lg:text-sm text-white/50 font-mono">
          Cost: {COST_PER_SPIN} credits per spin • Daily refill: 15 credits
        </div>
        {credits === 0 && nextRefill && (
          <div className="text-xs text-yellow-400/80 font-mono bg-black/40 px-2 sm:px-3 py-1 sm:py-2 rounded-lg break-words">
            ⏰ Next refill: {nextRefill}
          </div>
        )}
        {credits > 0 && (
          <div className="text-xs text-green-400/70 font-mono">
            🎯 Keep playing for a chance to win exclusive promocodes!
          </div>
        )}
      </div>

      {/* Win celebration particles */}
      <WinParticles show={lastWin > 0} />

      {/* Floating decorative elements */}
      <div
        className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-sm opacity-60"
        style={{
          animation: 'float 4s ease-in-out infinite',
        }}
      />

      <div
        className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-sm opacity-50"
        style={{
          animation: 'float 3.5s ease-in-out infinite reverse',
        }}
      />

      <div
        className="absolute top-1/4 -right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-40"
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
