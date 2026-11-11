import { useCalculator } from '../../hooks/useCalculator'
import Display from './Display'
import Keypad from './Keypad'
import './Calculator.css'

function Calculator() {
  const { expression, result, isError, pressKey } = useCalculator()

  return (
    <section className="calculator" aria-label="Calculadora">
      <Display expression={expression} result={result} isError={isError} />
      <Keypad onKeyPress={pressKey} />
    </section>
  )
}

export default Calculator