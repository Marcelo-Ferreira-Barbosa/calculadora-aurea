import Display from './Display'
import Keypad from './Keypad'
import './Calculator.css'

interface CalculatorProps {
  expression: string
  result: string
  isError: boolean
  isGolden: boolean
  onKeyPress: (label: string) => void
}

function Calculator({ expression, result, isError, isGolden, onKeyPress }: CalculatorProps) {
  return (
    <section className="calculator" aria-label="Calculadora">
      <Display
        expression={expression}
        result={result}
        isError={isError}
        isGolden={isGolden}
      />
      <Keypad onKeyPress={onKeyPress} />
    </section>
  )
}

export default Calculator