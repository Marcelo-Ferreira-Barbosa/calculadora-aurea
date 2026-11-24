import type { CalculatorAction } from './calculatorReducer'
import { isOperator } from './evaluate'

/** Converte o rótulo de uma tecla da tela (ex.: "7", "×", "⌫") em uma ação. */
export function labelToAction(label: string): CalculatorAction | null {
  if (/^[0-9]$/.test(label)) return { type: 'digit', digit: label }
  if (isOperator(label)) return { type: 'operator', operator: label }

  switch (label) {
    case '.':
      return { type: 'decimal' }
    case '=':
      return { type: 'equals' }
    case 'C':
      return { type: 'clear' }
    case '⌫':
      return { type: 'backspace' }
    default:
      return null
  }
}

/** Traduz teclas do computador (event.key) para os rótulos usados pelos botões. */
const KEYBOARD_TO_LABEL: Partial<Record<string, string>> = {
  '+': '+',
  '-': '−',
  '*': '×',
  x: '×',
  X: '×',
  '/': '÷',
  '.': '.',
  ',': '.',
  '=': '=',
  Enter: '=',
  Backspace: '⌫',
  Delete: 'C',
  Escape: 'C',
}

/** Converte uma tecla do computador (event.key) em uma ação, ou null se ela não for da calculadora. */
export function keyboardKeyToAction(key: string): CalculatorAction | null {
  const label = /^[0-9]$/.test(key) ? key : KEYBOARD_TO_LABEL[key]
  return label === undefined ? null : labelToAction(label)
}