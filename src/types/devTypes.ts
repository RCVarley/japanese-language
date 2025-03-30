import type { IsIndexed } from '@/types/utility.ts'
import type { BaseChar, Kanji } from '@/types/characterTypes.ts'

export type BaseTextItem = BaseChar | Word | GrammarPoint
export type TextItem = BaseTextItem | Kanji

export interface ViewerItem extends IsIndexed {
  text: string
  _isChar?: true
  _isWord?: true
  _isGrammar?: true
}

export interface Word extends ViewerItem {
  id: number
  text: string
  children: Array<BaseChar>
  _isWord: true
}

export interface GrammarPoint extends ViewerItem {
  id: number
  template: string
  children: Array<TextItem>
  _isGrammar: true
}

export function isWord(item: BaseChar | Word | GrammarPoint): item is Word {
  return !!item._isWord
}

export function isGrammar(item: BaseTextItem): item is GrammarPoint {
  return !!item._isGrammar
}
