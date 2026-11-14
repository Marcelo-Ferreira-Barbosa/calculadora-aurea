import { useState } from 'react'
import { categories, waysTo67 } from '../../data/waysTo67'
import type { WayCategory } from '../../types'
import CategoryFilter from './CategoryFilter'
import WayCard from './WayCard'
import './GoldenWays.css'

const ALL = 'Todas'
type Filter = typeof ALL | WayCategory

const FILTER_OPTIONS: readonly Filter[] = [ALL, ...categories]

function GoldenWays() {
  const [selected, setSelected] = useState<Filter>(ALL)

  const visibleWays =
    selected === ALL ? waysTo67 : waysTo67.filter((way) => way.category === selected)

  return (
    <section className="golden-ways" aria-labelledby="golden-ways-title">
      <h2 id="golden-ways-title" className="golden-ways__title">
        Como chegar aos 67?
      </h2>
      <p className="golden-ways__intro">
        Existem infinitas combinações que resultam em 67: para qualquer número n,
        n + (67 − n) já dá 67. Estes são alguns exemplos selecionados para você
        testar na calculadora e começar a farmar áurea.
      </p>

      <CategoryFilter
        label="Filtrar exemplos por operação"
        options={FILTER_OPTIONS}
        selected={selected}
        onSelect={setSelected}
      />
      <p className="golden-ways__count" aria-live="polite">
        Mostrando {visibleWays.length} de {waysTo67.length} exemplos
      </p>

      <div className="golden-ways__grid">
        {visibleWays.map(({ id, ...way }) => (
          <WayCard key={id} {...way} />
        ))}
      </div>
    </section>
  )
}

export default GoldenWays