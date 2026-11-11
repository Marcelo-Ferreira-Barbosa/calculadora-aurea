/**
 * Arredonda para 12 dígitos significativos só para exibir.
 * Remove o ruído do ponto flutuante: 0.30000000000000004 vira "0.3".
 */
export function formatNumber(value: number): string {
  return String(Number(value.toPrecision(12)))
}