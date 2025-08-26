// src/constants/SLOT_MACHINE_MESSAGES.constant.ts
export const LOSE_MESSAGE_KEYS = [
  'slot.loseMessages.0',
  'slot.loseMessages.1',
  'slot.loseMessages.2',
  'slot.loseMessages.3',
  'slot.loseMessages.4',
  'slot.loseMessages.5',
] as const;

export type LoseMessageKey = (typeof LOSE_MESSAGE_KEYS)[number];
