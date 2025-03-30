<script setup lang="ts">
import type { Size, Tag } from '@/types/sizes.ts'
import Button from '@/components/elements/Button.vue'

interface Action {
  name: string
  text: string
  onClick: () => void
}

const { title, titleTag = 'div' } = defineProps<{
  title?: string
  titleTag?: Tag
  titleSize?: Size
  headerActions?: Action[]
  actions?: Action[]
}>()
</script>

<template>
  <div class="card">
    <div
      v-if="$slots['actions'] || title || headerActions"
      class="card__header"
    >
      <Component :is="titleTag" class="card__title">
        {{ title }}
      </Component>
      <div class="card__actions">
        <slot name="header-actions">
          <Button
            v-for="action in headerActions"
            :key="action.name"
            v-bind="action"
          />
        </slot>
      </div>
    </div>
    <div class="card__content">
      <slot name="default" />
    </div>
    <div v-if="actions || $slots['actions']" class="card__footer">
      <slot name="footer-actions">
        <Button
          v-for="action in actions"
          :key="action.name"
          v-bind="action"
        />
      </slot>
    </div>
  </div>
</template>

<style>
.card {
  .card__header,
  .card__footer {
    overflow: hidden;
  }

  .card__title {
    margin: 0;
  }
}
</style>