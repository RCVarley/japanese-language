import { ref } from 'vue'
import type { GrammarPoint, TextItem, Word } from '@/types/devTypes.ts'
import type { BaseChar } from '@/types/characterTypes.ts'

interface UseAnnotationParams {
  grammarPoints?: GrammarPoint[]
  words?: Word[]
}

/**
 * A composable function that allows you to
 * @param params.grammarPoints
 * @param params.words
 */
export function useAnnotation(params: UseAnnotationParams) {
  const words = ref(params.words ?? [])
  const activeWord = ref<Word>()

  /**
   * Turn a group of characters into a word object
   * @param characters
   */
  function markWord(characters: BaseChar[]) {
    const id = words.value.length + 1

    const word: Word = {
      index: characters[0].index,
      id,
      text: `${characters.map((char) => char.text).join('')}`,
      children: [...characters],
      _isWord: true,
    }

    words.value.push(word)
    activeWord.value = word
  }

  /**
   * A list of GrammarPoints
   */
  const grammarPoints = ref(params.grammarPoints ?? [])

  /**
   * Either the most recently added grammar point or the
   */
  const activeGrammarPoint = ref<GrammarPoint>()

  /**
   * Turn a group of characters and words into a grammar point object
   * @param items
   */
  function markGrammar(items: TextItem[]) {
    const id = grammarPoints.value.length + 1

    const grammarPoint: GrammarPoint = {
      index: items[0].index,
      id,
      template: '',
      children: items,
      text: items.map((child) => child.text).join(''),
      _isGrammar: true,
    }

    grammarPoints.value.push(grammarPoint)
    activeGrammarPoint.value = grammarPoint
  }

  return {
    markWord,
    activeWord,
    markGrammar,
    activeGrammarPoint,
  }
}