<script setup lang="ts">
import { type GrammarPoint, isGrammar, isWord } from '@/types/devTypes.ts'
import GrammarPointComponent from '@/components/text/GrammarPoint.vue'
import Word from '@/components/text/Word.vue'
import Character from '@/components/text/Character.vue'
import { isChar } from '@/types/characterTypes.ts'
import type { SelectionID } from '@/composables/useSelection.ts'

const { modelValue: grammar } = defineProps<{
  modelValue: GrammarPoint
  selectionId?: SelectionID
}>()

function getChildComponent(child: GrammarPoint['children'][number]) {
  switch (true) {
    case isGrammar(child):
      return GrammarPointComponent

    case isWord(child):
      return Word

    case isChar(child):
      return Character
  }
}
</script>

<template>
  <div class="grammar-point">
    <Component
      v-for="child in grammar.children"
      :key="child.index"
      :is="getChildComponent(child)"
      :modelValue="child"
      :selectionId
    />
  </div>
</template>

<style scoped>
.grammar-point {
  display: contents;
  padding-bottom: var(--size-1);
  border-bottom: 2px solid var(--c-grammar);
}
</style>
