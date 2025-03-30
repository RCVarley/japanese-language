<script setup lang="ts">
import { type GrammarPoint } from '@/types/devTypes.ts'
import GrammarPointComponent from '@/components/text/GrammarPoint.vue'
import { useSelection } from '@/composables/useSelection.ts'
import { computed } from 'vue'

const { modelValue: grammar } = defineProps<{
  modelValue: GrammarPoint
}>()

const children = computed(() => grammar.children)

const { onHover } = useSelection(grammar.id, children)
</script>

<template>
  <div class="grammar-annotator">
    <GrammarPointComponent
      :modelValue="grammar"
      :selection-id="grammar.id"
      @mouseleave="onHover()"
    />
  </div>
</template>

<style scoped>
</style>
