<script setup lang="ts" generic="CharType extends BaseChar">
import {
  type BaseChar,
  isInkedChar,
  isNewlineChar,
} from '@/types/characterTypes.ts'
import { computed } from 'vue'
import {
  type SelectionID,
  useSelectionObserver,
} from '@/composables/useSelection.ts'

const { modelValue: char, selectionId } = defineProps<{
  modelValue: CharType
  selectionId?: SelectionID
}>()

const {
  isSelected,
  isHighlighted,
  selectedIndex1,
  selectedIndex2,
  onSelect,
  onHover,
} = useSelectionObserver(selectionId, char.index)
if (selectionId !== undefined) {
}

const isInked = isInkedChar(char)

const classes = computed(() => ({
  'char--selectable': isInked,
  'char--selected': isSelected?.value,
  'char--highlighted': isHighlighted?.value,
}))

const isNewline = isNewlineChar(char)

const wrapperClasses = computed(() => ({
  'char-wrapper--newline': isNewline,
}))
</script>

<template>
  <span
    class="char-wrapper"
    :class="wrapperClasses"
    @mouseover="onHover && onHover(char.index)"
    @click="onSelect && onSelect(char.index)"
  >
    <span
      v-if="!isNewline"
      class="char"
      :class="classes"
    >
      {{ char.text }}
    </span>
  </span>
</template>

<style>
.char {
  --text-size: 1.5rem;
  --text-size-modifier: 1.5;
  display: inline-block;
  font-size: var(--text-size);
  text-align: center;
  vertical-align: middle;
  line-height: calc(var(--text-size) * 1.5);
  width: calc(var(--text-size) * var(--text-size-modifier));
  height: auto;
  cursor: pointer;

  background-color: var(--bg);
  color: var(--fg);

  &.char--selectable {
    &:hover {
      background-color: var(--bg-hc);
      font-size: calc(var(--text-size) * 1.2);
    }
  }

  &.char--highlighted {
    background-color: #ffffff99;
    color: #333;
    font-weight: 600;

    &.char--selectable:hover {
      background-color: #ffffffbb;
    }
  }

  &.char--selected {
    background-color: #ffffffbb;
    font-size: calc(var(--text-size) * 1.2);

    &:hover {
      background-color: #ffffffdd;
    }
  }
}

.char-wrapper {
  display: inline-block;
  position: relative;
  height: max-content;

  &.char-wrapper--newline {
    flex-basis: 100%;
    height: 0;
  }
}
</style>
