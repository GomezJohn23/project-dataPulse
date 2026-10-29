import type { FeedKind } from '../types/feed'
import type { Story } from '../types/story'

const API_BASE = 'https://hacker-news.firebaseio.com/v0'

const FEED_PATHS: Record<FeedKind, string> = {
  top: '/topstories.json',
  new: '/newstories.json',
  jobs: '/jobstories.json',
}

/**
 * Pedido genérico a la API.
 */
async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)

  if (!response.ok) {
    throw new Error(`Error HN API (${response.status}): ${path}`)
  }

  return response.json() as Promise<T>
}

/** Una historia, job o comentario por ID. Puede devolver null. */
export function getStory(id: number): Promise<Story | null> {
  return request<Story | null>(`/item/${id}.json`)
}

/**
 * Trae ítems de un feed (top / new / jobs).
 */
export async function getStoriesByFeed(
  feed: FeedKind,
  limit = 20,
): Promise<Story[]> {
  const ids = await request<number[]>(FEED_PATHS[feed])
  const selectedIds = ids.slice(0, limit)
  const results = await Promise.all(selectedIds.map((id) => getStory(id)))

  return results.filter((item): item is Story => {
    if (item === null) return false
    if (feed === 'jobs') return item.type === 'job'
    // top y new: historias (a veces HN mete jobs en top)
    return item.type === 'story' || item.type === 'job'
  })
}

/** Atajo: sigue existiendo por si algo aún llama a top. */
export function getTopStories(limit = 20): Promise<Story[]> {
  return getStoriesByFeed('top', limit)
}

/**
 * Trae comentarios a partir de los IDs (kids de una historia).
 */
export async function getComments(
  ids: number[],
  limit = 15,
): Promise<Story[]> {
  const selectedIds = ids.slice(0, limit)
  const results = await Promise.all(selectedIds.map((id) => getStory(id)))

  return results.filter(
    (item): item is Story => item !== null && item.type === 'comment',
  )
}