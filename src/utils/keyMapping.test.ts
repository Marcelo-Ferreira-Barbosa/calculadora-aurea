import { describe, expect, it } from 'vitest'
import { keyboardKeyToAction, labelToAction } from './keyMapping'

// Os mesmos rótulos da lista KEYS do Keypad.tsx: se alguém mudar um rótulo lá
// e esquecer daqui, este teste acusa que a tecla deixou de funcionar.
const KEYPAD_LABELS = [
  'C', '⌫', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+',
  '1', '2', '3', '=', '0', '.',
]

describe('labelToAction', () => {
  it.each(KEYPAD_LABELS)('a tecla "%s" do teclado da tela gera uma ação', (label) => {
    expect(labelToAction(label)).not.toBeNull()
  })

  it('converte cada tipo de tecla na ação certa', () => {
    expect(labelToAction('7')).toEqual({ type: 'digit', digit: '7' })
    expect(labelToAction('×')).toEqual({ type: 'operator', operator: '×' })
    expect(labelToAction('−')).toEqual({ type: 'operator', operator: '−' })
    expect(labelToAction('.')).toEqual({ type: 'decimal' })
    expect(labelToAction('=')).toEqual({ type: 'equals' })
    expect(labelToAction('C')).toEqual({ type: 'clear' })
    expect(labelToAction('⌫')).toEqual({ type: 'backspace' })
  })

  it('ignora rótulos desconhecidos, inclusive o hífen comum no lugar do "−"', () => {
    expect(labelToAction('?')).toBeNull()
    expect(labelToAction('-')).toBeNull()
  })
})

describe('keyboardKeyToAction (teclado do computador)', () => {
  it.each([
    ['8', { type: 'digit', digit: '8' }],
    ['+', { type: 'operator', operator: '+' }],
    ['-', { type: 'operator', operator: '−' }],
    ['*', { type: 'operator', operator: '×' }],
    ['x', { type: 'operator', operator: '×' }],
    ['X', { type: 'operator', operator: '×' }],
    ['/', { type: 'operator', operator: '÷' }],
    ['.', { type: 'decimal' }],
    [',', { type: 'decimal' }],
    ['=', { type: 'equals' }],
    ['Enter', { type: 'equals' }],
    ['Backspace', { type: 'backspace' }],
    ['Delete', { type: 'clear' }],
    ['Escape', { type: 'clear' }],
  ])('a tecla "%s" faz a ação esperada', (key, expected) => {
    expect(keyboardKeyToAction(key)).toEqual(expected)
  })

  it.each(['a', 'Shift', 'Tab', 'F5', 'ArrowUp', ' '])('ignora "%s"', (key) => {
    expect(keyboardKeyToAction(key)).toBeNull()
  })
})