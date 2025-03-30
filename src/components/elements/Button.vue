<script setup lang="ts">
import type { Size } from '@/types/sizes.ts'
import { computed } from 'vue'
import { type RouteLocationNamedRaw, type Router, useRouter } from 'vue-router'
import type { ColorEnum } from '@/types/colors.ts'

const { color, flat, outline, bordered, round, onClick: _onClick, to } =
  defineProps<{
    name: string
    text?: string
    size?: Size
    icon?: string
    iconOnly?: boolean
    color?: ColorEnum
    flat?: boolean
    outline?: boolean
    bordered?: boolean
    round?: boolean
    to?: RouteLocationNamedRaw
    onClick?: () => void
  }>()

let router: Router | undefined

if (to) {
  router = useRouter()
}

const classes = computed(() => {
  const result: Array<Record<string, boolean> | string> = [{
    'button--flat': flat,
    'button--outline': outline,
    'button--bordered': bordered,
    'button--round': round,
  }]

  if (color) {
    result.push(`c-${color}`)
  }

  return result
})

function onClick() {
  if (_onClick) {
    _onClick()
  }

  if (to && router) {
    router.push(to)
  }
}
</script>

<template>
  <button :name class="button" :class="classes" @click="onClick">
    <slot>
      <span class="button__icon">{{ icon }}</span>
      <span class="button__text">{{ text }}</span>
    </slot>
  </button>
</template>

<style>
.button {
  color: var(--fg);
  background-color: var(--bg);

  &[disabled] {
    /*color: var(--fg-lc);*/
    /*background-color: var(--bg-lc);*/
    opacity: 0.6;
    cursor: default;
  }

  &.button--flat {
    border-width: 0;
  }

  &.button--flat,
  &.button--outline {
    background-color: transparent;
    color: var(--bg);

    /*&[disabled] {*/
    /*  color: var(--bg-lc);*/
    /*}*/

    &:hover:not([disabled]) {
      background-color: var(--bg);
      color: var(--fg);
    }

    &:active:not([disabled]) {
      background-color: var(--bg-lc);
    }
  }

  &.button--outline {
    border: 2px solid var(--bg);

    /*&[disabled] {*/
    /*  border-color: var(--bg-lc);*/
    /*}*/
  }

  &.button--bordered {
    border: 2px solid var(--fg);

    /*&[disabled] {*/
    /*  border-color: var(--fg-lc);*/
    /*}*/
  }
}
</style>
