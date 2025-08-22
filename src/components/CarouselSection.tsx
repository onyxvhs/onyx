'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Simple product type for clarity
type Product = {
  name: string;
  image: string;
  description: string;
  active?: boolean;
};

export default function CarouselSection() {
  // Source of truth: the whole catalog
  const products: Product[] = useMemo(
    () => [
      {
        name: 'Супернова',
        image: '/supernova-product-cyberpunk.png',
        description: 'Космічний вибух смаків з нотами екзотичних фруктів',
      },
      {
        name: 'Банан',
        image: '/banana-product-neon.png',
        description: 'Тропічна солодкість з ніжними банановими нотами',
      },
      {
        name: 'Pinkman',
        image: '/placeholder-rd3it.png',
        description: 'Легендарний мікс ягід з неперевершеним смаком',
        active: true,
      },
      {
        name: 'Персик',
        image: '/peach-orange-product.png',
        description: 'Соковитий персик з літніми відтінками',
      },
      {
        name: 'Ківі',
        image: '/green-kiwi-product.png',
        description: 'Освіжаючий ківі з кислинкою',
      },
      {
        name: 'Вишня',
        image: '/cherry-product-red.png',
        description: 'Насичена вишня з глибоким смаком',
      },
      {
        name: 'Лимон',
        image: '/lemon-product-yellow.png',
        description: 'Цитрусова свіжість з лимонною кислинкою',
      },
      {
        name: "М'ята",
        image: '/mint-product-mint-green.png',
        description: "Прохолодна м'ята для освіження",
      },
      {
        name: 'Кокос',
        image: '/coconut-products-white.png',
        description: 'Тропічний кокос з молочними нотами',
      },
      {
        name: 'Манго',
        image: '/placeholder-lpeff.png',
        description: 'Екзотичне манго з тропічним ароматом',
      },
      {
        name: 'Арбуз',
        image: '/watermelon-product.png',
        description: 'Літній арбуз з освіжаючим смаком',
      },
      {
        name: 'Виноград',
        image: '/purple-grape-product.png',
        description: 'Благородний виноград з винними нотами',
      },
    ],
    []
  );

  const itemsPerPage = 5;
  const carouselRef = useRef<HTMLDivElement>(null);

  // Initialize active item by `active: true` or fallback to 0
  const initialActive = useMemo(() => {
    const i = products.findIndex((p) => p.active);
    return i >= 0 ? i : 0;
  }, [products]);

  const [activeIndex, setActiveIndex] = useState<number>(initialActive);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const maxStart = Math.max(products.length - itemsPerPage, 0);

  // Ensure the active item is visible within the window of thumbnails
  const ensureVisible = useCallback(
    (index: number) => {
      setStartIndex((prev) => {
        if (index < prev) return index;
        if (index >= prev + itemsPerPage)
          return Math.min(index - itemsPerPage + 1, maxStart);
        return prev; // already visible
      });
    },
    [itemsPerPage, maxStart]
  );

  // Keep window centered around initial active on mount
  useEffect(() => {
    ensureVisible(initialActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation that advances the selection (not just the window)
  const prevItem = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      ensureVisible(next);
      return next;
    });
  }, [ensureVisible]);

  const nextItem = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.min(prev + 1, products.length - 1);
      ensureVisible(next);
      return next;
    });
  }, [products.length, ensureVisible]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextItem();
    } else if (isRightSwipe) {
      prevItem();
    }
  };

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevItem();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextItem();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
        ensureVisible(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        const lastIndex = products.length - 1;
        setActiveIndex(lastIndex);
        ensureVisible(lastIndex);
      }
    },
    [prevItem, nextItem, products.length, ensureVisible]
  );

  // Image error handling
  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  // Visible thumbnails for the current window
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const selected = products[activeIndex];
  const title = selected.name.toUpperCase();
  const details = `Смак: ${selected.description.toLowerCase()}. Ідеально підходить для тих, хто цінує якість та автентичність.`;

  return (
    <section
      id="product"
      className="py-20 px-4 relative bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50 fade-edge fade-edge-bottom fade-edge-top fade-edge-sm fade-edge-cyberpunk"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div
          ref={carouselRef}
          className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="tablist"
          aria-label="Вибір продукту ONYX"
        >
          <button
            onClick={prevItem}
            disabled={activeIndex === 0}
            aria-label="Попередній продукт"
            className="hidden md:flex absolute left-0 z-10 w-14 h-14 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full neon-border hover:neon-glow transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:neon-border group"
          >
            <ChevronLeft
              className="w-7 h-7 text-white group-hover:text-pink-400 transition-colors"
              aria-hidden="true"
            />
          </button>

          <div className="flex justify-center gap-6 overflow-x-auto md:overflow-hidden pb-4 px-4 max-w-3xl snap-x">
            {visibleProducts.map((product, idx) => {
              const actualIndex = startIndex + idx;
              const isActive = actualIndex === activeIndex;
              const hasError = imageErrors.has(actualIndex);

              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    setActiveIndex(actualIndex);
                    ensureVisible(actualIndex);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(actualIndex);
                      ensureVisible(actualIndex);
                    }
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={`product-details`}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 py-10 snap-center rounded-lg ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-32 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                      isActive ? 'neon-border-pink' : 'neon-border'
                    }`}
                  >
                    {hasError ? (
                      <div className="w-32 h-24 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    ) : (
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={`${product.name} - тютюн для кальяну`}
                        width={128}
                        height={96}
                        className="w-32 h-24 object-cover"
                        priority={isActive}
                        onError={() => handleImageError(actualIndex)}
                      />
                    )}
                  </div>
                  <p
                    className={`text-center text-sm mt-3 transition-colors duration-300 font-mono ${
                      isActive ? 'text-pink-400 font-bold' : 'text-white/70'
                    }`}
                  >
                    {product.name}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={nextItem}
            disabled={activeIndex === products.length - 1}
            aria-label="Наступний продукт"
            className="hidden md:flex absolute right-0 z-10 w-14 h-14 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full neon-border hover:neon-glow transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:neon-border group"
          >
            <ChevronRight
              className="w-7 h-7 text-white group-hover:text-pink-400 transition-colors"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden text-center mt-4">
          <p className="text-white/50 text-sm font-mono">
            ← Проведіть для перегляду →
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {imageErrors.has(activeIndex) ? (
                  <div className="w-full max-w-md mx-auto h-64 bg-gray-800 rounded-xl neon-glow flex items-center justify-center">
                    <span className="text-gray-400">Зображення недоступне</span>
                  </div>
                ) : (
                  <Image
                    src={selected.image || '/placeholder.svg'}
                    alt={`${selected.name} - тютюн для кальяну ONYX`}
                    width={640}
                    height={640}
                    className="w-full max-w-md mx-auto rounded-xl neon-glow h-auto"
                    priority
                    onError={() => handleImageError(activeIndex)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
            id="product-details"
            role="tabpanel"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2
                  className="text-5xl font-mono font-bold text-white mb-4 glitch"
                  data-text={title}
                >
                  {title}
                </h2>

                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  {selected.description}
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  {details}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
