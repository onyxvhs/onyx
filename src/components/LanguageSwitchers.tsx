import { motion } from 'framer-motion';
import { Link as I18nLink } from '@/i18n/navigation';
import { useLocale } from 'use-intl';

export const LanguageSwitchers = ({ pathname }: { pathname: string }) => {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-2">
      {/* Ukrainian Language Switch */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <I18nLink
          href={pathname}
          locale="ua"
          className={`flex items-center justify-center gap-1 px-2 py-1 backdrop-blur-sm rounded-full transition-all duration-400 neon-border group ${
            locale === 'ua'
              ? 'bg-blue-500/40 border-blue-300/80 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
              : 'bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30'
          }`}
        >
          {/* Ukrainian Flag Colors */}
          <div className="w-4 h-4 rounded-full bg-blue-500 border border-yellow-400 flex items-center justify-center relative overflow-hidden">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>
          <span
            className={`font-mono text-xs transition-colors ${
              locale === 'ua'
                ? 'text-cyan-200'
                : 'text-white group-hover:text-cyan-300'
            }`}
          >
            UA
          </span>
          {/* Current locale indicator */}
          {locale === 'ua' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-bounce"
            />
          )}
        </I18nLink>
      </motion.div>

      {/* English Language Switch */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <I18nLink
          href={pathname}
          locale="en"
          className={`flex items-center gap-1 px-2 py-1 backdrop-blur-sm rounded-full transition-all duration-400 neon-border group ${
            locale === 'en'
              ? 'bg-red-500/40 border-red-300/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'bg-red-500/20 border-red-400/50 hover:bg-red-500/30'
          }`}
        >
          {/* US Flag Colors - Enhanced */}
          <div className="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center relative overflow-hidden">
            {/* Blue canton */}
            <div className="w-2 h-2 bg-blue-600 rounded-sm relative">
              <div className="absolute inset-0 bg-white opacity-30 rounded-sm"></div>
            </div>
          </div>
          <span
            className={`font-mono text-xs transition-colors ${
              locale === 'en'
                ? 'text-red-200'
                : 'text-white group-hover:text-red-300'
            }`}
          >
            EN
          </span>
          {/* Current locale indicator */}
          {locale === 'en' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-bounce"
            />
          )}
        </I18nLink>
      </motion.div>
    </div>
  );
};
