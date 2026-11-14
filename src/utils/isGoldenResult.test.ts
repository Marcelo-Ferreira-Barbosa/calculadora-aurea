import { describe, expect, it } from 'vitest'
import { isGoldenResult } from './isGoldenResult'

describe('isGoldenResult', () => {
  it.each([67, 67.00000000000001, 66.99999999999999, 20.1 / 0.3, 33.5 * 2])(
    'aceita %s (ruído de ponto flutuante)',
    (value) => {
      expect(isGoldenResult(value)).toBe(true)
    },
  )

  it.each([66, 68, 67.001, 66.999, 67 + 1e-8, 67 + 1e-10, 0, -67])(
    'rejeita %s (realmente diferente de 67)',
    (value) => {
      expect(isGoldenResult(value)).toBe(false)
    },
  )

  it.each([NaN, Infinity, -Infinity])('rejeita %s', (value) => {
    expect(isGoldenResult(value)).toBe(false)
  })
})