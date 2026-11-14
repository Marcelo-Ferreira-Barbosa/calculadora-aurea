// Confere se TODOS os exemplos de src/data/waysTo67.ts realmente dão 67,
// usando o mesmo avaliador da calculadora (sem eval).
// Como rodar: npm run verify:ways
import { categories, waysTo67 } from '../src/data/waysTo67.ts'
import { evaluate } from '../src/utils/evaluate.ts'
import { GOLDEN_NUMBER, isGoldenResult } from '../src/utils/isGoldenResult.ts'

const problems: string[] = []

function calculate(expression: string): number | null {
  const result = evaluate(expression.split(' '))
  return result.ok ? result.value : null
}

const seenIds = new Set<string>()
const seenExpressions = new Set<string>()

for (const way of waysTo67) {
  const where = `[${way.id}] ${way.expression}`

  if (seenIds.has(way.id)) problems.push(`${where}: id repetido`)
  seenIds.add(way.id)

  if (seenExpressions.has(way.expression)) problems.push(`${where}: expressão repetida`)
  seenExpressions.add(way.expression)

  if (!categories.includes(way.category)) {
    problems.push(`${where}: categoria "${way.category}" não está em categories`)
  }

  if (way.result !== GOLDEN_NUMBER) {
    problems.push(`${where}: o campo result é ${way.result}, e não ${GOLDEN_NUMBER}`)
  }

  const total = calculate(way.expression)
  if (total === null || !isGoldenResult(total)) {
    problems.push(`${where}: a expressão calcula ${total}, e não ${GOLDEN_NUMBER}`)
  }

  const steps = way.steps ?? []
  steps.forEach((step, index) => {
    const parts = step.split(' = ')
    if (parts.length !== 2) {
      problems.push(`${where}: passo ${index + 1} ("${step}") não está no formato "conta = resultado"`)
      return
    }
    const [left, right] = parts
    const computed = calculate(left)
    const written = Number(right)
    if (computed === null || Math.abs(computed - written) > 1e-9) {
      problems.push(`${where}: passo ${index + 1} ("${step}") calcula ${computed}, e não ${right}`)
    }
  })

  const lastStep = steps.at(-1)
  if (lastStep !== undefined && !lastStep.endsWith(` = ${GOLDEN_NUMBER}`)) {
    problems.push(`${where}: o último passo deveria terminar em 67`)
  }
}

for (const category of categories) {
  if (!waysTo67.some((way) => way.category === category)) {
    problems.push(`A categoria "${category}" não tem nenhum exemplo`)
  }
}

if (problems.length > 0) {
  console.log(`✖ ${problems.length} problema(s) encontrado(s):`)
  problems.forEach((problem) => console.log(`  - ${problem}`))
  throw new Error('Verificação dos exemplos falhou')
}

console.log(`✔ ${waysTo67.length} exemplos verificados: todos resultam em ${GOLDEN_NUMBER}.`)