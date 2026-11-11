import './Display.css'

interface DisplayProps {
  expression?: string
  result?: string
}

function Display({ expression = '', result = '0' }: DisplayProps) {
  return (
    <div className="display">
      <div className="display__expression">{expression}</div>
      <output className="display__result" aria-live="polite">
        {result}
      </output>
    </div>
  )
}

export default Display