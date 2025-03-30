import type { ObjectValues } from '@/types/utility.ts'

export const COLOR = {
  SENTENCE: 'sentence',
  WORD: 'word',
  GRAMMAR: 'grammar',
} as const

export type ColorEnum = ObjectValues<typeof COLOR>
