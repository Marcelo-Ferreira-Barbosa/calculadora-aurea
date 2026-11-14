import { describe, expect, it } from 'vitest'
import { evaluate } from './evaluate'

// Atalho: "8 × 8 + 3" vira ['8', '×', '8', '+', '3'].
const calc = (expression: string) => evaluate(expression.split(' '))

describe('evaluate', () => {
  it.each([
    ['60 + 7', 67],
    ['100 − 33', 67],
    ['134 ÷ 2', 67],
    ['67 × 1', 67],
    ['8 × 8 + 3', 67],
    ['12 × 6 − 5', 67],
    ['150 ÷ 3 + 17', 67],
    ['3 + 8 × 8', 67],
    ['100 − 3 × 11', 67],
    ['10 − 2 − 3', 5],
    ['100 ÷ 10 ÷ 2', 5],
    ['2 + 3 × 4 − 6 ÷ 2', 11],
    ['0 ÷ 5', 0],
    ['1.5 × 2', 3],
    ['7', 7],
  ])('%s = %d', (expression, expected) => {
    expect(calc(expression)).toEqual({ ok: true, value: expected })
  })

  it('mantém o ruído de ponto flutuante no valor interno', () => {
    const result = calc('0.1 + 0.2')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).not.toBe(0.3)
      expect(result.value).toBeCloseTo(0.3, 12)
    }
  })

  it.each(['5 ÷ 0', '0 ÷ 0', '5 ÷ 0.0', '5 + 3 ÷ 0', '2 × 3 ÷ 0'])(
    'divisão por zero em "%s"',
    (expression) => {
      expect(calc(expression)).toEqual({ ok: false, error: 'division-by-zero' })
    },
  )

  it.each([
    [[]],
    [['5', '+']],
    [['+', '5']],
    [['5', '5', '5']],
    [['5', '^', '3']],
    [['abc']],
    [['5', '+', 'x']],
  ])('rejeita entrada inválida %j', (tokens) => {
    expect(evaluate(tokens)).toEqual({ ok: false, error: 'invalid' })
  })

  it('rejeita resultado que estoura o limite numérico', () => {
    expect(evaluate(['1e308', '×', '10'])).toEqual({ ok: false, error: 'invalid' })
  })
})