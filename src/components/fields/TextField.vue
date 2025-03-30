<script setup lang="ts">
import { computed } from 'vue'

const { area, type = 'text', rows = 5 } = defineProps<{
  id: string
  label?: string
  outline?: boolean
  flat?: boolean
  type?: 'text' | 'password'
  area?: boolean
  rows?: number
}>()

const model = defineModel<string>({ required: true })
const componentProps = computed(() => {
  return area
    ? {
      rows,
    }
    : {
      type,
    }
})
</script>

<template>
  <div class="field-wrapper">
    <label :for="id" class="field__label">
      {{ label }}
    </label>
    <component
      :is="area ? 'textarea' : 'input'"
      :value="model"
      v-bind="{ ...componentProps, ...$attrs }"
      :id
      :class="
        [
          {
            'field text-field--outline': outline,
            'field text-field--flat': flat,
          },
        ]
      "
      @update:value="model = $event.target.value"
    />
  </div>
</template>

<style>
.field__label {
  display: block;
}

.text-field--flat {
  background: transparent;
  border-width: 0;
}

.text-field--outline {
  background: transparent;
}
</style>
