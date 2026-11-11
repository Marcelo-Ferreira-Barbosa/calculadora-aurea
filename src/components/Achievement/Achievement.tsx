import './Achievement.css'

interface AchievementProps {
  unlocked: boolean
  onReset?: () => void
}

function Achievement({ unlocked, onReset }: AchievementProps) {
  const className = `achievement ${
    unlocked ? 'achievement--unlocked' : 'achievement--locked'
  }`

  return (
    <section className={className} aria-label="Conquista" aria-live="polite">
      {unlocked ? (
        <>
          <p className="achievement__badge">Conquista desbloqueada</p>
          <p className="achievement__number">
            <span aria-hidden="true">✨ </span>67
            <span aria-hidden="true"> ✨</span>
          </p>
          <h2 className="achievement__title">Você farmou áurea!</h2>
          <p className="achievement__text">
            Uma operação, um resultado, muita áurea acumulada.
          </p>
          <button type="button" className="achievement__button" onClick={onReset}>
            Fazer outra operação
          </button>
        </>
      ) : (
        <>
          <p className="achievement__number achievement__number--locked" aria-hidden="true">
            ?
          </p>
          <h2 className="achievement__title achievement__title--locked">
            Conquista bloqueada
          </h2>
          <p className="achievement__text">
            Faça uma conta que resulte em 67 para desbloquear.
          </p>
        </>
      )}
    </section>
  )
}

export default Achievement