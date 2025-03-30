<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Text } from '@/api/texts.ts'
import { useTextsStore } from '@/stores/textsStore.ts'
import TextAddForm from '@/components/text/TextAddForm.vue'
import TextViewer from '@/components/text/TextViewerV2.vue'

const { id } = defineProps<{ id?: string }>()

const rawMode = ref(!id)

// #region Text
const { getTexts, saveText } = useTextsStore()
const text = ref<Text>()

function onSave(title?: string, content?: string) {
  if (text.value) {
    if (title && content) {
      text.value.title = title
      text.value.content = content
    }

    saveText(text.value)
    rawMode.value = false
    return
  }

  if (!title) {
    throw new Error('No "title" provided')
  }

  if (!content) {
    throw new Error('No "content" provided')
  }

  saveText(title, content)
  rawMode.value = false
}
// #endregion

onMounted(async () => {
  if (id) {
    console.count('fetching data')
    text.value = await getTexts(id)
  }
})
</script>

<template>
  <div v-if="text" class="text-view">
    <div class="toolbar">
      <h2 class="mt-0">{{ text.title }}</h2>
      <button class="ml-auto" @click="rawMode = !rawMode">
        {{ rawMode ? 'raw' : 'standard' }}
      </button>
    </div>
    <TextAddForm
      v-if="rawMode"
      :title="text.title"
      :content="text.content"
      @save="onSave($event)"
    />
    <TextViewer v-else :text />
  </div>
</template>

<style scoped>
.text-view {
  height: 100%;
  width: 100%;

  & > * + * {
    margin-top: var(--size-4);
  }
}
</style>
