import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Story } from '../../types/story'
import { getComments, getStory } from '../../utils/api'
import CommentList from '../CommentList/CommentList'
import './StoryDetail.css'

/**
 * Detalle de una historia: /story/:id
 * Carga el ítem y, si hay kids, sus comentarios.
 */
function StoryDetail() {
  const { id } = useParams()
  const storyId = Number(id)

  const [story, setStory] = useState<Story | null>(null)
  const [comments, setComments] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStory() {
      if (!Number.isFinite(storyId) || storyId <= 0) {
        setError('ID de historia no válido')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)
      setComments([])

      try {
        const data = await getStory(storyId)

        if (cancelled) return

        if (!data) {
          setError('No se encontró la historia')
          setStory(null)
          return
        }

        setStory(data)

        if (data.kids && data.kids.length > 0) {
          setCommentsLoading(true)
          try {
            const list = await getComments(data.kids)
            if (!cancelled) {
              setComments(list)
            }
          } catch (err) {
            if (!cancelled) {
              // La historia sí se muestra; solo fallaron los comentarios
              console.error(err)
              setComments([])
            }
          } finally {
            if (!cancelled) {
              setCommentsLoading(false)
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'No se pudo cargar la historia',
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStory()

    return () => {
      cancelled = true
    }
  }, [storyId])

  if (isLoading) {
    return (
      <main className="story-detail">
        <p className="story-detail__status">Cargando historia…</p>
      </main>
    )
  }

  if (error || !story) {
    return (
      <main className="story-detail">
        <p className="story-detail__error">{error ?? 'Historia no disponible'}</p>
        <Link className="story-detail__back" to="/">
          ← Volver al inicio
        </Link>
      </main>
    )
  }

  const date = new Date(story.time * 1000).toLocaleString()

  return (
    <main className="story-detail">
      <Link className="story-detail__back" to="/">
        ← Volver al inicio
      </Link>

      <article className="story-detail__article">
        <h1 className="story-detail__title">{story.title}</h1>

        <p className="story-detail__meta">
          <span className="story-detail__score">{story.score} puntos</span>
          <span aria-hidden="true"> · </span>
          <span>{story.by}</span>
          <span aria-hidden="true"> · </span>
          <span>{date}</span>
          {story.descendants !== undefined ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{story.descendants} comentarios</span>
            </>
          ) : null}
        </p>

        {story.url ? (
          <p className="story-detail__external">
            <a href={story.url} target="_blank" rel="noreferrer">
              Abrir enlace original
            </a>
          </p>
        ) : null}

        {story.text ? (
          <div
            className="story-detail__text"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        ) : null}
      </article>

      {commentsLoading ? (
        <p className="story-detail__status">Cargando comentarios…</p>
      ) : (
        <CommentList comments={comments} />
      )}
    </main>
  )
}

export default StoryDetail