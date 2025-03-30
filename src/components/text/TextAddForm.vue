<script setup lang="ts">
import TextField from '@/components/fields/TextField.vue'
import { computed, ref } from 'vue'

const emit = defineEmits<{
  save: [title: string, content: string]
}>()

const { title: _title, content: _content } = defineProps<
  { title: string; content: string }
>()
const title = ref(_title)
const content = ref(_content)

const hasChanges = computed(() =>
  title.value !== _title || content.value !== _content
)
const isValid = computed(() => !title.value && !content.value)

function onSave() {
  emit('save', title.value, content.value)
}
</script>

<template>
  <div class="text-add-form">
    <TextField id="title" v-model="title" label="Title" />
    <TextField
      id="content"
      v-model="content"
      label="Content"
      style="max-width: 100%; width: 100%"
      :rows="20"
      area
    />
    <button :disabled="!hasChanges || !isValid" @click="onSave">
      Save
    </button>
  </div>
</template>

<style>
.text-add-form {
  display: grid;
  grid-template-columns: max-content minmax(max-content, 1fr);
  grid-template-rows: max-content 1fr max-content;
  gap: var(--size-4);

  > * {
    grid-column: span 2;
  }

  > button {
    justify-self: end;
  }
}
</style>