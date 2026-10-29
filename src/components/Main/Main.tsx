import { useEffect, useState } from 'react'
import type { FeedKind } from '../../types/feed'
import type { Story } from '../../types/story'
import { getStoriesByFeed } from '../../utils/hnApi'
import FeedFilter from '../FeedFilter/FeedFilter'
import SearchForm from '../SearchForm/SearchForm'
import StoryList from '../StoryList/StoryList'
import './Main.css'

/**
 * Home (/): feed Top/New/Jobs + búsqueda local por título o autor.
 */
function Main() {
  const [feed, setFeed] = useState<FeedKind>('top')
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
        const data = await getStoriesByFeed(feed, 20)
        if (!cancelled) {
          setStories(data)
        }
      } catch (err) {
        if (!cancelled) {
                setError(
          'Algo salió mal con la solicitud. Puede ser un problema de conexión o del servidor. Inténtalo de nuevo más tarde.',
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
  }, [feed])

  const normalizedQuery = query.trim().toLowerCase()
  const visibleStories =
    normalizedQuery === ''
      ? stories
      : stories.filter(
          (story) =>
            story.title.toLowerCase().includes(normalizedQuery) ||
            story.by.toLowerCase().includes(normalizedQuery),
        )

  function handleFeedChange(nextFeed: FeedKind) {
    setFeed(nextFeed)
    setQuery('')
  }

  return (
    <main className="main">
      <header className="main__intro">
        <h1 className="main__title">DataPulse</h1>
        <p className="main__lead">El pulso de Hacker News, en un solo vistazo.</p>
      </header>

      <FeedFilter value={feed} onChange={handleFeedChange} />

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