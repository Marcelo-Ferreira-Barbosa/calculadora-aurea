import { useCalculator } from './hooks/useCalculator'
import Header from './components/Header/Header'
import Calculator from './components/Calculator/Calculator'
import Achievement from './components/Achievement/Achievement'
import GoldenWays from './components/GoldenWays/GoldenWays'
import './App.css'

function App() {
  const { expression, result, isError, isGolden, pressKey, reset } = useCalculator()

  function handleReset() {
    reset()
    // O botão "Fazer outra operação" some ao limpar; devolve o foco à calculadora.
    document.getElementById('calculadora')?.focus()
  }

  return (
    <>
      <Header />
      <main className="app-main">
        <div className="app-top">
          <Calculator
            expression={expression}
            result={result}
            isError={isError}
            isGolden={isGolden}
            onKeyPress={pressKey}
          />
          <div className="app-side">
            <Achievement unlocked={isGolden} onReset={handleReset} />
          </div>
        </div>
        <GoldenWays />
      </main>
    </>
  )
}

export default App