import { evaluate, isOperator } from './evaluate'
import type { EvaluationError, Operator } from './evaluate'
import { formatNumber } from './formatNumber'

export const MAX_DIGITS = 15

export type CalculatorStatus = 'editing' | 'result' | 'error'

export interface CalculatorState {
  /** Números e operadores alternados. O último pode ser um número em digitação. */
  tokens: string[]
  /** editing: digitando | result: após "=" | error: após "=" com erro */
  status: CalculatorStatus
  /** Texto do resultado ou da mensagem de erro (só usado fora de "editing"). */
  output: string
}

export type CalculatorAction =
  | { type: 'digit'; digit: string }
  | { type: 'decimal' }
  | { type: 'operator'; operator: Operator }
  | { type: 'equals' }
  | { type: 'clear' }
  | { type: 'backspace' }

export const initialState: CalculatorState = {
  tokens: [],
  status: 'editing',
  output: '',
}

const ERROR_MESSAGES: Record<EvaluationError, string> = {
  'division-by-zero': 'Divisão por zero',
  invalid: 'Resultado inválido',
}

// ---------- Funções auxiliares ----------

function replaceLast(state: CalculatorState, token: string): CalculatorState {
  return { ...state, tokens: [...state.tokens.slice(0, -1), token] }
}

function withoutTrailingDot(token: string): string {
  return token.endsWith('.') ? token.slice(0, -1) : token
}

function countDigits(token: string): number {
  return token.replace('.', '').length
}

// ---------- Uma função por ação ----------

function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  // Depois de "=" ou de um erro, digitar um número começa uma conta nova.
  if (state.status !== 'editing') {
    return { tokens: [digit], status: 'editing', output: '' }
  }

  const last = state.tokens.at(-1)

  if (last === undefined || isOperator(last)) {
    return { ...state, tokens: [...state.tokens, digit] }
  }
  if (last === '0') return replaceLast(state, digit) // evita "007"
  if (countDigits(last) >= MAX_DIGITS) return state
  return replaceLast(state, last + digit)
}

function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.status !== 'editing') {
    return { tokens: ['0.'], status: 'editing', output: '' }
  }

  const last = state.tokens.at(-1)

  if (last === undefined || isOperator(last)) {
    return { ...state, tokens: [...state.tokens, '0.'] }
  }
  if (last.includes('.')) return state // um número só pode ter um ponto
  if (countDigits(last) >= MAX_DIGITS) return state
  return replaceLast(state, last + '.')
}

function inputOperator(state: CalculatorState, operator: Operator): CalculatorState {
  // Depois de um erro não há valor para continuar.
  if (state.status === 'error') return state

  // Depois de "=", o operador continua a partir do resultado.
  if (state.status === 'result') {
    return { tokens: [state.output, operator], status: 'editing', output: '' }
  }

  const last = state.tokens.at(-1)

  // Operador como primeiro botão: usa 0 como valor da esquerda ("− 5" vira "0 − 5").
  if (last === undefined) return { ...state, tokens: ['0', operator] }

  // Dois operadores seguidos: o novo substitui o anterior.
  if (isOperator(last)) return replaceLast(state, operator)

  return {
    ...state,
    tokens: [...state.tokens.slice(0, -1), withoutTrailingDot(last), operator],
  }
}

function calculate(state: CalculatorState): CalculatorState {
  if (state.status !== 'editing') return state

  const last = state.tokens.at(-1)
  // Vazio ou terminado em operador: expressão incompleta, "=" não faz nada.
  if (last === undefined || isOperator(last)) return state

  const tokens = [...state.tokens.slice(0, -1), withoutTrailingDot(last)]
  const result = evaluate(tokens)

  if (!result.ok) {
    return { tokens, status: 'error', output: ERROR_MESSAGES[result.error] }
  }
  return { tokens, status: 'result', output: formatNumber(result.value) }
}

function deleteLast(state: CalculatorState): CalculatorState {
  // Depois de "=" ou de um erro, apagar limpa tudo.
  if (state.status !== 'editing') return initialState

  const last = state.tokens.at(-1)
  if (last === undefined) return state

  if (isOperator(last)) {
    return { ...state, tokens: state.tokens.slice(0, -1) }
  }

  const shortened = last.slice(0, -1)
  // Se não sobrou número válido (vazio, "-" etc.), remove o token inteiro.
  if (shortened === '' || Number.isNaN(Number(shortened))) {
    return { ...state, tokens: state.tokens.slice(0, -1) }
  }
  return replaceLast(state, shortened)
}

// ---------- Reducer ----------

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'digit':
      return inputDigit(state, action.digit)
    case 'decimal':
      return inputDecimal(state)
    case 'operator':
      return inputOperator(state, action.operator)
    case 'equals':
      return calculate(state)
    case 'backspace':
      return deleteLast(state)
    case 'clear':
      return initialState
  }
}

// ---------- O que mostrar no display ----------

export interface DisplayContent {
  expression: string
  result: string
  isError: boolean
}

export function getDisplay(state: CalculatorState): DisplayContent {
  const expression = state.tokens.join(' ')

  if (state.status === 'editing') {
    // Enquanto digita, o display grande mostra o último número da expressão.
    const lastNumber = [...state.tokens].reverse().find((token) => !isOperator(token))
    return { expression, result: lastNumber ?? '0', isError: false }
  }

  return {
    expression: `${expression} =`,
    result: state.output,
    isError: state.status === 'error',
  }
}