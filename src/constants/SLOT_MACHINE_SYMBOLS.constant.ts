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

// Retrowave-themed symbols with adjusted values for better balance
export const SYMBOLS = [
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
] as const;

export const SYMBOL_KEYS = [
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
