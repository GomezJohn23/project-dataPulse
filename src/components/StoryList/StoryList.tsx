import type { Story } from '../../types/story'
import StoryCard from '../StoryCard/StoryCard'
import './StoryList.css'

type StoryListProps = {
  stories: Story[]
}

/**
 * Lista de historias: un StoryCard por ítem.
 */
function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) {
    return (
      <section className="story-list" aria-label="Historias">
        <p className="story-list__empty">
          No hay historias para mostrar. Prueba otra búsqueda.
        </p>
      </section>
    )
  }

  return (
    <section className="story-list" aria-label="Historias">
      <p className="story-list__count">
        {stories.length} {stories.length === 1 ? 'historia' : 'historias'}
      </p>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </section>
  )
}

export default StoryList