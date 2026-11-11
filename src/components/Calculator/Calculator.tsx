import Display from './Display'
import Keypad from './Keypad'
import './Calculator.css'

function Calculator() {
  return (
    <section className="calculator" aria-label="Calculadora">
      <Display />
      <Keypad />
    </section>
  )
}

export default Calculator