<script setup lang="ts">
import { useJapanese } from '@/composables/useJapanese.ts'
import { computed, ref, watch } from 'vue'
import type { Text } from '@/api/texts.ts'
import {
  type BaseChar,
  type AlphaNumericChar,
  type CharType,
  isChar,
  type WhitespaceChar,
} from '@/types/characterTypes.ts'
import Character from '@/components/text/Character.vue'
import Card from '@/components/layout/Card.vue'

const { text } = defineProps<{
  text: Text
}>()

const {
  isHiragana,
  isKatakana,
  isKanji,
  isJapanese,
  isPunctuation,
  isWhitespace,
  isNumeric,
} = useJapanese()

function stringToChar(char: string, index: number) {
  if (isWhitespace(char)) {
    const whitespace: WhitespaceChar = {
      index,
      value: char,
      type: char === '\n' ? 'newline' : 'space',
    }

    return whitespace
  }

  let charType: CharType
  switch (true) {
    case isNumeric(char):
      charType = 'number'
      break

    case isPunctuation(char):
      charType = 'punctuation'
      break

    case isHiragana(char):
      charType = 'hiragana'
      break

    case isKatakana(char):
      charType = 'katakana'
      break

    case isKanji(char):
      charType = 'kanji'
      break

    case !isJapanese(char):
    default:
      charType = 'romaji'
      break
  }

  const result: AlphaNumericChar = {
    index,
    value: char,
    selected: false,
    type: charType,
    containers: [],
    isStart: false,
    isEnd: false,
    isWord: false,
  }

  return result
}

const characters = ref<BaseChar[]>([])
watch(() => text, (_text) => {
  if (!_text?.content) {
    characters.value = []
    return
  }

  const { content } = _text
  for (let i = 0; i < content.length; i++) {
    const char = stringToChar(content[i], i)
    characters.value.push(char)
  }
}, { immediate: true })

// #region Selection
const hovering = ref<number | null>(null)
const selected1 = ref<number | null>(null)
const selected2 = ref<number | null>(null)
const hasSelection = computed(() =>
  selected1.value !== null && selected2.value !== null
)

const highlighted = computed(() => {
  const hasSelected1 = selected1.value !== null
  const hasSelected2 = selected2.value !== null
  const hasHovering = hovering.value !== null
  let _lower: number | null = null
  let _upper: number | null = null

  if (hasSelected1 && hasSelected2) {
    _lower = Math.min(selected1.value!, selected2.value!)
    _upper = Math.max(selected1.value!, selected2.value!)
    return [_lower, _upper]
  }

  if (hasSelected1 && hasHovering) {
    _lower = Math.min(selected1.value!, hovering.value!)
    _upper = Math.max(selected1.value!, hovering.value!)
    return [_lower, _upper]
  }

  if (hasSelected2 && hasHovering) {
    _lower = Math.min(selected2.value!, hovering.value!)
    _upper = Math.max(selected2.value!, hovering.value!)
    return [_lower, _upper]
  }

  return [_lower, _upper]
})

const lower = computed(() => highlighted.value[0])
const upper = computed(() => highlighted.value[1])

const selection = computed(() =>
  (hasSelection.value
    ? characters.value.slice(lower.value!, upper.value! + 1)
    : selected1.value !== null
    ? [characters.value[selected1.value]]
    : selected2.value !== null
    ? [characters.value[selected2.value]]
    : []) as AlphaNumericChar[]
)

function onSelect(char: BaseChar, index: number) {
  if (!isChar(char)) {
    return
  }

  if (selected1.value === index) {
    selected1.value = null
    return
  }

  if (selected2.value === index) {
    selected2.value = null
    return
  }

  if (selected1.value !== null && selected2.value !== null) {
    selected1.value = index
    selected2.value = null
    return
  }

  if (selected1.value !== null && selected2.value === null) {
    selected2.value = index
    return
  }

  if (selected1.value === null) {
    selected1.value = index
    return
  }
}
// #endregion

// #region Annotation
interface Word {
  id: number
  text: string
  characters: BaseChar[]
}

const words = ref(new Set<Word>())
const activeWord = ref<Word>()

function onMarkWord() {
  const id = words.value.size + 1
  const word: Word = {
    id,
    text: `${selection.value.map((char) => char.value)}`,
    characters: [...selection.value],
  }

  words.value.add(word)

  const len = selection.value.length
  selection.value.forEach((char, i) => {
    const isStart = i === 0
    const isEnd = i === len - 1
    char.isStart = char.isStart || isStart
    char.isEnd = char.isEnd || isEnd
    char.isWord = true
    return char.containers.push({
      id,
      type: 'word',
      isStart,
      isEnd,
    })
  })

  selected1.value = null
  selected2.value = null
  activeWord.value = word
}

function onMarkGrammar() {}

function onMarkSentence() {}

const annoSelection = ref<AlphaNumericChar | null>(null)
const annoDetails = ref<string | null>(null)
// #endregion
</script>

<template>
  <div class="text-viewer">
    <Card title="details" class="details">
      <div>
        <Character
          v-for="char in activeWord?.characters ?? []"
          :modelValue
          :selected="annoSelection?.index == char.index"
          :highlighted="false"
          @click="annoSelection = isChar(char) ? char : null"
        />
      </div>
      <textarea v-model="annoDetails" />
    </Card>
    <div class="text-body" @mouseleave="hovering = null">
      <div class="toolbar p sticky rounded mb-2">
        <button @click="onMarkWord">Mark word</button>
        <button @click="onMarkGrammar">Mark grammar</button>
        <button @click="onMarkSentence">Mark sentence</button>
      </div>
      <Character
        v-for="(char, charIndex) in characters"
        :key="char.index"
        :modelValue
        :selected="
          charIndex === selected1 ||
          charIndex === selected2 ||
          (
            hasSelection &&
            lower !== null &&
            upper !== null &&
            charIndex > lower &&
            charIndex < upper
          )
        "
        :highlighted="
          lower !== null &&
          charIndex >= lower &&
          upper !== null &&
          charIndex <= upper
        "
        @mouseover="hovering = charIndex"
        @click="onSelect(char, charIndex)"
      />
    </div>
  </div>
</template>

<style scoped>
.text-viewer {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'details text';
  column-gap: var(--size-4);

  .details {
    grid-area: details;
    align-content: start;
    align-self: start;
  }

  .toolbar {
    background-color: #49494d;
    flex-basis: 100%;
  }

  .text-body {
    grid-area: text;
    display: flex;
    flex-flow: row wrap;
  }
}
</style>