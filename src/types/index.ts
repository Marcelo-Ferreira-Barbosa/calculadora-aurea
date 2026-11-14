export type KeyVariant = 'number' | 'operator' | 'action' | 'equals'

export interface KeyConfig {
  label: string
  ariaLabel: string
  variant: KeyVariant
  wide?: boolean
  tall?: boolean
}

export type WayCategory =
  | 'Adição'
  | 'Subtração'
  | 'Multiplicação'
  | 'Divisão'
  | 'Combinada'

export interface WayExample {
  id: string
  category: WayCategory
  expression: string
  result: number
  explanation: string
  steps?: string[]
}