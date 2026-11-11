import type { KeyConfig } from '../../types'
import './Key.css'

interface KeyProps extends KeyConfig {
  onPress?: (label: string) => void
}

function Key({ label, ariaLabel, variant, wide, tall, onPress }: KeyProps) {
  const className = [
    'key',
    `key--${variant}`,
    wide ? 'key--wide' : '',
    tall ? 'key--tall' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => onPress?.(label)}
    >
      {label}
    </button>
  )
}

export default Key