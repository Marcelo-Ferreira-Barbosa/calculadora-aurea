import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import './Display.css'

interface DisplayProps {
  expression?: string
  result?: string
  isError?: boolean
  isGolden?: boolean
}

function Display({
  expression = '',
  result = '0',
  isError = false,
  isGolden = false,
}: DisplayProps) {
  const expressionRef = useRef<HTMLDivElement>(null)

  // Expressões longas rolam na horizontal; mantém o final (o que se acabou de digitar) visível.
  useEffect(() => {
    const element = expressionRef.current
    if (element) element.scrollLeft = element.scrollWidth
  }, [expression])

  const displayClass = isGolden ? 'display display--golden' : 'display'

  const resultClass = [
    'display__result',
    isError ? 'display__result--error' : '',
    isGolden ? 'display__result--golden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // --chars deixa o CSS ajustar o tamanho da fonte ao tamanho do texto.
  const resultStyle = { '--chars': result.length } as CSSProperties

  return (
    <div className={displayClass}>
      <div className="display__expression" ref={expressionRef}>
        {expression}
      </div>
      <output className={resultClass} style={resultStyle} aria-live="polite">
        {result}
      </output>
    </div>
  )
}

export default Display