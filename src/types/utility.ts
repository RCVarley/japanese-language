export type ObjectValues<T> = T[keyof T]

export interface IsIndexed {
  index: number
}
export interface CanSelect {
  isSelected: boolean
}
export interface CanHover {
  isHovering: boolean
}

export type Selectable<MainType extends Record<string, any>> =
  & MainType
  & CanSelect
