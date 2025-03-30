import { computed, type ComputedRef, onUnmounted, type Ref, ref } from 'vue'

export type SelectionID = string | number

const data = new Map<SelectionID, ReturnType<typeof useSelection<unknown>>>()

type UseSelectionObserverReturnType = ReturnType<typeof useSelection> & {
  isHighlighted: ComputedRef<boolean>
  isSelected: ComputedRef<boolean>
}

export function useSelectionObserver(
  id: SelectionID | undefined,
  index: number,
) {
  if (!id) {
    return {} as Partial<UseSelectionObserverReturnType>
  }

  const selectionData = data.get(id)
  if (!selectionData) {
    throw new Error(`no selection data for "${id}"`)
  }

  const isHighlighted = computed(() => {
    const _lower = selectionData.lowerIndex.value
    const _upper = selectionData.upperIndex.value

    if (_lower === null && _upper === null) {
      return false
    }

    if (_lower === index || _upper === index) {
      return true
    }

    return index >= _lower! && index <= _upper!
  })

  const isSelected = computed(() => {
    const _lower = selectionData.lowerIndex.value
    const _upper = selectionData.upperIndex.value
    const _one = selectionData.selectedIndex1.value
    const _two = selectionData.selectedIndex2.value

    if (_one !== null && _two !== null) {
      return index >= _lower! && index <= _upper!
    }

    return index === _one || index === _two
  })

  return {
    ...selectionData,
    isHighlighted,
    isSelected,
  } as UseSelectionObserverReturnType
}

export function useSelection<ItemType>(
  id: string | number,
  items: Ref<ItemType[]>,
) {
  const hoverIndex = ref<number | null>(null)
  const selectedIndex1 = ref<number | null>(null)
  const selectedIndex2 = ref<number | null>(null)

  const hasSelection = computed(() =>
    selectedIndex1.value !== null || selectedIndex2.value !== null
  )
  const hasSelectedRange = computed(() =>
    selectedIndex1.value !== null && selectedIndex2.value !== null
  )

  const highlighted = computed(() => {
    const hasSelected1 = selectedIndex1.value !== null
    const hasSelected2 = selectedIndex2.value !== null
    const hasHovering = hoverIndex.value !== null
    let _lower: number | null = null
    let _upper: number | null = null

    if (hasSelected1 && hasSelected2) {
      _lower = Math.min(selectedIndex1.value!, selectedIndex2.value!)
      _upper = Math.max(selectedIndex1.value!, selectedIndex2.value!)
      return [_lower, _upper]
    }

    if (hasHovering) {
      if (hasSelected1) {
        _lower = Math.min(selectedIndex1.value!, hoverIndex.value!)
        _upper = Math.max(selectedIndex1.value!, hoverIndex.value!)
        return [_lower, _upper]
      }

      if (hasSelected2) {
        _lower = Math.min(selectedIndex2.value!, hoverIndex.value!)
        _upper = Math.max(selectedIndex2.value!, hoverIndex.value!)
        return [_lower, _upper]
      }
    }

    if (hasSelected1) {
      _lower = selectedIndex1.value
      _upper = selectedIndex1.value
      return [_lower, _upper]
    }

    if (hasSelected2) {
      _lower = selectedIndex2.value
      _upper = selectedIndex2.value
      return [_lower, _upper]
    }

    return [_lower, _upper]
  })

  const lowerIndex = computed(() => highlighted.value[0])
  const upperIndex = computed(() => highlighted.value[1])

  function onHover(index?: number) {
    hoverIndex.value = index ?? null
  }

  function updateSelected(index: number) {
    if (selectedIndex1.value === index) {
      selectedIndex1.value = null
      return
    }

    if (selectedIndex2.value === index) {
      selectedIndex2.value = null
      return
    }

    if (selectedIndex1.value !== null && selectedIndex2.value !== null) {
      selectedIndex1.value = index
      selectedIndex2.value = null
      return
    }

    if (selectedIndex1.value !== null && selectedIndex2.value === null) {
      selectedIndex2.value = index
      return
    }

    if (selectedIndex1.value === null) {
      selectedIndex1.value = index
      return
    }
  }

  const selectedIndices = ref(new Set<number>())

  function onSelect(index: number) {
    updateSelected(index)
    selectedIndices.value.clear()

    const one = selectedIndex1.value
    const two = selectedIndex2.value

    if (one === null && two === null) {
      return
    }

    if (one === null) {
      selectedIndices.value.add(two!)
      return
    }

    if (two === null) {
      selectedIndices.value.add(one!)
      return
    }

    for (let i = lowerIndex.value!; i <= upperIndex.value!; i++) {
      selectedIndices.value.add(i!)
    }
  }

  function clearSelection() {
    selectedIndex1.value = null
    selectedIndex2.value = null
  }

  const selection = computed(() =>
    (hasSelection.value
      ? items.value.slice(
        lowerIndex.value!,
        upperIndex.value! + 1,
      )
      : selectedIndex1.value !== null
      ? [items.value[selectedIndex1.value]]
      : selectedIndex2.value !== null
      ? [items.value[selectedIndex2.value]]
      : []) as ItemType[]
  )

  onUnmounted(() => {
    data.delete(id)
  })

  const result = {
    selection,
    onHover,
    onSelect,
    clearSelection,
    lowerIndex,
    upperIndex,
    selectedIndex1,
    selectedIndex2,
    hasSelection,
    hasSelectedRange,
    selectedIndices,
  }

  data.set(id, result)

  return result
}
