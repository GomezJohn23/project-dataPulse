import { useEffect, useState } from 'react'
import type { Story } from '../../types/story'
import { getTopStories } from '../../utils/api'
import SearchForm from '../SearchForm/SearchForm'
import StoryList from '../StoryList/StoryList'
import './Main.css'

/**
 * Home (/): carga historias top y permite filtrarlas por título o autor.
 */
function Main() {
  const [stories, setStories] = useState<Story[]>([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStories() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getTopStories(20)
        if (!cancelled) {
          setStories(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'No se pudieron cargar las historias',
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStories()

    return () => {
      cancelled = true
    }
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const visibleStories =
    normalizedQuery === ''
      ? stories
      : stories.filter(
          (story) =>
            story.title.toLowerCase().includes(normalizedQuery) ||
            story.by.toLowerCase().includes(normalizedQuery),
        )

  return (
    <main className="main">
      <header className="main__intro">
        <h1 className="main__title">DataPulse</h1>
        <p className="main__lead">El pulso de Hacker News, en un solo vistazo.</p>
      </header>

      <SearchForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={() => {}}
      />

      {isLoading && <p className="main__status">Cargando historias…</p>}
      {error && <p className="main__error">{error}</p>}
      {!isLoading && !error && <StoryList stories={visibleStories} />}
    </main>
  )
}

export default Main