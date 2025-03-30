<script setup lang="ts">
import { useJapanese } from '@/composables/useJapanese.ts'
import { ref, watch } from 'vue'
import type { Text } from '@/api/texts.ts'
import Character from '@/components/text/Character.vue'
import Card from '@/components/layout/Card.vue'
import Button from '@/components/elements/Button.vue'
import { useDevStore } from '@/stores/devStore.ts'
import type { GrammarPoint, Word } from '@/types/devTypes.ts'
import { storeToRefs } from 'pinia'
import { useSelection } from '@/composables/useSelection.ts'
import {
  type BaseChar,
  CHAR_TYPE,
  type InkedChar,
  type InkedCharType,
  type WhitespaceChar,
} from '@/types/characterTypes.ts'
import type { Selectable } from '@/types/utility.ts'

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
      text: char,
      _isChar: true,
      type: char === '\n' ? 'newline' : 'space',
    }

    return whitespace
  }

  let charType: InkedCharType
  switch (true) {
    case isNumeric(char):
      charType = CHAR_TYPE.NUMBER
      break

    case isPunctuation(char):
      charType = CHAR_TYPE.PUNCTUATION
      break

    case isHiragana(char):
      charType = CHAR_TYPE.HIRAGANA
      break

    case isKatakana(char):
      charType = CHAR_TYPE.KATAKANA
      break

    case isKanji(char):
      charType = CHAR_TYPE.KANJI
      break

    case !isJapanese(char):
    default:
      charType = CHAR_TYPE.ROMAJI
      break
  }

  const result: Selectable<InkedChar> = {
    index,
    text: char,
    isSelected: false,
    type: charType,
    _isChar: true,
  }

  return result
}

const characters = ref<Array<WhitespaceChar | Selectable<BaseChar>>>([])
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
const {
  selection,
  onHover,
  clearSelection,
  hasSelection,
  lowerIndex,
} = useSelection(text.id, characters)
// #endregion

// #region Annotation
const devStore = useDevStore()
const { words, grammarPoints } = storeToRefs(devStore)

const activeWord = ref<Word>()

function onMarkWord() {
  const id = words.value.length + 1
  if (lowerIndex.value === null) {
    throw new Error('No lower index!')
  }

  const word: Word = {
    index: lowerIndex.value,
    id,
    text: `${selection.value.map((char) => char.text).join('')}`,
    children: [...selection.value],
    _isWord: true,
  }

  words.value.push(word)

  clearSelection()
  activeWord.value = word
}

const activeGrammarPoint = ref<GrammarPoint>()

function onMarkGrammar() {
  const id = grammarPoints.value.length + 1
  if (lowerIndex.value === null) {
    throw new Error('No lower index!')
  }

  const grammarPoint: GrammarPoint = {
    index: lowerIndex.value,
    id,
    template: `${selection.value.map((char) => char.text)}`,
    children: [...selection.value],
    text: selection.value.map((child) => child.text).join(''),
    _isGrammar: true,
  }

  grammarPoints.value.push(grammarPoint)

  clearSelection()
  activeGrammarPoint.value = grammarPoint
}

function onMarkSentence() {}
// #endregion
</script>

<template>
  <div class="text-viewer">
    <Card title="Words" title-tag="h3" class="words">
      <ul>
        <li v-for="word in words" :key="word.id">{{ word.text }}</li>
      </ul>
    </Card>

    <Card title="Grammar Points" title-tag="h3" class="grammar">
      <ul>
        <li v-for="grammarPoint in grammarPoints" :key="grammarPoint.id">
          {{ grammarPoint.text }}
        </li>
      </ul>
    </Card>

    <div class="text-body" @mouseleave="onHover()">
      <div
        class="toolbar p sticky rounded mb-2 foreground"
        @mouseenter="onHover()"
      >
        <Button
          name="mark-word"
          text="Mark word"
          color="word"
          outline
          :disabled="!hasSelection"
          @click="onMarkWord"
        />
        <Button
          name="mark-grammar"
          text="Mark grammar"
          color="grammar"
          outline
          :disabled="!hasSelection"
          @click="onMarkGrammar"
        />
        <Button
          name="mark-sentence"
          text="Mark sentence"
          color="sentence"
          outline
          :disabled="selection.length < 3"
          @click="onMarkSentence"
        />
      </div>
      <Character
        v-for="char in characters"
        :key="char.index"
        :modelValue="char"
        :selection-id="text.id"
      />
    </div>
  </div>
</template>

<style>
.text-viewer {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'word-section text'
    'grammar-section text'
    'none text';
  gap: var(--size-4);

  & > .words {
    grid-area: word-section;
  }

  & > .grammar {
    grid-area: grammar-section;
  }

  .words,
  .grammar {
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
