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
  const displayClass = isGolden ? 'display display--golden' : 'display'

  const resultClass = [
    'display__result',
    isError ? 'display__result--error' : '',
    isGolden ? 'display__result--golden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={displayClass}>
      <div className="display__expression">{expression}</div>
      <output className={resultClass} aria-live="polite">
        {result}
      </output>
    </div>
  )
}

export default Display