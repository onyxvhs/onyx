'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { PRODUCT_LIST } from '@/constants/PRODUCT_LIST.constant';
import { useTranslations } from 'use-intl';

export default function CarouselSection() {
  const tCar = useTranslations('CarouselSection');
  const products = PRODUCT_LIST;
  const initialActiveIndex = products.findIndex((p) => p.active) || 0;
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate drag constraints for mobile swipe
  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current && containerRef.current) {
        const carouselWidth = carouselRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const maxScroll = carouselWidth - containerWidth;
        setDragConstraints({
          left: -Math.max(maxScroll, 0),
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, products.length - 1)));
    },
    [products.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Handle swipe gestures on main image
  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold) {
        prevSlide();
      } else if (info.offset.x < -threshold) {
        nextSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(products.length - 1);
          break;
      }
    },
    [prevSlide, nextSlide, goToSlide, products.length]
  );

  // Auto-scroll thumbnail into view
  useEffect(() => {
    const activeThumb = carouselRef.current?.children[
      activeIndex
    ] as HTMLElement;
    const container = carouselRef.current;

    if (activeThumb && container) {
      const scrollLeft =
        activeThumb.offsetLeft -
        container.clientWidth / 2 +
        activeThumb.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const handleImageError = useCallback(
    (index: number, type: 'carousel' | 'large') => {
      console.warn(`Failed to load ${type} image for product ${index}`);
      setImageErrors((prev) => new Set(prev).add(index));
    },
    []
  );

  const currentProduct = products[activeIndex];

  return (
    <section
      id="product"
      className="py-12 md:py-20 px-4 relative bg-gradient-to-b from-purple-900/30 via-black/50 to-purple-800/20 fade-edge fade-edge-bottom fade-edge-top fade-edge-sm fade-edge-cyberpunk"
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile-First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Product Display - Mobile First, Desktop Left */}
          <div
            className="order-2 lg:order-1 w-full"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="img"
            aria-label={`${tCar(`${currentProduct.name}`)} - ${tCar('mainImage')}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="relative"
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 0.98 }}
              >
                <div className="relative aspect-square w-full max-w-md mx-auto">
                  {imageErrors.has(activeIndex) ? (
                    <div className="w-full h-full bg-gray-900/60 rounded-2xl border border-white/10 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                        </div>
                        <p className="text-sm">{tCar('noImage')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={currentProduct.largeImage}
                        alt={`${currentProduct.name} - ${tCar('blendMix')}`}
                        fill
                        className="object-contain rounded-2xl"
                        sizes="(min-width: 1024px) 50vw, 90vw"
                        priority
                        onError={() => handleImageError(activeIndex, 'large')}
                      />

                      {/* Neon glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-xl -z-10" />
                    </div>
                  )}
                </div>

                {/* Desktop Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={activeIndex === 0}
                  className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full border border-white/20 hover:border-pink-400/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group z-10"
                  aria-label={tCar('ariaPrev')}
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={activeIndex === products.length - 1}
                  className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-black/70 backdrop-blur-sm rounded-full border border-white/20 hover:border-pink-400/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group z-10"
                  aria-label={tCar('ariaNext')}
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-6 lg:hidden">
              <motion.button
                onClick={prevSlide}
                disabled={activeIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 hover:border-pink-400/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{tCar('prev')}</span>
              </motion.button>

              <motion.button
                onClick={nextSlide}
                disabled={activeIndex === products.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 hover:border-pink-400/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{tCar('next')}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Product Info & Thumbnails - Mobile First, Desktop Right */}
          <div className="order-1 lg:order-2 w-full space-y-6">
            {/* Product Details */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4 glitch"
                    data-text={tCar(`${currentProduct.name}`).toUpperCase()}
                  >
                    {tCar(`${currentProduct.name}`).toUpperCase()}
                  </h2>

                  <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                    {tCar(`${currentProduct.description}`)}
                  </p>

                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {tCar('taste')}:{' '}
                    {tCar(`${currentProduct.tasteDescription}`).toLowerCase()}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails Carousel */}
            <div className="space-y-4">
              <h3 className="text-white/70 text-sm font-mono uppercase tracking-wider">
                {tCar('chooseTaste')}
                {/*({activeIndex + 1} з {products.length})*/}
              </h3>

              <div ref={containerRef} className="relative overflow-hidden">
                <motion.div
                  ref={carouselRef}
                  className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide py-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {products.map((product, index) => {
                    const isActive = index === activeIndex;
                    const hasError = imageErrors.has(index);

                    return (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          isActive
                            ? 'border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.4)]'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`${tCar('choose')} ${tCar(`${product.name}`)}`}
                        aria-pressed={isActive}
                      >
                        {hasError ? (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <div className="w-6 h-6 text-gray-500">
                              <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={product.carouselImage}
                            alt={`${product.name} - Onyx`}
                            fill
                            className="object-cover"
                            sizes="80px"
                            onError={() => handleImageError(index, 'carousel')}
                          />
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute backdrop-blur-sm"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-pink-400'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`${tCar('moveToSlide')} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden text-center mt-8">
          <p className="text-white/40 text-xs font-mono">{tCar('swipeHint')}</p>
        </div>
      </div>
    </section>
  );
}
