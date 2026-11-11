import type { WayExample } from '../../types'
import './WayCard.css'

type WayCardProps = Omit<WayExample, 'id'>

function WayCard({ category, expression, result, explanation }: WayCardProps) {
  return (
    <article className="way-card">
      <p className="way-card__category">{category}</p>
      <p className="way-card__expression">{expression}</p>
      <p className="way-card__result">= {result}</p>
      <p className="way-card__explanation">{explanation}</p>
    </article>
  )
}

export default WayCard