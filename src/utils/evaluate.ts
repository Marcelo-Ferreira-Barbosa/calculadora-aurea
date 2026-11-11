export type Operator = '+' | '−' | '×' | '÷'

export type EvaluationError = 'division-by-zero' | 'invalid'

export type EvaluationResult =
  | { ok: true; value: number }
  | { ok: false; error: EvaluationError }

const OPERATORS: readonly string[] = ['+', '−', '×', '÷']

export function isOperator(token: string): token is Operator {
  return OPERATORS.includes(token)
}

const INVALID: EvaluationResult = { ok: false, error: 'invalid' }

/**
 * Calcula uma lista de tokens como ['8', '×', '8', '+', '3'].
 * Respeita a precedência: × e ÷ são resolvidos antes de + e −.
 */
export function evaluate(tokens: readonly string[]): EvaluationResult {
  // Formato válido: número (operador número)*, ou seja, tamanho ímpar.
  if (tokens.length === 0 || tokens.length % 2 === 0) return INVALID

  const first = Number(tokens[0])
  if (!Number.isFinite(first)) return INVALID

  // Passada 1: resolve × e ÷ na hora; guarda os + e − para a passada 2.
  const numbers: number[] = [first]
  const pendingOperators: Operator[] = []

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i]
    const right = Number(tokens[i + 1])

    if (!isOperator(operator) || !Number.isFinite(right)) return INVALID

    if (operator === '×' || operator === '÷') {
      if (operator === '÷' && right === 0) {
        return { ok: false, error: 'division-by-zero' }
      }
      const last = numbers.length - 1
      numbers[last] = operator === '×' ? numbers[last] * right : numbers[last] / right
    } else {
      pendingOperators.push(operator)
      numbers.push(right)
    }
  }

  // Passada 2: + e − da esquerda para a direita.
  let total = numbers[0]
  for (let i = 0; i < pendingOperators.length; i++) {
    total = pendingOperators[i] === '+' ? total + numbers[i + 1] : total - numbers[i + 1]
  }

  if (!Number.isFinite(total)) return INVALID

  return { ok: true, value: total }
}