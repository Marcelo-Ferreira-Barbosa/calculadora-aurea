/**
 * Prepara um resultado para exibição: arredonda para 12 dígitos significativos
 * (0.30000000000000004 vira "0.3") e usa notação científica para números muito
 * grandes ou muito pequenos, em vez de inventar zeros que o cálculo não tem.
 */
export function formatNumber(value: number): string {
  const rounded = Number(value.toPrecision(12))
  const abs = Math.abs(rounded)

  if (abs >= 1e12 || (abs > 0 && abs < 1e-6)) return rounded.toExponential()
  return String(rounded)
}