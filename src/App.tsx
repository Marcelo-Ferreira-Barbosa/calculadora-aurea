import { useState } from 'react'
import Header from './components/Header/Header'
import Calculator from './components/Calculator/Calculator'
import Achievement from './components/Achievement/Achievement'
import GoldenWays from './components/GoldenWays/GoldenWays'
import './App.css'

function App() {
  // TEMPORÁRIO (Etapa 3): permite ver o visual da conquista sem lógica.
  // Será removido na Etapa 5, quando o resultado 67 disparar a conquista.
  const [previewUnlocked, setPreviewUnlocked] = useState(false)

  return (
    <>
      <Header />
      <main className="app-main">
        <div className="app-top">
          <Calculator />
          <div className="app-side">
            <Achievement
              unlocked={previewUnlocked}
              onReset={() => setPreviewUnlocked(false)}
            />
            <button
              type="button"
              className="preview-toggle"
              onClick={() => setPreviewUnlocked((value) => !value)}
            >
              Pré-visualizar conquista (temporário)
            </button>
          </div>
        </div>
        <GoldenWays />
      </main>
    </>
  )
}

export default App