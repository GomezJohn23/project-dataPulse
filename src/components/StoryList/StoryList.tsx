import StoryCard from '../StoryCard/StoryCard'
import './StoryList.css'

/**
 * Esqueleto: lista de historias.
 * Compone varias StoryCard (patrón lista → ítem).
 */
function StoryList() {
  return (
    <section className="story-list" aria-label="Historias">
      <StoryCard />
      <StoryCard />
      {/* Más adelante: .map() sobre datos mock o de la API */}
    </section>
  )
}

export default StoryList
