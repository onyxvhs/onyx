'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
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

  // Initialize active item by `active: true` or fallback to 0
  const initialActive = useMemo(() => {
    const i = products.findIndex((p) => p.active);
    return i >= 0 ? i : 0;
  }, [products]);

  const [activeIndex, setActiveIndex] = useState<number>(initialActive);
  const [startIndex, setStartIndex] = useState<number>(0);

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
  const prevItem = () => {
    setActiveIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      ensureVisible(next);
      return next;
    });
  };

  const nextItem = () => {
    setActiveIndex((prev) => {
      const next = Math.min(prev + 1, products.length - 1);
      ensureVisible(next);
      return next;
    });
  };

  // Visible thumbnails for the current window
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const selected = products[activeIndex];
  const title = selected.name.toUpperCase();
  const details = `Смак: ${selected.description.toLowerCase()}. Ідеально підходить для тих, хто цінує якість та автентичність.`;

  // Keyboard support
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevItem();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextItem();
    }
  };

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50">
      <div className="max-w-7xl mx-auto mb-16">
        <div
          className="relative flex items-center justify-center"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="Перемикання товарів"
        >
          <button
            onClick={prevItem}
            disabled={activeIndex === 0}
            aria-label="Попередній продукт"
            className="hidden md:flex absolute left-0 z-10 w-14 h-14 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full neon-border hover:neon-glow transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-7 h-7 text-white group-hover:text-pink-400 transition-colors" />
          </button>

          <div className="flex justify-center gap-6 overflow-x-auto md:overflow-hidden pb-4 px-4 max-w-3xl snap-x">
            {visibleProducts.map((product, idx) => {
              const actualIndex = startIndex + idx;
              const isActive = actualIndex === activeIndex;
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
                  role="button"
                  aria-pressed={isActive}
                  aria-current={isActive}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 pt-10 snap-center ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-32 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                      isActive
                        ? 'neon-border-pink neon-pulse'
                        : 'neon-border hover:neon-glow'
                    }`}
                  >
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={128}
                      height={96}
                      className="w-32 h-24 object-cover"
                      priority={isActive}
                    />
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
            className="hidden md:flex absolute right-0 z-10 w-14 h-14 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full neon-border hover:neon-glow transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-7 h-7 text-white group-hover:text-pink-400 transition-colors" />
          </button>
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
                <Image
                  src={selected.image || '/placeholder.svg'}
                  alt={selected.name}
                  width={640}
                  height={640}
                  className="w-full max-w-md mx-auto rounded-xl neon-glow h-auto"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
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
