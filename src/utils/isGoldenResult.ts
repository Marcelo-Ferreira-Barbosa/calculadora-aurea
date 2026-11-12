export const GOLDEN_NUMBER = 67

// Absorve só o ruído do ponto flutuante (da ordem de 1e-14 perto de 67).
// É menor que a resolução do display (12 dígitos significativos), então um
// valor que aparece como diferente de 67 na tela nunca conta como conquista.
const TOLERANCE = 1e-11

export function isGoldenResult(value: number): boolean {
  return Number.isFinite(value) && Math.abs(value - GOLDEN_NUMBER) < TOLERANCE
}