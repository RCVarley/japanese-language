import type { ObjectValues } from '@/types/utility.ts'
import type { BaseTextItem, ViewerItem } from '@/types/devTypes.ts'

export const CHAR_TYPE = {
  PUNCTUATION: 'punctuation',
  NUMBER: 'number',
  ROMAJI: 'romaji',
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  KANJI: 'kanji',
  NEWLINE: 'newline',
  SPACE: 'space',
} as const

export type CharTypeEnum = ObjectValues<typeof CHAR_TYPE>
export type WhitespaceCharType = Extract<CharTypeEnum, 'newline' | 'space'>
export type InkedCharType = Exclude<CharTypeEnum, 'newline' | 'space'>
export type AlphanumericCharType = Exclude<
  CharTypeEnum,
  'newline' | 'space' | 'punctuation'
>

export interface BaseChar extends ViewerItem {
  text: string
  type: CharTypeEnum
  _isChar?: true
}

export interface AlphaNumericChar extends BaseChar {
  type: AlphanumericCharType
}

export interface Kanji extends BaseChar {
  unicode: number
  text: string
  readings: {
    onYomi: string[]
    kunYomi: string[]
  }
  activeReading: string
}

export interface InkedChar extends BaseChar {
  type: InkedCharType
}

export interface WhitespaceChar extends BaseChar {
  type: WhitespaceCharType
}

export function isChar(item: BaseTextItem): item is BaseChar {
  return !!item._isChar
}

export function isNewlineChar(item: BaseTextItem) {
  return isChar(item) && item.type === CHAR_TYPE.NEWLINE
}

export function isSpaceChar(item: BaseTextItem): item is WhitespaceChar {
  return isChar(item) && item.type === CHAR_TYPE.SPACE
}

export function isWhitespaceChar(item: BaseTextItem): item is WhitespaceChar {
  return isChar(item) &&
    (item.type === CHAR_TYPE.SPACE || item.type === CHAR_TYPE.NEWLINE)
}

export function isKanji(item: BaseTextItem): item is Kanji {
  return isChar(item) && item.type === CHAR_TYPE.KANJI
}

export function isAlphaNumericChar(
  item: BaseTextItem,
): item is AlphaNumericChar {
  return isChar(item) && !isWhitespaceChar(item) &&
    item.type !== CHAR_TYPE.PUNCTUATION
}

export function isInkedChar(item: BaseTextItem): item is InkedChar {
  return isChar(item) && !isWhitespaceChar(item)
}
