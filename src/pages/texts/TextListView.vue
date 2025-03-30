<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type Text } from '@/api/texts.ts'
import router from '@/router'
import { useTextsStore } from '@/stores/textsStore.ts'

const texts = ref<Text[]>()

const textLines = computed(() =>
  new Map(
    texts.value?.map((text) => {
      const lines = text.content.split('\n')
      return [text.id, lines.slice(0, Math.min(lines.length, 4))]
    }),
  )
)

const { getTexts } = useTextsStore()
onMounted(async () => {
  texts.value = await getTexts()
})
</script>

<template>
  <div class="text-list">
    <div v-if="texts" v-for="text in texts" class="card">
      <h2 class="mt-0">{{ text.title }}</h2>
      <p>
        <template v-for="line in textLines.get(text.id)">
          {{ line }}<br>
        </template>
        ...
      </p>
      <button
        @click="router.push({ name: 'texts-id', params: { id: text.id } })"
      >
        Open
      </button>
    </div>
  </div>
</template>

<style>
.text-list {
  display: grid;
  text-align: center;
  height: 100%;
  place-items: center;
}

.card {
  display: grid;
  grid-template-columns: max-content max-content;

  > * {
    grid-column: span 2;
  }

  > button {}

  border: 1px solid white;
}
</style>
