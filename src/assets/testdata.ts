import type { GrammarPoint, Word } from '@/types/devTypes.ts'
import type { AlphaNumericChar, Kanji } from '@/types/characterTypes.ts'

export const examplePoint: GrammarPoint = {
  index: 0,
  id: 1,
  text: '夢のつづき',
  template: '',
  children: [
    {
      index: 0,
      text: '夢',
      type: 'kanji',
      _isChar: true,
    },
    {
      index: 1,
      text: 'の',
      type: 'hiragana',
      _isChar: true,
    },
    {
      index: 2,
      text: 'つ',
      type: 'hiragana',
      _isChar: true,
    },
    {
      index: 3,
      text: 'づ',
      type: 'hiragana',
      _isChar: true,
    },
    {
      index: 4,
      text: 'き',
      type: 'hiragana',
      _isChar: true,
    },
  ] as Array<AlphaNumericChar | GrammarPoint | Kanji | Word>,
  _isGrammar: true,
}
