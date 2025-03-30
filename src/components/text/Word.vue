<script setup lang="ts">
import type { SelectionID } from '@/composables/useSelection.ts'
import Character from '@/components/text/Character.vue'
import type { Word } from '@/types/devTypes.ts'

defineProps<{
  modelValue: Word
  selectionId?: SelectionID
}>()
</script>

<template>
  <div class="word">
    <Character
      v-for="char in modelValue.children"
      :key="char.index"
      :modelValue="char"
      :selection-id
    />
  </div>
</template>

<style scoped>
.word {
  display: contents;
  padding-bottom: var(--size-1);
  border-bottom: 2px solid var(--c-word);
}
</style>
