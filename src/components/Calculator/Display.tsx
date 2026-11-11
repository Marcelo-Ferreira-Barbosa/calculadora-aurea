import './Display.css'

interface DisplayProps {
  expression?: string
  result?: string
  isError?: boolean
}

function Display({ expression = '', result = '0', isError = false }: DisplayProps) {
  const resultClass = isError
    ? 'display__result display__result--error'
    : 'display__result'

  return (
    <div className="display">
      <div className="display__expression">{expression}</div>
      <output className={resultClass} aria-live="polite">
        {result}
      </output>
    </div>
  )
}

export default Display