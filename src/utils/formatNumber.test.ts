import { describe, expect, it } from 'vitest'
import { formatNumber } from './formatNumber'

describe('formatNumber', () => {
  it.each([
    [0.1 + 0.2, '0.3'],
    [1 / 3, '0.333333333333'],
    [20.1 / 0.3, '67'],
    [67, '67'],
    [-5, '-5'],
    [0, '0'],
    [-0, '0'],
    [999999999999, '999999999999'],
  ])('%s vira "%s"', (value, expected) => {
    expect(formatNumber(value)).toBe(expected)
  })

  it('usa notação científica em vez de inventar zeros', () => {
    expect(formatNumber(123456789 * 987654321)).toBe('1.21932631113e+17')
    expect(formatNumber(1e12)).toBe('1e+12')
    expect(formatNumber(1e-7)).toBe('1e-7')
    expect(formatNumber(-123456789 * 987654321)).toBe('-1.21932631113e+17')
  })
})