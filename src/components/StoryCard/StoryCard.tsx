import './StoryCard.css'

/**
 * Esqueleto: una sola historia (reutilizable en la lista).
 * Más adelante: recibirá datos por props tipadas.
 */
function StoryCard() {
  return (
    <article className="story-card">
      <h3 className="story-card__title">Título de ejemplo</h3>
      <p className="story-card__meta">autor · puntos · fecha</p>
    </article>
  )
}

export default StoryCard
