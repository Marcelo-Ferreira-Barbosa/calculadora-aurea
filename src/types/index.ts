export type KeyVariant = 'number' | 'operator' | 'action' | 'equals'

export interface KeyConfig {
  label: string
  ariaLabel: string
  variant: KeyVariant
  wide?: boolean
  tall?: boolean
}

export interface WayExample {
  id: string
  category: string
  expression: string
  result: number
  explanation: string
}