import type { KeyConfig } from '../../types'
import Key from './Key'
import './Keypad.css'

// A ordem importa: o grid de 4 colunas é preenchido na sequência.
const KEYS: KeyConfig[] = [
  { label: 'C', ariaLabel: 'Limpar tudo', variant: 'action' },
  { label: '⌫', ariaLabel: 'Apagar último caractere', variant: 'action' },
  { label: '÷', ariaLabel: 'Dividir', variant: 'operator' },
  { label: '×', ariaLabel: 'Multiplicar', variant: 'operator' },
  { label: '7', ariaLabel: '7', variant: 'number' },
  { label: '8', ariaLabel: '8', variant: 'number' },
  { label: '9', ariaLabel: '9', variant: 'number' },
  { label: '−', ariaLabel: 'Subtrair', variant: 'operator' },
  { label: '4', ariaLabel: '4', variant: 'number' },
  { label: '5', ariaLabel: '5', variant: 'number' },
  { label: '6', ariaLabel: '6', variant: 'number' },
  { label: '+', ariaLabel: 'Somar', variant: 'operator' },
  { label: '1', ariaLabel: '1', variant: 'number' },
  { label: '2', ariaLabel: '2', variant: 'number' },
  { label: '3', ariaLabel: '3', variant: 'number' },
  { label: '=', ariaLabel: 'Calcular resultado', variant: 'equals', tall: true },
  { label: '0', ariaLabel: '0', variant: 'number', wide: true },
  { label: '.', ariaLabel: 'Ponto decimal', variant: 'number' },
]

interface KeypadProps {
  onKeyPress?: (label: string) => void
}

function Keypad({ onKeyPress }: KeypadProps) {
  return (
    <div className="keypad" role="group" aria-label="Teclado da calculadora">
      {KEYS.map((key) => (
        <Key key={key.label} {...key} onPress={onKeyPress} />
      ))}
    </div>
  )
}

export default Keypad