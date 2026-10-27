import { Link } from 'react-router-dom'
import type { Story } from '../../types/story'
import './StoryCard.css'

type StoryCardProps = {
  story: Story
}

/**
 * Una sola historia (fila de la lista).
 * El título lleva al detalle interno; la fuente externa es opcional.
 */
function StoryCard({ story }: StoryCardProps) {
  const date = new Date(story.time * 1000).toLocaleDateString()

  return (
    <article className="story-card">
      <h3 className="story-card__title">
        <Link className="story-card__link" to={`/story/${story.id}`}>
          {story.title}
        </Link>
      </h3>

      <p className="story-card__meta">
        <span className="story-card__author">{story.by}</span>
        <span className="story-card__separator" aria-hidden="true">
          ·
        </span>
        <span className="story-card__score">{story.score} puntos</span>
        <span className="story-card__separator" aria-hidden="true">
          ·
        </span>
        <span className="story-card__date">{date}</span>
        {story.descendants !== undefined ? (
          <>
            <span className="story-card__separator" aria-hidden="true">
              ·
            </span>
            <span className="story-card__comments">
              {story.descendants} comentarios
            </span>
          </>
        ) : null}
        {story.url ? (
          <>
            <span className="story-card__separator" aria-hidden="true">
              ·
            </span>
            <a
              className="story-card__source"
              href={story.url}
              target="_blank"
              rel="noreferrer"
            >
              Fuente
            </a>
          </>
        ) : null}
      </p>
    </article>
  )
}

export default StoryCard