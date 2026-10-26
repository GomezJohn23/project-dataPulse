import type { Story } from '../../types/story'
import './StoryCard.css'

type StoryCardProps = {
  story: Story
}

/**
 * Una sola historia.
 * No pide datos a la API: solo muestra lo que le pasan por props.
 */
function StoryCard({ story }: StoryCardProps) {
  const date = new Date(story.time * 1000).toLocaleDateString()

  return (
    <article className="story-card">
      <h3 className="story-card__title">
        {story.url ? (
          <a
            className="story-card__link"
            href={story.url}
            target="_blank"
            rel="noreferrer"
          >
            {story.title}
          </a>
        ) : (
          story.title
        )}
      </h3>
      <p className="story-card__meta">
        {story.by} · {story.score} puntos · {date}
        {story.descendants !== undefined ? ` · ${story.descendants} comentarios` : null}
      </p>
    </article>
  )
}

export default StoryCard