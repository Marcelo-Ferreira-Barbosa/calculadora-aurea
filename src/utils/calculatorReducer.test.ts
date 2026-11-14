import { describe, expect, it } from 'vitest'
import {
  calculatorReducer,
  getDisplay,
  hasEarnedAchievement,
  initialState,
  MAX_DIGITS,
} from './calculatorReducer'
import type { CalculatorAction, CalculatorState } from './calculatorReducer'
import type { Operator } from './evaluate'

function toAction(key: string): CalculatorAction {
  if (/^\d$/.test(key)) return { type: 'digit', digit: key }
  switch (key) {
    case '.':
      return { type: 'decimal' }
    case '=':
      return { type: 'equals' }
    case 'C':
      return { type: 'clear' }
    case '⌫':
      return { type: 'backspace' }
    default:
      return { type: 'operator', operator: key as Operator }
  }
}

// Atalho: press('8 × 8 + 3 =') aperta as teclas na ordem e devolve o estado final.
function press(keys: string, from: CalculatorState = initialState): CalculatorState {
  return keys
    .split(' ')
    .reduce((state, key) => calculatorReducer(state, toAction(key)), from)
}

const show = (keys: string) => getDisplay(press(keys))

describe('operações e precedência', () => {
  it.each([
    ['6 0 + 7 =', '67'],
    ['1 0 0 − 3 3 =', '67'],
    ['1 3 4 ÷ 2 =', '67'],
    ['8 × 8 + 3 =', '67'],
    ['3 + 8 × 8 =', '67'],
    ['1 0 − 2 − 3 =', '5'],
    ['2 + 3 × 4 − 6 ÷ 2 =', '11'],
    ['0 ÷ 5 =', '0'],
  ])('%s → %s', (keys, expected) => {
    expect(show(keys).result).toBe(expected)
  })
})

describe('decimais', () => {
  it('0.1 + 0.2 aparece como 0.3', () => {
    expect(show('0 . 1 + 0 . 2 =').result).toBe('0.3')
  })
  it('1 ÷ 3 mostra 12 dígitos significativos', () => {
    expect(show('1 ÷ 3 =').result).toBe('0.333333333333')
  })
  it('ponto sozinho vira "0."', () => {
    expect(show('. 5').result).toBe('0.5')
  })
  it('bloqueia o segundo ponto no mesmo número', () => {
    expect(show('1 . 2 . 3').result).toBe('1.23')
  })
  it('remove o ponto solto antes do operador', () => {
    expect(show('5 . +').expression).toBe('5 +')
  })
})

describe('operadores', () => {
  it('operador seguido de operador substitui o anterior', () => {
    expect(show('5 + × 3 =').result).toBe('15')
  })
  it('operador como primeira tecla usa 0 à esquerda', () => {
    const display = show('− 5 =')
    expect(display.expression).toBe('0 − 5 =')
    expect(display.result).toBe('-5')
  })
  it('"=" com expressão incompleta não faz nada', () => {
    expect(show('8 + =').expression).toBe('8 +')
  })
})

describe('limpar e apagar', () => {
  it('apaga dígito por dígito', () => {
    expect(show('1 2 3 ⌫').result).toBe('12')
  })
  it('apaga o operador e depois o número', () => {
    expect(show('8 + 5 ⌫').expression).toBe('8 +')
    expect(show('8 + 5 ⌫ ⌫').expression).toBe('8')
  })
  it('apagar o único dígito deixa a calculadora vazia', () => {
    const display = show('7 ⌫')
    expect(display.expression).toBe('')
    expect(display.result).toBe('0')
  })
  it('C zera tudo', () => {
    expect(press('8 × 8 + 3 = C')).toEqual(initialState)
  })
  it('⌫ depois de "=" zera tudo', () => {
    expect(press('2 + 3 = ⌫')).toEqual(initialState)
  })
})

describe('depois do "="', () => {
  it('um número começa uma conta nova', () => {
    expect(show('2 + 3 = 4').expression).toBe('4')
  })
  it('um operador continua do resultado', () => {
    expect(show('2 + 3 = × 4 =').result).toBe('20')
  })
  it('um novo "=" não muda nada', () => {
    const state = press('2 + 3 =')
    expect(calculatorReducer(state, { type: 'equals' })).toBe(state)
  })
})

describe('divisão por zero e limites', () => {
  it.each(['5 ÷ 0 =', '0 ÷ 0 =', '5 ÷ 0 . 0 =', '5 + 3 ÷ 0 ='])('%s', (keys) => {
    const display = show(keys)
    expect(display.result).toBe('Divisão por zero')
    expect(display.isError).toBe(true)
  })
  it('depois do erro, operador não faz nada e número começa conta nova', () => {
    const error = press('5 ÷ 0 =')
    expect(calculatorReducer(error, { type: 'operator', operator: '+' })).toBe(error)
    expect(getDisplay(press('7', error)).expression).toBe('7')
  })
  it('não aceita zeros à esquerda', () => {
    expect(show('0 0 7').result).toBe('7')
  })
  it(`limita cada número a ${MAX_DIGITS} dígitos`, () => {
    expect(show('1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7').result).toBe('123456789012345')
  })
  it('mostra resultado enorme em notação científica, sem quebrar', () => {
    const keys = `${'9 '.repeat(14)}× ${'9 '.repeat(14)}=`
    expect(show(keys).result).toBe('1e+28')
  })
  it('resultado em notação científica não é editado dígito a dígito', () => {
    const state = press(`${'9 '.repeat(14)}× ${'9 '.repeat(14)}= + ⌫ 3`)
    expect(getDisplay(state).result).toBe('1e+28')
  })
})

describe('conquista áurea', () => {
  it.each([
    '6 0 + 7 =',
    '1 0 0 − 3 3 =',
    '1 3 4 ÷ 2 =',
    '8 × 8 + 3 =',
    '1 2 × 6 − 5 =',
    '1 5 0 ÷ 3 + 1 7 =',
    '6 6 . 5 + 0 . 5 =',
    '2 0 . 1 ÷ 0 . 3 =',
    '3 3 . 5 × 2 =',
  ])('dispara em %s', (keys) => {
    expect(hasEarnedAchievement(press(keys))).toBe(true)
  })

  it.each([
    '6 5 + 1 =',
    '6 7 + 1 =',
    '6 7 + 0 . 0 0 1 =',
    '6 7 + 0 . 0 0 0 0 0 0 0 1 =',
    '6 7 =',
    '5 ÷ 0 =',
  ])('não dispara em %s', (keys) => {
    expect(hasEarnedAchievement(press(keys))).toBe(false)
  })

  it('não dispara antes de apertar "="', () => {
    expect(hasEarnedAchievement(press('6 0 + 7'))).toBe(false)
  })

  it('some ao iniciar uma nova conta', () => {
    const golden = press('6 0 + 7 =')
    expect(hasEarnedAchievement(golden)).toBe(true)
    expect(hasEarnedAchievement(press('5', golden))).toBe(false)
    expect(hasEarnedAchievement(press('+', golden))).toBe(false)
    expect(hasEarnedAchievement(press('C', golden))).toBe(false)
  })

  it('dispara de novo depois de limpar', () => {
    expect(hasEarnedAchievement(press('C 6 0 + 7 =', press('6 0 + 7 =')))).toBe(true)
  })
})