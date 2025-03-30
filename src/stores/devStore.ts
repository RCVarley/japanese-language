import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GrammarPoint, Kanji, Word } from '@/types/devTypes.ts'

export const useDevStore = defineStore('dev', () => {
  const words = ref<Word[]>([])
  const grammarPoints = ref<GrammarPoint[]>([])
  const kanji = ref<Kanji[]>([])

  return {
    words,
    grammarPoints,
    kanji,
  }
})
