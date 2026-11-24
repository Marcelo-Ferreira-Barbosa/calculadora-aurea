import { describe, expect, it } from 'vitest'
import { evaluate } from '../utils/evaluate'
import { GOLDEN_NUMBER, isGoldenResult } from '../utils/isGoldenResult'
import { categories, waysTo67 } from './waysTo67'

// Calcula "8 × 8" com o mesmo avaliador da calculadora; devolve null se for inválido.
function calc(expression: string): number | null {
  const result = evaluate(expression.split(' '))
  return result.ok ? result.value : null
}

describe('exemplos de "Como chegar aos 67?"', () => {
  it('não repete ids nem expressões', () => {
    const ids = waysTo67.map((way) => way.id)
    const expressions = waysTo67.map((way) => way.expression)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(expressions).size).toBe(expressions.length)
  })

  it.each(categories)('a categoria "%s" tem pelo menos um exemplo', (category) => {
    expect(waysTo67.some((way) => way.category === category)).toBe(true)
  })

  describe.each(waysTo67.map((way) => [way.id, way] as const))('%s', (_id, way) => {
    it('a expressão resulta em 67', () => {
      const total = calc(way.expression)
      expect(total).not.toBeNull()
      expect(isGoldenResult(total ?? NaN)).toBe(true)
    })

    it('o campo result e a categoria estão corretos', () => {
      expect(way.result).toBe(GOLDEN_NUMBER)
      expect(categories).toContain(way.category)
    })

    it('cada passo está certo e o último termina em 67', () => {
      const steps = way.steps ?? []
      for (const step of steps) {
        const parts = step.split(' = ')
        expect(parts, `passo "${step}" fora do formato "conta = resultado"`).toHaveLength(2)
        const computed = calc(parts[0])
        expect(computed, `passo "${step}"`).not.toBeNull()
        expect(computed ?? NaN, `passo "${step}"`).toBeCloseTo(Number(parts[1]), 9)
      }
      if (steps.length > 0) {
        expect(steps.at(-1)).toMatch(/ = 67$/)
      }
    })
  })

  it('pega um exemplo errado (prova de que o teste funciona)', () => {
    expect(isGoldenResult(calc('45 + 23') ?? NaN)).toBe(false)
  })
})