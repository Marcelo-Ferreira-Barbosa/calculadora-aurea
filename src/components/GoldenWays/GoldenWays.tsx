import { waysTo67 } from '../../data/waysTo67'
import WayCard from './WayCard'
import './GoldenWays.css'

function GoldenWays() {
  return (
    <section className="golden-ways" aria-labelledby="golden-ways-title">
      <h2 id="golden-ways-title" className="golden-ways__title">
        Como chegar aos 67?
      </h2>
      <p className="golden-ways__intro">
        Existem infinitas combinações que resultam em 67. Estes são alguns
        exemplos para você começar a farmar áurea.
      </p>
      <div className="golden-ways__grid">
        {waysTo67.map(({ id, ...way }) => (
          <WayCard key={id} {...way} />
        ))}
      </div>
    </section>
  )
}

export default GoldenWays